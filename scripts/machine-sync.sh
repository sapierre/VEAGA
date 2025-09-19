#!/bin/bash

# Complete machine synchronization script for VEAGA project
# Combines git operations, database sync, and environment sync

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Function to check if services are running
check_services() {
    print_info "Checking database connection..."
    if ! pnpm services:status > /dev/null 2>&1; then
        print_warning "Database services not running. Starting..."
        pnpm services:start
        sleep 5
    fi
    print_status "Database services are running"
}

# Function to backup current state
backup_current_state() {
    print_info "Creating backup of current state..."

    # Create database backup
    if ./scripts/db-backup.sh; then
        print_status "Database backup completed"
    else
        print_error "Database backup failed"
        exit 1
    fi

    # Create environment template if .env exists
    if [ -f ".env" ]; then
        ./scripts/sync-env.sh --create
        print_status "Environment template created"
    fi

    # Commit any uncommitted changes
    if [ -n "$(git status --porcelain)" ]; then
        print_warning "You have uncommitted changes. They will be stashed."
        git stash push -u -m "Auto-stash before sync $(date)"
        print_status "Changes stashed"
    fi
}

# Function to pull and sync from remote
pull_and_sync() {
    print_info "Pulling latest changes from remote..."

    # Pull latest changes
    git pull origin $(git branch --show-current)
    print_status "Git pull completed"

    # Install any new dependencies
    print_info "Installing dependencies..."
    pnpm install
    print_status "Dependencies updated"

    # Apply environment template if it exists
    if [ -f ".env.sync" ]; then
        print_info "Environment template found, applying..."
        ./scripts/sync-env.sh --apply
        print_warning "Don't forget to fill in secret values in .env"
    fi

    # Restore database if backup exists
    if [ -d "backups" ] && [ "$(ls -A backups/veaga_backup_*.sql 2>/dev/null)" ]; then
        echo ""
        read -p "🔄 Database backups found. Restore from latest backup? (y/n): " restore_db
        if [ "$restore_db" = "y" ] || [ "$restore_db" = "Y" ]; then
            ./scripts/db-restore.sh --latest
            print_status "Database restored from backup"
        fi
    else
        print_info "No database backups found, running migrations..."
        pnpm with-env -F @turbostarter/db migrate
        print_status "Database migrations completed"
    fi
}

# Function to prepare for push
prepare_push() {
    print_info "Preparing to push changes to remote..."

    # Create current state backup
    backup_current_state

    # Show status
    git status

    echo ""
    read -p "📤 Ready to commit and push? (y/n): " confirm_push
    if [ "$confirm_push" = "y" ] || [ "$confirm_push" = "Y" ]; then
        read -p "Enter commit message: " commit_msg

        # Add files (excluding secrets)
        git add .
        git reset .env 2>/dev/null || true  # Don't add .env if it exists

        # Commit
        git commit -m "$commit_msg"

        # Push
        git push origin $(git branch --show-current)
        print_status "Changes pushed to remote"
    else
        print_info "Push cancelled"
    fi
}

# Function to show sync status
show_status() {
    echo ""
    echo "🔧 VEAGA Machine Synchronization Status"
    echo "======================================"

    # Git status
    echo ""
    print_info "Git Status:"
    git status --short

    # Environment status
    echo ""
    print_info "Environment Status:"
    if [ -f ".env" ]; then
        secrets_needed=$(grep -c "FILL_IN_YOUR_SECRET" .env 2>/dev/null || echo "0")
        if [ "$secrets_needed" -gt 0 ]; then
            print_warning "$secrets_needed secrets need to be configured in .env"
        else
            print_status ".env appears to be properly configured"
        fi
    else
        print_warning "No .env file found"
    fi

    # Database status
    echo ""
    print_info "Database Status:"
    if pnpm services:status > /dev/null 2>&1; then
        print_status "Database services are running"
    else
        print_warning "Database services are not running"
    fi

    # Backup status
    echo ""
    print_info "Backup Status:"
    if [ -d "backups" ] && [ "$(ls -A backups/veaga_backup_*.sql 2>/dev/null)" ]; then
        backup_count=$(ls backups/veaga_backup_*.sql 2>/dev/null | wc -l | tr -d ' ')
        latest_backup=$(ls -t backups/veaga_backup_*.sql 2>/dev/null | head -n1)
        backup_date=$(stat -f "%Sm" -t "%Y-%m-%d %H:%M" "$latest_backup" 2>/dev/null || echo "unknown")
        print_status "$backup_count database backups available (latest: $backup_date)"
    else
        print_warning "No database backups found"
    fi
}

# Main script logic
case "$1" in
    "pull"|"sync-from")
        echo "🔄 Syncing FROM remote to this machine..."
        check_services
        pull_and_sync
        print_status "Sync from remote completed!"
        echo ""
        print_info "Next steps:"
        echo "  1. Check that all secrets are configured in .env"
        echo "  2. Start development: pnpm dev"
        ;;
    "push"|"sync-to")
        echo "📤 Syncing TO remote from this machine..."
        check_services
        prepare_push
        ;;
    "status"|"info")
        show_status
        ;;
    "backup")
        echo "💾 Creating backup of current state..."
        check_services
        backup_current_state
        print_status "Backup completed!"
        ;;
    "restore")
        echo "🔄 Restoring from backup..."
        check_services
        ./scripts/db-restore.sh
        ;;
    "help"|"--help"|"-h"|"")
        echo "🔧 VEAGA Machine Synchronization Tool"
        echo ""
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  pull, sync-from    Pull changes from remote and sync to this machine"
        echo "  push, sync-to      Backup current state and push to remote"
        echo "  status, info       Show current synchronization status"
        echo "  backup             Create backup of current database state"
        echo "  restore            Restore database from backup (interactive)"
        echo "  help               Show this help message"
        echo ""
        echo "Typical workflow:"
        echo "  📱 On MacBook Pro: ./scripts/machine-sync.sh push"
        echo "  🖥️  On Mac Mini:    ./scripts/machine-sync.sh pull"
        echo "  🔄 Or vice versa!"
        ;;
    *)
        print_error "Unknown command: $1"
        echo "💡 Use 'help' for usage information"
        exit 1
        ;;
esac