// How often would a meal carry a dish of this mod, rather than one of Flavor Text's own?
//
//   node _tools/frequency.js <Flavor Text Defs folder> [--vanilla] [--defs=<folder of FlavorDefs_*.xml>]
//                            [--n=20000] [--seed=1] [--cooked=MealSimple]
//
// The answer the game gives is in the Pickle scenario 08-frequency; this is its offline twin, for
// comparing dish sets (for instance the 1.0.0 defs against the 1.1.0 ones) without a game.
//
// The model is Flavor Text's own code (FlavorText.dll 1.6, decompiled locally, not distributed):
//
//   * a meal's ingredients are cut into chunks of THREE, and each chunk is named on its own;
//   * a dish matches a chunk only if it has EXACTLY as many slots as the chunk has ingredients
//     (CompFlavor.GetMatchIndices: `ingredients.Count != flavorDef.Ingredients.Count` returns null),
//     so a two-slot dish never names a three-ingredient meal;
//   * slots are tried narrowest first, each taking the first remaining ingredient it accepts;
//   * the winner is drawn among the matches with RandomElementByWeight on FlavorDef.Specificity, and
//     Specificity = 10000 / (sum over the slots of the number of things the slot accepts,
//     scaled by how many meals its kinds cover). A BROADER dish has a SMALLER weight.
//
// Not modeled, all of them on the safe side for the comparison and none of them for the absolute
// numbers: the diet filter, cooking stations and hours of day, ghost ingredients, sister categories,
// the keyword patches this mod applies to Flavor Text's categories, and the `quickSearch` setting.
// Treat the output as a ratio between two sets of dishes, not as a frequency to quote.

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const FT = args.find(a => !a.startsWith('--'));
if (!FT) { console.error('usage: node _tools/frequency.js <Flavor Text Defs folder> [--vanilla] [--defs=<folder>] [--n=N] [--seed=S] [--cooked=MealSimple]'); process.exit(1); }
const opt = (k, d) => { const a = args.find(x => x.startsWith('--' + k + '=')); return a ? a.split('=')[1] : d; };
const VANILLA = args.includes('--vanilla');
const N = +opt('n', 20000);
const SEED = +opt('seed', 1);
const COOKED = opt('cooked', 'MealSimple');
const OURS_DIR = opt('defs', './Mod/Defs');

const RW = 'C:/Program Files (x86)/Steam/steamapps/common/RimWorld';
const WS = 'C:/Program Files (x86)/Steam/steamapps/workshop/content/294100';
const CFG = process.env.LOCALAPPDATA.replace(/Local$/, 'LocalLow') +
  '/Ludeon Studios/RimWorld by Ludeon Studios/Config/ModsConfig.xml';
const T = require('./tree.js').load(FT);

const un = (b, t) => { const m = b.match(new RegExp('<' + t + '>([^<]*)</' + t + '>')); return m ? m[1].trim() : undefined; };
function walk(dir, out = []) {
  let ents; try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!/^(Textures|Sounds|Assemblies|Source|About|Languages|\.git|_tools)$/i.test(e.name)) walk(p, out); }
    else if (e.name.endsWith('.xml')) out.push(p);
  }
  return out;
}
const estDossier = p => { try { return fs.statSync(p).isDirectory(); } catch { return false; } };

// 1. the mods whose ThingDefs feed the pool
const wanted = VANILLA
  ? new Set(['ludeon.rimworld', 'ludeon.rimworld.royalty', 'ludeon.rimworld.ideology', 'ludeon.rimworld.biotech', 'ludeon.rimworld.anomaly', 'ludeon.rimworld.odyssey'])
  : new Set(([...((fs.readFileSync(CFG, 'utf8').match(/<activeMods>[\s\S]*?<\/activeMods>/) || [''])[0]).matchAll(/<li>([^<]+)<\/li>/g)]).map(m => m[1].trim().toLowerCase()));
const byPid = new Map();
for (const root of [path.join(RW, 'Data'), path.join(RW, 'Mods'), WS]) {
  let names; try { names = fs.readdirSync(root); } catch { continue; }
  for (const n of names) {
    const dir = path.join(root, n);
    if (!estDossier(dir)) continue;
    let pid; try { pid = un(fs.readFileSync(path.join(dir, 'About', 'About.xml'), 'utf8'), 'packageId'); } catch { continue; }
    if (!pid) continue;
    pid = pid.toLowerCase();
    if (wanted.has(pid) && !byPid.has(pid)) byPid.set(pid, dir);
  }
}

