@echo off
chcp 65001 >nul
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0kunlik-yuklash.ps1"
echo.
echo (Yopish uchun ixtiyoriy tugmani bosing)
pause >nul
