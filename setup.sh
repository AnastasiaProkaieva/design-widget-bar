#!/bin/bash

# ============================================
# Agentforce Widget - Setup Script
# ============================================

echo ""
echo "🚀 Agentforce Widget Setup"
echo "=========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "   Please install Node.js v18+ from https://nodejs.org/"
    echo ""
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION detected"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    echo "   Please install npm (comes with Node.js)"
    echo ""
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm v$NPM_VERSION detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "   This may take a minute..."
echo ""

npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "============================================"
    echo "🎉 Setup complete!"
    echo "============================================"
    echo ""
    echo "Available commands:"
    echo ""
    echo "  npm run dev          Start development server"
    echo "  npm run build        Build for production"
    echo "  npm run build:widget Build standalone widget"
    echo ""
    echo "To start the app now, run:"
    echo ""
    echo "  npm run dev"
    echo ""
    echo "Then open http://localhost:5173 in your browser"
    echo ""
else
    echo ""
    echo "❌ Failed to install dependencies"
    echo "   Please check the error messages above"
    echo ""
    exit 1
fi
