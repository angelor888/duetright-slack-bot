# Standard Operating Procedure (SOP)
## DuetRight Job Automation System

### Purpose
This SOP outlines the daily operations and management procedures for the DuetRight Job Automation System that automatically routes Jobber jobs to appropriate Slack channels.

### System Overview
The automation system consists of:
- **Zapier**: Processes new Jobber jobs
- **Slack Config**: Dynamic technician management
- **Replit Bot**: Auto-pins important messages
- **Project Channels**: Individual technician workspaces

### Daily Operations

#### 1. Regular Job Processing (Automatic)
When a new job is created in Jobber:
1. System automatically extracts technician name from job title
2. Routes to appropriate project channel
3. Tags the assigned technician
4. Creates thread with job details
5. Pins message for visibility

**No manual intervention required for standard jobs**

#### 2. Adding New Technicians
When onboarding a new technician:

1. **Create Slack Channel**
   ```
   Channel name: proj-firstname
   Example: proj-sarah
   ```

2. **Get Technician's Slack ID**
   - Click technician's profile
   - Click ⋮ (three dots)
   - Select "Copy member ID"

3. **Update Configuration**
   - Go to #technician-config
   - Edit pinned "TECHNICIAN DIRECTORY" message
   - Add new line:
   ```
   NewName | proj-newname | U_SLACK_ID
   ```

4. **Update Replit Bot** (if new channel)
   - Add channel to projectChannels array
   - Restart bot

5. **Test**
   - Create test job: "Test Job - NewName"
   - Verify routing and tagging

#### 3. Removing Technicians
When a technician leaves:

1. **Update Configuration**
   - Go to #technician-config
   - Edit pinned message
   - Delete technician's line

2. **Archive Channel** (optional)
   - Archive their project channel if no longer needed

#### 4. Troubleshooting Common Issues

**Jobs Going to #new-request**
- Check technician name spelling in job title
- Verify technician exists in config
- Ensure name format: "Job Description - Technician Name"

**Technician Not Getting Tagged**
- Verify Slack ID is correct
- Check for typos in configuration
- Ensure no extra spaces in config

**Messages Not Getting Pinned**
- Check if Replit bot is running
- Verify bot has pin permissions
- Ensure message starts/ends with asterisks

**Zap Not Triggering**
- Check Zapier dashboard for errors
- Verify Jobber connection active
- Ensure Zap is turned ON

### Monitoring & Maintenance

#### Daily Checks
- [ ] Verify Replit bot status (should show green "Running")
- [ ] Check #new-request for unassigned jobs
- [ ] Monitor Zapier task usage

#### Weekly Tasks
- [ ] Review #technician-config for accuracy
- [ ] Check Zapier error logs
- [ ] Verify all project channels active

#### Monthly Tasks
- [ ] Audit technician list against active employees
- [ ] Review automation performance metrics
- [ ] Update documentation as needed

### Emergency Procedures

#### If Automation Stops Working
1. **Check Zapier Status**
   - Log into Zapier
   - Check if Zap is ON
   - Review error messages

2. **Restart Replit Bot**
   - Go to Replit dashboard
   - Click "Stop" then "Run"
   - Wait for "⚡ Bot is running!"

3. **Manual Workaround**
   - Post jobs manually to channels
   - Tag technicians directly
   - Pin important messages manually

#### If Config Gets Deleted
1. Restore from this template:
   ```
   🔧 TECHNICIAN DIRECTORY v1.0
   ============================
   Vladimir       | proj-vladimir    | U06B3CV6198
   Vladimir T     | proj-vladimir    | U06B3CV6198
   Vladimir Tile  | proj-cbti        | U06CEE5NLVA
   Marina         | proj-marina      | U06SGRJ411V
   Sergei         | proj-sergei      | U084BNFUBSN
   Stan           | proj-stanangelo  | U06AJAF1NVC
   Angelo         | proj-stanangelo  | U06AADB7D4P
   Mike           | proj-mike        | U06AADB7D4P
   Sarah          | proj-sarah       | U06AADB7D4P
   ```

2. Pin the message
3. Test with a sample job

### Best Practices

1. **Job Title Format**
   - Always use: "Description - Technician Name"
   - Use exact names from config
   - Include full details in Jobber

2. **Configuration Management**
   - Keep config message pinned
   - Use exact format (pipes, spacing)
   - Test after any changes

3. **Communication**
   - Notify team of system changes
   - Document any custom modifications
   - Share this SOP with new admins

### Quick Reference

**Key Channels**
- #technician-config - System configuration
- #new-request - Unassigned jobs
- #proj-[name] - Individual technician channels

**Key Tools**
- Zapier: https://zapier.com
- Replit: https://replit.com
- Jobber: Your Jobber URL

**Support Contacts**
- Zapier Support: support@zapier.com
- Slack Admin: Your workspace admin
- System Admin: Your designated admin

### Version History
- v1.0 - Initial system deployment
- v1.1 - Added dynamic configuration
- v1.2 - Added auto-pinning feature
- Current - Full production system