# Windows Auto Download Script - Fixed Version
# Run this script as Administrator for best results

# Enable TLS 1.2 for secure downloads
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")
if (-not $isAdmin) {
    Write-Host "⚠️  Warning: Not running as Administrator. Some features may not work." -ForegroundColor Yellow
    Write-Host "💡 Tip: Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "===========================================" -ForegroundColor Green
Write-Host "     📥 WINDOWS AUTO DOWNLOAD SCRIPT" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""

# Create download folder in user directory (no admin needed)
$downloadPath = "$env:USERPROFILE\Downloads\Windows_ISO_Download"
if (!(Test-Path $downloadPath)) {
    try {
        New-Item -ItemType Directory -Path $downloadPath -Force | Out-Null
        Write-Host "📁 Created download folder: $downloadPath" -ForegroundColor Yellow
    } catch {
        Write-Host "❌ Failed to create folder. Using Downloads folder instead." -ForegroundColor Red
        $downloadPath = "$env:USERPROFILE\Downloads"
    }
}

Write-Host "🔧 Choose Windows version:" -ForegroundColor Cyan
Write-Host "1. Windows 10 (Latest)" -ForegroundColor White
Write-Host "2. Windows 11 (Latest)" -ForegroundColor White
Write-Host "3. Windows 10 LTSC 2021" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host "📥 Downloading Windows 10..." -ForegroundColor Green
        $url = "https://www.microsoft.com/en-us/software-download/windows10"
        
        # Download Media Creation Tool
        $mctUrl = "https://go.microsoft.com/fwlink/?LinkId=691209"
        $mctPath = Join-Path $downloadPath "MediaCreationTool_Win10.exe"
        
        Write-Host "📥 Downloading Media Creation Tool..." -ForegroundColor Yellow
        try {
            # Use WebClient as backup method
            $webClient = New-Object System.Net.WebClient
            $webClient.DownloadFile($mctUrl, $mctPath)
            
            Write-Host "✅ Media Creation Tool downloaded successfully!" -ForegroundColor Green
            Write-Host "📁 Location: $mctPath" -ForegroundColor Yellow
            
            # Ask if user wants to run it
            $runNow = Read-Host "Do you want to run Media Creation Tool now? (Y/N)"
            if ($runNow -eq "Y" -or $runNow -eq "y") {
                Start-Process $mctPath
            }
        } catch {
            Write-Host "❌ Failed to download Media Creation Tool" -ForegroundColor Red
            Write-Host "💡 Opening download page in browser..." -ForegroundColor Yellow
            Start-Process $url
        }
    }
    
    "2" {
        Write-Host "📥 Downloading Windows 11..." -ForegroundColor Green
        $url = "https://www.microsoft.com/en-us/software-download/windows11"
        
        # Download Media Creation Tool for Windows 11
        $mctUrl = "https://go.microsoft.com/fwlink/?linkid=2156295"
        $mctPath = Join-Path $downloadPath "MediaCreationTool_Win11.exe"
        
        Write-Host "📥 Downloading Media Creation Tool for Windows 11..." -ForegroundColor Yellow
        try {
            # Use WebClient as backup method
            $webClient = New-Object System.Net.WebClient
            $webClient.DownloadFile($mctUrl, $mctPath)
            
            Write-Host "✅ Media Creation Tool downloaded successfully!" -ForegroundColor Green
            Write-Host "📁 Location: $mctPath" -ForegroundColor Yellow
            
            # Ask if user wants to run it
            $runNow = Read-Host "Do you want to run Media Creation Tool now? (Y/N)"
            if ($runNow -eq "Y" -or $runNow -eq "y") {
                Start-Process $mctPath
            }
        } catch {
            Write-Host "❌ Failed to download Media Creation Tool" -ForegroundColor Red
            Write-Host "💡 Opening download page in browser..." -ForegroundColor Yellow
            Start-Process $url
        }
    }
    
    "3" {
        Write-Host "📥 Windows 10 LTSC 2021..." -ForegroundColor Green
        $url = "https://www.microsoft.com/en-us/evalcenter/download-windows-10-enterprise"
        Start-Process $url
        Write-Host "💡 Download Windows 10 LTSC from evaluation center" -ForegroundColor Yellow
        Write-Host "⚠️  Note: LTSC requires manual download from the website" -ForegroundColor Yellow
    }
    
    default {
        Write-Host "❌ Invalid choice!" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit
    }
}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Green
Write-Host "     📋 NEXT STEPS" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""
Write-Host "1. 📥 Wait for download to complete" -ForegroundColor White
Write-Host "2. 🔧 Run Media Creation Tool if downloaded" -ForegroundColor White
Write-Host "3. 💿 Choose 'Create installation media'" -ForegroundColor White
Write-Host "4. 📁 Select 'ISO file' option" -ForegroundColor White
Write-Host "5. 💾 Save ISO to: $downloadPath" -ForegroundColor White
Write-Host "6. 🗂️ Mount ISO and run setup.exe" -ForegroundColor White
Write-Host ""
Write-Host "💡 Alternative: Windows Reset" -ForegroundColor Yellow
Write-Host "   - Press Windows + I" -ForegroundColor White
Write-Host "   - Go to Update & Security > Recovery" -ForegroundColor White
Write-Host "   - Click 'Reset this PC'" -ForegroundColor White
Write-Host ""

# Open download folder
try {
    Start-Process explorer.exe $downloadPath
} catch {
    Write-Host "⚠️  Could not open folder automatically" -ForegroundColor Yellow
}

Write-Host "🎯 Script completed!" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to exit"