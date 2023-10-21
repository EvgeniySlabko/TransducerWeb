setlocal enabledelayedexpansion
mkdir Output
del /s /q Output
REM Building web application
call cross-env ENV=WEB DIST="Output\server" cross-env npx webpack-cli build --config webpack.prod.js
echo start "" "http://localhost:8080/" > "Output\server\run-server.bat"
echo cross-env ENV=WEB STATIC='./' SOURCE=index.html node server.js >> "Output\server\run-server.bat"
echo pause >> "Output\server\run-server.bat"
copy server.js "Output\server"
REM Building desktop app

set "localPath=dist/index.html"
for %%A in ("%localPath%") do set "absolutePath=%%~fA"
set "absolutePath=%absolutePath:\=/%"
echo "%absolutePath%"

call cross-env ENV=ELECTRON SOURCE=%localPath% DIST=dist cross-env npx webpack-cli build --config webpack.prod.js
call cross-env ENV=ELECTRON electron-forge package
set "sourceDirectory=out"
set "destinationDirectory=Output\desktop"
move "%sourceDirectory%\*.*" "%destinationDirectory%"
pause
