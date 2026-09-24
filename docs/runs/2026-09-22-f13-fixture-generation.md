# F13 fixture generation - 2026-09-22

Pass with `07-f13-fixture.feature` (tagged `@wip` and run with `-IncludeWip` that day; it is now `@fixture` and is played by naming it with `-Filter`): it stages Flavor Text and
Flavor Text Extended but not the French companion, so the saved meals predate its installation.

- Result: 1 scenario, 1 passed, 0 failed, 0 skipped (17.4 s, 1 attempt).
- Scenario: "stored Flavor Text meals are saved before FTFR is installed" - the cook makes 100 meals from
  RawRice, Meat_Pig and EggChickenUnfertilized, 6 are placed on the map, saved as
  `legacy-meals-before-ftfr`.
- Report preserved before the lock was released at 2026-09-22T23:36:21.

Evidence kept on disk only, ignored by git: `Tests/Pickle/results/f13-fixture-generation-2026-09-22/`
(summary, junit, Player.log, messages, report.html; about 1.7 MB). The scenario takes no screenshot: the
365 screenshots and 31 films that came with the copied report belonged to other mods' scenarios from the
shared Pickle output folder, proved nothing about this mod, and were deleted from this copy (about 1.1 GB).
