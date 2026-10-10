# ============================================================
#  Foydali Oyna - GitHub sozlash (bir marta ishga tushiriladi)
#  1) git borligini tekshiradi (kerak bo'lsa ornatadi)
#  2) repo URL, ism, email so'raydi
#  3) 1-kunni yuklaydi
#  4) har kuni avtomatik yuklash vazifasini yaratadi
#  ASCII-only skript.
# ============================================================
$ErrorActionPreference = 'Stop'

$ScriptDir   = $PSScriptRoot
$ProjectDir  = Split-Path -Parent $ScriptDir
$ConfigPath  = Join-Path $ScriptDir 'config.json'
$DailyScript = Join-Path $ScriptDir 'kunlik-yuklash.ps1'
$TaskName    = 'FoydaliOyna-Kunlik-Yuklash'
$GitIgnore   = Join-Path $ProjectDir '.gitignore'

Write-Host ''
Write-Host '=== Foydali Oyna - GitHub sozlash ===' -ForegroundColor Cyan
Write-Host ("Loyiha papkasi: " + $ProjectDir)
Write-Host ''

function Ask([string]$Prompt, [string]$Default) {
    $suffix = ''
    if ($Default) { $suffix = " [" + $Default + "]" }
    $answer = Read-Host ($Prompt + $suffix)
    if ([string]::IsNullOrWhiteSpace($answer)) { return $Default }
    return $answer.Trim()
}

# ---------- 1. git ----------
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host 'git topilmadi.' -ForegroundColor Yellow
    $yes = Read-Host 'Git ni hozir ornataymi (winget orqali)? (ha/yoq)'
    if ($yes -match '^(ha|h|yes|y|1)$') {
        Write-Host 'Git ornatilmoqda, biroz kuting...' -ForegroundColor Cyan
        winget install --id Git.Git -e --source winget --accept-package-agreements --accept-source-agreements --disable-interactivity
        # PATH ni yangilash
        $m = [System.Environment]::GetEnvironmentVariable('Path', 'Machine')
        $u = [System.Environment]::GetEnvironmentVariable('Path', 'User')
        $env:Path = $m + ';' + $u
    }
}
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host 'XATO: git topilmadi. https://git-scm.com/download/win dan ornatib qayta urinib koring.' -ForegroundColor Red
    Read-Host 'Chiqish uchun Enter bosing'
    exit 1
}
Write-Host ('git: ' + (git --version)) -ForegroundColor Green
Write-Host ''

# ---------- 2. sozlamalar ----------
$old = $null
if (Test-Path -LiteralPath $ConfigPath) {
    try { $old = Get-Content -LiteralPath $ConfigPath -Raw -Encoding UTF8 | ConvertFrom-Json } catch { $old = $null }
}
$defRepo   = if ($old) { [string]$old.repoUrl }   else { '' }
$defName   = if ($old) { [string]$old.userName }  else { '' }
$defEmail  = if ($old) { [string]$old.userEmail } else { '' }
$defBranch = if ($old -and $old.branch) { [string]$old.branch } else { 'main' }
$defDays   = if ($old -and $old.totalDays) { [string]$old.totalDays } else { '6' }

$repoUrl = $defRepo
while ([string]::IsNullOrWhiteSpace($repoUrl)) {
    $repoUrl = (Read-Host 'GitHub repo URL (https://github.com/USER/REPO.git)').Trim()
    if ([string]::IsNullOrWhiteSpace($repoUrl)) { Write-Host 'Bu maydon majburiy!' -ForegroundColor Yellow }
}

$userName  = Ask 'Git foydalanuvchi nomi (GitHub username)' $defName
$userEmail = Ask 'Git email' $defEmail
$branch    = Ask 'Branch nomi' $defBranch
$daysRaw   = Ask 'Necha kun yuklanadi' $defDays
$totalDays = 6
[void][int]::TryParse($daysRaw, [ref]$totalDays)
if ($totalDays -lt 1) { $totalDays = 6 }

$config = [pscustomobject]@{
    repoUrl   = $repoUrl
    branch    = $branch
    userName  = $userName
    userEmail = $userEmail
    totalDays = $totalDays
    taskName  = $TaskName
}
$config | ConvertTo-Json | Set-Content -LiteralPath $ConfigPath -Encoding UTF8
Write-Host ('config.json yozildi: ' + $ConfigPath) -ForegroundColor Green

# ---------- git repo tayyorlash ----------
Set-Location -LiteralPath $ProjectDir
if (-not (Test-Path -LiteralPath (Join-Path $ProjectDir '.git'))) {
    Write-Host 'Git repozitoriy yaratilmoqda...' -ForegroundColor Cyan
    git init | Out-Null
    git branch -M $branch 2>$null | Out-Null
}
$remotes = @(git remote)
if ($remotes -notcontains 'origin') {
    git remote add origin $repoUrl
} else {
    git remote set-url origin $repoUrl
}
git config user.name  "$userName"
git config user.email "$userEmail"

# log/state fayllarni repoga qoshmaslik
$ignoreLines = @('_github/holat.json', '_github/yuklash.log')
if (-not (Test-Path -LiteralPath $GitIgnore)) {
    Set-Content -LiteralPath $GitIgnore -Value $ignoreLines -Encoding UTF8
} else {
    $existing = Get-Content -LiteralPath $GitIgnore -Encoding UTF8
    foreach ($ln in $ignoreLines) {
        if ($existing -notcontains $ln) { Add-Content -LiteralPath $GitIgnore -Value $ln -Encoding UTF8 }
    }
}

# ---------- 3. 1-kunni yuklash ----------
Write-Host ''
Write-Host '--- 1-kun yuklanmoqda ---' -ForegroundColor Cyan
& $DailyScript -Force
$firstOk = ($LASTEXITCODE -eq 0)

# ---------- 4. kunlik vazifa ----------
Write-Host ''
if ($firstOk) {
    $enable = Read-Host 'Har kuni avtomatik yuklashni yoqaymi? (ha/yoq)'
    if ($enable -match '^(ha|h|yes|y|1)$') {
        $time = Ask 'Har kuni soat nechada yuklansin (HH:mm, 24 soat)' '10:00'
        $tr = 'powershell.exe -NoProfile -ExecutionPolicy Bypass -File "' + $DailyScript + '"'
        $prevEap = $ErrorActionPreference
        $ErrorActionPreference = 'Continue'
        $taskOut = & schtasks.exe /Create /TN $TaskName /SC DAILY /ST $time /TR $tr /F 2>&1
        $taskCode = $LASTEXITCODE
        $ErrorActionPreference = $prevEap
        if ($taskCode -eq 0) {
            Write-Host ("Vazifa yaratildi: har kuni soat " + $time + " da yuklanadi.") -ForegroundColor Green
        } else {
            Write-Host ($taskOut | Out-String) -ForegroundColor Yellow
            Write-Host 'Vazifani yaratib bolmadi. PowerShell ni Administrator sifatida ochib qayta urinib koring.' -ForegroundColor Red
        }
    } else {
        Write-Host 'Avtomatik rejim ochirilmadi. Har kuni yuklash.bat ni ozingiz ishga tushirasiz.' -ForegroundColor Yellow
    }
} else {
    Write-Host 'Diqqat: 1-kun yuklashda muammo boldi. Avval xatoni togilang.' -ForegroundColor Red
}

Write-Host ''
Write-Host 'Tayyor!' -ForegroundColor Green
Read-Host 'Chiqish uchun Enter bosing'
