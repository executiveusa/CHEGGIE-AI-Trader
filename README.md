# Welcome to your Lovable project

## Agents Dashboard (Flowise)

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Deploy on Railway](https://img.shields.io/badge/Deploy-Railway-purple.svg)](https://railway.app/new/template?template=https://github.com/executiveusa/CHEGGIE-AI-Trader)
[![Feishu](https://img.shields.io/badge/💬Feishu-Group-blue?style=flat)](./Communication.md) 
[![WeChat](https://img.shields.io/badge/WeChat-Group-green?style=flat&logo=wechat)](./Communication.md)

**Five AIs battle for NASDAQ 100 supremacy. Zero human input. Pure competition.**

## 🎉 NEW: Zero-Secrets Railway Deployment!

Deploy this application to Railway **without any API keys or configuration**! The app runs in demo mode using local data, with optional API keys for full functionality.

**🚀 [One-Click Deploy to Railway](https://railway.app/new/template?template=https://github.com/executiveusa/CHEGGIE-AI-Trader)** | **📖 [Deployment Guide](RAILWAY_DEPLOYMENT.md)** | **🔒 [Zero-Secrets Architecture](ZERO_SECRETS_README.md)**

**Features:**
- ✅ Deploy in seconds without configuration
- ✅ Automatic cost protection and free-tier monitoring
- ✅ Gradual enhancement (add API keys later)
- ✅ Built-in Coolify migration support

## 🏆 Current Championship Leaderboard 🏆 
[*click me to check*](https://hkuds.github.io/AI-Trader/)

<div align="center">

###  **Championship Period: (Last Update 2025/10/24)**

| 🏆 Rank | 🤖 AI Model | 📈 Total Earnings | 
|---------|-------------|----------------|
| **🥇 1st** | **DeepSeek** | 🚀 +10.61% | 
| 🥈 2nd | Claude-3.7 | 📊 +4.03% | 
| 🥉 3rd | GPT-5 | 📊 +3.89% | 
| 4th | Qwen3-max | 📊 +2.49% |
| Baseline | QQQ | 📊 +2.30%|
| 5th | Gemini-2.5-flash | 📊 -2.73% |

### 📊 **Live Performance Dashboard**
![rank](assets/rank.png)

*Daily Performance Tracking of AI Models in NASDAQ 100 Trading*

</div>


[🚀 Railway Deployment](#-railway-deployment) • [🚀 Quick Start](#-quick-start) • [📈 Performance Analysis](#-performance-analysis) • [🛠️ Configuration Guide](#-configuration-guide) • [中文文档](README_CN.md)

</div>

---

## 🌟 Project Introduction

> **AI-Trader enables five distinct AI models, each employing unique investment strategies, to compete autonomously in the same market and determine which can generate the highest profits in NASDAQ 100 trading!**

### 🎯 Core Features

- 🤖 **Fully Autonomous Decision-Making**: AI agents perform 100% independent analysis, decision-making, and execution without human intervention
- 🛠️ **Pure Tool-Driven Architecture**: Built on MCP toolchain, enabling AI to complete all trading operations through standardized tool calls
- 🏆 **Multi-Model Competition Arena**: Deploy multiple AI models (GPT, Claude, Qwen, etc.) for competitive trading
- 📊 **Real-Time Performance Analytics**: Comprehensive trading records, position monitoring, and profit/loss analysis
- 🔍 **Intelligent Market Intelligence**: Integrated Jina search for real-time market news and financial reports
- ⚡ **MCP Toolchain Integration**: Modular tool ecosystem based on Model Context Protocol
- 🔌 **Extensible Strategy Framework**: Support for third-party strategies and custom AI agent integration
- ⏰ **Historical Replay Capability**: Time-period replay functionality with automatic future information filtering

---

### 🎮 Trading Environment
Each AI model starts with $10,000 to trade NASDAQ 100 stocks in a controlled environment with real market data and historical replay capabilities.

- 💰 **Initial Capital**: $10,000 USD starting balance
- 📈 **Trading Universe**: NASDAQ 100 component stocks (top 100 technology stocks)
- ⏰ **Trading Schedule**: Weekday market hours with historical simulation support
- 📊 **Data Integration**: Alpha Vantage API combined with Jina AI market intelligence
- 🔄 **Time Management**: Historical period replay with automated future information filtering

---

### 🧠 Agentic Trading Capabilities
AI agents operate with complete autonomy, conducting market research, making trading decisions, and continuously evolving their strategies without human intervention.

- 📰 **Autonomous Market Research**: Intelligent retrieval and filtering of market news, analyst reports, and financial data
- 💡 **Independent Decision Engine**: Multi-dimensional analysis driving fully autonomous buy/sell execution
- 📝 **Comprehensive Trade Logging**: Automated documentation of trading rationale, execution details, and portfolio changes
- 🔄 **Adaptive Strategy Evolution**: Self-optimizing algorithms that adjust based on market performance feedback

---

### 🏁 Competition Rules
All AI models compete under identical conditions with the same capital, data access, tools, and evaluation metrics to ensure fair comparison.

- 💰 **Starting Capital**: $10,000 USD initial investment
- 📊 **Data Access**: Uniform market data and information feeds
- ⏰ **Operating Hours**: Synchronized trading time windows
- 📈 **Performance Metrics**: Standardized evaluation criteria across all models
- 🛠️ **Tool Access**: Identical MCP toolchain for all participants

🎯 **Objective**: Determine which AI model achieves superior investment returns through pure autonomous operation!

### 🚫 Zero Human Intervention
AI agents operate with complete autonomy, making all trading decisions and strategy adjustments without any human programming, guidance, or intervention.

- ❌ **No Pre-Programming**: Zero preset trading strategies or algorithmic rules
- ❌ **No Human Input**: Complete reliance on inherent AI reasoning capabilities
- ❌ **No Manual Override**: Absolute prohibition of human intervention during trading
- ✅ **Tool-Only Execution**: All operations executed exclusively through standardized tool calls
- ✅ **Self-Adaptive Learning**: Independent strategy refinement based on market performance feedback

---

## ⏰ Historical Replay Architecture

A core innovation of AI-Trader Bench is its **fully replayable** trading environment, ensuring scientific rigor and reproducibility in AI agent performance evaluation on historical market data.

### 🔄 Temporal Control Framework

#### 📅 Flexible Time Settings
```json
{
  "date_range": {
    "init_date": "2025-01-01",  // Any start date
    "end_date": "2025-01-31"    // Any end date
  }
}
```
---

### 🛡️ Anti-Look-Ahead Data Controls
AI can only access market data from current time and before. No future information allowed.

- 📊 **Price Data Boundaries**: Market data access limited to simulation timestamp and historical records
- 📰 **News Chronology Enforcement**: Real-time filtering prevents access to future-dated news and announcements
- 📈 **Financial Report Timeline**: Information restricted to officially published data as of current simulation date
- 🔍 **Historical Intelligence Scope**: Market analysis constrained to chronologically appropriate data availability

### 🎯 Replay Advantages

#### 🔬 Empirical Research Framework
- 📊 **Market Efficiency Studies**: Evaluate AI performance across diverse market conditions and volatility regimes
- 🧠 **Decision Consistency Analysis**: Examine temporal stability and behavioral patterns in AI trading logic
- 📈 **Risk Management Assessment**: Validate effectiveness of AI-driven risk mitigation strategies

#### 🎯 Fair Competition Framework
- 🏆 **Equal Information Access**: All AI models operate with identical historical datasets
- 📊 **Standardized Evaluation**: Performance metrics calculated using uniform data sources
- 🔍 **Full Reproducibility**: Complete experimental transparency with verifiable results

---

## 📁 Project Architecture

```
AI-Trader Bench/
├── 🤖 Core System
│   ├── main.py    # 🎯 Main program entry
│   ├── agent/base_agent/          # 🧠 AI agent core
│   └── configs/                   # ⚙️ Configuration files
│
├── 🛠️ MCP Toolchain
│   ├── agent_tools/
│   │   ├── tool_trade.py          # 💰 Trade execution
│   │   ├── tool_get_price_local.py # 📊 Price queries
│   │   ├── tool_jina_search.py   # 🔍 Information search
│   │   └── tool_math.py           # 🧮 Mathematical calculations
│   └── tools/                     # 🔧 Auxiliary tools
│
├── 📊 Data System
│   ├── data/
│   │   ├── daily_prices_*.json    # 📈 Stock price data
│   │   ├── merged.jsonl           # 🔄 Unified data format
│   │   └── agent_data/            # 📝 AI trading records
│   └── calculate_performance.py   # 📈 Performance analysis
│
├── 🎨 Frontend Interface
│   └── frontend/                  # 🌐 Web dashboard
│
└── 📋 Configuration & Documentation
    ├── configs/                   # ⚙️ System configuration
    ├── prompts/                   # 💬 AI prompts
    └── calc_perf.sh              # 🚀 Performance calculation script
```

### 🔧 Core Components Details

#### 🎯 Main Program (`main.py`)
- **Multi-Model Concurrency**: Run multiple AI models simultaneously for trading
- **Configuration Management**: Support for JSON configuration files and environment variables
- **Date Management**: Flexible trading calendar and date range settings
- **Error Handling**: Comprehensive exception handling and retry mechanisms

#### 🛠️ MCP Toolchain
| Tool | Function | API |
|------|----------|-----|
| **Trading Tool** | Buy/sell stocks, position management | `buy()`, `sell()` |
| **Price Tool** | Real-time and historical price queries | `get_price_local()` |
| **Search Tool** | Market information search | `get_information()` |
| **Math Tool** | Financial calculations and analysis | Basic mathematical operations |

#### 📊 Data System
- **📈 Price Data**: Complete OHLCV data for NASDAQ 100 component stocks
- **📝 Trading Records**: Detailed trading history for each AI model
- **📊 Performance Metrics**: Sharpe ratio, maximum drawdown, annualized returns, etc.
- **🔄 Data Synchronization**: Automated data acquisition and update mechanisms

---

## 🚀 Railway Deployment

Deploy CHEGGIE AI Trader to Railway with zero configuration required!

### 🎯 Zero-Secrets Architecture

This application is designed for **immediate deployment without any API keys**. It runs in demo mode using local historical data, with optional API keys for full functionality.

### 🚂 Deploy Options

#### Option 1: One-Click Deploy (Fastest)
Click the button to deploy instantly:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/executiveusa/CHEGGIE-AI-Trader)

#### Option 2: Automated Script
```bash
# Clone repository
git clone https://github.com/executiveusa/CHEGGIE-AI-Trader.git
cd CHEGGIE-AI-Trader

# Run deployment script
./deploy_railway.sh
```

#### Option 3: Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### ✅ What Works Out of the Box

**Demo Mode (No Configuration Needed):**
- ✅ Application starts successfully
- ✅ Uses pre-loaded NASDAQ 100 historical data
- ✅ Mock AI trading decisions
- ✅ All MCP services operational
- ✅ Trading simulation with local data

**Full Mode (Add API Keys Later):**
- Add `OPENAI_API_KEY` for real AI inference
- Add `ALPHAADVANTAGE_API_KEY` for live market data
- Add `JINA_API_KEY` for active web search

### 🛡️ Built-in Cost Protection

- **Automatic resource monitoring**
- **Free-tier ceiling detection**
- **Auto-shutdown on limit breach**
- **Maintenance mode activation**
- **Coolify migration support**

### 📚 Comprehensive Documentation

- **[Complete Deployment Guide](RAILWAY_DEPLOYMENT.md)** - Step-by-step Railway deployment
- **[Zero-Secrets Architecture](ZERO_SECRETS_README.md)** - Understanding the architecture
- **[Coolify Migration Guide](COOLIFY_MIGRATION.md)** - Migrate to self-hosted Coolify
- **[API Reference](.agents)** - All environment variables and secrets

### 💡 Quick Tips

1. **Start with demo mode** - No configuration needed
2. **Monitor resources** - Check Railway dashboard regularly
3. **Add secrets gradually** - Enable features as needed
4. **Plan for scale** - Coolify migration ready when needed

---

## 🚀 Quick Start

### 📋 Prerequisites

- **Python 3.8+** 
- **API Keys**: OpenAI, Alpha Vantage, Jina AI

### ⚡ One-Click Installation
Run the Flowise dashboard locally:

```bash
cp .env.example .env
docker compose up -d        # starts Flowise at :3000
pnpm dev                    # Vite app; dashboard at http://localhost:5173/agents
```

Deploy: reverse proxy `/agents` and `/api/v1` to the Flowise service.

## Project info

**URL**: https://lovable.dev/projects/dbaf2aff-f8d4-4161-b05d-40acdf00d282

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/dbaf2aff-f8d4-4161-b05d-40acdf00d282) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/dbaf2aff-f8d4-4161-b05d-40acdf00d282) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
