# Start a Cursor My Machines worker for this repo.
# Keep this terminal open. Control agents from Cursor iOS or cursor.com/agents.
#
# Usage:
#   .\start-worker.ps1

param(
    [string]$Name = "steak-laptop"
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "Starting Cursor worker for steak..."
Write-Host "Repo: ElizaBackrooms/steak"
Write-Host "Control from phone: Cursor iOS app or https://cursor.com/agents"
Write-Host "Pick worker: $Name"
Write-Host ""

agent worker start --name $Name --worker-dir $PSScriptRoot
