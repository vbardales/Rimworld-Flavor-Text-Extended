// Combien de nos plats le moteur retient-il vraiment, sur la liste de mods active ?
//
//   node _tools/actifs.js <dossier Defs de Flavor Text>
//
// Flavor Text écrit au démarrage « N active FlavorDefs for the current modlist found out
// of M total ». Il ne dit pas comment N se répartit entre ses defs et les nôtres. Ce
// script refait le calcul et le ventile.
//
// Le filtre du moteur : une def est retenue si CHACUN de ses slots d'ingrédients accepte
// au moins un ThingDef présent. Un slot cite des catégories, et une catégorie accepte
// toute sa DESCENDANCE — déclarer FT_Fruit accepte FT_Pear.
//
// Deux pièges, sans quoi le compte est très en dessous du vrai :
//
//   1. Les viandes n'existent pas en XML. RimWorld génère Meat_X à l'exécution pour
//      chaque race de chair sans useMeatFrom. On les reconstruit ici avec la même règle
//      que _tools/geninflections.js — fleshType et héritage compris.
//
//   2. Le label compte, pas le defName. Flavor Text range un ingrédient en marquant ses
//      mots-clés contre le LABEL. Pour une viande générée, ce label est <meatLabel> s'il
//      existe, sinon « <label de l'animal> meat ».
//
// Approximation assumée : sisterCategories n'est pas modélisé, et un mod qui ajoute ses
// ingrédients par patch XML plutôt que par def échappe au balayage. Le total obtenu est
// donc un plancher. On l'affiche à côté du chiffre du log pour juger de l'écart.

const fs = require('fs');
const path = require('path');

const FT = process.argv[2];
if (!FT) { console.error('usage : node _tools/actifs.js <dossier Defs de Flavor Text>'); process.exit(1); }

const RW = 'C:/Program Files (x86)/Steam/steamapps/common/RimWorld';
const WS = 'C:/Program Files (x86)/Steam/steamapps/workshop/content/294100';
const CFG = process.env.LOCALAPPDATA.replace(/Local$/, 'LocalLow') +
  '/Ludeon Studios/RimWorld by Ludeon Studios/Config/ModsConfig.xml';

const T = require('./arbre.js').load(FT);

/* ------------------------------------------------------------------- outils */
function walk(dir, out = []) {
  let ents; try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!/^(Textures|Sounds|Assemblies|Source|About|Languages|\.git|_tools)$/i.test(e.name)) walk(p, out); }
    else if (e.name.endsWith('.xml')) out.push(p);
  }
  return out;
}
const un = (b, t) => {
  const m = b.match(new RegExp('<' + t + '>([^<]*)</' + t + '>'));
  return m ? m[1].trim() : undefined;
};

/* ------------------------------------------------- 1. les mods actifs, et où */
// <activeMods> seulement : le fichier contient aussi <knownExpansions>, qui doublonne.
const actifsXml = (fs.readFileSync(CFG, 'utf8').match(/<activeMods>[\s\S]*?<\/activeMods>/) || [''])[0];
const actifs = [...actifsXml.matchAll(/<li>([^<]+)<\/li>/g)].map(m => m[1].trim().toLowerCase());
const voulus = new Set(actifs);

// Les mods locaux de nelim sont des JONCTIONS NTFS vers un dossier du dépôt.
// withFileTypes les rend en isSymbolicLink(), pas en isDirectory() : sans le statSync
// de repli, les trente-cinq mods maison sortent du balayage et leurs ingrédients
// manquent au recensement.
const estDossier = p => { try { return fs.statSync(p).isDirectory(); } catch { return false; } };

const parPid = new Map();               // un dossier par packageId : les copies locales doublonnent
for (const racine of [path.join(RW, 'Data'), path.join(RW, 'Mods'), WS]) {
  let noms; try { noms = fs.readdirSync(racine); } catch { continue; }
  for (const n of noms) {
    const dir = path.join(racine, n);
    if (!estDossier(dir)) continue;
    let pid; try { pid = un(fs.readFileSync(path.join(dir, 'About', 'About.xml'), 'utf8'), 'packageId'); } catch { continue; }
    if (!pid) continue;
    pid = pid.toLowerCase();
    if (voulus.has(pid) && !parPid.has(pid)) parPid.set(pid, dir);
  }
}
const dossiers = [...parPid].map(([pid, dir]) => ({ pid, dir }));
const absents = actifs.filter(p => !parPid.has(p));

