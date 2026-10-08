# Next gallery (2026-10-07: the scenarios moved to Features/10-gallery-scenes.feature, pass map wsl-deps.gallery-scenes.map; this README keeps the plan and what is still open)

The story is "Lunch is served" (header of `10-gallery-scenes.feature`): four pictures at 12:00, 12:05, 12:10 and 12:15, on `dining-nook` and `plant-garden`.

Written 2026-10-06 for the next update (plan: `BACKLOG.md`, "Next gallery"). They sit **outside** `Tests/Pickle/Mod/Pickle/Features/` on purpose:
Pickle discovers every feature there, and steps marked NEW below do not exist yet, so a run would fail on undefined steps and
`06-workshop-captures.feature` would stop being the only gallery pass. Move a file into `Features/` once its steps exist and have been played.

Steps written 2026-10-06 in `Tests/Pickle/Source/FlavorTextExtendedSteps.cs` (the assembly compiles; the step patterns have NOT been checked with `Check-Steps.ps1`, which needs an installed Pickle mod, and no step has met a game):

- `Flavor Text Extended: the meals are put on the table from (x, z) to (x, z)`: one meal per free cell of the rectangle, never merged.
- `Flavor Text Extended: the info card is placed at the "left", "right" or "centre" of the screen`.

Still open:

- ASK PICKLE TOOLS: seat a pawn at a table and make it eat in a locked scene (no step known); a stack of items in an inventory list view.
- Table cells: the dining table of `hearth-hall` and `dining-nook` is described in `PickleTools/docs/SANCTUAIRE-LIEUX.md` without coordinates. Read them on an empty capture first.

Rules: images only in `Art/Gallery/`, `0-preview.png` from the renderer, the author of the series is the photographer (this session), who chooses places, time rhythm, composition, clothes and living things; only shared tools (named places, steps) are asked of Pickle Tools (`PUBLISHING.md`), evidence stays on disk.

## From run to candidate (process)

1. File the run with `Submit-PickleRun.ps1` (`-DepMap wsl-deps.gallery-scenes.map`, its own `-EvidenceDir`); wait for RUN_DONE, tree frozen.
2. Read `exitReason` in `summary.json` first, then open every capture: green is not validated.
3. Put the pictures worth showing straight in `Art/Gallery/`, with the next free index and the word `candidate`: `N-candidate-<subject>.jpg` (JPEG quality 90, about 300 to 450 KB; the raw PNG captures are 1.7 to 4.5 MB, above Steam's 2 MB limit). Each image under 2 MB, all together under 8 MB. The raw captures stay in the ignored `Tests/Pickle/Evidence/` folder. No folder of candidates, no README in `Art/Gallery/`.
4. The owner decides: an accepted image loses the word `candidate`; a refused one is deleted.

Candidates of run d5a1 (tree 388ba52, eighth pass, evidence `2026-10-08-lunch-8`, indexes 4 and 5; the katsudon-at-the-table and the plant-garden pictures were refused and deleted): not validated. Known defects: neutral face (no expression step yet), eyes too small to judge.
