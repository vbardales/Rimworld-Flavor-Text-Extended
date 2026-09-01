const fs = require('fs');
const src = process.argv[2];
const xml = fs.readFileSync(src, 'utf8');

const blocks = xml
  .split(/<FlavorText\.FlavorDef[^>]*>/)
  .slice(1)
  .map(b => b.split('</FlavorText.FlavorDef>')[0]);

function one(b, t) {
  const m = b.match(new RegExp('<' + t + '>([^]*?)</' + t + '>'));
  return m ? m[1].trim() : '';
}
function list(b, t) {
  const s = one(b, t);
  return s ? [...s.matchAll(/<li>([^<]*)<\/li>/g)].map(m => m[1].trim()) : [];
}

const out = [];
for (const b of blocks) {
  const defName = one(b, 'defName');
  if (!defName) continue;
  const ing = one(b, 'ingredients');
  const slots = [...ing.matchAll(/<li>\s*<categories>([^]*?)<\/categories>([^]*?)<\/li>\s*(?=<li>|$)/g)].map(m => ({
    cats: [...m[1].matchAll(/<li>([^<]*)<\/li>/g)].map(x => x[1].trim()),
    extra: m[2].replace(/\s+/g, ' ').trim(),
  }));
  out.push({
    defName,
    label: one(b, 'label'),
    desc: one(b, 'description'),
    slots,
    mealKinds: list(b, 'mealKinds'),
    cookingStations: list(b, 'cookingStations'),
    timeOfDay: one(b, 'timeOfDay'),
    requiredTags: list(b, 'requiredTags'),
    varietyTexture: one(b, 'varietyTexture'),
  });
}
fs.writeFileSync(process.argv[3], JSON.stringify(out, null, 1));
console.log('defs:', out.length);
console.log('slots histogram:', out.reduce((a, d) => { a[d.slots.length] = (a[d.slots.length] || 0) + 1; return a; }, {}));
