# AI Creation v1.5.8 portable launcher (ASCII only, PowerShell reads UTF-8/UTF-16 paths correctly)
$ErrorActionPreference = 'Continue'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $root

$exe    = Join-Path $root ([string][char]0x68A6 + [char]0x989C + 'AI.exe')   # -> exe name
$gwDir  = Join-Path $root 'resources\gateway'
$gwFile = Join-Path $gwDir 'ai-gateway.cjs'
$dataDir = Join-Path $root 'user-data\data\gateway'

if (-not (Test-Path -LiteralPath $exe)) {
  # fallback: find any exe in root with this size pattern
  $cand = Get-ChildItem -LiteralPath $root -Filter '*.exe' -File -ErrorAction SilentlyContinue |
          Where-Object { $_.Name -ne 'launcher.exe' } | Select-Object -First 1
  if ($cand) { $exe = $cand.FullName } else { Write-Host "[launcher] exe not found"; exit 1 }
}

New-Item -ItemType Directory -Path $dataDir -Force | Out-Null

function Test-Gateway {
  try {
    $r = Invoke-RestMethod 'http://127.0.0.1:8787/api/health' -TimeoutSec 2
    return [bool]$r.ok
  } catch { return $false }
}

if (Test-Gateway) {
  Write-Host '[launcher] gateway already running'
} else {
  Write-Host '[launcher] starting local gateway ...'
  $env:ELECTRON_RUN_AS_NODE = '1'
  $env:AI_GATEWAY_PORT = '8787'
  $env:AI_GATEWAY_DATA_DIR = $dataDir
  $env:AI_GATEWAY_LICENSE_FILE = (Join-Path $root 'user-data\license.json')
  $env:AI_GATEWAY_LICENSE_MODULE = (Join-Path $gwDir 'license-core.cjs')
  $env:AI_GATEWAY_LOG = (Join-Path $root 'user-data\gateway.log')

  Start-Process -FilePath $exe -ArgumentList @($gwFile) -WorkingDirectory $gwDir -WindowStyle Hidden | Out-Null
  Remove-Item Env:\ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue

  $ready = $false
  for ($i = 0; $i -lt 10; $i++) {
    Start-Sleep -Milliseconds 700
    if (Test-Gateway) { $ready = $true; break }
  }
  if ($ready) { Write-Host '[launcher] gateway ready' }
  else { Write-Host '[launcher] gateway not ready, client will fall back to remote' }
}

Write-Host '[launcher] starting client ...'
$env:ELECTRON_RUN_AS_NODE = $null
Remove-Item Env:\ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
Start-Process -FilePath $exe -WorkingDirectory $root | Out-Null
Write-Host '[launcher] done'
