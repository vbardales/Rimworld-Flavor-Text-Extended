# Attributions

## Mod requis

**Flavor Text** (hekmo) — [Workshop 3245374432](https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432)

Ce mod est une extension de Flavor Text : il n'en contient aucun fichier, ne le
redistribue pas, et ne fonctionne pas sans lui. Toute la mécanique — la composition
des noms de plats, le tirage pondéré par spécificité, les inflexions d'ingrédients —
est l'œuvre de hekmo. Flavor Text reste soumis à ses propres conditions.

Les defs ajoutées héritent de `FlavorDef_Base`, défini par Flavor Text, et les patchs
XPath modifient ses catégories d'ingrédients au chargement. Rien n'est copié :
l'héritage de defs se résout globalement dans RimWorld, et un patch ne duplique pas
ce qu'il vise.

L'assembly compilé de Flavor Text a été décompilé une fois, en local, pour comprendre
comment le moteur choisit un nom parmi les defs candidates. **Cette décompilation
n'est ni distribuée ni versionnée.** Ce qu'elle a établi est consigné en commentaires
dans les fichiers concernés : la sélection est un tirage aléatoire pondéré et non un
« plus spécifique gagne », et un emplacement d'ingrédient accepte récursivement les
catégories filles — ce qui a corrigé plusieurs conclusions fausses sur la couverture.

## État en cours

**Les 896 plats portent encore des noms et des descriptions en français.** Ce mod est
né de la scission d'un mod français en deux, et la traduction anglaise de son contenu
n'est pas terminée. Tant qu'elle ne l'est pas, il est jouable mais affiche du français.

Le français est déjà en sûreté dans le mod compagnon, sous
`Languages/French/DefInjected/`, et sera réinjecté de là quand les defs passeront à
l'anglais.

## Mod compagnon

**Flavor Text Extended - Français** traduit ce mod et Flavor Text lui-même, et
remplace la table d'inflexions par des formes françaises. Il n'est utile qu'en jeu
français : sa table s'applique en toutes langues, RimWorld ne sachant pas conditionner
un patch XML à la langue.

## Assistance par IA

Le contenu de ce mod a été produit avec l'assistance de Claude (Anthropic), sous
direction et relecture humaines. Les décisions de conception — quels plats écrire,
quelles catégories séparer, quels accords combler — ont été prises et validées par
l'auteur humain.

Chaque nom de plat a été vérifié comme n'entrant pas en collision avec les 930 defs
d'origine, et chaque combinaison d'ingrédients contrôlée par les outils de `_tools/`.

## Vérification en jeu

Le mod a été chargé et observé en partie. Le journal ne rapporte aucune erreur de
patch XPath, aucune erreur de résolution de def, et le rapport de traduction de
RimWorld ne signale aucune injection inutile ni aucune clé périmée.

Un défaut y a été trouvé et corrigé : la table d'inflexions déclarait 24 viandes qui
ne peuvent pas exister — les petits oiseaux partagent la viande de casoar via
`useMeatFrom`, et les entités d'Anomaly rendent de la viande tordue. Le générateur
`_tools/geninflections.js` ne filtre toujours pas ces cas : le relancer les
réintroduirait.

## Ingrédients de mods tiers rattachés

Aucun n'est requis ; chaque opération est neutralisée si son mod est absent.

- **RimLife Expansion Trading items** (daylight) — viande séchée, deux fromages.
- **RimLife Cultivation Plus** (daylight) — pak-choï, tomate, oignon, paprika, maïs denté.
- **Chinese Traditional Cultural Things Expanded** (Diamond.J, DaJian, Frolg, TangWan) —
  orge de l'Himalaya, riz hybride, farines, moutarde salée, agrume du Zhejiang, huile
  de piment, noix de ginkgo, armoise, quatre alcools de grain. Les deux versions du mod
  sont couvertes, leurs `packageId` différant.
- Divers — miel en rayon, okara, baies composées, arachnides comestibles, fourrages.

Ces rattachements sont fragiles par nature : si l'un de ces mods renomme une def, le
patch cesse de s'appliquer **sans message d'erreur**.

## Licence

MIT, voir `LICENSE`. Elle couvre les defs ajoutées, les patchs et les outils. Elle ne
couvre pas Flavor Text.
