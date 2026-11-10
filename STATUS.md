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
updated:      2026-10-30
english_review: "2026-10-17, owner (Virginie), five reworded descriptions (ArtichautsVinaigrette, SaladeOrgeFeta, Dal, ChouxBruxellesMarrons, RizJollof), revision a1c5b06e797ab1eacd2f6261ef890c064dfdd870, validated in chat. Earlier: 2026-10-11, owner (Virginie), the 53 corrected descriptions plus BalutFrit (runny), PUBLICATION.md, BACKLOG.md and CHANGELOG.md, revision 83f7019, validated in chat; no exhaustive reread of the 2,337 catalogue lines"
tested_on:    "2026-10-08, RimWorld 1.6 (Linux depot in WSL, Xvfb), English, on the 1.2.2 tree (232b980). Without optionals 14/14 (ticket df05), with optionals 6/6 (b45a), without Odyssey 3/3 (7050), all exitReason passed. Gallery scenes (10) are separate and not part of this proof."
tested_1_7:   yes  # 2026-10-13, RimWorld 1.7 (Waylith engine, ~/rimworld17), English only, without optionals (01-alone, 03-cooking, 04-filing), the net48 PickleSteps DLL loaded as is: 14/14 passed, exitReason passed, ticket 20261013-121854-183-56b3 on 94d1b99, evidence Tests/Pickle/Evidence/p17-diag-english-94d1b99 (kept minified, RELEASE.md). Not played on 1.7: with-optionals, without-odyssey, French (the 1.7 install ships English only). No Version Warning was not in the staged list, so the proof is the log and the report, not the screen.
workshop:     3806100152
publication_changelog_review_sha: 7f265e28f384edd36d247537fcdd01cc9102865e  # 2026-10-13, owner review of PUBLICATION.md + CHANGELOG.md for the 1.3 line (RimWorld 1.7 support)
code_review_sha: e4b8606f7aa439285f379d4580b8788011000f75  # 2026-10-13, review of f206a19 to e4b8606f7aa439285f379d4580b8788011000f75: 0 findings; Mod/ diff is About.xml only (modVersion 1.3.0, supportedVersions 1.6 and 1.7, matches the green 1.7 diagnostic) and the Preview images. Earlier: f206a19 (2026-10-13), 83f7019 (2026-10-11), bb13483 (2026-10-06).
remaining:
  - "open: PASS 7 FILED 2026-11-10: ticket 20261110-113145-211-2751 on 6dda38e (scenes 1, 2, 4, -NoBatch, -SkipDefCheck, tree frozen until RUN_DONE, evidence Tests/Pickle/Inbox/2026-11-10-gallery-pass-7; check summary total is 3; scene 2 Guest was not visible in pass 6, read its Guest log lines). Before it: PASS 6 READ 2026-11-10 (ticket 38e8 RUN_DONE exit 1): total 3, 2 passed, 1 failed. Scene 4 failed: cell (187, 85) already holds VFEPD_WoodenWagon; VFEPD_WoodenLogs moved to (190, 88) in the feature (header line 10 and step), unplayed. Guest drew in scene 1 (no Exception drawing Guest; the 18 NullReferenceException in Player.log are JobDriver_Ingest on a Yorkshire terrier, ambient fauna). Captures of scenes 1 and 2 (in Inbox 2026-11-10-gallery-pass-6) first look: scene 1 Guest small and half hidden behind Nelim at the top left, scene 2 Guest not visible (Shogun at the other chair), Nelim seated and not biting: score-gallery verdict and refile still to do; ask Virginie before filing. NPT steps changed 2026-11-10: sync-nsb-npt (NPT part) due. PASS 6 FILED 2026-11-10: ticket 20261110-001938-784-38e8 on f2e5b39 (scenes 1, 2, 4, -NoBatch, -SkipDefCheck, tree frozen until RUN_DONE, evidence Tests/Pickle/Inbox/2026-11-10-gallery-pass-6; check summary total is 3, Guest drawn in 1 and 2, read [face-parts] and [face-state] lines of Player.log and send them to PiT, scene 4 logs at (187, 85)). Before it: PASS 5 (ticket 543b) READ 2026-11-10: total 4, 2 passed, 2 failed. Scene 1 failed: Log.Error Exception drawing Guest (NullReferenceException in FacialAnimationControllerComp.UpdateAnimation; Guest never draws, so scene 2 passed with an empty chair, REDO, old 2-candidate deleted). Scene 4 failed: cell (190, 83) already holds FenceGate (decor VFEPD_WoodenLogs line 180 of the feature, pick a free cell). Scene 3 passed, capture opened, 268 px check ok, kept as Art/Gallery/3-candidate-blanquette-shogun-hen.jpg (replaces the older one). NPT asked 2026-11-10 (PiT session) which steps make an anonymous Guest safe for FacialAnimation; waiting for the answer. Then: fix scene 4 cell, fix Guest steps, refile scenes 1, 2, 4 (-NoBatch, -SkipDefCheck), old 1-candidate-table-laid.jpg stays until scene 1 is replayed. Inbox folder Tests/Pickle/Inbox/2026-11-09-gallery-pass-5 kept until refile (Player.log is the NPT evidence). Earlier: REPLAY 4 (ticket d5d0) READ 2026-11-09: 2/2 passed, both captures REFUSED and deleted with the Inbox folders of replays 3 and 4. Scene 2: Nelim stands at the chair facing East, not eating, guest Miel absent, bare rug, only chairs and plates (decor weak, adequacy weak, understanding weak). Scene 4: hat in view but the potato sack hides her body, no loose Long hair, tiny, only torches and fence as decor (adequacy, understanding, decoration under 4). DONE 2026-11-09: sync-nsb-npt, all four scenes recomposed, plan 5, drift check OK. PASS 5 FILED 2026-11-09: ticket 20261109-003112-827-543b on c01007e (all four scenes, -NoBatch, -SkipDefCheck because the pre-check flags FTV Core 3354455179 as not on disk, as before; every cited def exists; tree frozen until RUN_DONE; evidence Tests/Pickle/Inbox/2026-11-09-gallery-pass-5; check summary total is 4). At RUN_DONE: read summary.json, open the four captures (1920x1080, Guest visible in 1 and 2, Nelim facing South in 2, no sack over Nelim in 4), score-gallery, delete REDO captures, recompose, refile. Was: run sync-nsb-npt, recompose scenes 2 and 4 (guest in frame, richer decor, a fallback pose that reads at once, Nelim bigger), score-gallery, Check-ShotlistVsScenario, refile; scenes 1 and 3 follow; one single review by the owner at the end (rule 2026-11-08). Older detail: gallery pass 4 (refit scenes 1 to 3 of the shotlist at 4/5, see Shotlist). Ec48 passed 4/4 (2026-10-18, tree 2747b08): read by the session: 1 refused (four identical katsudon plates, says nothing), 2 kept as candidate (2-candidate-two-dishes-empadao-gnocchi.jpg, card Empadao and Gnocchi, Nelim at the chair), 3 refused as redundant (same plates), 4 refused (Nelim tiny, potato sack hides her, bare garden). Pass 4 plays 1 to 4 of 10-gallery-scenes.feature with four different recipes cooked once each on the table, per-scene outfit, held items, animals and decor; scene 4 also plays in pass 4 (owner order 2026-10-18, without waiting for NPT ticket e457): straw hat over Long loose hair, Show Hair Under Stuff (RaccoonCuddler.ShowHair 3255379190) added to the map; if no hair shows under the hat, replay without the hat. Meals are cooked with the Food Texture Variety recipes FTV_CookMealSimple and FTV_CookMealFine (2026-10-18, owner remark): ingredient pairs chosen for their own FTV texture (beef+potatoes, egg+rice, corn+pork, berries+milk); never played, and Flavor Text may not name FTV_MealSimple, then the card steps fail and the vanilla recipes come back. Decor reworked 2026-10-18 to kitchen props of VFE Props and Decor (all 1x1 per NPT, FoodBox 2x2 swapped for WineRack; GALLERY-PROPS.md "Kitchen and meals"; a placement that fails falls back to the old chest, barrel and hay bale); the FTV Core mod (3354455179) is not in the Windows Workshop folder: read on the capture whether the staging fetched it; Check-Steps.ps1 could not run (Pickle assemblies path): the step texts reuse the played ones plus carries 1 of the item, never played. REPLAY 2 FILED 2026-10-20: ticket 20261020-004150-259-7618 (scenes 2 and 4, scene 4 frame moved to (195, 85) zoom 6; tree frozen until RUN_DONE; evidence Tests/Pickle/Inbox/2026-10-20-gallery-pass-4-replay-2; check the resolution is 1920x1080). REPLAY 3869 READ 2026-10-20: 2/2 passed, both captures refused (scene 2: 1280x720 while the others are 1920x1080, Nelim tiny, not eating; scene 4: Nelim hidden under the info card, no hat visible); scene 2 keeps 2-candidate-two-dishes-empadao-gnocchi.jpg meanwhile (borderline: four identical plates); RECOMPOSED 2026-10-30; TODO: update the scene 4 row of the Shotlist table (zoom 6, carries 1 potato, faces South; feature differs from the table). Rate-gallery plan 2026-10-30: 4.5, 4.5, 5, 4 (scene 3 e weak, scene 4 e and j weak). REPLAY 4 FILED 2026-10-30: ticket 20261030-162606-872-d5d0 on dc99eb5 (scenes 2 and 4, -NoBatch, tree frozen until RUN_DONE, evidence Tests/Pickle/Inbox/2026-10-30-gallery-pass-4-replay-4; check summary total is 2). Earlier note: recompose scenes 2 and 4 (resolution, card off Nelim, hat in view) before any new ticket. RECOMPOSED 2026-10-25: scene 2 frame (179, 109) zoom 4, scene 4 frame (194, 85) zoom 5, hat mod switched to Hat Hair Control 3760821540 (owner's choice 2026-10-20, seed in config/gallery-scenes/); the 1280x720 size is not a ticket option, read it on the capture. Replay 2 folder (ticket 7618, exit 139 boot crash, no report) deleted. REPLAY 3 (bb59) READ 2026-10-30: total 3 (the filter also ran the card scenario), 2 passed, 1 failed: scene 2 "no MealFine lies at (176, 109); there is Table2x2c, RusticRug_Broad, FTV_MealFine" (the forced Ingest step needs the def name FTV_MealFine, fix the feature line, then replay scene 2 alone); scene 4 passed, capture 1920x1080 but REFUSED (potato sack hides Nelim, no loose Long hair visible under the hat, she is small; hen and Gnocchi card ok): RECOMPOSED 2026-10-30 in the feature: zoom 6 at (194, 85), carries 1 RawPotatoes, faces South (hair and face to the camera); scene 1 haul and scene 2 Ingest now name FTV_MealFine; not yet played, next ticket = scenes 2 and 4 (then 1 and 3). Evidence stays in Tests/Pickle/Inbox/2026-10-25-gallery-pass-4-replay-3 until scene 2 and 4 are read again. REPLAY 3 FILED 2026-10-25: ticket 20261025-163115-785-bb59 on a83f3bd (scenes 2 and 4, -NoBatch, tree frozen until RUN_DONE, evidence Tests/Pickle/Inbox/2026-10-25-gallery-pass-4-replay-3; -List showed tests=? : check the report holds 2 scenarios). ON RUN_DONE of bb59: read summary.json (total must be 2, exitReason), then junit.xml; open both captures (1920x1080? Nelim big and left of the card, scene 2 mid-bite with Ingest face and Miel at (175,110), scene 4 hat over loose Long hair, potatoes in her arms, hen in front); scene 2 tick count 90 is a guess, adjust; give a verdict per capture (accept/refuse), keep serious ones as N-candidate-name.jpg in Art/Gallery, delete the Inbox folder, then refile scenes 1 and 3 (forced haul of MealFine for Nelim, Miel mid-walk, scene 3 stands-next-to with Meat_Cow) and update the Replay verdict column of the shotlist. Keep the Player.log if the screen is 1280x720 and send NPT the ticket id. NPT proof ticket 35f9 (forced Ingest) read 2026-10-25: NOT PROVEN (job starts, cat abandons it on Milk 30 ticks later, probably because the species does not eat it); Nelim eating a MealFine stays unplayed, so scene 2 may need its fallback (stands at the chair holding MealSimple). Preview checked up to date 2026-10-25 (7f56a76, sha matches social_preview_sha256). Ticket cdb2 (tree 139f578) ran 2026-10-18: scenes 1 and 3 passed and were kept as candidates (1-candidate-table-laid.jpg, 3-candidate-blanquette-shogun-hen.jpg, plates differ, kitchen props, dog and hen); scene 2 failed (hairstyle Bun does not exist, now FancyBun), scene 4 failed (no meal named FlavorTextFR_Gnocchi, now FlavorTextFR_GnocchiSolo); replay of scenes 2 and 4 filed as ticket 20261019-153604-220-3869 on tree 7f6ddfd (-List showed tests=35 instead of 2: if the report holds more than 2 scenarios the filter did not apply, refile; at RUN_DONE also triage Inbox with Prune-Evidence.ps1, release Parked 2026-10-18-gallery-pass-4 when scenes 2 and 4 are green, STALE Evidence folders 122-with-optionals and 122-without-odyssey were read and kept, About.xml diff read) (frozen until RUN_DONE, evidence Tests/Pickle/Inbox/2026-10-19-gallery-pass-4-replay); the run is parked in Tests/Pickle/Parked/2026-10-18-gallery-pass-4 (RELEASE.md) until scenes 2 and 4 pass again, scene 2 eating pose and scene 4 hat still unread; earlier tickets ( earlier tickets 8b51, 6dd5, 8fbc, 3ceb cancelled unstarted). On RUN_DONE: read summary.json (total 4), open every capture, check the plates differ (FTV Core 3354455179 not in the Windows Workshop folder), scene 2 eating pose (normal+Ingest, standing at the chair facing South; NPT wrote North by mistake, not yet told), scene 4 hair under the hat (remove the hat if none shows), kitchen props placed; keep serious ones as N-candidate-name.jpg; add seen in a capture to GALLERY-PROPS.md (protocols root, commit by path) for FTV and VFE Props and Decor. The seat step asked of NPT is moot (NPT answered: existing steps). Release steps 9a, 9b due at prepareRelease."
  - "open: a later publish with update_tags needs STEAM_REFRESH_TOKEN in steam-production of this repository; CI/CD sets it only on the explicit order of the owner. Without it such a publish stops before the upload."
  - "open: the Steam page gallery (Art/Gallery/: 0-preview, 1-two-dishes-nelim-seated, 2-katsudon) was uploaded by hand by the owner on 2026-10-13; reported by her, not checked on the public page. The CI sends the description, preview and tags, never the gallery."
  - "open: the French text of the 233 shorter forms and the new dishes belongs to the companion mod (Flavor Text Extended - Francais); until it lands they show in English in French. Tracked in BACKLOG.md."
  - "open: PR to the origin repository (PUBLISHING.md rule of 2026-09-28) has no code to carry; the owner decides whether to propose the optional-slot idea or the egg filing to hekmo. BACKLOG.md, Upstream."
  - "limits, not blockers: each Pickle pass passed once per tree (1.2.2 for 1.6, 94d1b99 for 1.7); no cook walks to a stove (no tick passes in 03-cooking); Chinese Traditional Cultural Things Expanded declares no 1.6 and is not certified; no shallot provider is certified."
  - "note: the run scripts look for <rimworld>/<Mod>/. A junction <rimworld>/FlavorTextExtended, made 2026-09-21 and ignored by the root .gitignore, bridges it. Never delete it recursively."
  - "note: desktop.ini and *.ico are local only and gitignored since 2026-10-02 (the two Art .ico files left git, files kept on disk); Mod/desktop.ini must never be committed."
