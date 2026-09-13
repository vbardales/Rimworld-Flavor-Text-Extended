# Localization and dependency validation — 2026-09-13

Base revision: `c349f360e32ecec2efc754918f4f7a76293199b6`, plus the current working tree.
Scope: Flavor Text Extended's `Mod/`, installed Flavor Text 0.3.6 for RimWorld 1.6,
and read-only inspection/testing of the current French companion. No game was launched.

## Outcome

Stage remains **options**. English resource checks and a semantic sample are complete;
the French generated-text gate has a confirmed coverage defect. The dependency and
XML checks pass after removal of four nonexistent ingredient references. This does not
certify third-party gameplay or the in-game T1-T14 campaign.

The user's original icon is unchanged: PNG **64 x 64, 7,504 bytes**,
SHA256 `DF187D000B850B446A2DA99B963621684AC2628D68F9D9016BE52C8D631B9292`.
Its accepted size/design override the general artwork convention for this mod.

## English and French resources

- Parsed all 896 dish definitions and seven category definitions: 1,799 nonempty source
  fields. English is supplied through native Def labels/descriptions, not duplicate keys.
- `_tools/Test-Localization.ps1 -CompanionMod ../FlavorTextExtendedFR/Mod` passes:
  1,799 matching French paths, 4,584 valid ingredient tokens, no duplicate/missing owned path.
- `node _tools/verifen.js` passes on 896 dishes: zero errors and zero French-word warnings.
  It reports 417 uncited slots, which filter eligibility and need not appear in text.
- Reviewed one English dish label/description from each of the 42 dish files, including
  regional culinary names, shell eggs, raw foods, desserts, meat and vegetable recipes.
  English terminology and template intent are coherent in that sample. This is a semantic
  sample, not a claim of line-by-line proofreading of every culinary assertion.
- Inspected the installed FlavorDef and CompFlavor types. Labels/descriptions use native
  Def fields; formatting retains original slot indices after ingredient sorting. The engine
  maps `plur`, `coll`, `sing`, `adj` to inflection indices 0, 1, 2, 3.
- The companion's current `Test-Language.ps1` passes against its installed DLL: non-French
  isolation, case handling, single invocation, false/exception propagation.
- The companion's current `Test-Xml.ps1` passes: 74 XML files, 1,826 dishes, 17 language-guarded
  replacements applied in memory, 186 entries in 15 tables, two joining grammars, ten
  bilingual settings strings and the Biotech folder gate. These are offline tests.

Earlier notes saying French inflections always affect English are superseded. The companion
now wraps those patches with `PatchOperationFrench`, using `Prefs.LangFolderName`. Earlier
Biotech warnings also no longer establish a missing folder gate: the current gate is tested.

## Confirmed French limitation

The supported French loadout still has uncovered ingredient inflections. A concrete case:

1. VV New Harvest (`3448458106`) declares `VV_Leeks` with label `leeks` in
   `Defs/ThingDefs_Items/VV_Raw.xml`; it has no Languages folder.
2. This extension explicitly attaches that ingredient to `FT_Leek`.
3. The companion's current predefined French dictionaries contain no `VV_Leeks` entry,
   and its translation resources do not translate that ThingDef's label.
4. Inspection of installed `InflectionUtility.AssignIngredientInflections` and
   `GenerateInflections` establishes the fallback when no predefined forms/category
   override exists. That generator does not translate ingredient vocabulary into French.
5. Invoked the installed DLL's private `GenerateInflections` method through reflection
   with the actual `VV_Leeks` defName/label and an empty form list. A FlavorCategoryDef
   surrogate with `singularCollective=false` isolated the string-generation routine from
   the live ThingDef/category databases. Observed forms: **leeks | leeks | leek | leek**.
   This is an isolated algorithm probe, not an actual meal or game session.
6. Substitution of that collective form into the companion's actual
   `FlavorTextFR_GratinDePoireaux.description` begins **leeks fendus en quatre et lavés...**.
   The other two slots were intentionally not substituted in this narrow probe.

This is a confirmed localization coverage defect, not merely an absent test report.
Adding only this one noun would not establish general fallback coverage. The French companion
needs coverage for the supported ingredient providers and an appropriate French fallback /
category grammar policy, followed by semantic and in-game regression checks. That separate
repository was not modified here. No new assembly or dependency was added to the English mod
to work around the companion's responsibility.

## Optional references and corrections

Used the shared `Search-Workshop.sh` to locate provider About.xml files. Successful search:
9,782 Workshop folders enumerated; 9,624 contained matching About.xml files, 158 contained
none; 42 matching lines. Opened actual provider metadata rather than mistaking a nested
dependency mention for that repository's packageId.

The new `_tools/Test-OptionalIngredients.ps1` validates metadata, guards and actual ThingDef
names in unconditional selected folders. Its first run failed on four nonexistent references:

| Removed reference | Claimed provider | Evidence |
|---|---|---|
| Rawleek | VGP Vegetable Garden, 2007061826 | Not declared in selected 1.6 XML or other scanned Defs. |
| Rawshallot | VGP Vegetable Garden, 2007061826 | Not declared in selected 1.6 XML or other scanned Defs. |
| VCE_RawLeek | VPE More Plants, 2748889667 | Not declared in selected 1.6 XML or other scanned Defs. |
| VV_Shallots | VV New Harvest, 3448458106 | Not declared in XML; provider has no assembly. |

