#!/bin/bash

# Script to set up Supabase secrets for Vapi integration
# Run this after deploying the edge functions

set -e

echo "🔐 Setting up Supabase Secrets for Vapi Integration"
echo "=================================================="
echo ""
echo "This script will help you configure the required environment variables"
echo "for the Vapi integration edge functions."
echo ""

# Function to prompt for input
prompt_secret() {
    local var_name=$1
    local description=$2
    
    echo "📝 $description"
    read -p "Enter $var_name: " value
    
    if [ -z "$value" ]; then
        echo "❌ Error: $var_name cannot be empty"
        exit 1
    fi
    
    echo "Setting $var_name..."
    supabase secrets set "$var_name=$value"
    echo "✅ $var_name set successfully"
    echo ""
}

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed."
    echo "📦 Install it with: npm install -g supabase"
    exit 1
fi

echo "Getting your Vapi API credentials..."
echo ""
echo "To find these values:"
echo "1. Go to https://dashboard.vapi.ai/"
echo "2. API Key: Settings → API Keys"
echo "3. Assistant ID: Assistants → Select assistant → Copy ID from URL"
echo "4. Phone Number ID: Phone Numbers → Select number → Copy ID"
echo ""

# Prompt for each secret
prompt_secret "VAPI_API_KEY" "Your Vapi API Key (from Settings → API Keys)"
prompt_secret "VAPI_ASSISTANT_ID" "Your English Assistant ID"
prompt_secret "VAPI_PHONE_NUMBER_ID" "Your English Phone Number ID"

echo ""
echo "✅ All secrets have been set!"
echo ""
echo "📋 Verify your secrets:"
echo "   supabase secrets list"
echo ""
echo "Note: The French assistant IDs are hardcoded in the trigger-call function:"
echo "  - French Assistant ID: 46f8bf21-0eaa-4fab-bb1c-5bc89eff3b28"
echo "  - French Phone Number ID: 2137f83a-dd61-4fea-8775-75326953a993"
echo ""
echo "If you need to change these, edit supabase/functions/trigger-call/index.ts"
echo ""
echo "🎉 Setup complete! Your edge functions are now configured."

