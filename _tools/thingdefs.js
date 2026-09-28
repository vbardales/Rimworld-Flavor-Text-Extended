// Shared reading of RimWorld ThingDefs and Flavor Text's own keyword filing, used by
// both _tools/active.js (what the loaded mod list keeps active) and _tools/frequency.js
// (how often a dish of this mod would fire). Kept in one place so a fix to the scoring
// rule, the meat-generation traps or the mod-folder discovery cannot land in one script
// and not the other.
const fs = require('fs');
const path = require('path');

const RW = 'C:/Program Files (x86)/Steam/steamapps/common/RimWorld';
const WS = 'C:/Program Files (x86)/Steam/steamapps/workshop/content/294100';
const CFG = process.env.LOCALAPPDATA.replace(/Local$/, 'LocalLow') +
  '/Ludeon Studios/RimWorld by Ludeon Studios/Config/ModsConfig.xml';

function walk(dir, out = []) {
  let ents; try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!/^(Textures|Sounds|Assemblies|Source|About|Languages|\.git|_tools)$/i.test(e.name)) walk(p, out); }
    else if (e.name.endsWith('.xml')) out.push(p);
  }
  return out;
}
const readTag = (body, tag) => {
  const m = body.match(new RegExp('<' + tag + '>([^<]*)</' + tag + '>'));
  return m ? m[1].trim() : undefined;
};

// The mods whose ThingDefs feed the pool: 'vanilla' asks only Core + the five DLC,
// otherwise the current ModsConfig.xml. Folders are read from RimWorld/Data,
// RimWorld/Mods and the Steam Workshop content folder.
//
// nelim's local mods are NTFS JUNCTIONS to a folder of the repository. withFileTypes
// reports them as isSymbolicLink(), not isDirectory(): without the fallback statSync,
// the home-made mods drop out of the scan and their ingredients are missing from the census.
const estDossier = p => { try { return fs.statSync(p).isDirectory(); } catch { return false; } };
function findModFolders(vanilla) {
  // <activeMods> only: ModsConfig.xml also has <knownExpansions>, which duplicates it.
  const list = vanilla
    ? ['ludeon.rimworld', 'ludeon.rimworld.royalty', 'ludeon.rimworld.ideology', 'ludeon.rimworld.biotech', 'ludeon.rimworld.anomaly', 'ludeon.rimworld.odyssey']
    : [...((fs.readFileSync(CFG, 'utf8').match(/<activeMods>[\s\S]*?<\/activeMods>/) || [''])[0]).matchAll(/<li>([^<]+)<\/li>/g)].map(m => m[1].trim().toLowerCase());
  const wanted = new Set(list);
  const byPid = new Map();
  for (const root of [path.join(RW, 'Data'), path.join(RW, 'Mods'), WS]) {
    let names; try { names = fs.readdirSync(root); } catch { continue; }
    for (const n of names) {
      const dir = path.join(root, n);
      if (!estDossier(dir)) continue;
      let pid; try { pid = readTag(fs.readFileSync(path.join(dir, 'About', 'About.xml'), 'utf8'), 'packageId'); } catch { continue; }
      if (!pid) continue;
      pid = pid.toLowerCase();
      if (wanted.has(pid) && !byPid.has(pid)) byPid.set(pid, dir);
    }
  }
  return { list, byPid, absent: list.filter(p => !byPid.has(p)) };
}

// All ThingDefs of the given folders, abstract ones included, indexed by their Name
// attribute so a value absent from a concrete block can be resolved by walking up
// ParentName. `undefined` = field absent from this block, so it is inherited; an empty
// string is a DEFINED value, and the walk must stop at the first block that has one
// rather than climb past it to an abstract base.
function readThingDefs(dirs) {
  const byName = {}, blocs = [];
  for (const dir of dirs) {
    for (const f of walk(dir)) {
      let xml; try { xml = fs.readFileSync(f, 'utf8'); } catch { continue; }
      if (!xml.includes('<ThingDef')) continue;
      for (const m of xml.matchAll(/<ThingDef\b([^>]*)>([\s\S]*?)<\/ThingDef>/g)) {
        const attrs = m[1], body = m[2];
        const nom = (attrs.match(/\bName\s*=\s*"([^"]*)"/) || [])[1];
        const bloc = {
          parent: (attrs.match(/\bParentName\s*=\s*"([^"]*)"/) || [])[1],
          defName: readTag(body, 'defName'),
          label: readTag(body, 'label'),
          estRace: /<race>/.test(body),
          useMeatFrom: readTag(body, 'useMeatFrom'),
          meatLabel: readTag(body, 'meatLabel'),
          fleshType: readTag(body, 'fleshType'),
          cats: (body.match(/<thingCategories>[\s\S]*?<\/thingCategories>/) || [])[0],
        };
        if (nom) byName[nom] = bloc;
        blocs.push(bloc);
      }
    }
  }
  function herite(bloc, champ) {
    const vus = new Set();
    for (let b = bloc; b; b = byName[b.parent]) {
      if (b[champ] !== undefined) return b[champ];
      if (!b.parent || vus.has(b.parent)) break;
      vus.add(b.parent);
    }
    return undefined;
  }
  return { byName, blocs, herite };
}

