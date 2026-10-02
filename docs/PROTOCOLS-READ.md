# Protocol documents read by the session of this mod

Kept as `WELCOME.md` section 5 of the ticket dispatcher asks: what was read, in which version, and which
documents were of no use here, so that they are not read again when they change. Version = last commit that
touched the file. The protocol documents live in `vbardales/Rimworld-protocols` (git dir `../rimworld-protocols.git`,
work tree = the monorepo root); the others in the repository that carries them.

## Reading of 2026-10-02 (audit session)

Version = last commit touching the file. Documents already read and unchanged since 2026-09-26 are not read again.
`AUDIT.md` was read in full; for the others only what changed since the version of the previous reading (git diff).
No document had uncommitted changes except `STYLE_RIMWORLD.md` and two PickleTools files (not used here).

| File | Version read | Useful for this mod? |
|---|---|---|
| `AGENTS.md` | `7fd7475` (2026-09-29) | **yes**, shortened; same rules, plus the `docs/runs/history.md` trim after publication |
| `AUDIT.md` | `d1fdbe1` (2026-10-02) | **yes**: new `done -> tested` criteria (no `@wip`, conditional scenarios run, no manual test), WSL cleanup after the last ticket, regressions last, gitignored evidence |
| `PUBLISHING.md` | `4e8f11a` (2026-10-02), diff only | **yes**: systematic PR to the origin repo, gallery `0-` rule, packageId without `renew`. The Preview line-art and typography sections concern the Preview renderer, not this mod |
| `TRANSLATIONS.md` | `af8427f` (2026-10-02), diff only | no: the French neutral forms, player choice and `FRENCH_REVIEW.md` apply to mods with a `Languages/French` folder. Reread if one is ever added here |
| `WORKSHOP_COMMENTS.md` | `7fd7475` (2026-09-29), diff only | no: only when drafting a Steam comment |
| `scripts/SEARCHING.md` | `50de695` (2026-09-28), diff only | **yes**: bounded roots only, no recursive walk; the owner's no-grep rule stays stricter |
| `MOD_SETTINGS.md` | `b83933b` (2026-09-23), unchanged | no: `settings_audit: not_applicable` |
| `STYLE_RIMWORLD.md` | `c105a43` (2026-10-01), not read, working copy modified | no: Preview illustration, finished |
| `PickleTools/Headless/README.md` | `ed4e73a` (2026-09-26), diff only | no change for this mod (a `-ThenWithout` example) |
| `PickleTools/README.md`, `PickleTools/docs/steps.md` | `ff20d89`, `da7c3b0`, not read | no: this suite uses its own steps |
| `Rimworld-Ticket-Dispatcher/docs/WELCOME.md` | `77ca9d7` (2026-09-27), diff only | **yes**: queue state moved to `.pickle-state` in the repo root; gitignore `desktop.ini` and `*.ico`; keep only `summary.json` and `junit.xml`; `path:` maps point to the folder that holds `About/` |
| `Rimworld-Ticket-Dispatcher/docs/SUBMIT.md` | `d07b2b8` (2026-09-26), diff only | **yes**: never launch `Run-PickleWsl.ps1` directly |
| `Rimworld-Release-Admin/docs/OPERATIONS.md` | `3c03f51` (2026-09-26), summary only | only for the next publication: rewritten and shorter, rules unchanged (dry-run of the exact SHA, full SHA, owner approves `steam-production`) |

This mod's own files read today: `STATUS.md`, `TESTING.md` (evidence and pass sections), `BACKLOG.md`, `CHANGELOG.md` (head and tail), `docs/runs/`, `Tests/Pickle/` (features, summaries). `README.md`, `ATTRIBUTION.md`, `LICENSE`, `PUBLICATION.md`, `Mod/About/About.xml`: not reread, nothing in them changed. `NOTES.md` and `BUGS.md` do not exist.

## Reading of 2026-09-26 (after a context compaction), superseded above where a row repeats

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
| `scripts/SEARCHING.md` | `372c447` (2026-09-23) | **yes, as the source of the owner's no-grep rule.** Corrected 2026-09-26: it had been marked useless because this mod never searches the Workshop, which was too narrow a reading. The document forbids a hand-rolled `grep -r` on the corpus (use `scripts/Search-Workshop.sh`); the owner's rule is stricter: no grep at all, not the Grep tool and not `grep` in a pipe. Filter my own files with Read, Glob or a Node script. Slips of 2026-09-26: the Grep tool once, `grep -v` and `grep -c` in shell commands |

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
