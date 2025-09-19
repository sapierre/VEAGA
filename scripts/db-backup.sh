#!/bin/bash

# Database backup script for VEAGA project
# Creates a timestamped database dump for synchronization between machines

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

# Create backups directory if it doesn't exist
mkdir -p backups

# Generate timestamp for backup file
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="backups/veaga_backup_${TIMESTAMP}.sql"

echo "🗂️  Creating database backup..."
echo "📊 Database: $DB_NAME"
echo "📁 File: $BACKUP_FILE"

# Create database dump
# Add PostgreSQL to PATH if not already available
if ! command -v pg_dump >/dev/null 2>&1; then
    export PATH="/opt/homebrew/opt/postgresql@17/bin:$PATH"
fi

PGPASSWORD=$DB_PASS pg_dump \
    -h $DB_HOST \
    -p $DB_PORT \
    -U $DB_USER \
    -d $DB_NAME \
    --no-password \
    --verbose \
    --clean \
    --if-exists \
    --create \
    > $BACKUP_FILE

echo "✅ Database backup completed: $BACKUP_FILE"

# Keep only the last 5 backups to save space
echo "🧹 Cleaning up old backups (keeping last 5)..."
ls -t backups/veaga_backup_*.sql | tail -n +6 | xargs -r rm

# Show backup file size
BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
echo "📏 Backup size: $BACKUP_SIZE"

echo "🎉 Backup process complete!"