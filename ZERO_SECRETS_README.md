# Zero-Secrets Railway Deployment Architecture

## Overview

This repository has been enhanced with a **Railway Zero-Secrets Bootstrapper** system that enables immediate deployment without any API keys or external integrations. The application can run successfully in a demo/stub mode using only local data.

## 🎯 Key Features

### ✅ Zero-Secrets Deployment
- **No API keys required** for initial deployment
- Application boots successfully without configuration
- Uses local cached data from `data/` directory
- All external integrations safely stubbed

### 🛡️ Cost Protection System
- **Automatic resource monitoring** and usage tracking
- **Free-tier ceiling detection** prevents cost overruns
- **Auto-shutdown** when approaching limits
- **Maintenance mode** activation with static landing page
- **Migration preparation** for Coolify when needed

### 🔄 Gradual Enhancement
- Start with zero configuration (demo mode)
- Add API keys later for full functionality
- Seamless transition from stub to production mode
- No code changes required

### 📊 Multi-Host Support
- **Railway** - Primary deployment platform (with cost protection)
- **Coolify** - Self-hosted fallback (with scaffolding ready)
- **Hostinger VPN** - Optional secure tunnel support

## 📁 New Files Added

### Configuration Files
- **`.agents`** - Structured secret specifications for all integrations
- **`master.secrets.json.template`** - Local secret storage template (copy to master.secrets.json)
- **`railway.toml`** - Railway deployment configuration with resource limits
- **`.gitignore`** - Updated to exclude secrets and sensitive files

### Documentation
- **`RAILWAY_DEPLOYMENT.md`** - Complete Railway deployment guide
- **`COOLIFY_SUPPORT.md`** - Coolify deployment scaffolding
- **`COOLIFY_MIGRATION.md`** - Step-by-step migration checklist
- **`ZERO_SECRETS_README.md`** - This file

### Implementation
- **`stubs/stub_config.py`** - Stub mode detection and fallback behaviors
- **`maintenance.html`** - Maintenance mode landing page
- **`deploy_railway.sh`** - Automated deployment script

## 🚀 Quick Start

### Option 1: One-Click Deploy (Fastest)

1. Click this button: [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/executiveusa/CHEGGIE-AI-Trader)
2. Wait for deployment
3. Access your app URL
4. Running in demo mode immediately!

### Option 2: Manual Deploy with Script

```bash
# Clone repository
git clone https://github.com/executiveusa/CHEGGIE-AI-Trader.git
cd CHEGGIE-AI-Trader

# Run deployment script
./deploy_railway.sh

# Follow prompts
# Choose: 1 for Demo Mode (no secrets) or 2 for Full Mode
```

### Option 3: Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up

