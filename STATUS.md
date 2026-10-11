---
mod:          Flavor Text Extended
packageId:    nelim.flavortextextended
repo:         Rimworld-Flavor-Text-Extended
remote:       https://github.com/vbardales/Rimworld-Flavor-Text-Extended.git
visibility:   public
detached:     yes
workflow_stage: playTests[1.2.2]
in_game_validation_owner: sessions, through Pickle in the WSL game, on the owner's request 2026-09-21; no manual scenario is left
settings_audit: not_applicable
localization: complete
translation_en: unchecked
translation_fr: not_applicable
dependencies: verified
automated_tests: passed
xml_tests: passed
licence:      original
licence_at:   LICENSE and Mod/LICENSE (MIT); ATTRIBUTION.md
upstream_mod_remotes:
  - "https://github.com/JohannesKolsky/FlavorText"
maintainer:    current Codex task for this repository
updated:      2026-10-11
tested_on:    "2026-10-08, RimWorld 1.6 (Linux depot in WSL, Xvfb), English, on the 1.2.2 tree (232b980). Without optionals 14/14 (ticket df05), with optionals 6/6 (b45a), without Odyssey 3/3 (7050), all exitReason passed. Gallery scenes (10) are separate and not part of this proof."
workshop:     3806100152
code_review_sha: bb1348317f10f10601bab8c22341eb7c30075e01  # was `code_review`: 2026-10-06, /code-review low, <sha>, range f43b33f..bb13483 (0.1.0 commit to now): 0 findings. Read only scripts/make-variants.js; frequency.js, thingdefs.js, variants-french.js, .github/ scripts, Defs XML and Tests not read.
remaining:
  - "unverified: code review (AUDIT.md 8.m, end of playTests): code_review_sha bb13483 is stale, Mod/ changed since (1.2.2 text edits, 232b980). Review bb13483..HEAD, fix or record the findings, then write the sha of HEAD."
  - "unverified: the owner's review of the English texts changed in 1.2.2 (53 dish descriptions), in the English column of FRENCH_REVIEW.md, regenerated 2026-10-11 at 232b980 (the committed file named 516e58d, stale). translation_en stays unchecked until then (TRANSLATIONS.md, text-only edit after validation). The Pickle replay of the scenarios that display these texts is done (tested_on)."
  - "open: gallery candidates 4 and 5 in Art/Gallery/ wait for the owner's accept or refuse (session verdict 2026-10-11 in the audit section). 1.2.2 in preparation (owner, 2026-10-08): English corrections from the owner's audit of Mod/Defs, retested on 232b980, next shootGallery, mountPreview, writeDocs, prepareRelease. The 1.2.2 dispatch must carry --preview: Mod/About/Preview.png changed after 1.2.1 (badged with the ModIcon, 3b5f065) and the CI sends the header image only on request (owner, 2026-10-08). 1.2.1 stays the published release until the CI publishes 1.2.2."
  - "open: the French text of the 233 shorter forms and the new dishes belongs to the companion mod (Flavor Text Extended - Francais); until it lands they show in English in French. Tracked in BACKLOG.md."
  - "open: the Steam page description is sent by the CI from PUBLICATION.md; the title, tags, preview and gallery are not. The gallery is the owner's: replaced on 2026-10-06 by the for-height set in Art/Gallery/ (images 0 to 3), uploaded by the owner and reported by her."
  - "open: PR to the origin repository (PUBLISHING.md rule of 2026-09-28) has no code to carry; the owner decides whether to propose the optional-slot idea or the egg filing to hekmo. BACKLOG.md, Upstream."
  - "unverified: WSL cleanup (AUDIT.md, 2026-10-02): once the last Pickle ticket of this mod is played, remove from the WSL install the four providers staged for the with-optionals pass (VV New Harvest 3448458106, RimLife Cultivation Plus 3614595617, Processor Framework 3210544395, RimLife Expansion Trading 2951594887), except any a wsl-deps map of another mod still names, under the machine lock and never during another run. Not done: the lock was held by another mod on 2026-10-02."
  - "limits, not blockers: each Pickle pass passed once on the 1.2.0 tree; no cook walks to a stove (no tick passes in 03-cooking); Chinese Traditional Cultural Things Expanded declares no 1.6 and is not certified; no shallot provider is certified."
  - "note: the run scripts look for <rimworld>/<Mod>/. A junction <rimworld>/FlavorTextExtended, made 2026-09-21 and ignored by the root .gitignore, bridges it. Never delete it recursively."
  - "note: desktop.ini and *.ico are local only and gitignored since 2026-10-02 (the two Art .ico files left git, files kept on disk); Mod/desktop.ini must never be committed."
