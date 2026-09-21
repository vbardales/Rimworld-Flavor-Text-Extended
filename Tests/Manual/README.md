# Reading a real Player.log

No manual scenario is left in this repository. T2 became a Pickle pass, T4 is RimWorld's own behaviour
and is not tested, and the French scenarios (T11 second half, T13, T14) belong to the French companion,
which has its own session and its own suite. See `../../TESTS.md`.

What remains is one optional tool, for when you play with your real modlist and want the log read for you:

```powershell
powershell -ExecutionPolicy Bypass -File Tests/Manual/Check-PlayerLog.ps1
powershell -ExecutionPolicy Bypass -File Tests/Manual/Check-PlayerLog.ps1 -Log path\to\Player.log
```

It prints the Flavor Text startup line (`N active FlavorDefs ... out of M total`, M = 1831 expected) and the red
lines that name this mod or one of the Odyssey meats. It reports and never decides: it reads the log, not the
screen, and a clean output is not a `pass`. `Player.log` is rewritten at each launch, so read it after quitting
and copy it aside first.

`logs/` is ignored by git except its `.gitkeep`.
