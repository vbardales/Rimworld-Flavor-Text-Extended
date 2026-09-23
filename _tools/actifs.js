// How many of our dishes does the engine really retain, on the active mod list?
//
//   node _tools/actifs.js <Flavor Text Defs folder>
//
// At startup Flavor Text writes "N active FlavorDefs for the current modlist found out
// of M total". It does not say how N splits between its defs and ours. This
// script redoes the computation and breaks it down.
//
// The engine's filter: a def is retained if EVERY one of its ingredient slots accepts
// at least one present ThingDef. A slot cites categories, and a category accepts
// all its DESCENDANTS -- declaring FT_Fruit accepts FT_Pear.
//
// Three traps, without which the count is far below the true one:
//
//   1. Meats do not exist in XML. RimWorld generates Meat_X at runtime for
//      every flesh race without useMeatFrom. We rebuild them here with the same rule
//      as _tools/geninflections.js -- fleshType and inheritance included.
//
//   2. The defName AND the label count. Fixed on 2026-09-12: this comment used to say
//      "the label, not the defName", which was wrong. CategoryUtility.ExtractNames reads
//      both fields -- verified by reading the method's IL, two ldfld, Def.defName then
//      Def.label. The defName goes through three Regex.Replace calls that split at underscores,
//      hyphens and camelCase, then a ToLower and a Split; the label only loses its
//      hyphens. Practical consequence: an ingredient whose label is in Chinese or
//      Japanese can still be filed by its Latin defName. For a generated meat,
//      the label is <meatLabel> if it exists, otherwise "<animal label> meat".
//
//   3. A dish needs a MEAL KIND, not just ingredients. Added on
//      2026-09-12. A FlavorDef declares <mealKinds> and can only name a meal
//      belonging to one of them. Without a cooking mod, only the base-game meals, nutrient
//      paste and baby food exist: soup, dessert, noodles and
//      dumplings are empty categories, and a dish that declares only those is
//      uncookable even if all its ingredients are there. On the 112-mod profile, 729
//      dishes pass the ingredient condition and 222 pass both.
//
// Accepted approximation: sisterCategories is not modeled, and a mod that adds its
// ingredients by XML patch rather than by def escapes the scan. Both push the
// count downward. We display it next to the log's figure to judge the gap, which
// remains the only judge.

const fs = require('fs');
const path = require('path');

const FT = process.argv[2];
if (!FT) { console.error('usage: node _tools/actifs.js <Flavor Text Defs folder>'); process.exit(1); }

const RW = 'C:/Program Files (x86)/Steam/steamapps/common/RimWorld';
const WS = 'C:/Program Files (x86)/Steam/steamapps/workshop/content/294100';
const CFG = process.env.LOCALAPPDATA.replace(/Local$/, 'LocalLow') +
  '/Ludeon Studios/RimWorld by Ludeon Studios/Config/ModsConfig.xml';

const T = require('./arbre.js').load(FT);

/* ------------------------------------------------------------------- helpers */
function walk(dir, out = []) {
  let ents; try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!/^(Textures|Sounds|Assemblies|Source|About|Languages|\.git|_tools)$/i.test(e.name)) walk(p, out); }
    else if (e.name.endsWith('.xml')) out.push(p);
  }
  return out;
}
const un = (b, t) => {
  const m = b.match(new RegExp('<' + t + '>([^<]*)</' + t + '>'));
  return m ? m[1].trim() : undefined;
};

/* ------------------------------------------------- 1. the active mods, and where */
// <activeMods> only: the file also contains <knownExpansions>, which duplicates it.
const actifsXml = (fs.readFileSync(CFG, 'utf8').match(/<activeMods>[\s\S]*?<\/activeMods>/) || [''])[0];
const actifs = [...actifsXml.matchAll(/<li>([^<]+)<\/li>/g)].map(m => m[1].trim().toLowerCase());
const voulus = new Set(actifs);

