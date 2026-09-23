// Coverage analysis: which categories and which combinations are poorly or not at all
// served by the existing defs (Flavor Text's plus ours).
//
//   node _tools/couverture.js <Flavor Text Defs folder>
//
// ------------------------------------------------------------------------------------
// WARNING -- the previous version of this file was WRONG.
//
// It counted LITERAL mentions of the category name. But the engine descends
// recursively into child categories: IngredientSlot.AddAllowedCategoriesAndThingsRecursive
// walks cat.ChildCategories. A def that declares FT_Potato therefore also accepts
// FT_Toxipotato, and a def that declares FT_Fruit accepts FT_Pear.
//
// Consequence: the old version reported the toxipotato as "served by 1 def" when it
// is served by 432, and presented as orphans categories that were not orphans
// at all (breadfruit 338, sorrel 348, orange 341).
//
// So we distinguish two measures, and the gap between them is itself data:
//   named   : defs that cite the category as is -- "how many dishes talk about
//             this ingredient in their own right"
//   served  : defs that cite IT or one of its ANCESTORS -- "how many dishes
//             can actually come out when this ingredient is in the pot"
//
// Only "served" says whether an ingredient is covered. "named" says whether it has an identity.
// ------------------------------------------------------------------------------------
const fs = require('fs');
const path = require('path');

const FT = process.argv[2];
if (!FT) { console.error('usage: node _tools/couverture.js <Flavor Text Defs folder>'); process.exit(1); }
const T = require('./arbre.js').load(FT);

// Ingredient categories: under FT_Ingredients, excluding meal kinds/qualities and stations.
const estIngredient = c => {
  const a = T.anc(c);
  return a.has('FT_Ingredients') && !a.has('FT_FoodMeals') && !a.has('FT_MealsKinds')
    && !a.has('FT_MealsQualities') && !a.has('FT_Buildings');
};

/* ------------------------------------------------------------- reading all the defs */
function slotsDesDefs() {
  const out = [];
  for (const d of require('./flavordefs.json'))
    out.push({ source: 'hekmo', slots: d.slots.map(s => s.cats) });
  for (const f of fs.readdirSync('./Mod/Defs').filter(x => /FlavorDefs/.test(x))) {
    const xml = fs.readFileSync(path.join('./Mod/Defs', f), 'utf8');
    for (const b of xml.match(/<FlavorText\.FlavorDef[\s\S]*?<\/FlavorText\.FlavorDef>/g) || []) {
      const ing = (b.match(/<ingredients>[\s\S]*?<\/ingredients>/) || [''])[0];
      const slots = [...ing.matchAll(/<categories>([\s\S]*?)<\/categories>/g)]
        .map(s => [...s[1].matchAll(/<li>([^<]*)<\/li>/g)].map(m => m[1].trim()));
      if (slots.length) out.push({ source: 'nous', slots });
    }
  }
  return out;
}
const defs = slotsDesDefs();

/* ------------------------------------------------------------------------ the measures */
// Three measures, and they must be kept distinct -- confusing them is exactly
// the error that the warning at the top of the file corrected.
//
//   nommee[c]  defs that cite c as is.
//   servie[c]  defs that cite c or one of its ANCESTORS.  "how many dishes can
//              come out when this ingredient is there" -- used to detect orphans.
//   assise[c]  defs that cite c or one of its DESCENDANTS. "how well established this
//              ingredient is in the corpus" -- used to rank pairings.
//
// The last two go in opposite directions in the tree. servie(Rice) is huge because
// every grain dish accepts rice; assise(Rice) stays modest because few defs
// talk about rice. To judge a missing pairing, assise is what counts: two
// well-established ingredients that never meet, that is what is worth writing.
const nommee = {}, servie = {}, assise = {}, servieNous = {};
for (const d of defs) {
  const cites = new Set(d.slots.flat());
  for (const c of cites) nommee[c] = (nommee[c] || 0) + 1;
  const couverts = new Set(), assis = new Set();
  for (const c of cites) {
    for (const x of T.desc(c)) couverts.add(x);   // c serves all its descendants
    for (const x of T.anc(c)) assis.add(x);       // c establishes all its ancestors
  }
  for (const x of couverts) {
    servie[x] = (servie[x] || 0) + 1;
    if (d.source === 'nous') servieNous[x] = (servieNous[x] || 0) + 1;
  }
  for (const x of assis) assise[x] = (assise[x] || 0) + 1;
}

