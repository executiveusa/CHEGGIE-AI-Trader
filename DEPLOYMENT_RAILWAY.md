# Cheggie AI - Railway Deployment Guide

## Quick Start

This guide covers deploying the Cheggie AI application to Railway with PostgreSQL database integration.

### Prerequisites
- Railway CLI installed (`npm install -g @railway/cli`)
- Railway account and project created
- Project ID: `97358809-0fee-4ae9-994e-d3dbf2d36901`
- All environment variables configured

## Environment Variables

Create a `.env.local` file based on `ENV_TEMPLATE.example`:

```bash
# Application
NODE_ENV=production
PORT=8080

# AI Services
VITE_LOVABLE_KEY=your_key_here
VITE_FLOWWISE_URL=https://your-flowise.railway.app
VITE_FLOWWISE_KEY=your_key_here
VITE_GEMINI_API_KEY=your_key_here
VITE_OPENAI_API_KEY=your_key_here

# Image APIs
VITE_UNSPLASH_ACCESS_KEY=your_key_here
VITE_PEXELS_API_KEY=your_key_here

# Database (Railway PostgreSQL)
DATABASE_URL=postgresql://postgres:password@host:port/cheggie
VITE_DATABASE_URL=postgresql://postgres:password@host:port/cheggie

# Admin Access
ADMIN_ALLOWED_EMAILS=admin@cheggie.com,team@cheggie.com

# Railway
RAILWAY_PROJECT_ID=97358809-0fee-4ae9-994e-d3dbf2d36901
```

## Database Setup

### 1. Initialize PostgreSQL Database

```bash
# Using Railway CLI
railway run psql < scripts/init-db.sql
```

### 2. Verify Tables

```bash
railway run psql
\dt  # List all tables
\d users  # Describe users table
```

## Build & Deploy

### 1. Build Locally

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Verify build output
ls -la dist/
```

### 2. Deploy to Railway

```bash
# Login to Railway
railway login

# Link to project
railway link 97358809-0fee-4ae9-994e-d3dbf2d36901

# Set environment variables
railway variables set NODE_ENV=production
railway variables set ADMIN_ALLOWED_EMAILS=admin@cheggie.com

# Deploy
railway up

# View logs
railway logs
```

### 3. Verify Deployment

```bash
# Get deployment URL
railway status

# Test health endpoint
curl https://your-railway-app.railway.app/

# Check database connection
railway run psql -c "SELECT COUNT(*) FROM users;"
```

## Continuous Deployment

### GitHub Actions Setup (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Railway

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Railway
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        run: npm install -g @railway/cli && railway up --force
```

## Troubleshooting

### Database Connection Issues

```bash
# Check DATABASE_URL is set
railway variables

# Test connection manually
railway run psql -c "SELECT version();"

# Check connection pooling
railway run psql -c "SHOW max_connections;"
```

### Build Failures

```bash
# Clear build cache
rm -rf dist/
rm -rf node_modules/
npm ci

# Rebuild with verbose logging
npm run build -- --debug
```

### Environment Variable Not Found

```bash
# List all variables
railway variables

# Set missing variable
railway variables set VITE_FLOWWISE_URL=https://...

# Redeploy
railway up
```

## Monitoring

### View Logs

```bash
# Real-time logs
railway logs --follow

# Filter by level
railway logs ERROR
```

### Database Monitoring

```bash
# Active connections
railway run psql -c "SELECT datname, count(*) FROM pg_stat_activity GROUP BY datname;"

# Large tables
railway run psql -c "SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) FROM pg_tables ORDER BY pg_total_relation_size DESC;"
```

## Rollback

```bash
# View deployment history
railway deployments list

# Rollback to previous version
railway deployments rollback <deployment-id>
```

## Performance Optimization

### Database Query Optimization

```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_admin_sessions_login_at ON admin_sessions(login_at);

-- Monitor slow queries
SET log_min_duration_statement = 1000; -- Log queries > 1s
```

### Caching Strategy

- Use Flowise caching for AI agent responses
- Implement Redis (optional) for session caching
- CDN for static assets via Railway + Cloudflare

## Security Checklist

- [ ] All secrets in environment variables (no hardcoded values)
- [ ] Database connection uses SSL
- [ ] Admin email allowlist configured
- [ ] CORS headers properly set for production domain
- [ ] Rate limiting enabled on API endpoints
- [ ] Database backups configured in Railway dashboard

## Support

For issues or questions:
1. Check Railway docs: https://docs.railway.app
2. Review logs: `railway logs`
3. Connect to database: `railway run psql`
4. Check environment: `railway variables`
