// Builds Patches/Inflections_FR.xml: replaces Flavor Text's English inflection dictionaries
// with their French equivalents.
//
// Flavor Text's 4 slots are plural / collective / singular / adjectival. In French the
// "adjectival" slot cannot carry an adjective: "rôti" agrees in gender, and text
// substitution does not know the ingredient's gender. And the "plural" slot is
// useless, since the collective already carries the plural of countable nouns. So we
// reassign them to the TWO prepositional forms that French needs:
//
//   slot 0  "à" form      : au riz, aux baies, à la viande de bœuf   -> "tarte {0_plur}"
//   slot 1  bare form     : riz, baies, viande de bœuf               -> "{0_coll} braisée"
//   slot 2  singular      : riz, baie, œuf de poule
//   slot 3  "de" form     : de riz, de baies, de bœuf, d'oignon      -> "rôti {0_adj}"
//
// Slots 0 and 3 carry the preposition, the article and the elision. No slot carries an
// adjective that must agree: the engine can substitute without ever getting the gender wrong.

const fs = require('fs');
const path = require('path');

const FR = process.argv[2];
const OUT = process.argv[3];
const animals = require('./animals.json');
const EXPANSIONS = ['Core', 'Royalty', 'Ideology', 'Biotech', 'Anomaly', 'Odyssey'];

/* ------------------------------------------------------------------ helpers */

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.xml')) out.push(p);
  }
  return out;
}

// We record which expansion each label comes from: the inflection dictionaries
// are separated by expansion, and replacing the wrong block would make entries disappear.
const frLabel = {}, frMeatLabel = {}, labelExp = {};
for (const exp of EXPANSIONS) {
  for (const f of walk(path.join(FR, exp, 'DefInjected', 'ThingDef'))) {
    const xml = fs.readFileSync(f, 'utf8');
    for (const m of xml.matchAll(/<([A-Za-z0-9_]+)\.label>([^<]*)<\/\1\.label>/g)) {
      frLabel[m[1]] = m[2].trim();
      labelExp[m[1]] = exp;
    }
    for (const m of xml.matchAll(/<([A-Za-z0-9_]+)\.race\.meatLabel>([^<]*)<\/\1\.race\.meatLabel>/g)) {
      frMeatLabel[m[1]] = m[2].trim();
    }
  }
}

// No elision before an aspirated h ("le héron") nor before a semi-vowel
// ("le yak", "le ouaouaron", "le warg"). An initial "y" does not elide in French,
// so it is absent from the vowel class below.
const PAS_D_ELISION = [
  'héron', 'husky', 'hamster', 'harfang', 'hérisson', 'homard', 'hibou',
  'haricot', 'houblon', 'hareng', 'hyène',
  'oua', 'ouest', 'oui', 'wa', 'wh', 'wo',
];
function elide(noun) {
  const l = noun.toLowerCase();
  if (PAS_D_ELISION.some(h => l.startsWith(h))) return 'de ' + noun;
  if (/^[aàâeéèêëiîïoôuùûœæh]/.test(l)) return "d'" + noun;
  return 'de ' + noun;
}

const entries = { Core: [], Biotech: [], Anomaly: [], Odyssey: [] };
function add(pack, key, aForm, nue, sing, deForm) {
  entries[pack].push({ key, forms: [aForm, nue, sing, deForm] });
}

/* ----------------------------------------------- plant ingredients, etc. */
// Written by hand: these are the ones that appear most often in dish names,
// and their gender cannot be guessed.
const MANUEL = [
  // key                  "à" form                 bare form            singular             "de" form
  ['RawBerries',          'aux baies',             'baies',             'baie',              'de baies'],
  ['RawRice',             'au riz',                'riz',               'riz',               'de riz'],
  ['RawAgave',            "aux fruits d'agave",    "fruits d'agave",    "fruit d'agave",     "d'agave"],
  ['RawPotatoes',         'aux pommes de terre',   'pommes de terre',   'pomme de terre',    'de pommes de terre'],
  ['RawCorn',             'au maïs',               'maïs',              'maïs',              'de maïs'],
  ['RawFungus',           'aux champignons',       'champignons',       'champignon',        'de champignons'],
  ['RawHops',             'au houblon',            'houblon',           'houblon',           'de houblon'],
  ['InsectJelly',         "à la gelée d'insecte",  "gelée d'insecte",   "gelée d'insecte",   "de gelée d'insecte"],
  ['Milk',                'au lait',               'lait',              'lait',              'de lait'],
  ['Beer',                'à la bière',            'bière',             'bière',             'de bière'],
  ['Chocolate',           'au chocolat',           'chocolat',          'chocolat',          'de chocolat'],
  ['Ambrosia',            "à l'ambroisie",         'ambroisie',         'ambroisie',         "d'ambroisie"],
  ['Hay',                 'au foin',               'foin',              'foin',              'de foin'],
  ['Kibble',              'aux croquettes',        'croquettes',        'croquette',         'de croquettes'],
  ['Pemmican',            'au pemmican',           'pemmican',          'pemmican',          'de pemmican'],
  ['Wort',                'au moût',               'moût',              'moût',              'de moût'],
];
MANUEL.forEach(r => add('Core', ...r));

// Meats needing special handling: butchery has its own vocabulary.
add('Core', 'Meat_Human',      'à la chair humaine',   'chair humaine',   'chair humaine',   'de chair humaine');
add('Core', 'Meat_Megaspider', "à la chair d'insecte", "chair d'insecte", "chair d'insecte", "d'insecte");
add('Core', 'Meat_Boomalope',  'à la viande explosive','viande explosive','viande explosive','de boomalope');

