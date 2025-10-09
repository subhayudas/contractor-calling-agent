#!/bin/bash

# Deployment script for Vapi-Supabase Call Flow
# This script helps deploy the edge functions and database migrations

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Vapi-Supabase Call Flow Deployment Script${NC}"
echo "============================================="
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI is not installed.${NC}"
    echo ""
    echo "Installing Supabase CLI..."
    
    # Create local bin directory
    mkdir -p ~/.local/bin
    
    # Download and install for macOS ARM64
    echo "Downloading Supabase CLI..."
    curl -L https://github.com/supabase/cli/releases/latest/download/supabase_darwin_arm64.tar.gz -o /tmp/supabase.tar.gz
    tar -xzf /tmp/supabase.tar.gz -C ~/.local/bin
    rm /tmp/supabase.tar.gz
    
    # Add to PATH
    export PATH="$HOME/.local/bin:$PATH"
    
    # Add to shell config if not already there
    if ! grep -q '.local/bin' ~/.zshrc 2>/dev/null; then
        echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
    fi
    
    echo -e "${GREEN}✅ Supabase CLI installed${NC}"
fi

echo -e "${GREEN}✅ Supabase CLI is installed${NC}"
supabase --version
echo ""

# Check if logged in
echo "🔐 Checking Supabase authentication..."
if ! supabase projects list &> /dev/null; then
    echo -e "${YELLOW}⚠️  You need to login to Supabase first${NC}"
    echo ""
    echo "Please run: ${GREEN}supabase login${NC}"
    echo ""
    echo "This will open your browser to authenticate."
    echo "After logging in, run this script again."
    exit 1
fi

echo -e "${GREEN}✅ Authenticated${NC}"
echo ""

# Check if project is linked
if [ ! -f ".supabase/config.toml" ]; then
    echo "⚠️  Project is not linked to Supabase"
    echo "🔗 Linking to project: gbskwbcuacprkwvooqer"
    supabase link --project-ref gbskwbcuacprkwvooqer
else
    echo -e "${GREEN}✅ Project is already linked${NC}"
fi

echo ""
echo -e "${BLUE}📊 Step 1: Deploying Database Migrations${NC}"
echo "----------------------------------------"
supabase db push

echo ""
echo -e "${BLUE}🔧 Step 2: Deploying Edge Functions${NC}"
echo "-----------------------------------"

# Deploy submit-lead function
echo "Deploying submit-lead function..."
supabase functions deploy submit-lead --no-verify-jwt

# Deploy trigger-call function
echo "Deploying trigger-call function..."
supabase functions deploy trigger-call --no-verify-jwt

echo ""
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo ""
echo -e "${YELLOW}⚙️  Next Steps:${NC}"
echo "1. Set environment variables for your Edge Functions:"
echo -e "   ${GREEN}./setup-secrets.sh${NC}"
echo ""
echo "   Or manually:"
echo "   supabase secrets set VAPI_API_KEY='your-vapi-api-key'"
echo "   supabase secrets set VAPI_ASSISTANT_ID='your-english-assistant-id'"
echo "   supabase secrets set VAPI_PHONE_NUMBER_ID='your-english-phone-number-id'"
echo ""
echo "2. Verify the deployment:"
echo "   supabase functions list"
echo ""
echo "3. Test the system:"
echo -e "   ${GREEN}./test-flow.sh${NC}"
echo ""
echo "📖 For more details, see DEPLOYMENT.md"