// 2. ThingDefs with inheritance (same reading as active.js)
const byName = {}, blocs = [];
for (const dir of byPid.values()) {
  for (const f of walk(dir)) {
    let xml; try { xml = fs.readFileSync(f, 'utf8'); } catch { continue; }
    if (!xml.includes('<ThingDef')) continue;
    for (const m of xml.matchAll(/<ThingDef\b([^>]*)>([\s\S]*?)<\/ThingDef>/g)) {
      const attrs = m[1], body = m[2];
      const nom = (attrs.match(/\bName\s*=\s*"([^"]*)"/) || [])[1];
      const bloc = {
        parent: (attrs.match(/\bParentName\s*=\s*"([^"]*)"/) || [])[1],
        defName: un(body, 'defName'), label: un(body, 'label'), estRace: /<race>/.test(body),
        useMeatFrom: un(body, 'useMeatFrom'), meatLabel: un(body, 'meatLabel'), fleshType: un(body, 'fleshType'),
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
const MANGEABLE = /PlantFoodRaw|MeatRaw|AnimalProductRaw|EggsFertilized|EggsUnfertilized|Foods|Fish|PlantMatter/;
const SANS_VIANDE = new Set(['Mechanoid', 'Drone', 'EntityMechanical', 'EntityFlesh', 'Fleshbeast']);
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
  if (/FoodMeals/.test(cats) || b.defName === 'BabyFood') { meals.set(b.defName, lab); continue; }
  if (!MANGEABLE.test(cats)) continue;
  ingredients.set(b.defName, lab);
}

// 3. filing into Flavor Text's categories (keyword score, as in active.js)
const names = (dn, lab) => dn.replace(/[_-]/g, ' ').replace(/(?<=[a-zA-Z])([A-Z][a-z]+)/g, ' $1').replace(/(?<=[a-z])([A-Z]+)/g, ' $1').toLowerCase() + ' ' + (lab || '').replace(/-/g, ' ');
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
  name: c, kw: (T.info[c].keywords || []).map(k => k.toLowerCase()),
  bl: (T.info[c].blacklist || []).map(k => k.toLowerCase()), absorb: new Set(T.info[c].absorb || []),
}));
// every category a thing is in: the ones it is filed under, and all their ancestors
function memberships(dn, lab) {
  const out = new Set();
  const nom = names(dn, lab);
  for (const c of cats) {
    let hit = c.absorb.has(dn);
    if (!hit && c.kw.length) {
      let s = score(nom, c.kw);
      if (s >= 3) for (const b of c.bl) s -= 2 * score(nom, [b]);
      hit = s >= 3;
    }
    if (hit) for (const a of T.anc(c.name)) out.add(a);
  }
  return out;
}
const ingList = [...ingredients].map(([dn, lab]) => ({ dn, cats: memberships(dn, lab) })).filter(i => i.cats.size > 0);
const mealCats = new Map([...meals].map(([dn, lab]) => [dn, memberships(dn, lab)]));
const cookedCats = mealCats.get(COOKED);
if (!cookedCats) { console.error(`no meal named ${COOKED} among the meals of the mod list (${[...meals.keys()].slice(0, 12).join(', ')}...)`); process.exit(1); }
const totalMeals = meals.size;
const kindCount = k => [...mealCats.values()].filter(s => s.has(k)).length;

