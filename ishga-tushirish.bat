@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Foydali Oyna ishga tushirilmoqda (http://localhost:8000)...
start "" "http://localhost:8000"
python -m http.server 8000
