#!/bin/bash

# Railway Zero-Secrets Deployment Script
# This script helps deploy CHEGGIE AI Trader to Railway with minimal configuration

set -e

echo "======================================================"
echo "🚀 Railway Zero-Secrets Deployment Script"
echo "======================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo -e "${RED}❌ Railway CLI not found${NC}"
    echo "Please install Railway CLI first:"
    echo "  npm install -g @railway/cli"
    exit 1
fi

echo -e "${GREEN}✅ Railway CLI found${NC}"
echo ""

# Check if logged in
if ! railway whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Railway${NC}"
    echo "Logging in..."
    railway login
fi

echo -e "${GREEN}✅ Logged in to Railway${NC}"
echo ""

# Check if .agents file exists
if [ ! -f ".agents" ]; then
    echo -e "${RED}❌ .agents file not found${NC}"
    echo "Please ensure you're in the project root directory"
    exit 1
fi

# Check if railway.toml exists
if [ ! -f "railway.toml" ]; then
    echo -e "${RED}❌ railway.toml not found${NC}"
    echo "Please ensure Railway configuration is present"
    exit 1
fi

echo -e "${GREEN}✅ Configuration files found${NC}"
echo ""

# Ask user about deployment mode
echo "Select deployment mode:"
echo "  1) Demo Mode (no API keys required)"
echo "  2) Full Mode (configure API keys)"
read -p "Enter choice [1-2]: " mode_choice

if [ "$mode_choice" = "2" ]; then
    echo ""
    echo "=== Full Mode: API Key Configuration ==="
    echo "You will need to set environment variables in Railway dashboard"
    echo ""
    echo "Required API keys:"
    echo "  - OPENAI_API_KEY (for AI models)"
    echo "  - ALPHAADVANTAGE_API_KEY (for market data)"
    echo "  - JINA_API_KEY (for web search)"
    echo ""
    read -p "Press Enter to continue..."
fi

echo ""
echo "=== Deploying to Railway ==="
echo ""

# Check if project is already linked
if [ ! -f ".railway" ] && [ ! -d ".railway" ]; then
    echo "Creating new Railway project..."
    railway init
else
    echo -e "${GREEN}✅ Railway project already linked${NC}"
fi

echo ""
echo "Deploying application..."
railway up

echo ""
echo -e "${GREEN}✅ Deployment initiated!${NC}"
echo ""

# Get project URL
echo "Fetching project URL..."
sleep 3
PROJECT_URL=$(railway status 2>/dev/null | grep -oP 'https://[^ ]+' | head -1 || echo "")

if [ -n "$PROJECT_URL" ]; then
    echo -e "${GREEN}✅ Project URL: $PROJECT_URL${NC}"
else
    echo -e "${YELLOW}⚠️  URL not available yet. Check Railway dashboard.${NC}"
fi

echo ""
echo "=== Deployment Summary ==="
echo "✅ Application deployed to Railway"
echo "✅ Cost protection enabled"
echo "✅ Resource limits configured"

if [ "$mode_choice" = "1" ]; then
    echo "✅ Running in Demo Mode"
    echo ""
    echo "To enable full functionality:"
    echo "  1. Go to Railway dashboard"
    echo "  2. Navigate to your project"
    echo "  3. Go to Variables section"
    echo "  4. Add API keys:"
    echo "     - OPENAI_API_KEY"
    echo "     - ALPHAADVANTAGE_API_KEY"
    echo "     - JINA_API_KEY"
fi

echo ""
echo "=== Next Steps ==="
echo "1. Check deployment logs:"
echo "   railway logs"
echo ""
echo "2. Open Railway dashboard:"
echo "   railway open"
echo ""
echo "3. Monitor cost protection:"
echo "   Check resource usage in Railway dashboard"
echo ""
echo "4. For migration to Coolify:"
echo "   See COOLIFY_MIGRATION.md"
echo ""
echo "======================================================"
echo "🎉 Deployment Complete!"
echo "======================================================"
