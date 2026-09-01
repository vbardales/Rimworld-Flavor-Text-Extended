// Contrôle final de la traduction anglaise des defs du mod.
//
//   node _tools/verifen.js
//
// Trois fautes que la relecture ne voit pas :
//   - un {N_...} qui pointe vers un slot d'ingrédient inexistant -> placeholder affiché brut
//   - un slot déclaré et jamais cité (simple compteur : ce n'est pas une faute)
//   - du français resté dans un label ou une description
//
// Le test du français ne porte que sur la description : les labels gardent
// volontairement leur nom d'origine (« coq au vin », « papa a la huancaína »).
// La liste ne retient que des mots-outils qui ne sont pas aussi des mots anglais —
// « pour » en est exclu, sans quoi « poured » déclenche à chaque ligne.
const fs = require('fs');
const path = require('path');

const FR = /\b(jusqu|avec|dans|aux|qui|que|une|leur|elles?|c'est|n'est|ne se|d'une|d'un)\b/i;

let defs = 0, erreurs = 0, avert = 0, muets = 0;

for (const f of fs.readdirSync('./Defs').filter(x => /^FlavorDefs_/.test(x)).sort()) {
  const xml = fs.readFileSync(path.join('./Defs', f), 'utf8');
  for (const b of xml.match(/<FlavorText\.FlavorDef[\s\S]*?<\/FlavorText\.FlavorDef>/g) || []) {
    const dn = (b.match(/<defName>([\w.-]+)<\/defName>/) || [])[1];
    if (!dn) continue;
    defs++;
    const lab = (b.match(/<label>([\s\S]*?)<\/label>/) || [])[1] || '';
    const des = (b.match(/<description>([\s\S]*?)<\/description>/) || [])[1] || '';
    const ing = (b.match(/<ingredients>[\s\S]*?<\/ingredients>/) || [])[0] || '';
    // un slot par <li> de premier niveau : on les compte via les blocs <categories>
    const nSlots = (ing.match(/<categories>/g) || []).length;

    const cites = new Set();
    for (const m of (lab + ' ' + des).matchAll(/\{(\d+)_\w+\}/g)) cites.add(Number(m[1]));

    for (const i of cites) {
      if (i >= nSlots) {
        console.log(`ERREUR  ${dn}  {${i}_...} mais seulement ${nSlots} slot(s) d'ingrédients`);
        erreurs++;
      }
    }
    // Un slot non cité n'est pas une faute : il sert à sélectionner le plat, pas à
    // l'écrire. hekmo en laisse aussi. On le compte pour l'ordre de grandeur.
    for (let i = 0; i < nSlots; i++) if (!cites.has(i)) muets++;
    const nu = des.replace(/\{\d+_\w+\}/g, ' ');
    if (FR.test(nu)) {
      console.log(`AVERT   ${dn}  description : reste de français ? « ${des.slice(0, 70)} »`);
      avert++;
    }
  }
}

console.log(`\n${defs} plats vérifiés — ${erreurs} erreur(s), ${avert} avertissement(s), ${muets} slot(s) non cités`);
