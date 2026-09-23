// Applies to the Defs the English translations supplied as TSV, and checks that nothing
// is lost along the way.
//
//   node _tools/english.js <file.tsv>          applies
//   node _tools/english.js <file.tsv> --dry-run  shows what would be done, without writing
//
// TSV format, one line per dish, real tab characters:
//   defName <TAB> English label <TAB> English description
//
// The {N_form} slots must be IDENTICAL to those of the French: same index,
// same suffix. The script rejects the line otherwise -- it is the only error that silently
// breaks the in-game display, so it is blocking rather than merely reported.
const fs = require('fs');
const path = require('path');

const tsv = process.argv[2];
const essai = process.argv.includes('--dry-run');
if (!tsv) { console.error('usage: node _tools/english.js <file.tsv> [--dry-run]'); process.exit(1); }

const slots = t => [...String(t).matchAll(/\{(\d+_\w+)\}/g)].map(m => m[1]).sort().join(',');

// index: defName -> file
const index = {};
for (const f of fs.readdirSync('./Mod/Defs').filter(x => /^FlavorDefs_/.test(x))) {
  for (const m of fs.readFileSync(path.join('./Mod/Defs', f), 'utf8').matchAll(/<defName>([\w.-]+)<\/defName>/g))
    index[m[1]] = f;
}

const lignes = fs.readFileSync(tsv, 'utf8').split(/\r?\n/).filter(l => l.trim() && !l.startsWith('#'));
const parFichier = {}, erreurs = [];

for (const l of lignes) {
  const [dn, lab, des] = l.split('\t');
  if (!dn || !lab || !des) { erreurs.push(`${dn || '?'}: malformed line (3 columns expected)`); continue; }
  const f = index[dn];
  if (!f) { erreurs.push(`${dn}: unknown defName`); continue; }
  (parFichier[f] = parFichier[f] || []).push({ dn, lab, des });
}

let nb = 0;
for (const f in parFichier) {
  let xml = fs.readFileSync(path.join('./Mod/Defs', f), 'utf8');
  for (const { dn, lab, des } of parFichier[f]) {
    const bloc = new RegExp('(<defName>' + dn + '</defName>[\\s\\S]*?)</FlavorText\\.FlavorDef>');
    const m = xml.match(bloc);
    if (!m) { erreurs.push(`${dn}: block not found in ${f}`); continue; }
    const frLab = (m[1].match(/<label>([\s\S]*?)<\/label>/) || [])[1];
    const frDes = (m[1].match(/<description>([\s\S]*?)<\/description>/) || [])[1];
    if (frLab === undefined || frDes === undefined) { erreurs.push(`${dn}: label or description missing`); continue; }
    if (slots(frLab) !== slots(lab)) { erreurs.push(`${dn}: label slots differ — fr [${slots(frLab)}] en [${slots(lab)}]`); continue; }
    if (slots(frDes) !== slots(des)) { erreurs.push(`${dn}: description slots differ — fr [${slots(frDes)}] en [${slots(des)}]`); continue; }
    const neuf = m[1].replace(/<label>[\s\S]*?<\/label>/, '<label>' + lab + '</label>')
                     .replace(/<description>[\s\S]*?<\/description>/, '<description>' + des + '</description>');
    xml = xml.replace(m[1], neuf);
    nb++;
  }
  if (!essai) fs.writeFileSync(path.join('./Mod/Defs', f), xml, 'utf8');
}

for (const e of erreurs) console.log('ERROR   ' + e);
console.log(`${nb}/${lignes.length} dishes translated${essai ? ' (dry run, nothing written)' : ''} — ${erreurs.length} error(s)`);
