---
mod:          Flavor Text Extended
packageId:    nelim.flavortextextended
repo:         Rimworld-Flavor-Text-Extended
remote:       https://github.com/vbardales/Rimworld-Flavor-Text-Extended.git
visibility:   public
detached:     yes
stage:        prepublished
stage_meaning: release-ready state established after the owner explicitly waived the pending capture review; v1.0.0 tag and GitHub release both target the packageId introduction commit 5ba5fe7
in_game_validation_owner: sessions, through Pickle in the WSL game, on the owner's request 2026-09-21; no manual scenario is left
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
updated:      2026-09-22
tested_on:    "2026-09-21, RimWorld 1.6.4871 rev600 (Linux depot in WSL, Xvfb), English, all five DLCs except in the Odyssey pass. Pickle passes: sans-facultatifs 10/10 (+ T7 alone 1/1), sans-odyssey 3/3, avec-facultatifs 6/6 on its rerun. Reports in Tests/Pickle/results/."
workshop:     3806100152
remaining:
  - "note: the owner explicitly waived the pending Workshop capture review on 2026-09-22. The three @review scenarios remain available for a future visual refresh, but do not block this prepublished status."
  - "validated: v1.0.0 is an annotated tag at 5ba5fe7 (the first commit containing packageId nelim.flavortextextended and version 1.0.0); the GitHub v1.0.0 release explicitly targets that same commit."
  - "note: the FRENCH section's link now points at the companion's Workshop item (3806100488), matching what the owner put live. That item returned Steam's private-item error page when checked anonymously on 2026-09-22: the link will not work for visitors until it is switched to public."
  - "note: git history does not cleanly attribute Claude vs ChatGPT/Codex. 34 of 81 commits carry no AI co-author trailer, and the split does not follow date or content (some same-day translation commits have a Claude trailer, some do not). ATTRIBUTION.md says this plainly rather than guessing a boundary."
  - "limits, not blockers: each Pickle pass passed once; no cook walks to a stove (no tick passes in 03-cooking); Chinese Traditional Cultural Things Expanded declares no 1.6 and is not certified; no shallot provider is certified."
  - "unverified: the two expansion steps moved to PickleTools (ExpansionSteps) after the sans-odyssey pass passed 3/3 with them in this suite's own assembly. A rerun attempt on 2026-09-22 refused with exit 2 (\"Sa partie Windows tourne\"): the owner's own Windows RimWorld was open, and the script correctly declined rather than queue past it. The owner asked explicitly not to requeue it now: the rerun is deferred to after publication, not treated as a prepublished blocker."
  - "note: Pickle's no-errors step counts errors while a scenario runs, not at load. Load-time quiet was read from each Player.log."
  - "note: the run scripts look for <rimworld>/<Mod>/. A junction <rimworld>/FlavorTextExtended, made 2026-09-21 and ignored by the root .gitignore, bridges it. Never delete it recursively."
---

# Flavor Text Extended — status

## Prepublication alignment — 2026-09-22

**Stage advanced: `tested` -> `prepublished`.** The owner explicitly waived the still-pending
Workshop capture review. This is a scoped publication decision, not a claim that the three
`@review` captures were generated or inspected.

The public annotated tag `v1.0.0` was moved to
`5ba5fe73dd4c1b939575c6676b601bd08049cc96` (`Flavor Text: both mods publish Mod/`), the first
revision that contains both `packageId` `nelim.flavortextextended` and version `1.0.0` in
`Mod/About/About.xml`. GitHub release `v1.0.0` was edited to target that exact commit. The local
tag object, remote tag and GitHub release metadata were checked after the update. The working
tree is clean.

## Capture-suite completion — 2026-09-22

`06-workshop-captures.feature` now stages the shared development-only package
`nelim.pickletools.screenshotmode` through `wsl-deps.workshop-captures.map`. It opens each
asserted meal card, hides the HUD and Pickle-owned windows, waits for three rendered frames inside
the shared step, takes its screenshot, restores the interface, and closes dialogs. Its
`AfterScenario` restoration also covers a failed scenario. The three review targets and their
Workshop order are now identical in the feature, `Tests/Pickle/README.md`, `TESTS.md` and
`PUBLICATION.md`. T7 is no longer `@wip`: its dedicated 1/1 passing report establishes the
representative four-ingredient scenario.

No pure manual scenario remains. The historical T1-T14 prose is retained as a plan record; every
applicable extension behavior is covered by the Pickle matrix or is justified not applicable/
unverified (French companion, unsupported Shenzhou/shallot provider, or RimWorld behavior).
The sole human action is to open the three generated captures and approve their legibility and
order. No audio is involved.

Both step assemblies rebuilt with zero warnings. `Tests/Pickle/Check-Steps.ps1` compiles all 12
local expressions without duplicates. The new ScreenshotMode assembly and About.xml parse, but
its capture pass is unverified: `Pickle-Status.ps1` reported another WSL run in progress, so this
session did not launch, stage, interrupt or queue a game. The workflow stage remains `tested` until
the three images exist and are inspected; `prepublished` is not claimed by this source change.


