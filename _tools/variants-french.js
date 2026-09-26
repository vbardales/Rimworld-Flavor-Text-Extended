// Writes the French entries of the shorter forms (FlavorDefs_Variants.xml) from the French text of their originals.
//
//   node _tools/variants-french.js <companion DefInjected/FlavorText.FlavorDef folder> <output folder>
//
// The companion mod (Flavor Text Extended - Français) translates by defName, so each variant needs its own
// `<defName>.label` and `<defName>.description`. A variant has the same text as the dish it copies and fewer slots, so
// its French is the French of the original with the {N_...} tokens renumbered as in _tools/variants-map.json. This
// script does that and writes Labels_Variants.xml and Descriptions_Variants.xml into the output folder, for the
// companion's session to copy into its own repository (this repository never writes there).
//
// A variant whose French text cites a slot the variant no longer has (the French text may use an ingredient that the
// English one does not) is NOT written: it is listed on stdout for a hand translation.
// Altang and Jjapaghuri changed their own text and slots: they are listed too, so that the French follows.

const fs = require('fs');
const path = require('path');

const [DIR, OUT] = process.argv.slice(2);
if (!DIR || !OUT) { console.error('usage: node _tools/variants-french.js <DefInjected/FlavorText.FlavorDef> <output folder>'); process.exit(1); }
const map = JSON.parse(fs.readFileSync(path.join(__dirname, 'variants-map.json'), 'utf8'));

const texts = { label: new Map(), description: new Map() };
for (const f of fs.readdirSync(DIR).filter(x => x.endsWith('.xml'))) {
  const xml = fs.readFileSync(path.join(DIR, f), 'utf8');
  for (const m of xml.matchAll(/<([A-Za-z0-9_]+)\.(label|description)>([\s\S]*?)<\/\1\.\2>/g)) texts[m[2]].set(m[1], m[3]);
}
const renumber = (text, tokens) => text.replace(/\{(\d+)_/g, (all, i) => (i in tokens ? `{${tokens[i]}_` : all));
const cites = text => new Set([...text.matchAll(/\{(\d+)_/g)].map(m => m[1]));

const out = { label: [], description: [] };
const manual = [];
for (const [variant, v] of Object.entries(map)) {
  const missing = ['label', 'description'].filter(k => !texts[k].has(v.copies));
  if (missing.length) { manual.push(`${variant}: the companion has no French ${missing.join(' and ')} for ${v.copies}`); continue; }
  const lost = [];
  for (const k of ['label', 'description']) for (const i of cites(texts[k].get(v.copies))) if (!(i in v.tokens)) lost.push(`${k} cites {${i}_...}`);
  if (lost.length) { manual.push(`${variant}: ${lost.join(', ')}, a slot the variant dropped`); continue; }
  for (const k of ['label', 'description']) out[k].push(`\t<${variant}.${k}>${renumber(texts[k].get(v.copies), v.tokens)}</${variant}.${k}>`);
}

fs.mkdirSync(OUT, { recursive: true });
for (const [k, file] of [['label', 'Labels_Variants.xml'], ['description', 'Descriptions_Variants.xml']]) {
  fs.writeFileSync(path.join(OUT, file), `<?xml version="1.0" encoding="utf-8"?>\n<LanguageData>\n\n${out[k].join('\n\n')}\n\n</LanguageData>\n`);
}
console.log(`${out.label.length} of ${Object.keys(map).length} variants have their French written in ${OUT}`);
if (manual.length) { console.log('to translate by hand:'); for (const m of manual) console.log('  ' + m); }
console.log('Also for the French: FlavorTextExtended_Altang and FlavorTextExtended_Jjapaghuri lost a slot and changed their English text.');
