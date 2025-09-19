# Machine Synchronization Guide for VEAGA

This guide explains how to synchronize your VEAGA development environment between different machines (e.g., Mac Mini ↔ MacBook Pro).

## Quick Start

### 🚀 First Time Setup (on both machines)

1. **Clone the repository** (if not already done)
2. **Install dependencies**: `pnpm install`
3. **Start services**: `pnpm services:start`
4. **Setup database**: `pnpm services:setup`

### 📤 Leaving one machine (save your work)

```bash
# Save your current work to git and create backups
pnpm sync:push
```

This will:
- Create a database backup with timestamp
- Create an environment template (masking secrets)
- Stash uncommitted changes
- Commit and push to git

### 📥 Arriving at another machine (get your work)

```bash
# Get the latest work and restore your environment
pnpm sync:pull
```

This will:
- Pull latest changes from git
- Install any new dependencies
- Apply environment template
- Offer to restore database from backup
- Run migrations if needed

## Available Commands

### Core Sync Commands
- `pnpm sync:push` - Save current state and push to remote
- `pnpm sync:pull` - Pull latest and sync to current machine
- `pnpm sync:status` - Show current synchronization status

### Backup Commands
- `pnpm sync:backup` - Create database backup only
- `pnpm sync:restore` - Restore from latest backup

### Alternative Command Names
- `pnpm sync:to` = `pnpm sync:push`
- `pnpm sync:from` = `pnpm sync:pull`

## How It Works

### 🗄️ Database Synchronization
- **Backup**: Creates timestamped PostgreSQL dumps in `backups/`
- **Restore**: Restores database from backup files
- **Automatic cleanup**: Keeps only the last 5 backups

### 🔧 Environment Synchronization
- **Template creation**: Generates `.env.sync` with secrets masked
- **Secret handling**: Secrets are marked as `*** FILL_IN_YOUR_SECRET ***`
- **Manual configuration**: You must fill in secrets manually on each machine

### 🔄 Git Integration
- **Pre-push hook**: Offers to create backups before pushing
- **Post-merge hook**: Handles dependency installation and migrations after pulling
- **Automatic stashing**: Uncommitted changes are safely stashed

## Detailed Workflow

### Scenario: Working on MacBook Pro, switching to Mac Mini

**On MacBook Pro:**
```bash
# 1. Save your work
pnpm sync:push

# The system will:
# - Create database backup: backups/veaga_backup_20241219_143022.sql
# - Create environment template: .env.sync
# - Commit and push your changes
```

**On Mac Mini:**
```bash
# 2. Get the work
pnpm sync:pull

# The system will:
# - Pull latest git changes
# - Install any new dependencies
# - Apply .env.sync template to .env
# - Offer to restore database backup
# - You'll need to fill in secrets in .env manually
```

### Scenario: Quick status check

```bash
pnpm sync:status

# Shows:
# - Git status
# - Environment configuration status
# - Database service status
# - Available backups
```

## File Structure

```
VEAGA/
├── scripts/
│   ├── machine-sync.sh      # Main synchronization script
│   ├── db-backup.sh         # Database backup utility
│   ├── db-restore.sh        # Database restore utility
│   └── sync-env.sh          # Environment synchronization
├── backups/                 # Database backups (auto-generated)
│   ├── veaga_backup_20241219_143022.sql
│   └── veaga_backup_20241219_120815.sql
├── .env                     # Your local environment (gitignored)
├── .env.sync                # Environment template (tracked in git)
└── .husky/
    ├── pre-push             # Auto-backup before push
    └── post-merge           # Auto-sync after pull
```

## Environment Variables

### Secrets (filled manually on each machine)
- `BETTER_AUTH_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `FLOWISE_API_KEY`
- Any other variables containing `SECRET`, `KEY`, `PASSWORD`, or `TOKEN`

### Non-secrets (synced automatically)
- `DATABASE_URL`
- `PRODUCT_NAME`
- `URL`
- `DEFAULT_LOCALE`
- Feature flags and public configuration

## Troubleshooting

### Database connection issues
```bash
# Check if services are running
pnpm services:status

# Start services if needed
pnpm services:start

# Check database connection
pnpm with-env -F @turbostarter/db check
```

### Environment configuration issues
```bash
# Check what secrets need to be filled
grep "FILL_IN_YOUR_SECRET" .env

# Compare your env with the template
./scripts/sync-env.sh --diff

# Recreate .env from template
./scripts/sync-env.sh --apply
```

### Missing dependencies after sync
```bash
# Reinstall all dependencies
pnpm install

# Clean and reinstall if needed
pnpm clean && pnpm install
```

### Git conflicts during sync
```bash
# Your changes are automatically stashed before pull
# If there are conflicts, resolve them and then:
git stash pop

# Or discard local changes and start fresh:
git stash drop
```

## Advanced Usage

### Manual backup and restore
```bash
# Create a backup manually
./scripts/db-backup.sh

# Restore from specific backup
./scripts/db-restore.sh backups/veaga_backup_20241219_143022.sql

# Restore interactively (shows available backups)
./scripts/db-restore.sh
```

### Environment template management
```bash
# Create template from current .env
./scripts/sync-env.sh --create

# Apply template to create .env
./scripts/sync-env.sh --apply

# Show differences between .env and template
./scripts/sync-env.sh --diff
```

### Skip automatic prompts
```bash
# Restore latest backup without prompting
./scripts/db-restore.sh --latest

# List available backups
./scripts/db-restore.sh --list
```

## Security Notes

- 🔒 **Secrets are never committed to git** - they're masked in templates
- 🗂️ **Database backups contain all data** - be careful with sensitive information
- 🔑 **Each machine needs manual secret configuration** - this is intentional for security
- 📁 **Backups are local only** - they're not pushed to git by default

## Tips

1. **Regular backups**: Run `pnpm sync:backup` before major changes
2. **Clean switches**: Always use `pnpm sync:push` before switching machines
3. **Check status**: Use `pnpm sync:status` when in doubt
4. **Keep secrets handy**: Maintain a secure note with your secret values for quick setup
5. **Database size**: Large databases will create large backup files - clean up old backups periodically

---

This synchronization system ensures you can seamlessly continue development across multiple machines while maintaining data integrity and security best practices.