protocols_read_sha: 1073aee086cec109ca6a4106e268dd39437d8225
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
| Translations (`TRANSLATIONS.md`) | English native Def text complete; French is the companion's | `scripts/Test-Localization.ps1`, `scripts/verify-en.js` |
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

## Audit of 2026-10-11

Audited against the protocols at ae25bbd (AUDIT.md, AGENTS.md, PICKLE.md, PUBLISHING.md, TRANSLATIONS.md, MOD_SETTINGS.md, SEARCHING.md, WELCOME.md, SUBMIT.md), tree 23b360f plus local changes (this commit and the CI session's `.github/` edits, untouched). Nothing run in game. Old `tested` (stage retired) maps to `shootGallery`; retained `workflow_stage: playTests[1.2.2]`. Session title: `flavortextextended / playTests[1.2.2]`.

- **Why not shootGallery:** AUDIT.md 8.m (code review once, at the end of playTests) is open: `code_review_sha` is bb13483 and Mod/ changed since (1.2.2, 232b980). Everything else in playTests holds: Mod/ is unchanged since the proofs (232b980; `git diff 232b980 HEAD -- Mod` is empty and the only Tests change is the gallery feature), Pickle 14/14, 6/6 and 3/3 with `exitReason` passed (tested_on), no `@wip`, no manual test.
- **Offline, rerun today on 232b980:** `checkdefs.js` against the Flavor Text 1.6 Defs: 0 errors, 35 known warnings (shared combinations); `Test-Xml.ps1`: 53 XML files parsed, 29 patch operations applied, 4 Odyssey guards; `Test-OptionalIngredients.ps1`: 47 guarded pairs resolve; `verify-en.js`: 1165 dishes, 0 errors. `Test-Localization.ps1` needs the companion mod and was not run (French is the companion's).
- **Defect found and fixed:** `FRENCH_REVIEW.md` named revision 516e58d while `Mod/Defs` last changed in 232b980. Regenerated with `Make-FrenchReview.ps1` (now 232b980, 1165 dishes).
- **translation_en reset to unchecked:** 53 English descriptions changed in 1.2.2. The owner reads them in `FRENCH_REVIEW.md` before the deploy (TRANSLATIONS.md, text-only edit after validation). The stage does not go back for that.
- **Gallery candidates, session verdict (both opened today):** 4 (momo and gnocchi card, pawn seated) and 5 (Two-Meat Blanquette card, hen in the scene): keep both. Each shows a different dish card from 2 and 3, readable at 1920x1080, no dev tool, no Pickle panel. The owner accepts or refuses. Optional: the 5 card text reads "Nothing in it is browned: That is the point" (capital after a colon); a text fix would reopen the English review.
- **Not checked, later states:** `echo_review_sha` and `social_preview_sha256` are absent (mountPreview 10.a and 10.f; Preview.png changed after 1.2.1), `publication_changelog_review_sha` is absent (writeDocs 11.j). None blocks playTests.
- **Whole chain replayed on 2026-10-11 (states 1 to 8), on disk:**
  - *setupRepo, makeSources (1, 2):* remote `vbardales/Rimworld-Flavor-Text-Extended`, public, `.gitignore` and `.gitattributes` present, `README.md`, `ATTRIBUTION.md`, `LICENSE`, `CHANGELOG.md` present, `ATTRIBUTION.md` and `LICENSE` identical in `Mod/`, `upstream_mod_remotes` set, `Check-Status.ps1` 0 error. `ModIcon.png` 128 x 128, 24 KB; `Preview.png` 896 x 504, 713 KB and byte-identical to `Art/Gallery/0-preview.png`; sources `ModIcon-source.png` and `Preview-source.png` present, no `PROMPT_*.md`. Defect fixed: `Art/ModIcon-original.png` was outside the minimal Art set (2.f), cited nowhere, removed.
  - *code (3):* no assembly in `Mod/` (no `.dll`, `.cs`), so no build. Defect fixed: the 1.2.2 section of `CHANGELOG.md` was already numbered and dated; it stays `## [Unreleased]` until the dry-run (3.c, 12.e).
  - *declareDependencies (4), checked 2026-10-11 on 23b360f:* one hard dependency `hekmo.FlavorText` (Workshop 3245374432, in `About.xml`); `loadAfter` Harmony, Core, Flavor Text; `supportedVersions` 1.6 only; no `LoadFolders.xml` (flat Defs and Patches); 47 optional provider pairs `MayRequire`-guarded and resolved, 4 Odyssey guards; no `incompatibleWith` declared; no animal, so 4.f not applicable.
  - *auditSettings (5):* `not_applicable`, justified in the gates table: no `.dll`, `.cs`, `MainButtonDef`, `ModSettings` or `Keyed` in `Mod/`, so neither a settings page nor a shortcut exists.
  - *localize (6):* no keyed text, no `Languages/` in `Mod/`, English is the Def values (6.b); `FRENCH_REVIEW.md` regenerated (6.f); French is the companion's (`translation_fr: not_applicable`).
  - *writeTests (7):* automated and XML tests replayed today (above); 9 Pickle feature files, every `@requires` (`06`, `10`: ScreenshotMode, ScreenshotStudio, StageDecor) has a map in `Tests/Pickle/` (`wsl-deps.workshop-captures.map`, `wsl-deps.gallery-scenes*.map`); `07` is `@fixture`, not `@wip`; local scripts are rows of `scripts/LOCAL_SCRIPTS.md`. Observation, not a blocker: there is no `TEST_SCENARIOS.md`; `TESTING.md` (T1-T14 and the pass declaration) plays that role.
  - *playTests (8):* `tested_on` names the 1.2.2 tree and three passes; `Tests/Manual` holds only an optional log reader (no manual scenario, 8.k); evidence is off git. Open: 8.m, and the gallery scenes of `10` are `@review` captures not yet accepted (candidates 4 and 5).
- **Older audit (2026-10-02):** folded into this one: evidence off git, `Art/*.ico` off git, 18 of 18 bare-pass scenarios on the 1.2.0 tree. Its open point (gallery folder name rule) is closed by the 2026-10-09 gallery rule.

## Findings that still matter

- `VV_Leeks` is under `FT_Onion` as well as `FT_Leek`, because hekmo's own onion category lists "leek". README and description say a leek has its own category and still counts as onion.
- Flavor Text files a chicken egg under `FT_Meat_Poultry` as well as `FT_Egg`, so a meal with one is an omnivore meal and vegetarian-only dishes with an egg never name it. Raise it with hekmo only with the owner's word.
- Flavor Text's `GetMatchIndices` needs exactly as many ingredients as slots. This is why shorter forms exist (`scripts/make-variants.js`, `scripts/solo-forms.json`).

## Files

- `CHANGELOG.md`, `README.md`, `ATTRIBUTION.md`, `PUBLICATION.md` (Steam text and release notes), `TESTING.md` (test plan T1-T14 and what has run), `BACKLOG.md`.
- `docs/runs/`: one line per run and per status entry. The full former text of this file is in git (`git show 4eb5a48:STATUS.md`), so no separate history file is kept here.
- `docs/PROTOCOLS-READ.md`: protocol documents read by the session, with versions.
- `Tests/Pickle/`: feature files, step assembly, `results/` (only reports a field of this file or a run note still points to).


## Preview source migration — 2026-10-03

Copy, typography, layout and palette are consolidated in `Art/Preview.config.json`. Canonical inputs are `Art/Preview-source.png`, `Art/echo.png` and `Art/ModIcon-source.png`; temporary renderer diagnostics belong under ignored `Art/.render/`. Existing Preview, gallery and ICO outputs were preserved because they were present and coherent; no render was run. Superseded JSON files and generated QA intermediates were removed. Nothing published.
