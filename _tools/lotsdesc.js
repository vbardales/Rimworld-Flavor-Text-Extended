// Sort le lot NN de descriptions à traduire, calé sur le découpage des Labels_NN.xml
// (même ordre, mêmes groupes) pour que les deux fichiers se lisent en parallèle.
//   node _tools/lotsdesc.js 01
const fs = require('fs');
const defs = require('./flavordefs.json');
const byName = Object.fromEntries(defs.map(d => [d.defName, d]));

const nn = String(process.argv[2] || '01').padStart(2, '0');
const src = `Languages/French/DefInjected/FlavorText.FlavorDef/Labels_${nn}.xml`;
const xml = fs.readFileSync(src, 'utf8');

// déjà traduites ?
const dir = 'Languages/French/DefInjected/FlavorText.FlavorDef';
const faits = new Set();
for (const f of fs.readdirSync(dir).filter(f => /^Descriptions_/.test(f)))
  for (const m of fs.readFileSync(`${dir}/${f}`, 'utf8').matchAll(/<([\w-]+)\.description>/g)) faits.add(m[1]);

let groupe = '';
let n = 0;
for (const line of xml.split('\n')) {
  const c = line.match(/<!--\s*(.+?)\s*-->/);
  if (c && !/Rappel|slots|Règle|forme|substantif|genre/.test(c[1])) { groupe = c[1]; console.log(`\n##### ${groupe}`); continue; }
  const m = line.match(/<([\w-]+)\.label>(.*)<\/\1\.label>/);
  if (!m) continue;
  const d = byName[m[1]];
  if (!d) { console.log(`?? defName inconnu : ${m[1]}`); continue; }
  if (faits.has(m[1])) continue;
  n++;
  console.log(`${m[1]}\t[${m[2]}]\tslots=${d.slots.length}\n   EN: ${d.desc}`);
}
console.log(`\n=== lot ${nn} : ${n} description(s) restant à traduire ===`);
