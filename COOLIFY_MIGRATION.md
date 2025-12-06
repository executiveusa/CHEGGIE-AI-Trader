# Coolify Migration Checklist

This document provides a step-by-step checklist for migrating CHEGGIE AI Trader from Railway to Coolify.

## Migration Overview

**Trigger**: This migration should be performed when:
- Railway free tier limits are reached
- Cost protection system activates maintenance mode
- Manual decision to switch to self-hosted solution
- Need for more control over infrastructure

## Pre-Migration Checklist

- [ ] **Backup Railway Data**
  - [ ] Export all trading logs from `data/agent_data/`
  - [ ] Export current positions from position.jsonl files
  - [ ] Backup `.runtime_env.json` configuration
  - [ ] Save Railway environment variables
  - [ ] Document current application state

- [ ] **Prepare Coolify Instance**
  - [ ] Provision server (minimum 1GB RAM, 1 CPU core)
  - [ ] Install Coolify on server
  - [ ] Verify Coolify dashboard access
  - [ ] Test Docker support on server
  - [ ] Configure domain/subdomain (if needed)

- [ ] **Gather Credentials**
  - [ ] Collect all API keys from Railway
  - [ ] Export OPENAI_API_KEY
  - [ ] Export ALPHAADVANTAGE_API_KEY
  - [ ] Export JINA_API_KEY
  - [ ] Document all environment variables

- [ ] **Optional: Configure Hostinger VPN**
  - [ ] Obtain VPN credentials from Hostinger
  - [ ] Install WireGuard on server
  - [ ] Configure VPN tunnel
  - [ ] Test VPN connectivity
  - [ ] Set up automatic reconnection

## Migration Steps

### Phase 1: Railway Application Pause

- [ ] **Activate Maintenance Mode on Railway**
  - [ ] Set environment variable: `MAINTENANCE_MODE=true`
  - [ ] Verify maintenance.html is deployed
  - [ ] Stop all trading operations
  - [ ] Wait for any pending transactions to complete

- [ ] **Export Data from Railway**
  - [ ] Use Railway CLI to download data directory
  - [ ] Command: `railway run tar -czf data-backup.tar.gz ./data`
  - [ ] Download backup file to local machine
  - [ ] Verify backup integrity

- [ ] **Document Current State**
  - [ ] Record last trading date
  - [ ] Record all open positions
  - [ ] Record cash balances for each agent
  - [ ] Save configuration files

### Phase 2: Coolify Setup

- [ ] **Create New Application in Coolify**
  - [ ] Open Coolify dashboard
  - [ ] Click "New Application"
  - [ ] Select "Git Repository" as source
  - [ ] Add repository URL: `https://github.com/executiveusa/CHEGGIE-AI-Trader`

- [ ] **Configure Build Settings**
  - [ ] Set buildpack: Python
  - [ ] Set Python version: 3.10+
  - [ ] Set build command: `pip install -r requirements.txt`
  - [ ] Set start command: `python main.py configs/default_config.json`

- [ ] **Configure Environment Variables**
  - [ ] Set `RUNTIME_ENV_PATH=./.runtime_env.json`
  - [ ] Set `MATH_HTTP_PORT=8000`
  - [ ] Set `SEARCH_HTTP_PORT=8001`
  - [ ] Set `TRADE_HTTP_PORT=8002`
  - [ ] Set `GETPRICE_HTTP_PORT=8003`
  - [ ] Set `AGENT_MAX_STEP=30`
  - [ ] Set API keys (optional, for full functionality):
    - [ ] `OPENAI_API_KEY`
    - [ ] `OPENAI_API_BASE`
    - [ ] `ALPHAADVANTAGE_API_KEY`
    - [ ] `JINA_API_KEY`

- [ ] **Configure Persistent Storage**
  - [ ] Create volume mount for `./data` directory
  - [ ] Create volume mount for `./.runtime_env.json`
  - [ ] Set volume size: minimum 2GB
  - [ ] Verify write permissions

- [ ] **Configure Network Settings**
  - [ ] Set exposed ports: 8000, 8001, 8002, 8003
  - [ ] Configure domain (if applicable)
  - [ ] Set up SSL certificate (optional)
  - [ ] Configure firewall rules

