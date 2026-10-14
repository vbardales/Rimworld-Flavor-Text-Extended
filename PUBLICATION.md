# Publication notes — Flavor Text Extended

What the Workshop page asked for and the repository held nowhere else. Written 2026-09-21 as a draft; **published
2026-09-22**, item [3806100152](https://steamcommunity.com/sharedfiles/filedetails/?id=3806100152), public. The
sections below are now a record of what was decided and sent, not a proposal. It serves twice: it did at the first
upload, and it does for whoever takes the mod over.

The Workshop gallery images are in `Art/Gallery/` in their Steam display order. The set was settled on 2026-10-12: the owner
accepted the "two dishes, Nelim seated" picture from the "Lunch is served" story (`Tests/Pickle/Mod/Pickle/Features/10-gallery-scenes.feature`,
run d5a1, pass 12), the session dropped the two older cards that it replaced or overlapped (two dishes at once, medium-boiled egg), and the
blanquette-and-hen candidate was refused (plain yellow meal sprite, neutral face). The gallery
on the Steam page is uploaded by hand by the owner: she uploaded this set on 2026-10-13 (her report, not checked on the public page by a session). New candidates are named `N-candidate-<subject>`: the owner accepts (the word `candidate` goes) or refuses (the file is deleted). The first
icon (mascot with its ribbon lettering, 128 x 128) was `Art/ModIcon-original.png`; the file left the working tree on 2026-10-11 (minimal Art set) and is kept in the Git history.

## How it is published

- **Description.** `Mod/About/About.xml` is sent to Steam **only when the item is created**; any later correction is made
  by hand on the Steam page or by the CI (`update_description`, off by default). The Steam-ready text is English and ends with the adoption clause (`IF I GO QUIET`), the
  `AI-GENERATED` disclosure, `THANKS`, the attribution/licence line, then
  `[url=https://github.com/vbardales/Rimworld-Flavor-Text-Extended]Source code on GitHub[/url]`.
- **Version.** `modVersion` 1.3.0 in `About.xml`, published on 2026-10-13 by the CI (tag `v1.3.0`; the releases are listed in `STATUS.md`). 1.0.0 was the first upload, 2026-09-22. `supportedVersions` 1.6 and 1.7, declared after the green 1.7 diagnostic of 2026-10-13 (14 of 14, English, without optional mods; `docs/runs/2026-10-13-1-7-diagnostic.md`); the Preview badge reads the highest one. No `LoadFolders.xml`, none needed. A dispatch carries `--preview` only when the header image changed and `--description` only when the Steam description changed.
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
  for 13 dishes out of 932, so it stays optional.
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

`Mod/About/Preview.png` is the Workshop header and `Mod/About/ModIcon.png` is the in-game list icon. Both are rendered by
`scripts/Render-Preview.cjs` from `Art/Preview.config.json`, `Art/Preview-source.png`, `Art/echo.png` and the owner's
`Art/ModIcon-source.png` (key `modIconSource`: the icon is reduced to 128 x 128 without cropping). `Preview.png` carries the
icon as a badge in the bottom-left corner. `Art/Gallery/0-preview.png` is a byte-for-byte copy of `Mod/About/Preview.png`, written
by the same renderer, so the gallery opens on the same image as the store page. The katsudon card is a 1100x1080 PNG, the 1920x1080
capture with only the side edges cut (x 410 to 1510): full height, so both smileys of the backdrop stay (about 870 KB, below Steam's 2 MB limit). The scene is a 1920x1080 JPEG
(about 290 KB). Display order:

0. `0-preview.png`: the badged header, so the gallery opens on the same image as the store page;
1. `1-two-dishes-nelim-seated.jpg`: Nelim seated at a laid table, the info card of a meal named with two dishes at once (T7) open beside it: the mod's most distinctive
   behaviour, shown in a scene;
2. `2-katsudon.png`: info card of a cooked katsudon, from rice, pork and egg: the clearest proof that the extension
   names an ordinary meal after a specific dish.

The gallery is uploaded by hand: SteamCMD cannot send it. The owner uploaded this set of three on 2026-10-13, replacing the 2026-10-06 set (0 to 3); that is her report, not checked on the public page by a session.

The uncompressed 1920x1080 captures are not kept in the repository: they stay on disk in
`Tests/Pickle/Evidence/2026-10-06-gallery-height-5bf7bef/screenshots/`, ignored by git (see `TESTING.md`, "Evidence to keep").

A capture is disqualified if it shows dev tools, another mod's debug overlay, the launcher panel of Pickle, or an empty
window (STYLE and AUDIT). `06-workshop-captures.feature` loads the shared gallery fixture `Nelims-tribe` (PickleTools
`docs/GALERIE.md`), enables the studio presentation mode, removes the animals, frames `window-backdrop-for-height` (a bamboo field with a smiley at the top and one at the bottom, validated by the owner)
and then uses ScreenshotMode to hide the HUD and Pickle windows while retaining the meal card. It restores the interface after each
scenario. The images were opened and approved on 2026-10-06.

`window-backdrop-for-height` is the named framing for tall game windows such as this object inspect card. Tried and dropped before it:
`dining-nook` (plain parquet), `exhibition-zone` (OK, but busier) and `window-backdrop-for-width` (made for wide windows). Functional
tests do not use this fixture; `06` is the only scenario that does.

## Adult-content boxes

**No.** Checked on the two images the page will carry, both opened and looked at: `Preview.png` shows dishes on a wooden
table, `ModIcon.png` a cartoon mascot holding a bowl. Nothing in the dishes' text concerns the boxes: some name
alcohol, insects or reptiles as ingredients, which the Workshop's categories do not treat as mature content. To be answered
again for every capture added.

## Steam description

The single source of the Steam description, in Markdown (standard chosen by the owner on 2026-09-25, see
`Rimworld-Release-Admin/docs/OPERATIONS.md`, "Changing where the Steam description comes from"). This repository's publish
workflow is generated with `--description-markdown PUBLICATION.md --description-heading '^## Steam description$'
--about-from-description` (`aboutFromDescription: true`): the CI converts this block to Steam BBCode when `update_description` is ticked, and generates the plain-text
`<description>` of `Mod/About/About.xml` from it.

```markdown
An add-on for [Flavor Text](https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432) (hekmo). Requires it, contains none of its files, and does nothing without it.

**932 NEW DISHES**

French and regional cooking first, then the wider repertoire: Italy, the Maghreb, Japan, Korea, Peru, India, China, the Levant, Mexico, West Africa, Eastern Europe, the Caribbean, Polynesia.

Each dish is defined by a combination of ingredients. That combination is what the engine draws on, not the name - so the same dish under five different names would add nothing, and is not here. Where two dishes share a combination it is deliberate: the engine picks at random among matching definitions, weighted by how narrow each one is, so sharing produces variety rather than conflict.

**SHORTER FORMS**

Flavor Text names a meal in chunks of up to three ingredients, and a dish only fits a chunk with exactly as many ingredients as it has slots. So many of these dishes also come in a shorter form, the same dish under the same name minus an ingredient it never needed, to name meals of one or two ingredients.

**EVERYDAY COMBINATIONS**

Thirty-one of the dishes are written for what a colony really cooks with what it has on hand: two meats in a pot, meat in cream, meat with berries or mushrooms, and a few meat-free pots. Their slots are broad (any raw meat, any berry), so they name common meals without crowding out the specific dishes.

**WHAT YOUR COLONY GROWS DECIDES WHAT YOU SEE**

[Flavor Text](https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432) names a meal after what went into it, so a dish can only ever appear if its ingredients exist in your game. These 932 lean on a wider pantry than vanilla keeps - wheat, cheese, butter, cream, onion, tomato, garlic, chilli. On a vanilla-only save (the base game and its DLC) about eighty of them can fire, plus their shorter forms; farming and cooking mods can make more dishes available, depending on their ingredients and meal types.

That is how the engine works rather than a shortcoming: nothing is lost, a dish simply waits for its ingredient. But it is worth knowing before you install.

**NEW INGREDIENT CATEGORIES**

Leek and shallot get categories of their own, so a dish can ask for them by name; both still count as onion for [Flavor Text](https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432)'s own dishes. Five reptile and amphibian meat categories - turtle, alligator, iguana, lizard, frog - split out of the single herptile category.

**THIRD-PARTY INGREDIENTS**

[Flavor Text](https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432) matches keywords against both defNames and labels. This mod also attaches selected ingredients explicitly by defName, including ingredients whose names do not match the expected keywords: highland barley, hybrid rice, salted mustard greens, bok choy, ginkgo nuts, grain wines, dried meat and cheeses, among others.

None of those mods are required. Each provider-specific ingredient reference is guarded by its mod's package ID. No DLC is required. The [Chinese Traditional Cultural Things Expanded](https://steamcommunity.com/sharedfiles/filedetails/?id=2877536640) hooks are not certified for the latest RimWorld version.

**FRENCH**

This mod contains the English content. For French names, descriptions and ingredient grammar, install the separate [Flavor Text Extended - Français](https://steamcommunity.com/sharedfiles/filedetails/?id=3806100488) companion alongside [Flavor Text](https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432) and this mod. The French companion is optional.

**IF I GO QUIET**

If I do not answer within a reasonable time after being contacted, anyone may freely update this or any other of my mods, including publishing a continuation of it. All credit must be preserved.

**AI-GENERATED**

The dishes, their descriptions and the ingredient patches were written with Claude (Anthropic) and ChatGPT (OpenAI), under my direction and review: I chose which dishes to write, which categories to split and which combinations to keep. The mod icon and the Preview illustration are generated with DALL-E (OpenAI).

**THANKS**

[hekmo, for Flavor Text](https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432): how names are composed, how a definition is picked and how ingredients inflect are all his work, and this mod is only new content for it.

daylight ([RimLife Cultivation Plus](https://steamcommunity.com/sharedfiles/filedetails/?id=3614595617), [RimLife Expansion Trading items](https://steamcommunity.com/sharedfiles/filedetails/?id=2951594887)), Diamond.J, DaJian, Frolg and TangWan ([Chinese Traditional Cultural Things Expanded](https://steamcommunity.com/sharedfiles/filedetails/?id=2877536640)) and VVenchov ([VV - New Harvest](https://steamcommunity.com/sharedfiles/filedetails/?id=3448458106)), whose ingredients this mod recognises when they are installed.

[DHM Korean cuisine](https://steamcommunity.com/sharedfiles/filedetails/?id=3723096620), by DRILLED_HEAD: discovering its Altang, Beondegi, Bungeoppang, Jjapaghuri and Kimchijeon prompted five independently written dish definitions here.

RimWorks, for [Pickle](https://steamcommunity.com/sharedfiles/filedetails/?id=3791648678) and [RimLogging](https://steamcommunity.com/sharedfiles/filedetails/?id=3733484696): this release was tested headless, in a real running game, through their tools. Development-only, not a dependency of this mod.

My own PickleTools, a shared testing toolkit across my mods, unpublished: the without-odyssey pass reads ModsConfig through its ExpansionSteps.

Credits, provenance and licence (MIT) are in ATTRIBUTION.md and LICENSE, shipped with the mod.

[Source code on GitHub](https://github.com/vbardales/Rimworld-Flavor-Text-Extended)
```

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

### 1.3.0

```
[h1]1.3.0[/h1]
RimWorld 1.7 support.
[list]
[*] The mod now declares RimWorld 1.7 next to 1.6. It loaded and named meals in a real 1.7 game: 14 scenarios out of 14 passed (English, without optional mods).
[*] The Workshop preview badge reads 1.7. No dish was added, removed or renamed, and meal naming is unchanged.
[/list]
Requires [url=https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432]Flavor Text[/url] (hekmo).
Full changelog: [url=https://github.com/vbardales/Rimworld-Flavor-Text-Extended/blob/main/CHANGELOG.md]CHANGELOG.md[/url]
```
## Thanks — posted 2026-09-22

Five were drafted here in a technical tone; the owner asked for a warmer, fan-toned rewrite instead, each one different, and
posted those. The three texts that `WORKSHOP_COMMENTS.md` cites as retained are kept below as sent.
`<ITEM>` was `https://steamcommunity.com/sharedfiles/filedetails/?id=3806100152` at send time.

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

Also posted on 2026-09-22, texts not retained (not listed as retained in `WORKSHOP_COMMENTS.md`): hekmo on Flavor Text (3245374432, checked live as account `nelim17`) and DRILLED_HEAD on [DHM] Korean cuisine (3723096620, an inspiration credit, no dependency or compatibility claim, package ID `drilledhead.Koreancuisine`).

## Additional Steam comment — posted 2026-09-22

Do not repost any of the five comments (hekmo, RimLife Cultivation Plus, RimLife Expansion Trading items, VV - New
Harvest, [DHM] Korean cuisine), nor the already-contacted RimWorks pages for Pickle and RimLogging. The final comment
below was posted on the Chinese Traditional Cultural Things Expanded page. It is under Steam's 1,000-character limit and
ends with the public item URL.

**Diamond.J, DaJian, Frolg and TangWan — Chinese Traditional Cultural Things Expanded** ([Workshop 2877536640](https://steamcommunity.com/sharedfiles/filedetails/?id=2877536640))

> Hello! 🥢 Your ingredient names inspired a few carefully guarded Flavor Text Extended attachments, so meals can receive more specific names when your mod is present. I do not claim 1.6 compatibility for that integration because your Workshop page does not declare it; the references stay optional and do nothing when the mod is absent. Thank you for the lovely pantry inspiration! https://steamcommunity.com/sharedfiles/filedetails/?id=3806100152

