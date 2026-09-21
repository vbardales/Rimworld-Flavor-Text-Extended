# Functional test plan

The manual in-game scenarios below are executed exclusively by the user. Codex checks preparation,
static prerequisites and automated results. The Pickle suite (see "Pickle passes") is a separate
thing: a session may run it in the WSL game under the machine lock, never in the Windows one.
Pending in-game results block only done -> tested, not preTest -> done.

This mod holds no assembly. Every one of its 901 dishes, its seven new ingredient categories and
its five patch files are XML, applied at load time on top of Flavor Text (hekmo). So there is
no owned assembly to unit-test; XML regression checks cover three things that can break:

1. **Loading.** A patch whose xpath finds nothing, or a `ThingDef` reference that does not resolve,
   logs a red error and can cost a whole def.
2. **Attachment.** An ingredient reaches a category by keyword match, against its defName and its
   label both, or by name through `thingDefsToAbsorb`. A category that absorbs nothing is silent:
   no error, just dishes that never fire.
3. **Firing.** A dish only appears if every one of its ingredient slots accepts something present
   in the save, and if the kind of meal it declares exists. Most of the 901 need a pantry wider
   than vanilla and a cooking mod for their kind of meal, so "I never see my dishes" is the
   expected outcome on a light modlist, not a bug.

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
must end on **0 errors**. The standalone baseline is ten warnings; the older fourteen-warning
baseline also checked the French companion. Dishes that share an
ingredient triplet are variety, not conflict, because the engine draws at random among matching
definitions.

```bash
node _tools/actifs.js "<path to Flavor Text>/1.6/Defs"
```

This replays the engine's own filter against the installed modlist and reports how many dishes
survive it. On the 112-mod profile current at the time of writing it reports 222 out of 1826, of
which 35 are ours.

**A dish has to pass two conditions, and the second one is what makes that number so much smaller
than the ingredient count suggests.** Every ingredient slot must accept something installed, and
the dish must also be able to sit on a kind of meal that exists. 729 dishes pass the first
condition on this profile and 222 pass both, because no cooking mod is active: there are the base
game's meals, Biotech's baby food and nutrient paste, and nothing else. Every specialised kind, so
soup, dessert, noodles, dumplings, is empty, and a dish that only declares one of those cannot be
cooked at all.

Treat the figure as an estimate rather than a bound. It does not model sister categories and cannot
see a mod that adds its ingredients by patch rather than by def, and both of those cost dishes. The
only number that settles the question is the one Flavor Text prints in the log.

One special case is worth knowing, since it is the sort of thing that silently eats six dishes.
Biotech files baby food under raw foods rather than under cooked meals, so a scan that trusts the
category leaves the baby-meal kind empty and calls every dish that needs it impossible. It is
caught here by name.

## The scenarios

The current French resource/parameter check includes this repository's category labels
and the companion's dish text without modifying the companion:

```powershell
./_tools/Test-Localization.ps1 -CompanionMod '../FlavorTextExtendedFR/Mod'
```

It must report all 1,799 owned fields covered with no missing/duplicate paths, empty text
or invalid ingredient tokens. This technical check is separate from semantic review and
the in-game French scenario. Native English Def values provide the English coverage.

Verify optional ingredient references against installed providers with:

```powershell
./_tools/Test-OptionalIngredients.ps1
```

This checks actual provider metadata and selected XML folders, including older-version
fallbacks. Historical Shenzhou hooks resolving in XML do not certify those mods on 1.6.
Current baseline: 47 provider-reference pairs (43 before the FoodCourt additions) and no missing reference; four invalid
leek/shallot references were removed after this check first reported their absence.

### T1 - It loads at all

**Setup.** Flavor Text active, this mod after it, the modlist you actually play.

**Pass.** No red entry in the log naming `FlavorTextFR_`, `FT_Leek`, `FT_Shallot`, `FT_Meat_Turtle`,
`FT_Meat_Alligator`, `FT_Meat_Iguana`, `FT_Meat_Lizard` or `FT_Meat_Frog`, and none naming one of
our five files under `Patches/`. The Flavor Text line reports a second number near 1826.

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

**Setup.** In the mod manager, select this extension with Flavor Text absent.

