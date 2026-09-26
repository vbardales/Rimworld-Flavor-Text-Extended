# Backlog

Things worth doing that are not blocking the current version. Kept per mod; the monorepo has its own. Newest first.
State is `open` unless written otherwise.

## Ideas that came out of hekmo's report (2026-09-26)

Background: Flavor Text matches a dish only to a chunk of at most three ingredients with exactly as many items as the dish has slots,
and draws among the matches weighted by `10000 / (sum of the things each slot accepts)`. See `STATUS.md` and `TESTING.md`.

- **More three-slot dishes that match a random triple** (the cause for meals of three or more ingredients, which hekmo pointed out; the slot-count rule only explains one and two). Flavor Text's own generic dishes cover almost every triple while ours cover about 2 percent, so a random meal is mostly named by hers. In the 1.2.0 model only about 1 to 2 percent of random three-ingredient meals are
  named by a dish of this mod, because a triple must land on one of the dish's exact category combinations. The 1.1.0 review already
  widened the slots that were never cited; what is left is small. Worth a look only if the game measure of the three-ingredient row
  (`08-frequency`) stays low after 1.2.0. Method: `node _tools/frequency.js <Flavor Text Defs> --chunk=<a,b,c>` lists what a given triple can
  become; look at triples that players cook often and that nothing of ours names.
- **The French companion has its own list.** 233 new entries (`_tools/variants-french.js`, 22 by hand). Tracked in the companion's repository,
  listed here because 1.2.0 cannot ship in French without it.
- **Review how much the one-ingredient forms crowd out Flavor Text's own dishes.** A lone pork meal is named by three of ours about 99 percent of the
  time on the model, because a narrow slot weighs far more than Flavor Text's broad ones. If that reads as monotonous in play, drop entries from
  `_tools/solo-forms.json` (one line each) and regenerate with `node _tools/make-variants.js`.
- **More one-ingredient forms.** 54 were chosen by hand from the 72 dishes whose text cites a single slot. Other dishes could get one with a
  rewritten text; each needs a plain word for the ingredient it drops, and a French rewrite.
- **Tell players about Flavor Text's own option**, "allowed missing ingredients" (0 by default, up to 6): a small meal then gets random extra ingredients,
  which lets larger dishes match. The model says it helps our three-slot dishes little. Only worth a line on the Steam page if a measure in game shows
  otherwise.
- **Suggest to hekmo** an optional-slot mechanism in Flavor Text (a slot that may be absent) instead of shorter forms. Nothing goes to another mod's page
  without the owner's word, and it is her decision whether to raise it.

## Description, CI and records

- **Send the Steam description by the CI.** The Markdown source is in `PUBLICATION.md` (`## Steam description`, 1.2.0 text included). Missing: regenerate
  `.github` with `--description-markdown PUBLICATION.md --description-heading '^## Steam description$' --about-from-description`, run
  `node .github/scripts/sync-about-description.mjs --write`, and check the dry-run diff against the public page. Blocked on the CI/CD session pushing
  its template (2026-09-26); its message will say when. `About.xml`'s description changes only in wording, so the Pickle requests already queued do not
  need refiling.
- **Record the reply to hekmo in the Workshop comments register** (`WORKSHOP_COMMENTS.md`, protocols repository), on the Flavor Text row, once the session
  that has that file modified has committed it.
- **The description says "about forty of them can fire" on a vanilla-only save.** That figure predates the 1.1.0 review and the shorter forms. Recount with
  `_tools/active.js` on a vanilla list and correct the page (by hand or through the new description source).
- **Model limits** (`_tools/frequency.js`): cooking stations, hours of day, which recipe a ghost ingredient comes from, sister categories and this mod's own keyword
  patches are not modeled. Add them if a game measure and the model disagree by more than an order of magnitude.

## Housekeeping

- Once 1.2.0 is published, update `Tests/Pickle/README.md`'s status line and `TESTING.md`, "What has run", to the three passes of 1.2.0, and prune the reports of
  the passes they replace (`AGENTS.md`, "Test evidence").
- `_tools/checkdefs.js` now reports one warning per pair of dishes that share the same slots (35 on 1.2.0, two before the shorter forms). They are variety, not
  conflict; if the count becomes noise, teach the check to skip pairs of forms that come from the same original.