# Application deploys in demo mode automatically
```

## 📊 Deployment Modes

### Demo Mode (Zero Secrets)
**Status**: ✅ Works out of the box

**What works**:
- ✅ Application starts successfully
- ✅ Historical data from `data/` directory
- ✅ Mock AI trading decisions
- ✅ Mock news and search results
- ✅ Local price data queries
- ✅ All MCP services operational

**What's stubbed**:
- ⚠️ AI model calls (returns mock decisions)
- ⚠️ Web search (returns mock news)
- ⚠️ Live market data (uses cached data only)

**Perfect for**:
- Testing deployment
- Demonstrating functionality
- Development and debugging
- Learning the system

### Full Mode (With Secrets)
**Status**: ⚙️ Requires API key configuration

**Configuration required**:
Set in Railway dashboard → Variables:
```bash
OPENAI_API_KEY=sk-your-actual-key-here
ALPHAADVANTAGE_API_KEY=your-alphavantage-key
JINA_API_KEY=jina_your-jina-key
```

**What works**:
- ✅ Real AI model inference
- ✅ Live market data updates
- ✅ Active web search for news
- ✅ Full trading capabilities
- ✅ Production-ready operations

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Railway Platform                       │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │         CHEGGIE AI Trader Application              │ │
│  │                                                    │ │
│  │  ┌──────────────────────────────────────────────┐ │ │
│  │  │  Stub Detection Layer                        │ │ │
│  │  │  - Checks for API keys                       │ │ │
│  │  │  - Determines stub vs production mode        │ │ │
│  │  │  - Routes to appropriate implementations     │ │ │
│  │  └──────────────────────────────────────────────┘ │ │
│  │                                                    │ │
│  │  ┌──────────────┐      ┌──────────────────────┐  │ │
│  │  │ Demo Mode    │      │ Production Mode      │  │ │
│  │  │ (No Secrets) │  or  │ (With API Keys)      │  │ │
│  │  │              │      │                      │  │ │
│  │  │ - Local Data │      │ - Live AI Models     │  │ │
│  │  │ - Mock AI    │      │ - Real Market Data   │  │ │
│  │  │ - Stub Search│      │ - Active Search      │  │ │
│  │  └──────────────┘      └──────────────────────┘  │ │
│  │                                                    │ │
│  │  ┌──────────────────────────────────────────────┐ │ │
│  │  │  Cost Protection System                      │ │ │
│  │  │  - Monitors resource usage                   │ │ │
│  │  │  - Detects free-tier ceiling                 │ │ │
│  │  │  - Triggers maintenance mode                 │ │ │
│  │  │  - Prepares Coolify migration                │ │ │
│  │  └──────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Persistent Storage                                │ │
│  │  - Historical price data (100+ stocks)            │ │
│  │  - Trading logs and positions                      │ │
│  │  - Runtime configuration                           │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## 🔒 Secret Management

### Local Development

**First time setup**: Copy the template to create your secrets file:
```bash
cp master.secrets.json.template master.secrets.json
```

Then edit `master.secrets.json` with your actual secrets (NOT committed to Git):
```json
{
  "projects": {
    "CHEGGIE-AI-Trader": {
      "secrets": {
        "ai_models": {
          "OPENAI_API_KEY": "sk-your-actual-key-here",
          "OPENAI_API_BASE": "https://api.openai.com/v1"
        },
        "data_sources": {
          "ALPHAADVANTAGE_API_KEY": "your-actual-key",
          "JINA_API_KEY": "jina_your-actual-key"
        }
      }
    }
  }
}
```

### Railway Deployment

Set environment variables in Railway dashboard:
1. Go to your Railway project
2. Click "Variables" tab
3. Click "Raw Editor"
4. Paste your secrets:
```bash
OPENAI_API_KEY=sk-actual-key
ALPHAADVANTAGE_API_KEY=actual-key
JINA_API_KEY=jina_actual-key
```

### Security Best Practices

✅ **DO**:
- Keep `master.secrets.json` local only
- Use Railway dashboard for production secrets
- Rotate API keys regularly
- Use minimum required permissions
- Review `.gitignore` before commits

❌ **DON'T**:
- Commit secrets to Git
- Share secrets in plaintext
- Use production keys in demo mode
- Hardcode secrets in code
- Store secrets in documentation

## 🛡️ Cost Protection

### How It Works

1. **Resource Monitoring**
   - Checks memory usage periodically
   - Tracks CPU utilization
   - Monitors network bandwidth

2. **Free-Tier Ceiling Detection**
   - Configured limit: 512MB RAM
   - Warning at 90% usage
   - Automatic action at threshold

3. **Maintenance Mode Activation**
   When limits approached:
   ```
   1. Stop trading operations
   2. Deploy maintenance.html
   3. Log warning messages
   4. Prepare Coolify migration docs
   5. Pause main service
   ```

4. **Migration Preparation**
   - `COOLIFY_MIGRATION.md` ready
   - Data export procedures documented
   - Coolify config scaffolded
   - Rollback plan included

### Resource Limits

Configured in `railway.toml`:
```toml
[deploy.resources]
memory = "512Mi"  # 512MB RAM (free tier safe)
cpu = "0.5"       # Half CPU core
```

### Monitoring Commands

```bash
# Check resource usage
railway status