protocols_read_sha: 43a03343c97b7fd0c609f84861e026b9c3891652
---

# Flavor Text Extended - status

## Current state

- **Published**: Workshop item `3806100152`, v1.3.0 (CI, 2026-10-13, RimWorld 1.7 support). Tag and GitHub release are created by the CI workflow, never by hand. Publish rules: `../../PUBLISHING.md`, `Rimworld-Release-Admin/docs/OPERATIONS.md`.
- **Content**: 932 original dishes plus 233 shorter forms, seven categories, 51 Def and patch XML files, no assembly, no setting, no keyed text.
- **Dependency**: only `hekmo.FlavorText` is required. Optional providers are `MayRequire` guarded (47 provider pairs checked); Odyssey has four guards.
- **Licence**: `original`, MIT. Upstream Flavor Text keeps its own terms. Attribution names Claude, ChatGPT and DALL-E; git history does not split Claude and Codex commits, and ATTRIBUTION.md says so.
- **French**: not shipped here. The separate companion carries it, by the owner's decision.
- **Gallery reshoot (2026-10-15, owner's order, stage reopened at `shootGallery[1.3.0]`, no code or `Mod/` change)**: the audit of the same day found that the published gallery (`0-preview`, `1-two-dishes-nelim-seated`, `2-katsudon`) does not tell the "Lunch is served" story of `Tests/Pickle/Mod/Pickle/Features/10-gallery-scenes.feature`, that it has no animal, and that only picture 1 has Nelim, against `GALLERY.md` (2026-10-14: Nelim protagonist, animals facing the camera). The feature was rewritten (plan in its header): Mei as guest, Shogun and a hen facing the camera, Nelim's own face, potatoes in her arms in the garden, scenario 2 unchanged because its picture was accepted. Pass `-DepMap wsl-deps.gallery-scenes-ftv.map`. Candidates go to `Art/Gallery/N-candidate-<subject>.jpg`; the stage returns to `dormant` once the owner has accepted or refused them and the gallery on the Steam page is uploaded. Ticket 20261016-181036-154-43cc (ab818e2, 2026-10-16) plays it as filed. Pass 1 (ticket 43cc) passed 4/4, captures judged weak (bare nook, Mei faceless). Pass 2 (b873630, ticket c2bb) failed 3/4 (expression name moodCheerful1 does not exist, fence at (187, 87)); pass 3 fixes both, ticket 20261017-160852-032-e72b (tree frozen until RUN_DONE): add VFE Props and Decor (2102143149) for the dining-nook and Vegetable Garden Project (2007061826) for the plant-garden to `wsl-deps.gallery-scenes-ftv.map` (with VFE Core 2023507013 and Harmony 2009463077), place decor on the free cells of `SANCTUAIRE-CASES.md`, and give Mei a living expression (`"Mei" facial expression is "normal+moodCheerful1"` after "Nelim has her own face" in scenarios 1 and 3, name copied from Nelim's `normal+moodCheerful2`, never played). The ticket owner is session local_4cb9d548-e06f-435f-8be6-274d66fc2e2c, registered with TM; the session code is FTE (was FT, changed by the owner 2026-10-17). Planned gallery, final after acceptance: `0-preview`, `1-table-laid`, `2-two-dishes-nelim-seated`, `3-blanquette-shogun-hen`, `4-plant-garden` (the only scene without a window, so the only subtitle, in PUBLICATION.md "Gallery subtitles"). The echo stays `echo-concept.png`; its review is due at `mountPreview`.

- **Preview (2026-11-09)**: rendered again with the new Preview.config.json (no echo size), title, suffix, description and echo checked, no clipping, no overlap; `Art/Gallery/0-preview.png` follows.

## Shotlist (AUDIT 9.0, rewritten 2026-11-09 after replay 4, Opus director pass and score-gallery; the lines with every field are in the header of `Tests/Pickle/Mod/Pickle/Features/10-gallery-scenes.feature`, checked by `Check-ShotlistVsScenario.ps1`: OK)

Story "Lunch is served": one clear midday in the Sanctuary, 12:00 to 12:15, +5 min per image (60 ticks of set-up, then +0, +208, +417, +625). Nelim (protagonist, canon Roo_HD_Hair_Highpony, sky shirt, charcoal pants, smile, one outfit all day, NO hat: Hat Hair Control never showed the hair under it), anonymous guest "Guest" (scenes 1, 2; Miel looks not marked OK in LOOKS-VALIDATION, trap 1), Shogun, the hen Poule (anonymous save fauna). Screen is 1920x1080 (read on the last captures), the card covers x > 950, cell = 540 / zoom px, thumbnail 0.14 x that. The gallery save is the old undecorated Sanctuary: every prop comes from the scenario. Opus remarks: kept = Nelim facing South in 2 so the bite reads, Miel's log line, hat dropped, Nelim facing East in 4, series of zooms; not kept = its "screen is 1280 wide" premise (captures are 1920x1080, Miel was at the empty chair, not off screen), cutting scene 3.

| # | Place, hour, passing time | Subject and instant | Gesture (how obtained) | Decor and animals | Frame | Plan score |
|---|---|---|---|---|---|---|
| 1 | dining-nook, noon, Clear, +0 | table laid, four dish names; Nelim brings the last plate as Guest steps in | forced haul of FTV_MealFine to (176, 110), 20 ticks, mid-walk | trolley, wine rack, fridge, egg box, lit lamp; Shogun trotting behind | wide, zoom 3.5, (178, 108) | 5 |
| 2 | dining-nook, noon, Clear, +208 | one meal, two dishes; first bite, Guest waits | Nelim at (176, 110) facing South, forced Ingest 90 ticks (fallback: holds the plate); Guest (175, 110) facing East, logged | egg box, cutting board, trolley, wine rack, lamp; Shogun front view (175, 111) | close, zoom 3, (177, 110) | 5 |
| 3 | dining-nook, noon, Clear, +417 | the everyday pot is named; Nelim slips Shogun a scrap, hen creeps in | carries 1 Meat_Cow facing East | pan, hay bale, fridge, lamp, egg box; Shogun facing West, hen | medium, zoom 3.5, (178, 110) | 5 |
| 4 | plant-garden, noon, Clear, +625 | the garden decides the menu; Nelim carries a potato back, Shogun at her heels | on the free cell nearest (189, 85) facing East with 1 RawPotatoes | two fruit trees, wagon, hay, crates, logs; hen in front, Shogun | medium-wide, zoom 3.5, (191, 85) | 5 |

Criteria a to g, j all `ok` on the plan (b: five or six named props grouped around the subject on the old rug floor and garden ground, light in frame; e: instant and way of obtaining written; g: the card text says the sentence, the pose and objects carry the rest; j: 21.6 px per cell at zoom 3.5, 25 at zoom 3). Series k ok: wide, close, medium, medium-wide; opening sets the nook, closing is the garden; one day. Mean plan score 5. NOT verified: forced Ingest on a human (the proof run 35f9 failed on a cat), a carried item under a forced haul, why Miel did not show last time (her log line will say), the hen holding position. Scene 3 g is the weakest (the guest's absence reads from the header only).
Replay verdict column: after the run, read each capture (image, adequacy, understanding, decoration under 4 = REDO, deleted).

## NSB

Rules said back (owner 2026-11-05, 2026-11-07): NSB places, colonists, domestic animals are free; outside NSB needs express validation (the mod's own animals excepted); a colonist property changes only with validation; every outfit is free; every animal the mod includes is shown.
Sync 2026-11-09. NSB changed since the last sync: dining-nook and plant-garden were decorated and validated 2026-11-07 (lots 5a, 5b), but the save this gallery loads (Nelims-tribe, Mod/Pickle/Fixtures) is still the old undecorated Sanctuary until NSB copies a decorated fixture, so every prop comes from the scenario, Miel's canon moved (eyes Orange, skin GES_Skin_Chocolate, head Female_AverageWide), batches 5k to 5m touch other places only. NPT since 2026-10-25: new steps (holds in hand, put-out, light dimmed, StageDecor made-of and plant clear), none needed here yet. Updated: Miel's looks and Nelim's hairstyle in the gallery feature and the shotlist text. Miel is replaced by an anonymous Guest (her looks are not marked OK in LOOKS-VALIDATION.md, trap 1). Left alone: decor lines (the scenes add their own props; check against the validated NSB decor before recomposing 2 and 4).
Places read: 2026-11-09   Tribe read: 2026-11-09   Steps read: 2026-11-09

| Place | Shots | Changes for the gallery | Last read |
|---|---|---|---|
| dining-nook (176, 108) | 1, 2, 3 | props per scene (trolley, wine rack, egg box, cutting board, pan, hay bale); NSB validated decor (not in the gallery save yet): orchid, low cabinet, scroll, candles | 2026-11-09 |
| plant-garden (190, 85) | 4 | apple and cherry trees; NSB validated decor (not in the gallery save yet): paved path, bench, LP_PlayFence | 2026-11-09 |

| Colonist | Shots | Outfit per shot | Last read | Exceptions |
|---|---|---|---|---|
| Nelim | 1 to 4 | sky BasicShirt, charcoal Pants all day; straw CowboyHat in 4 (as shotlist) | 2026-11-09 | none: hairstyle back to canon Roo_HD_Hair_Highpony (1 to 3) and Roo_Royal_LongHD under the hat (4); vanilla Long dropped (it was a property change without validation) |
| Guest (anonymous colonist, replaces Miel 2026-11-09) | 1, 2 | shirt plum, pants sage | - | none: anonymous, no NSB properties touched; Miel is not used because her looks are not marked OK in LOOKS-VALIDATION.md |

| Animal | Shots | Outfit | Last read | Exceptions |
|---|---|---|---|---|
| Shogun (labrador, in the save) | 1 to 3 | default collar | 2026-11-09 (catalogue) | none |
| Hen "Poule" (anonymous Poulet of the save fauna, 8 in the save) | 3, 4 | none | 2026-11-09 | none: anonymous fauna is decor |

| Animal the mod includes | Shot |
|---|---|
| none (the mod adds dishes only, no race, no pawn kind) | not applicable |

## Gates

| Gate | Result | Evidence |
|---|---|---|
| Settings (`MOD_SETTINGS.md`) | not applicable: nothing to configure, so no page and no shortcut | source inventory of `Mod/`: no `.dll`, `.cs`, `MainButtonDef`, `ModSettings`, `Keyed` |
| Translations (`TRANSLATIONS.md`) | English native Def text complete; French is the companion's | not run: French is the companion's, English is native Def text; former checks in git history (`389feb2`) |
| Offline tests | pass | shared scripts, 2026-10-25: `Check-ModBasics.ps1` PASS (53 XML, 1172 defs), `Check-DefRefs.ps1` no unresolved reference, `Check-ConfigErrors.ps1` no config error (commands in `TESTING.md`) |
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
- Flavor Text's `GetMatchIndices` needs exactly as many ingredients as slots. This is why shorter forms exist (`make-variants.js`, `solo-forms.json`, in git history, `git checkout 389feb2 -- scripts`).

## Files

- Dev scripts (`scripts/`: checkdefs.js, Test-Xml.ps1, Test-Localization.ps1, verify-en.js, make-variants.js, solo-forms.json...) left the working tree on 2026-10-25 (owner moved the folders). Not deleted from history: `git checkout 389feb2 -- scripts` restores them. Offline tests now use the shared scripts of the protocols repository (`TESTING.md`).
- `CHANGELOG.md`, `README.md`, `ATTRIBUTION.md`, `PUBLICATION.md` (Steam text and release notes), `TESTING.md` (test plan T1-T14 and what has run), `BACKLOG.md`.
- `docs/runs/`: one line per run and per status entry; `2026-10-14-status-history.md` holds the former dated sections of this file (publication and dry-run proofs of 1.2.2 and 1.3.0, audit of 2026-10-11, Preview source migration). The full former text of this file is in git (`git show 4eb5a48:STATUS.md`), so no separate history file is kept here.
- `docs/PROTOCOLS-READ.md`: protocol documents read by the session, with versions.
- `Tests/Pickle/`: feature files, step assembly, `Evidence/` and `Parked/` (proofs and parked failures, each with a `RELEASE.md`; gitignored).


