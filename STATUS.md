---
mod:          Flavor Text Extended
packageId:    nelim.flavortextextended
repo:         Rimworld-Flavor-Text-Extended
remote:       https://github.com/vbardales/Rimworld-Flavor-Text-Extended.git
visibility:   public
detached:     yes
stage:        published
workflow_stage: published
stage_meaning: public Workshop publication established. Latest release v1.2.1 (2026-09-28, the sharper mod icon), uploaded by the CI workflow and verified on the public page; earlier releases v1.0.0, v1.1.0, v1.2.0 the same way
in_game_validation_owner: sessions, through Pickle in the WSL game, on the owner's request 2026-09-21; no manual scenario is left
settings_audit: not_applicable
localization: complete
translation_en: complete
translation_fr: not_applicable
dependencies: verified
automated_tests: passed
xml_tests: passed
licence:      original
licence_at:   LICENSE and Mod/LICENSE (MIT); ATTRIBUTION.md
upstream_mod_remotes:
  - "https://github.com/JohannesKolsky/FlavorText"
maintainer:    current Codex task for this repository
updated:      2026-10-02
tested_on:    "2026-09-26, RimWorld 1.6.4871 rev600 (Linux depot in WSL, Xvfb), English, on the 1.2.0 tree (e283f89). Bare 18/18 (791 active FlavorDefs of 2095), with optionals 6/6 (1236), without Odyssey 3/3 (740). 1.2.1 changes ModIcon.png and the version number only, so the passes were not replayed. Reports in Tests/Pickle/results/2026-09-26-*; history in docs/runs/. Evidence minified 2026-10-02 (TESTING.md, \"Proofs to keep\"); the passes were not replayed."
workshop:     3806100152
remaining:
  - "open: the French text of the 233 shorter forms and the new dishes belongs to the companion mod (Flavor Text Extended - Francais); until it lands they show in English in French. Tracked in BACKLOG.md."
  - "open: the Steam page description is sent by the CI from PUBLICATION.md; the title, tags, preview and gallery are not. The gallery is the owner's."
  - "open: PR to the origin repository (PUBLISHING.md rule of 2026-09-28) has no code to carry; the owner decides whether to propose the optional-slot idea or the egg filing to hekmo. BACKLOG.md, Upstream."
  - "unverified: WSL cleanup (AUDIT.md, 2026-10-02): once the last Pickle ticket of this mod is played, remove from the WSL install the four providers staged for the with-optionals pass (VV New Harvest 3448458106, RimLife Cultivation Plus 3614595617, Processor Framework 3210544395, RimLife Expansion Trading 2951594887), except any a wsl-deps map of another mod still names, under the machine lock and never during another run. Not done: the lock was held by another mod on 2026-10-02."
  - "limits, not blockers: each Pickle pass passed once on the 1.2.0 tree; no cook walks to a stove (no tick passes in 03-cooking); Chinese Traditional Cultural Things Expanded declares no 1.6 and is not certified; no shallot provider is certified."
  - "note: the run scripts look for <rimworld>/<Mod>/. A junction <rimworld>/FlavorTextExtended, made 2026-09-21 and ignored by the root .gitignore, bridges it. Never delete it recursively."
  - "note: desktop.ini and *.ico are local only and gitignored since 2026-10-02 (the two Art .ico files left git, files kept on disk); Mod/desktop.ini must never be committed."
---

# Flavor Text Extended - status

## Current state

- **Published**: Workshop item `3806100152`, v1.2.1. Tag and GitHub release are created by the CI workflow, never by hand. Publish rules: `../../PUBLISHING.md`, `Rimworld-Release-Admin/docs/OPERATIONS.md`.
- **Content**: 901 original dishes plus 233 shorter forms, seven categories, 51 Def and patch XML files, no assembly, no setting, no keyed text.
- **Dependency**: only `hekmo.FlavorText` is required. Optional providers are `MayRequire` guarded (47 provider pairs checked); Odyssey has four guards.
- **Licence**: `original`, MIT. Upstream Flavor Text keeps its own terms. Attribution names Claude, ChatGPT and DALL-E; git history does not split Claude and Codex commits, and ATTRIBUTION.md says so.
- **French**: not shipped here. The separate companion carries it, by the owner's decision.

## Gates

| Gate | Result | Evidence |
|---|---|---|
| Settings (`MOD_SETTINGS.md`) | not applicable: nothing to configure, so no page and no shortcut | source inventory of `Mod/`: no `.dll`, `.cs`, `MainButtonDef`, `ModSettings`, `Keyed` |
| Translations (`TRANSLATIONS.md`) | English native Def text complete; French is the companion's | `_tools/Test-Localization.ps1`, `_tools/verify-en.js` |
| Offline tests | pass | `checkdefs.js` (0 errors, known shared-combination warnings), `Test-Xml.ps1`, `Test-OptionalIngredients.ps1`, `Check-ConfigErrors.ps1` |
| In game (Pickle) | pass on the 1.2.0 tree | `Tests/Pickle/results/2026-09-26-*`, `docs/runs/2026-09-26-frequency.md` |

