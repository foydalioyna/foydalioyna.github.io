# ============================================================
#  Foydali Oyna - kunlik GitHub yuklash
#  Bugun = 1-kun. Jami 6 kun. Har kuni 1 marta commit + push.
#  Bu skript ASCII-only (encoding muammosi bo'lmasligi uchun).
# ============================================================
[CmdletBinding()]
param(
    [switch]$Force,                       # bugun allaqachon yuklangan bo'lsa ham qayta yuklash
    [string]$Date = ""                    # test uchun: -Date "2026-10-12"
)

$ErrorActionPreference = 'Stop'

$ScriptDir   = $PSScriptRoot
$ProjectDir  = Split-Path -Parent $ScriptDir
$ConfigPath  = Join-Path $ScriptDir 'config.json'
$StatePath   = Join-Path $ScriptDir 'holat.json'
$LogPath     = Join-Path $ScriptDir 'yuklash.log'
$JournalPath = Join-Path $ProjectDir 'KUNLAR.md'

function Write-Log([string]$Message) {
    $line = '[{0}] {1}' -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $Message
    Write-Host $line
    try { Add-Content -LiteralPath $LogPath -Value $line -Encoding UTF8 } catch { }
}

# --- config ---
if (-not (Test-Path -LiteralPath $ConfigPath)) {
    Write-Log 'XATO: config.json topilmadi. Avval sozlash.bat ni ishga tushiring.'
    exit 1
}
$cfg = Get-Content -LiteralPath $ConfigPath -Raw -Encoding UTF8 | ConvertFrom-Json

$Branch    = if ($cfg.branch)    { [string]$cfg.branch }    else { 'main' }
$TotalDays = if ($cfg.totalDays) { [int]$cfg.totalDays }     else { 6 }
$RemoteUrl = [string]$cfg.repoUrl
$TaskName  = if ($cfg.taskName)  { [string]$cfg.taskName }   else { 'FoydaliOyna-Kunlik-Yuklash' }
$GitUser   = [string]$cfg.userName
$GitEmail  = [string]$cfg.userEmail

# --- sana ---
if ($Date) {
    $today = [datetime]::ParseExact($Date, 'yyyy-MM-dd', $null).Date
} else {
    $today = (Get-Date).Date
}

# --- holat (state) ---
$state = $null
if (Test-Path -LiteralPath $StatePath) {
    try { $state = Get-Content -LiteralPath $StatePath -Raw -Encoding UTF8 | ConvertFrom-Json } catch { $state = $null }
}
if (-not $state) {
    $state = [pscustomobject]@{ startDate = $today.ToString('yyyy-MM-dd'); lastRun = ''; lastDay = 0 }
}
$start     = [datetime]::ParseExact([string]$state.startDate, 'yyyy-MM-dd', $null).Date
$dayNumber = [int](($today - $start).Days) + 1
$todayStr  = $today.ToString('yyyy-MM-dd')

if ($dayNumber -lt 1) {
    Write-Log "Boshlanish sanasi hali kelmagan. Kutilyapti."
    exit 0
}

# 6 kun tugadi -> vazifani ham o'chiramiz
if ($dayNumber -gt $TotalDays) {
    Write-Log "$TotalDays kun tugadi (bugun $dayNumber-kun). Skript to'xtadi."
    try { & schtasks.exe /Delete /TN $TaskName /F *> $null } catch { }
    exit 0
}

if (-not $Force -and ([string]$state.lastRun) -eq $todayStr) {
    Write-Log "$dayNumber-kun ($todayStr) allaqachon yuklangan. Qayta yuklanmadi."
    exit 0
}

# --- git bormi ---
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Log 'XATO: git topilmadi. sozlash.bat ni ishga tushiring yoki Git ornating.'
    exit 1
}

Set-Location -LiteralPath $ProjectDir

# --- repo bormi ---
if (-not (Test-Path -LiteralPath (Join-Path $ProjectDir '.git'))) {
    Write-Log 'Git repozitoriy yaratilmoqda...'
    git init | Out-Null
    git branch -M $Branch 2>$null | Out-Null
}

$remotes = @(git remote)
if ($remotes -notcontains 'origin') {
    if (-not $RemoteUrl) { Write-Log 'XATO: origin remote yoq va config.json da repoUrl bosh.'; exit 1 }
    git remote add origin $RemoteUrl
}

# --- kunlik yozuv (har kuni o'zgarish bo'lishi uchun) ---
$entry = "## Kun $dayNumber - $todayStr`r`n- Avtomatik yuklandi ($(Get-Date -Format 'HH:mm'))."
if (-not (Test-Path -LiteralPath $JournalPath)) {
    Set-Content -LiteralPath $JournalPath -Value "# Yuklash kunlari`r`n`r`n$entry" -Encoding UTF8
} else {
    Add-Content -LiteralPath $JournalPath -Value "`r`n$entry" -Encoding UTF8
}

git add -A | Out-Null

$commitMsg = "Kun $dayNumber ($todayStr): avtomatik yuklash"
git -c "user.name=$GitUser" -c "user.email=$GitEmail" commit -m $commitMsg 2>&1 | ForEach-Object { Write-Host $_ }
if ($LASTEXITCODE -ne 0) {
    Write-Log 'Commit qilinadigan ozgarish topilmadi.'
}

Write-Log "Push qilinmoqda: origin/$Branch ..."
git push -u origin $Branch 2>&1 | ForEach-Object { Write-Host $_ }
if ($LASTEXITCODE -ne 0) {
    Write-Log 'XATO: push amalga oshmadi. Autentifikatsiyani tekshiring (token yoki SSH).'
    exit 2
}

# --- holatni saqlash ---
$state.lastRun = $todayStr
$state.lastDay = $dayNumber
$state | ConvertTo-Json | Set-Content -LiteralPath $StatePath -Encoding UTF8

Write-Log "MUVAFFAQIYAT: $dayNumber-kun yuklandi ($todayStr)."
exit 0
