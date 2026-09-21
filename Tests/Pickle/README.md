# In-game scenarios, run by Pickle

Load-time scenarios for Flavor Text Extended, played inside a running RimWorld by
[Pickle](https://github.com/RimWorks/Rimworld-Pickle) (`rimworks.pickle`, Workshop 3791648678).

**Status, 2026-09-21: `sans-facultatifs` ran, 5 of 5; `avec-facultatifs` has not run.** The report is
kept in `results/2026-09-21-sans-facultatifs/` because `pickle-reports/` is overwritten by the next
run. Every step is one Pickle builds in. See `../../TESTS.md`, "Pickle passes" and "What has run",
for what each pass is for, what the run shows and what it does not.

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

## Two passes

| Pass | `-DepMap` | `-Filter` | What it stages |
|---|---|---|---|
| **sans-facultatifs** | *(none)* | `01-alone.feature` | Core, DLCs, Harmony, RimLogging, Pickle, Flavor Text, this mod |
| **avec-facultatifs** | `wsl-deps.avec-facultatifs.map` | `02-avec-facultatifs.feature` | the above, plus VV New Harvest, RimLife Cultivation Plus, RimLife Expansion Trading and its framework |

```powershell
powershell.exe -ExecutionPolicy Bypass -File scripts/Run-PickleWsl.ps1 -Mod <Mod> -Filter 01-alone.feature
powershell.exe -ExecutionPolicy Bypass -File scripts/Run-PickleWsl.ps1 -Mod <Mod> -DepMap wsl-deps.avec-facultatifs.map -Filter 02-avec-facultatifs.feature
```

The filters differ because 01 asserts that the providers are **absent** and 02 that they are
present: played in the other pass, each fails for a reason that has nothing to do with the mod.

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

- **Without Odyssey** (TESTS.md T2). The staging always activates Core and all five DLCs; a pass
  without one needs a staging option that does not exist. Stays a manual scenario.
- **Chinese Traditional Cultural Things Expanded.** Both of its versions declare 1.5 or older, so
  a run could certify nothing for 1.6; see the map.
- **Cooking a meal and reading its name.** T5 to T9 need a colony, a cook and a random draw among
  matching definitions. Not a load-time claim, and not written here.

## Companion mod

`Mod/` is a companion mod, **Flavor Text Extended - Pickle tests**, never published. It holds the
feature files, so nothing test-related ships in the Workshop folder. `Mod/Languages/README.md`
explains the one inert file that stops RimWorld logging "did not load any content" for it.
