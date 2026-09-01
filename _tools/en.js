// Applique aux Defs les traductions anglaises fournies en TSV, et vérifie que rien
// n'est perdu au passage.
//
//   node _tools/en.js <fichier.tsv>          applique
//   node _tools/en.js <fichier.tsv> --essai  montre ce qui serait fait, sans écrire
//
// Format TSV, une ligne par plat, tabulations réelles :
//   defName <TAB> label anglais <TAB> description anglaise
//
// Les emplacements {N_form} doivent être IDENTIQUES à ceux du français : même index,
// même suffixe. Le script refuse la ligne sinon — c'est la seule erreur qui casse
// silencieusement l'affichage en jeu, donc elle est bloquante et non signalée.
const fs = require('fs');
const path = require('path');

const tsv = process.argv[2];
const essai = process.argv.includes('--essai');
if (!tsv) { console.error('usage : node _tools/en.js <fichier.tsv> [--essai]'); process.exit(1); }

const slots = t => [...String(t).matchAll(/\{(\d+_\w+)\}/g)].map(m => m[1]).sort().join(',');

// index : defName -> fichier
const index = {};
for (const f of fs.readdirSync('./Defs').filter(x => /^FlavorDefs_/.test(x))) {
  for (const m of fs.readFileSync(path.join('./Defs', f), 'utf8').matchAll(/<defName>([\w.-]+)<\/defName>/g))
    index[m[1]] = f;
}

const lignes = fs.readFileSync(tsv, 'utf8').split(/\r?\n/).filter(l => l.trim() && !l.startsWith('#'));
const parFichier = {}, erreurs = [];

for (const l of lignes) {
  const [dn, lab, des] = l.split('\t');
  if (!dn || !lab || !des) { erreurs.push(`${dn || '?'} : ligne mal formée (3 colonnes attendues)`); continue; }
  const f = index[dn];
  if (!f) { erreurs.push(`${dn} : defName inconnu`); continue; }
  (parFichier[f] = parFichier[f] || []).push({ dn, lab, des });
}

let nb = 0;
for (const f in parFichier) {
  let xml = fs.readFileSync(path.join('./Defs', f), 'utf8');
  for (const { dn, lab, des } of parFichier[f]) {
    const bloc = new RegExp('(<defName>' + dn + '</defName>[\\s\\S]*?)</FlavorText\\.FlavorDef>');
    const m = xml.match(bloc);
    if (!m) { erreurs.push(`${dn} : bloc introuvable dans ${f}`); continue; }
    const frLab = (m[1].match(/<label>([\s\S]*?)<\/label>/) || [])[1];
    const frDes = (m[1].match(/<description>([\s\S]*?)<\/description>/) || [])[1];
    if (frLab === undefined || frDes === undefined) { erreurs.push(`${dn} : label ou description absent`); continue; }
    if (slots(frLab) !== slots(lab)) { erreurs.push(`${dn} : emplacements du label différents — fr [${slots(frLab)}] en [${slots(lab)}]`); continue; }
    if (slots(frDes) !== slots(des)) { erreurs.push(`${dn} : emplacements de la description différents — fr [${slots(frDes)}] en [${slots(des)}]`); continue; }
    const neuf = m[1].replace(/<label>[\s\S]*?<\/label>/, '<label>' + lab + '</label>')
                     .replace(/<description>[\s\S]*?<\/description>/, '<description>' + des + '</description>');
    xml = xml.replace(m[1], neuf);
    nb++;
  }
  if (!essai) fs.writeFileSync(path.join('./Defs', f), xml, 'utf8');
}

for (const e of erreurs) console.log('ERREUR  ' + e);
console.log(`${nb}/${lignes.length} plats traduits${essai ? ' (essai, rien écrit)' : ''} — ${erreurs.length} erreur(s)`);