/* ------------------------------- 2. tous les ThingDef des mods actifs, hérités */
const byName = {}, blocs = [];
for (const { dir } of dossiers) {
  for (const f of walk(dir)) {
    let xml; try { xml = fs.readFileSync(f, 'utf8'); } catch { continue; }
    if (!xml.includes('<ThingDef')) continue;
    for (const m of xml.matchAll(/<ThingDef\b([^>]*)>([\s\S]*?)<\/ThingDef>/g)) {
      const attrs = m[1], body = m[2];
      const nom = (attrs.match(/\bName\s*=\s*"([^"]*)"/) || [])[1];
      const bloc = {
        parent: (attrs.match(/\bParentName\s*=\s*"([^"]*)"/) || [])[1],
        defName: un(body, 'defName'),
        label: un(body, 'label'),
        estRace: /<race>/.test(body),
        useMeatFrom: un(body, 'useMeatFrom'),
        meatLabel: un(body, 'meatLabel'),
        fleshType: un(body, 'fleshType'),
        // undefined, pas '' : une chaîne vide est une valeur DÉFINIE, et herite()
        // s'arrêterait au premier bloc sans <thingCategories> au lieu de monter vers
        // la base abstraite — qui est justement l'endroit où presque tous les
        // ingrédients déclarent leur catégorie.
        cats: (body.match(/<thingCategories>[\s\S]*?<\/thingCategories>/) || [])[0],
      };
      if (nom) byName[nom] = bloc;
      blocs.push(bloc);
    }
  }
}
function herite(bloc, champ) {
  const vus = new Set();
  for (let b = bloc; b; b = byName[b.parent]) {
    if (b[champ] !== undefined) return b[champ];
    if (!b.parent || vus.has(b.parent)) break;
    vus.add(b.parent);
  }
  return undefined;
}

/* -------------------------------------- 3. les ingrédients : XML + viandes générées */
// Les catégories d'objets que Flavor Text peut voir arriver dans un repas. Volontairement
// étroit : ouvrir à <ingestible> attrape les drogues, les médicaments et les repas cuisinés,
// et gonfle le recensement d'un facteur dix — toute catégorie paraît alors servie.
// « Fish » compte : Odyssey range ses quatorze poissons dans cette catégorie et non
// dans MeatRaw. L'oublier laissait FT_Meat_Fish pour mort et condamnait quarante plats
// à tort. « PlantMatter » porte le houblon.
const MANGEABLE = /PlantFoodRaw|MeatRaw|AnimalProductRaw|EggsFertilized|EggsUnfertilized|Foods|Fish|PlantMatter/;
const SANS_VIANDE = new Set(['Mechanoid', 'Drone', 'EntityMechanical', 'EntityFlesh', 'Fleshbeast']);

const choses = new Map();               // defName -> label
for (const b of blocs) {
  if (!b.defName) continue;
  const lab = b.label || herite(b, 'label');
  if (!lab) continue;
  if (b.estRace) {
    // viande générée, si la race en produit une à son nom
    if (herite(b, 'useMeatFrom') || SANS_VIANDE.has(herite(b, 'fleshType'))) continue;
    choses.set('Meat_' + b.defName, herite(b, 'meatLabel') || lab + ' meat');
    continue;
  }
  const cats = herite(b, 'cats') || '';
  if (!MANGEABLE.test(cats)) continue;
  choses.set(b.defName, lab);
}

/* ---------------------------------------- 4. rangement dans les catégories FT */
// Le scoring de Flavor Text : sous-chaîne multi-mots = +6 ; sinon +1 si le token
// contient le mot-clé, +1 s'il commence ou finit par lui, +1 s'il lui est égal.
// La liste noire retranche le double de son propre score. Seuil : 3.
function score(label, kws) {
  const l = ' ' + label.toLowerCase() + ' ';
  const toks = label.toLowerCase().split(/[^a-z]+/).filter(Boolean);
  let s = 0;
  for (const k of kws) {
    if (k.includes(' ')) { if (l.includes(k)) s += 6; continue; }
    for (const t of toks) { if (t.includes(k)) s++; if (t.startsWith(k) || t.endsWith(k)) s++; if (t === k) s++; }
  }
  return s;
}
const cats = T.all.map(c => ({
  name: c,
  kw: (T.info[c].keywords || []).map(k => k.toLowerCase()),
  bl: (T.info[c].blacklist || []).map(k => k.toLowerCase()),
  absorb: new Set(T.info[c].absorb || []),
}));

