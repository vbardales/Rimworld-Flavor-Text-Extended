# Attributions

## Required mod

**Flavor Text** (hekmo) — [Workshop 3245374432](https://steamcommunity.com/sharedfiles/filedetails/?id=3245374432)

This mod is an extension of Flavor Text: it contains none of its files, does not
redistribute it, and does not work without it. All the machinery — how dish names are
composed, the weighted draw by specificity, ingredient inflection — is hekmo's work.
Flavor Text remains under its own terms.

The added defs inherit from `FlavorDef_Base`, defined by Flavor Text, and the XPath
patches modify its ingredient categories at load. Nothing is copied: def inheritance
resolves globally in RimWorld, and a patch does not duplicate what it targets.

Flavor Text's compiled assembly was decompiled once, locally, to understand how the
engine picks a name among the candidate defs. **That decompilation is neither
distributed nor version-controlled.** What it established is recorded as comments in the
relevant files: selection is a weighted random draw and not a "most specific wins", and
an ingredient slot recursively accepts child categories — which corrected several wrong
conclusions about coverage.

## Standalone extension

This repository contains 896 dishes with English source labels and descriptions,
seven ingredient categories and ingredient patches. Established culinary names
retain their original spelling where appropriate. The French dish translations
are maintained in the separate companion's `Languages/French/DefInjected/` folder.

## Companion mod

**Flavor Text Extended - Français** translates this mod and Flavor Text itself. Its current
compiled language wrapper limits French inflection and joining-grammar patches to French.
This wrapper belongs to the companion, not to this extension. Untabled ingredient fallback
still requires work before full French coverage can be certified.

## AI assistance

The content of this mod was produced with the assistance of Claude (Anthropic), under
human direction and review. The design decisions — which dishes to write, which
categories to separate, which agreements to fill in — were made and approved by the human
author.

Codex (OpenAI) assisted with documentation, validation and artwork corrections.
The replacement cooking mascot was edited with OpenAI's built-in image generation tool.

Every dish name was checked against collisions with the 930 original defs, and every
ingredient combination verified with the tools in `_tools/`.

## Verification scope

An earlier combined-mod attribution recorded a colony test and an inflection-table fix
for 24 nonexistent meats. That historical result concerns the work before the split;
it does not certify this standalone revision or its companion. The original audit and
its results remain in `STATUS.md` and the Git history.

Current offline results are recorded in `STATUS.md`; manual scenarios and their
execution status are recorded in `TESTS.md`. No completed in-game validation is claimed
for the current standalone working tree.

## Third-party mod ingredients wired in

None is required; each provider-specific attachment entry is guarded when its mod is absent.

- **RimLife Expansion Trading items** (daylight) — dried meat, two cheeses.
- **RimLife Cultivation Plus** (daylight) — bok choy, tomato, onion, paprika, dent corn.
- **Chinese Traditional Cultural Things Expanded** (Diamond.J, DaJian, Frolg, TangWan) —
  Himalayan barley, hybrid rice, flours, salted mustard, Zhejiang citrus, chilli oil,
  ginkgo nuts, mugwort, four grain liquors. Both versions of the mod are covered, their
  `packageId`s differing.
- Miscellaneous — honeycomb, okara, mixed berries, edible arachnids, fodder.

These hooks depend on external defNames and package IDs. Inactive guards can silently
omit an entry; a renamed active reference can instead generate a load error. The test
plan checks logs and actual categorization separately.

## Licence

MIT, see `LICENSE`. It covers the added defs, the patches and the tools. It does not
cover Flavor Text.
