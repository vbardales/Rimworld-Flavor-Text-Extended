// How many of our dishes does the engine really retain, on the active mod list?
//
//   node _tools/active.js <Flavor Text Defs folder>
//
// At startup Flavor Text writes "N active FlavorDefs for the current modlist found out
// of M total". It does not say how N splits between its defs and ours. This
// script redoes the computation and breaks it down.
//
// The engine's filter: a def is retained if EVERY one of its ingredient slots accepts
// at least one present ThingDef. A slot cites categories, and a category accepts
// all its DESCENDANTS -- declaring FT_Fruit accepts FT_Pear.
//
// Three traps, without which the count is far below the true one -- both the mod-folder
// discovery and the ingredient/meal filing below are shared with _tools/frequency.js
// through _tools/thingdefs.js, so a fix to any of them cannot land in one script and not
// the other:
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
const D = require('./thingdefs.js');

const FT = process.argv[2];
if (!FT) { console.error('usage: node _tools/active.js <Flavor Text Defs folder>'); process.exit(1); }

const T = require('./tree.js').load(FT);

/* ------------------------------------------------- 1. the active mods, and where */
const { list: actifs, byPid: parPid, absent: absents } = D.findModFolders(false);
const dossiers = [...parPid].map(([pid, dir]) => ({ pid, dir }));

/* ------------------------------- 2. all ThingDefs of the active mods, inherited */
const thingDefs = D.readThingDefs(dossiers.map(d => d.dir));

/* -------------------------------------- 3. the ingredients: XML + generated meats */
const { meals: plats, ingredients: choses } = D.classify(thingDefs);

/* ---------------------------------------- 4. filing into the FT categories */
const cats = D.categoryIndex(T);

const propres = {};                     // category -> number of ThingDefs filed directly
for (const c of cats) propres[c.name] = 0;
for (const [dn, lab] of choses) for (const name of D.filedDirectly(cats, dn, lab)) propres[name]++;
// A category is "served" if it or one of its descendants contains something.
const servie = {};
for (const c of T.all) servie[c] = [...T.desc(c)].some(d => propres[d] > 0);

// Same filing for the meals, in their own counter: a <mealKinds> can only be
// satisfied by an installed meal. Without a cooking mod only those of the base
// game remain, and all the specialized kinds -- soup, dessert, noodles -- stay empty.
const propresRepas = {};
for (const c of cats) propresRepas[c.name] = 0;
for (const [dn, lab] of plats) for (const name of D.filedDirectly(cats, dn, lab)) propresRepas[name]++;
const servieKind = {};
for (const c of T.all) servieKind[c] = [...T.desc(c)].some(d => propresRepas[d] > 0);

/* -------------------------------------------- 5. the FlavorDefs, active or not */
function lireDefs(fichiers, source) {
  const out = [];
  for (const f of fichiers) {
    const xml = fs.readFileSync(f, 'utf8');
    for (const b of xml.match(/<FlavorText\.FlavorDef[\s\S]*?<\/FlavorText\.FlavorDef>/g) || []) {
      const dn = D.readTag(b, 'defName');
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