### Phase 3: Data Migration

- [ ] **Upload Data to Coolify Server**
  - [ ] SSH into Coolify server
  - [ ] Navigate to application directory
  - [ ] Upload data-backup.tar.gz
  - [ ] Extract: `tar -xzf data-backup.tar.gz`
  - [ ] Verify all files extracted correctly

- [ ] **Restore Runtime Configuration**
  - [ ] Copy `.runtime_env.json` to application directory
  - [ ] Verify file permissions
  - [ ] Update any path references if needed

- [ ] **Verify Data Integrity**
  - [ ] Check all CSV/JSON files present
  - [ ] Verify position.jsonl files for each agent
  - [ ] Confirm log files accessible
  - [ ] Test file read permissions

### Phase 4: Testing and Validation

- [ ] **Initial Deployment Test**
  - [ ] Deploy application in Coolify
  - [ ] Monitor deployment logs
  - [ ] Wait for successful deployment message
  - [ ] Check application status in dashboard

- [ ] **Verify Services**
  - [ ] Test Math service on port 8000
  - [ ] Test Search service on port 8001
  - [ ] Test Trade service on port 8002
  - [ ] Test GetPrice service on port 8003
  - [ ] Verify all MCP tools responding

- [ ] **Data Access Test**
  - [ ] Verify application can read historical data
  - [ ] Test position file access
  - [ ] Test log file creation
  - [ ] Confirm runtime config loaded

- [ ] **Optional: API Integration Test**
  - [ ] Test OpenAI API connection (if configured)
  - [ ] Test Alpha Vantage API (if configured)
  - [ ] Test Jina AI search (if configured)
  - [ ] Verify all external integrations working

- [ ] **Demo Mode Test** (if running without API keys)
  - [ ] Verify application starts successfully
  - [ ] Confirm stub responses working
  - [ ] Test local data access
  - [ ] Verify maintenance.html accessible

### Phase 5: Production Cutover

- [ ] **Update DNS/URLs** (if applicable)
  - [ ] Point domain to Coolify instance
  - [ ] Update GitHub repository documentation
  - [ ] Update any webhooks or integrations
  - [ ] Test new URL accessibility

- [ ] **Deactivate Railway Application**
  - [ ] Stop Railway service
  - [ ] Archive Railway project
  - [ ] Cancel Railway subscription (if paid)
  - [ ] Document Railway decommission date

- [ ] **Monitor Initial Operations**
  - [ ] Watch logs for first 24 hours
  - [ ] Monitor resource usage
  - [ ] Check for any errors or warnings
  - [ ] Verify trading operations (if applicable)

- [ ] **Update Documentation**
  - [ ] Update README.md with new deployment URL
  - [ ] Update deployment instructions
  - [ ] Document Coolify configuration
  - [ ] Add troubleshooting notes

### Phase 6: Post-Migration Validation

- [ ] **Performance Verification**
  - [ ] Compare response times vs Railway
  - [ ] Monitor resource usage patterns
  - [ ] Check for any bottlenecks
  - [ ] Verify data persistence across restarts

- [ ] **Backup and Recovery Test**
  - [ ] Create backup procedure for Coolify
  - [ ] Test backup restoration
  - [ ] Document backup schedule
  - [ ] Set up automated backups

- [ ] **Security Audit**
  - [ ] Verify all secrets properly configured
  - [ ] Check file permissions
  - [ ] Review network security
  - [ ] Test VPN connection (if applicable)
  - [ ] Scan for vulnerabilities

- [ ] **Documentation Update**
  - [ ] Update master.secrets.json with Coolify details
  - [ ] Record migration date and issues
  - [ ] Document any configuration changes
  - [ ] Update deployment history

## Rollback Plan

If migration fails, follow these steps to rollback to Railway:

- [ ] **Reactivate Railway Service**
  - [ ] Remove maintenance mode flag
  - [ ] Redeploy last known good version
  - [ ] Verify Railway application running

