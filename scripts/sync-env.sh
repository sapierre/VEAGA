#!/bin/bash

# Environment synchronization script for VEAGA project
# Helps synchronize non-secret environment variables between machines

set -e

ENV_TEMPLATE=".env.sync"
ENV_FILE=".env"

# Function to create environment template from current .env
create_template() {
    echo "📝 Creating environment template from current .env..."

    if [ ! -f "$ENV_FILE" ]; then
        echo "❌ No .env file found. Please create one first."
        exit 1
    fi

    # Create template with non-secret values, masking secrets
    cat > "$ENV_TEMPLATE" << 'EOF'
# Environment sync template for VEAGA
# This file contains non-secret environment variables that can be shared between machines
# Secrets are marked with placeholders and must be filled in manually

EOF

    # Process .env file, keeping non-secrets and masking secrets
    while IFS= read -r line; do
        # Skip empty lines and comments
        if [[ -z "$line" ]] || [[ "$line" == \#* ]]; then
            echo "$line" >> "$ENV_TEMPLATE"
            continue
        fi

        # Check if line contains a secret (keys, tokens, passwords, etc.)
        if [[ "$line" =~ (SECRET|KEY|PASSWORD|TOKEN|WEBHOOK)= ]]; then
            # Extract variable name and mask the value
            var_name=$(echo "$line" | cut -d'=' -f1)
            echo "${var_name}=\"*** FILL_IN_YOUR_SECRET ***\"" >> "$ENV_TEMPLATE"
        else
            # Non-secret, keep as-is
            echo "$line" >> "$ENV_TEMPLATE"
        fi
    done < "$ENV_FILE"

    echo "✅ Template created: $ENV_TEMPLATE"
    echo "🔒 Secrets have been masked and need manual configuration"
}

# Function to apply template to create new .env
apply_template() {
    echo "🔄 Applying environment template..."

    if [ ! -f "$ENV_TEMPLATE" ]; then
        echo "❌ No environment template found: $ENV_TEMPLATE"
        echo "💡 Run: $0 --create to create a template first"
        exit 1
    fi

    if [ -f "$ENV_FILE" ]; then
        echo "⚠️  Existing .env file found"
        read -p "Backup existing .env before applying template? (y/n): " backup
        if [ "$backup" = "y" ] || [ "$backup" = "Y" ]; then
            timestamp=$(date +"%Y%m%d_%H%M%S")
            cp "$ENV_FILE" "${ENV_FILE}.backup.${timestamp}"
            echo "📁 Backup created: ${ENV_FILE}.backup.${timestamp}"
        fi
    fi

    cp "$ENV_TEMPLATE" "$ENV_FILE"
    echo "✅ Template applied to .env"
    echo ""
    echo "🔧 IMPORTANT: You need to fill in the masked secrets:"
    echo "   Look for lines containing: *** FILL_IN_YOUR_SECRET ***"
    echo "   Update them with your actual secret values"
    echo ""

    # Show which secrets need to be filled
    echo "🔑 Secrets that need configuration:"
    grep "FILL_IN_YOUR_SECRET" "$ENV_FILE" | cut -d'=' -f1 | sed 's/^/   /'
}

# Function to show diff between current .env and template
show_diff() {
    if [ ! -f "$ENV_TEMPLATE" ]; then
        echo "❌ No environment template found: $ENV_TEMPLATE"
        exit 1
    fi

    if [ ! -f "$ENV_FILE" ]; then
        echo "❌ No .env file found"
        exit 1
    fi

    echo "📊 Differences between current .env and template:"
    echo "   (Lines starting with - are in current .env but not template)"
    echo "   (Lines starting with + are in template but not current .env)"
    echo ""

    # Create temporary files for comparison (masking secrets in current .env)
    temp_current=$(mktemp)
    while IFS= read -r line; do
        if [[ "$line" =~ (SECRET|KEY|PASSWORD|TOKEN|WEBHOOK)= ]]; then
            var_name=$(echo "$line" | cut -d'=' -f1)
            echo "${var_name}=\"*** SECRET ***\"" >> "$temp_current"
        else
            echo "$line" >> "$temp_current"
        fi
    done < "$ENV_FILE"

    diff -u "$temp_current" "$ENV_TEMPLATE" || true
    rm "$temp_current"
}

# Main script logic
case "$1" in
    "--create"|"-c")
        create_template
        ;;
    "--apply"|"-a")
        apply_template
        ;;
    "--diff"|"-d")
        show_diff
        ;;
    "--help"|"-h"|"")
        echo "🔧 VEAGA Environment Synchronization Tool"
        echo ""
        echo "Usage: $0 [option]"
        echo ""
        echo "Options:"
        echo "  -c, --create    Create environment template from current .env"
        echo "  -a, --apply     Apply template to create/update .env"
        echo "  -d, --diff      Show differences between current .env and template"
        echo "  -h, --help      Show this help message"
        echo ""
        echo "Workflow for synchronizing between machines:"
        echo "  1. On source machine: $0 --create"
        echo "  2. Commit .env.sync to git"
        echo "  3. On target machine: git pull && $0 --apply"
        echo "  4. Fill in the secret values manually"
        ;;
    *)
        echo "❌ Unknown option: $1"
        echo "💡 Use --help for usage information"
        exit 1
        ;;
esac