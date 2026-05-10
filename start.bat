@echo off
setlocal
cd /d "%~dp0"

REM --- Stop any previous instance recorded in .server.pid ---
if exist .server.pid (
    set /p OLD_PID=<.server.pid
    tasklist /FI "PID eq %OLD_PID%" 2>nul | find "%OLD_PID%" >nul
    if not errorlevel 1 (
        echo Stopping previous FairPay server (PID %OLD_PID%)...
        taskkill /PID %OLD_PID% /F >nul 2>&1
    )
    del .server.pid >nul 2>&1
)

REM --- Free port 3000 if anything else is on it ---
for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":3000 " ^| findstr "LISTENING"') do (
    echo Freeing port 3000 (killing PID %%P)...
    taskkill /PID %%P /F >nul 2>&1
)

echo Starting FairPay on http://127.0.0.1:3000/
start "FairPay" /MIN cmd /c "node server.js > server.log 2>&1 & echo %ERRORLEVEL%"

REM Give Node a second to bind, then open the browser
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:3000/"

echo.
echo FairPay is running. Logs: server.log
echo Close the minimized FairPay window or run stop.bat to stop it.
endlocal
