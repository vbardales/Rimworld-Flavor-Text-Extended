// Construit Patches/Inflections_FR.xml : remplace les dictionnaires d'inflexions anglais
// de Flavor Text par leurs équivalents français.
//
// Les 4 slots de Flavor Text sont pluriel / collectif / singulier / adjectival. En français
// le slot « adjectival » ne peut pas porter d'adjectif : « rôti » s'accorde, et la
// substitution de texte ne connaît pas le genre de l'ingrédient. Et le slot « pluriel » est
// inutile, le collectif portant déjà le pluriel des noms comptables. On les réaffecte donc
// aux DEUX formes prépositionnelles dont le français a besoin :
//
//   slot 0  forme « à »   : au riz, aux baies, à la viande de bœuf   -> « tarte {0_plur} »
//   slot 1  forme nue     : riz, baies, viande de bœuf               -> « {0_coll} braisée »
//   slot 2  singulier     : riz, baie, œuf de poule
//   slot 3  forme « de »  : de riz, de baies, de bœuf, d'oignon      -> « rôti {0_adj} »
//
// Les slots 0 et 3 portent la préposition, l'article et l'élision. Aucun slot ne porte
// d'adjectif accordable : le moteur peut substituer sans jamais se tromper de genre.

const fs = require('fs');
const path = require('path');

const FR = process.argv[2];
const OUT = process.argv[3];
const animals = require('./animals.json');
const EXPANSIONS = ['Core', 'Royalty', 'Ideology', 'Biotech', 'Anomaly', 'Odyssey'];

/* ------------------------------------------------------------------ outils */

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.xml')) out.push(p);
  }
  return out;
}

// On retient de quelle extension vient chaque label : les dictionnaires d'inflexions
// sont séparés par extension, et remplacer le mauvais bloc ferait disparaître des entrées.
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

// Pas d'élision devant un h aspiré (« le héron ») ni devant une semi-voyelle
// (« le yak », « le ouaouaron », « le warg »). Le « y » initial n'élide pas en français,
// il est donc absent de la classe de voyelles ci-dessous.
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

/* ----------------------------------------------- ingrédients végétaux, etc. */
// Écrits à la main : ce sont eux qui apparaissent le plus souvent dans les noms de plats,
// et leur genre ne se devine pas.
const MANUEL = [
  // clé                  forme « à »              forme nue            singulier            forme « de »
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

// Viandes à traitement particulier : la boucherie a son propre vocabulaire.
add('Core', 'Meat_Human',      'à la chair humaine',   'chair humaine',   'chair humaine',   'de chair humaine');
add('Core', 'Meat_Megaspider', "à la chair d'insecte", "chair d'insecte", "chair d'insecte", "d'insecte");
add('Core', 'Meat_Boomalope',  'à la viande explosive','viande explosive','viande explosive','de boomalope');

// Extensions : ingrédients qui ne sont ni une viande d'animal ni un œuf.
add('Biotech', 'RawToxipotato', 'aux toxipatates', 'toxipatates', 'toxipatate', 'de toxipatates');
add('Biotech', 'HemogenPack',   "aux packs d'hémogène", "packs d'hémogène", "pack d'hémogène", "d'hémogène");
add('Anomaly', 'Meat_Twisted',  'à la viande difforme', 'viande difforme', 'viande difforme', 'de viande difforme');

const DEJA = new Set(Object.values(entries).flat().map(e => e.key));

/* ------------------------------------------------------------------ viandes */
const EXCLUS = /^(Mech_|Drone_)/;
const CULINAIRE = {
  Chicken: 'poulet', Duck: 'canard', Turkey: 'dinde', Goose: 'oie', Sheep: 'mouton',
  Goat: 'chèvre', Hare: 'lièvre', Snowhare: 'lièvre', Human: 'humain',
};
const PACK_DE = { Biotech: 'Biotech', Anomaly: 'Anomaly', Odyssey: 'Odyssey' };

for (const a of animals) {
  if (a.useMeatFrom || EXCLUS.test(a.defName) || !a.fr) continue;
  const key = 'Meat_' + a.defName;
  if (DEJA.has(key)) continue;
  const officiel = frMeatLabel[a.defName];
  const noyau = officiel
    ? officiel.replace(/^viande\s+(de\s+|d')/i, '').trim()
    : (CULINAIRE[a.defName] || a.fr.toLowerCase());
  // « viande » est féminin : la forme « à » est toujours « à la viande de X », quel que
  // soit le genre de l'animal. C'est ce qui rend la génération mécanique sûre.
  const masse = 'viande ' + elide(noyau);
  const pack = PACK_DE[a.exp] || 'Core';
  add(pack, key, 'à la ' + masse, masse, masse, elide(noyau));
}

/* --------------------------------------------------------------------- œufs */
// « œuf de poule (non fécondé) » -> pluriel « œufs de poule », complément « d'œufs de poule »
for (const [def, label] of Object.entries(frLabel)) {
  if (!/^Egg[A-Z].*(Fertilized|Unfertilized)$/.test(def)) continue;
  if (DEJA.has(def)) continue;
  const sing = label.replace(/\s*\((non\s+)?fécondés?\)\s*$/i, '').trim();  // « œuf de poule »
  if (!/^œufs?\b/.test(sing)) continue;
  const plur = sing.replace(/^œuf\b/, 'œufs');
  add(PACK_DE[labelExp[def]] || 'Core', def, 'aux ' + plur, plur, sing, "d'" + plur);
}

/* --------------------------------------------------------------- assemblage */
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
  Inflexions françaises des ingrédients, pour Flavor Text.

  Flavor Text donne 4 formes à chaque ingrédient. En anglais ce sont pluriel /
  collectif / singulier / adjectival. En français le 4e slot ne peut pas porter un
  adjectif : « rôti » s'accorde, la substitution de texte ne le sait pas. Il porte
  donc un COMPLÉMENT PRÉPOSITIONNEL, élision comprise — « de bœuf », « d'oignon » —
  et les noms de plats sont écrits à tête nominale : « rôti {0_adj} ».

  Les viandes et les œufs sont générés par _tools/geninflections.js depuis les
  traductions officielles de RimWorld (Data/<Extension>/Languages/French*.tar).
  Ne pas éditer à la main : relancer le générateur.
-->
<Patch>

`;

fs.writeFileSync(OUT, header + ops + '\n\n</Patch>\n', 'utf8');
const total = Object.values(entries).reduce((n, l) => n + l.length, 0);
console.log('entrées :', Object.entries(entries).map(([k, v]) => `${k}=${v.length}`).join(' '), '| total', total);
