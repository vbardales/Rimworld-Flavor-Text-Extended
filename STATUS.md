---
mod:          Flavor Text Extended
packageId:    nelim.flavortextextended
repo:         Rimworld-Flavor-Text-Extended
remote:       https://github.com/vbardales/Rimworld-Flavor-Text-Extended.git
visibility:   public
detached:     yes
workflow_stage: shootGallery[1.3.0]
in_game_validation_owner: sessions, through Pickle in the WSL game, on the owner's request 2026-09-21; no manual scenario is left
settings_audit: not_applicable
localization: complete
translation_en: complete
translation_fr: not_applicable
dependencies: verified
automated_tests: passed
xml_tests: passed
echo_review_sha: 8c4558bbc82b653aa65a33422b6e8b32e040483a
social_preview_sha256: 29c070a2f637b31ab3c84e0f7e4709d07dcc116c6075df95a94e4236136aecc2
licence:      original
licence_at:   LICENSE and Mod/LICENSE (MIT); ATTRIBUTION.md
upstream_mod_remotes:
  - "https://github.com/JohannesKolsky/FlavorText"
maintainer:    current Codex task for this repository
updated:      2026-10-15
english_review: "2026-10-11, owner (Virginie), the 53 corrected descriptions plus BalutFrit (runny), PUBLICATION.md, BACKLOG.md and CHANGELOG.md, revision 83f7019, validated in chat; no exhaustive reread of the 2,337 catalogue lines"
tested_on:    "2026-10-08, RimWorld 1.6 (Linux depot in WSL, Xvfb), English, on the 1.2.2 tree (232b980). Without optionals 14/14 (ticket df05), with optionals 6/6 (b45a), without Odyssey 3/3 (7050), all exitReason passed. Gallery scenes (10) are separate and not part of this proof."
tested_1_7:   yes  # 2026-10-13, RimWorld 1.7 (Waylith engine, ~/rimworld17), English only, without optionals (01-alone, 03-cooking, 04-filing), the net48 PickleSteps DLL loaded as is: 14/14 passed, exitReason passed, ticket 20261013-121854-183-56b3 on 94d1b99, evidence Tests/Pickle/Evidence/p17-diag-english-94d1b99. Not played on 1.7: with-optionals, without-odyssey, French (the 1.7 install ships English only). No Version Warning was not in the staged list, so the proof is the log and the report, not the screen.
workshop:     3806100152
publication_changelog_review_sha: 7f265e28f384edd36d247537fcdd01cc9102865e  # 2026-10-13, owner review of PUBLICATION.md + CHANGELOG.md for the 1.3 line (RimWorld 1.7 support)
code_review_sha: e4b8606f7aa439285f379d4580b8788011000f75  # 2026-10-13, review of f206a19 to e4b8606f7aa439285f379d4580b8788011000f75: 0 findings; Mod/ diff is About.xml only (modVersion 1.3.0, supportedVersions 1.6 and 1.7, matches the green 1.7 diagnostic) and the Preview images. Earlier: f206a19 (2026-10-13), 83f7019 (2026-10-11), bb13483 (2026-10-06).
remaining:
  - "open: a later publish with update_tags needs STEAM_REFRESH_TOKEN in steam-production of this repository; CI/CD sets it only on the explicit order of the owner. Without it such a publish stops before the upload."
  - "open: the Steam page gallery (Art/Gallery/: 0-preview, 1-two-dishes-nelim-seated, 2-katsudon) was uploaded by hand by the owner on 2026-10-13; reported by her, not checked on the public page. The CI sends the description, preview and tags, never the gallery."
  - "open: the French text of the 233 shorter forms and the new dishes belongs to the companion mod (Flavor Text Extended - Francais); until it lands they show in English in French. Tracked in BACKLOG.md."
  - "open: PR to the origin repository (PUBLISHING.md rule of 2026-09-28) has no code to carry; the owner decides whether to propose the optional-slot idea or the egg filing to hekmo. BACKLOG.md, Upstream."
  - "limits, not blockers: each Pickle pass passed once per tree (1.2.2 for 1.6, 94d1b99 for 1.7); no cook walks to a stove (no tick passes in 03-cooking); Chinese Traditional Cultural Things Expanded declares no 1.6 and is not certified; no shallot provider is certified."
  - "note: the run scripts look for <rimworld>/<Mod>/. A junction <rimworld>/FlavorTextExtended, made 2026-09-21 and ignored by the root .gitignore, bridges it. Never delete it recursively."
  - "note: desktop.ini and *.ico are local only and gitignored since 2026-10-02 (the two Art .ico files left git, files kept on disk); Mod/desktop.ini must never be committed."
protocols_read_sha: 005d9b2720a85d62a3a31b02c265f3133621ee72
---

# Flavor Text Extended - status

## Current state

