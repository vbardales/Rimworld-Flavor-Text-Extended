# Publication notes — Flavor Text Extended

What the Workshop page asks for and the repository holds nowhere else. Written 2026-09-21 as a **draft** for the
owner's review: nothing here has been posted, uploaded or tagged. It serves twice: at the first upload, and for
whoever takes the mod over.

## Before the upload

- **Description.** `Mod/About/About.xml` is sent to Steam **only when the item is created**; any later correction is made
  by hand on the Steam page. It is in English, ends on the adoption clause (`IF I GO QUIET`), the disclosure
  (`AI-GENERATED`), `THANKS`, a line pointing at ATTRIBUTION.md and the licence, then
  `[url=https://github.com/vbardales/Rimworld-Flavor-Text-Extended]Source code on GitHub[/url]`. Two statements in it want the
  owner's confirmation before it is frozen: that the icon and the Preview illustration are AI-generated (the repository
  does not record the tool), and who did what among Claude and Codex.
- **Version.** `modVersion` 1.0.0, `supportedVersions` 1.6 only. No `LoadFolders.xml`, none needed.
- **Repository.** Public, `origin/main` pushed. Tag `v1.0.0` and its GitHub release, with the CHANGELOG's 1.0.0 section as
  the body, are **not yet made**: publishing a release is the owner's word.

## Dependencies and DLC

Decided from the sources, not from intent.

- **Required: `hekmo.FlavorText` (Workshop 3245374432), and nothing else.** Every def is a `FlavorText.FlavorDef` or
  `FlavorText.FlavorCategoryDef`, the patches edit Flavor Text's own categories, and Flavor Text declares Harmony itself, so
  this mod declares none. It is listed in `modDependencies` with its Workshop URL.
- **No DLC is required.** Four of the six reptile meats belong to Odyssey and are referenced only behind
  `MayRequire="ludeon.rimworld.odyssey"` on each entry. The pass without Odyssey (`Tests/Pickle`, `05-sans-odyssey`)
  loaded the mod with zero errors, and the game kept the DLC out. Making Odyssey required would exclude everyone without it
  for 13 dishes out of 901, so it stays optional.
- **Optional, deliberately not declared** (each is a `MayRequire` on a list entry, the mod does nothing for it when absent):
  RimLife Cultivation Plus (3614595617) and RimLife Expansion Trading items (2951594887), both by daylight; VV - New
  Harvest (3448458106, VVenchov). The pass with these three staged passed, and the ingredients they name were read back from
  Flavor Text's category tree.
- **Not certified for 1.6:** Chinese Traditional Cultural Things Expanded (2877536640). Its hooks are kept, but it declares
  1.5 or older and no run could vouch for it. **Say so on the page if asked.** No shallot provider is certified either.
- **No `loadAfter` on the optional mods**, on purpose: the patches edit Flavor Text's categories and the references resolve
  after every def is loaded, so no additional ordering constraint is declared. The passes validate
  the staged order, not every possible load order.

## Captures for the Workshop page

**None exist yet**, apart from the header `Preview.png`. Steam shows the first capture large: it should be the most
demonstrative, not the prettiest, and every image must be opened and looked at before it goes up. Candidates, to be
produced by a dedicated Pickle scenario so they can be redone (the existing scenarios take no screenshot):

1. the info card of a cooked dish, showing its name and its description (katsudon, from rice, pork and egg);
2. the same for a regional dish that vanilla would not name (a meal with several dishes at once, T7);
3. the mod list entry with the mascot icon and the dependency on Flavor Text.

A capture is disqualified if it shows dev tools, another mod's debug overlay, the launcher panel of Pickle, or an empty
window (STYLE and AUDIT). Order to be settled once the images exist.

## Adult-content boxes

**No.** Checked on the two images the page will carry, both opened and looked at: `Preview.png` shows dishes on a wooden
table, `ModIcon.png` a cartoon mascot with a food-labelled ribbon. Nothing in the dishes' text concerns the boxes: some name
alcohol, insects or reptiles as ingredients, which the Workshop's categories do not treat as mature content. To be answered
again for every capture added.