## Workflow audit — 2026-09-22

**Previous recorded stage: `published`. Retained workflow stage: `tested`.** Audited
`d5bd2df039e6e6a523995a0e065c0e4ea65f5f27`, equal to `origin/main` after the capture-suite push;
the working tree was clean before this record. The Workshop item and GitHub release remain
historical facts, recorded below. They do not satisfy a gate whose required work is absent.

The earlier transitions through `tested` remain established. Re-run today, all outside the
game: `checkdefs.js` reports 901 dishes, zero errors and ten known warnings; `verifen.js`
reports zero errors or warnings; `Test-Xml.ps1` parses 51 XML files, applies 29 operations and
verifies four Odyssey guards; `Test-OptionalIngredients.ps1` resolves all 47 guarded pairs;
and `Test-Localization.ps1` verifies 908 owned defs, 1,809 English fields/French paths and
4,614 valid tokens. `Check-Steps.ps1` compiles all 12 locally declared patterns without a
duplicate. It leaves 59 built-in/PickleTools lines outside its local pattern table and reports
one unused local pattern; this is a maintenance reserve, not evidence that the recorded game
runs failed. No RimWorld was launched for this audit.

The stored reports still support `tested`: bare full pass 10 passed / 1 skipped,
the separate T7 pass 1/1, sans-Odyssey 3/3, and the optional-provider rerun 6/6; every final
report says `exitReason: passed`. The later move of two expansion steps to PickleTools has not
been rerun because the launcher correctly refused while the owner's Windows game was running;
that remains unverified, not a defect in the mod.

`tested -> prepublished` is **not established**. `06-workshop-captures.feature` contains three
`@review` scenarios but has no result report or image. A green scenario would still not replace
opening and inspecting every capture; no capture order can therefore be justified. Separately,
current main includes post-tag audit and capture-suite commits, while `v1.0.0` points to `3ad2e74`; the GitHub
release is public and final, but its body is the earlier CHANGELOG text and no longer equals the
current 1.0.0 section. The metadata and the repository must be aligned before this release is
reproducible at the claimed version.

The release-ready metadata itself was checked: About.xml parses; it states package ID
`nelim.flavortextextended`, version 1.0.0, one hard dependency, the adoption clause, named
Claude/ChatGPT/DALL-E credits, THANKS, and the final GitHub source link. Root/distributed
LICENSE and attribution copies have identical hashes. Preview and icon dimensions remain
896x504 (553,178 bytes) and 128x128 (32,999 bytes). `PublishedFileId.txt` is committed and
contains 3806100152. These results do not remove the two prepublication blockers above.


## Description corrected to match what is live, and credited mods linked — 2026-09-22

The owner posted her own corrected description directly on Steam: the AI-GENERATED paragraph now names Claude
(Anthropic) and ChatGPT (OpenAI) for the writing, and DALL-E (OpenAI) for the icon and Preview images, replacing
the earlier "tools not recorded". She also asked why THANKS did not link the credited mods' Workshop pages -
no technical reason, Steam's description field takes the same `[url=...]` BBCode as comments; it simply followed
the no-link convention already used by every other mod in this collection (checked: SkillIcons, ArchitectStudio,
BillAutopilot, AnimaSong). She asked for links from here on, and to document the change rather than leave it a
silent one-off; `../../PUBLISHING.md` now says both: name the actual AI tools, and link a credited mod's own
Workshop page when it has one.

`Mod/About/About.xml` (repository copy) and both `ATTRIBUTION.md` copies were updated to match: THANKS entries
linked, the AI-GENERATED wording matching what is live, and the FRENCH section's link switched from the
companion's GitHub repository to its Workshop item (3806100488) - which is **not yet public** (Steam's anonymous
error page, checked directly), so that link will not resolve for a visitor until the owner switches it. The
repository's `About.xml` does not resync to Steam on its own; matching it here is for accuracy and for whoever
reads the repository, not a claim that Steam's live page was changed by this session.

Asked to trace which commits ChatGPT/Codex actually touched: git history does not support a clean answer. 34 of
this repository's 81 commits carry no `Co-Authored-By` trailer at all, and the split does not track date or
content - some commits from the same day and the same kind of work (English translation batches, 2026-09-01) have
a Claude trailer and others do not. `STATUS.md`'s own `maintainer` field reads as unchanged boilerplate across
audits rather than a per-commit signal. ATTRIBUTION.md now says this plainly instead of asserting a boundary the
history does not show; a precise split would need the owner's own memory of which session ran which tool.

## Published — 2026-09-22

**Retained stage: `published`.** The owner created the Workshop item herself (outside any session's reach: RimWorld's
own Steam upload, run from her own game) and switched it to public. Confirmed directly, not merely taken on her word:

