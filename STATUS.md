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
social_preview_sha256: 67310d182212d48d48eb8d7545917797c693507d18479f524fc688fdbe84f8bc
licence:      original
licence_at:   LICENSE and Mod/LICENSE (MIT); ATTRIBUTION.md
upstream_mod_remotes:
  - "https://github.com/JohannesKolsky/FlavorText"
maintainer:    current Codex task for this repository
updated:      2026-10-17
english_review: "2026-10-17, owner (Virginie), five reworded descriptions (ArtichautsVinaigrette, SaladeOrgeFeta, Dal, ChouxBruxellesMarrons, RizJollof), revision a1c5b06e797ab1eacd2f6261ef890c064dfdd870, validated in chat. Earlier: 2026-10-11, owner (Virginie), the 53 corrected descriptions plus BalutFrit (runny), PUBLICATION.md, BACKLOG.md and CHANGELOG.md, revision 83f7019, validated in chat; no exhaustive reread of the 2,337 catalogue lines"
tested_on:    "2026-10-08, RimWorld 1.6 (Linux depot in WSL, Xvfb), English, on the 1.2.2 tree (232b980). Without optionals 14/14 (ticket df05), with optionals 6/6 (b45a), without Odyssey 3/3 (7050), all exitReason passed. Gallery scenes (10) are separate and not part of this proof."
tested_1_7:   yes  # 2026-10-13, RimWorld 1.7 (Waylith engine, ~/rimworld17), English only, without optionals (01-alone, 03-cooking, 04-filing), the net48 PickleSteps DLL loaded as is: 14/14 passed, exitReason passed, ticket 20261013-121854-183-56b3 on 94d1b99, evidence Tests/Pickle/Evidence/p17-diag-english-94d1b99 (kept minified, RELEASE.md). Not played on 1.7: with-optionals, without-odyssey, French (the 1.7 install ships English only). No Version Warning was not in the staged list, so the proof is the log and the report, not the screen.
workshop:     3806100152
publication_changelog_review_sha: 7f265e28f384edd36d247537fcdd01cc9102865e  # 2026-10-13, owner review of PUBLICATION.md + CHANGELOG.md for the 1.3 line (RimWorld 1.7 support)
code_review_sha: e4b8606f7aa439285f379d4580b8788011000f75  # 2026-10-13, review of f206a19 to e4b8606f7aa439285f379d4580b8788011000f75: 0 findings; Mod/ diff is About.xml only (modVersion 1.3.0, supportedVersions 1.6 and 1.7, matches the green 1.7 diagnostic) and the Preview images. Earlier: f206a19 (2026-10-13), 83f7019 (2026-10-11), bb13483 (2026-10-06).
remaining:
  - "open: gallery pass 4 (refit scenes 1 to 3 of the shotlist at 4/5, see Shotlist). Ec48 passed 4/4 (2026-10-18, tree 2747b08): read by the session: 1 refused (four identical katsudon plates, says nothing), 2 kept as candidate (2-candidate-two-dishes-empadao-gnocchi.jpg, card Empadao and Gnocchi, Nelim at the chair), 3 refused as redundant (same plates), 4 refused (Nelim tiny, potato sack hides her, bare garden). Pass 4 plays 1 to 4 of 10-gallery-scenes.feature with four different recipes cooked once each on the table, per-scene outfit, held items, animals and decor; scene 4 also plays in pass 4 (owner order 2026-10-18, without waiting for NPT ticket e457): straw hat over Long loose hair, Show Hair Under Stuff (RaccoonCuddler.ShowHair 3255379190) added to the map; if no hair shows under the hat, replay without the hat. Meals are cooked with the Food Texture Variety recipes FTV_CookMealSimple and FTV_CookMealFine (2026-10-18, owner remark): ingredient pairs chosen for their own FTV texture (beef+potatoes, egg+rice, corn+pork, berries+milk); never played, and Flavor Text may not name FTV_MealSimple, then the card steps fail and the vanilla recipes come back. Decor reworked 2026-10-18 to kitchen props of VFE Props and Decor (all 1x1 per NPT, FoodBox 2x2 swapped for WineRack; GALLERY-PROPS.md "Kitchen and meals"; a placement that fails falls back to the old chest, barrel and hay bale); the FTV Core mod (3354455179) is not in the Windows Workshop folder: read on the capture whether the staging fetched it; Check-Steps.ps1 could not run (Pickle assemblies path): the step texts reuse the played ones plus carries 1 of the item, never played. REPLAY 2 FILED 2026-10-20: ticket 20261020-004150-259-7618 (scenes 2 and 4, scene 4 frame moved to (195, 85) zoom 6; tree frozen until RUN_DONE; evidence Tests/Pickle/Inbox/2026-10-20-gallery-pass-4-replay-2; check the resolution is 1920x1080). REPLAY 3869 READ 2026-10-20: 2/2 passed, both captures refused (scene 2: 1280x720 while the others are 1920x1080, Nelim tiny, not eating; scene 4: Nelim hidden under the info card, no hat visible); scene 2 keeps 2-candidate-two-dishes-empadao-gnocchi.jpg meanwhile (borderline: four identical plates); recompose scenes 2 and 4 (resolution, card off Nelim, hat in view) before any new ticket. Ticket cdb2 (tree 139f578) ran 2026-10-18: scenes 1 and 3 passed and were kept as candidates (1-candidate-table-laid.jpg, 3-candidate-blanquette-shogun-hen.jpg, plates differ, kitchen props, dog and hen); scene 2 failed (hairstyle Bun does not exist, now FancyBun), scene 4 failed (no meal named FlavorTextFR_Gnocchi, now FlavorTextFR_GnocchiSolo); replay of scenes 2 and 4 filed as ticket 20261019-153604-220-3869 on tree 7f6ddfd (-List showed tests=35 instead of 2: if the report holds more than 2 scenarios the filter did not apply, refile; at RUN_DONE also triage Inbox with Prune-Evidence.ps1, release Parked 2026-10-18-gallery-pass-4 when scenes 2 and 4 are green, STALE Evidence folders 122-with-optionals and 122-without-odyssey were read and kept, About.xml diff read) (frozen until RUN_DONE, evidence Tests/Pickle/Inbox/2026-10-19-gallery-pass-4-replay); the run is parked in Tests/Pickle/Parked/2026-10-18-gallery-pass-4 (RELEASE.md) until scenes 2 and 4 pass again, scene 2 eating pose and scene 4 hat still unread; earlier tickets ( earlier tickets 8b51, 6dd5, 8fbc, 3ceb cancelled unstarted). On RUN_DONE: read summary.json (total 4), open every capture, check the plates differ (FTV Core 3354455179 not in the Windows Workshop folder), scene 2 eating pose (normal+Ingest, standing at the chair facing South; NPT wrote North by mistake, not yet told), scene 4 hair under the hat (remove the hat if none shows), kitchen props placed; keep serious ones as N-candidate-name.jpg; add seen in a capture to GALLERY-PROPS.md (protocols root, commit by path) for FTV and VFE Props and Decor. The seat step asked of NPT is moot (NPT answered: existing steps). Release steps 9a, 9b due at prepareRelease."
  - "open: a later publish with update_tags needs STEAM_REFRESH_TOKEN in steam-production of this repository; CI/CD sets it only on the explicit order of the owner. Without it such a publish stops before the upload."
  - "open: the Steam page gallery (Art/Gallery/: 0-preview, 1-two-dishes-nelim-seated, 2-katsudon) was uploaded by hand by the owner on 2026-10-13; reported by her, not checked on the public page. The CI sends the description, preview and tags, never the gallery."
  - "open: the French text of the 233 shorter forms and the new dishes belongs to the companion mod (Flavor Text Extended - Francais); until it lands they show in English in French. Tracked in BACKLOG.md."
  - "open: PR to the origin repository (PUBLISHING.md rule of 2026-09-28) has no code to carry; the owner decides whether to propose the optional-slot idea or the egg filing to hekmo. BACKLOG.md, Upstream."
  - "limits, not blockers: each Pickle pass passed once per tree (1.2.2 for 1.6, 94d1b99 for 1.7); no cook walks to a stove (no tick passes in 03-cooking); Chinese Traditional Cultural Things Expanded declares no 1.6 and is not certified; no shallot provider is certified."
  - "note: the run scripts look for <rimworld>/<Mod>/. A junction <rimworld>/FlavorTextExtended, made 2026-09-21 and ignored by the root .gitignore, bridges it. Never delete it recursively."
  - "note: desktop.ini and *.ico are local only and gitignored since 2026-10-02 (the two Art .ico files left git, files kept on disk); Mod/desktop.ini must never be committed."