// nelim's local mods are NTFS JUNCTIONS to a folder of the repository.
// withFileTypes reports them as isSymbolicLink(), not isDirectory(): without the fallback
// statSync, the thirty-five home-made mods drop out of the scan and their ingredients
// are missing from the census.
const estDossier = p => { try { return fs.statSync(p).isDirectory(); } catch { return false; } };

const parPid = new Map();               // one folder per packageId: local copies are duplicates
for (const racine of [path.join(RW, 'Data'), path.join(RW, 'Mods'), WS]) {
  let noms; try { noms = fs.readdirSync(racine); } catch { continue; }
  for (const n of noms) {
    const dir = path.join(racine, n);
    if (!estDossier(dir)) continue;
    let pid; try { pid = un(fs.readFileSync(path.join(dir, 'About', 'About.xml'), 'utf8'), 'packageId'); } catch { continue; }
    if (!pid) continue;
    pid = pid.toLowerCase();
    if (voulus.has(pid) && !parPid.has(pid)) parPid.set(pid, dir);
  }
}
const dossiers = [...parPid].map(([pid, dir]) => ({ pid, dir }));
const absents = actifs.filter(p => !parPid.has(p));

/* ------------------------------- 2. all ThingDefs of the active mods, inherited */
const byName = {}, blocs = [];
for (const { dir } of dossiers) {
  for (const f of walk(dir)) {
    let xml; try { xml = fs.readFileSync(f, 'utf8'); } catch { continue; }
    if (!xml.includes('<ThingDef')) continue;
    for (const m of xml.matchAll(/<ThingDef\b([^>]*)>([\s\S]*?)<\/ThingDef>/g)) {
      const attrs = m[1], body = m[2];
      const nom = (attrs.match(/\bName\s*=\s*"([^"]*)"/) || [])[1];
      const bloc = {
        parent: (attrs.match(/\bParentName\s*=\s*"([^"]*)"/) || [])[1],
        defName: un(body, 'defName'),
        label: un(body, 'label'),
        estRace: /<race>/.test(body),
        useMeatFrom: un(body, 'useMeatFrom'),
        meatLabel: un(body, 'meatLabel'),
        fleshType: un(body, 'fleshType'),
        // undefined, not '': an empty string is a DEFINED value, and herite()
        // would stop at the first block without <thingCategories> instead of climbing to
        // the abstract base -- which is precisely where almost all
        // ingredients declare their category.
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

/* -------------------------------------- 3. the ingredients: XML + generated meats */
// The item categories that Flavor Text can see arriving in a meal. Deliberately
// narrow: opening it to <ingestible> catches drugs, medicines and cooked meals,
// and inflates the census tenfold -- every category then appears served.
// "Fish" counts: Odyssey files its fourteen fish in this category and not
// in MeatRaw. Forgetting it left FT_Meat_Fish for dead and wrongly condemned forty dishes.
// "PlantMatter" carries the hops.
const MANGEABLE = /PlantFoodRaw|MeatRaw|AnimalProductRaw|EggsFertilized|EggsUnfertilized|Foods|Fish|PlantMatter/;
const SANS_VIANDE = new Set(['Mechanoid', 'Drone', 'EntityMechanical', 'EntityFlesh', 'Fleshbeast']);

// Cooked meals, kept apart. They are NOT ingredients -- putting them in the
// same bag would inflate the census -- but a FlavorDef only names a meal if
// one of its <mealKinds> is served, and those categories are filled only by them.
const REPAS = /FoodMeals/;
// The meals that their thingCategories do NOT file with the meals. Biotech puts its
// baby food in Foods, with the raw foods, although it is truly a cooked
// dish and the only thing that fills FT_MealsBaby. A named exception rather than
// widening the pattern to Foods: that pattern would also divert ingredients to the
// meals bag -- three cocoa products did, and three of our dishes fell
// with them.
const REPAS_NOMMES = new Set(['BabyFood']);
const plats = new Map();                // defName -> label, the meals
const choses = new Map();               // defName -> label, the ingredients
for (const b of blocs) {
  if (!b.defName) continue;
  const lab = b.label || herite(b, 'label');
  if (!lab) continue;
  if (b.estRace) {
    // generated meat, if the race produces one under its own name
    if (herite(b, 'useMeatFrom') || SANS_VIANDE.has(herite(b, 'fleshType'))) continue;
    choses.set('Meat_' + b.defName, herite(b, 'meatLabel') || lab + ' meat');
    continue;
  }
  const cats = herite(b, 'cats') || '';
  if (REPAS.test(cats) || REPAS_NOMMES.has(b.defName)) { plats.set(b.defName, lab); continue; }
  if (!MANGEABLE.test(cats)) continue;
  choses.set(b.defName, lab);
}

/* ---------------------------------------- 4. filing into the FT categories */
// Flavor Text's scoring: multi-word substring = +6; otherwise +1 if the token
// contains the keyword, +1 if it starts or ends with it, +1 if it equals it.
// The blacklist subtracts double its own score. Threshold: 3.
// The names on which the engine scores its keywords: the defName split at
// underscores, hyphens and camelCase, then the label split at hyphens. Transcribed
// from the three Regex.Replace calls of CategoryUtility.ExtractNames, in their order.
const noms = (dn, lab) =>
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
const cats = T.all.map(c => ({
  name: c,
  kw: (T.info[c].keywords || []).map(k => k.toLowerCase()),
  bl: (T.info[c].blacklist || []).map(k => k.toLowerCase()),
  absorb: new Set(T.info[c].absorb || []),
}));

const propres = {};                     // category -> number of ThingDefs filed directly
for (const c of cats) propres[c.name] = 0;
for (const [dn, lab] of choses) {
  for (const c of cats) {
    if (c.absorb.has(dn)) { propres[c.name]++; continue; }
    if (!c.kw.length) continue;
    const nom = noms(dn, lab);
    let s = score(nom, c.kw);
    if (s >= 3) for (const b of c.bl) s -= 2 * score(nom, [b]);
    if (s >= 3) propres[c.name]++;      // the engine keeps ALL categories >= 3
  }
}
// A category is "served" if it or one of its descendants contains something.
const servie = {};
for (const c of T.all) servie[c] = [...T.desc(c)].some(d => propres[d] > 0);

// Same filing for the meals, in their own counter: a <mealKinds> can only be
// satisfied by an installed meal. Without a cooking mod only those of the base
// game remain, and all the specialized kinds -- soup, dessert, noodles -- stay empty.
const propresRepas = {};
for (const c of cats) propresRepas[c.name] = 0;
for (const [dn, lab] of plats) {
  for (const c of cats) {
    if (c.absorb.has(dn)) { propresRepas[c.name]++; continue; }
    if (!c.kw.length) continue;
    const nom = noms(dn, lab);
    let s = score(nom, c.kw);
    if (s >= 3) for (const b of c.bl) s -= 2 * score(nom, [b]);
    if (s >= 3) propresRepas[c.name]++;
  }
}
const servieKind = {};
for (const c of T.all) servieKind[c] = [...T.desc(c)].some(d => propresRepas[d] > 0);

/* -------------------------------------------- 5. the FlavorDefs, active or not */
function lireDefs(fichiers, source) {
  const out = [];
  for (const f of fichiers) {
    const xml = fs.readFileSync(f, 'utf8');
    for (const b of xml.match(/<FlavorText\.FlavorDef[\s\S]*?<\/FlavorText\.FlavorDef>/g) || []) {
      const dn = un(b, 'defName');
      if (!dn) continue;
      const ing = (b.match(/<ingredients>[\s\S]*?<\/ingredients>/) || [''])[0];
      const slots = [...ing.matchAll(/<categories>([\s\S]*?)<\/categories>/g)]
        .map(m => [...m[1].matchAll(/<li>([^<]+)<\/li>/g)].map(x => x[1].trim()));
      const mk = (b.match(/<mealKinds>[\s\S]*?<\/mealKinds>/) || [''])[0];
      const kinds = [...mk.matchAll(/<li>([^<]+)<\/li>/g)].map(x => x[1].trim());
      out.push({ dn, slots, kinds, source, fichier: path.basename(f) });
    }
  }
  return out;
}
const defs = [
  ...lireDefs([path.join(FT, 'FlavorDef.xml')], 'hekmo'),
  ...lireDefs(fs.readdirSync('./Mod/Defs').filter(f => /^FlavorDefs_/.test(f)).map(f => path.join('./Mod/Defs', f)), 'nous'),
];

const inconnues = new Set();
for (const d of defs) {
  d.morts = d.slots.filter(sl => !sl.some(c => {
    if (!(c in servie)) { inconnues.add(c); return false; }
    return servie[c];
  }));
  // Two conditions, not one: the slots must be satisfiable AND the dish must be able
  // to land on an installed meal kind. A dish without <mealKinds> is not
  // restricted. Ignoring the second condition, which this script did until
  // 2026-09-12, makes it name dishes that nobody can cook.
  d.sansType = d.kinds.length > 0 && !d.kinds.some(k => servieKind[k]);
  d.actif = d.morts.length === 0 && !d.sansType;
}

/* -------------------------------------------------------------------- output */
const par = s => defs.filter(d => d.source === s);
const pct = (a, b) => b ? (100 * a / b).toFixed(1) + ' %' : '-';
console.log(`active mods: ${actifs.length}, folders found: ${dossiers.length}` +
  (absents.length ? ` (not found: ${absents.join(', ')})` : ''));
console.log(`ingredients counted: ${choses.size}\n`);

for (const s of ['hekmo', 'nous']) {
  const l = par(s), a = l.filter(d => d.actif).length;
  console.log(`${s.padEnd(6)} ${String(a).padStart(4)} active / ${l.length}   ${pct(a, l.length)}`);
}
const tot = defs.filter(d => d.actif).length;
console.log(`${'TOTAL'.padEnd(6)} ${String(tot).padStart(4)} active / ${defs.length}   ${pct(tot, defs.length)}`);
if (inconnues.size) console.log(`\ncategories cited but unknown to the tree: ${[...inconnues].join(', ')}`);

// What blocks ours: by missing category, then by file.
const morts = par('nous').filter(d => !d.actif);
if (morts.length) {
  const parCat = {}, parFichier = {};
  for (const d of morts) {
    parFichier[d.fichier] = (parFichier[d.fichier] || 0) + 1;
    for (const sl of d.morts) parCat[sl.join('|')] = (parCat[sl.join('|')] || 0) + 1;
  }
  console.log(`\n— our ${morts.length} inert dishes, by empty slot:`);
  for (const [c, n] of Object.entries(parCat).sort((a, b) => b[1] - a[1]).slice(0, 20)) {
    console.log(`   ${String(n).padStart(4)}  ${c}`);
  }
  console.log(`\n— by file:`);
  for (const [f, n] of Object.entries(parFichier).sort((a, b) => b[1] - a[1]).slice(0, 15)) {
    console.log(`   ${String(n).padStart(4)}  ${f}`);
  }
}

// ACTIFS_DUMP=1: the list of ingredients found. This is where to start
// when a count looks wrong -- a census that is too short or too long shows up
// immediately, whereas a percentage does not say where it comes from.
if (process.env.ACTIFS_DUMP) {
  console.log('\n— ingredients counted:');
  for (const [dn, lab] of [...choses].sort((a, b) => a[1].localeCompare(b[1]))) console.log(`   ${lab.padEnd(34)} ${dn}`);
}
