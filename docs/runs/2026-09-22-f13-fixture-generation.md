# F13 fixture generation - 2026-09-22

Pass with `07-f13-fixture.feature` (`@wip`, run with `-IncludeWip`): it stages Flavor Text and
Flavor Text Extended but not the French companion, so the saved meals predate its installation.

- Result: 1 scenario, 1 passed, 0 failed, 0 skipped (17.4 s, 1 attempt).
- Scenario: "stored Flavor Text meals are saved before FTFR is installed" - the cook makes 100 meals from
  RawRice, Meat_Pig and EggChickenUnfertilized, 6 are placed on the map, saved as
  `legacy-meals-before-ftfr`.
- Report preserved before the lock was released at 2026-09-22T23:36:21.

Evidence (about 1.1 GB: 365 screenshots, Player.log, junit.xml, messages.ndjson, report.html) is on
disk only, in `Tests/Pickle/results/f13-fixture-generation-2026-09-22/`, and ignored by git.
