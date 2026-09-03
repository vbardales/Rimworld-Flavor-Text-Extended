# Flavor Text Extended

An add-on for [Flavor Text](https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432)
by hekmo. It requires that mod, contains none of its files, and does nothing without it.
RimWorld 1.6.

## What it adds

**896 new dishes.** French and regional cooking first, then the wider repertoire: Italy, the
Maghreb, Japan, Korea, Peru, India, China, the Levant, Mexico, West Africa, Eastern Europe, the
Caribbean, Polynesia.

Every dish rests on a distinct combination of ingredients. That combination is what the engine
draws on, not the name — so the same dish under five different names would add nothing, and is not
here. Where two dishes do share a combination it is deliberate: the engine picks at random among
matching definitions, weighted by how narrow each one is, so sharing produces variety rather than
conflict.

**New ingredient categories.** Leek and shallot, split out of the generic onion. Five reptile
meats — turtle, alligator, iguana, lizard, frog — split out of the single herptile category.

**Third-party ingredients.** Flavor Text sorts ingredients by matching Latin keywords against
their labels, so mods whose labels are in Chinese or Japanese are invisible to it however common
their ingredients. This mod attaches them by name instead: highland barley, hybrid rice, salted
mustard greens, bok choy, ginkgo nuts, grain wines, dried meat and cheeses, among others. None of
those mods are required — each operation does nothing when its mod is absent.

**On the names.** Dishes that English already knows under their own name keep it — `coq au vin`,
`pissaladière`, `bánh pía sầu riêng`, `tteokbokki`. Only those with a genuine English equivalent
are translated. So a French or Japanese name in the list is a choice, not an untranslated string.

## What your colony grows decides what you see

Flavor Text names a meal after what went into it, so a dish can only appear if its ingredients
exist in the game. These 896 lean on a wider pantry than vanilla keeps — wheat, cheese, butter,
cream, onion, tomato, garlic, chilli — so on a vanilla-only save about forty of them can fire.
With farming and cooking mods installed, the whole set comes into play.

That is how the engine works rather than a shortcoming: a dish waits for its ingredient, and
costs nothing while it waits. But it sets what a player should expect.

`_tools/actifs.js` measures it for a given modlist — it reads `ModsConfig.xml`, replays the
engine's category matching, and reports how many definitions survive, split between this mod and
Flavor Text's own:

```
hekmo   611 actives / 930   65.7 %
nous     44 actives / 896    4.9 %
TOTAL   655 actives / 1826  35.9 %
```

Flavor Text itself holds up on vanilla because its dishes are built on vanilla ingredients. The
gap between those two lines is the whole point of the section above.

## The French companion

[**Flavor Text Extended - Français**](https://github.com/vbardales/Rimworld-Flavor-Text-Extended-Francais)
translates this mod and Flavor Text itself, and replaces the
inflection table with French forms. It is only useful in a French game: its table applies in every
language, since RimWorld cannot make an XML patch conditional on the current one.

## How it hooks in

Nothing is copied. The added defs inherit from `FlavorDef_Base`, defined by Flavor Text, and XPath
patches amend its ingredient categories at load time — def inheritance resolves globally in
RimWorld, and a patch does not duplicate what it targets.

The attachments to third-party mods are fragile by nature: if one of those mods renames a def, the
patch stops applying **with no error message**.

## Repository layout

```
Defs/      the 896 dishes and the new ingredient categories
Patches/   XPath amendments to Flavor Text's categories, and third-party attachments
_tools/    Node scripts used to generate and check the content
```

The Workshop uploader sends the mod folder as it stands, with no filtering, so `_tools/` ships
with it: a few hundred kilobytes of JavaScript the game never reads.

`_tools/geninflections.js` regenerates the French mod's inflection table, and reproduces the
shipped file exactly — nothing in it is hand-edited. Getting there took two rules that are easy
to miss: `useMeatFrom` is almost always declared on an *abstract* parent def, so small birds
share cassowary meat and `Meat_Crow` never exists; and mechanoids and Anomaly entities are ruled
out by their `fleshType`, not by their name. Without both, the generator emits twenty-four meats
that no def ever defines.

## Licence

MIT, see `LICENSE`. It covers the added defs, the patches and the tools. It does not cover Flavor
Text, which remains under its own terms.

See `ATTRIBUTION.md` for the full detail, including the disclosure on AI assistance.
