# In-game scenarios, run by Pickle

Load-time scenarios for Flavor Text Extended, played inside a running RimWorld by
[Pickle](https://github.com/RimWorks/Rimworld-Pickle) (`rimworks.pickle`, Workshop 3791648678).

**Status, 2026-09-24: all four passes green on the current revision (`without-optionals` 11 of 11, `without-odyssey` 3 of 3, `with-optionals` 6 of 6, `workshop-captures` 3 of 3).** Reports are preserved in `results/` because the shared `pickle-reports/` directory is overwritten by the next run. See `../../TESTS.md`, "Pickle passes" and "What has run", for what each pass shows and does not show. Step ownership is described below.

## What is here, and why it needs the game

Everything provable outside the game is proved outside it (`_tools/Test-Xml.ps1`,
`checkdefs.js`, `Test-OptionalIngredients.ps1`, `Check-ConfigErrors.ps1`), and a Pickle run takes
over the machine, so nothing here restates one of them. What is left:

| Scenario | Why an offline tool cannot say it |
|---|---|
| both mods loaded, this one after Flavor Text | `loadAfter` is a request; only the game shows the order it settled on |
| the new categories and dishes are defined by this mod | defs of a custom type (`FlavorText.FlavorDef`) reaching the database under this mod |
| the unguarded keyword patches landed | patching happens after every other active mod has had its turn |
| it loads and logs nothing, bare and beside the providers | `Test-Xml.ps1` does not emulate the loader; an unresolved `<li MayRequire>` reference is a load-time error |
| the reptile meats and the providers' ingredients sit in the categories the patches name (`04`, `02`) | the category tree exists only once the engine has built it; a category that absorbs nothing is silent |
| a meal is named after a dish (`03`) | Flavor Text's postfix on `GenRecipe.MakeRecipeProducts` runs only in the game |

## Three passes

| Pass | `-DepMap` | `-Filter` | What it stages |
|---|---|---|---|
| **without-optionals** | *(none)* | `01-alone.feature,03-cooking.feature,04-filing.feature` | Core, DLCs, Harmony, RimLogging, Pickle, Flavor Text, this mod |
| **without-odyssey** | `wsl-deps.without-odyssey.map` | `05-without-odyssey.feature` | the bare pass with one DLC left out of ModsConfig |
| **with-optionals** | `wsl-deps.with-optionals.map` | `02-with-optionals.feature` | the above, plus VV New Harvest, RimLife Cultivation Plus, RimLife Expansion Trading and its framework |
| **workshop-captures** | `wsl-deps.workshop-captures.map` | `06-workshop-captures.feature` | the minimal pass plus PickleTools ScreenshotMode and ScreenshotStudio; produces three review screenshots of the meal cards over Nelim's central Zen Meadow emblem, with the HUD and Pickle panels hidden |

```powershell
powershell.exe -ExecutionPolicy Bypass -File scripts/Run-PickleWsl.ps1 -Mod <Mod> -Filter 01-alone.feature,03-cooking.feature,04-filing.feature
powershell.exe -ExecutionPolicy Bypass -File scripts/Run-PickleWsl.ps1 -Mod <Mod> -DepMap wsl-deps.without-odyssey.map -Filter 05-without-odyssey.feature
powershell.exe -ExecutionPolicy Bypass -File scripts/Run-PickleWsl.ps1 -Mod <Mod> -DepMap wsl-deps.with-optionals.map -Filter 02-with-optionals.feature
powershell.exe -ExecutionPolicy Bypass -File scripts/Run-PickleWsl.ps1 -Mod <Mod> -DepMap wsl-deps.workshop-captures.map -Filter 06-workshop-captures.feature
```

The filters differ because 01 asserts that the providers are **absent** and 02 that they are
present: played in the other pass, each fails for a reason that has nothing to do with the mod.

**Running the passes.** Each pass has its own `-DepMap`, so each takes its own ticket: chain them in one background
process with one log and one notification instead of one watcher per ticket, and pass `-MaxWaitMinutes 600` (the default
90 made two passes exit 7 on 2026-09-24 with 21 and 16 tickets ahead, having played nothing; requeue them, they proved
neither way). Add `-EvidenceDir Tests/Pickle/results/<date>-<pass>` and keep only what `../../TESTS.md`, "Evidence to
keep", says. Ask the owner before taking any ticket.

**Frequency measure (`08-frequency.feature`, bare pass, `-Filter 08-frequency.feature`).** Not a regression
test but a measurement: it cooks 400 meals per scenario from random ingredients (seeded, so repeatable) and logs
`[FTE frequency] ...` with the share of meals carrying a dish of this mod versus Flavor Text's own. The 1 percent floor
only separates "nothing fires" from "something does"; read the number in `Player.log`. It answers the question hekmo
raised on 2026-09-25. Rerun it after any change to the dishes and compare with the previous run.

## Presentation fixture and framing

Functional scenarios keep `test-colony`: their job is to prove a behavior, not to compose a
picture. Workshop or other presentation captures instead stage `nelim.pickletools.screenshotstudio`
and load `nelim-zen-meadow-studio`. This is Nelim's paused, disposable Zen Meadow colony; it makes
the game world visible behind the subject without turning a test fixture into a survival save.

For Flavor Text Extended's meal-card captures, frame `Nelim's Pickle Tools: I frame the studio
"emblem"` before opening the card. The central tiled icon should remain visible around the card,
so the image reads as a RimWorld colony and a Nelim presentation rather than as interface alone.
Use the kitchen frame only when the stove or cooking setup itself is the subject of the picture.
Screenshot mode then hides the HUD and Pickle-owned panels while keeping the card. It is not a
visual verdict: open every generated image before using it on the Workshop page.

`wsl-ids.map` names the one hard dependency the staging script does not know, Flavor Text
(`hekmo.FlavorText`, 3245374432). It is read in every pass and activates nothing.

## How the harness reaches this repository

`scripts/Run-PickleWsl.ps1` and `scripts/stage-pickle-wsl.sh` look for `<rimworld>/<Mod>/Mod` and
`<rimworld>/<Mod>/Tests/Pickle`. This repository sits one level deeper, at
`<rimworld>/FlavorText/FlavorTextExtended`, and `-Repo <rimworld>\FlavorText` would lose
`scripts/`. Since 2026-09-21 a directory junction `<rimworld>\FlavorTextExtended` ->
`FlavorText\FlavorTextExtended` provides the way in, ignored by the root `.gitignore`.
`stage-pickle-wsl.sh --list` (run in the WSL, nothing launched) now names `FlavorTextExtended`.
It is a second path to the same files, not a copy. If it is ever removed, use
`[System.IO.Directory]::Delete(path, $false)`: a recursive delete would follow it and erase this
repository. Reports land in `<rimworld>/pickle-reports`, as for every mod.

## Not covered, and why

- **T4, and everything French.** The game's reaction to a missing dependency is RimWorld's, not tested; the
  French scenarios are the companion's, in its own suite.
- **Chinese Traditional Cultural Things Expanded.** Both of its versions declare 1.5 or older, so
  a run could certify nothing for 1.6; see the map.
- **A real cook walking to a real stove.** `03-cooking` calls `GenRecipe.MakeRecipeProducts` directly, so
  Flavor Text's postfix is real but no tick passes. It also plays T12: meals are put on the map, the game is
  saved and reloaded, and each meal is found again by its id.

## Where the steps come from

- **Ours**, in `Source/` (below): the cooking steps (`a colonist cooks…`, the assertions on the names drawn, the meals put on the
  map and checked across a reload) and the category-filing steps (`… is filed under …`). They are written for this mod and read
  as general; PickleTools' README lists them under "Steps that live in a suite", so another mod knows where to find them.
- **PickleTools**, staged by the pass map: `nelim.pickletools.expansions` (`PickleTools/ExpansionSteps`) gives the two steps
  `Nelim's Pickle Tools: the expansion … is [not] active` used by `05-without-odyssey`. They started here and moved on 2026-09-21.

## The step assembly

`Source/` builds `Mod/Pickle/Assemblies/FlavorTextExtended.PickleSteps.dll`, committed like the other
suites' because the staging copies the folder as it is. Rebuild after editing the `.cs`:

```powershell
dotnet build Tests/Pickle/Source -c Release
powershell.exe -ExecutionPolicy Bypass -File Tests/Pickle/Check-Steps.ps1
```

The build needs NuGet (`Krafs.Rimworld.Ref`, `RimWorks.Pickle.Ref`) and Flavor Text's own `FlavorText.dll`
from the Workshop folder, compiled against and never copied. `Check-Steps.ps1` needs no game: it compiles every
pattern with Pickle's expression engine and matches each feature line. A wrong pattern would make a run play
zero scenarios, so it is worth its two seconds. Rebuilding is not a game action; running the suite is.

## Companion mod

`Mod/` is a companion mod, **Flavor Text Extended - Pickle tests**, never published. It holds the
feature files, so nothing test-related ships in the Workshop folder. `Mod/Languages/README.md`
explains the one inert file that stops RimWorld logging "did not load any content" for it.