const propres = {};                     // catégorie -> nb de ThingDefs rangés directement
for (const c of cats) propres[c.name] = 0;
for (const [dn, lab] of choses) {
  for (const c of cats) {
    if (c.absorb.has(dn)) { propres[c.name]++; continue; }
    if (!c.kw.length) continue;
    let s = score(lab, c.kw);
    if (s >= 3) for (const b of c.bl) s -= 2 * score(lab, [b]);
    if (s >= 3) propres[c.name]++;      // le moteur garde TOUTES les catégories >= 3
  }
}
// Une catégorie « sert » si elle-même ou l'un de ses descendants contient quelque chose.
const servie = {};
for (const c of T.all) servie[c] = [...T.desc(c)].some(d => propres[d] > 0);

/* -------------------------------------------- 5. les FlavorDefs, actives ou non */
function lireDefs(fichiers, source) {
  const out = [];
  for (const f of fichiers) {
    const xml = fs.readFileSync(f, 'utf8');
    for (const b of xml.match(/<FlavorText\.FlavorDef[\s\S]*?<\/FlavorText\.FlavorDef>/g) || []) {
      const dn = un(b, 'defName');
      if (!dn) continue;
      const ing = (b.match(/<ingredients>[\s\S]*?<\/ingredients>/) || [''])[0];
      const slots = [...ing.matchAll(/<categories>([\s\S]*?)<\/categories>/g)]
        .map(m => [...m[1].matchAll(/<li>([^<]+)<\/li>/g)].map(x => x[1].trim()));
      out.push({ dn, slots, source, fichier: path.basename(f) });
    }
  }
  return out;
}
const defs = [
  ...lireDefs([path.join(FT, 'FlavorDef.xml')], 'hekmo'),
  ...lireDefs(fs.readdirSync('./Defs').filter(f => /^FlavorDefs_/.test(f)).map(f => path.join('./Defs', f)), 'nous'),
];

const inconnues = new Set();
for (const d of defs) {
  d.morts = d.slots.filter(sl => !sl.some(c => {
    if (!(c in servie)) { inconnues.add(c); return false; }
    return servie[c];
  }));
  d.actif = d.morts.length === 0;
}

/* -------------------------------------------------------------------- sortie */
const par = s => defs.filter(d => d.source === s);
const pct = (a, b) => b ? (100 * a / b).toFixed(1) + ' %' : '-';
console.log(`mods actifs : ${actifs.length}, dossiers trouvés : ${dossiers.length}` +
  (absents.length ? ` (introuvables : ${absents.join(', ')})` : ''));
console.log(`ingrédients recensés : ${choses.size}\n`);

for (const s of ['hekmo', 'nous']) {
  const l = par(s), a = l.filter(d => d.actif).length;
  console.log(`${s.padEnd(6)} ${String(a).padStart(4)} actives / ${l.length}   ${pct(a, l.length)}`);
}
const tot = defs.filter(d => d.actif).length;
console.log(`${'TOTAL'.padEnd(6)} ${String(tot).padStart(4)} actives / ${defs.length}   ${pct(tot, defs.length)}`);
if (inconnues.size) console.log(`\ncatégories citées et inconnues de l'arbre : ${[...inconnues].join(', ')}`);

// Ce qui bloque, chez nous : par catégorie manquante, puis par fichier.
const morts = par('nous').filter(d => !d.actif);
if (morts.length) {
  const parCat = {}, parFichier = {};
  for (const d of morts) {
    parFichier[d.fichier] = (parFichier[d.fichier] || 0) + 1;
    for (const sl of d.morts) parCat[sl.join('|')] = (parCat[sl.join('|')] || 0) + 1;
  }
  console.log(`\n— nos ${morts.length} plats inertes, par slot vide :`);
  for (const [c, n] of Object.entries(parCat).sort((a, b) => b[1] - a[1]).slice(0, 20)) {
    console.log(`   ${String(n).padStart(4)}  ${c}`);
  }
  console.log(`\n— par fichier :`);
  for (const [f, n] of Object.entries(parFichier).sort((a, b) => b[1] - a[1]).slice(0, 15)) {
    console.log(`   ${String(n).padStart(4)}  ${f}`);
  }
}

// ACTIFS_DUMP=1 : la liste des ingrédients trouvés. C'est par là qu'il faut commencer
// quand un compte paraît faux — un recensement trop court ou trop long se voit tout de
// suite, alors qu'un pourcentage ne dit pas d'où il vient.
if (process.env.ACTIFS_DUMP) {
  console.log('\n— ingrédients recensés :');
  for (const [dn, lab] of [...choses].sort((a, b) => a[1].localeCompare(b[1]))) console.log(`   ${lab.padEnd(34)} ${dn}`);
}
