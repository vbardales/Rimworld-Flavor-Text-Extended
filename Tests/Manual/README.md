# Manual scenarios

The five scenarios of `../../TESTS.md` that no Pickle run can play, ready to be walked by the owner:
**T2, T4, T11, T13, T14**. Everything a session could prepare is here; nothing in this folder has
been executed, launched or written into the game's configuration.

| File | What it is |
|---|---|
| `RESULTS.md` | one blank sheet per scenario: fill it in as you go. A field left empty means not done. |
| `modlists/` | the exact mods to enable for each scenario, in load order, as `packageId` per line. |
| `Check-PlayerLog.ps1` | reads a `Player.log` and prints what T1 to T14 look for. It reports, it never decides. |

## How to walk one

1. Read the scenario in `../../TESTS.md`: setup, actions, pass, failure shape.
2. Set the mod list from `modlists/<scenario>.txt` in the mod manager. These files change nothing by
   themselves. Keep a copy of your own `ModsConfig.xml` first: switching lists is what changes it back.
3. Start the game, do what the scenario says, **quit**. `Player.log` is rewritten at each launch and
   is only complete after the game closes.
4. Run the log reader, then copy the log next to your notes before the next launch:

   ```powershell
   powershell -ExecutionPolicy Bypass -File Tests/Manual/Check-PlayerLog.ps1
   copy "$env:USERPROFILE\AppData\LocalLow\Ludeon Studios\RimWorld by Ludeon Studios\Player.log" Tests\Manual\logs\T2-2026-09-22.log
   ```

5. Fill in the sheet in `RESULTS.md`. Mark the scenario `pass`, `fail` or `unverified` and say why.
   Never `pass` on the strength of the reader's output alone: it reads the log, not the screen.

`logs/` is ignored by git except its `.gitkeep`: logs are large and hold your whole modlist.
