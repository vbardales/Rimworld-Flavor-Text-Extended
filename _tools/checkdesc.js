// Checks the translated descriptions: known defName, no duplicate, valid slot index,
// known suffix, well-formed braces, obvious leftover English.
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
  // A defName can contain a hyphen (Pot-Au-Feu, Egg_Over-Easy...): \w is not enough.
  for (const m of corps.matchAll(/<([\w-]+)\.description>([\s\S]*?)<\/\1\.description>/g)) {
    const [, name, txt] = m;
    n++;
    const d = byName[name];
    if (!d) { err.push(`${f}  unknown defName: ${name}`); continue; }
    if (vus.has(name)) err.push(`${f}  duplicate: ${name} (already in ${vus.get(name)})`);
    else vus.set(name, f);

    // braces
    const ouvr = (txt.match(/\{/g) || []).length, ferm = (txt.match(/\}/g) || []).length;
    if (ouvr !== ferm) err.push(`${f}  ${name}: unbalanced braces`);
    for (const bad of txt.matchAll(/\{([^}]*)\}/g)) {
      const p = bad[1].match(/^(\d+)_(\w+)$/);
      if (!p) { err.push(`${f}  ${name}: malformed placeholder "{${bad[1]}}"`); continue; }
      if (+p[1] >= d.slots.length) err.push(`${f}  ${name}: slot ${p[1]} out of range (${d.slots.length} slot(s))`);
      if (!SUFFIXES.has(p[2])) err.push(`${f}  ${name}: unknown suffix "${p[2]}"`);
    }
    // did the original use slots that the translation lost?
    const enSlots = new Set([...String(d.desc).matchAll(/\{(\d+)_/g)].map(x => x[1]));
    const frSlots = new Set([...txt.matchAll(/\{(\d+)_/g)].map(x => x[1]));
    for (const s of enSlots) if (!frSlots.has(s)) avert.push(`${f}  ${name}: slot ${s} present in English, absent in French`);
    // leftover English
    if (/\b(the|with|and|of|until|made|from|a dish|served)\b/i.test(txt.replace(/\{[^}]*\}/g, '')))
      avert.push(`${f}  ${name}: probable leftover English word`);
  }
}

for (const e of err) console.log('ERROR   ' + e);
for (const a of avert) console.log('WARN    ' + a);
console.log(`\n${n}/${defs.length} descriptions translated — ${err.length} error(s), ${avert.length} warning(s)`);
