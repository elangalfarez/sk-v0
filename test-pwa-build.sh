#!/bin/bash

echo "🚀 SUPERMAL KARAWACI PWA BUILD TEST SCRIPT"
echo "=========================================="

# Step 1: Clean environment
echo "🧹 Step 1: Cleaning environment..."
rm -rf node_modules package-lock.json dist/
echo "✅ Environment cleaned"

# Step 2: Fresh install
echo "📦 Step 2: Installing dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Step 3: TypeScript compilation test
echo "🔍 Step 3: Testing TypeScript compilation..."
npx tsc --noEmit
if [ $? -eq 0 ]; then
    echo "✅ TypeScript compilation successful"
else
    echo "❌ TypeScript compilation failed"
    exit 1
fi

# Step 4: Build test
echo "🏗️ Step 4: Testing build process..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Generated files:"
    ls -la dist/
    echo ""
    echo "🔍 Checking for PWA files:"
    if [ -f "dist/sw.js" ]; then
        echo "✅ Service Worker generated: dist/sw.js"
    else
        echo "⚠️ Service Worker not found"
    fi
    
    if [ -f "dist/manifest.webmanifest" ]; then
        echo "✅ Web Manifest generated: dist/manifest.webmanifest"
    else
        echo "⚠️ Web Manifest not found"
    fi
else
    echo "❌ Build failed"
    exit 1
fi

# Step 5: Preview test
echo "🌐 Step 5: Testing preview server..."
echo "Starting preview server on http://localhost:4173"
echo "💡 Test these PWA features in your browser:"
echo "   1. Open browser dev tools > Application > Service Workers"
echo "   2. Check Application > Manifest"
echo "   3. Look for 'Install app' option in browser"
echo "   4. Test offline mode (disconnect internet)"
echo ""
echo "Press Ctrl+C to stop the preview server when done testing"
npm run preview