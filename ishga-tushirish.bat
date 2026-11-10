@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Foydali Oyna ishga tushirilmoqda...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo XATO: Node.js topilmadi. https://nodejs.org dan o'rnatib qayta ishga tushiring.
    pause
    exit /b 1
)
start "" "http://localhost:8080"
node -e "const http=require('http'),fs=require('fs'),path=require('path');const root=process.cwd();const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.ico':'image/x-icon','.json':'application/json'};const s=http.createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);if(p==='/')p='/index.html';const f=path.join(root,p);if(!f.startsWith(root)){res.writeHead(403);res.end();return}fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);res.end('404');return}res.writeHead(200,{'Content-Type':mime[path.extname(f).toLowerCase()]||'application/octet-stream'});res.end(d)})});s.listen(8080,()=>console.log('Server: http://localhost:8080'));"
