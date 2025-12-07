#!/bin/bash

# Local Development Setup Script
# Prepares the environment for local development

set -e

echo "======================================================"
echo "🛠️  CHEGGIE AI Trader - Local Setup"
echo "======================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if master.secrets.json already exists
if [ -f "master.secrets.json" ]; then
    echo -e "${YELLOW}⚠️  master.secrets.json already exists${NC}"
    read -p "Overwrite it? (y/N): " overwrite
    if [ "$overwrite" != "y" ] && [ "$overwrite" != "Y" ]; then
        echo "Skipping master.secrets.json creation"
    else
        cp master.secrets.json.template master.secrets.json
        echo -e "${GREEN}✅ master.secrets.json created from template${NC}"
    fi
else
    cp master.secrets.json.template master.secrets.json
    echo -e "${GREEN}✅ master.secrets.json created from template${NC}"
fi

# Check if .env exists
if [ -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env already exists${NC}"
    read -p "Overwrite it? (y/N): " overwrite
    if [ "$overwrite" != "y" ] && [ "$overwrite" != "Y" ]; then
        echo "Skipping .env creation"
    else
        cp .env.example .env
        echo -e "${GREEN}✅ .env created from .env.example${NC}"
    fi
else
    cp .env.example .env
    echo -e "${GREEN}✅ .env created from .env.example${NC}"
fi

echo ""
echo "======================================================"
echo "📋 Next Steps"
echo "======================================================"
echo ""
echo "1. Edit master.secrets.json with your actual API keys"
echo "2. Or edit .env with your secrets"
echo "3. Install dependencies: pip install -r requirements.txt"
echo "4. Run the application: python main.py"
echo ""
echo "For demo mode (no API keys needed):"
echo "  - Just run: python main.py"
echo "  - Application will use stub mode automatically"
echo ""
echo "For production mode:"
echo "  - Set OPENAI_API_KEY in .env or master.secrets.json"
echo "  - Set ALPHAADVANTAGE_API_KEY for live data"
echo "  - Set JINA_API_KEY for web search"
echo ""
echo "======================================================"
echo "✅ Local setup complete!"
echo "======================================================"