**Actions.** Inspect the dependency warning without starting this invalid modlist. Enable
Flavor Text and its required Harmony dependency, place the extension after Flavor Text,
then restart with the valid list and execute T1.

**Pass.** The warning identifies Flavor Text; it clears when the dependencies are enabled
and ordered correctly. The valid list passes T1. A forcibly started invalid list is not
supported: custom Def types require the dependency and graceful fallback is not promised.

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

**Setup.** VV New Harvest 1.6 supplies the verified `VV_Leeks` ingredient. For the shallot
comparison, also supply a real ingredient whose defName or label matches a shallot keyword;
record its provider and defName. No explicit shallot provider is certified by this mod.

**Pass.** A dish written for leek fires on leek. A dish written for onion still fires on shallot,
since shallot is a child of onion, but a dish written for shallot does not fire on a plain onion.

**Failure shape.** Leek behaving only as a generic vegetable means the specific category did
not attach. Confirm `VV_Leeks` exists and the extension is active. If no shallot ingredient is
available, record that part of the scenario as unverified. VGP and VPE More Plants do not
declare the previously assumed leek/shallot defNames in their installed 1.6 XML.

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

**Actions.** With a supported provider enabled, compare the category assigned to an explicitly
attached ingredient such as RawQingKe with its target category. Where both tomato providers
exist, cook equivalent ingredient combinations from each and inspect eligible dish names.

**Pass.** Explicitly attached ingredients reach their declared categories. Equivalent tomato
ingredients permit the same recipe categories; individual randomly selected names may differ.
Flavor Text checks both defNames and labels, so a non-Latin label alone does not prove the
attachment is necessary. Record the actual provider version; old Shenzhou versions without
declared RimWorld 1.6 support are not a certified integration.

**Failure shape.** A guard may silently omit an entry; a missing active defName may instead
produce a cross-reference error. Check both category membership and the log.

### T11 - English stays English

**Setup.** This mod without its French companion, game language English.

**Pass.** Every dish name is in English. The companion mod replaces Flavor Text's inflection table,
but its current compiled wrapper skips the French patches in English. Repeat with the current
companion enabled to verify that isolation in the game, after a full language/data reload.
Record the companion revision: earlier versions did not have this guard. French fragments
in either English run are a failure, not expected behavior.

### T12 - Names survive a save and reload

**Setup.** Cook several named meals, save, quit to the menu, reload.

**Pass.** The meals keep the names they had. Cooking is where a name is drawn, so a reload should
not redraw it.

**Failure shape.** A meal renamed after reload is worth reporting upstream rather than here: it
would be engine behaviour, not a def.

### T13 - French generated text and interface

**Setup.** RimWorld 1.6 in French, Harmony, Flavor Text, this extension and its separate
French companion after its dependencies. Record the companion revision and enabled DLCs.

**Actions.** Start a disposable new colony; inspect dependency options and the main button bar.
Cook meals for T5-T9 as available, open their labels/descriptions and inspect ingredient
inflections. Save, quit, reload and repeat. Check the translation report and Player.log.

**Pass.** Owned dish text is French, including ingredient substitutions, without unresolved
keys, raw braces, accidental English fallback or clipped descriptions. No empty extension
settings page or extension shortcut appears. No new translation or cross-reference errors
are attributable to this extension. Record upstream/companion errors separately.

### T14 - New game and existing save in both languages

**Setup.** Preserve an existing save; test only a copy. Prepare the valid English loadout
without the companion and the French loadout from T13. Never overwrite the original save.

**Actions.** For each language, start a new colony and run T1, T5, T6 and T12. Then load the
existing-save copy with the extension enabled, inspect existing meals, cook new meals and
run T12 again. Capture each run's game version, modlist and Player.log separately.

**Pass.** Both contexts load successfully, newly cooked meals use eligible dish names, and
names persist through reload. Existing meals remain usable; retroactive renaming is not
assumed. No new exception, raw token or corrupted save is attributable to the extension.

### Recording manual results

T1-T14 remain **not executed** until a tester records the actions and observations.
For each run record date, game version, extension and companion revisions, language,
DLCs, provider versions, new/existing-save context, expected/observed result, pass/fail,
and saved log or screenshot paths. Mark an unavailable optional scenario unverified with
its missing prerequisite, not passed. Rerun affected scenarios after any correction.

