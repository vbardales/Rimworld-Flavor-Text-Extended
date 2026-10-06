# Backlog

Things worth doing that are not blocking the current version. Kept per mod; the monorepo has its own. Newest first.
State is `open` unless written otherwise.

## Ideas that came out of hekmo's report (2026-09-26)

Background: Flavor Text matches a dish only to a chunk of at most three ingredients with exactly as many items as the dish has slots,
and draws among the matches weighted by `10000 / (sum of the things each slot accepts)`. See `STATUS.md` and `TESTING.md`.

- **More three-slot dishes that match a random triple** (the cause for meals of three or more ingredients, which hekmo pointed out; the slot-count rule only explains one and two). Flavor Text's own generic dishes cover almost every triple while ours cover about 2 percent, so a random meal is mostly named by hers. In the 1.2.0 model only about 1 to 2 percent of random three-ingredient meals are
  named by a dish of this mod, because a triple must land on one of the dish's exact category combinations. The 1.1.0 review already
  widened the slots that were never cited; what is left is small. Worth a look only if the game measure of the three-ingredient row
  (`08-frequency`) stays low after 1.2.0. Method: `node scripts/frequency.js <Flavor Text Defs> --chunk=<a,b,c>` lists what a given triple can
  become; look at triples that players cook often and that nothing of ours names.
- **The French companion has its own list.** 233 new entries (`scripts/variants-french.js`, 22 by hand). Tracked in the companion's repository,
  listed here because 1.2.0 cannot ship in French without it.
- **Review how much the one-ingredient forms crowd out Flavor Text's own dishes.** A lone pork meal is named by three of ours about 99 percent of the
  time on the model, because a narrow slot weighs far more than Flavor Text's broad ones. If that reads as monotonous in play, drop entries from
  `scripts/solo-forms.json` (one line each) and regenerate with `node scripts/make-variants.js`.
- **More one-ingredient forms.** 54 were chosen by hand from the 72 dishes whose text cites a single slot. Other dishes could get one with a
  rewritten text; each needs a plain word for the ingredient it drops, and a French rewrite.
- **Tell players about Flavor Text's own option**, "allowed missing ingredients" (0 by default, up to 6): a small meal then gets random extra ingredients,
  which lets larger dishes match. The model says it helps our three-slot dishes little. Only worth a line on the Steam page if a measure in game shows
  otherwise.
- **Suggest to hekmo** an optional-slot mechanism in Flavor Text (a slot that may be absent) instead of shorter forms. Nothing goes to another mod's page
  without the owner's word, and it is her decision whether to raise it.

- **DONE 2026-09-28: filed as [JohannesKolsky/FlavorText#1](https://github.com/JohannesKolsky/FlavorText/issues/1), with the owner's word.** Chicken eggs count as poultry meat in Flavor Text. Its keyword filing puts `EggChickenUnfertilized` under `FT_Meat_Poultry` as well as `FT_Egg`
  (the defName holds "chicken"), so a meal with one is an omnivore meal and the dishes that only allow a vegetarian diet (our meat-free dishes with an
  egg) never name it. Found with `scripts/frequency.js`; only worth raising with hekmo with the owner's word.

- **An optional part in a dish: exact names more likely, inexact ones possible (owner's idea, 2026-09-26).** A dish would keep its indispensable
  ingredients required and take the others as optional: the exact combination (every slot filled) names the meal most of the time, and a partial one (an
  optional slot empty) can also come out, less often. The engine has no such thing: `GetMatchIndices` needs exactly as many ingredients as slots, and the draw is
  weighted only by `Specificity` among dishes of that size. What this mod does instead: a shorter form is the dish without its optional ingredient
  (`scripts/make-variants.js`, `scripts/solo-forms.json`), which fires on meals that have no such ingredient; forms and original never compete. What it does not do:
  let the full and the partial name compete on one meal. Two ways to get it, both bigger than this mod: (1) a change in Flavor Text itself, an optional-slot
  field on `IngredientSlot` and a lower weight for a partial match, which is hekmo's to accept and goes to her only with the owner's word; (2) a Harmony patch of
  `GetBestFlavorDef` in an assembly of our own, which would make this XML-only mod an assembly one. Measure first how much of the gap the forms already close
  (in game on 1.2.0: 21, 4.3, 5.8 and 23 percent for one to four ingredients).

## Upstream (PUBLISHING.md rule of 2026-09-28: a PR to the origin repository is systematic once one exists)

- **Pull request to hekmo's repository (`JohannesKolsky/FlavorText`): no code to propose today, owner to confirm.** This mod is not a port of her code: it is an XML-only extension whose 901 dishes belong here, and her repository has no Defs XML to patch. What is hers to fix went out as issue #1 (chicken egg filed under poultry). Two candidates would be PRs if the owner wants them, both outward-facing and so only with her word: an optional-slot field on `IngredientSlot` (see "An optional part in a dish" above), and a patch for the egg filing. Until she decides, this line stays open.

## Records and model

- **Record the reply to hekmo in the Workshop comments register** (`WORKSHOP_COMMENTS.md`, protocols repository), on the Flavor Text row, once the session
  that has that file modified has committed it.
- **Model limits** (`scripts/frequency.js`): cooking stations, hours of day, which recipe a ghost ingredient comes from, sister categories and this mod's own keyword
  patches are not modeled. Add them if a game measure and the model disagree by more than an order of magnitude.

## Housekeeping

- `scripts/checkdefs.js` now reports one warning per pair of dishes that share the same slots (35 on 1.2.0, two before the shorter forms). They are variety, not
  conflict; if the count becomes noise, teach the check to skip pairs of forms that come from the same original.