// The item categories Flavor Text can see arriving in a meal, and the two exclusions from
// a race's generated Meat_X: useMeatFrom (the race borrows another's meat) and fleshType
// (mechanoids yield nothing, Anomaly entities yield twisted meat). "Fish" counts: Odyssey
// files its fourteen fish there, not in MeatRaw. "PlantMatter" carries the hops.
const MANGEABLE = /PlantFoodRaw|MeatRaw|AnimalProductRaw|EggsFertilized|EggsUnfertilized|Foods|Fish|PlantMatter/;
const SANS_VIANDE = new Set(['Mechanoid', 'Drone', 'EntityMechanical', 'EntityFlesh', 'Fleshbeast']);
// Cooked meals, kept apart: a FlavorDef only names a meal if one of its <mealKinds> is
// served, and those categories are filled only by them. Biotech's baby food is filed
// under Foods with the raw foods although it is a cooked dish; a named exception rather
// than widening the pattern, which would also divert ingredients to the meals bag.
const REPAS = /FoodMeals/;
const REPAS_NOMMES = new Set(['BabyFood']);

// Splits the blocs of readThingDefs() into edible ingredients and cooked meals, both
// defName -> label. A generated meat is added as 'Meat_' + defName.
function classify({ blocs, herite }) {
  const meals = new Map(), ingredients = new Map();
  for (const b of blocs) {
    if (!b.defName) continue;
    const lab = b.label || herite(b, 'label');
    if (!lab) continue;
    if (b.estRace) {
      if (herite(b, 'useMeatFrom') || SANS_VIANDE.has(herite(b, 'fleshType'))) continue;
      ingredients.set('Meat_' + b.defName, herite(b, 'meatLabel') || lab + ' meat');
      continue;
    }
    const cats = herite(b, 'cats') || '';
    if (REPAS.test(cats) || REPAS_NOMMES.has(b.defName)) { meals.set(b.defName, lab); continue; }
    if (!MANGEABLE.test(cats)) continue;
    ingredients.set(b.defName, lab);
  }
  return { meals, ingredients };
}

// Flavor Text's own scoring: multi-word substring = +6; otherwise +1 if a token contains
// the keyword, +1 if it starts or ends with it, +1 if it equals it. The blacklist
// subtracts double its own score. Threshold: 3. Transcribed from the three
// Regex.Replace calls of CategoryUtility.ExtractNames, in their order.
const splitNames = (dn, lab) =>
  dn.replace(/[_-]/g, ' ')
    .replace(/(?<=[a-zA-Z])([A-Z][a-z]+)/g, ' $1')
    .replace(/(?<=[a-z])([A-Z]+)/g, ' $1')
    .toLowerCase() + ' ' + (lab || '').replace(/-/g, ' ');

function score(label, kws) {
  const l = ' ' + label.toLowerCase() + ' ';
  const toks = label.toLowerCase().split(/[^a-z]+/).filter(Boolean);
  let s = 0;
  for (const k of kws) {
    if (k.includes(' ')) { if (l.includes(k)) s += 6; continue; }
    for (const t of toks) { if (t.includes(k)) s++; if (t.startsWith(k) || t.endsWith(k)) s++; if (t === k) s++; }
  }
  return s;
}

// One row per FlavorCategoryDef of the tree T, its keywords/blacklist lower-cased once.
function categoryIndex(T) {
  return T.all.map(c => ({
    name: c,
    kw: (T.info[c].keywords || []).map(k => k.toLowerCase()),
    bl: (T.info[c].blacklist || []).map(k => k.toLowerCase()),
    absorb: new Set(T.info[c].absorb || []),
  }));
}
function filedDirectly(cats, dn, lab) {
  const nom = splitNames(dn, lab);
  const hit = new Set();
  for (const c of cats) {
    let hitIt = c.absorb.has(dn);
    if (!hitIt && c.kw.length) {
      let s = score(nom, c.kw);
      if (s >= 3) for (const b of c.bl) s -= 2 * score(nom, [b]);
      hitIt = s >= 3;                    // the engine keeps ALL categories >= 3
    }
    if (hitIt) hit.add(c.name);
  }
  return hit;
}

module.exports = { walk, readTag, findModFolders, readThingDefs, classify, splitNames, score, categoryIndex, filedDirectly };
