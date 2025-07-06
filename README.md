# DuetRight Job Automation System

Complete automation system for routing Jobber jobs to Slack channels with dynamic technician management.

## 🚀 Features

- **Automatic Job Routing**: Jobs route to technician-specific channels
- **Dynamic Configuration**: Manage technicians via Slack message
- **Individual Tagging**: Each technician gets personally notified
- **Auto-Pinning**: Important messages automatically pinned
- **Thread Organization**: Job details in organized threads
- **No Code Changes**: Add/remove technicians without touching code

## 📋 Quick Start

1. **Zapier Setup**: Import the automation using `zapier/setup-instructions.md`
2. **Replit Bot**: Deploy the pin bot using `replit/` files
3. **Configure Technicians**: Edit message in #technician-config
4. **Test**: Create a test job in Jobber

## 🔧 Configuration Format

```
TECHNICIAN DIRECTORY v1.0
============================
TechnicianName | channel-name | SlackUserID
Vladimir       | proj-vladimir | U06B3CV6198
Marina         | proj-marina   | U06SGRJ411V
```

## 📁 Repository Structure

```
├── zapier/          # Zapier automation code
├── replit/          # Slack pin bot
├── docs/            # Documentation & guides
└── config/          # Example configurations
```

## 📚 Documentation

- [Standard Operating Procedure](docs/standard-operating-procedure.md)
- [System Overview](docs/system-overview.md)
- [Troubleshooting Guide](docs/troubleshooting.md)
- [Deployment Guide](docs/deployment-guide.md)

## 🛠️ Components

### Zapier Automation
- Triggers on new Jobber jobs
- Reads dynamic config from Slack
- Routes to appropriate channels
- Tags technicians individually

### Replit Pin Bot
- Monitors project channels
- Auto-pins job messages
- Runs 24/7 on Replit

### Dynamic Configuration
- Managed via #technician-config
- No code changes needed
- Instant updates

## 📊 System Flow

```
Jobber Job Created
    ↓
Zapier Triggered
    ↓
Read Slack Config
    ↓
Parse Technician
    ↓
Route to Channel
    ↓
Pin & Tag & Thread
```

## 👥 Team

Built for DuetRight operations team to streamline job assignments and improve response times.

## 📄 License

Private repository for DuetRight internal use only.