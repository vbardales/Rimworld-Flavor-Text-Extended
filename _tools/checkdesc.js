// Contrôle les descriptions traduites : defName connu, pas de doublon, index de slot
// valide, suffixe connu, accolades bien formées, reste d'anglais évident.
//   node _tools/checkdesc.js
const fs = require('fs');
const path = require('path');
const defs = require('./flavordefs.json');
const byName = Object.fromEntries(defs.map(d => [d.defName, d]));
const DIR = 'Languages/French/DefInjected/FlavorText.FlavorDef';
const SUFFIXES = new Set(['plur', 'coll', 'sing', 'adj']);

const err = [], avert = [];
const vus = new Map();
let n = 0;

for (const f of fs.readdirSync(DIR).filter(f => /^Descriptions_/.test(f)).sort()) {
  const xml = fs.readFileSync(path.join(DIR, f), 'utf8');
  const corps = xml.replace(/<!--[\s\S]*?-->/g, '');
  // defName peut contenir un tiret (Pot-Au-Feu, Egg_Over-Easy…) : \w ne suffit pas.
  for (const m of corps.matchAll(/<([\w-]+)\.description>([\s\S]*?)<\/\1\.description>/g)) {
    const [, name, txt] = m;
    n++;
    const d = byName[name];
    if (!d) { err.push(`${f}  defName inconnu : ${name}`); continue; }
    if (vus.has(name)) err.push(`${f}  doublon : ${name} (déjà dans ${vus.get(name)})`);
    else vus.set(name, f);

    // accolades
    const ouvr = (txt.match(/\{/g) || []).length, ferm = (txt.match(/\}/g) || []).length;
    if (ouvr !== ferm) err.push(`${f}  ${name} : accolades déséquilibrées`);
    for (const bad of txt.matchAll(/\{([^}]*)\}/g)) {
      const p = bad[1].match(/^(\d+)_(\w+)$/);
      if (!p) { err.push(`${f}  ${name} : placeholder malformé « {${bad[1]}} »`); continue; }
      if (+p[1] >= d.slots.length) err.push(`${f}  ${name} : slot ${p[1]} hors bornes (${d.slots.length} slot(s))`);
      if (!SUFFIXES.has(p[2])) err.push(`${f}  ${name} : suffixe inconnu « ${p[2]} »`);
    }
    // l'original utilisait-il des slots que la traduction a perdus ?
    const enSlots = new Set([...String(d.desc).matchAll(/\{(\d+)_/g)].map(x => x[1]));
    const frSlots = new Set([...txt.matchAll(/\{(\d+)_/g)].map(x => x[1]));
    for (const s of enSlots) if (!frSlots.has(s)) avert.push(`${f}  ${name} : slot ${s} présent en anglais, absent en français`);
    // anglais résiduel
    if (/\b(the|with|and|of|until|made|from|a dish|served)\b/i.test(txt.replace(/\{[^}]*\}/g, '')))
      avert.push(`${f}  ${name} : mot anglais résiduel probable`);
  }
}

for (const e of err) console.log('ERREUR  ' + e);
for (const a of avert) console.log('AVERT   ' + a);
console.log(`\n${n}/${defs.length} descriptions traduites — ${err.length} erreur(s), ${avert.length} avertissement(s)`);
