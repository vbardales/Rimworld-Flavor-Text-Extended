# Comparaison avec le registre FoodCourt — 2026-09-13

Le registre révèle des pistes supplémentaires. Il ne démontre pas que toutes ses entrées
doivent devenir des plats Flavor Text : les ThingDef alimentaires et les FlavorDef de noms
générés sont deux objets différents.

## Résultats

- Registre du 2026-09-13 à 13:02:45 : **11 339 entrées**, **10 989 couples packageId/defName**.
- Référence comparée : **930 plats Flavor Text + 896 plats Extended**, **177 catégories**.
- **663 entrées** ont une référence explicite dans les catégories examinées.
- **9 507 entrées** ont au moins une piste lexicale ; ce chiffre chevauche le précédent.
- **1 794 entrées** n'ont ni référence explicite ni piste lexicale, dont **294 ingrédients bruts**.
- Parmi **2 880 entrées de plats préparés**, **98** ont un libellé identique après normalisation
  à un plat Flavor Text/Extended. Les autres ne sont pas automatiquement des recettes absentes :
  variantes, synonymes, ingrédients paramétrés et copies ne sont pas résolus par ce test.

## Priorités identifiées

| Ingrédient | Fournisseur | Piste à vérifier | Besoin FR |
|---|---|---|---|
| RawDaBaiCai — 白菜 | Shenzhou actuel | FT_Cabbage : chou chinois | Formes explicites absentes du snapshot FR |
| RawLianOu — 莲藕 | Shenzhou actuel | FT_Lotus : rhizome de lotus | Idem |
| RawLvDou — 绿豆 | Shenzhou actuel | Catégorie haricot : haricot mungo | Idem |
| WorkedFenTiao — 粉条 | Shenzhou et copie FoodCourt | Vérifier catégorie et comportement des vermicelles | Idem |
| RawZongYe — 粽叶 | Shenzhou, copies locales | Feuilles d'enveloppe des zongzi ; ne pas assimiler sans revue à un légume | Idem |

Ces lignes n'ont pas de correspondance lexicale/explicite dans les sources examinées.
Leurs catégories génériques peuvent néanmoins fournir un repli. Les copies EdenGarden du
chou et du lotus ont des labels anglais reconnus lexicalement : le fournisseur et la langue
comptent, même lorsque le defName est identique. Les versions Shenzhou du registre sont
anciennes (1.3/1.5), pas certifiées pour 1.6.

Pour les plats, **Altang, Beondegi, Bungeoppang, Jjapaghuri et Kimchijeon** du registre Korean
Cuisine n'apparaissent pas sous ces graphies dans les sources Flavor Text/Extended examinées.
Ce sont des candidats de répertoire : vérifier leurs combinaisons d'ingrédients et les plats
équivalents avant d'écrire de nouvelles définitions. Aucun contenu tiers n'a été copié dans Mod/.

## Méthode et limites

`../_tools/compare_foodcourt.py` lit le registre, les Defs du Flavor Text installé et les
Defs/patches Extended. Il exporte `comparison.json` avec provenance, conditions, statut actif,
catégories explicites, pistes lexicales, catégories de repli et présence de formes FR.
Le snapshot est identifié par SHA256
`1d43194596ed51375ce0ccde3bccbf8b0fc16d536a74ed66623badc3d14976ea`.

La recherche lexicale est volontairement un filtre de découverte, **pas une simulation du
moteur** : elle n'exécute ni scores, exclusions héritées, ordre de chargement, traductions,
ni admissibilité effective d'un ingrédient. Les références gardées sont recensées sans activer
toutes leurs conditions. Le contrôle FR recense les clés, pas leur activation par package.
Les sous-chaînes peuvent donner des faux positifs. Le registre inclut copies, mods inactifs,
intrants non comestibles, et 82 erreurs XML ; les aliments générés par C# peuvent manquer.

La comparaison n'a modifié ni les plats ni les traductions. Le rapport est transmis à la tâche
du compagnon FR pour que l'intégration et les formes grammaticales soient coordonnées.
