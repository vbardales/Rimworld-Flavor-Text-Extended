# Functional test plan

This mod holds no assembly. Every one of its 896 dishes, its seven new ingredient categories and
its four patch files are XML, applied at load time on top of Flavor Text (hekmo). So there is
nothing to unit-test and three things that can actually break:

1. **Loading.** A patch whose xpath finds nothing, or a `ThingDef` reference that does not resolve,
   logs a red error and can cost a whole def.
2. **Attachment.** An ingredient reaches a category by keyword match against its label, or by name
   through `thingDefsToAbsorb`. A category that absorbs nothing is silent: no error, just dishes
   that never fire.
3. **Firing.** A dish only appears if every one of its ingredient slots accepts something present
   in the save. Most of the 896 need a pantry wider than vanilla, so "I never see my dishes" is
   the expected outcome on a light modlist, not a bug.

Every scenario below says what to do, what passes, and what the failure looks like.

## Reading the results

The log is `%USERPROFILE%\AppData\LocalLow\Ludeon Studios\RimWorld by Ludeon Studios\Player.log`.
It is rewritten at each launch, so read it after quitting rather than during a session.

Flavor Text announces itself with one line, which is the single most useful thing in the file:

```
[Flavor Text] mod is now active: {0} active FlavorDefs for the current modlist found out of {1} total FlavorDefs
```

The second number is every dish definition loaded, hekmo's and ours together. The first is how many
the engine kept for this modlist. Both are predicted offline by `_tools/actifs.js`, so a gap between
the tool and the log is itself a finding.

Our defs are all prefixed `FlavorTextFR_`, a leftover from when this mod and its French companion
were one piece of work. It makes them easy to grep for in the log.

## Before the game: the offline checks

Run from the repository root. They need only Node and a path to Flavor Text's own `Defs` folder,
which under Steam is `steamapps/workshop/content/294100/3245374432/1.6/Defs`.

```bash
node _tools/checkdefs.js "<path to Flavor Text>/1.6/Defs"
```

Every dish is checked for a defName that collides with one of hekmo's 930, for a placeholder that
points at a slot the def does not have, and for two dishes that would display the same name. It
must end on **0 errors**. Fourteen warnings stand today and are deliberate: dishes that share an
ingredient triplet are variety, not conflict, because the engine draws at random among matching
definitions.

```bash
node _tools/actifs.js "<path to Flavor Text>/1.6/Defs"
```

This replays the engine's own filter against the installed modlist and reports how many dishes
survive it. On the 112-mod profile current at the time of writing it reports 216 out of 1826, of
which 35 are ours.

**A dish has to pass two conditions, and the second one is what makes that number so much smaller
than the ingredient count suggests.** Every ingredient slot must accept something installed, and
the dish must also be able to sit on a kind of meal that exists. 729 dishes pass the first
condition on this profile and 216 pass both, because no cooking mod is active: there are the base
game's meals, Biotech's baby food and nutrient paste, and nothing else. Every specialised kind, so
soup, dessert, noodles, dumplings, is empty, and a dish that only declares one of those cannot be
cooked at all.

Treat the figure as an estimate rather than a bound. It does not model sister categories and cannot
see a mod that adds its ingredients by patch rather than by def, which costs dishes. The session
that holds the French companion counts 222 where this counts 216, on the same profile and the same
day, from its own implementation of the same two conditions; the gap is small and unexplained. The
only number that settles the question is the one Flavor Text prints in the log.

## The scenarios

### T1 - It loads at all

**Setup.** Flavor Text active, this mod after it, the modlist you actually play.

**Pass.** No red entry in the log naming `FlavorTextFR_`, `FT_Leek`, `FT_Shallot`, `FT_Meat_Turtle`,
`FT_Meat_Alligator`, `FT_Meat_Iguana`, `FT_Meat_Lizard` or `FT_Meat_Frog`, and none naming one of
our four files under `Patches/`. The Flavor Text line reports a second number near 1826.

**Failure shape.** `Could not resolve cross-reference to Verse.ThingDef named ...` points at
`thingDefsToAbsorb`. `Patch operation ... failed` points at an xpath that no longer matches, which
is what a Flavor Text update that renames a category would produce.

### T2 - It loads without Odyssey

**Setup.** Same, with the Odyssey expansion turned off.

**Pass.** Nothing new in the log compared with T1, and in particular no unresolved reference to
`Meat_Alligator`, `Meat_MonitorLizard`, `Meat_Bullfrog` or `Meat_SeaTurtle`. Those four animals
belong to Odyssey and their meats are guarded; only tortoise and iguana come from Core.

**What T9 becomes here.** The alligator, monitor lizard and frog categories absorb nothing on this
list, so no dish written for them can fire. They stay declared on purpose: their keywords still
attach a crocodile or a gecko coming from some other mod, which a guard on the whole definition
would throw away.

### T3 - It loads without any of the optional mods

**Setup.** A minimal list: RimWorld, Harmony, Flavor Text, this mod. None of the mods our patches
mention.

**Pass.** No error, and the startup line still reports the full second number. Our four patch files
target categories that belong to Flavor Text itself, so they must apply cleanly; only the
mod-specific entries inside them drop out.

**Why it is worth a run of its own.** The `MayRequire` attribute written on an `<Operation>` node is
read by nothing at all, so those operations run whether the mod is installed or not. What actually
does the work is the same attribute on each `<li>` inside, which the def loader honours. The
arrangement is correct, but it is correct for a reason that is easy to break by tidying.

### T4 - Without Flavor Text, nothing happens

**Setup.** This mod active, Flavor Text absent.

