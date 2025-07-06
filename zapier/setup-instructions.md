# Zapier Setup Instructions

Complete guide to setting up the DuetRight Job Automation in Zapier.

## Prerequisites

- Zapier account with access to:
  - Jobber integration
  - Slack integration
  - Code by Zapier
  - Delay by Zapier
- Admin access to your Slack workspace
- Jobber account with API access

## Step-by-Step Setup

### Step 1: Create New Zap
1. Log into Zapier
2. Click "Create Zap"
3. Name it: "DuetRight Job Router"

### Step 2: Configure Trigger (Jobber)
1. **App**: Jobber
2. **Event**: New Job Created
3. **Account**: Connect your Jobber account
4. **Test**: Should find recent jobs

### Step 3: Add Find Config Message
1. Click **+** to add step
2. **App**: Slack
3. **Event**: Find Message
4. **Configure**:
   - Search Query: `TECHNICIAN DIRECTORY v1.0`
   - Sort By: Message Date Time
   - Sort Direction: desc
5. **Test**: Should find config in #technician-config

### Step 4: Add Code Step
1. Click **+** to add step
2. **App**: Code by Zapier
3. **Event**: Run Javascript
4. **Input Data**:
   - Field name: `config_message`
   - Field value: Select `2. Text` from Step 2
   - Field name: `Title`
   - Field value: Select job title from Step 1
5. **Code**: Paste contents of `zapier/code.js`
6. **Test**: Should show dynamic config loaded

### Step 5: Send Channel Message
1. Click **+** to add step
2. **App**: Slack
3. **Event**: Send Channel Message
4. **Configure**:
   - Channel: Select from Step 3 → `channel`
   - Message Text: Select from Step 3 → `message`
   - Bot Name: `DuetRight Bot`
   - Bot Icon: 🤖
5. **Test**: Message should post to correct channel

### Step 6: Add Delay
1. Click **+** to add step
2. **App**: Delay by Zapier
3. **Event**: Delay For
4. **Time**: 20 seconds

### Step 7: Find Message (for pinning)
1. Click **+** to add step
2. **App**: Slack
3. **Event**: Find Message
4. **Configure**:
   - Search Query: Select from Step 3 → `searchMessage`
   - Should this step be considered successful: Yes

### Step 8: Send Thread Reply
1. Click **+** to add step
2. **App**: Slack
3. **Event**: Send Channel Message
4. **Configure**:
   - Channel: Select from Step 3 → `channel`
   - Message Text: Select from Step 3 → `threadMessage`
   - Thread: Select from Step 6 → `Ts`
   - Bot Name: `Sky`
   - Bot Icon: 🌟

### Step 9: Send Tag Message
1. Click **+** to add step
2. **App**: Slack
3. **Event**: Send Channel Message
4. **Configure**:
   - Channel: Select from Step 3 → `channel`
   - Message Text: Select from Step 3 → `tagMessage`
   - Thread: Select from Step 6 → `Ts`
   - Bot Name: `DuetRight Assistant`
   - Bot Icon: 📢

### Step 10: Turn On Your Zap
1. Review all steps
2. Click "Publish"
3. Ensure status shows "ON"

## Testing

1. Create test job in Jobber: "Test Job - Vladimir"
2. Wait 1-2 minutes
3. Check #proj-vladimir for:
   - Main message posted
   - Thread with details
   - Vladimir tagged
   - Message pinned (if bot running)

## Troubleshooting

- **Jobs not triggering**: Check Zap history
- **Wrong channel**: Verify technician name format
- **No tagging**: Check Slack user IDs
- **Config not loading**: Verify config message format

## Maintenance

- Update technicians: Edit pinned message in #technician-config
- Add channels: Update bot code, add to technician config
- Change routing: Update config message only