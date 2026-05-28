# Builds a clean Chrome Web Store zip containing only the runtime files.
# Usage: ./build.ps1   (reads version from manifest.json)

$ErrorActionPreference = "Stop"

$manifest = Get-Content -Raw manifest.json | ConvertFrom-Json
$version = $manifest.version
$outDir = "dist"
$zipName = "strip-ai-mode-$version.zip"
$zipPath = Join-Path $outDir $zipName

# Runtime files that ship to users (no dev/build artifacts).
$include = @(
  "manifest.json",
  "rules.json",
  "background.js",
  "popup/popup.html",
  "popup/popup.css",
  "popup/popup.js",
  "icons/icon16.png",
  "icons/icon48.png",
  "icons/icon128.png"
)

New-Item -ItemType Directory -Force -Path $outDir | Out-Null
if (Test-Path $zipPath) { Remove-Item $zipPath }

# Stage into a temp folder to preserve relative paths inside the zip.
$staging = Join-Path $env:TEMP ("strip-ai-mode-" + [guid]::NewGuid())
New-Item -ItemType Directory -Force -Path $staging | Out-Null
foreach ($f in $include) {
  $dest = Join-Path $staging $f
  New-Item -ItemType Directory -Force -Path (Split-Path $dest) | Out-Null
  Copy-Item $f $dest
}

Compress-Archive -Path (Join-Path $staging "*") -DestinationPath $zipPath
Remove-Item -Recurse -Force $staging

Write-Host "Built $zipPath (version $version)"
