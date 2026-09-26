# Protocol documents read by the session of this mod

Kept as `WELCOME.md` section 5 of the ticket dispatcher asks: what was read, in which version, and which
documents were of no use here, so that they are not read again when they change. Version = last commit that
touched the file. The protocol documents live in `vbardales/Rimworld-protocols` (git dir `../rimworld-protocols.git`,
work tree = the monorepo root); the others in the repository that carries them.

## Reading of 2026-09-26 (after a context compaction)

Everything below was read in full, except where stated. No document had uncommitted changes, except
`WELCOME.md` (modified, not committed, in the dispatcher repository).

### Protocols

| File | Version read | Useful for this mod? |
|---|---|---|
| `AGENTS.md` | `3a1d2cb` (2026-09-24) | **yes**: the gates, test evidence rules, publishing by CI |
| `AUDIT.md` | `4f034f5` (2026-09-26) | **yes**: never launch a game, queue rules, session title `<mod> / <stage>`, evidence handling |
| `PUBLISHING.md` | `4f034f5` (2026-09-26) | **yes** for the next update: release notes start with the version, fail fast, CI. The first-publication parts are done |
| `WORKSHOP_COMMENTS.md` | `968de6f` (2026-09-26) | **only when drafting a Steam comment or a reply** (voice, 1000 characters, `[url=]` link, one comment per page). Nothing to do with a code change |
| `TRANSLATIONS.md` | `f5c2d9d` (2026-09-25) | no: `translation_fr` is `not_applicable` here (the French text is the companion's) and this mod adds no keyed text. Reread only if player-facing text changes |
| `MOD_SETTINGS.md` | `b83933b` (2026-09-23) | no: `settings_audit: not_applicable`, this mod has no settings page and no shortcut. Reread only if an option is ever added |
| `STYLE_RIMWORLD.md` | `7311308` (2026-09-25) | no: it concerns the Preview illustration and its overlay, both finished and published |
| `scripts/SEARCHING.md` | `372c447` (2026-09-23) | no: it is about searching the Workshop corpus, which this mod never does. Standing rule from the owner: never `grep`; use the Read/Glob tools, Node scripts, or the corpus tool |

### Tools

| File | Version read | Useful for this mod? |
|---|---|---|
| `PickleTools/Headless/README.md` | `cfa7aac` (2026-09-26) | **yes**: filters, `-DepMap`, exit codes (7 = queue wait exceeded, proves nothing) |
| `Rimworld-Ticket-Dispatcher/docs/WELCOME.md` | `bd6e7bc` (2026-09-26), **working copy modified, not committed** | **yes**: the queue is used by filing a request, with no watcher of our own; the tree must stay on the revision under test until `RUN_DONE` |
| `Rimworld-Ticket-Dispatcher/docs/SUBMIT.md` | `c0a73a2` (2026-09-25) | **yes**: every option of `Submit-PickleRun.ps1` |
| `Rimworld-Release-Admin/docs/OPERATIONS.md` | `f196148` (2026-09-25) | **only for the next publication** (dry-run on the exact SHA, `dispatch-publish.sh`, owner approves `steam-production`). Not needed while testing |
| `PickleTools/README.md` | `c771bef` (2026-09-25) | no: a table of tools; this mod uses only ExpansionSteps and ScreenshotMode/ScreenshotStudio, already staged by its maps |
| `PickleTools/docs/steps.md` | `cba3ca1` (2026-09-25) | no, unless a scenario needs a step this suite lacks. This suite's own steps are in `Tests/Pickle/Source/` |

### This mod

| File | Version read | Note |
|---|---|---|
| `STATUS.md` | `7d1926f` (2026-09-24) | lines 1 to 140 this time (front matter, `stage: published`); the rest of the file was read earlier in the session before the compaction |
| `README.md` | `3f8623e` (2026-09-23) | |
| `CHANGELOG.md` | `800a54c` (2026-09-24) | 1.1.0 is the latest entry |
| `ATTRIBUTION.md` | `85bf074` (2026-09-23) | no "official" claim anywhere, on purpose |
| `LICENSE` | `f62b876` (2026-09-13) | MIT; not reread, unchanged |
| `PUBLICATION.md` | `7d1926f` (2026-09-24) | release note template and the 1.1.0 block |
| `TESTING.md` | `94c6d10` (2026-09-24, as `TESTS.md`) | this mod's test plan; renamed from `TESTS.md` on 2026-09-26 because the protocols name it `TESTING.md` |
| `Mod/About/About.xml` | `efb257d` (2026-09-24) | 1.1.0, one hard dependency |
| `docs/runs/` | 3 files, latest `2026-09-24-pickle-runs.md` | |
| `Tests/Pickle/` | `f8ac657` | README and the two feature files read this session; the rest known |
| `BACKLOG.md` | created 2026-09-26 | the leads from hekmo's report and what waits on the CI. `NOTES.md` and `BUGS.md` | not created: nothing to put in them |

## What changed my way of working

- **A Pickle run is requested, never launched.** On 2026-09-26 this session started `Run-PickleWsl.ps1` directly and the
  ticket dispatcher flagged it (it would have jumped ~45 queued requests). The run was stopped and refiled with
  `Submit-PickleRun.ps1`. The Pickle README of this repository still shows the direct command in its "Running the passes"
  paragraph; it is corrected once the frequency run is over, because a request stages the working tree when it is
  played and `Tests/Pickle/` must not move before then.
- The "one background process for all passes" advice written on 2026-09-24 is superseded for sessions: with a request
  each pass is one request, and the worker already waits 600 minutes and retries an exit 7 three times.