- `https://steamcommunity.com/sharedfiles/filedetails/?id=3806100152` loads in full for an anonymous browser session
  (no login), description included and a **Subscribe** button shown — the behaviour of a public item, not a private one.
- The first thanks comment, to hekmo on Flavor Text's own page, is live under account `nelim17`, timestamped minutes
  after posting, text matching what was drafted here. The other four were not each individually re-checked; one direct
  hit stands for the batch, all five having been handed over the same way in the same sitting.

`About/PublishedFileId.txt` (`3806100152`) was committed immediately after the upload, in its own commit, per the rule
that a missed commit here makes the next upload create a second item. `workshop:` above now carries the id.

**The `prepublished` capture-order criterion was not completed first.** `06-workshop-captures.feature` exists (`6218f89`)
but has never run, and the item's own Capture d'écran gallery is empty beyond the header `Preview.png`. Real-world
publishing happened before that step, on the owner's own sequencing, not this audit's. It is not undone and not
retried out of order; it is recorded as the one open item of the `published` stage, at the owner's own pace.

## Tag and GitHub release — 2026-09-22

On the owner's explicit instruction to finalize everything except the Workshop captures. Revision `67f5b9f` (the
publication-wording commit above, already pushed) tagged `v1.0.0` and pushed; `git ls-remote` and `git rev-parse`
confirm the remote tag, `HEAD` and `origin/main` are the same commit. Release published with `gh release create`,
body taken verbatim from `CHANGELOG.md`'s `## 1.0.0` section:
https://github.com/vbardales/Rimworld-Flavor-Text-Extended/releases/tag/v1.0.0 (not a draft, not a prerelease).

Also attempted: requeuing `05-sans-odyssey.feature` to confirm the PickleTools `ExpansionSteps` wiring. The owner's
own Windows RimWorld was running (pid 39292); `Run-PickleWsl.ps1` refused immediately, exit 2, "Sa partie Windows
tourne". Correct behaviour, not retried, and not queued to wait: AUDIT.md's absolute rule is that a session never
launches or interrupts that install. The owner then said explicitly not to requeue it now: the rerun is deferred
to after publication. It stays a recorded limit, not a `prepublished` blocker.

Not done, by the owner's own exclusion this session: the Workshop captures (`06-workshop-captures.feature`) and
everything that depends on them (their order, the Steam upload). Also still open: the owner's confirmation of the
AI-generation and Claude/Codex attribution, which no session can supply on her behalf.

## Publication text review — 2026-09-22

Identified the five Korean dish discoveries from FoodCourt's registry and verified all
five KFD_ definitions, About.xml and PublishedFileId.txt in the installed mod:
[DHM]Korean cuisine, DRILLED_HEAD, drilledhead.Koreancuisine, Workshop 3723096620.
Added its credit to About.xml and both attribution copies, and its personalised thanks
to PUBLICATION.md. Nothing was sent. Owner confirmation of the original image-generation
tools and Claude/Codex roles remains pending; the existing attribution is not new evidence.

Reviewed publication wording: removed the promise that farming/cooking mods unlock every
dish and the claim that all ingredient combinations are distinct; clarified provider guards,
no required DLC and uncertified Shenzhou support; corrected reptile/amphibian wording.
README and CHANGELOG agree. Attribution now reflects the recorded Pickle runs and refers
to the companion's own status. PUBLICATION no longer treats one tested load order as proof
of every order. No Def or patch changed. About.xml parses; attribution copies match;
all five drafted thanks fit below 1000 characters, including a placeholder Workshop URL;
git diff --check passes. No publication or AI-provenance confirmation is claimed.

## Release readiness check — 2026-09-22

**Retained stage: `tested`; `prepublished` is not reached.** Inspected HEAD
`6218f89a64f861462cae5a1f46c29fddc03225d0`; GitHub HEAD matches (`git ls-remote`).
No local or remote tag exists, and `gh release list` returns no release. The working tree
was clean before this status update. No upload, release, tag or new game run was performed.

Rechecked successfully: 901 dishes / zero errors / ten known warnings in `checkdefs.js`;
English text check zero errors or warnings; 51 XML files / 29 patch operations / four Odyssey
guards; 47 optional provider-reference pairs; 908 owned defs / 1,809 English fields and French
paths / 4,614 valid tokens. `Check-Steps.ps1` compiles all 12 local patterns without duplicates;
it leaves 59 of 106 feature lines to external vocabulary, including PickleTools, so it does
not validate the new expansion-step wiring. One local pattern is unused.

The stored runtime reports confirm `exitReason: passed`: bare full pass 10 passed / one
skipped, T7 separately 1/1, without Odyssey 3/3, and providers rerun 6/6. The earlier provider
failure remains historical. `Mod/` is unchanged since `c828a5d`, so these results remain
applicable to the distributed content. The moved PickleTools steps still need their rerun.

