param(
    [string]$Chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
)
$ErrorActionPreference = 'Stop'
$palette = Get-Content (Join-Path $PSScriptRoot 'preview-palette.json') -Raw | ConvertFrom-Json
$root = Split-Path $PSScriptRoot -Parent
$version = ([xml](Get-Content (Join-Path $root 'Mod/About/About.xml') -Raw)).ModMetaData.supportedVersions.li |
    Sort-Object { [version]$_ } -Descending | Select-Object -First 1
$html = @'
<!doctype html>
<html lang="en"><meta charset="utf-8"><title>Flavor Text Extended Preview</title>
<style>
* { box-sizing: border-box; }
html, body { margin: 0; width: 896px; height: 504px; overflow: hidden; }
body { font-family: "Segoe UI", system-ui, sans-serif; background: url("Preview.png") center / cover; }
.veil { position: absolute; inset: 0; background: linear-gradient(90deg, color-mix(in srgb, __veil__ 96%, transparent) 0%, color-mix(in srgb, __veil__ 94%, transparent) 48%, transparent 83%); }
.copy { position: absolute; left: 50px; top: 54px; color: __inkPrimary__; text-shadow: 0 3px 10px rgba(0,0,0,.75); }
h1 { margin: 0; font-size: 46px; font-weight: 600; line-height: 1.1; letter-spacing: 0; }
h1 span { font-size: .65em; color: __inkSecondary__; }
.rule { width: 58px; height: 3px; background: __accent__; margin: 20px 0 16px; }
p { margin: 0; width: 430px; font-size: 21px; font-weight: 400; line-height: 1.45; }
.badge { position: absolute; right: 0; top: 0; width: 80px; height: 80px; background: __accent__; clip-path: polygon(0 0,100% 0,100% 100%); }
.version { position: absolute; left: 869px; top: 27px; transform: translate(-50%,-50%) rotate(45deg); color: __badgeInk__; font-size: 26px; font-weight: 700; line-height: 1; }
</style>
<div class="veil"></div>
<div class="copy"><h1>Flavor Text <span>Extended</span></h1><div class="rule"></div><p>New dishes for Flavor Text, French and regional cooking first.</p></div>
<div class="badge"></div><div class="version">__version__</div>
<script>document.fonts.ready.then(() => { document.documentElement.dataset.fontsReady = 'true'; });</script>
</html>
'@
foreach ($property in $palette.PSObject.Properties) {
    $html = $html.Replace("__$($property.Name)__", $property.Value)
}
$html = $html.Replace('__version__', $version)
$htmlPath = Join-Path $PSScriptRoot 'preview.html'
[IO.File]::WriteAllText($htmlPath, $html, [Text.UTF8Encoding]::new($false))
$profile = Join-Path $root '.build/preview-chrome'
$null = New-Item -ItemType Directory -Path $profile -Force
$output = Join-Path $root 'Mod/About/Preview.png'
$chromeArgs = @('--headless', '--disable-gpu', '--disable-background-networking', '--no-first-run',
    '--no-default-browser-check', "--user-data-dir=$profile", '--hide-scrollbars',
    '--force-device-scale-factor=1', '--window-size=896,504', '--virtual-time-budget=3000',
    "--screenshot=$output", ([Uri]$htmlPath).AbsoluteUri)
$quotedArgs = $chromeArgs | ForEach-Object { '"' + $_ + '"' }
$process = Start-Process -FilePath $Chrome -ArgumentList $quotedArgs -WindowStyle Hidden -Wait -PassThru
if ($process.ExitCode -ne 0) { throw "Chrome rendering failed: $($process.ExitCode)" }
Write-Output "Rendered $output from preview.html and preview-palette.json."
