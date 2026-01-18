# HDIP Installation Script
# Run this script to set up the development environment

Write-Host "🚀 HDIP - Human Decision Intelligence Platform Setup" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js version
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js is not installed. Please install Node.js >= 18.0.0" -ForegroundColor Red
    exit 1
}

# Check npm version
$npmVersion = npm --version 2>$null
if ($npmVersion) {
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm is not installed" -ForegroundColor Red
    exit 1
}

# Check PostgreSQL
Write-Host ""
Write-Host "🔍 Checking PostgreSQL..." -ForegroundColor Yellow
$pgService = Get-Service -Name "postgresql*" -ErrorAction SilentlyContinue
if ($pgService) {
    Write-Host "✅ PostgreSQL service found: $($pgService.Name)" -ForegroundColor Green
} else {
    Write-Host "⚠️  PostgreSQL service not found. You'll need to install PostgreSQL 14+" -ForegroundColor Yellow
    Write-Host "   Download from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
}

# Install dependencies
Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
Write-Host "   This may take a few minutes..." -ForegroundColor Gray
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Create .env file if it doesn't exist
Write-Host ""
Write-Host "⚙️  Setting up environment..." -ForegroundColor Yellow
if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Created .env file from template" -ForegroundColor Green
    Write-Host "   ⚠️  Please edit .env with your database credentials" -ForegroundColor Yellow
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

# Check if database exists
Write-Host ""
Write-Host "🗄️  Database setup..." -ForegroundColor Yellow
$dbName = "hdip_development"

Write-Host "   Attempting to create database '$dbName'..." -ForegroundColor Gray
$createDbResult = psql -U postgres -c "CREATE DATABASE $dbName;" 2>&1

if ($createDbResult -like "*already exists*") {
    Write-Host "✅ Database '$dbName' already exists" -ForegroundColor Green
} elseif ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database '$dbName' created successfully" -ForegroundColor Green
} else {
    Write-Host "⚠️  Could not create database automatically" -ForegroundColor Yellow
    Write-Host "   Please create it manually:" -ForegroundColor Yellow
    Write-Host "   psql -U postgres -c `"CREATE DATABASE $dbName;`"" -ForegroundColor Gray
}

# Summary
Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "✨ Setup Complete!" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Edit .env file with your database credentials" -ForegroundColor White
Write-Host "   2. Run: npm run dev" -ForegroundColor White
Write-Host "   3. Open: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Yellow
Write-Host "   - README.md - Project overview" -ForegroundColor White
Write-Host "   - QUICKSTART.md - Quick start guide" -ForegroundColor White
Write-Host "   - SETUP.md - Detailed setup instructions" -ForegroundColor White
Write-Host "   - ARCHITECTURE.md - Technical architecture" -ForegroundColor White
Write-Host "   - ROADMAP.md - Product roadmap" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Happy coding!" -ForegroundColor Cyan