**Pass.** RimWorld's own dependency notice names Flavor Text, and the game either refuses to start
the list or starts with our defs dropped. Meals keep their vanilla names.

**Failure shape.** Anything that mentions `FlavorText.FlavorDef` as an unknown type and keeps going
is worth reporting: it would mean a def of ours survived into a game with no engine to read it.

### T5 - A name appears at all

**Setup.** Any save. Cook a simple meal from a single ingredient: eggs.

**Pass.** The meal is called `medium-boiled egg` rather than `simple meal`. That is
`FlavorTextFR_OeufMollet`, the only dish of ours with a single ingredient slot, which makes it the
cheapest possible proof that the whole chain works.

**Failure shape.** A vanilla name means the dish never fired. A name showing `{0_coll}` verbatim
means the slot was not filled, which is a def bug rather than an engine one.

### T6 - A three-ingredient dish fires

**Setup.** A save holding rice, pork and eggs.

**Pass.** A meal cooked from those three can come out as `katsudon`. It will not do so every time:
the engine collects every matching definition and draws among them weighted by how narrow each one
is, so hekmo's dishes on the same triplet compete with ours by design. Cook several.

**Alternatives on the same principle**, all three cookable with no cooking mod installed. Rice, egg
and any vegetable gives `bibimbap`. Potato, pork and egg gives `Tiroler Gröstl`. Egg, pork and beans
gives a `full English breakfast`. Pick from `_tools/actifs.js`, which lists the dishes that pass
both conditions on the modlist you actually have; do not pick from the def files, where most dishes
name a kind of meal that a vanilla kitchen cannot produce.

### T7 - Four ingredients become two dishes

**Setup.** A meal cooked from four or more distinct ingredients.

**Pass.** The name reads as one dish with another alongside it, not as one long name. The engine
groups ingredients three at a time and names each group, which is a feature of Flavor Text and not
something this mod changes. Worth one run because it is the most common report from players who
think a name has been truncated.

### T8 - Leek and shallot are not onion

**Setup.** A modlist providing leeks and shallots. Any of VV New Harvest, Vanilla Plants Expanded -
More Plants, or VGP Vegetable Garden will do; the three are attached by name.

**Pass.** A dish written for leek fires on leek. A dish written for onion still fires on shallot,
since shallot is a child of onion, but a dish written for shallot does not fire on a plain onion.

**Failure shape.** Leek behaving as a generic vegetable means the category absorbed nothing. Check
the mod is one of the three named, and remember that the keyword path also works: any ingredient
whose label contains leek attaches without being listed.

### T9 - The five reptile meats are told apart

**Setup.** Odyssey on, and a source of at least two of turtle, alligator, iguana, monitor lizard and
bullfrog meat.

**Pass.** A dish written for turtle fires on turtle meat and not on iguana meat. Flavor Text keeps
all of these in one category, and splitting them is the whole point of the file.

**Note.** The giant toad stays in the generic category on purpose. It should only ever receive
generic names.

### T10 - Ingredients whose labels are not Latin

**Setup.** Only if you run one of the three mods our patches name: RimLife Cultivation Plus, RimLife
ExTRG, or Chinese Traditional Cultural Things Expanded.

**Pass.** A meal cooked from their tomatoes, onions or peppers gets the same dish names as one
cooked from Vanilla Cooking Expanded's. That equality is the point: Flavor Text sorts ingredients by
matching Latin keywords against labels, so a label written in Chinese or Japanese is invisible to
it, and two identical tomatoes otherwise behave differently.

**Failure shape.** Silence. These attachments cannot produce an error when they fail, only dishes
that do not fire, which is why this scenario has to be run deliberately.

### T11 - English stays English

**Setup.** This mod without its French companion, game language English.

**Pass.** Every dish name is in English. The companion mod replaces Flavor Text's inflection table,
which lives in a def rather than a language file, so it applies in every language: installed by
mistake on an English game it produces French fragments inside English names. Seeing one here means
the companion is active.

### T12 - Names survive a save and reload

**Setup.** Cook several named meals, save, quit to the menu, reload.

**Pass.** The meals keep the names they had. Cooking is where a name is drawn, so a reload should
not redraw it.

**Failure shape.** A meal renamed after reload is worth reporting upstream rather than here: it
would be engine behaviour, not a def.

## Where the reptile meats come from

`Mod/Defs/FlavorCategoryDefs_FR_Reptiles.xml` absorbs six meats by name, and only two of the
animals are in Core. Writing this plan is what turned up the three that were missing their guard;
they have one now, and T2 is the scenario that keeps them honest.

| reference | where the animal lives | guarded |
|---|---|---|
| `Meat_Tortoise` | Core | not needed |
| `Meat_Iguana` | Core | not needed |
| `Meat_SeaTurtle` | Odyssey | yes |
| `Meat_Alligator` | Odyssey | yes |
| `Meat_MonitorLizard` | Odyssey | yes |
| `Meat_Bullfrog` | Odyssey | yes |

The guards sit on the individual entries rather than on the category definitions, so the five
categories are declared whatever the modlist. That is deliberate: their keywords go on matching a
crocodile or a gecko from any other mod, and a guard on the definition itself would lose that.

One thing not to copy from upstream. Flavor Text guards the same three meats with
`MayRequire="RimWorld.Odyssey"`, which is missing the publisher prefix of the real packageId,
`Ludeon.RimWorld.Odyssey`. A mistyped packageId in `MayRequire` is silent anywhere outside Ludeon's
own Unity editor, so those three lines of his are dropped even when Odyssey is installed.
