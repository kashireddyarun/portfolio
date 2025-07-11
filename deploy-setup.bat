@echo off
echo 🚀 Portfolio Deployment Helper
echo ============================
echo.

echo Checking if Git is installed...
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed. Please install Git first:
    echo 📥 Download from: https://git-scm.com/
    echo.
    pause
    exit /b 1
)

echo ✅ Git is installed
echo.

echo 🔨 Building the project...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed. Please fix any errors and try again.
    pause
    exit /b 1
)

echo ✅ Build successful!
echo.

echo 📦 Initializing Git repository...
git init
git add .
git commit -m "Initial commit: Portfolio ready for deployment"

echo.
echo 🎉 Your portfolio is ready for deployment!
echo.
echo Next steps:
echo 1. Create a repository on GitHub
echo 2. Run: git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
echo 3. Run: git push -u origin main
echo 4. Deploy to Vercel by connecting your GitHub repository
echo.
echo 📖 See DEPLOYMENT.md for detailed instructions
echo.
pause
