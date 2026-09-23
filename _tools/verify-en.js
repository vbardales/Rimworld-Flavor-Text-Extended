// Final check of the English translation of the mod's defs.
//
//   node _tools/verify-en.js
//
// Three faults that proofreading does not reveal:
//   - a {N_...} pointing to a nonexistent ingredient slot -> placeholder displayed raw
//   - a slot declared and never cited (a simple counter: this is not a fault)
//   - French left over in a label or a description
//
// The French test applies to the description only: labels deliberately keep
// their original name ("coq au vin", "papa a la huancaína").
// The list keeps only function words that are not also English words --
// "pour" is excluded, otherwise "poured" would trigger on every line.
const fs = require('fs');
const path = require('path');

const FR = /\b(jusqu|avec|dans|aux|qui|que|une|leur|elles?|c'est|n'est|ne se|d'une|d'un)\b/i;

let defs = 0, erreurs = 0, avert = 0, muets = 0;

for (const f of fs.readdirSync('./Mod/Defs').filter(x => /^FlavorDefs_/.test(x)).sort()) {
  const xml = fs.readFileSync(path.join('./Mod/Defs', f), 'utf8');
  for (const b of xml.match(/<FlavorText\.FlavorDef[\s\S]*?<\/FlavorText\.FlavorDef>/g) || []) {
    const dn = (b.match(/<defName>([\w.-]+)<\/defName>/) || [])[1];
    if (!dn) continue;
    defs++;
    const lab = (b.match(/<label>([\s\S]*?)<\/label>/) || [])[1] || '';
    const des = (b.match(/<description>([\s\S]*?)<\/description>/) || [])[1] || '';
    const ing = (b.match(/<ingredients>[\s\S]*?<\/ingredients>/) || [])[0] || '';
    // one slot per top-level <li>: we count them via the <categories> blocks
    const nSlots = (ing.match(/<categories>/g) || []).length;

    const cites = new Set();
    for (const m of (lab + ' ' + des).matchAll(/\{(\d+)_\w+\}/g)) cites.add(Number(m[1]));

    for (const i of cites) {
      if (i >= nSlots) {
        console.log(`ERROR   ${dn}  {${i}_...} but only ${nSlots} ingredient slot(s)`);
        erreurs++;
      }
    }
    // A slot that is not cited is not a fault: it is used to select the dish, not to
    // write it. hekmo leaves some too. We count them for the order of magnitude.
    for (let i = 0; i < nSlots; i++) if (!cites.has(i)) muets++;
    const nu = des.replace(/\{\d+_\w+\}/g, ' ');
    if (FR.test(nu)) {
      console.log(`WARN    ${dn}  description: leftover French? "${des.slice(0, 70)}"`);
      avert++;
    }
  }
}

console.log(`\n${defs} dishes checked — ${erreurs} error(s), ${avert} warning(s), ${muets} slot(s) not cited`);