Rerun the offline tests after any Def change; rerun Pickle after any Def or patch change. A change to `ModIcon.png` or the version number alone needs neither.

## How often a dish of this mod names a meal (game measure)

Flavor Text matches a dish only to a chunk of ingredients with exactly as many items as the dish has slots (meals are cut into chunks of three) and weights the draw by `10000 / (sum of what each slot accepts)`. Share of named meals carrying a dish of this mod, 400 seeded cooks, vanilla ingredients:

| Ingredients | 1.1.0 | 1.2.0 |
|---|---|---|
| 1 | not measured | 21.0 % |
| 2 | 0.0 % | 4.3 % |
| 3 | 0.8 % | 5.8 % |
| 4 | 2.3 % | 23.0 % |

Source: `docs/runs/2026-09-26-frequency.md`. Ideas to raise the three-ingredient row are in `BACKLOG.md`.

## Published releases

| Version | Date | Commit | Dry-run | Publish run |
|---|---|---|---|---|
| 1.2.1 | 2026-09-28 | add8d94 | 36436198373 | 36436950847 |
| 1.2.0 | 2026-09-26 | 509667f | 36270915096 | 36270986472 |
| 1.1.0 | 2026-09-24 | 9bd7fd3 | 36000918644 | 36001072152 |
| 1.0.0 | 2026-09-22 | 5ba5fe7 | by hand, before the CI | by hand |

Run URLs: `https://github.com/vbardales/Rimworld-Flavor-Text-Extended/actions/runs/<id>`. Public page checked after each CI publish (item id, title, `time_updated`, file size, change notes entry).

## Audit of 2026-10-02

Audited against `AUDIT.md` (d1fdbe1), `PUBLISHING.md` (4e8f11a), `TRANSLATIONS.md` (af8427f), tree `3b5f065` plus local changes (this commit), nothing run in game. Stage kept: `published`, `workflow_stage: published`. Session title: `flavortextextended / published`.

- **`done -> tested` criteria, checked on disk:** no `@wip` (`07-f13-fixture` is `@fixture`, not a test); the one conditional scenario file (`06`, `@requires` ScreenshotMode and ScreenshotStudio, `@review`) ran 2026-09-23, its `summary.md` read, its three captures opened and read today (clean info cards, no dev tools, no panel); no manual test exists; scenarios played against features: 18 of 18 on the bare pass (01: 5, 03: 7, 04: 2, 08: 4), `exitReason` read first on each kept report: `passed` on the four 1.2.0-era runs; `failed` on `2026-09-26-frequency-b`, whose two reds are the 1.1.0 baseline (below the 1 percent floor) and were replayed green on 1.2.0 by the bare pass, so no red is left without a green replay.
- **`l10n` against the current TRANSLATIONS.md:** no keyed text, no `Languages/` folder in `Mod/`, English is the Def values; the French neutral-form rule, the player choice and `FRENCH_REVIEW.md` apply to the companion, not here.
- **Evidence:** `Tests/Pickle/results/` left git and is ignored whole; minified to 0.6 MB; list of what stays in `TESTING.md`, "Proofs to keep". `*.dds` was already ignored and none was ever tracked. The two `Art/*.ico` files left git too.
- **Origin repository:** `JohannesKolsky/FlavorText`, in `upstream_mod_remotes`; no PR carried (see `remaining`).
- **Not changed, optional:** the gallery folder `Art/Workshop-captures/` keeps the old two-digit names, a `source/` subfolder and a README, which the 2026-09-29 gallery rule (`0-`, `1-`... , images only) no longer allows. Renaming means editing `galleryDir` in `.github/publish.config.json`, a CI file: left for the owner's word.

## Findings that still matter

- `VV_Leeks` is under `FT_Onion` as well as `FT_Leek`, because hekmo's own onion category lists "leek". README and description say a leek has its own category and still counts as onion.
- Flavor Text files a chicken egg under `FT_Meat_Poultry` as well as `FT_Egg`, so a meal with one is an omnivore meal and vegetarian-only dishes with an egg never name it. Raise it with hekmo only with the owner's word.
- Flavor Text's `GetMatchIndices` needs exactly as many ingredients as slots. This is why shorter forms exist (`_tools/make-variants.js`, `_tools/solo-forms.json`).

## Files

- `CHANGELOG.md`, `README.md`, `ATTRIBUTION.md`, `PUBLICATION.md` (Steam text and release notes), `TESTING.md` (test plan T1-T14 and what has run), `BACKLOG.md`.
- `docs/runs/`: one line per run and per status entry. The full former text of this file is in git (`git show 4eb5a48:STATUS.md`), so no separate history file is kept here.
- `docs/PROTOCOLS-READ.md`: protocol documents read by the session, with versions.
- `Tests/Pickle/`: feature files, step assembly, `results/` (only reports a field of this file or a run note still points to).
