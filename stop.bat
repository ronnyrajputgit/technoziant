@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required to stop the project.
  exit /b 1
)

node scripts\stop.cjs
exit /b %errorlevel%