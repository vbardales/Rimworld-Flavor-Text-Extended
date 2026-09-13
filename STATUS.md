---
mod:          Flavor Text Extended
packageId:    nelim.flavortextextended
repo:         Rimworld-Flavor-Text-Extended
remote:       https://github.com/vbardales/Rimworld-Flavor-Text-Extended.git
visibility:   public
detached:     yes
stage:        options
settings_audit: not_applicable
localization: complete
translation_en: complete
translation_fr: not_applicable
dependencies: verified
automated_tests: passed
xml_tests: passed
licence:      original
licence_at:   LICENSE and Mod/LICENSE (MIT); ATTRIBUTION.md
maintainer:    current Codex task for this repository
updated:      2026-09-13
tested_on:
workshop:
remaining:
  - "unverified: Execute and record applicable T1-T14 in-game scenarios; French integration belongs to the separately installed companion."
---

# Flavor Text Extended — status

## Scope correction requested by user — 2026-09-13

This repository ships English content. All French translations belong to the separate
Flavor Text Extended - Français companion, per the user's explicit architecture decision.
Moved the seven category labels there as Extended_Categories.xml; no French language
resource remains in this Mod/. The About description now links directly to the companion
and explains that it is installed alongside both dependencies. README agrees.

English coverage remains complete. French is not applicable to this distribution;
companion semantic review does not block the English localization gate. Prior entries
that coupled this repository's status to full French review are superseded here.
No stage promotion or in-game pass is inferred from this scope correction.
The optional cross-repository validator now reads French resources only from the companion:
1,799 bilingual fields and 4,584 tokens pass. English XML validation: 49 files, 25 patches,
four Odyssey guards pass. Technical defNames containing FR remain stable identifiers.

## Follow-up correction — 2026-09-13

The confirmed VV_Leeks gap below is now corrected by the companion's new
`Mod/Patches/Inflections_ExtendedProviders_FR.xml`: French-only, package-scoped forms
`aux poireaux / poireaux / poireau / de poireaux`. This task added that isolated file
and its XML assertions. The companion independently now includes a compiled French
fallback and category grammar updates; existing source changes were preserved.

Verified with PowerShell 7: installed fallback helper, production prefix with host doubles,
language isolation, both XML suites and 1,799 bilingual extension fields all pass.
The companion XML suite covers 80 files, plus the new table's identity and exact forms.
These are offline checks. Arbitrary untranslated third-party labels and complete semantic
coverage remain outside this verification; stage stays `options` pending that review.
The original 64x64, 7,504-byte ModIcon remains unchanged. Earlier manifests and dependency
hashes describe their recorded snapshots and predate this companion update.

## Latest localization/dependency verification — 2026-09-13

See `VALIDATION-2026-09-13.md` for the current evidence, checked dependency hashes and
distinction between offline checks and in-game validation. This section supersedes older
remaining-work statements below without deleting their historical results.

- Original ModIcon rechecked: **64x64, 7,504 bytes**, unchanged and accepted by the user.
- English resources: complete native coverage, valid tokens, zero French-word warnings;
  semantic sample reviewed across all 42 dish files. `translation_en: complete` does not
  mean the English game interface was exercised.
- French paths/tokens and the current companion's language isolation tests pass. Its
  generated ingredient fallback still has a **confirmed defect**: the installed generator
  produces `leeks` for untabled VV_Leeks, contaminating a French gratin description.
  `localization` and `translation_fr` remain `partial`. The cumulative stage remains `options`.
- Found and removed four invalid optional ingredient references (Rawleek, Rawshallot,
  VCE_RawLeek, VV_Shallots); verified VV_Leeks and keyword matching remain. No companion
  source or published artifact was modified by this task.
- Dependency identifiers, actual folder selection and 43 remaining guarded provider-reference
  pairs verified. Historical Shenzhou hooks are structurally checked but do not certify the
  providers' game compatibility on 1.6. No runtime integration test is claimed.
- Reran XML, localization, reference and config regression checks successfully. Updated T8,
  T11 and documentation for the actual providers and the companion's new language guard.
- No build applies to this extension. `done`/`tested` remain unavailable until the French
  coverage defect is resolved and the remaining workflow gates are satisfied.

