@echo off
title Hostello Server
echo Starting Hostello Server...
echo.
"C:\Program Files\nodejs\node.exe" server.js
echo.
echo Server stopped. Press any key to restart...
pause
start-server.bat
