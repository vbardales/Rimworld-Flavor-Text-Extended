// Analyse de couverture : quelles catégories et quelles combinaisons sont peu ou pas
// servies par les defs existantes (celles de Flavor Text + les nôtres).
//
//   node _tools/couverture.js <dossier Defs de Flavor Text>
//
// ------------------------------------------------------------------------------------
// AVERTISSEMENT — la version précédente de ce fichier était FAUSSE.
//
// Elle comptait les mentions LITTÉRALES du nom de catégorie. Or le moteur descend
// récursivement dans les catégories filles : IngredientSlot.AddAllowedCategoriesAndThingsRecursive
// parcourt cat.ChildCategories. Une def qui déclare FT_Potato accepte donc aussi
// FT_Toxipotato, et une def qui déclare FT_Fruit accepte FT_Pear.
//
// Conséquence : l'ancienne version annonçait la toxipatate « servie par 1 def » alors
// qu'elle l'est par 432, et présentait comme orphelines des catégories qui ne l'étaient
// pas du tout (fruit à pain 338, oseille 348, orange 341).
//
// On distingue donc deux mesures, et l'écart entre les deux est lui-même une donnée :
//   nommée  : defs qui citent la catégorie telle quelle — « combien de plats parlent
//             de cet ingrédient en propre »
//   servie  : defs qui la citent ELLE ou l'un de ses ANCÊTRES — « combien de plats
//             peuvent réellement sortir quand cet ingrédient est dans la marmite »
//
// Seule « servie » dit si un ingrédient est couvert. « nommée » dit s'il a une identité.
// ------------------------------------------------------------------------------------
const fs = require('fs');
const path = require('path');

const FT = process.argv[2];
if (!FT) { console.error('usage : node _tools/couverture.js <dossier Defs de Flavor Text>'); process.exit(1); }
const T = require('./arbre.js').load(FT);

// Catégories d'ingrédients : sous FT_Ingredients, hors types/qualités de repas et postes.
const estIngredient = c => {
  const a = T.anc(c);
  return a.has('FT_Ingredients') && !a.has('FT_FoodMeals') && !a.has('FT_MealsKinds')
    && !a.has('FT_MealsQualities') && !a.has('FT_Buildings');
};

/* ------------------------------------------------------------- lecture de toutes les defs */
function slotsDesDefs() {
  const out = [];
  for (const d of require('./flavordefs.json'))
    out.push({ source: 'hekmo', slots: d.slots.map(s => s.cats) });
  for (const f of fs.readdirSync('./Defs').filter(x => /FlavorDefs/.test(x))) {
    const xml = fs.readFileSync(path.join('./Defs', f), 'utf8');
    for (const b of xml.match(/<FlavorText\.FlavorDef[\s\S]*?<\/FlavorText\.FlavorDef>/g) || []) {
      const ing = (b.match(/<ingredients>[\s\S]*?<\/ingredients>/) || [''])[0];
      const slots = [...ing.matchAll(/<categories>([\s\S]*?)<\/categories>/g)]
        .map(s => [...s[1].matchAll(/<li>([^<]*)<\/li>/g)].map(m => m[1].trim()));
      if (slots.length) out.push({ source: 'nous', slots });
    }
  }
  return out;
}
const defs = slotsDesDefs();

/* ------------------------------------------------------------------------ les deux mesures */
// Trois mesures, et il faut les garder distinctes — les confondre est exactement
// l'erreur que corrigeait l'avertissement en tête de fichier.
//
//   nommee[c]  defs qui citent c telle quelle.
//   servie[c]  defs qui citent c ou l'un de ses ANCÊTRES.  « combien de plats peuvent
//              sortir quand cet ingrédient est là » — sert à détecter les orphelines.
//   assise[c]  defs qui citent c ou l'un de ses DESCENDANTS. « à quel point cet
//              ingrédient est installé dans le corpus » — sert à classer les accords.
//
// Les deux dernières vont en sens inverse dans l'arbre. servie(Riz) est énorme parce que
// tout plat de céréale accepte du riz ; assise(Riz) reste modeste parce que peu de defs
// parlent de riz. Pour juger un accord manquant, c'est assise qui compte : deux
// ingrédients bien installés qui ne se rencontrent jamais, voilà ce qui est rentable.
const nommee = {}, servie = {}, assise = {}, servieNous = {};
for (const d of defs) {
  const cites = new Set(d.slots.flat());
  for (const c of cites) nommee[c] = (nommee[c] || 0) + 1;
  const couverts = new Set(), assis = new Set();
  for (const c of cites) {
    for (const x of T.desc(c)) couverts.add(x);   // c sert toute sa descendance
    for (const x of T.anc(c)) assis.add(x);       // c assoit tous ses ancêtres
  }
  for (const x of couverts) {
    servie[x] = (servie[x] || 0) + 1;
    if (d.source === 'nous') servieNous[x] = (servieNous[x] || 0) + 1;
  }
  for (const x of assis) assise[x] = (assise[x] || 0) + 1;
}

