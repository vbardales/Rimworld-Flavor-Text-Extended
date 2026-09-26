// Checks the new FlavorDefs: ingredient categories and meal kinds must really
// exist in Flavor Text, otherwise the def is silently inert.
const fs = require('fs');
const path = require('path');

const FT = process.argv[2]; // Flavor Text Defs folder
const DIR = './Mod/Defs';

// Flavor Text's categories, PLUS those that our mod adds.
const catXml = [
  ...['FT_FlavorCategoryDefBasic.xml', 'FT_FlavorCategoryDefAdvanced.xml']
    .map(f => fs.readFileSync(path.join(FT, f), 'utf8')),
  ...fs.readdirSync(DIR).filter(f => /CategoryDef/.test(f))
    .map(f => fs.readFileSync(path.join(DIR, f), 'utf8')),
].join('\n');
const categories = new Set([...catXml.matchAll(/<defName>(FT_[A-Za-z0-9_]+)<\/defName>/g)].map(m => m[1]));

// The legal meal kinds are the categories descending from FT_MealsKinds.
const parents = {};
for (const b of catXml.split(/<FlavorText\.FlavorCategoryDef>/).slice(1)) {
  const dn = (b.match(/<defName>(FT_[A-Za-z0-9_]+)<\/defName>/) || [])[1];
  if (!dn) continue;
  const p = (b.match(/<parents>([^]*?)<\/parents>/) || [])[1] || '';
  parents[dn] = [...p.matchAll(/<li>([^<]*)<\/li>/g)].map(m => m[1].trim());
}
const estRepas = dn => {
  const vus = new Set();
  const pile = [dn];
  while (pile.length) {
    const c = pile.pop();
    if (c === 'FT_MealsKinds') return true;
    if (vus.has(c)) continue;
    vus.add(c);
    pile.push(...(parents[c] || []));
  }
  return false;
};

// Dish names already defined by Flavor Text: redefining the same dish would create two defs
// fighting over the same ingredients, with an arbitrary winner.
const norm = s => s.toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/\{[^}]*\}/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
// A dish only ever names a chunk with exactly as many ingredients as it has slots (Flavor Text,
// CompFlavor.GetMatchIndices), so two dishes can only be confused with each other when their slot
// counts are equal: the key of every comparison below starts with the slot count. The shorter variants
// (_tools/make-variants.js) rely on this, since they share the label of the dish they copy.
// Two levels: EXACTLY identical name = error (both dishes would display the same);
// name identical once the placeholders are removed = mere warning, because
// "bortsch" and "bortsch {2_plur}" display differently in game.
// `exact` and `approx` hold the text shown in the message; `exactDe` and `approxDe`
// hold the raw defName, to recognize a def that finds itself.
const exact = new Map(), approx = new Map(), exactDe = new Map(), approxDe = new Map();
const poser = (label, defName, mention, arity) => {
  const key = arity + '|' + label;
  exact.set(key, mention); exactDe.set(key, defName);
  const k = arity + '|' + norm(label);
  if (k) { approx.set(k, mention); approxDe.set(k, defName); }
};
for (const d of require('./flavordefs.json')) poser(d.label, d.defName, d.defName, (d.slots || []).length);

// The FRENCH labels, which are checked against each other and separately.
//
// Two dishes with different English names may perfectly well share the same French
// name, and vice versa. So these are TWO independent checks: English
// against English, French against French. Mixing them makes no sense --
// a player never sees both languages in the same game.
//
// Since the split into two mods, these translations are no longer under ./Languages but
// in the French mod. The path had stayed, existsSync returned false and the loop
// did nothing: the check had gone dead WITHOUT A WORD, and the warning
// count had dropped from 11 to 9 without anyone noticing. Hence the hard stop
// below rather than a quiet fallback.
const TRAD = process.argv[3]; // Optional: the companion is a separate repository.
if (TRAD && !fs.existsSync(TRAD)) {
  console.error(`ERROR   translations not found: ${TRAD}`);
  console.error(`        usage: node _tools/checkdefs.js <Flavor Text Defs> [FR mod DefInjected]`);
  process.exit(2);
}
const frLabels = new Map();             // defName -> French label
if (!TRAD) console.log('French companion checks not requested (separate mod).');
for (const f of (TRAD ? fs.readdirSync(TRAD) : []).filter(x => x.endsWith('.xml'))) {
  const xml = fs.readFileSync(path.join(TRAD, f), 'utf8');
  for (const m of xml.matchAll(/<([A-Za-z0-9_\-]+)\.label>([^<]*)<\/\1\.label>/g)) frLabels.set(m[1], m[2]);
}

// Two of our dishes that require exactly the same categories also neutralize each other.
const signatures = new Map();