Checked patch text and the VGP/VPE assembly type inventories for an alternative provider.
VGP's assembly contains bee-sprout incident behavior; VPE contains growing-zone/plant
behavior and Harmony registration, with no identified source for these supposed ingredients.
Removed the four entries from `Mod/Defs/FlavorCategoryDefs_FR.xml`. Kept verified VV_Leeks
and the categories' keyword matching; no substitute ingredient name was invented.
T8 now distinguishes the verified leek provider from an unverified shallot setup.

After correction: **43 guarded provider-reference pairs resolve** (34 are 17 Shenzhou
entries checked against each of two alternative providers).

| Provider | Selected folders | References | Declares 1.6 |
|---|---|---:|---|
| VVenchov.VVNewHarvest, 3448458106 | root | 1 | yes |
| daylight.RimLifeExTRGMod, 2951594887 | Common, 1.6 | 3 | yes |
| daylight.RLEVVCultivationPlus, 3614595617 | root | 5 | yes |
| Dajian.ChiTeaditional.Expanded, 2877536640 | root, 1.5 | 17 | no |
| Dajian.ChiTeaditional.Expanded.OldMode, 2371079000 | root, 1.3 | 17 | no |

The last two are historical optional hooks. RimWorld's installed ModContentPack selects the
latest LoadFolders version no newer than the game when an exact version is absent; this
explains the selected source folders, not a claim that those old mods work in RimWorld 1.6.

Inspected installed DirectXmlToObject list loading and ModLister identifier lookup:
individual list-entry guards are passed to cross-reference registration; identifier lookup
normalizes case/whitespace, MayRequire requires all IDs and MayRequireAnyOf permits any ID.
No provider is made mandatory. The required Flavor Text dependency and its transitive Harmony
requirement are coherent; no extra load order is required for references resolved after XML
loading. The four guarded Odyssey meats remain covered by the XML regression check.

## Regression results after changes

- `Test-OptionalIngredients.ps1`: pass, 43 provider-reference pairs.
- `Test-Xml.ps1`: pass, 50 XML files, 25 operations, four Odyssey guards.
- `Test-Localization.ps1`: pass, 903 defs, 1,799 bilingual fields, 4,584 tokens.
- `checkdefs.js`: 896 dishes, zero errors, ten unchanged warnings.
- `verifen.js`: 896 dishes, zero errors, zero warnings.
- Shared `Check-ConfigErrors.ps1` with installed Flavor Text 1.6: 903/903 defs,
  26 rules, no config error, exit 0.

No result above certifies game loading, rendering, save persistence or optional-mod behavior.
The resource tests passing alongside the French defect is expected: complete keys and valid
token syntax do not prove complete generated-language coverage.

## Runtime inputs

- Installed FlavorText.dll SHA256:
  `6F6F65F552B76D06B5C677CCB08B8ADDF0C19292A2842B863413E748DAF23130`.
- Companion FlavorTextExtendedFR.dll SHA256:
  `64005E22A1DD3C20B617A4D140E0BFBD42FB79594914EBCEF2B27ADC820FB8BA`.
- Decompiled inspection material stays under ignored `.build/inspection/`, outside Mod/
  and outside the published repository content. No upstream implementation is redistributed.

## Follow-up: confirmed leek defect corrected

The companion now ships Inflections_ExtendedProviders_FR.xml with the French-language
wrapper, packageID VVenchov.VVNewHarvest and explicit VV_Leeks forms:
aux poireaux / poireaux / poireau / de poireaux. This resolves the earlier isolated
`leeks fendus` case to `poireaux fendus`. The upstream routine selects predefined tables
by active packageID and preserves these four concrete forms.

PowerShell 7 verification passes: companion XML (80 files and the additional provider
assertions), fallback helper from the compiled DLL, production prefix with host doubles,
language isolation, extension XML and bilingual path/token coverage. Windows PowerShell
5 attempts failed on UTF-8 interpretation; the successful runs used PowerShell 7.
No in-game execution is claimed. Earlier runtime hashes/manifests are historical snapshots.
Full semantic review and arbitrary third-party label translation remain unverified.

## Optional ingredient grammar follow-up — 2026-09-13

Added reviewed French forms for 25 further ingredients to the companion's
Inflections_ExtendedProviders_FR.xml. Together with VV_Leeks, five package-scoped tables
cover all 43 explicit optional provider-reference pairs (26 unique ingredients).
Translations were checked against installed provider labels/descriptions; source meanings
include dried meat, aged cheese, pak-choi, dent corn, Tibetan barley and processed rice.
This covers explicit references, not every ingredient discoverable through keyword matching.
Shenzhou compatibility on RimWorld 1.6 remains unverified.

Corrected Alegria's `avec {2_plur}` double preposition to `puis mélangé {2_plur}`.
Passed: provider existence and full cross-table coverage, companion XML (80 files),
1,799 bilingual fields / 4,584 tokens, installed fallback helper and production prefix
with host doubles. Original ModIcon hash remains
DF187D000B850B446A2DA99B963621684AC2628D68F9D9016BE52C8D631B9292.

The 896 dish translations have not received a complete sentence-by-sentence semantic
review. Localization remains partial for that reason. RimWorld was not running and no
in-game scenario was executed; T1-T14 remain pending. These results do not promote stage.
