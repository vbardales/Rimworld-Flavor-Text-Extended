# Next gallery: scenarios written, not playable yet

Written 2026-10-06 for the next update (plan: `BACKLOG.md`, "Next gallery"). They sit **outside** `Tests/Pickle/Mod/Pickle/Features/` on purpose:
Pickle discovers every feature there, and steps marked NEW below do not exist yet, so a run would fail on undefined steps and
`06-workshop-captures.feature` would stop being the only gallery pass. Move a file into `Features/` once its steps exist and have been played.

Steps written 2026-10-06 in `Tests/Pickle/Source/FlavorTextExtendedSteps.cs` (the assembly compiles; the step patterns have NOT been checked with `Check-Steps.ps1`, which needs an installed Pickle mod, and no step has met a game):

- `Flavor Text Extended: the meals are put on the table from (x, z) to (x, z)`: one meal per free cell of the rectangle, never merged.
- `Flavor Text Extended: the info card is placed at the "left", "right" or "centre" of the screen`.

Still open:

- ASK PICKLE TOOLS: seat a pawn at a table and make it eat in a locked scene (no step known); a stack of items in an inventory list view.
- Table cells: the dining table of `hearth-hall` and `dining-nook` is described in `PickleTools/docs/SANCTUAIRE-LIEUX.md` without coordinates. Read them on an empty capture first.

Rules: images only in `Art/Gallery/`, `0-preview.png` from the renderer, the owner dresses and poses pawns (`PUBLISHING.md`), evidence stays on disk.