Working-tree base remains `c349f360e32ecec2efc754918f4f7a76293199b6`. Older manifests are
historical snapshots, not claims about the changed category file or restored icon.
`AUDIT-2026-09-13-validation.json` identifies the latest checked files.

## User-selected icon — 2026-09-13

Restored `Mod/About/ModIcon.png` byte-for-byte from `Art/archive/ModIcon-before-fix.png`
at the user's explicit request. The original 64x64, 7,504-byte icon with its ribbon
lettering is the approved design; this preference overrides the general icon size and
no-text conventions for this mod. Stage remains `options`. The replacement icon and
its generation notes below are historical, not the currently delivered asset.
`AUDIT-2026-09-13-fixed.json` records the prior replacement; the restored icon matches
SHA256 `DF187D000B850B446A2DA99B963621684AC2628D68F9D9016BE52C8D631B9292`.

## Current correction results — 2026-09-13

**Stage: `dansMonoRepo` -> `options`.** This is the literal workflow state: documentation,
icon, Preview, naming/description and the justified no-settings gate now pass cumulatively.
The repository remains detached and public. No commit or publication was performed.
`options` is followed by `l10n`; the language fields remain `partial` because full semantic
and dependency-grammar review is not claimed. Passing automated resource tests is recorded
independently instead of silently certifying every remaining localization criterion.

Audited base remains `c349f360e32ecec2efc754918f4f7a76293199b6`; fixes are working-tree changes.
Pre-existing edits were preserved. `AUDIT-2026-09-13.json` remains the historical pre-fix
manifest; `AUDIT-2026-09-13-fixed.json` identifies the corrected files and validation tools.

### Corrections delivered

- Added an English CHANGELOG and corrected README's standalone distribution layout,
  keyword-matching explanation and historical estimates. Reconciled attribution and
  licence scope, with identical copies in Mod/. Upstream rights are unchanged.
- About.xml now ends with `[url=...]Source code on GitHub[/url]`.
- Installed a corrected **128x128 PNG icon, 13,589 bytes**, without the lettered ribbon.
  Built-in imagegen was used; source and final prompt are preserved in Art/.
- Rebuilt the **896x504 Preview, 553,178 bytes**, from the unchanged illustration source.
  `Extended` is 65% size in tan secondary ink; the green accent is distinct from the
  wood/food browns. Added the declared 1.6 badge. Composition and palette are reproducible
  through `Art/render-preview.ps1`, `Art/preview.html`, `Art/preview-palette.json`.
  Previous delivered images are preserved in `Art/archive/`.
- Directly inspected both final images and 268px/32px review thumbnails. Title, suffix,
  subject and version remain identifiable; no clipped text or letters on the icon.
  Segoe UI is installed and selected in CSS; rendering waits for local font loading.
  Conservative contrast bounds against the veil are **11.67:1 title, 7.31:1 suffix,
  7.01:1 summary**; badge text is **9.94:1**. These bounds assume even white source pixels
  behind the corresponding text boxes, rather than relying on one favorable sample.
- Rewrote the four patch files' comments in English: matching considers defNames and labels;
  guards on individual entries matter; a missing active reference may produce a load error.
  Ingredient attachments and recipe data were not changed by these comment corrections.
- Added seven native French category labels. Dish translations remain in the separate
  companion; no sibling repository was modified. A supported French loadout still needs it.
- Corrected T4 and T10 expectations and added T13/T14 for French text/UI and both
  new-game/existing-save contexts. T1-T14 are explicitly **not executed**, with a result
  recording contract. No settings or customization integration was invented.

### Revalidation

- `_tools/Test-Localization.ps1 -CompanionMod ../FlavorTextExtendedFR/Mod`: **PASS**,
  903 owned defs, **1,799 nonempty EN fields and matching FR paths**, **4,584 valid
  ingredient tokens**, no duplicate, missing or unknown owned path. This is structural
  coverage of the explicit combined French loadout, not proof of semantic quality or game UI.
- `_tools/Test-Xml.ps1 -FlavorTextDefs <installed Flavor Text 1.6 Defs>`: **PASS**,
  **50 XML files, 25 patch operations, four Odyssey guards**.
