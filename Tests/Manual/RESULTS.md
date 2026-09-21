# Manual results

Blank on 2026-09-21. **No scenario below has been run.** Fill a sheet only from what you saw; leave a
field empty rather than guessing, and mark an unavailable prerequisite `unverified`, not `pass`.

Legend: `pass` · `fail` · `unverified` (with the missing prerequisite) · `n/a`.

## Where each of T1 to T14 stands

| T | Scenario | Pickle | Manual sheet |
|---|---|---|---|
| T1 | It loads at all | `01-alone`, passed 2026-09-21 (5/5 of that file) | optional: your real modlist |
| T2 | It loads without Odyssey | not possible | **below** |
| T3 | It loads without any optional mod | `01-alone`, passed | not needed |
| T4 | Without Flavor Text, nothing happens | not possible | **below** |
| T5 | A name appears at all | `03-cooking`, written | not needed |
| T6 | A three-ingredient dish fires | `03-cooking`, written | not needed |
| T7 | Four ingredients become two dishes | `03-cooking` `@wip`, written | optional |
| T8 | Leek and shallot are not onion | `02` (leek only), written | shallot: needs a real provider, `unverified` |
| T9 | The reptile meats are told apart | `04-filing`, written | not needed |
| T10 | Non-Latin labels reach their category | `02`, written, without Shenzhou | Shenzhou: `unverified`, declares no 1.6 |
| T11 | English stays English | English bare pass covers the first half | **below**, second half |
| T12 | Names survive a save and reload | `03-cooking`, written | not needed |
| T13 | French text and interface | not possible | **below** |
| T14 | New game and existing save, both languages | not possible | **below** |

"Written" means a scenario exists and has never run. Only `01-alone` has run.

---

## T2 · It loads without Odyssey

Mod list: `modlists/T2-no-odyssey.txt`. Language: English.

| Field | |
|---|---|
| Date | |
| Game version | |
| DLCs enabled | |
| Extension revision (`git rev-parse --short HEAD`) | |
| Flavor Text version | |
| `Check-PlayerLog.ps1` output pasted or saved at | |
| Red lines naming `Meat_Alligator`, `Meat_MonitorLizard`, `Meat_Bullfrog`, `Meat_SeaTurtle` | |
| Any other red line naming this mod | |
| Flavor Text line (`... found out of N total`), N | |
| Result | |
| Notes | |

## T4 · Without Flavor Text, nothing happens

Mod list: `modlists/T4-no-flavortext.txt`. **Do not start this invalid list**: read the warning in the
mod manager, then enable the dependencies and start the valid list (T1).

| Field | |
|---|---|
| Date | |
| Warning shown, and which mod it names | |
| Warning gone once Flavor Text and Harmony are enabled and ordered | |
| T1 on the valid list: result | |
| Result | |
| Notes | |

## T11 · English stays English (second half: with the French companion)

Mod list: `modlists/T11-english-with-companion.txt`. Language: English, after a full restart.
The first half (this mod alone, English) is the bare Pickle pass with an English game; not repeated here.

| Field | |
|---|---|
| Date | |
| Companion revision (`git rev-parse --short HEAD` in `FlavorTextExtendedFR`) | |
| Dish names cooked, and whether any French fragment appears | |
| Result | |
| Notes | |

## T13 · French generated text and interface

Mod list: `modlists/T13-french.txt`. Language: French, disposable new colony.

| Field | |
|---|---|
| Date | |
| Game version and DLCs | |
| Companion revision | |
| Meals cooked (T5 to T9), names and descriptions read | |
| Raw braces, unresolved keys, English fallback or clipped text seen | |
| Extension settings page or shortcut present (there must be none) | |
| Translation report and `Player.log` saved at | |
| New errors attributable to this mod, to the companion, upstream | |
| Result | |
| Notes | |

## T14 · New game and existing save, both languages

Mod lists: `T11-english-with-companion.txt` without the companion for English, `T13-french.txt` for French.
**Work on a copy of the existing save. Never overwrite the original.**

| Field | English | French |
|---|---|---|
| Date | | |
| New colony: T1, T5, T6, T12 results | | |
| Existing-save copy: loads | | |
| Existing meals still usable, not renamed | | |
| New meals cooked, eligible names | | |
| T12 again on the copy | | |
| Log saved at | | |
| Result | | |
| Notes | | |
