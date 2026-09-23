// Extracts the French from the Defs into the French mod's DefInjected.
//
//   node _tools/split.js <French mod folder>
//
// RUN BEFORE translating the Defs into English: this script is what preserves
// the 896 French labels and descriptions currently hard-coded in the defs.
// Once the Defs are switched to English, the French source exists nowhere else.
//
// One output file per defs file, so that the correspondence stays readable:
//   Defs/FlavorDefs_FrenchRegions.xml  ->  DefInjected/FlavorText.FlavorDef/Ext_FrenchRegions.xml (the companion's existing files kept the pre-rename names, e.g. Ext_Regions.xml)
const fs = require('fs');
const path = require('path');

const OUT = process.argv[2];
if (!OUT) { console.error('usage: node _tools/split.js <French mod folder>'); process.exit(1); }
const dest = path.join(OUT, 'Languages', 'French', 'DefInjected', 'FlavorText.FlavorDef');
fs.mkdirSync(dest, { recursive: true });

let totalDefs = 0, totalFichiers = 0, sansDescription = [];

for (const f of fs.readdirSync('./Mod/Defs').filter(x => /^FlavorDefs_/.test(x)).sort()) {
  const xml = fs.readFileSync(path.join('./Mod/Defs', f), 'utf8');
  const lignes = [];
  for (const b of xml.match(/<FlavorText\.FlavorDef[\s\S]*?<\/FlavorText\.FlavorDef>/g) || []) {
    const dn = (b.match(/<defName>([\w.-]+)<\/defName>/) || [])[1];
    if (!dn) continue;
    const lab = (b.match(/<label>([\s\S]*?)<\/label>/) || [])[1];
    const des = (b.match(/<description>([\s\S]*?)<\/description>/) || [])[1];
    if (lab === undefined) continue;
    lignes.push(`\t<${dn}.label>${lab}</${dn}.label>`);
    if (des !== undefined) lignes.push(`\t<${dn}.description>${des}</${dn}.description>`);
    else sansDescription.push(dn);
    totalDefs++;
  }
  if (!lignes.length) continue;

  const nom = 'Ext_' + f.replace(/^FlavorDefs_FR_/, '').replace(/^FlavorDefs_/, '');
  const entete = `<?xml version="1.0" encoding="utf-8" ?>
<!--
  French translation of the dishes added by Flavor Text Extended.
  Generated from ${f} by _tools/split.js -- do not edit by hand.

  These texts used to be hard-coded in the defs, which displayed them
  in French whatever the game language. They now live here, and the
  defs carry the English.
-->
<LanguageData>

${lignes.join('\n')}

</LanguageData>
`;
  fs.writeFileSync(path.join(dest, nom), entete, 'utf8');
  totalFichiers++;
}

console.log(`${totalDefs} defs extracted to ${totalFichiers} files`);
if (sansDescription.length) console.log(`  without description (${sansDescription.length}):${sansDescription.slice(0, 5).join(', ')}`);