- `node _tools/checkdefs.js <installed Flavor Text 1.6 Defs>`: **0 errors, 10 warnings**,
  unchanged shared-combination/similar-label warnings across 896 dishes.
- `node _tools/verifen.js`: **0 errors, 0 warnings**, 417 deliberately uncited slots.
- Shared `Check-DefInjected.ps1` against the French companion, this mod and installed
  Flavor Text 1.6, with FlavorText.dll supplied: **3,652 keys, 0 errors**. Six warnings
  concern upstream Biotech dish descriptions in the companion, not this extension's
  owned paths. Those companion/DLC conditions remain outside this fix and are not
  presented as validated runtime behavior.
- The same shared checker run on this mod's new French category resources reports
  **7 keys, 0 errors**. Both shared checker processes exited successfully.
- Compared patch XML against HEAD with comments/whitespace removed: all four files have
  unchanged patch data. LICENSE and ATTRIBUTION distributed copies are byte-identical.
- `git diff --check` passes; final file hashes are recorded in the post-fix manifest.
- The previous **903/903 config-def validation** remains applicable to recipe/category
  structure: only comments changed in patches and the new DefInjected file changes text.
  No assembly/build is applicable. The settings audit remains `not_applicable`.

### What remains

The concrete defects from the preceding audit are corrected. The next gate (`l10n`)
still needs the remaining semantic/terminology and dependency grammar review; subsequent
optional-provider checks and in-game T1-T14 are separate, unverified work. No observed game
failure or required feature correction is inferred from those missing checks.

## Historical cumulative workflow audit — 2026-09-13 (before corrections)

This section supersedes the historical assessment below; historical results are preserved.
The user's supplied workflow takes precedence over the four shared protocols, including
its explicit exemption from in-game testing at the settings gate when no settings are useful.

**Previous stage: `awaiting-manual-tests` (intended equivalent: `done`). Retained stage:
`dansMonoRepo`, the baseline before the first fully satisfied transition.** This is a
workflow gate value, NOT a claim that the repository is physically in a monorepo.
`detached: yes` remains true. No post-baseline state has all its cumulative criteria met.
The missing initial documentation blocks `horsMonoRepo`; no move or remote restoration
is required. Subsequent labels map literally to the supplied workflow:
`horsMonoRepo`, `ModIcon générée`, `Preview générée`, `preOptions`, `options`, `l10n`,
`preTest`, `done`, `tested`. `done` means ready for final in-game validation only.

### Scope and revision

- Independent root: `C:\Users\nelim\Documents\rimworld\FlavorText\FlavorTextExtended`.
  Distributed folder: `Mod/`; `_tools/` and `Art/` are outside that folder.
- Audited HEAD: `c349f360e32ecec2efc754918f4f7a76293199b6`, plus the working tree.
  At entry, modified tracked files were `Mod/About/About.xml`, `STATUS.md`, `TESTS.md`,
  `_tools/checkdefs.js`; `_tools/Test-Xml.ps1` was untracked. These changes were preserved.
  This audit changes only STATUS.md and adds the hash manifest `AUDIT-2026-09-13.json`.
- Read `../../AGENTS.md`, `../../PUBLISHING.md`, `../../STYLE_RIMWORLD.md`,
  `../../MOD_SETTINGS.md`, `../../TRANSLATIONS.md` and the user-supplied workflow.
- Live read-only verification: `git ls-remote origin HEAD` returned the audited SHA;
  `gh api repos/vbardales/Rimworld-Flavor-Text-Extended` returned `private: false`,
  `visibility: public`, default branch `main`. Initial sandbox networking failed;
  the authorized read-only retry succeeded. No commit, push, publication or game launch.

### Ordered transition assessment

