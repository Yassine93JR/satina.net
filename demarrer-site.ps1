# Satina.net — serveur local statique
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root
Write-Host "Satina.net — http://localhost:8080" -ForegroundColor Cyan
Write-Host "Racine: $root" -ForegroundColor DarkGray
python -m http.server 8080
