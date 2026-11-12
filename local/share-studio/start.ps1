param(
    [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'
$port = 4399
$url = "http://127.0.0.1:$port"
$studioDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$serverScript = Join-Path $studioDir 'server.ts'

# Check if already listening on port 4399
$listening = $false
try {
    $tcp = New-Object System.Net.Sockets.TcpClient
    $async = $tcp.BeginConnect('127.0.0.1', $port, $null, $null)
    $wait = $async.AsyncWaitHandle.WaitOne(250, $false)
    if ($wait -and $tcp.Connected) {
        $listening = $true
    }
    $tcp.Close()
} catch {
    $listening = $false
}

if (-not $listening) {
    $bunExe = (Get-Command bun -ErrorAction SilentlyContinue).Source
    if (-not $bunExe) {
        $bunExe = Join-Path $env:USERPROFILE '.bun\bin\bun.exe'
    }
    Start-Process -FilePath $bunExe -ArgumentList @('run', $serverScript) -WorkingDirectory $studioDir -WindowStyle Hidden
    for ($i = 0; $i -lt 20; $i++) {
        Start-Sleep -Milliseconds 120
        try {
            $tcp = New-Object System.Net.Sockets.TcpClient
            $async = $tcp.BeginConnect('127.0.0.1', $port, $null, $null)
            if ($async.AsyncWaitHandle.WaitOne(150, $false) -and $tcp.Connected) {
                $tcp.Close()
                break
            }
            $tcp.Close()
        } catch {}
    }
}

if (-not $NoBrowser) {
    Start-Process $url
}
Write-Host "✨ TokScale Share Studio 已就绪: $url" -ForegroundColor Yellow
