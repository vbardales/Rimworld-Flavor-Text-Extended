# Changelog

## [Unreleased]

Meals of one or two ingredients can now be named by this mod too. Flavor Text cuts a meal's ingredients into chunks of
three and names each chunk with a dish that has exactly as many ingredient slots as the chunk has ingredients. 896 of
our 901 dishes had three slots, so they could only name a meal of exactly three ingredients, while a meal of one or two
was named by Flavor Text's own dishes alone (hekmo reported seeing none of ours in a hundred spawned meals).

- Add 179 shorter forms of existing dishes (`FlavorDefs_Variants.xml`, `_tools/make-variants.js`): the same dish, with the
  same name and text, minus an ingredient it never needed (one that the 1.1.0 review had widened and that its text
  never cites). 176 take two ingredients and 3 take one. A form and its original never compete: their slot counts differ.
- Fix the two dishes that could never appear because they asked for four ingredients (`FlavorTextExtended_Altang` and
  `FlavorTextExtended_Jjapaghuri`, a chunk holds at most three): they now take three, and their text no longer
  names the dropped ingredient.
- Measured in game on 1.1.0 (Pickle, vanilla ingredients, 400 cooks each): 0.0 % of two-ingredient meals, 0.8 % of
  three and 2.3 % of four carried a dish of this mod. Offline estimate for the new forms (`_tools/frequency.js`, a model
  of Flavor Text's own draw that matched those figures in order of magnitude): two-ingredient meals from 0.6 to 8.6
  percent, five-ingredient meals from 1.0 to 5.0.

## [1.1.0] - 2026-09-24

Dishes now fire much more often. hekmo, the author of Flavor Text, pointed out that a dish only fires when every one of
its ingredient slots matches something in the cooked meal, and that many of ours asked for very specific ingredients
(the plum tagine wanted mutton *and* plums *and* a spice). All 901 dishes were reviewed one by one.

- Widen 295 ingredient slots to the broad category they belong to: pastry and bread wheat to grain, spices, garlic,
  ginger and herbs to condiment, onions, carrots and turnips to root vegetable, cheese to dairy, butter and cream to
  milk, and so on. Dishes with three specific slots fall from 439 to 268; dishes with at most one rise from 98 to 204.
- Keep a slot specific when it defines the dish (the meat of a stew, the fruit a chapter of recipes is about, the
  ingredient in the dish's name) or when the description names it. A broader slot there would have produced a text
  like "seasoned with potatoes".
- The plum tagine (`FlavorTextFR_TajinePruneaux`) now takes any raw meat, any fruit and any condiment, and its name
  follows the fruit actually used instead of always saying "prunes".
- Fix the sage butter pork chop, whose name and description said sage whatever spice was in the meal.
- No dish was added or removed, and no def name changed, so existing saves keep their meal names.

Tested in game on this revision, headless through Pickle: the mod alone (11 scenarios), without Odyssey (3), beside the three
ingredient providers (6) and the meal-card captures (3) all pass, with no error naming this mod. Flavor Text now reports more active
dishes for the same modlists (696 instead of 641 on the bare list, 1072 instead of 1025 with the providers).

## [1.0.0] - 2026-09-22

First release. The mod was developed against Flavor Text (hekmo) for 1.6; nothing had been published before.

- Add 901 dish definitions for Flavor Text: French and regional cooking first, then Italy, the Maghreb, Japan, Korea,
  Peru, India, China, the Levant, Mexico, West Africa, Eastern Europe, the Caribbean and Polynesia. Each dish is defined by a
  combination of ingredients.
- Add seven ingredient categories: leek and shallot get categories of their own (both still count as onion for Flavor
  Text's own dishes), and five reptile and amphibian meat categories — turtle, alligator, iguana, lizard, frog — are split out of the single
  herptile category.
- Extend Flavor Text's ingredient keywords, and attach selected third-party ingredients by defName: RimLife Cultivation
  Plus, RimLife Expansion Trading items, VV - New Harvest, and Chinese Traditional Cultural Things Expanded. Each entry is
  guarded, so nothing beyond Flavor Text is required and each does nothing when its mod is absent.
- Guard the four Odyssey-only reptile meats (alligator, monitor lizard, bullfrog, sea turtle) so that the mod loads
  without Odyssey.
- Add Altang, Beondegi, Bungeoppang, Jjapaghuri and Kimchijeon, with four Shenzhou attachments found through a
  registry of installed cooking mods.
- Ship English content only. The French translation is the separate companion, Flavor Text Extended - Français.

Tagged and released on GitHub 2026-09-22 (`v1.0.0`); published to the Workshop the same day, item 3806100152.

Tested before release, all headless in a running game through Pickle (see `TESTING.md`): the mod alone on Flavor Text, without
Odyssey, and beside the three 1.6 ingredient providers.