# View logs
railway logs

# Check cost protection status
railway run python -c "from stubs.stub_config import print_stub_status; print_stub_status()"
```

## 📚 Documentation Structure

### For Deployment
- **`RAILWAY_DEPLOYMENT.md`** - Start here for Railway deployment
- **`deploy_railway.sh`** - Automated deployment script
- **`.agents`** - Secret specifications reference

### For Migration
- **`COOLIFY_MIGRATION.md`** - Complete migration checklist
- **`COOLIFY_SUPPORT.md`** - Coolify configuration reference
- **`maintenance.html`** - Maintenance page template

### For Development
- **`stubs/stub_config.py`** - Stub mode implementation
- **`master.secrets.json`** - Local secret template
- **`railway.toml`** - Railway configuration

## 🔄 Migration to Coolify

When Railway free tier is exceeded:

### Automatic Trigger
1. Cost protection detects limit
2. Maintenance mode activates
3. `maintenance.html` deployed
4. Migration docs referenced

### Manual Process
1. Follow `COOLIFY_MIGRATION.md` checklist
2. Export data from Railway
3. Set up Coolify instance
4. Deploy to Coolify
5. Update DNS if needed

### Coolify Benefits
- Self-hosted (no usage limits)
- Full control over resources
- Cost predictability
- VPN support included

## 🐛 Troubleshooting

### Application Won't Start

**Problem**: Deployment fails on Railway

**Solutions**:
1. Check deployment logs: `railway logs`
2. Verify `requirements.txt` is present
3. Ensure `railway.toml` is valid
4. Check Python version (3.8+ required)

### Stuck in Demo Mode

**Problem**: Application not using API keys

**Solutions**:
1. Verify keys set in Railway dashboard
2. Check for PLACEHOLDER_ prefix in keys
3. Ensure keys are valid format
4. Redeploy after setting variables

### Maintenance Mode Active

**Problem**: See maintenance page instead of app

**Solutions**:
1. Check Railway resource usage
2. Verify not exceeding free tier
3. Review cost protection logs
4. Consider Coolify migration

### Services Not Starting

**Problem**: MCP services fail to initialize

**Solutions**:
1. Check ports 8000-8003 available
2. Verify no port conflicts
3. Review service logs
4. Check environment variables

## 📞 Support

### Documentation
- **Railway Guide**: `RAILWAY_DEPLOYMENT.md`
- **Coolify Guide**: `COOLIFY_SUPPORT.md`
- **Migration Guide**: `COOLIFY_MIGRATION.md`

### Issues
- **GitHub Issues**: https://github.com/executiveusa/CHEGGIE-AI-Trader/issues
- **Discussions**: https://github.com/executiveusa/CHEGGIE-AI-Trader/discussions

### External Resources
- **Railway Docs**: https://docs.railway.app
- **Coolify Docs**: https://coolify.io/docs

## ✅ Verification Checklist

After deployment, verify:

- [ ] Application deployed successfully
- [ ] Public URL accessible
- [ ] Demo mode working (if no secrets)
- [ ] Stub status logged correctly
- [ ] Services responding (ports 8000-8003)
- [ ] Cost protection enabled
- [ ] Resource limits configured
- [ ] Maintenance page accessible
- [ ] `.gitignore` excludes secrets
- [ ] Documentation reviewed

## 🎉 Success!

If you can access your application URL and see it running, congratulations! You've successfully deployed with the zero-secrets architecture.

**Next Steps**:
1. ✅ Monitor resource usage
2. ✅ Add API keys for full functionality (optional)
3. ✅ Review trading logs
4. ✅ Plan Coolify migration (if needed)
5. ✅ Enjoy autonomous AI trading!

---

**Version**: 1.0.0  
**Last Updated**: 2025-12-06  
**Architecture**: Railway Zero-Secrets Bootstrapper  
**Status**: Production Ready ✅
