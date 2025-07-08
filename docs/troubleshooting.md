# Troubleshooting Guide

## Common Issues and Solutions

### Jobs Not Routing Correctly

#### Issue: Jobs going to #new-request instead of technician channel
**Causes & Solutions:**
1. **Technician name not in config**
   - Check #technician-config for the technician
   - Add if missing: `Name | channel | SlackID`

2. **Name format incorrect**
   - Job title must end with: `- Technician Name`
   - Example: `Fix HVAC - Vladimir`

3. **Spelling mismatch**
   - Names are case-sensitive
   - Must match config exactly

4. **Config not loading**
   - Check Zapier history for errors
   - Verify Step 2 finds config message
   - Ensure config_message mapped in Step 3

### Tagging Issues

#### Issue: Technician not getting tagged
**Solutions:**
1. **Verify Slack ID**
   - Click technician profile → ⋮ → Copy member ID
   - Update in config if incorrect

2. **Check user permissions**
   - User must be in the channel
   - Bot must have permission to tag

### Pinning Problems

#### Issue: Messages not auto-pinning
**Solutions:**
1. **Check Replit bot status**
   - Should show "Running" in Replit
   - Look for error messages in console

2. **Verify message format**
   - Must start and end with asterisks: `*message*`
   - Bot must recognize sender as "DuetRight Bot"

3. **Channel permissions**
   - Bot must be in channel
   - Must have pin permissions

### Zapier Errors

#### Issue: Zap showing "Halted" or "Has Draft"
**Solutions:**
1. Click "Edit draft"
2. Review all steps for errors
3. Test each step individually
4. Publish when ready

#### Issue: "Editor access is required"
**Solutions:**
- Log in with account that created the Zap
- Request edit access from Zap owner
- Clone Zap to your account

### Config Issues

#### Issue: Config changes not working
**Checklist:**
1. Format exactly: `Name | channel | ID`
2. No extra spaces
3. One technician per line
4. Save/update message
5. Wait 1-2 minutes for next job

#### Issue: Config message deleted
**Recovery:**
1. Post new config message
2. Use template from SOP
3. Pin the message
4. Test with sample job

### Performance Issues

#### Issue: Delays in job posting
**Normal delays:**
- Jobber → Zapier: 1-5 minutes
- Message → Pin: 20 seconds
- Config updates: Immediate

**If longer:**
- Check Zapier plan limits
- Verify webhook active
- Review Jobber API status

### Bot Issues

#### Issue: Replit bot offline
**Steps:**
1. Log into Replit
2. Click "Stop" then "Run"
3. Watch console for errors
4. Verify environment variables set

#### Issue: Bot not recognizing messages
**Check:**
- Bot username recognition
- Message format (asterisks)
- Channel in projectChannels array

## Debug Commands

### Check Zapier History
1. Go to Zapier dashboard
2. Click "Zap History"
3. Filter by your Zap name
4. Click failed runs for details

### Test Configuration
Create job: "Config Test - [Technician]"
Should route to their channel

### Verify Bot Permissions
In Slack: `/apps` → Find your bot → Check permissions

## Emergency Contacts

- **Zapier Status**: status.zapier.com
- **Slack Status**: status.slack.com
- **Replit Status**: status.replit.com