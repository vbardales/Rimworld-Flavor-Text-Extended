---
mod:          Flavor Text Extended
packageId:    nelim.flavortextextended
repo:         Rimworld-Flavor-Text-Extended
visibility:   public
detached:     yes
stage:        done
licence:      original
licence_at:   MIT at the root and in Mod/; ATTRIBUTION.md names the mod this one extends
dependencies: declared
showcase:     complete
tested_on:
workshop:
remaining:
  - unverified: the twelve scenarios of TESTS.md, none of them played
  - unverified: the packageId is in no ModsConfig.xml, so the mod has never been loaded at all
  - defect: the four patch files argue from "Flavor Text only matches labels", which is false;
    some of their entries are redundant, and the comments should say which and why
session:      local_4845688c-4b3d-44af-bc18-04758c52649f
updated:      2026-09-12, the mod's own session
---

# Flavor Text Extended — status

A status sheet, read by a sweep over every mod rather than by asking each session in turn. It lives
at the root and never under `Mod/`, so the Workshop uploader does not take it.

**The sweep has never reached this folder.** It walks the directories of `Documents\rimworld`, and
this mod lives one level down, under `FlavorText/`. The first pass wrote a sheet here by hand; none
of the later passes, including the one that translated every sheet into English, came back. The
French companion never received one at all. So nothing here is kept current by a pass: this
session writes it.

## What the mod is

An extension of **Flavor Text** (hekmo, Workshop 3245374432) that contains none of its files and
does nothing without it. 896 dishes across 44 def files, seven ingredient categories and four patch
files. All XML, no assembly, nothing to build.

The French companion, `nelim.flavortextextended.fr`, is a separate mod with its own repository and
its own session. This one is English and needs nothing from it.

The defs still carry the `FlavorTextFR_` prefix, left over from when the two mods were one piece of
work. Convenient for grepping the log. Not worth renaming: it would gain nothing and would break
any save carrying them, the day there is one.

## The three fields a sweep could not fill

- **`licence`** — `original`. The 896 dishes are written here, the mod is MIT, and it redistributes
  nothing: the machinery is hekmo's and stays with him. `ATTRIBUTION.md` says so and names the
  third-party mods the patches attach to. The French companion answers `alive` to the same
  question, and the difference is correct: it translates hekmo's own 930 dish names and
  descriptions, which is derivative of his text, where this mod only depends on his engine.
- **`tested_on`** — empty, and exact. The packageId appears in no `ModsConfig.xml` and no scenario
  of `TESTS.md` has been played. The junction from `RimWorld/Mods` does exist and points at `Mod/`.
- **`workshop`** — empty, exact too: no `PublishedFileId.txt` under `Mod/`, so nothing was ever
  uploaded. The showcase is ready all the same, preview and icon included, with the
  full-resolution source kept in `Art/`.

## Done on 2026-09-11

- **Left the monorepo.** Its own repository, one remote, the already published history taken up as
  it stood. The rule keeping the decompilation of hekmo's assembly out of any public repository
  followed into the `.gitignore` here, and the full-resolution preview source moved in under
  `Art/`, outside `Mod/`.
- **The tools under `_tools/` repaired.** Nine scripts opened `./Defs` directly and had been
  crashing since the mod started publishing from `Mod/`. The worst was `checkdefs.js`, the check
  that catches a defName colliding with one of hekmo's 930: it was not passing, it was not running.
  Three scripts that work on French translation files are left broken on purpose, their subject
  having followed the companion mod.
- **`TESTS.md`**, twelve in-game scenarios and two offline checks, with the figures of the day.
- **Three Odyssey guards** added to reptile meats that were absorbed by name without one. They sit
  on the list entries rather than on the definitions, so the categories stay declared and their
  keywords go on attaching a crocodile from some other mod.

## Done on 2026-09-12

- **`scripts/Check-ConfigErrors.ps1` run against the mod, and green**: 903 defs read, 26 rules
  applied, no config error. 903 is our 896 dishes plus the seven categories, so the whole
  inheritance chain resolved across the boundary between the two mods.
