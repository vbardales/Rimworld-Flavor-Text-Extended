<#
.SYNOPSIS
  What the manual scenarios of TESTING.md (T1, T2, T3, T13) look for in a Player.log, on top of the shared scripts/Check-PlayerLog.ps1.

.DESCRIPTION
  The red-line reading is the shared script (this mod's prefixes and defNames are its -Name list, the Flavor Text startup line its -Require).
  What stays here is specific to this mod: the number of active FlavorDefs the startup line must report (hekmo 930 + this mod 901 = 1831) and
  T2, an unresolved Odyssey meat, the exact failure the MayRequire guards prevent. It REPORTS; mark a scenario `pass` in RESULTS.md only after
  doing what the scenario asks. Read the log after the game closed.

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File Tests/Manual/Check-PlayerLog.ps1 -Log Tests\Manual\logs\T2-2026-09-22.log
#>
param(
    [string]$Log = (Join-Path $env:USERPROFILE 'AppData\LocalLow\Ludeon Studios\RimWorld by Ludeon Studios\Player.log')
)
$ErrorActionPreference = 'Stop'

$root = $PSScriptRoot
for ($i = 0; $i -lt 6 -and -not (Test-Path (Join-Path $root 'scripts\Check-PlayerLog.ps1')); $i++) { $root = Split-Path $root -Parent }
$shared = Join-Path $root 'scripts\Check-PlayerLog.ps1'
if (-not (Test-Path -LiteralPath $shared)) { throw 'scripts\Check-PlayerLog.ps1 of the protocols root not found above this folder' }

$names = @('FlavorTextFR_', 'FlavorTextExtended_', 'nelim.flavortextextended',
    'FT_Leek', 'FT_Shallot', 'FT_Meat_Turtle', 'FT_Meat_Alligator', 'FT_Meat_Iguana', 'FT_Meat_Lizard', 'FT_Meat_Frog',
    'Keywords_Ingredients', 'Keywords_Mods', 'Keywords_Cultivation', 'Keywords_Shenzhou', 'Keywords_FoodCourtDiscovery',
    'Meat_Alligator', 'Meat_MonitorLizard', 'Meat_Bullfrog', 'Meat_SeaTurtle')
& powershell -NoProfile -ExecutionPolicy Bypass -File $shared -Name ($names -join ',') -Log $Log -Require 'Flavor Text\]\s*mod is now active'

$text = [IO.File]::ReadAllText($Log)   # the shared script has already said when the log is missing
$ft = ($text -split "`r?`n") | Where-Object { $_ -match 'Flavor Text\]\s*mod is now active' } | Select-Object -First 1
if ($ft -match '(\d+)\s+active FlavorDefs.*found out of\s+(\d+)\s+total') {
    Write-Host ("FlavorDefs : active {0} of {1} total (hekmo 930 + this mod 901 = 1831 expected)" -f $Matches[1], $Matches[2])
}
$red = '(?i)(\[ERROR\]|could not resolve cross-reference|config error|xml error|patch operation|error in static constructor|exception)'
$meat = @(($text -split "`r?`n") | Where-Object { $_ -match $red -and $_ -match 'Meat_Alligator|Meat_MonitorLizard|Meat_Bullfrog|Meat_SeaTurtle' })
if ($meat.Count) { Write-Host ("T2 : {0} red line(s) name an Odyssey meat. Without Odyssey that is the defect the MayRequire guards prevent." -f $meat.Count) -ForegroundColor Red }
else { Write-Host 'T2 : no red line names an Odyssey meat (meaningful only if Odyssey was OFF for this launch).' }
