# DuetRight Slack Bot

A Slack bot that automatically pins important messages in project channels.

## Features

- **Auto-pinning**: Automatically pins messages that match the bold pattern (`*message*`)
- **Multi-user support**: Works for ALL users in the channel (no user restrictions)
- **Project channel focused**: Only operates in designated project channels
- **Visual feedback**: Adds a pushpin emoji reaction to pinned messages

## How It Works

1. The bot monitors messages in configured project channels
2. When ANY user posts a message wrapped in asterisks (e.g., `*Important update*`)
3. The bot automatically:
   - Pins the message to the channel
   - Adds a 📌 reaction to confirm the action

## Supported Channels

The bot currently monitors these project channels:
- `#proj-vladimir`
- `#proj-marina`
- `#proj-sergei`
- `#proj-stanangelo`
- `#proj-cbti`
- `#proj-mike`

## Usage

Simply post a message wrapped in asterisks in any monitored channel:

```
*This is an important message that will be pinned*
```

The bot will automatically pin it and add a pushpin reaction.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set environment variables:
   ```bash
   export SLACK_BOT_TOKEN=xoxb-your-bot-token
   export SLACK_SIGNING_SECRET=your-signing-secret
   export SLACK_APP_TOKEN=xapp-your-app-token
   ```

3. Run the bot:
   ```bash
   node index.js
   ```

## Recent Changes

- **v2.0** (Jan 2025): Removed user restrictions - now ALL team members can trigger auto-pinning
- **v1.0**: Initial release with Sky-only restrictions

## Requirements

- Node.js 16+
- Slack workspace with bot permissions:
  - `channels:read` - Read channel information
  - `chat:write` - Post messages
  - `pins:write` - Pin messages
  - `reactions:write` - Add reactions
  - `channels:history` - Read message history

## Troubleshooting

If messages aren't being pinned:
1. Ensure the message is wrapped in asterisks: `*message*`
2. Verify you're posting in a monitored project channel
3. Check the bot is running and connected
4. Review console logs for any errors

## Contributing

To add more channels or modify behavior, edit the `projectChannels` array in `index.js`.