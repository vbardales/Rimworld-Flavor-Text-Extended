# Publication notes — Flavor Text Extended

What the Workshop page asked for and the repository held nowhere else. Written 2026-09-21 as a draft; **published
2026-09-22**, item [3806100152](https://steamcommunity.com/sharedfiles/filedetails/?id=3806100152), public. The
sections below are now a record of what was decided and sent, not a proposal. It serves twice: it did at the first
upload, and it does for whoever takes the mod over.

The Workshop captures were generated, visually approved and uploaded to the Workshop gallery on 2026-09-22. They are
retained in `Art/Workshop-captures/` in their Steam display order.

## Before the upload

- **Description.** `Mod/About/About.xml` is sent to Steam **only when the item is created**; any later correction is made
  by hand on the Steam page. The Steam-ready text is English and ends with the adoption clause (`IF I GO QUIET`), the
  `AI-GENERATED` disclosure, `THANKS`, the attribution/licence line, then
  `[url=https://github.com/vbardales/Rimworld-Flavor-Text-Extended]Source code on GitHub[/url]`.
- **Version.** `modVersion` 1.1.0 (published 2026-09-24 through GitHub Actions, run 36001072152 on `9bd7fd3`, tag `v1.1.0` and release created by the workflow; 1.0.0 was the first upload, 2026-09-22), `supportedVersions` 1.6 only. No `LoadFolders.xml`, none needed.
- **Repository.** Public and pushed. Annotated tag `v1.0.0` and its GitHub release both target
  `5ba5fe7`, the first revision that contains package ID `nelim.flavortextextended` and version `1.0.0`:
  https://github.com/vbardales/Rimworld-Flavor-Text-Extended/releases/tag/v1.0.0.

## Dependencies and DLC

Decided from the sources, not from intent.

- **Required: `hekmo.FlavorText` (Workshop 3245374432), and nothing else.** Every def is a `FlavorText.FlavorDef` or
  `FlavorText.FlavorCategoryDef`, the patches edit Flavor Text's own categories, and Flavor Text declares Harmony itself, so
  this mod declares none. It is listed in `modDependencies` with its Workshop URL.
- **No DLC is required.** Four of the six reptile meats belong to Odyssey and are referenced only behind
  `MayRequire="ludeon.rimworld.odyssey"` on each entry. The pass without Odyssey (`Tests/Pickle`, `05-without-odyssey`)
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

`Mod/About/Preview.png` is the existing Workshop header and `Mod/About/ModIcon.png` is the in-game list icon; neither is
a gallery capture. The three approved gallery captures are present in `Art/Workshop-captures/` as 1000x810 PNGs, each the capture cropped tight around the card window (regenerated and approved on 2026-09-24),
each below Steam's 2 MB limit. They were uploaded in this order:

1. `01-katsudon.png` — info card of a cooked katsudon, from rice, pork and egg: the clearest proof that the extension
   names an ordinary meal after a specific dish;
2. `02-two-dishes-at-once.png` — info card of a meal with two dishes at once (T7): the mod's most distinctive behaviour;
3. `03-medium-boiled-egg.png` — info card of a medium-boiled egg: the smallest complete ingredient-to-name chain.

The corresponding uncompressed 1920x1080 capture files are retained in `Art/Workshop-captures/source/`; they are source
archives, not upload candidates.

A capture is disqualified if it shows dev tools, another mod's debug overlay, the launcher panel of Pickle, or an empty
window (STYLE and AUDIT). `06-workshop-captures.feature` loads the Nelim Zen Meadow studio, frames its central tiled emblem,
then uses PickleTools ScreenshotMode to hide the HUD and Pickle windows while retaining the meal card. It restores the
interface after each scenario. The resulting images were opened, approved and uploaded in the order above.

Zen is a presentation fixture only: functional tests continue to use `test-colony`. The emblem frame is the default for
Flavor Text Extended because it keeps the card centered over the emblem's colony setting instead of an interface-only
background. The card can cover the emblem itself; that composition was reviewed and accepted. Use the kitchen frame only
where a stove or cooking scene is the actual subject.

## Adult-content boxes

**No.** Checked on the two images the page will carry, both opened and looked at: `Preview.png` shows dishes on a wooden
table, `ModIcon.png` a cartoon mascot with a food-labelled ribbon. Nothing in the dishes' text concerns the boxes: some name
alcohol, insects or reptiles as ingredients, which the Workshop's categories do not treat as mature content. To be answered
again for every capture added.

## Steam description

The single source of the Steam description, in Markdown (standard chosen by the owner on 2026-09-25, see
`Rimworld-Release-Admin/docs/OPERATIONS.md`, "Changing where the Steam description comes from"). Once this repository's publish
workflow is generated with `--description-markdown PUBLICATION.md --description-heading '^## Steam description$'
--about-from-description`, the CI converts this block to Steam BBCode when `update_description` is ticked, and generates the plain-text
`<description>` of `Mod/About/About.xml` from it. Until that migration this block is only the draft of the 1.2.0 description; the
headings are bold instead of plain capitals, the SHORTER FORMS section is new, the rest is the page as it stands.

```markdown
An add-on for [Flavor Text](https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432) (hekmo). Requires it, contains none of its files, and does nothing without it.

901 NEW DISHES

French and regional cooking first, then the wider repertoire: Italy, the Maghreb, Japan, Korea, Peru, India, China, the Levant, Mexico, West Africa, Eastern Europe, the Caribbean, Polynesia.

Each dish is defined by a combination of ingredients. That combination is what the engine draws on, not the name - so the same dish under five different names would add nothing, and is not here. Where two dishes share a combination it is deliberate: the engine picks at random among matching definitions, weighted by how narrow each one is, so sharing produces variety rather than conflict.

**SHORTER FORMS**

Flavor Text names a meal in chunks of up to three ingredients, and a dish only fits a chunk with exactly as many ingredients as it has slots. So many of these dishes also come in a shorter form, the same dish under the same name minus an ingredient it never needed, to name meals of one or two ingredients.

**WHAT YOUR COLONY GROWS DECIDES WHAT YOU SEE**

[Flavor Text](https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432) names a meal after what went into it, so a dish can only ever appear if its ingredients exist in your game. These 901 lean on a wider pantry than vanilla keeps - wheat, cheese, butter, cream, onion, tomato, garlic, chilli. On a vanilla-only save about forty of them can fire; farming and cooking mods can make more dishes available, depending on their ingredients and meal types.

That is how the engine works rather than a shortcoming: nothing is lost, a dish simply waits for its ingredient. But it is worth knowing before you install.

**NEW INGREDIENT CATEGORIES**

Leek and shallot get categories of their own, so a dish can ask for them by name; both still count as onion for [Flavor Text](https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432)'s own dishes. Five reptile and amphibian meat categories - turtle, alligator, iguana, lizard, frog - split out of the single herptile category.

**THIRD-PARTY INGREDIENTS**

[Flavor Text](https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432) matches keywords against both defNames and labels. This mod also attaches selected ingredients explicitly by defName, including ingredients whose names do not match the expected keywords: highland barley, hybrid rice, salted mustard greens, bok choy, ginkgo nuts, grain wines, dried meat and cheeses, among others.

None of those mods are required. Each provider-specific ingredient reference is guarded by its mod's package ID. No DLC is required. The [Chinese Traditional Cultural Things Expanded](https://steamcommunity.com/sharedfiles/filedetails/?id=2877536640) hooks are not certified for RimWorld 1.6.

**FRENCH**

This mod contains the English content. For French names, descriptions and ingredient grammar, install the separate [Flavor Text Extended - Français](https://steamcommunity.com/sharedfiles/filedetails/?id=3806100488) companion alongside [Flavor Text](https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432) and this mod. The French companion is optional.

**IF I GO QUIET**

If I do not answer within a reasonable time after being contacted, anyone may freely update this or any other of my mods, including publishing a continuation of it. All credit must be preserved.

**AI-GENERATED**

The dishes, their descriptions and the ingredient patches were written with Claude (Anthropic) and ChatGPT (OpenAI), under my direction and review: I chose which dishes to write, which categories to split and which combinations to keep. The mod icon and the Preview illustration are generated with DALL-E (OpenAI).

**THANKS**

[hekmo, for Flavor Text](https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432): how names are composed, how a definition is picked and how ingredients inflect are all his work, and this mod is only new content for it.

daylight ([RimLife Cultivation Plus](https://steamcommunity.com/sharedfiles/filedetails/?id=3614595617), [RimLife Expansion Trading items](https://steamcommunity.com/sharedfiles/filedetails/?id=2951594887)), Diamond.J, DaJian, Frolg and TangWan ([Chinese Traditional Cultural Things Expanded](https://steamcommunity.com/sharedfiles/filedetails/?id=2877536640)) and VVenchov ([VV - New Harvest](https://steamcommunity.com/sharedfiles/filedetails/?id=3448458106)), whose ingredients this mod recognises when they are installed.

DRILLED_HEAD, for [[DHM]Korean cuisine](https://steamcommunity.com/sharedfiles/filedetails/?id=3723096620): discovering its Altang, Beondegi, Bungeoppang, Jjapaghuri and Kimchijeon prompted five independently written dish definitions here.

RimWorks, for [Pickle](https://steamcommunity.com/sharedfiles/filedetails/?id=3791648678) and [RimLogging](https://steamcommunity.com/sharedfiles/filedetails/?id=3733484696): this release was tested headless, in a real running game, through their tools. Development-only, not a dependency of this mod.

My own PickleTools, a shared testing toolkit across my mods, unpublished: the without-odyssey pass reads ModsConfig through its ExpansionSteps.

Credits, provenance and licence (MIT) are in ATTRIBUTION.md and LICENSE, shipped with the mod.

[Source code on GitHub](https://github.com/vbardales/Rimworld-Flavor-Text-Extended)
```

## Steam release notes (first upload)

> First release. Adds 901 dishes to Flavor Text, mostly French and regional cooking, and two families of new ingredient
> categories (leek and shallot; turtle, alligator, iguana, lizard and frog). Requires Flavor Text (hekmo). Works with or
> without Odyssey. Ingredients from RimLife Cultivation Plus, RimLife Expansion Trading items and VV - New Harvest are
> recognised when those mods are installed. English only; the French translation is a separate companion.

Release notes go out with every upload and can be corrected freely; the description does not.

## Steam release notes (updates) — template

Steam's change note accepts BBCode. Every mod name links to its Workshop page (the same rule as the description). Fill the
angle brackets, drop a bullet that does not apply, keep it short: one line of "what a player sees" per bullet.

```
[h1]<version>[/h1]
<One sentence: what changes for the player.>
[list]
[*] <Visible change 1, in the player's terms.>
[*] <Visible change 2.>
[*] <Fixes: name what was wrong, not the def.>
[*] <Compatibility: saves, the French companion, Odyssey, optional mods.>
[/list]
Requires [url=https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432]Flavor Text[/url] (hekmo). <Thanks line, if someone reported or helped.>
Full changelog: [url=https://github.com/vbardales/Rimworld-Flavor-Text-Extended/blob/main/CHANGELOG.md]CHANGELOG.md[/url]
```

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

### 1.2.0 (draft, not sent: the version is not bumped and the shorter forms are not tested in game yet)

Publish only once the French companion has its entries for the new forms (`_tools/variants-french.js`), or say on the page that
the French text of the new forms is coming.

```
[h1]1.2.0[/h1]
Meals of one or two ingredients can now get a dish of this mod, not only meals of exactly three.
[list]
[*] [url=https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432]Flavor Text[/url] names a meal in chunks of up to three ingredients, and a dish only fits a chunk with exactly as many ingredients as it has slots. Almost all of ours had three, so a lone potato or a two-ingredient meal could only be named by Flavor Text's own dishes. 233 shorter forms of existing dishes fix that: the same dish, the same name, minus an ingredient it never needed (176 for two ingredients, 57 for one).
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

## Additional Steam comment — posted 2026-09-22

Do not repost the five comments above (Flavor Text, RimLife Cultivation Plus, RimLife Expansion Trading items, VV - New
Harvest and [DHM] Korean cuisine), nor the already-contacted RimWorks pages for Pickle and RimLogging. The final comment
below was posted on the Chinese Traditional Cultural Things Expanded page. It is under Steam's 1,000-character limit and
ends with the public item URL.

**Diamond.J, DaJian, Frolg and TangWan — Chinese Traditional Cultural Things Expanded** ([Workshop 2877536640](https://steamcommunity.com/sharedfiles/filedetails/?id=2877536640))

> Hello! 🥢 Your ingredient names inspired a few carefully guarded Flavor Text Extended attachments, so meals can receive more specific names when your mod is present. I do not claim 1.6 compatibility for that integration because your Workshop page does not declare it; the references stay optional and do nothing when the mod is absent. Thank you for the lovely pantry inspiration! https://steamcommunity.com/sharedfiles/filedetails/?id=3806100152

## Right after the upload — done

1. ~~Commit `About/PublishedFileId.txt` immediately.~~ Done: `3806100152`, its own commit, pushed.
2. Steam created the item **private**, as it always does; RimWorld never calls `SetItemVisibility`.
3. ~~Subscribe, play with it for real, then switch to public by hand.~~ Done by the owner; confirmed from outside
   (an anonymous browser session sees the full page and a Subscribe button — the shape of a public item).
4. ~~Post the thanks above.~~ Done, spot-checked live on hekmo's page. ~~Record the Workshop id in `STATUS.md`.~~ Done.

## Reply to hekmo, 2026-09-26 (draft, not posted)

hekmo saw no dish of this mod in a hundred spawned meals with random ingredients. The cause is Flavor Text's own matching rule
(a dish only names a chunk with exactly as many ingredients as it has slots), which this reply explains. Only post it once the
owner agrees; it promises nothing that is not being done (the shorter forms are on branch `arity`, untested in game).

```
Found it, and it's not your test, it's my mod :) Your engine only pairs a dish with a chunk of ingredients that has exactly as many items as the dish has slots. 896 of my 901 dishes have 3 slots, so they could only name meals of exactly 3 ingredients. Spawn meals of 1 or 2 and you can only ever see your own dishes, which is what your screenshot shows. Sorry for the wild goose chase! (Your medium-boiled egg is one of my two 1-slot dishes, that's why it worked.)

I'm adding shorter forms of the dishes so they can name 1 and 2 ingredient meals too. Not out yet, I want it tested in game first. Thank you for digging into this, it would have taken me much longer alone.
```
