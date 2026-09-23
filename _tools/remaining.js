// What is left to translate into English, and what is done.
//
//   node _tools/remaining.js                    summary per file
//   node _tools/remaining.js <file.xml>         outputs the TSV to fill in for that file
//
// The test is exact, not heuristic: the French mod's DefInjected keeps the original
// French text. As long as the def's label is identical to it, the def
// has not been translated. No language detection is needed.
const fs = require('fs');
const path = require('path');

const FR = '../FlavorTextExtendedFR/Mod/Languages/French/DefInjected/FlavorText.FlavorDef';
const fr = {};
for (const f of fs.readdirSync(FR).filter(x => /^Ext_/.test(x))) {
  const s = fs.readFileSync(path.join(FR, f), 'utf8');
  for (const m of s.matchAll(/<([\w.-]+)\.(label|description)>([\s\S]*?)<\/\1\.\2>/g)) {
    (fr[m[1]] = fr[m[1]] || {})[m[2]] = m[3];
  }
}

const cible = process.argv[2];
let totalFait = 0, totalReste = 0;

for (const f of fs.readdirSync('./Mod/Defs').filter(x => /^FlavorDefs_/.test(x)).sort()) {
  if (cible && f !== path.basename(cible)) continue;
  const xml = fs.readFileSync(path.join('./Mod/Defs', f), 'utf8');
  let fait = 0;
  const reste = [];
  for (const b of xml.match(/<FlavorText\.FlavorDef[\s\S]*?<\/FlavorText\.FlavorDef>/g) || []) {
    const dn = (b.match(/<defName>([\w.-]+)<\/defName>/) || [])[1];
    if (!dn || !fr[dn]) continue;
    const lab = (b.match(/<label>([\s\S]*?)<\/label>/) || [])[1];
    const des = (b.match(/<description>([\s\S]*?)<\/description>/) || [])[1];
    // We compare the description TOO: some labels are proper names
    // identical in both languages -- "puerco en mole", "tom kha", "arancini" --
    // and the label alone cannot tell them apart from an untranslated def.
    if (lab !== fr[dn].label || des !== fr[dn].description) { fait++; continue; }
    reste.push({ dn, lab, des });
  }
  totalFait += fait; totalReste += reste.length;

  if (cible) {
    for (const r of reste) {
      console.log(`# ${r.dn}`);
      console.log(`#   fr label: ${r.lab}`);
      console.log(`#   fr desc : ${r.des}`);
      console.log('');
    }
  } else if (reste.length || fait) {
    console.log(`  ${String(fait).padStart(3)} done  ${String(reste.length).padStart(3)} remaining   ${f}`);
  }
}

if (!cible) console.log(`\n  TOTAL: ${totalFait} translated, ${totalReste} remaining out of ${totalFait + totalReste}`);