let erreurs = 0, n = 0, avert = 0;
const defNames = new Set();
for (const f of fs.readdirSync(DIR).filter(x => x.endsWith('.xml'))) {
  const xml = fs.readFileSync(path.join(DIR, f), 'utf8');
  for (const b of xml.split(/<FlavorText\.FlavorDef[^>]*>/).slice(1)) {
    const body = b.split('</FlavorText.FlavorDef>')[0];
    const dn = (body.match(/<defName>([^<]*)<\/defName>/) || [])[1];
    if (!dn) continue;
    n++;
    if (defNames.has(dn)) { console.log(`ERROR   duplicate defName: ${dn}`); erreurs++; }
    defNames.add(dn);

    const ing = (body.match(/<ingredients>([^]*?)<\/ingredients>/) || [])[1] || '';
    const slots = [...ing.matchAll(/<categories>([^]*?)<\/categories>/g)];

    // Same set of categories as another of our dishes: the two will fight over the same
    // meals and one of them will never come out.
    const sig = slots
      .map(s => [...s[1].matchAll(/<li>([^<]*)<\/li>/g)].map(m => m[1].trim()).sort().join('+'))
      .sort().join(' | ');
    if (sig) {
      if (signatures.has(sig)) {
        console.log(`WARN    ${dn}  same ingredients as ${signatures.get(sig)}: ${sig}`); avert++;
      } else signatures.set(sig, dn);
    }
    for (const s of slots) {
      for (const c of s[1].matchAll(/<li>([^<]*)<\/li>/g)) {
        if (!categories.has(c[1].trim())) {
          console.log(`ERROR   ${dn}  unknown ingredient category: ${c[1].trim()}`); erreurs++;
        }
      }
    }
    const mk = (body.match(/<mealKinds>([^]*?)<\/mealKinds>/) || [])[1] || '';
    const kinds = [...mk.matchAll(/<li>([^<]*)<\/li>/g)].map(m => m[1].trim());
    if (!kinds.length) { console.log(`ERROR   ${dn}  no mealKinds`); erreurs++; }
    for (const k of kinds) {
      if (!categories.has(k)) { console.log(`ERROR   ${dn}  unknown meal kind: ${k}`); erreurs++; }
      else if (!estRepas(k)) { console.log(`ERROR   ${dn}  ${k} is not a meal kind`); erreurs++; }
    }

    // The {N_...} of the label and description must target an existing slot.
    const label = (body.match(/<label>([^<]*)<\/label>/) || [])[1] || '';
    const desc = (body.match(/<description>([^<]*)<\/description>/) || [])[1] || '';
    if (!label) { console.log(`ERROR   ${dn}  missing label`); erreurs++; }
    if (!desc) { console.log(`ERROR   ${dn}  missing description`); erreurs++; }
    const k = slots.length + '|' + norm(label);
    if (exact.has(slots.length + '|' + label)) {
      console.log(`ERROR   ${dn}  "${label}" already displays identically (${exact.get(slots.length + '|' + label)})`); erreurs++;
    } else if (norm(label) && approx.has(k)) {
      console.log(`WARN    ${dn}  "${label}" close to ${approx.get(k)} — check that the display differs`); avert++;
    }
    // We add the def to the table on the way: without this, two of OUR dishes bearing the
    // same English name did not see each other -- only hekmo's were compared.
    if (label) poser(label, dn, dn, slots.length);
    for (const [texte, quoi] of [[label, 'label'], [desc, 'description']]) {
      for (const p of texte.matchAll(/\{(\d+)_([a-z]+)\}/g)) {
        if (Number(p[1]) >= slots.length) {
          console.log(`ERROR   ${dn}  ${quoi}: slot ${p[1]} does not exist (${slots.length} ingredient(s))`); erreurs++;
        }
        if (!['plur', 'coll', 'sing', 'adj'].includes(p[2])) {
          console.log(`ERROR   ${dn}  ${quoi}: unknown suffix {${p[1]}_${p[2]}}`); erreurs++;
        }
      }
    }
  }
}
/* --------------------------------------- the same check, French side ---- */
// Two caveats, without which the pass shouts ninety times for nothing:
//
//   - hekmo readily declines a same dish as _2 and _3, with the same name and
//     different ingredients. That is its variety mechanism, not a fault. So we only
//     report a group in which one of ours appears.
//   - a group already reported as identical does not need to be re-reported as "close".
const notre = d => d.startsWith('FlavorTextFR_');
const grouper = cle => {
  const g = new Map();
  for (const [def, lab] of frLabels) {
    const k = cle(lab);
    if (!k) continue;
    if (!g.has(k)) g.set(k, []);
    g.get(k).push(def);
  }
  return [...g].filter(([, defs]) => defs.length > 1 && defs.some(notre));
};
const dejaDit = new Set();
for (const [lab, defs] of grouper(l => l)) {
  // An identical template only yields an identical display if it contains NO
  // slot: "parmentier {0_adj}" reads "parmentier de canard" for one and
  // "parmentier de toxipatate" for the other, since their slot 0 does not draw from the
  // same category. With a {N_...}, we cannot conclude without comparing the
  // ingredients: it is a warning, not an error.
  const rendu = !/\{\d+_\w+\}/.test(lab);
  console.log(`${rendu ? 'ERROR' : 'WARN '}  FR  "${lab}" ${rendu
    ? "displays identically for"
    : 'has the same template in'} ${defs.join(', ')}`);
  if (rendu) erreurs++; else avert++;
  dejaDit.add(defs.join(','));
}
for (const [lab, defs] of grouper(norm)) {
  if (dejaDit.has(defs.join(','))) continue;
  console.log(`WARN    FR  "${lab}" close between ${defs.join(', ')} — check that the display differs`);
  avert++;
}

console.log(`\n${n} dishes defined, ${frLabels.size} French labels alongside — ${erreurs} error(s), ${avert} warning(s)`);
process.exit(erreurs ? 1 : 0);