/* ------------------------------------------------------------------------------- les paires */
// Une paire (A,B) est couverte si une def a deux emplacements DISTINCTS dont l'un remonte
// à A et l'autre à B. On remonte aux ancêtres : un plat poire + fromage couvre l'accord
// abstrait Fruit × Fromage. Les alternatives d'un même emplacement ne coexistent jamais,
// donc on ne les apparie pas entre elles — c'était un second défaut de l'ancienne version.
const paires = new Set();
for (const d of defs) {
  const exp = d.slots.map(s => { const o = new Set(); for (const c of s) for (const a of T.anc(c)) o.add(a); return o; });
  for (let i = 0; i < exp.length; i++)
    for (let j = i + 1; j < exp.length; j++)
      for (const a of exp[i]) for (const b of exp[j]) if (a !== b) paires.add([a, b].sort().join('|'));
}

/* ------------------------------------------------------------------------------- résultats */
const ing = T.all.filter(estIngredient).sort();
const N = c => nommee[c] || 0, S = c => servie[c] || 0, A = c => assise[c] || 0;

console.log("=== 1. CATÉGORIES D'INGRÉDIENTS ===");
console.log(`${ing.length} catégories d'ingrédients au total.\n`);

const mortes = ing.filter(c => S(c) === 0);
console.log(`AUCUN plat ne peut sortir (${mortes.length}) — ni la catégorie ni aucun ancêtre n'est cité :`);
console.log('  ' + (mortes.map(c => c.replace('FT_', '')).join(', ') || '(aucune)') + '\n');

const pauvres = ing.filter(c => S(c) > 0 && S(c) <= 3).sort((a, b) => S(a) - S(b));
console.log(`RÉELLEMENT peu servies (${pauvres.length}) — 1 à 3 plats possibles, toujours les mêmes :`);
console.log(pauvres.length
  ? pauvres.map(c => `  ${c.replace('FT_', '').padEnd(20)} servie ${S(c)}   nommée ${N(c)}`).join('\n')
  : '  (aucune)');

// Le piège que l'ancienne version tendait : peu nommées, mais largement servies.
const trompeuses = ing.filter(c => N(c) <= 3 && S(c) >= 20).sort((a, b) => S(b) - S(a));
console.log(`\nFAUSSEMENT rares (${trompeuses.length}) — peu de plats les nomment, mais l'héritage les couvre.`);
console.log('Leur écrire des plats ajoute de la VARIÉTÉ CIBLÉE, pas de la couverture :');
console.log(trompeuses.slice(0, 20).map(c =>
  `  ${c.replace('FT_', '').padEnd(20)} nommée ${String(N(c)).padStart(3)}   mais servie ${S(c)}`).join('\n'));
if (trompeuses.length > 20) console.log(`  … et ${trompeuses.length - 20} autres`);

console.log('\n=== 2. INGRÉDIENTS CONCRETS DERRIÈRE LES CATÉGORIES MORTES ===');
if (!mortes.length) console.log('  (aucune catégorie morte)');
for (const c of mortes) {
  const i = T.info[c] || {};
  console.log(`  ${c.replace('FT_', '')} :`);
  if ((i.absorb || []).length) console.log(`      ThingDefs : ${i.absorb.slice(0, 6).join(', ')}${i.absorb.length > 6 ? ` … +${i.absorb.length - 6}` : ''}`);
  if ((i.keywords || []).length) console.log(`      mots-clés : ${i.keywords.slice(0, 8).join(', ')}${i.keywords.length > 8 ? ' …' : ''}`);
  const kids = (T.kids[c] || []);
  if (kids.length) console.log(`      filles    : ${kids.join(', ')}`);
}

console.log('\n=== 3. ACCORDS MANQUANTS ===');
console.log(`${paires.size} paires de catégories couvertes, arbre compris.\n`);
console.log('Paires dont les deux membres sont bien INSTALLÉS dans le corpus (≥ 8 plats');
console.log('parlent de chacun) mais qui ne coexistent dans aucune def :\n');
const solides = ing.filter(c => A(c) >= 8);
const manquantes = [];
for (let i = 0; i < solides.length; i++)
  for (let j = i + 1; j < solides.length; j++) {
    const a = solides[i], b = solides[j];
    if (T.anc(a).has(b) || T.anc(b).has(a)) continue;         // parent/enfant : sans objet
    if (!paires.has([a, b].sort().join('|')))
      manquantes.push([a, b, Math.min(A(a), A(b))]);
  }
manquantes.sort((x, y) => y[2] - x[2]);
console.log(`  ${manquantes.length} paires manquantes. Les 30 plus rentables :`);
console.log(manquantes.slice(0, 30).map(([a, b, s]) =>
  `    ${a.replace('FT_', '')} + ${b.replace('FT_', '')}`.padEnd(46) + `(${s} plats pour le moins installé)`).join('\n'));
