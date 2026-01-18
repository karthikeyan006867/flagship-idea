# HDIP Unified Deployment Script
# Deploy entire monorepo (Frontend + Backend) to Vercel as ONE application

Write-Host "╔══════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   HDIP UNIFIED DEPLOYMENT                ║" -ForegroundColor Cyan  
Write-Host "║   Frontend + Backend Together            ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Set Vercel token
$env:VERCEL_TOKEN = "khBdSXycxsTQULTcTOu3olGN"

# Check if Vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "⚠️  Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Vercel CLI" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Vercel CLI ready" -ForegroundColor Green
Write-Host ""

Write-Host "🚀 Deploying UNIFIED application..." -ForegroundColor Cyan
Write-Host "📦 This will deploy both frontend AND backend together" -ForegroundColor Yellow
Write-Host "🌐 They will run on the SAME domain!" -ForegroundColor Green
Write-Host ""

# Make sure we're in the root directory
$rootPath = "c:\Users\kaart\.vscode\projects\flagship idea"
Set-Location $rootPath

Write-Host "Installing dependencies..." -ForegroundColor Gray
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "Building projects..." -ForegroundColor Gray
    npm run build:frontend
    npm run build:backend
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Build successful" -ForegroundColor Green
        Write-Host ""
        
        # Deploy entire monorepo to Vercel
        Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
        vercel --prod --token $env:VERCEL_TOKEN
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "══════════════════════════════════════════" -ForegroundColor Cyan
            Write-Host "✅ UNIFIED DEPLOYMENT SUCCESSFUL! 🎉" -ForegroundColor Green
            Write-Host "══════════════════════════════════════════" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "Your application is now LIVE with:" -ForegroundColor Cyan
            Write-Host "  • Frontend and Backend on SAME domain" -ForegroundColor White
            Write-Host "  • Frontend: https://your-app.vercel.app" -ForegroundColor White
            Write-Host "  • Backend API: https://your-app.vercel.app/api" -ForegroundColor White
            Write-Host "  • GraphQL: https://your-app.vercel.app/graphql" -ForegroundColor White
            Write-Host ""
            Write-Host "🌐 No CORS issues - everything is linked!" -ForegroundColor Green
            Write-Host ""
            Write-Host "📝 Next steps:" -ForegroundColor Yellow
            Write-Host "1. Check your Vercel dashboard" -ForegroundColor White
            Write-Host "2. Add environment variables in Vercel settings" -ForegroundColor White
            Write-Host "3. Test your application!" -ForegroundColor White
        } else {
            Write-Host ""
            Write-Host "❌ Deployment failed" -ForegroundColor Red
            Write-Host "Check the errors above and try again" -ForegroundColor Yellow
            exit 1
        }
    } else {
        Write-Host "❌ Build failed. Please fix errors and try again." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Dependency installation failed" -ForegroundColor Red
    exit 1
}
Write-Host "3. Set up custom domain (optional)" -ForegroundColor White
Write-Host "4. Test your deployed application" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation: See DEPLOYMENT.md for details" -ForegroundColor Yellow
Write-Host ""
