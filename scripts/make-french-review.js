// Writes FRENCH_REVIEW.md at the repository root from the shipped Defs (TRANSLATIONS.md, "Review file").
//   node scripts/make-french-review.js
// This mod is original and ships English only (the French is the companion mod's), so the Original and
// English columns carry the same text and the French column stays empty. The texts are copied as they ship.
const fs = require('fs'), path = require('path'), cp = require('child_process');
const root = path.resolve(__dirname, '..'), defs = path.join(root, 'Mod', 'Defs');
const cell = s => s.replace(/\r/g, '').replace(/\n\s*/g, ' ').replace(/\|/g, '\|').trim();
const name = (/<name>([^<]*)<\/name>/.exec(fs.readFileSync(path.join(root, 'Mod', 'About', 'About.xml'), 'utf8')) || [])[1];
const rev = cp.execSync('git log -1 --format=%h -- Mod/Defs', { cwd: root }).toString().trim();
let out = `# French review - ${name}\n\nRevision: \`${rev}\` (last commit that touched \`Mod/Defs\`).\n\n`
  + 'This mod is original: it has no source language other than English, so the Original and English columns carry the same text. '
  + 'It ships no French (the companion mod "Flavor Text Extended - Francais" carries it), so the French column is empty. '
  + 'Grammar tokens such as `{0_coll}` and `{2_plur}` are copied as they ship.\n\n';
let rows = 0, files = 0;
for (const f of fs.readdirSync(defs).filter(x => x.endsWith('.xml')).sort()) {
  const t = fs.readFileSync(path.join(defs, f), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  const r = [];
  for (const m of t.matchAll(/<defName>([^<]+)<\/defName>([\s\S]*?)(?=<defName>|<\/Defs>)/g)) {
    for (const tag of ['label', 'description']) {
      const x = new RegExp('<' + tag + '>([^]*?)</' + tag + '>').exec(m[2].split(/<ingredients>[\s\S]*?<\/ingredients>/).join(''));
      if (x && x[1].trim()) r.push(`| ${m[1]}.${tag} | ${cell(x[1])} | ${cell(x[1])} | |`);
    }
  }
  if (!r.length) continue;
  files++; rows += r.length;
  out += `## ${f}\n\n| Key | Original | English | French |\n|---|---|---|---|\n${r.join('\n')}\n\n`;
}
fs.writeFileSync(path.join(root, 'FRENCH_REVIEW.md'), out.split('\n').join('\r\n'));
console.log(files + ' files, ' + rows + ' rows, revision ' + rev);
