param([Parameter(Mandatory)][string]$CompanionMod)
$ErrorActionPreference = 'Stop'
$mod = Join-Path $PSScriptRoot '../Mod'
$defs = @{}
$sources = @{}
foreach ($file in Get-ChildItem (Join-Path $mod 'Defs') -Filter *.xml) {
    $xml = [xml](Get-Content $file.FullName -Raw)
    foreach ($def in $xml.DocumentElement.ChildNodes | Where-Object NodeType -eq Element) {
        $name = [string]$def.defName
        if ($defs.ContainsKey($name)) { throw "Duplicate defName: $name" }
        $defs[$name] = $def
        foreach ($field in $def.ChildNodes | Where-Object { $_.Name -in 'label','description' }) {
            if ([string]::IsNullOrWhiteSpace($field.InnerText)) { throw "Empty source: $name.$($field.Name)" }
            $sources["$name.$($field.Name)"] = $field.InnerText
        }
    }
}
$translations = @{}
foreach ($root in @($CompanionMod)) {
    $folder = Join-Path $root 'Languages/French/DefInjected'
    if (-not (Test-Path $folder)) { throw "Missing French resources: $folder" }
    foreach ($file in Get-ChildItem $folder -Recurse -Filter *.xml) {
        $xml = [xml](Get-Content $file.FullName -Raw)
        foreach ($entry in $xml.DocumentElement.ChildNodes | Where-Object NodeType -eq Element) {
            $name = $entry.Name.Split('.')[0]
            if (-not $defs.ContainsKey($name)) { continue } # The companion also translates upstream.
            if ($file.Directory.Name -cne $defs[$name].Name) { throw "Wrong Def type folder: $($file.FullName)" }
            if (-not $sources.ContainsKey($entry.Name)) { throw "Unknown owned injection path: $($entry.Name)" }
            if ($translations.ContainsKey($entry.Name)) { throw "Duplicate French path: $($entry.Name)" }
            if ([string]::IsNullOrWhiteSpace($entry.InnerText)) { throw "Empty French text: $($entry.Name)" }
            $translations[$entry.Name] = $entry.InnerText
        }
    }
}
$tokens = 0
foreach ($key in $sources.Keys) {
    if (-not $translations.ContainsKey($key)) { throw "Missing French text: $key" }
    $def = $defs[$key.Split('.')[0]]
    $slots = @($def.SelectNodes('ingredients/li')).Count
    foreach ($text in @($sources[$key], $translations[$key])) {
        foreach ($match in [regex]::Matches($text, '\{([^{}]*)\}')) {
            if ($match.Groups[1].Value -notmatch '^(\d+)_(adj|coll|plur|sing)$') {
                throw "Malformed ingredient token in $key : $($match.Value)"
            }
            if ([int]$Matches[1] -ge $slots) { throw "Ingredient slot outside definition in $key : $($match.Value)" }
            $tokens++
        }
        $withoutTokens = [regex]::Replace($text, '\{\d+_(adj|coll|plur|sing)\}', '')
        if ($withoutTokens -match '[{}]') { throw "Unbalanced token braces in $key" }
        if ($text -match '(?i)\b(TODO|TRANSLATE_ME|UNTRANSLATED)\b') { throw "Unfinished translation in $key" }
    }
}
Write-Output "PASS: $($defs.Count) owned defs; $($sources.Count) nonempty English fields and French paths; $tokens valid ingredient tokens; no duplicate, missing or unknown owned path."
Write-Output 'Scope: extension resources plus the explicitly supplied French companion. Semantic and in-game rendering review remain separate.'
