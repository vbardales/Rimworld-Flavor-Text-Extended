// Contrôle les nouvelles FlavorDefs : catégories d'ingrédients et types de repas doivent
// exister réellement dans Flavor Text, sinon la def est silencieusement inerte.
const fs = require('fs');
const path = require('path');

const FT = process.argv[2]; // dossier Defs de Flavor Text
const DIR = './Defs';

// Les catégories de Flavor Text, PLUS celles que notre mod ajoute.
const catXml = [
  ...['FT_FlavorCategoryDefBasic.xml', 'FT_FlavorCategoryDefAdvanced.xml']
    .map(f => fs.readFileSync(path.join(FT, f), 'utf8')),
  ...fs.readdirSync(DIR).filter(f => /CategoryDef/.test(f))
    .map(f => fs.readFileSync(path.join(DIR, f), 'utf8')),
].join('\n');
const categories = new Set([...catXml.matchAll(/<defName>(FT_[A-Za-z0-9_]+)<\/defName>/g)].map(m => m[1]));

// Les types de repas légaux sont les catégories descendant de FT_MealsKinds.
const parents = {};
for (const b of catXml.split(/<FlavorText\.FlavorCategoryDef>/).slice(1)) {
  const dn = (b.match(/<defName>(FT_[A-Za-z0-9_]+)<\/defName>/) || [])[1];
  if (!dn) continue;
  const p = (b.match(/<parents>([^]*?)<\/parents>/) || [])[1] || '';
  parents[dn] = [...p.matchAll(/<li>([^<]*)<\/li>/g)].map(m => m[1].trim());
}
const estRepas = dn => {
  const vus = new Set();
  const pile = [dn];
  while (pile.length) {
    const c = pile.pop();
    if (c === 'FT_MealsKinds') return true;
    if (vus.has(c)) continue;
    vus.add(c);
    pile.push(...(parents[c] || []));
  }
  return false;
};

// Noms de plats déjà définis par Flavor Text : redéfinir le même plat créerait deux defs
// qui se disputent les mêmes ingrédients, avec un gagnant arbitraire.
const norm = s => s.toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/\{[^}]*\}/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
// Deux niveaux : nom EXACTEMENT identique = erreur (les deux plats s'afficheraient pareil) ;
// nom identique une fois les placeholders retirés = simple avertissement, parce que
// « bortsch » et « bortsch {2_plur} » s'affichent différemment en jeu.
const exact = new Map(), approx = new Map();
for (const d of require('./flavordefs.json')) {
  exact.set(d.label, d.defName);
  const k = norm(d.label);
  if (k) approx.set(k, d.defName);
}

// Et surtout : contre les labels TRADUITS. Deux plats aux noms anglais différents
// peuvent parfaitement porter le même nom français — « Jollof rice » et le nôtre.
const TRAD = './Languages/French/DefInjected/FlavorText.FlavorDef';
for (const f of (fs.existsSync(TRAD) ? fs.readdirSync(TRAD) : []).filter(x => x.endsWith('.xml'))) {
  const xml = fs.readFileSync(path.join(TRAD, f), 'utf8');
  for (const m of xml.matchAll(/<([A-Za-z0-9_\-]+)\.label>([^<]*)<\/\1\.label>/g)) {
    exact.set(m[2], m[1] + ' (traduit)');
    const k = norm(m[2]);
    if (k) approx.set(k, m[1] + ' (traduit)');
  }
}

// Deux plats à nous qui exigent exactement les mêmes catégories se neutralisent aussi.
const signatures = new Map();

let erreurs = 0, n = 0, avert = 0;
const defNames = new Set();
for (const f of fs.readdirSync(DIR).filter(x => x.endsWith('.xml'))) {
  const xml = fs.readFileSync(path.join(DIR, f), 'utf8');
  for (const b of xml.split(/<FlavorText\.FlavorDef[^>]*>/).slice(1)) {
    const body = b.split('</FlavorText.FlavorDef>')[0];
    const dn = (body.match(/<defName>([^<]*)<\/defName>/) || [])[1];
    if (!dn) continue;
    n++;
    if (defNames.has(dn)) { console.log(`ERREUR  doublon de defName : ${dn}`); erreurs++; }
    defNames.add(dn);

    const ing = (body.match(/<ingredients>([^]*?)<\/ingredients>/) || [])[1] || '';
    const slots = [...ing.matchAll(/<categories>([^]*?)<\/categories>/g)];

    // Même jeu de catégories qu'un autre de nos plats : les deux se disputeront les mêmes
    // repas et l'un des deux ne sortira jamais.
    const sig = slots
      .map(s => [...s[1].matchAll(/<li>([^<]*)<\/li>/g)].map(m => m[1].trim()).sort().join('+'))
      .sort().join(' | ');
    if (sig) {
      if (signatures.has(sig)) {
        console.log(`AVERT   ${dn}  mêmes ingrédients que ${signatures.get(sig)} : ${sig}`); avert++;
      } else signatures.set(sig, dn);
    }
    for (const s of slots) {
      for (const c of s[1].matchAll(/<li>([^<]*)<\/li>/g)) {
        if (!categories.has(c[1].trim())) {
          console.log(`ERREUR  ${dn}  catégorie d'ingrédient inconnue : ${c[1].trim()}`); erreurs++;
        }
      }
    }
    const mk = (body.match(/<mealKinds>([^]*?)<\/mealKinds>/) || [])[1] || '';
    const kinds = [...mk.matchAll(/<li>([^<]*)<\/li>/g)].map(m => m[1].trim());
    if (!kinds.length) { console.log(`ERREUR  ${dn}  aucun mealKinds`); erreurs++; }
    for (const k of kinds) {
      if (!categories.has(k)) { console.log(`ERREUR  ${dn}  type de repas inconnu : ${k}`); erreurs++; }
      else if (!estRepas(k)) { console.log(`ERREUR  ${dn}  ${k} n'est pas un type de repas`); erreurs++; }
    }

    // Les {N_...} du label et de la description doivent viser un slot existant.
    const label = (body.match(/<label>([^<]*)<\/label>/) || [])[1] || '';
    const desc = (body.match(/<description>([^<]*)<\/description>/) || [])[1] || '';
    if (!label) { console.log(`ERREUR  ${dn}  label manquant`); erreurs++; }
    if (!desc) { console.log(`ERREUR  ${dn}  description manquante`); erreurs++; }
    const k = norm(label);
    if (exact.has(label)) {
      console.log(`ERREUR  ${dn}  « ${label} » s'affiche déjà à l'identique (${exact.get(label)})`); erreurs++;
    } else if (k && approx.has(k)) {
      console.log(`AVERT   ${dn}  « ${label} » proche de ${approx.get(k)} — vérifier que l'affichage diffère`); avert++;
    }
    for (const [texte, quoi] of [[label, 'label'], [desc, 'description']]) {
      for (const p of texte.matchAll(/\{(\d+)_([a-z]+)\}/g)) {
        if (Number(p[1]) >= slots.length) {
          console.log(`ERREUR  ${dn}  ${quoi} : slot ${p[1]} inexistant (${slots.length} ingrédient(s))`); erreurs++;
        }
        if (!['plur', 'coll', 'sing', 'adj'].includes(p[2])) {
          console.log(`ERREUR  ${dn}  ${quoi} : suffixe inconnu {${p[1]}_${p[2]}}`); erreurs++;
        }
      }
    }
  }
}
console.log(`\n${n} plats définis — ${erreurs} erreur(s), ${avert} avertissement(s)`);
process.exit(erreurs ? 1 : 0);
