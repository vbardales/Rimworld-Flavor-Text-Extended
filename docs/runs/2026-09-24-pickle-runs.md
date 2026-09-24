# Pickle runs on the FlavorDef narrowness revision (one line each)

Revision: the 2026-09-23 review of all 901 dishes (295 slots widened), before the next Workshop upload.
"Active" is Flavor Text's own startup figure, out of 1831 FlavorDefs.

- 2026-09-23 without-odyssey (`05`): 3 scenarios, 3 passed, 0 failed, 0 skipped. 653 active (607 in the 2026-09-22 run of the previous build). `Tests/Pickle/results/2026-09-23-without-odyssey/`.
- 2026-09-23 workshop-captures (`06`): 3 scenarios, 3 passed. 696 active. Three meal-card images, on disk and ignored by git, awaiting the owner's review. `Tests/Pickle/results/2026-09-23-workshop-captures/`.
- 2026-09-24 without-optionals (`01`, `03`, `04`): 11 scenarios, 11 passed, 0 failed, 0 skipped (T7 now runs here). 696 active (641 on the previous build). `Tests/Pickle/results/2026-09-24-without-optionals/`.
- 2026-09-24 with-optionals (`02`): 6 scenarios, 6 passed. 1072 active (1025 on the previous build). `Tests/Pickle/results/2026-09-24-with-optionals/`.
- 2026-09-23 without-optionals and with-optionals, first tickets: never ran, abandoned after 90 minutes in the queue (exit 7). Requeued on 2026-09-24 with a 600-minute wait.

## Pruned on 2026-09-24 (replaced by the runs above)

- 2026-09-21 without-optionals-full: 11 scenarios, 10 passed, 0 failed, 1 skipped (T7 was `@wip`), 641 active. Replaced by 2026-09-24 without-optionals.
- 2026-09-21 t7-wip: 1 scenario, 1 passed (T7 alone, `-IncludeWip`). Replaced: T7 now runs in 2026-09-24 without-optionals.
- 2026-09-21 with-optionals-rerun: 6 scenarios, 6 passed, 1025 active. Replaced by 2026-09-24 with-optionals.
- 2026-09-22 without-odyssey-pickletools: 3 scenarios, 3 passed, 607 active, with the two PickleTools expansion assertions. Replaced by 2026-09-23 without-odyssey.

Kept from earlier: `f13-fixture-generation-2026-09-22` (the only run of `07-f13-fixture.feature`; on disk, ignored by git).