| Transition | Independent result and evidence |
|---|---|
| dansMonoRepo -> horsMonoRepo | **Defect.** Standalone Git, GitHub remote, pushed commit, public visibility, initialized STATUS and coherent identity are validated. `CHANGELOG.md` is absent. LICENSE and Mod/LICENSE retain a French scope paragraph about the former French translation. Both identical ATTRIBUTION copies incorrectly say the English translation is unfinished; README describes an obsolete distribution layout and says tools ship with the mod. Initial documentation is not coherent with the actual standalone distribution. |
| horsMonoRepo -> ModIcon générée | **Defect.** Installed PNG is 64x64, 7,504 bytes, versus the 128x128 format in STYLE_RIMWORLD.md. Direct inspection also shows lettering on the mascot ribbon despite the icon no-text rule. No source project, assembly or build output is shipped: compilation is **not applicable, justified** for this XML content mod. No missing feature was inferred from the audit. |
| ModIcon générée -> Preview générée | **Validated independently.** Installed PNG is 896x504, 746,899 bytes, below 1 MB. Directly inspected: dishes on a wooden surface, overhead oblique view, English title and summary, no clipped text. No concrete camera defect identified; no historical generation record or comparison screenshot is required. |
| Preview générée -> preOptions | **Defect.** `Extended` is an extension suffix, explicitly exemplified in STYLE_RIMWORLD.md, but appears at full size and in the same primary ink. The secondary suffix treatment is absent, so secondary/accent separation is not established. Accent is amber in a predominantly brown/ochre scene. No version badge is visible; the guide describes the new badge treatment as experimental, so this is recorded separately, not used as an extra gate. About description is English, but its final raw GitHub URL does not satisfy the prescribed labelled Steam link. No private/unofficial suffix is warranted by the documented original/public classification. |
| preOptions -> options | **Not applicable, justified; independent gate passed.** See settings audit below. |
| options -> l10n | **Non-verified in full.** English Def values exist and automated checks pass, but exhaustive semantic review and dependency translation mechanisms were not fully verified. Mod/ has no Languages directory. The separate French companion supplies all 1,792 dish label/description entries; it was inspected read-only and is not bundled or required by this mod. Full companion injection paths, grammar parameters and seven category labels remain unverified. Do not mistake the companion's presence for verified FR coverage of this standalone loadout. |
| l10n -> preTest | **Partially validated; non-verified remainder.** Actual FlavorText.FlavorDef/FlavorCategoryDef and FlavorDef_Base usage matches declared hekmo.FlavorText dependency. Installed upstream About identifies 0.3.6, supports 1.6 and declares Harmony itself; no redundant direct Harmony requirement is needed for this XML mod. Local loadAfter is coherent. No local LoadFolders or compiled integration exists. Odyssey and optional ingredient entries carry conditional guards. Full optional-mod identifier, reference and loader-semantics verification was not executed; XML test limitations below apply. |
| preTest -> done | **Partial.** Written T1-T12 scenarios include setups and expected outcomes; repeatable automated/XML tests were rerun successfully. Plan lacks explicit French UI/generated-text validation and explicit new-game plus existing-save coverage. T4's expectation with its mandatory dependency forcibly absent needs verification against actual loader behavior; do not certify it from the text. |
| done -> tested | **Non-verified.** No scenarios executed in game in this audit, no current-revision FR/EN UI inspection, no validated log evidence, no new/existing-save regression run. Historical attribution claims are not results for this revision. |

### Settings audit

`settings_audit: not_applicable`. Inventory: 896 static dish definitions, seven ingredient
categories and four patch files; no configuration file or per-user preference is introduced.
Behavior depends on ingredients, meal categories and the dependency's naming engine.
Changing authored recipes/category membership is content editing, not a missing user setting.
The engine's own settings remain owned by Flavor Text; this extension adds no setting to it.
File inventory and search of Mod/ found no C# assembly, ModSettings, SettingsCategory,
MainButtonDef or settings UI patch. Thus no empty settings page or shortcut is introduced.
Default values, entry bounds, persistence and shortcut equivalence tests are not applicable
to this extension. No RIMMSQOL or other customization integration was tested or claimed.
The user's interpretation expressly makes source verification sufficient in this case.

### Translation audit

Inventory from parsed XML: 896 FlavorDefs with label and description (1,792 fields),
seven category labels: **1,799 nonempty source fields**. No player-facing patch text or
code-owned UI was found. Matching keywords, defNames and package IDs are technical data,
not missing translations. Native English Def values are valid EN resources; no redundant
English DefInjected files are required. Representative dish descriptions are English;
proper culinary names are not automatically translation defects.

