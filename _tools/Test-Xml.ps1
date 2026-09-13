param([Parameter(Mandatory)][string]$FlavorTextDefs)
$ErrorActionPreference = 'Stop'
$mod = Join-Path $PSScriptRoot '../Mod'
$files = @(Get-ChildItem $mod -Recurse -Filter *.xml)
foreach ($file in $files) { $null = [xml](Get-Content $file.FullName -Raw) }
$upstream = [xml]'<Defs />'
foreach ($file in Get-ChildItem $FlavorTextDefs -Recurse -Filter *.xml) {
    $doc = [xml](Get-Content $file.FullName -Raw)
    foreach ($node in $doc.DocumentElement.ChildNodes) {
        if ($node.NodeType -eq 'Element') {
            $null = $upstream.DocumentElement.AppendChild($upstream.ImportNode($node, $true))
        }
    }
}
$operations = 0
foreach ($file in Get-ChildItem (Join-Path $mod 'Patches') -Filter *.xml) {
    $doc = [xml](Get-Content $file.FullName -Raw)
    foreach ($operation in $doc.SelectNodes('//Operation')) {
        if ($operation.Class -ne 'PatchOperationAdd') { throw "Unsupported operation in $file" }
        $targets = $upstream.SelectNodes([string]$operation.xpath)
        if ($targets.Count -eq 0) { throw "Unmatched XPath in ${file}: $($operation.xpath)" }
        foreach ($target in $targets) {
            foreach ($node in $operation.value.ChildNodes) {
                if ($node.NodeType -eq 'Element') {
                    $null = $target.AppendChild($upstream.ImportNode($node, $true))
                }
            }
        }
        $operations++
    }
}
$reptiles = [xml](Get-Content (Join-Path $mod 'Defs/FlavorCategoryDefs_FR_Reptiles.xml') -Raw)
foreach ($meat in 'Meat_SeaTurtle','Meat_Alligator','Meat_MonitorLizard','Meat_Bullfrog') {
    $nodes = $reptiles.SelectNodes("//thingDefsToAbsorb/li[text()='$meat']")
    if ($nodes.Count -eq 0) { throw "Missing meat: $meat" }
    foreach ($node in $nodes) {
        if ($node.MayRequire -ne 'Ludeon.RimWorld.Odyssey') { throw "Missing Odyssey guard: $meat" }
    }
}
Write-Output "PASS: $($files.Count) XML files parsed; $operations patch operations matched and applied in memory; 4 Odyssey guards verified."
