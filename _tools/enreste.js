// Ce qu'il reste à traduire en anglais, et ce qui est fait.
//
//   node _tools/enreste.js                    récapitulatif par fichier
//   node _tools/enreste.js <fichier.xml>      sort le TSV à remplir pour ce fichier
//
// Le test est exact et non heuristique : le DefInjected du mod français conserve le
// texte français d'origine. Tant que le label de la def lui est identique, la def
// n'a pas été traduite. Aucune détection de langue n'est nécessaire.
const fs = require('fs');
const path = require('path');

const FR = '../FlavorTextExtendedFR/Languages/French/DefInjected/FlavorText.FlavorDef';
const fr = {};
for (const f of fs.readdirSync(FR).filter(x => /^Ext_/.test(x))) {
  const s = fs.readFileSync(path.join(FR, f), 'utf8');
  for (const m of s.matchAll(/<([\w.-]+)\.(label|description)>([\s\S]*?)<\/\1\.\2>/g)) {
    (fr[m[1]] = fr[m[1]] || {})[m[2]] = m[3];
  }
}

const cible = process.argv[2];
let totalFait = 0, totalReste = 0;

for (const f of fs.readdirSync('./Defs').filter(x => /^FlavorDefs_/.test(x)).sort()) {
  if (cible && f !== path.basename(cible)) continue;
  const xml = fs.readFileSync(path.join('./Defs', f), 'utf8');
  let fait = 0;
  const reste = [];
  for (const b of xml.match(/<FlavorText\.FlavorDef[\s\S]*?<\/FlavorText\.FlavorDef>/g) || []) {
    const dn = (b.match(/<defName>([\w.-]+)<\/defName>/) || [])[1];
    if (!dn || !fr[dn]) continue;
    const lab = (b.match(/<label>([\s\S]*?)<\/label>/) || [])[1];
    const des = (b.match(/<description>([\s\S]*?)<\/description>/) || [])[1];
    // On compare AUSSI la description : certains labels sont des noms propres
    // identiques dans les deux langues — « puerco en mole », « tom kha », « arancini » —
    // et le seul label ne permet pas de les distinguer d'une def non traduite.
    if (lab !== fr[dn].label || des !== fr[dn].description) { fait++; continue; }
    reste.push({ dn, lab, des });
  }
  totalFait += fait; totalReste += reste.length;

  if (cible) {
    for (const r of reste) {
      console.log(`# ${r.dn}`);
      console.log(`#   fr label : ${r.lab}`);
      console.log(`#   fr desc  : ${r.des}`);
      console.log('');
    }
  } else if (reste.length || fait) {
    console.log(`  ${String(fait).padStart(3)} faits  ${String(reste.length).padStart(3)} restants   ${f}`);
  }
}

if (!cible) console.log(`\n  TOTAL : ${totalFait} traduits, ${totalReste} restants sur ${totalFait + totalReste}`);
