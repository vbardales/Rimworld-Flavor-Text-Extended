// Checks the translated labels against the original defs.
// Catches the three faults that proofreading does not reveal:
//   - a defName that does not exist (typo -> translation silently ignored)
//   - a {N_...} pointing to a nonexistent ingredient slot -> placeholder displayed raw
//   - a required slot that is never used, while the English used it
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
    if (!d) { console.log(`ERROR   ${f}  unknown defName: ${name}`); erreurs++; continue; }
    if (seen.has(name)) { console.log(`ERROR   ${f}  duplicate: ${name}`); erreurs++; }
    seen.add(name);

    const used = new Set();
    for (const p of fr.matchAll(/\{(\d+)_([a-z]+)\}/g)) {
      const i = Number(p[1]);
      used.add(i);
      if (!SUFFIXES.has(p[2])) { console.log(`ERROR   ${name}  unknown suffix: {${p[1]}_${p[2]}}`); erreurs++; }
      if (i >= d.slots.length) {
        console.log(`ERROR   ${name}  slot ${i} does not exist (the def has only ${d.slots.length} ingredient(s))`);
        console.log(`        en: ${d.label}`);
        console.log(`        fr: ${fr}`);
        erreurs++;
      }
    }
    // The English cited a slot that the French ignores: information loss, not necessarily a fault.
    const enUsed = new Set([...d.label.matchAll(/\{(\d+)_/g)].map(x => Number(x[1])));
    for (const i of enUsed) if (!used.has(i)) {
      console.log(`WARN    ${name}  slot ${i} present in English, absent in French`);
      console.log(`        en: ${d.label}`);
      console.log(`        fr: ${fr}`);
      avert++;
    }
    if (/\{[^}]*\}/.test(fr.replace(/\{\d+_[a-z]+\}/g, ''))) {
      console.log(`ERROR   ${name}  malformed brace: ${fr}`); erreurs++;
    }
  }
}

const manquants = defs.filter(d => !seen.has(d.defName));
console.log(`\n${seen.size}/${defs.length} labels translated — ${erreurs} error(s), ${avert} warning(s)`);
if (process.argv[2] === '--missing') console.log(manquants.map(d => d.defName).join('\n'));
process.exit(erreurs ? 1 : 0);
