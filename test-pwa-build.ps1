Write-Host "🚀 SUPERMAL KARAWACI PWA BUILD TEST SCRIPT" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Step 1: Clean environment
Write-Host "🧹 Step 1: Cleaning environment..." -ForegroundColor Yellow
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
if (Test-Path "package-lock.json") { Remove-Item -Force "package-lock.json" }
if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }
Write-Host "✅ Environment cleaned" -ForegroundColor Green

# Step 2: Fresh install
Write-Host "📦 Step 2: Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Step 3: TypeScript compilation test
Write-Host "🔍 Step 3: Testing TypeScript compilation..." -ForegroundColor Yellow
npx tsc --noEmit
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ TypeScript compilation successful" -ForegroundColor Green
} else {
    Write-Host "❌ TypeScript compilation failed" -ForegroundColor Red
    exit 1
}

# Step 4: Build test
Write-Host "🏗️ Step 4: Testing build process..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host "📁 Generated files:" -ForegroundColor Cyan
    Get-ChildItem -Path "dist" | Format-Table Name, Length, LastWriteTime
    
    Write-Host "🔍 Checking for PWA files:" -ForegroundColor Cyan
    if (Test-Path "dist/sw.js") {
        Write-Host "✅ Service Worker generated: dist/sw.js" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Service Worker not found" -ForegroundColor Yellow
    }
    
    if (Test-Path "dist/manifest.webmanifest") {
        Write-Host "✅ Web Manifest generated: dist/manifest.webmanifest" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Web Manifest not found" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

# Step 5: Preview test
Write-Host "🌐 Step 5: Testing preview server..." -ForegroundColor Yellow
Write-Host "Starting preview server on http://localhost:4173" -ForegroundColor Cyan
Write-Host "💡 Test these PWA features in your browser:" -ForegroundColor Cyan
Write-Host "   1. Open browser dev tools > Application > Service Workers" -ForegroundColor White
Write-Host "   2. Check Application > Manifest" -ForegroundColor White
Write-Host "   3. Look for 'Install app' option in browser" -ForegroundColor White
Write-Host "   4. Test offline mode (disconnect internet)" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the preview server when done testing" -ForegroundColor Yellow
npm run preview