# PUBLICATION.md history folded on 2026-10-14

Steam change notes already sent (first upload, 1.1.0, 1.2.0, 1.2.1, 1.2.2), the 1.2.0 by-hand page description and the done list of the first upload. The template and the current 1.3.0 note stay in PUBLICATION.md; the posted thank-you texts stay too (WORKSHOP_COMMENTS.md cites them). Former text also in git (git show ee2804f:PUBLICATION.md).

## Steam release notes (first upload)

> First release. Adds 901 dishes to Flavor Text, mostly French and regional cooking, and two families of new ingredient
> categories (leek and shallot; turtle, alligator, iguana, lizard and frog). Requires Flavor Text (hekmo). Works with or
> without Odyssey. Ingredients from RimLife Cultivation Plus, RimLife Expansion Trading items and VV - New Harvest are
> recognised when those mods are installed. English only; the French translation is a separate companion.

Release notes accompany every upload; description updates must be requested explicitly.

### 1.1.0

```
[h1]1.1.0[/h1]
Many more of the 901 dishes can now appear in your colony.
[list]
[*] A dish only fires when every one of its ingredients is in the meal, and many of ours asked for very specific ones. About 300 ingredient slots now accept the broader kind they stand for (any pastry grain instead of only wheat, any spice or herb instead of one, any root vegetable or any cheese instead of a single one), while the ingredient that makes a dish what it is stays required. On the same list of mods, [url=https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432]Flavor Text[/url] now keeps 5 to 9% more dishes active, depending on the list.
[*] The plum tagine takes any meat, any fruit and any condiment, and its name follows the fruit actually used.
[*] Fixed the sage butter pork chop, which said sage whatever spice was in the meal, and the typo in "gratinée onion soup".
[*] Nothing was added or removed and no dish was renamed behind the scenes: your saves and the French companion are unaffected.
[/list]
Requires [url=https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432]Flavor Text[/url] (hekmo). Thank you hekmo for pointing out that the dishes were written too narrowly.
Full changelog: [url=https://github.com/vbardales/Rimworld-Flavor-Text-Extended/blob/main/CHANGELOG.md]CHANGELOG.md[/url]
```

### 1.2.2

```
[h1]1.2.2[/h1]
A proofreading of the English.
[list]
[*] 53 dish descriptions corrected after a full read of the dishes: missing or wrong words, a few awkward sentences, dates written as numbers.
[*] The Workshop preview is also updated. No dish was added, removed or renamed, and meal naming is unchanged.
[/list]
Requires [url=https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432]Flavor Text[/url] (hekmo).
Full changelog: [url=https://github.com/vbardales/Rimworld-Flavor-Text-Extended/blob/main/CHANGELOG.md]CHANGELOG.md[/url]
```

### 1.2.1

```
[h1]1.2.1[/h1]
A sharper mod icon.
[list]
[*] The icon in the mod list was a 64 pixel image enlarged to 128 pixels and looked pixelated. The new one is drawn at full size and reduced, so it stays sharp. It no longer carries the name on a ribbon.
[*] Nothing else changed: no dish was added, removed or renamed.
[/list]
Requires [url=https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432]Flavor Text[/url] (hekmo).
Full changelog: [url=https://github.com/vbardales/Rimworld-Flavor-Text-Extended/blob/main/CHANGELOG.md]CHANGELOG.md[/url]
```

### 1.2.0

Sent with the publish of 2026-09-26 (run 36270986472, commit 509667f, tag v1.2.0). The note as sent is the block below.

(Done differently: published on 2026-09-26 before the companion had its entries; the new forms and dishes show in English in French until it delivers.) Publish only once the French companion has its entries for the new forms (`scripts/variants-french.js`), or say on the page that
the French text of the new forms is coming.

```
[h1]1.2.0[/h1]
Meals of one or two ingredients can now get a dish of this mod, not only meals of exactly three.
[list]
[*] [url=https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432]Flavor Text[/url] names a meal in chunks of up to three ingredients, and a dish only fits a chunk with exactly as many ingredients as it has slots. Almost all of ours had three, so a lone potato or a two-ingredient meal could only be named by Flavor Text's own dishes. 233 shorter forms of existing dishes fix that: the same dish, the same name, minus an ingredient it never needed (176 for two ingredients, 57 for one).
[*] 31 new dishes for the combinations a colony really cooks: two meats in a pot, meat in cream, meat with berries, mushrooms or potatoes, and a few meat-free pots. In a test kitchen of twelve everyday ingredients, the share of three-ingredient meals that one of our dishes can name goes from about a fifth to more than nine tenths.
[*] Fixed two dishes that could never appear, altang and jjapaghuri: they asked for four ingredients, more than a chunk holds.
[*] Nothing was removed and no dish was renamed: your saves are unaffected.
[/list]
Requires [url=https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432]Flavor Text[/url] (hekmo). Thank you hekmo for testing it and telling me the dishes were not showing up.
Full changelog: [url=https://github.com/vbardales/Rimworld-Flavor-Text-Extended/blob/main/CHANGELOG.md]CHANGELOG.md[/url]
```

### Steam page description, 1.2.0 (by hand: the CI does not send it)

The description is sent to Steam only when the item is created; a change is made by hand on the page. Add this section after
the paragraph that ends "variety rather than conflict." It is the same text as in `Mod/About/About.xml`.

```
SHORTER FORMS

Flavor Text names a meal in chunks of up to three ingredients, and a dish only fits a chunk with exactly as many ingredients as it has slots. So many of these dishes also come in a shorter form, the same dish under the same name minus an ingredient it never needed, to name meals of one or two ingredients.
```

## Right after the upload — done

1. ~~Commit `About/PublishedFileId.txt` immediately.~~ Done: `3806100152`, its own commit, pushed.
2. Steam created the item **private**, as it always does; RimWorld never calls `SetItemVisibility`.
3. ~~Subscribe, play with it for real, then switch to public by hand.~~ Done by the owner; confirmed from outside
   (an anonymous browser session sees the full page and a Subscribe button — the shape of a public item).
4. ~~Post the thanks above.~~ Done, spot-checked live on hekmo's page. ~~Record the Workshop id in `STATUS.md`.~~ Done.