Release payload: only About assets/metadata, Defs, patches, licence and attribution; no test
assembly or development sources. Root and distributed LICENSE match byte-for-byte, as do
ATTRIBUTION.md. Preview (896x504, 553,178 bytes) and icon (128x128, 32,999 bytes) were opened
and visually inspected again: legible, no clipping, no adult imagery. No PublishedFileId.txt
exists in Mod/About. Metadata declares version 1.0.0, RimWorld 1.6 and only Flavor Text as a
hard dependency; the description ends with the correct repository link.

Before the first upload:

1. Run `06-workshop-captures.feature`, inspect its three images and finalize their order.
   PUBLICATION.md still proposes a mod-list image as number three, while the implemented
   feature captures a medium-boiled egg. No generated screenshots or capture report were found.
2. Confirm the AI provenance/roles stated in About.xml and ATTRIBUTION.md; finish the owner's
   description and thanks review, including the unidentified Korean cuisine inspiration.
3. Rerun `05-sans-odyssey.feature` with the PickleTools dependency map to close the harness check.
4. Commit and push the final publication documents, then tag v1.0.0 and publish the GitHub
   release using the changelog. This audit does not authorize or perform publication.
5. Upload only Mod/. Immediately preserve and commit Mod/About/PublishedFileId.txt, test the
   subscribed item before making it public, then record its id and send the reviewed thanks.

## Audit done -> tested — 2026-09-21

**Previous stage: `done`. Retained stage: `tested`.** Revision audited: `c828a5d`, pushed; the distributed `Mod/` differs from
the tree of the passes only in `About.xml`'s description, the icon and ATTRIBUTION.md, never in a Def or a patch. The game was never
launched by this audit: the runs were queued through `Run-PickleWsl.ps1` and played by the WSL game under the machine lock.

| Criterion of `done -> tested` | Result |
|---|---|
| Functional scenarios executed in game and passed | **validated.** T1, T3, T5-T10, T12 and T7 passed as Pickle scenarios; T2 passed in a pass that leaves Odyssey out. The scenario count played matches the features discovered in every pass (11 = 5+3+1+2, 6, 3, 1). |
| Pickle suites green, `exitReason` read before the numbers, @review captures opened | **validated, capture clause n/a.** All four runs ended `passed`. The suite has no `@review` scenario and takes no screenshot, so there is no capture to open; captures for the Workshop page belong to `prepublished`. |
| Logs checked | **validated.** Each `Player.log` was read: zero `[ERROR]` in the bare, Odyssey and T7 runs; one Unity/FMOD audio error in the provider pass, naming no def and none of ours, absent when the providers are. |
| UI verified in FR and EN | **not applicable, justified.** The mod adds no interface; its text is the English of its own Defs, exercised in every run. French is the companion's, with its own suite. |
| Options, persistence, MainButtons shortcut | **not applicable**: none exists (`settings_audit: not_applicable`). |
| New game and existing save | **covered as far as it is relevant.** Every cooking scenario loads Pickle's fixture save, made without this mod, and a save/reload round trip keeps meal names. The mod stores no data of its own. |
| Corrections followed by regression tests | **validated.** The leek assertion was corrected and its pass rerun, green. |

Excluded from the plan and recorded as such, not as failures: T4 (RimWorld's own reaction to a missing dependency, which AUDIT.md
now says is not tested), and T11's second half, T13 and the French half of T14 (the French companion's, own session and suite).

Reserves, none blocking: each pass passed once, and `03-cooking` calls the recipe method directly so no cook walks to a stove;
Shenzhou and shallot are uncertified. `in_game_validation_owner` changed from the user to sessions running Pickle: that was
the owner's own request on 2026-09-21, and no manual scenario is left.

### Next stage, `tested -> prepublished`

Not reached; nothing here was done for the sake of a better status. What is written and what is not is in `remaining` and in
`PUBLICATION.md`. Strictly needed: the tag and release, the Workshop captures (produced, looked at, ordered), the owner's
review of the description and of the thanks messages, and the answers to the two open points above.

## T7 — 2026-09-21, passed

The `@wip` scenario (four ingredients become two dishes) ran alone on a ticket with `-IncludeWip` and
`-Filter '::four ingredients become two dishes'`: **1 of 1, 6 steps of 6, `exitReason: passed`**, zero `[ERROR]`, in
`Tests/Pickle/results/2026-09-21-t7-wip/`. The Pickle session confirmed beforehand that the flag works in the staged
Pickle, so nothing had to be integrated first. Every scenario of the suite has now run and passed once.

## avec-facultatifs rerun — 2026-09-21, green

After the leek fix the pass ran again on a ticket: **6 of 6, 23 steps of 23, `exitReason: passed`**, report and log in
`Tests/Pickle/results/2026-09-21-avec-facultatifs-rerun/`. Flavor Text read 1025 active of 1831. The rule of two passes
is met, plus the DLC-off pass. One `[ERROR]` in that log: a Unity/FMOD audio error naming no def, absent from both
passes without the providers, so it comes from one of them and not from this mod.

