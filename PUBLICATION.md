# Publication notes — Flavor Text Extended

What the Workshop page asked for and the repository held nowhere else. Written 2026-09-21 as a draft; **published
2026-09-22**, item [3806100152](https://steamcommunity.com/sharedfiles/filedetails/?id=3806100152), public. The
sections below are now a record of what was decided and sent, not a proposal. It serves twice: it did at the first
upload, and it does for whoever takes the mod over.

The owner explicitly waived the pending Workshop screenshots on 2026-09-22. They remain a future visual-refresh task,
not a claim that captures exist or were reviewed.

## Before the upload

- **Description.** `Mod/About/About.xml` is sent to Steam **only when the item is created**; any later correction is made
  by hand on the Steam page. The Steam-ready text is English and ends with the adoption clause (`IF I GO QUIET`), the
  `AI-GENERATED` disclosure, `THANKS`, the attribution/licence line, then
  `[url=https://github.com/vbardales/Rimworld-Flavor-Text-Extended]Source code on GitHub[/url]`.
- **Version.** `modVersion` 1.0.0, `supportedVersions` 1.6 only. No `LoadFolders.xml`, none needed.
- **Repository.** Public and pushed. Annotated tag `v1.0.0` and its GitHub release both target
  `5ba5fe7`, the first revision that contains package ID `nelim.flavortextextended` and version `1.0.0`:
  https://github.com/vbardales/Rimworld-Flavor-Text-Extended/releases/tag/v1.0.0.

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

**No Workshop gallery capture exists. Do not upload a substitute image.** `Mod/About/Preview.png` is the existing
Workshop header and `Mod/About/ModIcon.png` is the in-game list icon; neither is a gallery capture. Future gallery
captures, if the owner resumes this work, must be produced by the dedicated Pickle scenario, then opened before upload:

1. the info card of a cooked katsudon, from rice, pork and egg: the clearest proof that the
   extension names an ordinary meal after a specific dish;
2. the info card of a meal with two dishes at once (T7): the mod's most distinctive behaviour;
3. the info card of a medium-boiled egg: the smallest complete ingredient-to-name chain.

A capture is disqualified if it shows dev tools, another mod's debug overlay, the launcher panel of Pickle, or an empty
window (STYLE and AUDIT). `06-workshop-captures.feature` uses PickleTools ScreenshotMode to hide the HUD and Pickle
windows, and restores it after each scenario. The order above becomes final only after the resulting images are opened
and approved.

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

## Thanks — posted 2026-09-22

Five drafted here in a technical tone; the owner asked for a warmer, fan-toned rewrite instead, each one different, and
posted those. Kept below as sent, not as the original draft, so this stays the record of what is actually on Steam.
`<ITEM>` was `https://steamcommunity.com/sharedfiles/filedetails/?id=3806100152` at send time.

**hekmo — Flavor Text** (3245374432) — confirmed live on Flavor Text's own Comments page, account `nelim17`.

> Hi hekmo! 🍲 Flavor Text is the reason my colonies stopped eating 'meal, simple' forever, so I went and wrote it 901 more
> dishes to name. Everything here is built ON your defs (nothing copied, nothing works without your mod), and I made sure
> to respect how you draw a name so I'm not fighting your engine, just feeding it. If any of my patches ever step on your
> toes, just say the word and I'll fix it. Thank you for making the base thing so good I wanted 901 more of it. I'll
> upload a french version too today :) <ITEM>

**daylight — RimLife Cultivation Plus** (3614595617)

> Your crops made my colonists so much happier, RimLife Cultivation Plus 🌱 Thanks to you, dishes cooked with Chingensai,
> tomato, onion, paprika or dent corn can now get a proper name instead of a boring "meal". Totally optional on your end,
> nothing required, nothing copied, just quietly grateful whenever your veggies show up in someone's stew. <ITEM>

**daylight — RimLife Expansion Trading items** (2951594887)

> Hello! Your dried meat and cheeses earned themselves a whole ingredient category in my Flavor Text add-on 🧀 Cook with
> them and the game can now name the result properly instead of shrugging and calling it "meal". Nothing required on your
> side, nothing copied, just a little nod every time your stock shows up on someone's plate. Thanks for the tasty
> ingredients! <ITEM>

**VVenchov — VV - New Harvest** (3448458106)

> Leek deserved better, and VV - New Harvest gave it to me 🥬 I built leek its very own category in Flavor Text so a dish
> can finally ask for it by name instead of shrugging and calling it an onion (it still IS one for Flavor Text's own
> recipes, no hard feelings). Your VV_Leeks slots right in, completely optional, nothing copied. Thanks for growing
> something so specific! <ITEM>

**DRILLED_HEAD — [DHM]Korean cuisine** ([Workshop 3723096620](https://steamcommunity.com/sharedfiles/filedetails/?id=3723096620))

> Okay this one's a fun story 🍢 I was browsing what people cook in RimWorld and your mod is what put Altang, Beondegi,
> Bungeoppang, Jjapaghuri and Kimchijeon on my radar. I wrote my own definitions and descriptions from scratch for all
> five (no textures, code or text borrowed, promise!), but the idea to add them at all is 100% thanks to you. Consider
> this my little shoutout for the inspiration. <ITEM>

Identity checked on 2026-09-22 against FoodCourt's registry and the installed mod's About.xml,
PublishedFileId.txt and five KFD_ definitions. Package ID: `drilledhead.Koreancuisine`.
This is an inspiration credit, not a dependency or a claim of integration testing.

**Held back:** Chinese Traditional Cultural Things Expanded (2877536640). The mod declares no 1.6 support, so a thanks
message must not claim compatibility. A factual, non-compatibility draft is prepared below.

## Additional Steam comments — drafted, not posted

Do not repost the five comments above (Flavor Text, RimLife Cultivation Plus, RimLife Expansion Trading items, VV - New
Harvest and [DHM] Korean cuisine), nor the already-contacted RimWorks pages for Pickle and RimLogging. The sole remaining
draft below is under Steam's 1,000-character limit and ends with the public item URL.

**Diamond.J, DaJian, Frolg and TangWan — Chinese Traditional Cultural Things Expanded** ([Workshop 2877536640](https://steamcommunity.com/sharedfiles/filedetails/?id=2877536640))

> Hello! 🥢 Your ingredient names inspired a few carefully guarded Flavor Text Extended attachments, so meals can receive more specific names when your mod is present. I do not claim 1.6 compatibility for that integration because your Workshop page does not declare it; the references stay optional and do nothing when the mod is absent. Thank you for the lovely pantry inspiration! https://steamcommunity.com/sharedfiles/filedetails/?id=3806100152

## Right after the upload — done

1. ~~Commit `About/PublishedFileId.txt` immediately.~~ Done: `3806100152`, its own commit, pushed.
2. Steam created the item **private**, as it always does; RimWorld never calls `SetItemVisibility`.
3. ~~Subscribe, play with it for real, then switch to public by hand.~~ Done by the owner; confirmed from outside
   (an anonymous browser session sees the full page and a Subscribe button — the shape of a public item).
4. ~~Post the thanks above.~~ Done, spot-checked live on hekmo's page. ~~Record the Workshop id in `STATUS.md`.~~ Done.
