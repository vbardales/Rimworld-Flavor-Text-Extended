// Contrôle les labels traduits contre les defs d'origine.
// Attrape les trois fautes qui ne se voient pas à la relecture :
//   - un defName qui n'existe pas (faute de frappe -> traduction silencieusement ignorée)
//   - un {N_...} qui pointe vers un slot d'ingrédient inexistant -> placeholder affiché brut
//   - un slot obligatoire jamais utilisé, alors que l'anglais s'en servait
const fs = require('fs');
const path = require('path');

const defs = require('./flavordefs.json');
const byName = Object.fromEntries(defs.map(d => [d.defName, d]));
const DIR = './Languages/French/DefInjected/FlavorText.FlavorDef';

const SUFFIXES = new Set(['plur', 'coll', 'sing', 'adj']);
let seen = new Set(), erreurs = 0, avert = 0;

for (const f of (fs.existsSync(DIR) ? fs.readdirSync(DIR) : []).filter(x => x.endsWith('.xml'))) {
  const xml = fs.readFileSync(path.join(DIR, f), 'utf8');
  for (const m of xml.matchAll(/<([A-Za-z0-9_\-]+)\.label>([^<]*)<\/\1\.label>/g)) {
    const [, name, fr] = m;
    const d = byName[name];
    if (!d) { console.log(`ERREUR  ${f}  defName inconnu : ${name}`); erreurs++; continue; }
    if (seen.has(name)) { console.log(`ERREUR  ${f}  doublon : ${name}`); erreurs++; }
    seen.add(name);

    const used = new Set();
    for (const p of fr.matchAll(/\{(\d+)_([a-z]+)\}/g)) {
      const i = Number(p[1]);
      used.add(i);
      if (!SUFFIXES.has(p[2])) { console.log(`ERREUR  ${name}  suffixe inconnu : {${p[1]}_${p[2]}}`); erreurs++; }
      if (i >= d.slots.length) {
        console.log(`ERREUR  ${name}  slot ${i} inexistant (la def n'a que ${d.slots.length} ingrédient(s))`);
        console.log(`        en: ${d.label}`);
        console.log(`        fr: ${fr}`);
        erreurs++;
      }
    }
    // L'anglais citait un slot que le français ignore : perte d'information, pas forcément une faute.
    const enUsed = new Set([...d.label.matchAll(/\{(\d+)_/g)].map(x => Number(x[1])));
    for (const i of enUsed) if (!used.has(i)) {
      console.log(`AVERT   ${name}  slot ${i} présent en anglais, absent en français`);
      console.log(`        en: ${d.label}`);
      console.log(`        fr: ${fr}`);
      avert++;
    }
    if (/\{[^}]*\}/.test(fr.replace(/\{\d+_[a-z]+\}/g, ''))) {
      console.log(`ERREUR  ${name}  accolade mal formée : ${fr}`); erreurs++;
    }
  }
}

const manquants = defs.filter(d => !seen.has(d.defName));
console.log(`\n${seen.size}/${defs.length} labels traduits — ${erreurs} erreur(s), ${avert} avertissement(s)`);
if (process.argv[2] === '--manquants') console.log(manquants.map(d => d.defName).join('\n'));
process.exit(erreurs ? 1 : 0);
