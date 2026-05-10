@echo off
setlocal
cd /d "%~dp0"

REM Kill anything listening on port 3000
for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":3000 " ^| findstr "LISTENING"') do (
    echo Stopping PID %%P on port 3000...
    taskkill /PID %%P /F >nul 2>&1
)

if exist .server.pid del .server.pid >nul 2>&1
echo FairPay stopped.
endlocal
