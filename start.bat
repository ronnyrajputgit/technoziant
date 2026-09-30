@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required. Install Node.js 20.19+ or 22.12+ and try again.
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm is required. Reinstall Node.js with npm included and try again.
  exit /b 1
)

echo Installing project dependencies...
call npm install
if errorlevel 1 exit /b 1

echo Starting the project...
call npm start
exit /b %errorlevel%