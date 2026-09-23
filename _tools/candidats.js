// Tests a list of candidate dish names against the 930 Flavor Text defs.
// Usage: node _tools/candidats.js "mole" "pozole" "samosa" ...
const defs = require('./flavordefs.json');
const norm = s => s.toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/\{[^}]*\}/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

const pris = new Map();
for (const d of defs) { const k = norm(d.label); if (k) pris.set(k, d.defName); }

const libres = [], occupes = [];
for (const c of process.argv.slice(2)) {
  const k = norm(c);
  if (pris.has(k)) occupes.push(`${c}  <- ${pris.get(k)}`); else libres.push(c);
}
console.log('ALREADY TAKEN (' + occupes.length + '):');
console.log(occupes.map(x => '  ' + x).join('\n') || '  none');
console.log('\nFREE (' + libres.length + '):');
console.log('  ' + libres.join(', '));
