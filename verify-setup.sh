#!/bin/bash

# Verification script to check if everything is set up correctly
# Run this before testing to ensure all components are ready

set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 Vapi-Supabase Call Flow Setup Verification${NC}"
echo "============================================="
echo ""

ISSUES=0

# Function to print success
check_pass() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Function to print error
check_fail() {
    echo -e "${RED}❌ $1${NC}"
    ISSUES=$((ISSUES + 1))
}

# Function to print warning
check_warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Function to print info
info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

echo "📦 Checking Prerequisites"
echo "-------------------------"

# Check Supabase CLI
if command -v supabase &> /dev/null; then
    check_pass "Supabase CLI is installed"
    SUPABASE_VERSION=$(supabase --version | head -n 1)
    info "Version: $SUPABASE_VERSION"
else
    check_fail "Supabase CLI is not installed"
    info "Install with: npm install -g supabase"
fi

# Check Node.js
if command -v node &> /dev/null; then
    check_pass "Node.js is installed"
    NODE_VERSION=$(node --version)
    info "Version: $NODE_VERSION"
else
    check_fail "Node.js is not installed"
fi

# Check npm
if command -v npm &> /dev/null; then
    check_pass "npm is installed"
else
    check_fail "npm is not installed"
fi

echo ""
echo "🔗 Checking Supabase Project Link"
echo "---------------------------------"

if [ -f ".supabase/config.toml" ]; then
    check_pass "Project is linked to Supabase"
    PROJECT_ID=$(grep -E "project_id\s*=" supabase/config.toml | cut -d'"' -f2 || echo "unknown")
    info "Project ID: $PROJECT_ID"
else
    check_fail "Project is not linked"
    info "Run: supabase link --project-ref gbskwbcuacprkwvooqer"
fi

echo ""
echo "📊 Checking Database"
echo "-------------------"

# Check if database is accessible
if supabase db query "SELECT 1;" &> /dev/null; then
    check_pass "Database is accessible"
else
    check_fail "Cannot access database"
    info "Make sure you're linked to the project and logged in"
fi

# Check if leads table exists
if supabase db query "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'leads';" 2>&1 | grep -q "leads"; then
    check_pass "Table 'leads' exists"
    
    # Check row count
    ROW_COUNT=$(supabase db query "SELECT COUNT(*) FROM public.leads;" 2>&1 | grep -oE '[0-9]+' | head -n 1 || echo "0")
    info "Current leads in database: $ROW_COUNT"
else
    check_fail "Table 'leads' does not exist"
    info "Run: supabase db push"
fi

echo ""
echo "⚡ Checking Edge Functions"
echo "-------------------------"

# Check if functions are deployed
FUNCTIONS_LIST=$(supabase functions list 2>&1 || echo "error")

if echo "$FUNCTIONS_LIST" | grep -q "submit-lead"; then
    check_pass "Function 'submit-lead' is deployed"
else
    check_fail "Function 'submit-lead' is not deployed"
    info "Run: supabase functions deploy submit-lead"
fi

if echo "$FUNCTIONS_LIST" | grep -q "trigger-call"; then
    check_pass "Function 'trigger-call' is deployed"
else
    check_fail "Function 'trigger-call' is not deployed"
    info "Run: supabase functions deploy trigger-call"
fi

echo ""
echo "🔐 Checking Environment Variables"
echo "---------------------------------"

SECRETS=$(supabase secrets list 2>&1 || echo "error")

if echo "$SECRETS" | grep -q "VAPI_API_KEY"; then
    check_pass "VAPI_API_KEY is set"
else
    check_fail "VAPI_API_KEY is not set"
    info "Run: supabase secrets set VAPI_API_KEY='your-key'"
fi

if echo "$SECRETS" | grep -q "VAPI_ASSISTANT_ID"; then
    check_pass "VAPI_ASSISTANT_ID is set"
else
    check_fail "VAPI_ASSISTANT_ID is not set"
    info "Run: supabase secrets set VAPI_ASSISTANT_ID='your-id'"
fi

if echo "$SECRETS" | grep -q "VAPI_PHONE_NUMBER_ID"; then
    check_pass "VAPI_PHONE_NUMBER_ID is set"
else
    check_fail "VAPI_PHONE_NUMBER_ID is not set"
    info "Run: supabase secrets set VAPI_PHONE_NUMBER_ID='your-id'"
fi

echo ""
echo "📁 Checking Project Files"
echo "------------------------"

if [ -f "src/components/LeadForm.tsx" ]; then
    check_pass "LeadForm component exists"
else
    check_fail "LeadForm component not found"
fi

if [ -f "supabase/functions/submit-lead/index.ts" ]; then
    check_pass "submit-lead function file exists"
else
    check_fail "submit-lead function file not found"
fi

if [ -f "supabase/functions/trigger-call/index.ts" ]; then
    check_pass "trigger-call function file exists"
else
    check_fail "trigger-call function file not found"
fi

if [ -f ".env" ]; then
    check_pass ".env file exists"
    
    # Check .env variables
    if grep -q "VITE_SUPABASE_URL" .env; then
        check_pass "VITE_SUPABASE_URL is set in .env"
    else
        check_fail "VITE_SUPABASE_URL not found in .env"
    fi
    
    if grep -q "VITE_SUPABASE_PUBLISHABLE_KEY" .env; then
        check_pass "VITE_SUPABASE_PUBLISHABLE_KEY is set in .env"
    else
        check_fail "VITE_SUPABASE_PUBLISHABLE_KEY not found in .env"
    fi
else
    check_fail ".env file not found"
fi

if [ -d "node_modules" ]; then
    check_pass "node_modules directory exists"
else
    check_warn "node_modules directory not found"
    info "Run: npm install"
fi

echo ""
echo "📋 Summary"
echo "=========="
echo ""

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed! Your setup is complete.${NC}"
    echo ""
    info "You can now:"
    echo "  1. Run the app: npm run dev"
    echo "  2. Test the flow: ./test-flow.sh"
    echo "  3. View deployment guide: cat DEPLOYMENT.md"
else
    echo -e "${RED}⚠️  Found $ISSUES issue(s) that need to be fixed.${NC}"
    echo ""
    info "Quick fixes:"
    echo "  • Deploy everything: ./deploy.sh"
    echo "  • Set up secrets: ./setup-secrets.sh"
    echo "  • Install dependencies: npm install"
    echo ""
    info "For detailed instructions, see DEPLOYMENT.md"
fi

echo ""

