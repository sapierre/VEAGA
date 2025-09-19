#!/bin/bash

# Database restore script for VEAGA project
# Restores database from a backup file for synchronization between machines

set -e

# Load environment variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Extract database connection details from DATABASE_URL
DB_URL=${DATABASE_URL:-"postgresql://turbostarter:turbostarter@localhost:5432/veaga"}

# Parse connection string
DB_USER=$(echo $DB_URL | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
DB_PASS=$(echo $DB_URL | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')
DB_HOST=$(echo $DB_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
DB_PORT=$(echo $DB_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
DB_NAME=$(echo $DB_URL | sed -n 's/.*\/\([^?]*\).*/\1/p')

# Function to show available backups
show_backups() {
    echo "📋 Available backups:"
    if [ -d "backups" ] && [ "$(ls -A backups/veaga_backup_*.sql 2>/dev/null)" ]; then
        ls -la backups/veaga_backup_*.sql | awk '{print "   " $9 " (" $5 " bytes, " $6 " " $7 " " $8 ")"}'
    else
        echo "   No backups found in backups/ directory"
        exit 1
    fi
}

# Determine which backup to restore
if [ "$1" = "--latest" ] || [ "$1" = "-l" ]; then
    # Use latest backup
    BACKUP_FILE=$(ls -t backups/veaga_backup_*.sql 2>/dev/null | head -n1)
    if [ -z "$BACKUP_FILE" ]; then
        echo "❌ No backup files found"
        exit 1
    fi
    echo "🔄 Using latest backup: $BACKUP_FILE"
elif [ "$1" = "--list" ]; then
    show_backups
    exit 0
elif [ -n "$1" ]; then
    # Use specified backup file
    BACKUP_FILE="$1"
    if [ ! -f "$BACKUP_FILE" ]; then
        echo "❌ Backup file not found: $BACKUP_FILE"
        show_backups
        exit 1
    fi
else
    # Interactive selection
    show_backups
    echo ""
    read -p "Enter backup filename (or 'latest' for most recent): " choice
    if [ "$choice" = "latest" ]; then
        BACKUP_FILE=$(ls -t backups/veaga_backup_*.sql | head -n1)
    else
        BACKUP_FILE="$choice"
    fi

    if [ ! -f "$BACKUP_FILE" ]; then
        echo "❌ Backup file not found: $BACKUP_FILE"
        exit 1
    fi
fi

# Confirm restoration
echo ""
echo "⚠️  WARNING: This will completely replace your current database!"
echo "📊 Database: $DB_NAME"
echo "📁 Backup file: $BACKUP_FILE"
echo ""
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Restoration cancelled"
    exit 1
fi

echo "🔄 Restoring database from backup..."

# Stop any running services that might be using the database
echo "🛑 Checking for running services..."
if pgrep -f "next" > /dev/null; then
    echo "⚠️  Next.js appears to be running. You may want to stop it first."
fi

# Restore database
# Add PostgreSQL to PATH if not already available
if ! command -v psql >/dev/null 2>&1; then
    export PATH="/opt/homebrew/opt/postgresql@17/bin:$PATH"
fi

PGPASSWORD=$DB_PASS psql \
    -h $DB_HOST \
    -p $DB_PORT \
    -U $DB_USER \
    -d postgres \
    --no-password \
    -f $BACKUP_FILE

echo "✅ Database restoration completed!"
echo "🎉 Your database has been synchronized with the backup."
echo ""
echo "💡 Next steps:"
echo "   1. Restart your development server: pnpm dev"
echo "   2. Verify everything is working correctly"