- **`-AlsoScan` is not optional here.** Without it the tool reads 7 defs instead of 903 and sets
  the other 896 aside, `FlavorDef_Base` living in the mod this one extends. It now says so plainly,
  a header reading `7 of 903`, an INCOMPLETE notice above the verdict, and exit code 2. That was
  not the case at first: a partial run exited 0 under a "no config error". Reported by this session,
  fixed by the session that writes the tool, re-verified here both ways.

  ```powershell
  & '..\..\scripts\Check-ConfigErrors.ps1' -ModPath '.\Mod' `
      -AlsoScan 'C:\...\workshop\content\294100\3245374432\1.6'
  ```

- **The green was seen to fail before being believed.** Two mutations on a throwaway copy, never on
  the real files: a leading space in one description, a bracket in one label. Each woke its own rule
  and no other, and the script exited 1.
- **This sheet rewritten in English** on the current schema, and put under git. It was French and
  ignored until today, written before those two points were settled.

## Reference figures

They serve as a baseline: a tool whose output moves away from them is a question, not necessarily a
fault.

| | |
|---|---|
| dishes defined here | 896 |
| defs loaded with hekmo's | 1826 |
| `node _tools/checkdefs.js` | 0 errors, 14 intended warnings |
| `Check-ConfigErrors.ps1` | 903 of 903, no config error |

The fourteen warnings are dishes sharing an ingredient triplet. That is not a conflict: the engine
draws at random among the definitions that match, weighted by how narrow each one is, so sharing
makes variety.

**`_tools/actifs.js` reports 222 playable of 1826 on the 112-mod profile, 35 of them ours.** A dish
has to pass two conditions: every ingredient slot must accept something installed, and the dish must
be able to sit on a kind of meal that exists. 729 pass the first here and 222 pass both, because no
cooking mod is active on this profile. There are the base game's meals, Biotech's baby food and
nutrient paste, and nothing else, so soup, dessert, noodles and every other specialised kind are
empty categories.

Read it as an estimate, not a bound: sister categories are not modelled and an ingredient a mod adds
by patch is invisible to the scan. Both of those cost dishes. Only the figure Flavor Text prints in
the log settles it.

Both halves of that measurement were wrong until 2026-09-12, in opposite directions, and the two
mistakes had been hiding each other.

- The tool matched keywords against the label alone. The engine reads the defName as well, cut at
  underscores, hyphens and camelCase, which is how an ingredient whose label is Chinese or Japanese
  still lands in a category. Read out of the assembly rather than assumed:
  `CategoryUtility.ExtractNames` loads `Def.defName`, puts it through three regex replacements, and
  only then loads `Def.label`. That correction moved the count up, 629 to 729.
- The tool never read `mealKinds`, and never inventoried cooked meals, so it could not tell whether
  a dish had a kind of meal to sit on. Adding the second condition moved the count down, 729 to 222.
  This is the one that matters for writing scenarios: a dish whose ingredients all exist can still
  be impossible to cook.

Biotech's baby food is caught by name rather than by category, and that single line is worth six
dishes. It is filed under raw foods rather than under cooked meals, so a scan that trusts the
category leaves the baby-meal kind empty. Widening the pattern to raw foods instead would be worse:
it pulls three cocoa ingredients into the meal side and kills three of our pork and chocolate
dishes, which is how the French companion's session first reached the right total by the wrong
route. Named exceptions, not a wider net.

The same mistake is written into the four patch files, which is the defect listed above. Each opens
by saying that Flavor Text cannot see an ingredient whose label is not Latin, and that name
attachment is therefore the only way in. Half of that is wrong, and it splits case by case.
`VVTomato` scores on its defName alone, three points against the keyword "tomato", so its entry
changes nothing. `RawQingKe` cuts into raw, qing and ke, none of which is barley, so its entry is
what makes highland barley work at all. Nothing here is broken either way: a thing named in
`thingDefsToAbsorb` is attached whatever it scores. Only the reasoning in the comments is wrong,
and it will mislead whoever extends those files next.

## What is left

One thing, and it needs a running colony: playing `TESTS.md`. The cheapest scenario is T5, a meal
cooked from eggs alone, which must come out as `medium-boiled egg`.

Vocabulary for `licence`: `open` explicit licence, `silent` no licence and a dead source, `alive` no
licence but a living source, `forbidden` a written refusal, `original` nothing taken from anyone.
