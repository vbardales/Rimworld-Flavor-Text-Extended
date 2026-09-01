// Liste les races animales vanilla + leur label FR, pour générer les inflexions de viande/œufs.
const fs = require('fs');
const path = require('path');

const DATA = 'C:/Program Files (x86)/Steam/steamapps/common/RimWorld/Data';
const FR = process.argv[2]; // dossier des langues FR extraites
const EXPANSIONS = ['Core', 'Royalty', 'Ideology', 'Biotech', 'Anomaly', 'Odyssey'];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.xml')) out.push(p);
  }
  return out;
}

// 1. labels FR de tous les ThingDef
const frLabel = {};
for (const exp of EXPANSIONS) {
  for (const f of walk(path.join(FR, exp, 'DefInjected', 'ThingDef'))) {
    const xml = fs.readFileSync(f, 'utf8');
    for (const m of xml.matchAll(/<([A-Za-z0-9_.]+)\.label>([^<]*)<\/\1\.label>/g)) {
      frLabel[m[1]] = m[2].trim();
    }
  }
}

// 2. races animales (ThingDef contenant <race> et <foodType> ou une <race> avec baseBodySize)
const animals = [];
for (const exp of EXPANSIONS) {
  for (const f of walk(path.join(DATA, exp, 'Defs', 'ThingDefs_Races'))) {
    const xml = fs.readFileSync(f, 'utf8');
    for (const b of xml.split(/<ThingDef[^>]*>/).slice(1)) {
      const body = b.split('</ThingDef>')[0];
      if (!/<race>/.test(body)) continue;
      const dn = (body.match(/<defName>([^<]*)<\/defName>/) || [])[1];
      if (!dn) continue;
      const enLabel = (body.match(/<label>([^<]*)<\/label>/) || [])[1] || '';
      const meatLabel = (body.match(/<meatLabel>([^<]*)<\/meatLabel>/) || [])[1] || '';
      const useMeat = !/<useMeatFrom>/.test(body) ? null : (body.match(/<useMeatFrom>([^<]*)<\/useMeatFrom>/) || [])[1];
      const hasMeat = !/<IsFlesh>false<\/IsFlesh>/.test(body);
      animals.push({ defName: dn, en: enLabel, fr: frLabel[dn] || '', meatLabel, useMeatFrom: useMeat, hasMeat, exp });
    }
  }
}

const out = animals.filter(a => a.fr || a.en);
fs.writeFileSync(process.argv[3], JSON.stringify(out, null, 1));
console.log('races:', out.length, '| avec label FR:', out.filter(a => a.fr).length);
console.log(out.slice(0, 12).map(a => `${a.defName}: ${a.en} / ${a.fr}`).join('\n'));
