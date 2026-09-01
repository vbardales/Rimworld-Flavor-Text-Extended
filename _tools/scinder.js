// Extrait le français des Defs vers le DefInjected du mod français.
//
//   node _tools/scinder.js <dossier du mod francais>
//
// À LANCER AVANT de traduire les Defs en anglais : c'est ce script qui met à l'abri
// les 896 labels et descriptions français actuellement écrits en dur dans les defs.
// Une fois les Defs passées à l'anglais, la source française n'existe plus ailleurs.
//
// Un fichier de sortie par fichier de defs, pour que la correspondance reste lisible :
//   Defs/FlavorDefs_FR_Regions.xml  ->  DefInjected/FlavorText.FlavorDef/Ext_Regions.xml
const fs = require('fs');
const path = require('path');

const OUT = process.argv[2];
if (!OUT) { console.error('usage : node _tools/scinder.js <dossier du mod francais>'); process.exit(1); }
const dest = path.join(OUT, 'Languages', 'French', 'DefInjected', 'FlavorText.FlavorDef');
fs.mkdirSync(dest, { recursive: true });

let totalDefs = 0, totalFichiers = 0, sansDescription = [];

for (const f of fs.readdirSync('./Defs').filter(x => /^FlavorDefs_/.test(x)).sort()) {
  const xml = fs.readFileSync(path.join('./Defs', f), 'utf8');
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
  Traduction française des plats ajoutés par Flavor Text Extended.
  Généré depuis ${f} par _tools/scinder.js — ne pas éditer à la main.

  Ces textes étaient auparavant écrits en dur dans les defs, ce qui les affichait
  en français quelle que soit la langue du jeu. Ils vivent maintenant ici, et les
  defs portent l'anglais.
-->
<LanguageData>

${lignes.join('\n')}

</LanguageData>
`;
  fs.writeFileSync(path.join(dest, nom), entete, 'utf8');
  totalFichiers++;
}

console.log(`${totalDefs} defs extraites vers ${totalFichiers} fichiers`);
if (sansDescription.length) console.log(`  sans description (${sansDescription.length}) : ${sansDescription.slice(0, 5).join(', ')}`);
