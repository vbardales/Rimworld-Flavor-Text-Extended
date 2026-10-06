// Lists the vanilla animal races + their FR label, to generate the meat/egg inflections.
//
// The trap: `useMeatFrom` is almost always declared on an ABSTRACT def, not on the
// animal. `SmallBirdThingBase` and `WaterBirdThingBase` (Odyssey) both carry
// <useMeatFrom>Cassowary</useMeatFrom>; sparrow, crow, heron and flamingo therefore have
// no meat of their own -- Meat_Crow does not exist. Reading def by def does not see this:
// abstract defs have no <defName> and dropped out of the scan.
//
// So we index ALL ThingDefs by their Name attribute, then resolve useMeatFrom,
// meatLabel and IsFlesh by walking up the ParentName chain. The attribute order
// varies across the game's files (`Name=` before or after `ParentName=`), hence two
// separate expressions rather than a positional capture.
const fs = require('fs');
const path = require('path');

const DATA = 'C:/Program Files (x86)/Steam/steamapps/common/RimWorld/Data';
const FR = process.argv[2]; // folder of the extracted FR languages
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

// 1. FR labels of all ThingDefs
const frLabel = {};
for (const exp of EXPANSIONS) {
  for (const f of walk(path.join(FR, exp, 'DefInjected', 'ThingDef'))) {
    const xml = fs.readFileSync(f, 'utf8');
    for (const m of xml.matchAll(/<([A-Za-z0-9_.]+)\.label>([^<]*)<\/\1\.label>/g)) {
      frLabel[m[1]] = m[2].trim();
    }
  }
}

// 2. all ThingDefs, abstract ones included, indexed by their Name attribute
//    `undefined` = field absent from this block, so it is inherited. An empty string would
//    be an explicit value: the distinction matters for the walk up the chain.
const un = (body, tag) => {
  const m = body.match(new RegExp('<' + tag + '>([^<]*)</' + tag + '>'));
  return m ? m[1].trim() : undefined;
};

const byName = {};          // Name -> block
const concrets = [];        // the races to output

for (const exp of EXPANSIONS) {
  for (const f of walk(path.join(DATA, exp, 'Defs', 'ThingDefs_Races'))) {
    const xml = fs.readFileSync(f, 'utf8');
    for (const m of xml.matchAll(/<ThingDef\b([^>]*)>([\s\S]*?)<\/ThingDef>/g)) {
      const attrs = m[1], body = m[2];
      const nom = (attrs.match(/\bName\s*=\s*"([^"]*)"/) || [])[1];
      const parent = (attrs.match(/\bParentName\s*=\s*"([^"]*)"/) || [])[1];
      const bloc = {
        parent,
        useMeatFrom: un(body, 'useMeatFrom'),
        meatLabel: un(body, 'meatLabel'),
        isFlesh: un(body, 'IsFlesh'),
        // The fleshType says whether the race yields meat. It is inherited too:
        // the five Anomaly flesh beasts do not carry it, their base does.
        fleshType: un(body, 'fleshType'),
      };
      if (nom) byName[nom] = bloc;

      const dn = un(body, 'defName');
      if (!dn || !/<race>/.test(body)) continue;
      concrets.push({ dn, exp, bloc, en: un(body, 'label') || '' });
    }
  }
}

// 3. walk up: take the first value found while climbing toward the root.
//    The `vus` guard protects against a ParentName cycle, which would hang the script.
function herite(bloc, champ) {
  const vus = new Set();
  for (let b = bloc; b; b = byName[b.parent]) {
    if (b[champ] !== undefined) return b[champ];
    if (!b.parent || vus.has(b.parent)) break;
    vus.add(b.parent);
  }
  return undefined;
}

const animals = concrets.map(({ dn, exp, bloc, en }) => ({
  defName: dn,
  en,
  fr: frLabel[dn] || '',
  meatLabel: herite(bloc, 'meatLabel') || '',
  useMeatFrom: herite(bloc, 'useMeatFrom') || null,
  hasMeat: herite(bloc, 'isFlesh') !== 'false',
  fleshType: herite(bloc, 'fleshType') || '',
  exp,
}));

const out = animals.filter(a => a.fr || a.en);
fs.writeFileSync(process.argv[3], JSON.stringify(out, null, 1));

const emprunts = out.filter(a => a.useMeatFrom);
const chairs = {};
for (const a of out) (chairs[a.fleshType || '(ordinary)'] ??= []).push(a.defName);

console.log('races:', out.length, '| with FR label:', out.filter(a => a.fr).length);
console.log('without own meat (useMeatFrom):', emprunts.length);
console.log(emprunts.map(a => `  ${a.defName} -> ${a.useMeatFrom}`).join('\n'));
console.log('\nresolved fleshType:');
for (const [t, l] of Object.entries(chairs)) console.log(`  ${t.padEnd(18)} ${l.length}`);
