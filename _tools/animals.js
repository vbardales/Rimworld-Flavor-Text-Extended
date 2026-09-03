// Liste les races animales vanilla + leur label FR, pour générer les inflexions de viande/œufs.
//
// Le piège : `useMeatFrom` est presque toujours déclaré sur une def ABSTRAITE, pas sur
// l'animal. `SmallBirdThingBase` et `WaterBirdThingBase` (Odyssey) portent tous deux
// <useMeatFrom>Cassowary</useMeatFrom> ; moineau, corbeau, héron, flamant n'ont donc pas
// de viande propre — Meat_Crow n'existe pas. Une lecture def par def ne le voit pas :
// les defs abstraites n'ont pas de <defName> et sortaient du balayage.
//
// On indexe donc TOUS les ThingDef par leur attribut Name, puis on résout useMeatFrom,
// meatLabel et IsFlesh en remontant la chaîne des ParentName. L'ordre des attributs
// varie dans les fichiers du jeu (`Name=` avant ou après `ParentName=`), d'où deux
// expressions séparées plutôt qu'une capture positionnelle.
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

// 2. tous les ThingDef, abstraits compris, indexés par leur attribut Name
//    `undefined` = champ absent de ce bloc, donc à hériter. Une chaîne vide serait
//    une valeur explicite : la distinction compte pour la remontée.
const un = (body, tag) => {
  const m = body.match(new RegExp('<' + tag + '>([^<]*)</' + tag + '>'));
  return m ? m[1].trim() : undefined;
};

const byName = {};          // Name -> bloc
const concrets = [];        // les races à sortir

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
        // Le fleshType dit si la race donne une viande. Il s'hérite lui aussi :
        // les cinq bêtes de chair d'Anomaly ne le portent pas, leur base si.
        fleshType: un(body, 'fleshType'),
      };
      if (nom) byName[nom] = bloc;

      const dn = un(body, 'defName');
      if (!dn || !/<race>/.test(body)) continue;
      concrets.push({ dn, exp, bloc, en: un(body, 'label') || '' });
    }
  }
}

// 3. remontée : on prend la première valeur trouvée en montant vers la racine.
//    La garde `vus` protège d'un cycle de ParentName, qui pendrait le script.
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
for (const a of out) (chairs[a.fleshType || '(ordinaire)'] ??= []).push(a.defName);

console.log('races:', out.length, '| avec label FR:', out.filter(a => a.fr).length);
console.log('sans viande propre (useMeatFrom) :', emprunts.length);
console.log(emprunts.map(a => `  ${a.defName} -> ${a.useMeatFrom}`).join('\n'));
console.log('\nfleshType résolus :');
for (const [t, l] of Object.entries(chairs)) console.log(`  ${t.padEnd(18)} ${l.length}`);