/* ------------------------------------------------------------------------------- the pairs */
// A pair (A,B) is covered if a def has two DISTINCT slots, one of which goes up
// to A and the other to B. We go up to the ancestors: a pear + cheese dish covers the
// abstract Fruit × Cheese pairing. Alternatives within one slot never coexist,
// so we do not pair them with each other -- that was a second flaw of the old version.
const paires = new Set();
for (const d of defs) {
  const exp = d.slots.map(s => { const o = new Set(); for (const c of s) for (const a of T.anc(c)) o.add(a); return o; });
  for (let i = 0; i < exp.length; i++)
    for (let j = i + 1; j < exp.length; j++)
      for (const a of exp[i]) for (const b of exp[j]) if (a !== b) paires.add([a, b].sort().join('|'));
}

/* ------------------------------------------------------------------------------- results */
const ing = T.all.filter(estIngredient).sort();
const N = c => nommee[c] || 0, S = c => servie[c] || 0, A = c => assise[c] || 0;

console.log("=== 1. INGREDIENT CATEGORIES ===");
console.log(`${ing.length} ingredient categories in total.\n`);

const mortes = ing.filter(c => S(c) === 0);
console.log(`NO dish can come out (${mortes.length}) -- neither the category nor any ancestor is cited:`);
console.log('  ' + (mortes.map(c => c.replace('FT_', '')).join(', ') || '(none)') + '\n');

const pauvres = ing.filter(c => S(c) > 0 && S(c) <= 3).sort((a, b) => S(a) - S(b));
console.log(`TRULY poorly served (${pauvres.length}) -- 1 to 3 possible dishes, always the same ones:`);
console.log(pauvres.length
  ? pauvres.map(c => `  ${c.replace('FT_', '').padEnd(20)} served ${S(c)}   named ${N(c)}`).join('\n')
  : '  (none)');

// The trap the old version set: rarely named, but widely served.
const trompeuses = ing.filter(c => N(c) <= 3 && S(c) >= 20).sort((a, b) => S(b) - S(a));
console.log(`\nFALSELY rare (${trompeuses.length}) -- few dishes name them, but inheritance covers them.`);
console.log('Writing dishes for them adds TARGETED VARIETY, not coverage:');
console.log(trompeuses.slice(0, 20).map(c =>
  `  ${c.replace('FT_', '').padEnd(20)} named ${String(N(c)).padStart(3)}   but served ${S(c)}`).join('\n'));
if (trompeuses.length > 20) console.log(`  ... and ${trompeuses.length - 20} more`);

console.log('\n=== 2. CONCRETE INGREDIENTS BEHIND THE DEAD CATEGORIES ===');
if (!mortes.length) console.log('  (no dead category)');
for (const c of mortes) {
  const i = T.info[c] || {};
  console.log(`  ${c.replace('FT_', '')} :`);
  if ((i.absorb || []).length) console.log(`      ThingDefs : ${i.absorb.slice(0, 6).join(', ')}${i.absorb.length > 6 ? ` ... +${i.absorb.length - 6}` : ''}`);
  if ((i.keywords || []).length) console.log(`      keywords  : ${i.keywords.slice(0, 8).join(', ')}${i.keywords.length > 8 ? ' ...' : ''}`);
  const kids = (T.kids[c] || []);
  if (kids.length) console.log(`      children  : ${kids.join(', ')}`);
}

console.log('\n=== 3. MISSING PAIRINGS ===');
console.log(`${paires.size} category pairs covered, tree included.\n`);
console.log('Pairs whose two members are both well ESTABLISHED in the corpus (>= 8 dishes');
console.log('talk about each) but which coexist in no def:\n');
const solides = ing.filter(c => A(c) >= 8);
const manquantes = [];
for (let i = 0; i < solides.length; i++)
  for (let j = i + 1; j < solides.length; j++) {
    const a = solides[i], b = solides[j];
    if (T.anc(a).has(b) || T.anc(b).has(a)) continue;         // parent/child: irrelevant
    if (!paires.has([a, b].sort().join('|')))
      manquantes.push([a, b, Math.min(A(a), A(b))]);
  }
manquantes.sort((x, y) => y[2] - x[2]);
console.log(`  ${manquantes.length} missing pairs. The 30 most worthwhile:`);
console.log(manquantes.slice(0, 30).map(([a, b, s]) =>
  `    ${a.replace('FT_', '')} + ${b.replace('FT_', '')}`.padEnd(46) + `(${s} dishes for the less established)`).join('\n'));