`node _tools/verifen.js` checked all 896 dishes: **0 errors, 0 warnings**, 417 ingredient
slots intentionally not cited by text. This checks slot indices and French-word heuristics,
not complete translation semantics. `translation_en: partial` records that limit.
Read-only comparison with `../FlavorTextExtendedFR/Mod/Languages/French/DefInjected/FlavorText.FlavorDef`
found **zero missing/empty dish label or description entries**. That does not verify all
paths, tokens, category-label visibility, upstream grammar resources or runtime loading.
`localization` and `translation_fr` remain `partial`; no requirement to copy the companion
into this repository is inferred. A French-ready supported loadout must be verified.

### Executed checks and limits

Upstream Defs argument used below:
`C:/Program Files (x86)/Steam/steamapps/workshop/content/294100/3245374432/1.6/Defs`.

- `node _tools/checkdefs.js <upstream Defs>`: exit 0; **896 dishes, 0 errors,
  10 warnings**. Nine shared ingredient combinations and one similar label are warnings,
  not ten demonstrated runtime defects. Collision checks use the tracked upstream snapshot
  `flavordefs.json`; this is not a fresh exhaustive upstream-label comparison.
- `./_tools/Test-Xml.ps1 -FlavorTextDefs <upstream Defs>`: exit 0; **49 XML files parsed,
  25 operations matched and applied in memory, four Odyssey guards verified**.
  Reviewed test implementation: applies all operations against upstream XML without
  simulating game conditional loading. It does not prove optional ThingDefs resolve.
- `node _tools/verifen.js`: exit 0 with the results above (the script reports counts;
  counts, not exit code alone, were checked).
- `../../scripts/Check-ConfigErrors.ps1 -ModPath ./Mod -AlsoScan
  <upstream 1.6 folder> -Brief`: exit 0; **903 of 903 defs, 26 rules, no config error**.
  This shared external checker complements the repository tests; it is not the game.
- `git diff --check`: exit 0. The hash manifest records the actual delivered files and
  relevant validators/documentation, including the pre-existing uncommitted changes.
- Image dimensions/format/bytes read with System.Drawing; both delivered images opened
  directly with view_image. No game screenshot inspection or generated-image provenance
  claim. No visual regeneration performed.

### Next transition and optional recommendations

Strictly next: initialize an English CHANGELOG; make the existing English documentation
and both licence scope notes accurately describe this standalone extension, keeping the
upstream exclusion and established original/MIT provenance. No new licence grant for
upstream content, repository move or republishing is needed. Later image, translation,
dependency and test-plan gates remain separate as listed above.

Optional: retain a reproducible Preview composition/palette when revising its suffix;
consider the experimental version badge. Neither missing historical generation evidence
nor an unrecorded camera comparison is a blocker. No game failure is inferred merely
because an interactive verification has not been performed.

## Historical assessment (preserved; superseded where contradicted above)

This task owns and maintains this file when work or verification changes the status.
Scope: `C:\Users\nelim\Documents\rimworld\FlavorText\FlavorTextExtended` only.
Git reports this directory as its top-level, with a local `.git`, no superproject and
one remote (`origin`). This is an independent repository, not the former monorepo.
The French companion is a separate repository and is not managed by this task.

## Identity and publication

- Mod name: **Flavor Text Extended**; author: **nelim**.
- Package ID: `nelim.flavortextextended`.
- Remote: https://github.com/vbardales/Rimworld-Flavor-Text-Extended.git
- GitHub visibility: **public**, verified using GitHub's repository API on 2026-09-13
  (`private: false`, `visibility: public`).
- Title suffix: **Extended** (65% size, secondary ink in the preview overlay). No additional suffix is needed;
  this is neither a translation nor an unofficial reupload of the original files.
- GitHub link: present in both `About.xml/url` and the visible description (added today).
- Workshop: no publication ID in the current mod files; publication is not verified.

## Mod licence and visibility rationale

