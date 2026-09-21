# Flavor Text Extended

An add-on for [Flavor Text](https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432)
by hekmo. It requires that mod, contains none of its files, and does nothing without it.
RimWorld 1.6.

## What it adds

**901 new dishes.** French and regional cooking first, then the wider repertoire: Italy, the
Maghreb, Japan, Korea, Peru, India, China, the Levant, Mexico, West Africa, Eastern Europe, the
Caribbean, Polynesia.

Every dish rests on a distinct combination of ingredients. That combination is what the engine
draws on, not the name — so the same dish under five different names would add nothing, and is not
here. Where two dishes do share a combination it is deliberate: the engine picks at random among
matching definitions, weighted by how narrow each one is, so sharing produces variety rather than
conflict.

**New ingredient categories.** Leek and shallot, split out of the generic onion. Five reptile
meats — turtle, alligator, iguana, lizard, frog — split out of the single herptile category.

**Third-party ingredients.** Flavor Text matches keywords against both defNames and labels.
This mod also explicitly attaches selected ingredients by defName: highland barley, hybrid
rice, salted mustard greens, bok choy, ginkgo nuts, grain wines, dried meat and cheeses.
A non-Latin label alone does not make an ingredient invisible to the engine. Some attachments
cover unmatched names; others make the intended category explicit. The ingredient providers
are optional: their individual attachment entries are guarded by package ID.

**On the names.** Dishes that English already knows under their own name keep it — `coq au vin`,
`pissaladière`, `bánh pía sầu riêng`, `tteokbokki`. Only those with a genuine English equivalent
are translated. So a French or Japanese name in the list is a choice, not an untranslated string.

## What your colony grows decides what you see

Flavor Text names a meal after what went into it, so a dish can only appear if its ingredients
exist in the game. These 901 lean on a wider pantry than vanilla keeps — wheat, cheese, butter,
cream, onion, tomato, garlic, chilli — so on a vanilla-only save about forty of them can fire.
With farming and cooking mods installed, the whole set comes into play.

That is how the engine works rather than a shortcoming: a dish waits for its ingredient, and
costs nothing while it waits. But it sets what a player should expect.

`_tools/actifs.js` estimates it for a given modlist — it reads `ModsConfig.xml`, replays the
engine's category matching, and reports how many definitions survive, split between this mod and
Flavor Text's own. The following is a historical profile snapshot, not a result for your
current modlist:

```
hekmo   611 actives / 930   65.7 %
nous     44 actives / 896    4.9 %
TOTAL   655 actives / 1826  35.9 %
```

Flavor Text itself holds up on vanilla because its dishes are built on vanilla ingredients. The
gap between those two lines is the whole point of the section above.

## The French companion

[**Flavor Text Extended - Français**](https://github.com/vbardales/Rimworld-Flavor-Text-Extended-Francais)
contains the French translations for this mod and Flavor Text itself, including ingredient grammar and category labels. Install it alongside both mods to play in French. This repository ships English content; the French companion is optional and has its own validation status.

## How it hooks in

Nothing is copied. The added defs inherit from `FlavorDef_Base`, defined by Flavor Text, and XPath
patches amend its ingredient categories at load time — def inheritance resolves globally in
RimWorld, and a patch does not duplicate what it targets.

The attachments depend on external defNames and package IDs. Upstream changes can break
them; an inactive conditional entry can disappear silently, while a missing active reference
can produce a load error. Check both logs and actual ingredient categorization.

## Repository layout

```
Mod/       distributed mod: About, Defs, Patches, licence and attribution
Art/       illustration source, icon sources and reproducible Preview composition
_tools/    development and validation scripts; not distributed
TESTS.md   offline commands and in-game test scenarios
```

Install or upload **Mod/**, not the repository root. RimWorld sends that folder unchanged;
the tools and artwork sources remain outside the distributed content.

Some historical tools concern the separate French companion. They are not required to install
this extension. Do not regenerate the companion's resources as part of an extension build;
that repository has its own validation scope.

## Validation

See `TESTS.md` for repeatable checks and manual scenarios, and `STATUS.md` for results
against the current working tree. Offline validation does not certify in-game behavior.

## Licence

MIT, see `LICENSE`. It covers the added defs, the patches and the tools. It does not cover Flavor
Text, which remains under its own terms.

See `ATTRIBUTION.md` for the full detail, including the disclosure on AI assistance.
