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

The 2026-09-26 reading (versions of AGENTS, AUDIT, PUBLISHING and the tools as they were then) was dropped on 2026-10-06: the table above supersedes it, and git has the text.