**Classification: `original`. Licence: MIT. Visibility: public.**
The distributed mod adds its own dish definitions, categories and patches. It depends
on hekmo's Flavor Text and does not bundle its engine. This is the rationale documented
in ATTRIBUTION.md; dependency alone does not turn this extension into a redistribution.
The classification describes provenance, while MIT is the explicit licence of this mod.
`open` would describe reused material with an explicit licence; `forbidden` a written
prohibition; `silent` a source without explicit permission. None is the documented basis
for the content added here. This is a repository provenance assessment, not a fresh
legal audit of every text.

The MIT files still mention the French translation, and ATTRIBUTION.md retains older
claims about French content and in-game verification from before the split. Those
claims are not evidence that this standalone English mod passed its manual tests.
Upstream Flavor Text remains subject to its own terms.

## Verification on 2026-09-13

- Manual functional scenarios: **12 present**, T1-T12 in TESTS.md, with setups and
  expected results. **Not executed or attested for this standalone mod**; `tested_on`
  remains empty. A missing ModsConfig entry would not prove the mod was never loaded.
- `node _tools/checkdefs.js <Flavor Text 1.6 Defs>`: **896 dishes, 0 errors,
  10 warnings** (shared ingredient combinations and a similar label). French comparison
  is now explicitly opt-in via argument 3; no sibling repository is required by default.
  Original-name collision comparison uses the checked-in `flavordefs.json` snapshot.
- `_tools/Test-Xml.ps1 -FlavorTextDefs <Flavor Text 1.6 Defs>`: **49 XML files parsed,
  25 patch operations matched and applied in memory, four Odyssey guards passed**.
  This checks real upstream XPath targets, not only XML syntax. It does not emulate
  RimWorld's conditional loader or prove every optional mod's ThingDef exists.
- Shared external `../../scripts/Check-ConfigErrors.ps1`: run with `-AlsoScan` pointing
  to Flavor Text 1.6: **903 of 903 defs, 26 rules, no config error (exit 0)**. This optional tool is outside this repository.
- No C# assembly or build: automated validation targets XML content and references.
  In-game ingredient attachment, random dish selection and save/reload remain manual.

## Remaining work

1. Run T1-T12, recording game version, modlist, date and relevant log evidence.
2. Correct old comments that claim matching uses labels alone: the engine also reads
   defNames. The public About description was corrected today; patch comments and T10
   need a case-by-case audit before claiming all explicit attachments are necessary.
3. Reconcile the two attribution files and the MIT scope note with the standalone mod.

Historical reference only: on 2026-09-12, the active-profile estimator reported
222/1826 eligible dishes, including 35 from this extension. This estimate depends on
the modlist and does not substitute for an in-game result.

## Preview overlay rule — 2026-09-13

Shared STYLE_RIMWORLD.md and RECOMPOSER_PREVIEW.md now explicitly classify Extended
and Plus as title suffixes when they identify an extension or variant: 65% size,
secondary ink, kept inside the title. Official metadata names remain unchanged.
For this mod: Flavor Text is the main title and Extended is the suffix.
Documentation updated only; the existing preview has not been regenerated.

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

## FoodCourt discovery integration — 2026-09-13

Added five independently written English dish definitions in FlavorDefs_FoodCourtDiscovery.xml:
Altang, Beondegi, Bungeoppang, Jjapaghuri and Kimchijeon. Total now 901 dishes.
Descriptions explicitly identify the colony adaptations where categories cannot represent
fish roe or silkworm pupae precisely. No Korean Cuisine assets or prose were copied.
Four direct Shenzhou attachments added: RawDaBaiCai/Cabbage, RawLianOu/Lotus,
RawLvDou/Bean, WorkedFenTiao/Flour (the upstream dough category). References are guarded
for the verified current Shenzhou package; no new mandatory dependency.
RawZongYe remains excluded as a wrapping leaf. The other registry candidates require
individual review and are not automatically promoted to ingredients or dishes.

Checks: 901 dishes, zero errors, ten unchanged warnings; 47 optional references verified;
51 XML files and 29 patch operations pass. No in-game execution. French translation work
was sent to the companion task with the exact new keys and ingredient indices.
The historical FoodCourt comparison is the pre-integration snapshot.
