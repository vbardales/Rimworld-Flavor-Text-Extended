// Splits the 930 FlavorDefs into work batches, grouped by meal kind and then by main
// ingredient category, to keep the vocabulary consistent from one batch to the next.
const fs = require('fs');
const defs = require('./flavordefs.json');

const SIZE = Number(process.argv[2] || 80);
const OUTDIR = './_tools/lots';
fs.mkdirSync(OUTDIR, { recursive: true });

const short = c => c.replace(/^FT_/, '');
const key = d => (d.mealKinds.map(short).join(',') || 'zz') + '|' +
                 (d.slots[0] ? d.slots[0].cats.map(short).join('/') : '~');

defs.sort((a, b) => key(a).localeCompare(key(b)) || a.label.localeCompare(b.label));

const lines = defs.map(d => {
  const slots = d.slots.map((s, i) => `${i}=${s.cats.map(short).join('/')}`).join(' ');
  const extra = [
    d.cookingStations.length ? 'station:' + d.cookingStations.map(short).join('/') : '',
    d.timeOfDay ? 'time:' + d.timeOfDay : '',
    d.requiredTags.length ? 'tags:' + d.requiredTags.join('/') : '',
  ].filter(Boolean).join(' ');
  return [d.defName, d.label, slots, d.mealKinds.map(short).join(','), extra].join('\t');
});

let n = 0;
for (let i = 0; i < lines.length; i += SIZE) {
  n++;
  const f = `${OUTDIR}/lot${String(n).padStart(2, '0')}.tsv`;
  fs.writeFileSync(f, 'defName\tlabel_en\tslots\tmealKind\tconstraints\n' +
    lines.slice(i, i + SIZE).join('\n') + '\n', 'utf8');
}
console.log(`${lines.length} defs -> ${n} batches of ${SIZE} in ${OUTDIR}`);