// Expansions: ingredients that are neither an animal meat nor an egg.
add('Biotech', 'RawToxipotato', 'aux toxipatates', 'toxipatates', 'toxipatate', 'de toxipatates');
add('Biotech', 'HemogenPack',   "aux packs d'hémogène", "packs d'hémogène", "pack d'hémogène", "d'hémogène");
add('Anomaly', 'Meat_Twisted',  'à la viande difforme', 'viande difforme', 'viande difforme', 'de viande difforme');

const DEJA = new Set(Object.values(entries).flat().map(e => e.key));

/* ------------------------------------------------------------------ meats */
// Only two races out of three yield a Meat_X ThingDef. The two exclusions:
//
//   useMeatFrom  the race borrows another's meat. Almost always declared on an
//                ABSTRACT def -- SmallBirdThingBase and WaterBirdThingBase carry
//                <useMeatFrom>Cassowary</useMeatFrom>, so Meat_Crow does not exist.
//                animals.js walks up the ParentName chain to resolve it.
//
//   fleshType    mechanoids yield nothing, and Anomaly entities yield twisted
//                meat (Meat_Twisted, added by hand above) rather than a meat
//                named after them. The fleshType is the game's own criterion; filtering
//                on the defName prefix would work for Mech_ and Drone_, but not
//                for Revenant, Noctol or Dreadmeld.
//
// Without these two filters the generator produces 24 entries for meats that do not
// exist. They break nothing -- the engine never looks them up -- but they
// bloat the patch and suggest that the table covers what it does not.
const SANS_VIANDE = new Set([
  'Mechanoid', 'Drone',                              // mechanoids: nothing to butcher
  'EntityMechanical', 'EntityFlesh', 'Fleshbeast',   // Anomaly: twisted meat
]);
const CULINAIRE = {
  Chicken: 'poulet', Duck: 'canard', Turkey: 'dinde', Goose: 'oie', Sheep: 'mouton',
  Goat: 'chèvre', Hare: 'lièvre', Snowhare: 'lièvre', Human: 'humain',
};
const PACK_DE = { Biotech: 'Biotech', Anomaly: 'Anomaly', Odyssey: 'Odyssey' };

for (const a of animals) {
  if (a.useMeatFrom || SANS_VIANDE.has(a.fleshType) || !a.fr) continue;
  const key = 'Meat_' + a.defName;
  if (DEJA.has(key)) continue;
  const officiel = frMeatLabel[a.defName];
  const noyau = officiel
    ? officiel.replace(/^viande\s+(de\s+|d')/i, '').trim()
    : (CULINAIRE[a.defName] || a.fr.toLowerCase());
  // "viande" is feminine: the "à" form is always "à la viande de X", whatever the
  // animal's gender. This is what makes mechanical generation safe.
  const masse = 'viande ' + elide(noyau);
  const pack = PACK_DE[a.exp] || 'Core';
  add(pack, key, 'à la ' + masse, masse, masse, elide(noyau));
}

/* --------------------------------------------------------------------- eggs */
// "œuf de poule (non fécondé)" -> plural "œufs de poule", complement "d'œufs de poule"
for (const [def, label] of Object.entries(frLabel)) {
  if (!/^Egg[A-Z].*(Fertilized|Unfertilized)$/.test(def)) continue;
  if (DEJA.has(def)) continue;
  const sing = label.replace(/\s*\((non\s+)?fécondés?\)\s*$/i, '').trim();  // "œuf de poule"
  if (!/^œufs?\b/.test(sing)) continue;
  const plur = sing.replace(/^œuf\b/, 'œufs');
  add(PACK_DE[labelExp[def]] || 'Core', def, 'aux ' + plur, plur, sing, "d'" + plur);
}

/* --------------------------------------------------------------- assembly */
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function dict(list) {
  return list.map(e => `				<li>
					<key>${e.key}</key>
					<value>
						<li>${esc(e.forms[0])}</li>
						<li>${esc(e.forms[1])}</li>
						<li>${esc(e.forms[2])}</li>
						<li>${esc(e.forms[3])}</li>
					</value>
				</li>`).join('\n');
}

const PACK_DEFNAME = { Core: 'Core', Biotech: 'Biotech', Anomaly: 'Anomaly', Odyssey: 'Odyssey' };

const ops = Object.entries(entries)
  .filter(([, v]) => v.length)
  .map(([pack, list]) => `	<Operation Class="PatchOperationReplace">
		<xpath>Defs/FlavorText.ThingInflectionsData[defName="${PACK_DEFNAME[pack]}"]/dictionary</xpath>
		<value>
			<dictionary>
${dict(list)}
			</dictionary>
		</value>
	</Operation>`).join('\n\n');

const header = `<?xml version="1.0" encoding="utf-8" ?>
<!--
  French ingredient inflections, for Flavor Text.

  Flavor Text gives each ingredient 4 forms. In English they are plural /
  collective / singular / adjectival. In French the 4th slot cannot carry an
  adjective: "rôti" agrees in gender, and text substitution does not know that. It
  therefore carries a PREPOSITIONAL COMPLEMENT, elision included ("de bœuf", "d'oignon"),
  and dish names are written with a nominal head: "rôti {0_adj}".

  The meats and eggs are generated by _tools/geninflections.js from RimWorld's
  official translations (Data/<Expansion>/Languages/French*.tar).
  Do not edit by hand: rerun the generator.
-->
<Patch>

`;

fs.writeFileSync(OUT, header + ops + '\n\n</Patch>\n', 'utf8');
const total = Object.values(entries).reduce((n, l) => n + l.length, 0);
console.log('entries:', Object.entries(entries).map(([k, v]) => `${k}=${v.length}`).join(' '), '| total', total);