Settings values, input bounds and MainButtons customization/persistence are not applicable
to this extension: it adds neither settings nor a shortcut. T13 still checks their absence.

## Pickle passes

Written 2026-09-21 in `Tests/Pickle/`, **never run**. What follows says how many passes the mod
needs and what each one is for; it reports no result, because there is none. The suite is a
companion mod, `Flavor Text Extended - Pickle tests`, never published; its README has the commands.

**What Pickle is for here, and what it is not.** A Pickle run takes over the machine, so nothing
that an offline tool proves is repeated in Gherkin: `Test-Xml.ps1`, `checkdefs.js`,
`Test-OptionalIngredients.ps1` and `Check-ConfigErrors.ps1` keep the XML, the 901 dishes and the 47
provider references. What only a running game can show is T1 and T3 of this plan, made scriptable:
the two mods loaded in order, the defs reaching the database under this mod, the patches landing
once every other mod has had its turn, and a load that logs nothing. Five scenarios in the first pass, four in the second.

| Family | Passes | What it proves |
|---|---|---|
| Without the optional mods | **1**, `sans-facultatifs`, `-Filter 01-alone.feature` | the mod stands on Flavor Text alone: T3, observed rather than assumed |
| With the optional mods | **1**, `avec-facultatifs`, `-DepMap wsl-deps.avec-facultatifs.map -Filter 02-avec-facultatifs.feature` | the guarded `<li>` entries resolve when VV New Harvest, RimLife Cultivation Plus and RimLife Expansion Trading are there |
| One per declared incompatibility | **0** | nothing in `About.xml` or the README declares one |

**Two passes, not more.** The rule asks for one pass per combination of optional mods that cannot
meet. The only such pair here is the two versions of Chinese Traditional Cultural Things Expanded
(`dajian.chiteaditional.expanded` and `...oldmode`, one mod under two package IDs). Neither declares
RimWorld 1.6, so a run of either could certify nothing for 1.6, and neither is staged. If one
declares 1.6, it gets a pass of its own. The other providers coexist, so a single pass stages all of
them.

**Not covered by Pickle, and why.**
- T2, the load without Odyssey: the staging always activates Core and all five DLCs. It stays manual.
- T5 to T9 and T12: they need a colony, a cook and a random draw among matching definitions. They
  are not load-time claims.
- What the patches *add* to a category's `thingDefsToAbsorb`: `Test-Xml.ps1` proves it, and Pickle's
  `field` step has no documented form for list elements.
- `no errors were logged` is global. A red from Flavor Text or from the test mod itself fails it too;
  read who logged it before concluding anything about this mod.

**Known limits, all stated before the first run.**
- The harness looks for `<rimworld>/<Mod>/`, one level above where this repository sits. It cannot
  reach it until a junction `<rimworld>\FlavorTextExtended` exists; see `Tests/Pickle/README.md`.
- Every step is Pickle's own and was matched against the patterns found in its assembly, not
  against a game. Whether `def "X" is defined by mod "Y"` finds a def of the custom type
  `FlavorText.FlavorDef` is unknown until a run.
- A run is a `done -> tested` criterion, with the `@review` rule that a green proves the path was
  played and nothing more; these scenarios take no screenshot.

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

## Standalone repository audit — 2026-09-13

T1-T12 are planned, not recorded as passed. No in-game execution was performed in this audit.
The English validator no longer requires the French companion. Pass its DefInjected directory
as argument 3 only when deliberately checking that separate mod. The standalone result is
896 dishes, zero errors and 10 warnings; the older 14-warning baseline included French checks.

Additional repeatable XML validation:

```powershell
./_tools/Test-Xml.ps1 -FlavorTextDefs '<path to Flavor Text>/1.6/Defs'
```

Result: 49 XML files parsed, 25 PatchOperationAdd targets matched and applied in memory,
and four Odyssey meat guards verified. Conditional loading and optional-mod reference resolution
still require the in-game scenarios. No assembly exists to unit-test, but XML validation is
an automated test and must be rerun after changes to definitions or patches.

Correction to T10's rationale: the engine matches both defNames and labels. A non-Latin label
alone does not prove an ingredient needs a patch; use unmatched names such as RawQingKe to
exercise explicit attachment, and tomato as a compatibility comparison.
