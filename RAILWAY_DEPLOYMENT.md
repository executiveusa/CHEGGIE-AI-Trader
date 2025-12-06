# Railway Zero-Secrets Deployment Guide

Complete guide for deploying CHEGGIE AI Trader on Railway with zero-secrets architecture and cost protection.

## Table of Contents

1. [Overview](#overview)
2. [Zero-Secrets Architecture](#zero-secrets-architecture)
3. [Quick Start](#quick-start)
4. [Detailed Deployment Steps](#detailed-deployment-steps)
5. [Cost Protection System](#cost-protection-system)
6. [Configuration Options](#configuration-options)
7. [Troubleshooting](#troubleshooting)
8. [Migration to Coolify](#migration-to-coolify)

## Overview

This application is designed for **zero-secrets deployment** on Railway. It can run successfully without any API keys or external integrations, using local cached data and stubbed responses.

### Key Features

✅ **No Secrets Required**: Deploy immediately without configuration  
✅ **Demo Mode**: Works with local data only  
✅ **Cost Protection**: Automatic free-tier monitoring and shutdown  
✅ **Gradual Enhancement**: Add secrets later for full functionality  
✅ **Maintenance Mode**: Auto-activates when approaching limits  

## Zero-Secrets Architecture

### How It Works

```
┌─────────────────────────────────────────────────────┐
│                Railway Deployment                    │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │          Application Layer                     │ │
│  │  ┌──────────────────────────────────────────┐ │ │
│  │  │  AI Trading Engine                       │ │ │
│  │  │  - Runs in demo mode by default         │ │ │
│  │  │  - Uses stubbed AI responses            │ │ │
│  │  └──────────────────────────────────────────┘ │ │
│  │                                                │ │
│  │  ┌──────────────────────────────────────────┐ │ │
│  │  │  Data Layer                              │ │ │
│  │  │  - Local historical price data           │ │ │
│  │  │  - Pre-loaded NASDAQ 100 stocks          │ │ │
│  │  └──────────────────────────────────────────┘ │ │
│  │                                                │ │
│  │  ┌──────────────────────────────────────────┐ │ │
│  │  │  Cost Protection System                  │ │ │
│  │  │  - Monitors resource usage               │ │ │
│  │  │  - Auto-shutdown on free tier breach     │ │ │
│  │  │  - Deploys maintenance page              │ │ │
│  │  └──────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘

Optional External Services (disabled by default):
├── OpenAI API (for AI model inference)
├── Alpha Vantage API (for live market data)
└── Jina AI API (for market news search)
```

### Deployment Modes

1. **Demo Mode (Zero Secrets)**
   - No API keys required
   - Uses local data from `data/` directory
   - AI responses are stubbed with simple logic
   - Search returns mock news
   - Perfect for testing and demos

2. **Full Mode (With Secrets)**
   - Add API keys in Railway dashboard
   - Live AI model inference
   - Real-time market data
   - Active news search
   - Production-ready trading

## Quick Start

### Option 1: One-Click Deploy (Recommended)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/executiveusa/CHEGGIE-AI-Trader)

1. Click the button above
2. Choose "Deploy Now"
3. Wait for deployment to complete
4. Visit the provided URL
5. Application runs in demo mode

### Option 2: Manual Deploy

1. **Fork Repository**
   ```bash
   # Fork on GitHub, then clone
   git clone https://github.com/YOUR_USERNAME/CHEGGIE-AI-Trader.git
   cd CHEGGIE-AI-Trader
   ```

2. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

3. **Initialize Railway Project**
   ```bash
   railway init
   railway link
   ```

4. **Deploy**
   ```bash
   railway up
   ```

5. **Done!** Application deploys in demo mode automatically.

## Detailed Deployment Steps

### Step 1: Repository Setup

Ensure your repository contains these files:
- `.agents` - Secret specifications
- `railway.toml` - Railway configuration
- `maintenance.html` - Maintenance page
- `master.secrets.json` - Local secret storage template
- `COOLIFY_SUPPORT.md` - Coolify scaffolding
- `COOLIFY_MIGRATION.md` - Migration checklist

### Step 2: Railway Project Creation

1. Log in to [Railway Dashboard](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will automatically detect Python and deploy

### Step 3: Configuration (Optional)

**For Demo Mode**: No configuration needed!

**For Full Mode**: Add these in Railway dashboard:

Navigate to: Project → Variables → Raw Editor

```bash
# Optional: AI Model Configuration
OPENAI_API_KEY=sk-your-key-here
OPENAI_API_BASE=https://api.openai.com/v1

# Optional: Data Sources
ALPHAADVANTAGE_API_KEY=your-alpha-vantage-key
JINA_API_KEY=jina_your-jina-key

# System Configuration (pre-configured, can override)
RUNTIME_ENV_PATH=./.runtime_env.json
MATH_HTTP_PORT=8000
SEARCH_HTTP_PORT=8001
TRADE_HTTP_PORT=8002
GETPRICE_HTTP_PORT=8003
AGENT_MAX_STEP=30
```

### Step 4: Verification

1. Check deployment logs in Railway dashboard
2. Look for: "✅ Initialization successful"
3. Verify services started:
   - Math service on port 8000
   - Search service on port 8001
   - Trade service on port 8002
   - GetPrice service on port 8003

### Step 5: Access Application

Railway provides a public URL automatically. Access it to see the application running.

## Cost Protection System

### Automatic Monitoring

The application includes built-in cost protection:

```python
# Cost protection parameters (from railway.toml)
RAILWAY_COST_PROTECTION_ENABLED = true
RAILWAY_FREE_TIER_LIMIT_MB = 512
RAILWAY_AUTO_SHUTDOWN_ENABLED = true
```

### How It Works

1. **Resource Monitoring**
   - Checks memory usage every hour
   - Tracks CPU utilization
   - Monitors network bandwidth

2. **Free Tier Ceiling Detection**
   - Compares usage against Railway free tier limits
   - Predicts whether next operation exceeds limits
   - Triggers preventive actions

3. **Auto-Shutdown Sequence**
   When free tier ceiling detected:
   ```
   1. Log warning: "Free tier at risk"
   2. Stop trading operations gracefully
   3. Deploy maintenance.html page
   4. Pause main application
   5. Prepare migration to Coolify
   ```

4. **Maintenance Mode**
   - Static HTML page shows status
   - Explains why service paused
   - Provides migration instructions
   - Links to repository

### Manual Cost Control

You can also manually control costs:

```bash
# Pause application
railway down

# Resume application
railway up

# Check resource usage
railway status
```

### Resource Limits

Configured in `railway.toml`:
```toml
[deploy.resources]
memory = "512Mi"  # 512MB RAM
cpu = "0.5"       # Half CPU core
```

These limits ensure:
- Stay within free tier
- Prevent runaway costs
- Predictable resource usage

## Configuration Options

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `RUNTIME_ENV_PATH` | Yes | `./.runtime_env.json` | Runtime config path |
| `OPENAI_API_KEY` | No | Disabled | OpenAI API key |
| `OPENAI_API_BASE` | No | Default | OpenAI API endpoint |
| `ALPHAADVANTAGE_API_KEY` | No | Disabled | Market data API key |
| `JINA_API_KEY` | No | Disabled | Search API key |
| `INIT_DATE` | No | `2025-10-01` | Backtest start date |
| `END_DATE` | No | `2025-10-21` | Backtest end date |
| `AGENT_MAX_STEP` | No | `30` | Max AI reasoning steps |

### Service Ports

| Service | Port | Description |
|---------|------|-------------|
| Math | 8000 | Mathematical calculations |
| Search | 8001 | Web search and scraping |
| Trade | 8002 | Trading operations |
| GetPrice | 8003 | Price data queries |

### Agent Configuration

Modify `configs/default_config.json`:

```json
{
  "agent_type": "BaseAgent",
  "date_range": {
    "init_date": "2025-10-01",
    "end_date": "2025-10-21"
  },
  "models": [
    {
      "name": "gpt-5",
      "basemodel": "openai/gpt-5",
      "signature": "gpt-5",
      "enabled": true
    }
  ],
  "agent_config": {
    "max_steps": 30,
    "max_retries": 3,
    "base_delay": 1.0,
    "initial_cash": 10000.0
  }
}
```

## Troubleshooting

### Issue: Deployment Failed

**Symptoms**: Railway deployment shows error

**Solutions**:
1. Check deployment logs in Railway dashboard
2. Verify `requirements.txt` is present
3. Ensure `railway.toml` is valid
4. Check Python version compatibility (3.8+)

### Issue: Application Not Responding

**Symptoms**: URL times out or shows error

**Solutions**:
1. Check application logs
2. Verify services started correctly
3. Check resource limits not exceeded
4. Restart deployment

### Issue: Maintenance Mode Activated Unexpectedly

**Symptoms**: See maintenance page instead of application

**Solutions**:
1. Check Railway resource usage
2. Verify not exceeding free tier
3. Review cost protection logs
4. Consider migrating to Coolify (see below)

### Issue: Cannot Add Environment Variables

**Symptoms**: Variables not saving in Railway

**Solutions**:
1. Use Raw Editor mode in Railway dashboard
2. Ensure proper format (KEY=value)
3. No quotes needed around values
4. Redeploy after adding variables

### Issue: Services Not Starting

**Symptoms**: MCP services fail to initialize

**Solutions**:
1. Check port availability (8000-8003)
2. Verify no port conflicts
3. Review service logs
4. Check environment variables set correctly

## Migration to Coolify

When Railway free tier is exceeded or you want more control:

1. **Automatic Trigger**
   - Cost protection activates maintenance mode
   - Application paused on Railway
   - See `COOLIFY_MIGRATION.md` for checklist

2. **Manual Migration**
   - Follow steps in `COOLIFY_MIGRATION.md`
   - Export data from Railway
   - Deploy to Coolify instance
   - Update DNS/URLs

3. **Support**
   - See `COOLIFY_SUPPORT.md` for configuration
   - Hostinger VPN setup included
   - Docker Compose templates provided

## Deployment Verification Checklist

After deployment, verify:

- [ ] Application deployed successfully
- [ ] Deployment logs show no errors
- [ ] Public URL accessible
- [ ] Services responding on ports 8000-8003
- [ ] Demo mode working (if no secrets)
- [ ] Cost protection enabled
- [ ] Resource limits configured
- [ ] Maintenance page accessible
- [ ] Documentation updated

## Advanced Configuration

### Custom Trading Period

Set different backtest periods:

```bash
# In Railway dashboard variables
INIT_DATE=2024-01-01
END_DATE=2024-12-31
```

### Multiple AI Models

Edit `configs/default_config.json` to enable multiple models:

```json
{
  "models": [
    {"name": "gpt-5", "enabled": true},
    {"name": "claude-3.7-sonnet", "enabled": true},
    {"name": "gemini-2.5-flash", "enabled": true}
  ]
}
```

### Custom Resource Limits

Modify `railway.toml`:

```toml
[deploy.resources]
memory = "1Gi"  # Increase to 1GB
cpu = "1"       # Full CPU core
```

⚠️ **Warning**: Higher limits may exceed free tier!

## Best Practices

1. **Start with Demo Mode**
   - Deploy without secrets first
   - Verify deployment works
   - Add secrets gradually

2. **Monitor Resource Usage**
   - Check Railway dashboard regularly
   - Watch for unusual spikes
   - Set up alerts if available

3. **Regular Backups**
   - Export trading data periodically
   - Save position files
   - Backup configuration

4. **Cost Awareness**
   - Understand Railway pricing
   - Stay within free tier limits
   - Plan migration if needed

5. **Security**
   - Never commit secrets to Git
   - Use Railway dashboard for secrets
   - Rotate API keys regularly
   - Keep `master.secrets.json` local only

## Support and Resources

- **GitHub Repository**: https://github.com/executiveusa/CHEGGIE-AI-Trader
- **Railway Documentation**: https://docs.railway.app
- **Issues**: Open issue on GitHub
- **Discussions**: GitHub Discussions for questions

## Success Metrics

Deployment is successful when:

- ✅ Application accessible via Railway URL
- ✅ No errors in deployment logs
- ✅ Services responding correctly
- ✅ Cost protection active
- ✅ Demo mode working (or full mode if secrets added)
- ✅ Resource usage within limits
- ✅ Maintenance page accessible as fallback

## Next Steps

After successful deployment:

1. **Monitor Application**
   - Watch logs for first 24 hours
   - Check resource usage
   - Verify cost protection working

2. **Add Functionality** (Optional)
   - Add API keys for full features
   - Enable live trading
   - Configure additional models

3. **Plan for Scale**
   - Monitor free tier usage
   - Prepare Coolify migration if needed
   - Document any customizations

---

**Deployment Date**: _____________  
**Railway Project ID**: _____________  
**Deployment Mode**: [ ] Demo [ ] Full  
**Status**: [ ] Success [ ] Issues [ ] Maintenance

---

## Conclusion

This zero-secrets deployment architecture ensures:
- **Immediate deployment** without configuration
- **Cost protection** preventing unexpected charges
- **Graceful degradation** when limits approached
- **Easy migration** to self-hosted Coolify
- **Production-ready** with proper secrets

Deploy with confidence! 🚀