## Steam release notes (first upload)

> First release. Adds 901 dishes to Flavor Text, mostly French and regional cooking, and two families of new ingredient
> categories (leek and shallot; turtle, alligator, iguana, lizard and frog). Requires Flavor Text (hekmo). Works with or
> without Odyssey. Ingredients from RimLife Cultivation Plus, RimLife Expansion Trading items and VV - New Harvest are
> recognised when those mods are installed. English only; the French translation is a separate companion.

Release notes go out with every upload and can be corrected freely; the description does not.

## Thanks to post, once the item is public

One per recipient, personalised, each under 1000 characters (the Steam comment limit). BBCode works, and a bare item URL
makes a thumbnail. **Post only after the switch to public**: a link to a private item opens for nobody. `<ITEM>` is this
mod's Workshop URL, unknown until the first upload.

**hekmo — Flavor Text** (3245374432)

> Thank you for Flavor Text. I wrote an add-on for it: 901 more dishes and a few new ingredient categories, all as defs that
> inherit your FlavorDef_Base plus XML patches on your categories. Nothing of yours is copied, and it does nothing without
> Flavor Text. I read how names are drawn (a weighted random pick among matching definitions) so as not to fight it, and
> the dishes share ingredient combinations on purpose to give variety. If any patch on your categories bothers you, tell me
> and I will change it. <ITEM>

**daylight — RimLife Cultivation Plus** (3614595617)

> Thanks for RimLife Cultivation Plus. My Flavor Text add-on recognises your Chingensai, tomato, onion, paprika and dent
> corn as ingredients when your mod is installed (one guarded entry each, nothing required, nothing copied), so meals cooked
> from them can be named as dishes. Tested on 1.6 with your mod loaded. <ITEM>

**daylight — RimLife Expansion Trading items** (2951594887)

> Thanks for RimLife Expansion Trading items. My Flavor Text add-on files your dried meat and two cheeses under the matching
> ingredient categories when your mod is installed, so a meal cooked with them can be named as a dish. One guarded entry
> each, nothing required, nothing copied. Tested on 1.6 with your mod loaded. <ITEM>

**VVenchov — VV - New Harvest** (3448458106)

> Thanks for VV - New Harvest. My Flavor Text add-on gives leek its own category so a dish can ask for it by name, and it
> attaches your VV_Leeks to it when your mod is installed (a single guarded entry, nothing required, nothing copied). A leek
> still counts as an onion for Flavor Text's own dishes. Tested on 1.6 with your mod loaded. <ITEM>

**Chinese Traditional Cultural Things Expanded** (2877536640) — *optional; hold this one back.* The mod declares no 1.6
support, so the message would thank a hook nobody could test here. Post only if that changes.

**DRILLED_HEAD — [DHM]Korean cuisine** ([Workshop 3723096620](https://steamcommunity.com/sharedfiles/filedetails/?id=3723096620))

> Thank you for [DHM]Korean cuisine. Comparing its dishes with Flavor Text helped me discover five additions for my
> add-on: Altang, Beondegi, Bungeoppang, Jjapaghuri and Kimchijeon. I wrote new Flavor Text definitions and descriptions
> for them; no textures, code or descriptions from your mod are included. Some ingredients are approximations within
> Flavor Text's categories, identified in the descriptions. Your mod is credited as the source of these discoveries. <ITEM>

Identity checked on 2026-09-22 against FoodCourt's registry and the installed mod's About.xml,
PublishedFileId.txt and five KFD_ definitions. Package ID: `drilledhead.Koreancuisine`.
This is an inspiration credit, not a dependency or a claim of integration testing.

## Right after the upload — cannot be redone

1. **Commit `About/PublishedFileId.txt` immediately.** Lost, the next upload creates a second item.
2. Steam creates every item **private**; RimWorld never calls `SetItemVisibility`.
3. Subscribe to the item, play with it for real, then switch it to public **by hand**.
4. Post the thanks above. Record the Workshop id in `STATUS.md`.