// 4. the dishes
function readDefs(files, source) {
  const out = [];
  for (const f of files) {
    const xml = fs.readFileSync(f, 'utf8');
    for (const b of xml.match(/<FlavorText\.FlavorDef[\s\S]*?<\/FlavorText\.FlavorDef>/g) || []) {
      const dn = un(b, 'defName'); if (!dn) continue;
      const ing = (b.match(/<ingredients>[\s\S]*?<\/ingredients>/) || [''])[0];
      const slots = [...ing.matchAll(/<categories>([\s\S]*?)<\/categories>/g)].map(m => [...m[1].matchAll(/<li>([^<]+)<\/li>/g)].map(x => x[1].trim()));
      const mk = (b.match(/<mealKinds>[\s\S]*?<\/mealKinds>/) || [''])[0];
      out.push({ dn, source, slots, kinds: [...mk.matchAll(/<li>([^<]+)<\/li>/g)].map(x => x[1].trim()) });
    }
  }
  return out;
}
const defs = [
  ...readDefs([path.join(FT, 'FlavorDef.xml')], 'hekmo'),
  ...readDefs(fs.readdirSync(OURS_DIR).filter(f => /^FlavorDefs_/.test(f)).map(f => path.join(OURS_DIR, f)), 'nous'),
];
const accepts = (slot, ing) => slot.some(c => ing.cats.has(c));
const slotCount = new Map();      // slot key -> number of ingredients accepted
const allowed = slot => {
  const key = slot.join('|');
  if (!slotCount.has(key)) slotCount.set(key, ingList.filter(i => accepts(slot, i)).length);
  return slotCount.get(key);
};
const live = [];
for (const d of defs) {
  if (d.slots.length === 0) continue;
  if (d.slots.some(s => allowed(s) === 0)) continue;                              // ActiveFlavorDefs
  if (d.kinds.length && !d.kinds.some(k => cookedCats.has(k))) continue;          // meal kind
  let n3 = d.slots.reduce((a, s) => a + allowed(s), 0);
  if (d.kinds.length) n3 = n3 * (d.kinds.reduce((a, k) => a + kindCount(k), 0) / totalMeals + 1) / 2;
  d.weight = n3 > 0 ? 10000 / n3 : 0;
  d.slots = d.slots.map((s, i) => ({ s, a: allowed(s), i })).sort((x, y) => x.a - y.a).map(x => x.s);
  live.push(d);
}
const byArity = { 1: [], 2: [], 3: [] };
for (const d of live) (byArity[d.slots.length] || (byArity[d.slots.length] = [])).push(d);

// 5. the draw
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const rand = rng(SEED);
function matches(chunk, d) {
  if (chunk.length !== d.slots.length) return false;
  const left = chunk.slice();
  for (const s of d.slots) {
    const i = left.findIndex(x => accepts(s, x));
    if (i < 0) return false;
    left.splice(i, 1);
  }
  return true;
}
const pct = (a, b) => b ? (100 * a / b).toFixed(1) + ' %' : '-';
console.log(`mod list: ${VANILLA ? 'vanilla (Core and the five DLC)' : 'ModsConfig.xml'}; pool ${ingList.length} ingredients; cooked meal ${COOKED}`);
console.log(`dishes that can fire on ${COOKED}: hekmo ${live.filter(d => d.source === 'hekmo').length}, ours ${live.filter(d => d.source === 'nous').length}; by number of slots:`);
for (const k of Object.keys(byArity)) {
  const l = byArity[k];
  console.log(`   ${k} slot(s): hekmo ${l.filter(d => d.source === 'hekmo').length}, ours ${l.filter(d => d.source === 'nous').length}`);
}
console.log(`\n${N} random meals per row, ingredients drawn uniformly from the pool, seed ${SEED}\n`);
console.log('ingredients | chunks | named | with one of ours possible | share of the draw that is ours');
for (const k of [1, 2, 3, 4, 5]) {
  let chunks = 0, named = 0, possible = 0, oursShare = 0;
  for (let n = 0; n < N; n++) {
    const pick = [];
    while (pick.length < k) { const c = ingList[Math.floor(rand() * ingList.length)]; if (!pick.includes(c)) pick.push(c); }
    for (let i = 0; i < pick.length; i += 3) {
      const chunk = pick.slice(i, i + 3);
      chunks++;
      let wAll = 0, wOurs = 0;
      for (const d of byArity[chunk.length] || []) {
        if (!matches(chunk, d)) continue;
        wAll += d.weight;
        if (d.source === 'nous') wOurs += d.weight;
      }
      if (wAll > 0) named++;
      if (wOurs > 0) possible++;
      if (wAll > 0) oursShare += wOurs / wAll;
    }
  }
  console.log(`${String(k).padStart(11)} | ${String(chunks).padStart(6)} | ${pct(named, chunks).padStart(7)} | ${pct(possible, chunks).padStart(25)} | ${pct(oursShare, named)}`);
}
