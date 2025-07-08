# DuetRight Slack Bot & Job Automation System

A comprehensive Slack automation system that includes both job routing from Jobber and automatic message pinning.

## 🚀 Features

### Job Automation (Zapier Integration)
- **Automatic Job Routing**: Jobs route to technician-specific channels
- **Dynamic Configuration**: Manage technicians via Slack message
- **Individual Tagging**: Each technician gets personally notified
- **Thread Organization**: Job details in organized threads
- **No Code Changes**: Add/remove technicians without touching code

### Message Pin Bot (v2.0)
- **Auto-pinning**: Automatically pins messages that match the bold pattern (`*message*`)
- **Multi-user support**: Works for ALL users in the channel (no user restrictions)
- **Project channel focused**: Only operates in designated project channels
- **Visual feedback**: Adds a pushpin emoji reaction to pinned messages

## 📋 Quick Start

### For Job Automation:
1. **Zapier Setup**: Import the automation using `zapier/setup-instructions.md`
2. **Configure Technicians**: Edit message in #technician-config
3. **Test**: Create a test job in Jobber

### For Pin Bot:
1. Install dependencies: `npm install`
2. Set environment variables (see .env.example)
3. Run the bot: `node index.js`

## 🔧 Configuration

### Technician Directory Format:
```
TECHNICIAN DIRECTORY v1.0
============================
TechnicianName | channel-name | SlackUserID
Vladimir       | proj-vladimir | U06B3CV6198
Marina         | proj-marina   | U06SGRJ411V
```

### Pin Bot Usage:
Simply post a message wrapped in asterisks in any monitored channel:
```
*This is an important message that will be pinned*
```

## 📁 Repository Structure

```
├── zapier/          # Zapier automation code
├── replit/          # Slack pin bot (legacy)
├── docs/            # Documentation & guides
├── config/          # Example configurations
├── index.js         # Main pin bot (v2.0)
├── test-bot.js      # Multi-user test suite
└── SOPs/            # Standard Operating Procedures
```

## 📊 System Flow

### Job Routing:
```
Jobber Job Created → Zapier Triggered → Read Slack Config → Parse Technician → Route to Channel → Pin & Tag & Thread
```

### Message Pinning:
```
User posts *message* → Bot detects pattern → Pin message → Add reaction
```

## 🛠️ Recent Updates

- **v2.0** (Jan 2025): Removed user restrictions - pin bot now works for ALL team members
- **v1.0**: Initial release with limited user access

## 📚 Documentation

- [Standard Operating Procedure](docs/standard-operating-procedure.md)
- [Troubleshooting Guide](docs/troubleshooting.md)
- [Multi-User Test Suite](test-bot.js)
- [Change Log](CHANGES.md)

## 👥 Team

Built for DuetRight operations team to streamline job assignments and improve response times.

## 📄 License

Private repository for DuetRight internal use only.
