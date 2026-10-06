# Next gallery: scenarios written, not playable yet

Written 2026-10-06 for the next update (plan: `BACKLOG.md`, "Next gallery"). They sit **outside** `Tests/Pickle/Mod/Pickle/Features/` on purpose:
Pickle discovers every feature there, and steps marked NEW below do not exist yet, so a run would fail on undefined steps and
`06-workshop-captures.feature` would stop being the only gallery pass. Move a file into `Features/` once its steps exist and have been played.

Steps still to write, in this suite's step assembly (`Tests/Pickle/Source/`), unless Pickle Tools already has them:

- NEW `Flavor Text Extended: the meals are put on the table from (x, z) to (x, z)`: spawn the cooked meals one per cell on a rectangle, never merged (like `PlaceMeals`, which uses free cells around the colonist).
- NEW `Flavor Text Extended: the info card is placed at the {string} of the screen`: set the card's `windowRect` to a side instead of the centre.
- NEW `Flavor Text Extended: the info card is closed` is not needed: `I close all dialogs` exists.
- ASK PICKLE TOOLS: seat a pawn at a table and make it eat in a locked scene (no step known); a stack of items in an inventory list view.
- Table cells: the dining table of `hearth-hall` and `dining-nook` is described in `PickleTools/docs/SANCTUAIRE-LIEUX.md` without coordinates. Read them on an empty capture first.

Rules: images only in `Art/Gallery/`, `0-preview.png` from the renderer, the owner dresses and poses pawns (`PUBLISHING.md`), evidence stays on disk.