## Pickle runs — 2026-09-21

Three passes ran on tickets, headless in the WSL: **sans-facultatifs 10 passed / 1 skipped (@wip), sans-odyssey 3/3,
avec-facultatifs 5 passed / 1 failed**, every `exitReason` read before the numbers. Details, what they prove and what they
do not, are in TESTS.md "What has run"; reports and logs are in `Tests/Pickle/results/`.

- **T2 answered:** the game kept Odyssey out, the mod loaded, zero `[ERROR]` in that log.
- **T5, T6, T9, T10, T12 passed.** Every name the scenarios assumed exists in the game.
- **One finding, and it is in the docs, not the code:** `VV_Leeks` is under `FT_Onion` as well as `FT_Leek`, because hekmo's
  own onion category lists "leek" and absorbs it. My scenario asserted the opposite and failed; the README and About
  description said the leek was "split out of onion". Both now say it has a category of its own and still counts as onion.
  `About.xml` changed, in the description only: it has not been published, so nothing on Steam needs correcting.
- **Limit worth knowing:** Pickle's `no errors were logged` does not see load-time errors. Load-time quiet was read from each log.

## T2 as a Pickle pass, and what left this repository — 2026-09-21

The Pickle headless-mode session added two staging features (commit `bf996076` in the workspace repository): a
`!ludeon.rimworld.odyssey` line in a pass map leaves that DLC out of ModsConfig, and a `packageId path:<folder>`
line stages a local mod. The first is used here: `Tests/Pickle/wsl-deps.sans-odyssey.map` and
`05-sans-odyssey.feature` (3 scenarios: the game really has no Odyssey, asked twice; the mod loads and the
four guarded meats raise nothing; the reptile categories stay declared and Core's two meats stay filed).
Two steps join the assembly (`the expansion ... is [not] active`, via `ModsConfig.IsActive`). Written, never run.

The second feature is **not used**: the French companion has its own session and its own test suite, so
its scenarios (T11 second half, T13, French T14) are not written here. T4 is dropped: the missing-dependency
warning is RimWorld's own behaviour, and AUDIT.md now says the game is not tested (a mod answers for what it
declares, checked in the sources). `Tests/Manual` shrinks to the optional log reader.

## Cooking, filing and provider scenarios — 2026-09-21, written, not run

Requested after the first run: T5 to T9 as Pickle scenarios. Pickle has no built-in step that reads a
meal's name or a category's contents, so there is now a step assembly, `Tests/Pickle/Source/`
(`FlavorTextExtended.PickleSteps.dll`, committed; `dotnet build` succeeds, 0 warnings).

- `04-filing.feature` (2 scenarios): the six reptile meats each sit in their own category, and none under
  another reptile's. Reads `FlavorCategoryDef.DescendantThingDefs`; no save, no cooking.
- `03-cooking.feature` (3 scenarios and one `@wip`; the third is T12, save and reload): `GenRecipe.MakeRecipeProducts` is called on a colonist
  and a stove of the loaded save, 300 times, and the scenario asserts a dish appeared (the egg alone gives
  `FlavorTextFR_OeufMollet`, rice-pork-egg gives `FlavorTextFR_Katsudon`, both with the expected label).
  Flavor Text's postfix is real; no tick passes. The four-ingredient case (T7) is `@wip`: nothing establishes
  that a lone fourth ingredient always finds a dish.
- `02-avec-facultatifs.feature` gains two scenarios: the eight provider ingredients named by the patches
  are filed where the patches send them (T10), and leek is filed under leek and not under onion (T8).
