<#
.SYNOPSIS
  Reads a RimWorld Player.log and prints what the manual scenarios of TESTING.md look for.

.DESCRIPTION
  It REPORTS; it does not decide. A clean output means no red line named this mod in the log, which
  is one input of T1, T2, T3 and T13. It says nothing about what was on screen: a dish name, a
  translated label or a clipped description is read by a person. Mark a scenario `pass` in
  RESULTS.md only after doing what the scenario asks, never on this output alone.

  Read the log after the game has closed: it is rewritten at each launch, so copy it aside before
  the next one. The file is opened for shared reading, so running this while the game is up works,
  but the tail may still be missing.

  Nothing is launched, and nothing is written outside the console.

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File Tests/Manual/Check-PlayerLog.ps1
  powershell -ExecutionPolicy Bypass -File Tests/Manual/Check-PlayerLog.ps1 -Log Tests\Manual\logs\T2-2026-09-22.log
#>
param(
    [string]$Log = (Join-Path $env:USERPROFILE 'AppData\LocalLow\Ludeon Studios\RimWorld by Ludeon Studios\Player.log')
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath $Log)) { throw "no log at $Log" }
$info = Get-Item -LiteralPath $Log

# Shared read: the game may still hold the file.
$stream = [IO.File]::Open($info.FullName, [IO.FileMode]::Open, [IO.FileAccess]::Read, [IO.FileShare]::ReadWrite)
try {
    $reader = New-Object IO.StreamReader($stream)
    $text = $reader.ReadToEnd()
} finally { $stream.Dispose() }
$lines = $text -split "`r?`n"

Write-Host ("log        : {0}" -f $info.FullName)
Write-Host ("written    : {0}   size {1:N0} bytes   {2:N0} lines" -f $info.LastWriteTime, $info.Length, $lines.Count)
if (((Get-Date) - $info.LastWriteTime).TotalMinutes -lt 2) {
    Write-Host 'note       : written less than two minutes ago. If the game is still running, quit it and read again.' -ForegroundColor Yellow
}
Write-Host ''

# What names this mod. The prefixes are ours; the defNames are the ones TESTING.md T1 and T2 list.
$ours = @(
    'FlavorTextFR_', 'FlavorTextExtended_', 'nelim.flavortextextended',
    'FT_Leek', 'FT_Shallot', 'FT_Meat_Turtle', 'FT_Meat_Alligator', 'FT_Meat_Iguana', 'FT_Meat_Lizard', 'FT_Meat_Frog',
    'Keywords_Ingredients', 'Keywords_Mods', 'Keywords_Cultivation', 'Keywords_Shenzhou', 'Keywords_FoodCourtDiscovery',
    'Meat_Alligator', 'Meat_MonitorLizard', 'Meat_Bullfrog', 'Meat_SeaTurtle'
)
$odysseyMeats = @('Meat_Alligator', 'Meat_MonitorLizard', 'Meat_Bullfrog', 'Meat_SeaTurtle')

# A red line, in vanilla's wording or RimLogging's. Wide on purpose: it is a filter for a person.
$red = '(?i)(\[ERROR\]|could not resolve cross-reference|config error|xml error|patch operation|error in static constructor|exception)'

# The startup line of Flavor Text: the single most useful thing in the log.
$ft = $lines | Where-Object { $_ -match 'Flavor Text\]\s*mod is now active' } | Select-Object -First 1
if ($ft) {
    Write-Host "Flavor Text: $($ft -replace '<[^>]+>', '')"
    if ($ft -match '(\d+)\s+active FlavorDefs.*found out of\s+(\d+)\s+total') {
        Write-Host ("             active {0} of {1} total (hekmo 930 + this mod 901 = 1831 expected)" -f $Matches[1], $Matches[2])
    }
} else {
    Write-Host 'Flavor Text: NO startup line found. Either Flavor Text did not load, or the log is not from a launch that reached the main menu.' -ForegroundColor Yellow
}
Write-Host ''

$naming = @()
$other = 0
for ($i = 0; $i -lt $lines.Count; $i++) {
    $l = $lines[$i]
    if ($l -notmatch $red) { continue }
    $hit = $false
    foreach ($o in $ours) { if ($l.IndexOf($o, [StringComparison]::OrdinalIgnoreCase) -ge 0) { $hit = $true; break } }
    if ($hit) { $naming += [pscustomobject]@{ Line = $i + 1; Text = $l.Trim() } } else { $other++ }
}

if ($naming.Count -eq 0) {
    Write-Host 'red lines naming this mod : none' -ForegroundColor Green
} else {
    Write-Host ("red lines naming this mod : {0}" -f $naming.Count) -ForegroundColor Red
    foreach ($n in $naming | Select-Object -First 40) {
        $t = if ($n.Text.Length -gt 220) { $n.Text.Substring(0, 220) + '...' } else { $n.Text }
        Write-Host ("  line {0}: {1}" -f $n.Line, $t)
    }
    if ($naming.Count -gt 40) { Write-Host ("  ... and {0} more" -f ($naming.Count - 40)) }
}
Write-Host ("other red lines           : {0}  (any mod, vanilla included: read them, they are not counted against this one)" -f $other)

# T2 in particular: an unresolved Odyssey meat is the exact failure the guards exist to prevent.
$meatHits = @($naming | Where-Object { $t = $_.Text; $odysseyMeats | Where-Object { $t -match $_ } })
Write-Host ''
if ($meatHits.Count -gt 0) {
    Write-Host ("T2 : {0} red line(s) name an Odyssey meat. Without Odyssey that is the defect the MayRequire guards prevent." -f $meatHits.Count) -ForegroundColor Red
} else {
    Write-Host 'T2 : no red line names an Odyssey meat (meaningful only if Odyssey was OFF for this launch).'
}

Write-Host ''
Write-Host 'This is a reading of the log. It does not replace doing the scenario.' -ForegroundColor DarkGray
exit 0