- **Published**: Workshop item `3806100152`, v1.3.0 (CI, 2026-10-13, RimWorld 1.7 support). Tag and GitHub release are created by the CI workflow, never by hand. Publish rules: `../../PUBLISHING.md`, `Rimworld-Release-Admin/docs/OPERATIONS.md`.
- **Content**: 932 original dishes plus 233 shorter forms, seven categories, 51 Def and patch XML files, no assembly, no setting, no keyed text.
- **Dependency**: only `hekmo.FlavorText` is required. Optional providers are `MayRequire` guarded (47 provider pairs checked); Odyssey has four guards.
- **Licence**: `original`, MIT. Upstream Flavor Text keeps its own terms. Attribution names Claude, ChatGPT and DALL-E; git history does not split Claude and Codex commits, and ATTRIBUTION.md says so.
- **French**: not shipped here. The separate companion carries it, by the owner's decision.
- **Gallery reshoot (2026-10-15, owner's order, stage reopened at `shootGallery[1.3.0]`, no code or `Mod/` change)**: the audit of the same day found that the published gallery (`0-preview`, `1-two-dishes-nelim-seated`, `2-katsudon`) does not tell the "Lunch is served" story of `Tests/Pickle/Mod/Pickle/Features/10-gallery-scenes.feature`, that it has no animal, and that only picture 1 has Nelim, against `GALLERY.md` (2026-10-14: Nelim protagonist, animals facing the camera). The feature was rewritten (plan in its header): Mei as guest, Shogun and a hen facing the camera, Nelim's own face, potatoes in her arms in the garden, scenario 2 unchanged because its picture was accepted. Pass `-DepMap wsl-deps.gallery-scenes-ftv.map`. Candidates go to `Art/Gallery/N-candidate-<subject>.jpg`; the stage returns to `dormant` once the owner has accepted or refused them and the gallery on the Steam page is uploaded. Ticket 20261016-181036-154-43cc (ab818e2, 2026-10-16) plays it as filed. Next pass, decided 2026-10-16 and not yet written (tree frozen): add VFE Props and Decor (2102143149) for the dining-nook and Vegetable Garden Project (2007061826) for the plant-garden to `wsl-deps.gallery-scenes-ftv.map` (with VFE Core 2023507013 and Harmony 2009463077), place decor on the free cells of `SANCTUAIRE-CASES.md`, and give Mei a living expression. Planned gallery, final after acceptance: `0-preview`, `1-table-laid`, `2-two-dishes-nelim-seated`, `3-blanquette-shogun-hen`, `4-plant-garden` (the only scene without a window, so the only subtitle, in PUBLICATION.md "Gallery subtitles"). The echo stays `echo-concept.png`; its review is due at `mountPreview`.

## Gates

| Gate | Result | Evidence |
|---|---|---|
| Settings (`MOD_SETTINGS.md`) | not applicable: nothing to configure, so no page and no shortcut | source inventory of `Mod/`: no `.dll`, `.cs`, `MainButtonDef`, `ModSettings`, `Keyed` |
| Translations (`TRANSLATIONS.md`) | English native Def text complete; French is the companion's | `scripts/Test-Localization.ps1`, `scripts/verify-en.js` |
| Offline tests | pass | `checkdefs.js` (0 errors, known shared-combination warnings), `Test-Xml.ps1`, `Test-OptionalIngredients.ps1`, `Check-ConfigErrors.ps1` |
| In game (Pickle) | pass: 1.6 on the 1.2.2 tree (14/14, 6/6, 3/3), 1.7 diagnostic on 94d1b99 (14/14); 1.3.0 differs by About.xml and Preview.png only | `docs/runs/2026-09-26-frequency.md`, `docs/runs/2026-10-13-1-7-diagnostic.md` |

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
| 1.3.0 | 2026-10-13 | fab60e0 | 38473986619 | 38475213615 (a first publish run, 38474588769, failed on SteamCMD Service Unavailable, nothing sent) |
| 1.2.2 | 2026-10-13 | 28d96fe | 38379671178 | 38379951997 |
| 1.2.1 | 2026-09-28 | add8d94 | 36436198373 | 36436950847 |
| 1.2.0 | 2026-09-26 | 509667f | 36270915096 | 36270986472 |
| 1.1.0 | 2026-09-24 | 9bd7fd3 | 36000918644 | 36001072152 |
| 1.0.0 | 2026-09-22 | 5ba5fe7 | by hand, before the CI | by hand |

Run URLs: `https://github.com/vbardales/Rimworld-Flavor-Text-Extended/actions/runs/<id>`. Public page checked after each CI publish (item id, title, `time_updated`, file size, preview image sha256, change notes entry). 1.3.0 (RimWorld 1.7 support): file size 1506518, `time_updated` 2026-10-13T22:07:29Z, preview sha256 `29c070a2...` equals `Mod/About/Preview.png`, tag `v1.3.0` on fab60e0; its first publish run (38474588769) failed on SteamCMD Service Unavailable with nothing sent.

## Findings that still matter

- `VV_Leeks` is under `FT_Onion` as well as `FT_Leek`, because hekmo's own onion category lists "leek". README and description say a leek has its own category and still counts as onion.
- Flavor Text files a chicken egg under `FT_Meat_Poultry` as well as `FT_Egg`, so a meal with one is an omnivore meal and vegetarian-only dishes with an egg never name it. Raise it with hekmo only with the owner's word.
- Flavor Text's `GetMatchIndices` needs exactly as many ingredients as slots. This is why shorter forms exist (`scripts/make-variants.js`, `scripts/solo-forms.json`).

## Files

- `CHANGELOG.md`, `README.md`, `ATTRIBUTION.md`, `PUBLICATION.md` (Steam text and release notes), `TESTING.md` (test plan T1-T14 and what has run), `BACKLOG.md`.
- `docs/runs/`: one line per run and per status entry; `2026-10-14-status-history.md` holds the former dated sections of this file (publication and dry-run proofs of 1.2.2 and 1.3.0, audit of 2026-10-11, Preview source migration). The full former text of this file is in git (`git show 4eb5a48:STATUS.md`), so no separate history file is kept here.
- `docs/PROTOCOLS-READ.md`: protocol documents read by the session, with versions.
- `Tests/Pickle/`: feature files, step assembly, `results/` (only reports a field of this file or a run note still points to).


