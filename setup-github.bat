@echo off
REM GitHub Deployment Setup Script for Windows
REM This script helps you set up your repository for GitHub Pages deployment

echo.
echo ========================================
echo   GitHub Pages Deployment Setup
echo ========================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo Initializing git repository...
    git init
    echo Git repository initialized
) else (
    echo Git repository already initialized
)

echo.
set /p GITHUB_USERNAME="Enter your GitHub username: "

REM Update package.json homepage using PowerShell
powershell -Command "(Get-Content package.json) -replace 'YOUR_USERNAME', '%GITHUB_USERNAME%' | Set-Content package.json"

echo Updated package.json homepage

REM Check if remote exists
git remote get-url origin >nul 2>&1
if %errorlevel% equ 0 (
    echo Git remote already configured
    git remote -v
) else (
    set /p REPO_URL="Enter your GitHub repository URL (or press Enter to skip): "
    if not "!REPO_URL!"=="" (
        git remote add origin "%REPO_URL%"
        echo Git remote added: %REPO_URL%
    )
)

echo.
echo ========================================
echo   Next Steps:
echo ========================================
echo.
echo 1. Review and commit your changes:
echo    git add .
echo    git commit -m "Setup for GitHub Pages deployment"
echo.
echo 2. Push to GitHub:
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Enable GitHub Pages:
echo    - Go to your repository ^> Settings ^> Pages
echo    - Select 'GitHub Actions' as source
echo.
echo 4. Deploy your backend (see DEPLOYMENT.md for details)
echo.
echo 5. Set REACT_APP_API_URL secret:
echo    - Go to Settings ^> Secrets and variables ^> Actions
echo    - Add secret: REACT_APP_API_URL = your-backend-url/api
echo.
echo Setup complete! Check DEPLOYMENT.md for detailed instructions.
echo.
pause

