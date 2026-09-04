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

## Work in progress

**The 896 dishes still carry French names and descriptions.** This mod came out of
splitting a French mod in two, and the English translation of its content is not
finished. Until it is, the mod is playable but displays French.

The French is already safe in the companion mod, under
`Languages/French/DefInjected/`, and will be injected back from there once the defs
switch to English.

## Companion mod

**Flavor Text Extended - Français** translates this mod and Flavor Text itself, and
replaces the inflection table with French forms. It is only useful in a French game: its
table applies in every language, since RimWorld cannot gate an XML patch on language.

## AI assistance

The content of this mod was produced with the assistance of Claude (Anthropic), under
human direction and review. The design decisions — which dishes to write, which
categories to separate, which agreements to fill in — were made and approved by the human
author.

Every dish name was checked against collisions with the 930 original defs, and every
ingredient combination verified with the tools in `_tools/`.

## Verified in game

The mod was loaded and observed in a running colony. The log reports no XPath patch
error, no def resolution error, and RimWorld's translation report flags no useless
injection and no stale key.

One defect was found there and fixed: the inflection table declared 24 meats that cannot
exist — small birds share cassowary meat through `useMeatFrom`, and Anomaly's entities
yield twisted meat. The `_tools/geninflections.js` generator still does not filter those
cases: re-running it would reintroduce them.

## Third-party mod ingredients wired in

None is required; each operation is neutralised if its mod is absent.

- **RimLife Expansion Trading items** (daylight) — dried meat, two cheeses.
- **RimLife Cultivation Plus** (daylight) — bok choy, tomato, onion, paprika, dent corn.
- **Chinese Traditional Cultural Things Expanded** (Diamond.J, DaJian, Frolg, TangWan) —
  Himalayan barley, hybrid rice, flours, salted mustard, Zhejiang citrus, chilli oil,
  ginkgo nuts, mugwort, four grain liquors. Both versions of the mod are covered, their
  `packageId`s differing.
- Miscellaneous — honeycomb, okara, mixed berries, edible arachnids, fodder.

These hooks are fragile by nature: if one of those mods renames a def, the patch stops
applying **with no error message**.

## Licence

MIT, see `LICENSE`. It covers the added defs, the patches and the tools. It does not
cover Flavor Text.