protocols_read_sha: b48ecc4cf0af35ec316379c537490a7c025a8c06
---

# Flavor Text Extended - status

## Current state

- **Published**: Workshop item `3806100152`, v1.3.0 (CI, 2026-10-13, RimWorld 1.7 support). Tag and GitHub release are created by the CI workflow, never by hand. Publish rules: `../../PUBLISHING.md`, `Rimworld-Release-Admin/docs/OPERATIONS.md`.
- **Content**: 932 original dishes plus 233 shorter forms, seven categories, 51 Def and patch XML files, no assembly, no setting, no keyed text.
- **Dependency**: only `hekmo.FlavorText` is required. Optional providers are `MayRequire` guarded (47 provider pairs checked); Odyssey has four guards.
- **Licence**: `original`, MIT. Upstream Flavor Text keeps its own terms. Attribution names Claude, ChatGPT and DALL-E; git history does not split Claude and Codex commits, and ATTRIBUTION.md says so.
- **French**: not shipped here. The separate companion carries it, by the owner's decision.
- **Gallery reshoot (2026-10-15, owner's order, stage reopened at `shootGallery[1.3.0]`, no code or `Mod/` change)**: the audit of the same day found that the published gallery (`0-preview`, `1-two-dishes-nelim-seated`, `2-katsudon`) does not tell the "Lunch is served" story of `Tests/Pickle/Mod/Pickle/Features/10-gallery-scenes.feature`, that it has no animal, and that only picture 1 has Nelim, against `GALLERY.md` (2026-10-14: Nelim protagonist, animals facing the camera). The feature was rewritten (plan in its header): Mei as guest, Shogun and a hen facing the camera, Nelim's own face, potatoes in her arms in the garden, scenario 2 unchanged because its picture was accepted. Pass `-DepMap wsl-deps.gallery-scenes-ftv.map`. Candidates go to `Art/Gallery/N-candidate-<subject>.jpg`; the stage returns to `dormant` once the owner has accepted or refused them and the gallery on the Steam page is uploaded. Ticket 20261016-181036-154-43cc (ab818e2, 2026-10-16) plays it as filed. Pass 1 (ticket 43cc) passed 4/4, captures judged weak (bare nook, Mei faceless). Pass 2 (b873630, ticket c2bb) failed 3/4 (expression name moodCheerful1 does not exist, fence at (187, 87)); pass 3 fixes both, ticket 20261017-160852-032-e72b (tree frozen until RUN_DONE): add VFE Props and Decor (2102143149) for the dining-nook and Vegetable Garden Project (2007061826) for the plant-garden to `wsl-deps.gallery-scenes-ftv.map` (with VFE Core 2023507013 and Harmony 2009463077), place decor on the free cells of `SANCTUAIRE-CASES.md`, and give Mei a living expression (`"Mei" facial expression is "normal+moodCheerful1"` after "Nelim has her own face" in scenarios 1 and 3, name copied from Nelim's `normal+moodCheerful2`, never played). The ticket owner is session local_4cb9d548-e06f-435f-8be6-274d66fc2e2c, registered with TM; the session code is FTE (was FT, changed by the owner 2026-10-17). Planned gallery, final after acceptance: `0-preview`, `1-table-laid`, `2-two-dishes-nelim-seated`, `3-blanquette-shogun-hen`, `4-plant-garden` (the only scene without a window, so the only subtitle, in PUBLICATION.md "Gallery subtitles"). The echo stays `echo-concept.png`; its review is due at `mountPreview`.

## Shotlist (AUDIT 9.0, criteria a to j of GALLERY.md "Shotlist : critères d'une scène à 4/5", owner rule 2026-10-18)

Story "Lunch is served": one clear midday in the Sanctuary, told by Nelim (protagonist, her own face) with her guest Mei, Shogun the labrador and a hen. Start 12:00, +5 min of game time per image (60 ticks of set-up, then +0, +208, +417, +625; 2,500 ticks per game hour); weather Clear (set in Background). Every Scenario reloads the save, poses the living things after the wait, and ends with `the decor is removed`. Mods of `wsl-deps.gallery-scenes-ftv.map`: Sanctuary base, Food Texture Variety, VFE Props and Decor 2102143149, Vegetable Garden Project 2007061826 (VFE Core 2023507013, Harmony 2009463077). Rewritten 2026-10-18 after the Audit read (GALLERY-SHOTLIST-AUDIT.md: same outfit in all, 1 and 3 redundant, 2 without prop/plant/animal, 4 without animal). The feature header is synced to this table at RUN_DONE of ec48 (tree frozen until then); nothing is filed before that.
**Story (criterion k).** Who: Nelim, the colony's cook and gardener, with her guest Mei, Shogun her labrador and a hen that follows them. Where: the Sanctuary, the dining-nook for the meal (1 to 3), the plant-garden for the walk after it (4). Which day: one clear midday, 12:00 to 12:15, ordinary and warm. Rhythm: +5 min of game time per image (60 set-up ticks, then +0, +208, +417, +625). Episodes, each one moves on from the last: (1) Nelim lays the table and Mei arrives, four dishes with four names; (2) they sit and she serves the dish that carries two names at once, Shogun settling at her feet; (3) the plain pot becomes a named blanquette, Mei gone, Nelim hands the dog a scrap while the hen watches; (4) after lunch Nelim walks to the garden with the potatoes that decide the next menu, the hen still behind her. Arc: the table, the double dish, the pot named, the garden that feeds it. Synced into the feature header at RUN_DONE of ec48 (tree frozen); already written there in outline (header "THE STORY").


| # | Place, hour, passing time | Subject, one sentence | Nelim: outfit (colours), hair, face, action | Others, decor (named, removed after) | Composition | Risk -> plan | Score |
|---|---|---|---|---|---|---|---|
| 1 | dining-nook, 12:00, +0 (60 ticks set-up) | The table is laid: one table carries four different dish names. Subtitle "Lunch is served: one table, four dishes, four names." | `Apparel_CollarShirt` rust (176, 84, 52), `Apparel_Pants` charcoal (58, 60, 68), Ponytails dark brown (70, 46, 32), own face (smirk smile, blink), action: carries 1 `MealFine` (puts the last plate down) | Mei: bob black, `Apparel_BasicShirt` mustard (214, 160, 46), dark trousers, green eyes, `normal+moodCheerful`. Shogun at (177, 108) facing South. Decor (service of the meal): `VFEPD_FoodTrolley` (173, 109), `VFEPD_WineRack` (173, 107). No card. | wide, zoom 5, frame (178, 108), four meals on the 2x2 table readable, the two women at the north chairs, dog front right, barrel and chest as foreground left, midday light | Four meals look the same sprite: Food Texture Variety bowls + four different recipes (pass 1 showed a bare nook): decor added, Mei gets her living expression. A row of faces reads as a lineup: Nelim carries, Mei sits, Shogun is off-axis | 4 |
| 2 | dining-nook, 12:05, +208 ticks | The most distinctive behaviour of the mod: one meal named after two dishes at once. Subtitle "One meal, two dishes at once." (the owner accepted the earlier picture 2026-10-12; this one replaces it only if she prefers it) | `Apparel_BasicShirt` sage (122, 150, 104), `Apparel_Pants` cream (222, 210, 184), Bun dark brown, `normal+Ingest` (eating face, NPT 2026-10-18), action: at her chair cell holding a `MealSimple` (`carries the item`), facing South: RimWorld has no seated pose, standing on the chair cell with the meal is the vanilla eating look | Shogun lies near her feet at (177, 111) facing South (front). Decor: see the feature. Card of the meal with two dishes, right of screen. | close, zoom 6.5, frame (181, 108), Nelim off-centre left, card right, daylily as foreground, dog soft in the background | The Bun and the held bowl are unplayed; seated pose is not a step: standing at the chair with the bowl, ask NPT for a `sits at` step only if the standing pose reads wrong. Plan: if the capture is worse than the accepted 1-two-dishes picture, keep the accepted picture (it stays in `Art/Gallery/`) | 4 |
| 3 | dining-nook, 12:10, +417 ticks | An everyday pot of beef, pork and milk gets a real name, the blanquette; the hen is the life of the place. Subtitle "Even the everyday pot has a name: blanquette." | `Apparel_BasicShirt` white (240, 240, 236) under `Apparel_Jacket` denim (60, 92, 140), `Apparel_Pants` dark (70, 70, 78), Ponytails dark brown, own face, action: crouches/leans with 1 `Meat_Cow` held out to Shogun (`carries 1 of the item Meat_Cow`) | Mei out. Shogun at (177, 108) and hen "Poule" at (174, 108), both facing South. Decor: `VFEPD_HayBaleSmall` (172, 110), `Plant_YellowTallGrass` (173, 111) fully grown. Card of `FlavorTextExtended_TwoMeatBlanquette`, right. | mid-close, zoom 5.5, frame (178, 108), Nelim left, dog and hen right, hay bale foreground, card right | Two animals facing the camera: wait first, `stands at ... facing South` last, the animal step of AlphaMythology 09. The hen may leave the frame: posed after the wait with no tick after. Held meat may not render: fallback is a held `MealSimple` (action stays: she hands food to the dog) | 4 |
| 4 | plant-garden, 12:15, +625 ticks | After lunch, the garden decides the menu: potatoes in her arms, and the card of a potato dish beside her. Subtitle "What grows here decides what lunch can be." | `Apparel_CowboyHat` straw (214, 190, 120), `Apparel_BasicShirt` sky (96, 150, 190), `Apparel_Pants` brown (110, 82, 58), hairstyle `Long` (Core, loose and long, never a ponytail or bun) shown under the hat, `normal+moodCheerful2`, action: carries 6 `RawPotatoes` (harvest) | Hen "Poule" at (191, 86) facing South, pecking. Decor (VGP): `PlantAppletree` (183, 84), `PlantCherrytree` (185, 82) fully grown; fence of the garden. Card of a potato dish (`FlavorTextFR_Gnocchi`, cooked from RawPotatoes alone), right of screen. | medium, zoom 5, frame (190, 85), Nelim off-centre right, trees behind, fence foreground, hen at her feet | Gnocchi slot 0 may not be the potato: read the def (FlavorDefs_Italy.xml, solo-forms.json keep 0) before filing, fallback another one-ingredient potato def read from the same register. Hat: the hair-under-hat mod (owner rule 2026-10-18, GALLERY.md criterion d) goes in `-DepMap`; mod: `RaccoonCuddler.ShowHair`, 3255379190 (named by NIF, already in its `wsl-deps.gallery.map`); line added to `wsl-deps.gallery-scenes-ftv.map` 2026-10-18 and scene 4 played in ticket 8b51 without waiting for e457 (owner order); removed if no hair shows under the hat. Only scene 4 has a hat; scenes 1 and 3 have none and keep Ponytails (no hat), scene 2 Bun (no hat). Fence cell (187, 87) blocked in pass 2: stay on `the free cell nearest to (190, 85)`. | 4 |

Criteria check (all four rows): a place/hour/weather/time written; b named decor, different per scene, removed after; c animal in every scene, dog and hen from the front in 1, 2, 3; d outfit, colours, hair, expression different per scene; e action is carry or hand a held item; f composition written; g one subject, one subtitle sentence; h risk and plan written (here and, at RUN_DONE, in the header); i no row or half circle of aligned subjects; j each scene shows a dish name or the menu link. Series arc: the table laid, the double dish, the pot named, the garden that feeds it. Scores are the session's own: Audit re-reads them. Lowest 4; `2-katsudon` (old interface capture) and `0-preview` are outside the list. Replay: 1 to 4 once, after ec48 RUN_DONE, with the header synced.

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
- `Tests/Pickle/`: feature files, step assembly, `Evidence/` and `Parked/` (proofs and parked failures, each with a `RELEASE.md`; gitignored).


