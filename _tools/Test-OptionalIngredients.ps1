param([string]$Workshop = 'C:/Program Files (x86)/Steam/steamapps/workshop/content/294100')
$ErrorActionPreference = 'Stop'
# Provider IDs discovered from local About.xml files; metadata is rechecked on every run.
$providers = @{
    'vvenchov.vvnewharvest' = '3448458106'
    'vanillaexpanded.vplantsemore' = '2748889667'
    'dismarzero.vgp.vgpvegetablegarden' = '2007061826'
    'daylight.rimlifeextrgmod' = '2951594887'
    'daylight.rlevvcultivationplus' = '3614595617'
    'dajian.chiteaditional.expanded.oldmode' = '2371079000'
    'dajian.chiteaditional.expanded' = '2877536640'
}
$mod = Join-Path $PSScriptRoot '../Mod'
$references = @()
foreach ($file in Get-ChildItem $mod -Recurse -Filter *.xml) {
    $xml = [xml](Get-Content $file.FullName -Raw)
    $nodes = @($xml.SelectNodes('/Defs/FlavorText.FlavorCategoryDef/thingDefsToAbsorb/li'))
    foreach ($op in $xml.SelectNodes('/Patch/Operation')) {
        if ([string]$op.xpath -like '*/thingDefsToAbsorb') { $nodes += @($op.SelectNodes('value/li')) }
    }
    foreach ($node in $nodes) {
        $guard = $node.GetAttribute('MayRequire') + ',' + $node.GetAttribute('MayRequireAnyOf')
        foreach ($id in $guard.Split(',') | ForEach-Object { $_.Trim().ToLowerInvariant() } | Where-Object { $_ }) {
            if ($id -eq 'ludeon.rimworld.odyssey') { continue } # Covered by Test-Xml.ps1.
            if (-not $providers.ContainsKey($id)) { throw "Unknown provider mapping: $id" }
            $references += [pscustomobject]@{Package=$id; Def=$node.InnerText; File=$file.Name}
        }
    }
}
$errors = @()
foreach ($id in $references.Package | Sort-Object -Unique) {
    $root = Join-Path $Workshop $providers[$id]
    $about = ([xml](Get-Content (Join-Path $root 'About/About.xml') -Raw)).ModMetaData
    if ([string]$about.packageId -ine $id) { throw "Provider package ID mismatch at $root" }
    $loadFile = Get-ChildItem $root -Filter LoadFolders.xml | Select-Object -First 1
    $folders = @('')
    if ($loadFile) {
        $load = [xml](Get-Content $loadFile.FullName -Raw)
        $version = @($load.loadFolders.ChildNodes | Where-Object { $_.Name -match '^v\d+\.\d+$' -and [version]$_.Name.Substring(1) -le [version]'1.6' } |
            Sort-Object { [version]$_.Name.Substring(1) } -Descending)[0]
        if (-not $version) { throw "No supported LoadFolders fallback for $id" }
        $folders = @($version.SelectNodes('li[not(@IfModActive) and not(@IfModNotActive)]') | ForEach-Object { $_.InnerText.Trim('/') })
    } else {
        if (Test-Path (Join-Path $root 'Common/Defs')) { $folders += 'Common' }
        if (Test-Path (Join-Path $root '1.6/Defs')) { $folders += '1.6' }
    }
    $names = [Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
    foreach ($folder in $folders) {
        $defsPath = Join-Path (Join-Path $root $folder) 'Defs'
        if (-not (Test-Path $defsPath)) { continue }
        foreach ($file in Get-ChildItem $defsPath -Recurse -Filter *.xml) {
            foreach ($def in ([xml](Get-Content $file.FullName -Raw)).SelectNodes('/Defs/ThingDef/defName')) {
                $null = $names.Add($def.InnerText)
            }
        }
    }
    $ownedRefs = @($references | Where-Object Package -eq $id)
    foreach ($ref in $ownedRefs) {
        if (-not $names.Contains($ref.Def)) { $errors += "$($ref.File): $($ref.Def) absent from $id loaded Defs ($($folders -join ', '))" }
    }
    $support = @($about.supportedVersions.li) -contains '1.6'
    Write-Output "$id : $($ownedRefs.Count) references; declares 1.6=$support; folders=$($folders -join ', ')"
    if (-not $support) { Write-Output 'NOTE: historical optional hook only; provider game compatibility is not certified.' }
}
foreach ($errorText in $errors) { Write-Output "FAIL: $errorText" }
if ($errors.Count) { throw "$($errors.Count) optional ingredient references do not resolve." }
Write-Output "PASS: $($references.Count) guarded provider-reference pairs resolve in their selected XML folders. Game execution and third-party code behavior are separate checks."
