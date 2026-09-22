# Changelog

## 1.0.0

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

Tested before release, all headless in a running game through Pickle (see `TESTS.md`): the mod alone on Flavor Text, without
Odyssey, and beside the three 1.6 ingredient providers.