- [ ] **Restore Railway Data** (if modified)
  - [ ] Upload backup data to Railway
  - [ ] Restore .runtime_env.json
  - [ ] Verify data integrity

- [ ] **Update DNS** (if changed)
  - [ ] Point domain back to Railway
  - [ ] Wait for DNS propagation

- [ ] **Document Rollback**
  - [ ] Record reason for rollback
  - [ ] Document issues encountered
  - [ ] Plan remediation steps

## Troubleshooting Common Issues

### Issue: Application Won't Start on Coolify

**Symptoms**: Deployment fails, container crashes immediately

**Solutions**:
- [ ] Check environment variables are set correctly
- [ ] Verify Python dependencies installed
- [ ] Review startup logs for errors
- [ ] Check file permissions on data directory
- [ ] Verify ports not already in use

### Issue: Data Files Not Accessible

**Symptoms**: Application can't read historical data

**Solutions**:
- [ ] Verify volume mounts configured correctly
- [ ] Check file paths in configuration
- [ ] Confirm data files extracted properly
- [ ] Test file permissions (should be readable)
- [ ] Check SELinux/AppArmor policies (if applicable)

### Issue: API Keys Not Working

**Symptoms**: External integrations failing

**Solutions**:
- [ ] Verify environment variables set in Coolify
- [ ] Check API key format (no extra spaces)
- [ ] Test API keys directly with curl
- [ ] Verify no rate limiting issues
- [ ] Check network connectivity from server

### Issue: High Resource Usage

**Symptoms**: Server running slow, high CPU/memory

**Solutions**:
- [ ] Review resource limits in Docker Compose
- [ ] Check for infinite loops in logs
- [ ] Monitor MCP services for issues
- [ ] Consider upgrading server specs
- [ ] Implement additional cost protections

### Issue: VPN Connection Drops

**Symptoms**: Hostinger VPN disconnects frequently

**Solutions**:
- [ ] Enable PersistentKeepalive in WireGuard config
- [ ] Check for network stability issues
- [ ] Verify firewall not blocking VPN
- [ ] Set up automatic reconnection script
- [ ] Consider alternative VPN solution

## Post-Migration Monitoring

### First Week
- [ ] Daily log review
- [ ] Resource usage monitoring
- [ ] Error rate tracking
- [ ] Performance benchmarking
- [ ] User feedback collection

### Ongoing
- [ ] Weekly backup verification
- [ ] Monthly security updates
- [ ] Quarterly performance review
- [ ] Bi-annual cost analysis

## Success Criteria

Migration is considered successful when:

- [ ] Application deployed and running on Coolify
- [ ] All data migrated successfully
- [ ] Services responding correctly
- [ ] No critical errors in logs
- [ ] Performance meets or exceeds Railway
- [ ] Cost protection systems functioning
- [ ] Backup and recovery tested
- [ ] Documentation updated
- [ ] Team trained on new platform

## Migration Completion

- [ ] **Sign-off**
  - [ ] Technical lead approval
  - [ ] Operations team confirmation
  - [ ] Documentation complete
  - [ ] Runbook updated

- [ ] **Cleanup**
  - [ ] Archive Railway configuration
  - [ ] Remove temporary files
  - [ ] Update master.secrets.json
  - [ ] Close migration ticket

- [ ] **Celebration** 🎉
  - [ ] Migration complete!
  - [ ] Self-hosted infrastructure active
  - [ ] Cost controls in place
  - [ ] Application running smoothly

---

**Migration Date**: _____________  
**Completed By**: _____________  
**Sign-off**: _____________  

**Status**: Ready for execution when Railway free tier is exceeded

---

## Additional Resources

- **Coolify Documentation**: https://coolify.io/docs
- **Hostinger VPN Support**: Contact Hostinger customer service
- **CHEGGIE AI Trader Repository**: https://github.com/executiveusa/CHEGGIE-AI-Trader
- **Railway to Coolify Guide**: See COOLIFY_SUPPORT.md

## Notes

Use this checklist as your guide during migration. Check off each item as completed. Add notes for any issues encountered or deviations from the plan.

**Remember**: Take your time, validate each step, and don't hesitate to rollback if issues arise.
