# Coolify Deployment Support

This document provides scaffolding for deploying CHEGGIE AI Trader on Coolify with Hostinger VPN support.

## Overview

Coolify is an open-source self-hosted alternative to Heroku/Railway. This guide provides the foundation for deploying this application on Coolify infrastructure.

## Prerequisites

- Coolify instance running (self-hosted or managed)
- Hostinger VPN configured (optional, for secure access)
- Docker support on target server
- Minimum 1GB RAM, 1 CPU core

## Deployment Architecture

```
┌─────────────────────────────────────────────┐
│           Hostinger VPN (Optional)          │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │         Coolify Instance              │ │
│  │                                       │ │
│  │  ┌─────────────────────────────────┐ │ │
│  │  │  CHEGGIE AI Trader Application  │ │ │
│  │  │  - Python Runtime               │ │ │
│  │  │  - MCP Services                 │ │ │
│  │  │  - Local Data Store             │ │ │
│  │  └─────────────────────────────────┘ │ │
│  │                                       │ │
│  │  ┌─────────────────────────────────┐ │ │
│  │  │  Persistent Volumes             │ │ │
│  │  │  - ./data                       │ │ │
│  │  │  - ./.runtime_env.json          │ │ │
│  │  └─────────────────────────────────┘ │ │
│  └───────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

## Coolify Configuration Placeholder

### Docker Compose (coolify-compose.yml)

```yaml
version: '3.8'

services:
  cheggie-ai-trader:
    image: python:3.10-slim
    working_dir: /app
    volumes:
      - ./:/app
      - ./data:/app/data
    ports:
      - "8000:8000"
      - "8001:8001"
      - "8002:8002"
      - "8003:8003"
    environment:
      - RUNTIME_ENV_PATH=./.runtime_env.json
      - MATH_HTTP_PORT=8000
      - SEARCH_HTTP_PORT=8001
      - TRADE_HTTP_PORT=8002
      - GETPRICE_HTTP_PORT=8003
      - AGENT_MAX_STEP=30
      - INIT_DATE=2025-10-01
      - END_DATE=2025-10-21
      # Optional secrets - set in Coolify dashboard
      # - OPENAI_API_KEY=${OPENAI_API_KEY}
      # - OPENAI_API_BASE=${OPENAI_API_BASE}
      # - ALPHAADVANTAGE_API_KEY=${ALPHAADVANTAGE_API_KEY}
      # - JINA_API_KEY=${JINA_API_KEY}
    command: |
      bash -c "pip install -r requirements.txt && python main.py configs/default_config.json"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "python", "-c", "import os; exit(0 if os.path.exists('.runtime_env.json') else 1)"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## Hostinger VPN Configuration

### VPN Connection Setup

This section is a placeholder for Hostinger VPN tunnel configuration.

**Note:** Only configure if using Hostinger VPN for secure access.

```bash
# Placeholder for VPN configuration
# Example WireGuard config format:

[Interface]
PrivateKey = YOUR_PRIVATE_KEY_HERE
Address = 10.0.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = HOSTINGER_VPN_PUBLIC_KEY
Endpoint = vpn.hostinger.com:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25
```

### Network Configuration

```bash
# Routes for VPN tunnel (placeholder)
# Uncomment and configure if using Hostinger VPN

# sudo ip route add 10.0.0.0/24 via 10.0.0.1
# sudo systemctl enable wg-quick@wg0
# sudo systemctl start wg-quick@wg0
```

## Environment Variables for Coolify

Set these in the Coolify dashboard:

### Required
- `RUNTIME_ENV_PATH`: `./.runtime_env.json`

### Optional (for full functionality)
- `OPENAI_API_KEY`: Your OpenAI API key
- `OPENAI_API_BASE`: OpenAI API base URL
- `ALPHAADVANTAGE_API_KEY`: Alpha Vantage API key
- `JINA_API_KEY`: Jina AI API key

### Service Ports
- `MATH_HTTP_PORT`: 8000
- `SEARCH_HTTP_PORT`: 8001
- `TRADE_HTTP_PORT`: 8002
- `GETPRICE_HTTP_PORT`: 8003

## Deployment Steps (Placeholder)

1. **Connect to Coolify Dashboard**
   - Access your Coolify instance
   - Create new application

2. **Configure Git Repository**
   - Add repository URL: `https://github.com/executiveusa/CHEGGIE-AI-Trader`
   - Set branch: `main`

3. **Set Build Configuration**
   - Build pack: Python
   - Python version: 3.10+
   - Build command: `pip install -r requirements.txt`
   - Start command: `python main.py configs/default_config.json`

4. **Configure Environment Variables**
   - Set required variables in Coolify dashboard
   - Leave API keys empty for demo mode

5. **Configure Persistent Storage**
   - Mount `./data` directory
   - Mount `./.runtime_env.json` file

6. **Deploy Application**
   - Click "Deploy" in Coolify dashboard
   - Monitor deployment logs

## Hostinger VPN Integration (Optional)

If using Hostinger VPN for secure access:

1. **Install WireGuard on server**
   ```bash
   # Placeholder commands
   # sudo apt-get update
   # sudo apt-get install wireguard
   ```

2. **Configure VPN tunnel**
   - Use configuration from Hostinger dashboard
   - Create `/etc/wireguard/wg0.conf`

3. **Start VPN connection**
   ```bash
   # Placeholder commands
   # sudo systemctl enable wg-quick@wg0
   # sudo systemctl start wg-quick@wg0
   ```

4. **Verify connection**
   ```bash
   # Placeholder commands
   # sudo wg show
   # ping 10.0.0.1
   ```

## Resource Requirements

### Minimum Configuration
- **CPU**: 0.5 cores
- **RAM**: 512MB
- **Storage**: 1GB (for data and logs)
- **Network**: Standard outbound access

### Recommended Configuration
- **CPU**: 1 core
- **RAM**: 1GB
- **Storage**: 2GB
- **Network**: VPN tunnel (optional)

## Cost Protection on Coolify

Unlike Railway, Coolify is self-hosted, so cost protection works differently:

- **Resource Limits**: Set in Docker Compose or Coolify dashboard
- **Manual Monitoring**: Check server resources regularly
- **Auto-restart**: Configured via restart policies

## Migration from Railway

See `COOLIFY_MIGRATION.md` for step-by-step migration instructions from Railway to Coolify.

## Troubleshooting

### Common Issues

1. **Application won't start**
   - Check environment variables are set correctly
   - Verify Python dependencies installed
   - Check logs in Coolify dashboard

2. **VPN connection fails**
   - Verify WireGuard installed
   - Check VPN credentials
   - Verify firewall rules

3. **Port conflicts**
   - Ensure ports 8000-8003 are available
   - Check for conflicting services
   - Adjust port numbers if needed

## Support

For issues with:
- **Coolify**: Check Coolify documentation
- **Hostinger VPN**: Contact Hostinger support
- **Application**: Open issue on GitHub repository

## Status

⚠️ **Note**: This is a scaffold/placeholder document. Actual Coolify deployment has not been tested yet. Activate these instructions only when needed for migration from Railway.

## Next Steps

When ready to deploy on Coolify:

1. Test Docker Compose configuration locally
2. Set up Coolify instance
3. Configure Hostinger VPN (if needed)
4. Follow deployment steps
5. Update this document with actual configuration
6. Test and validate deployment

---

**Last Updated**: 2025-12-06  
**Status**: Placeholder/Scaffold  
**Activation**: Manual (when migrating from Railway)
