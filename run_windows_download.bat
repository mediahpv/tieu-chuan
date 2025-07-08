@echo off
echo ============================================
echo      WINDOWS DOWNLOAD SCRIPT LAUNCHER
echo ============================================
echo.

REM Check if PowerShell script exists
if not exist "windows_download_fixed.ps1" (
    echo ERROR: windows_download_fixed.ps1 not found!
    echo Please make sure the script is in the same folder as this batch file.
    pause
    exit /b 1
)

echo Starting Windows Download Script...
echo.

REM Run PowerShell script with bypass execution policy
powershell.exe -ExecutionPolicy Bypass -NoProfile -File "windows_download_fixed.ps1"

echo.
echo Script execution completed.
pause