- `Tests/Pickle/Check-Steps.ps1` (copied from Bill Autopilot's): all patterns compile under Pickle's own
  expression engine, none declared twice, every feature line resolves. No game.

Nothing of this has run. The bare pass now names three files
(`-Filter 01-alone.feature,03-cooking.feature,04-filing.feature`), the second pass is unchanged. Two
things are worth saying before a run: a green cooking scenario says a dish was drawn at least once among
300 tries and says nothing about the walk to the stove; and a step that names a def the game does not have
fails with that name in the message, which would be a finding, not necessarily a defect of the mod.

## First Pickle run — 2026-09-21

Bare pass (`sans-facultatifs`, `-Filter 01-alone.feature`), queued through `Run-PickleWsl.ps1` on a ticket
and played headless in the WSL game once the queue reached it (lock held 18:48:13 to 18:49:44, local time).
**`exitReason: passed`, 5 scenarios of 5 in the one feature file, 20 steps of 20 PASSED, exit code 0.**
Twelve mods staged. Report and log copied to `Tests/Pickle/results/2026-09-21-sans-facultatifs/`.

- The engine line read `641 active FlavorDefs ... out of 1831 total FlavorDefs`; 1831 = 930 + 901.
- No `[ERROR]` line. No `[WARN]` attributed to this mod. Two `[Vanilla]` warnings: Steamworks (no Steam
  in the WSL) and the test companion's missing dependency download URL (added afterwards, not re-run).
- Settled: Pickle finds defs of the custom types `FlavorText.FlavorDef` and `FlavorText.FlavorCategoryDef`
  by name, and attributes patches on the latter to this mod.
- **Not proved:** anything on a list with the providers (that pass has not run), the DLC-off case, dish
  names actually drawn while cooking, the French text, any screenshot. A first attempt, the same
  morning's ticket 34848, died with `Indexation impossible dans un tableau Null` inside the shared
  `Run-PickleWsl.ps1` before taking the lock; it ran nothing. The re-queued ticket did not reproduce it.
- Stage unchanged: `done`. `tested` also needs the second pass and the user's T1-T14 walk.

## preTest -> done — 2026-09-21, later the same day

**Stage: `preTest` -> `done`.** The one defect of the audit below is corrected: the Pickle suite is
written, and its scope is justified. Nothing else changed in the assessment; the sections below
stay as the record of why `done` had been withdrawn.

- `Tests/Pickle/`: a companion mod `Flavor Text Extended - Pickle tests` (never published), two
  feature files (5 + 4 scenarios, 34 steps), `wsl-ids.map` naming Flavor Text's Workshop id, and
  `wsl-deps.avec-facultatifs.map` for the second pass. Every step is a built-in Pickle step: all 34
  match a pattern found in `RimWorks.Pickle.Core.dll` (checked by matching the text, not by a game).
  Nothing uses a custom step assembly.
- `TESTS.md`, "Pickle passes": what Pickle is for here (T1 and T3 made scriptable, what an offline
  tool cannot show), **two passes** (without the optional mods, with them), **zero** for
  incompatibilities because none is declared, why the two Chinese Traditional versions are not staged
  (neither declares 1.6), and what is deliberately left out (T2, cooking scenarios, list contents).
- Also fixed in `TESTS.md`: the baseline said 43 provider references (47 since the FoodCourt
  additions) and "four" patch files (five).

**Written is all this claims.** No scenario has run, no Pickle report exists, nothing here was
launched. The workflow asks for the run at `done -> tested`, with the captures read, and with the
observation that a green only says the path was played. Two things are open and listed in
`remaining`: the run scripts cannot reach a repository nested one level deeper than they expect,
and Pickle's lookup of a custom def type by name is untested. The first limit has since been lifted by a junction, see `remaining`.

## Cumulative audit — 2026-09-21

**Previous stage: `done`. Retained stage: `preTest`.** Seven transitions up to `preTest` hold on
the current tree. `preTest -> done` is not established, for one reason only (below).

Audited revision: `b79372c705cc574558b0e5538c75ead61e61eab2`, equal to `origin/main`
(`git ls-remote`, `git fetch`); working tree clean before this update, which changes STATUS.md only.
No game was launched, no Pickle run started, nothing in the game's configuration touched.
The workflow read is the current AUDIT.md, which postdates the 2026-09-13 `done` decision.

| Transition | Result | Evidence checked today |
|---|---|---|
| dansMonoRepo -> horsMonoRepo | validated | Standalone git root, `origin` = the GitHub repo, public (`gh api`: `private: false`), default branch `main`, remote HEAD = local HEAD. STATUS present. `original` / MIT, `LICENSE` and `ATTRIBUTION.md` byte-identical in root and `Mod/`. `packageId nelim.flavortextextended`, repo `Rimworld-Flavor-Text-Extended`, folder `FlavorTextExtended`: consistent. README, ATTRIBUTION, CHANGELOG, LICENSE in English. Stale content found at audit entry (896 dishes, replaced-icon claims): corrected, see below. |
| -> ModIcon générée | validated (after correction below) | XML-only, no build applicable, no DLL, no source folder. At audit entry `Mod/About/ModIcon.png` was 64x64, 7,504 bytes; it is now the same mascot **enlarged to 128x128** (bicubic, 32,999 bytes, SHA256 `71EF4B75...3711`), opened and looked at. The ribbon still reads `flavor text`: kept by the user's explicit choice, which departs from the no-text rule of STYLE_RIMWORLD.md and is recorded here as a decision, not verified. |
| -> Preview générée | validated | `Mod/About/Preview.png` is 896x504, 553,178 bytes (< 1 MB), opened and looked at: dishes on a dark wooden table, title and summary legible, no clipped text, no concrete camera defect. |
| -> preOptions | validated | `Extended` is a smaller tan suffix beside the white main title, the green rule and `1.6` badge are a third, distinct colour. Description in English. It ends with `[url=https://github.com/vbardales/Rimworld-Flavor-Text-Extended]Source code on GitHub[/url]`, last in the field and matching the `<url>` field and the remote. The FR companion link resolves (`git ls-remote`). No `(unofficial)` / `(prohibited)` suffix is called for by `original` / public. |
| -> options | validated, `not_applicable` | Source inventory of `Mod/`: 51 Def/patch XML files, no `.dll`, no `.cs`, no `MainButtonDef`, no `ModSettings`, no `Keyed`, no `LoadFolders`. No settings page and no shortcut can exist. Verified from sources only, which is what this transition asks. |
| -> l10n | validated | English is the native Def text: 901 `FlavorDef` and 7 `FlavorCategoryDef`, all with source text; no other player-facing text in patches, no code. `_tools/Test-Localization.ps1 -CompanionMod ../FlavorTextExtendedFR/Mod`: PASS, 908 owned defs, 1,809 non-empty English fields with matching French paths, 4,614 valid tokens. `node _tools/verifen.js`: 901 dishes, 0 errors, 0 warnings. French lives in the separate companion by the user's explicit architecture decision: recorded, not a defect here. No in-game language pass exists (it belongs to `done -> tested`). |
| -> preTest | validated | Only `hekmo.FlavorText` is a hard dependency, declared with its Workshop URL; `loadAfter` names Harmony, Core and Flavor Text. Optional providers (`daylight.RLEVVCultivationPlus`, `Dajian.ChiTeaditional.Expanded`, `daylight.RimLifeExTRGMod`, VV New Harvest) appear only as `MayRequire` on the entries, not as dependencies. `_tools/Test-OptionalIngredients.ps1`: PASS, 47 guarded provider-reference pairs resolve. `_tools/Test-Xml.ps1`: PASS, 51 files, 29 operations applied in memory, four Odyssey guards. No `LoadFolders` and none needed. Installed Flavor Text is 0.3.6, 1.6 supported. |
| -> done | **not established** | See below. |
| -> tested | not reached | Nothing executed in game. |

### Why `done` is retracted

Criterion 8 asks for three things beside the scenarios: automated tests green, XML tests green, and
Pickle (Gherkin) tests **written, with their scope justified** ("only what a running game can show").

- Scenarios: T1-T14 in `TESTS.md`, each with setup, actions, expected result. Present.
- Automated and XML tests, rerun on the delivered tree: `checkdefs.js` 901 dishes, 0 errors,
  10 warnings (all shared-combination or similar-label, unchanged); `verifen.js` 0/0;
  `Check-ConfigErrors.ps1 -ModPath ./Mod -AlsoScan <Flavor Text 1.6 Defs>`: 908 of 908 defs,
  26 rules, no config error; the three PowerShell tests above. All green.
- Pickle: **absent.** No `Tests/Pickle`, no `.feature`, no mention of Pickle in `TESTS.md` or here,
  hence neither scenarios nor a justification of their absence. This is a defect, not a missing check:
  the file that should carry the answer does not.

Not a case for "not applicable" on its face. The whole risk of this mod is load time under the
real engine (a patch xpath that finds nothing, a cross-reference that does not resolve, an Odyssey
guard), and `TESTS.md` T1-T3 say so themselves. The offline tools approximate the loader without
being it (`Test-Xml.ps1` says so: it does not emulate conditional loading). Comparable XML-only mods
in this tree write a small load-time suite. Whether to write those scenarios or to argue their
absence is the owner's call; this audit does neither, since it may not create tests to earn a stage.

### Not counted against the stage

- `TESTS.md` is named `TESTS.md`; the Pickle section of the workflow names `TESTING.md` for the
  declaration of passes. Nothing to declare yet.
- The distributed `About.xml` no longer matches `PRETEST-2026-09-13.json`: `b79372c` changed its
  `<author>` to `Nelim`. At audit entry it was the only one of 55 distributed files that differed; after the corrections below
  `About.xml`, `ATTRIBUTION.md` and `ModIcon.png` all differ. Today's reruns cover the tree as delivered. The claim "hashes still match" in the 2026-09-13 correction below
  is historical.
- The 2026-09-13 statement that in-game work belongs to the user alone predates the WSL Pickle
  regime. It still governs the T1-T14 walk; it does not stop a session from writing Pickle scenarios.

### Corrections applied after the audit — 2026-09-21

Requested by the user right after the audit. STATUS.md aside, they change the files below and
nothing else; no Def, patch or dependency was touched.

- `Mod/About/ModIcon.png`: restored 64x64 mascot enlarged to 128x128, original kept as
  `Art/archive/ModIcon-before-fix.png`.
- `Mod/About/About.xml`: after the body, the description now carries, in the order of the
  prepublished checklist, `IF I GO QUIET` (adoption clause verbatim), `AI-GENERATED`, `THANKS`, a line
  pointing at ATTRIBUTION.md and the licence, then `[url=...]Source code on GitHub[/url]` last.
  The XML parses and the field still ends on that link. `Preview.png`, `modVersion` and the dependency
  block are unchanged. The Workshop description is still only sent at creation.
- `ATTRIBUTION.md` and `Mod/ATTRIBUTION.md` (byte-identical): 901 dishes, the five FoodCourt-derived
  dishes, VV New Harvest, and an image-provenance list that matches the delivered files.
- `CHANGELOG.md`: no longer claims a replaced icon, and French category labels are said to live in the
  companion. `README.md`: layout line. `Art/README.md`: icon flow. `Mod/Languages/` (empty, untracked)
  removed.
- Left as written: `TESTS.md` and the README profile snapshot cite 896, in sections dated as historical.

Reruns after the edits: `Test-Xml.ps1` 51 files / 29 operations / four Odyssey guards PASS;
`Test-Localization.ps1` 908 defs, 1,809 fields, 4,614 tokens PASS; `git diff --check` clean.
Nothing that carries Def content changed, so the other results above stand.

Two statements in the new text are **not verified** and want the author's confirmation:
that the icon and the Preview illustration were made with AI image tools (the repository does not
record it; the wording says the tool is unrecorded), and that Claude and Codex did what the AI
section says (taken from the earlier ATTRIBUTION, not from a log).

### Next transition, strictly

`preTest -> done`: either write the Pickle scenarios that only a running game can show (at least
the load-time claim of T1-T3, on the minimal set and on the set with the optional providers),
run nothing yet, and declare the passes in the test document; or write down why there are none.
Running them is a `done -> tested` criterion.

### Optional

Decide whether the lettered ribbon on the icon should stay; confirm the two unverified statements above.

## Cumulative status correction — 2026-09-13

User clarified that all in-game testing belongs exclusively to the user. The original
workflow explicitly defines done as ready for that testing. The earlier decision to remain
at preTest because the game was closed or mods inactive was incorrect and is superseded.

| Reached status | Prerequisite evidence |
|---|---|
| horsMonoRepo | Standalone repository, existing public remote and previously pushed base; identity, licence and English distribution documentation audited. Local commit f62b876 contains the corrections. |
| ModIcon générée | XML-only implementation; compilation not applicable. Original installed 64x64 icon explicitly selected and accepted by user. |
| Preview générée | Installed 896x504 PNG, 553178 bytes; visual inspection previously recorded. |
| preOptions | Preview hierarchy corrected and English About description with required final source link; separate FR companion linked. |
| options | No useful extension-owned settings; source inventory confirms no empty page or shortcut. Engine settings remain in Flavor Text. |
| l10n | English native Def text and tokens checked; FR belongs exclusively to the separate companion by explicit user instruction. |
| preTest | Required dependency and optional guards audited; 47 provider-reference pairs checked. Older optional Shenzhou versions are not certified for 1.6. |
| done | T1-T14 scenarios specify setup/actions/expected results; automated checks pass for 901 dishes, XML checks pass for 51 files and 29 operations. Distributed hashes still match PRETEST-2026-09-13.json. |
| tested | Not reached. In-game execution and results belong exclusively to the user. |

No fresh game launch, configuration change or in-game pass is claimed. A closed game,
inactive test loadout or empty Player.log is not a blocker for done. Earlier evidence
remains valid where delivered files are unchanged. This update changes status/docs only.

## preTest readiness — 2026-09-13

Checked committed content f62b876, with only this status/test-plan documentation updated.
Settings gate remains justified not_applicable: 901 static dishes, seven categories,
five patch files, no owned configuration, settings assembly, empty page or shortcut.
Engine settings remain owned by Flavor Text. The user explicitly places French content
in its separate companion, so translation_fr remains not_applicable here.

English native fields remain localizable through the dependency's Def fields. Rechecked
901 dishes: zero English/token errors, zero French-word warnings; category/meal checks
have zero errors and ten unchanged authored-combination/name warnings. XML: 51 files,
29 operations, four Odyssey guards pass. All 47 optional provider-reference pairs resolve.
The five new English descriptions were reviewed, including explicit culinary adaptations.
No new player-facing UI or hardcoded code strings were introduced.

The localization and offline preparation gates pass; stage advances from options to preTest.
T1-T14 game scenarios remain unverified: no game launch, UI interaction, cooking,
load/save round trip or runtime compatibility result is claimed. tested_on stays empty.
Current evidence is recorded in PRETEST-2026-09-13.json; earlier manifests are historical.

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

- Mod name: **Flavor Text Extended**; author: **Nelim**.
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

## Runtime environment check — 2026-09-13

The installed Mods/FlavorTextExtended directory is a junction to this repository's Mod/;
all distributed file hashes match, so no installation copy is needed. RimWorld is not
running. Player.log is empty (last modified 2026-09-11). The current active modlist has
neither hekmo.FlavorText nor nelim.flavortextextended. No game configuration was changed.
Interactive cooking/save tests cannot be executed through the available tools: native
application control is unavailable in this session. Runtime scenarios remain unverified.
Next manual run: Harmony, Core, Flavor Text, then Flavor Text Extended, English language;
start a disposable colony, check loading errors, cook meals and save/reload per TESTS.md.
Do not use an existing modded save with this minimal modlist; existing-save tests use a copy
with its original dependencies preserved. French integration is a separate companion run.
