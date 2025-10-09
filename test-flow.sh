#!/bin/bash

# Automated test script for Vapi-Supabase Call Flow
# This script tests the complete flow from form submission to database storage

set -e

echo "🧪 Testing Vapi-Supabase Call Flow"
echo "==================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Supabase configuration
SUPABASE_URL="https://gbskwbcuacprkwvooqer.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2t3YmN1YWNwcmt3dm9vcWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NjU4ODIsImV4cCI6MjA3NTQ0MTg4Mn0.FdDDSkSC9q95W866fudyBmv0L9w--754wYzjOswKBM0"

# Function to print success
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Function to print error
error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function to print info
info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

echo "📋 Test 1: Checking database setup"
echo "-----------------------------------"
if supabase db query "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'leads';" &> /dev/null; then
    success "Database table 'leads' exists"
else
    error "Database table 'leads' not found. Run: supabase db push"
    exit 1
fi
echo ""

echo "📋 Test 2: Testing submit-lead function (without call)"
echo "-------------------------------------------------------"
RESPONSE=$(curl -s -X POST \
  "${SUPABASE_URL}/functions/v1/submit-lead" \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
  -d '{
    "firstName": "AutoTest",
    "lastName": "User",
    "phoneNumber": "+11234567890",
    "email": "autotest@example.com",
    "intent": "buy",
    "language": "english",
    "optInCall": false
  }')

if echo "$RESPONSE" | grep -q '"success":true'; then
    success "Lead submitted successfully"
    LEAD_ID=$(echo "$RESPONSE" | grep -o '"leadId":"[^"]*"' | cut -d'"' -f4)
    info "Lead ID: $LEAD_ID"
else
    error "Failed to submit lead"
    info "Response: $RESPONSE"
    exit 1
fi
echo ""

echo "📋 Test 3: Verifying lead in database"
echo "--------------------------------------"
sleep 2  # Wait for database write
DB_CHECK=$(supabase db query "SELECT COUNT(*) FROM public.leads WHERE email = 'autotest@example.com';" 2>&1 || echo "error")

if echo "$DB_CHECK" | grep -q "1"; then
    success "Lead found in database"
else
    error "Lead not found in database"
    info "Database response: $DB_CHECK"
    exit 1
fi
echo ""

echo "📋 Test 4: Checking lead details"
echo "---------------------------------"
LEAD_DETAILS=$(supabase db query "SELECT first_name, last_name, email, intent, language, opt_in_call, call_scheduled FROM public.leads WHERE email = 'autotest@example.com' ORDER BY created_at DESC LIMIT 1;" 2>&1 || echo "error")

if echo "$LEAD_DETAILS" | grep -q "AutoTest"; then
    success "Lead details are correct"
    echo "$LEAD_DETAILS"
else
    error "Lead details verification failed"
    info "$LEAD_DETAILS"
fi
echo ""

echo "📋 Test 5: Testing with opt-in call (will trigger if Vapi configured)"
echo "----------------------------------------------------------------------"
info "This test will trigger a call if Vapi credentials are configured"
info "Make sure to use a test phone number you control"
echo ""
read -p "Enter a test phone number (+1234567890) or press Enter to skip: " TEST_PHONE

if [ ! -z "$TEST_PHONE" ]; then
    CALL_RESPONSE=$(curl -s -X POST \
      "${SUPABASE_URL}/functions/v1/submit-lead" \
      -H 'Content-Type: application/json' \
      -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
      -d "{
        \"firstName\": \"CallTest\",
        \"lastName\": \"User\",
        \"phoneNumber\": \"${TEST_PHONE}\",
        \"email\": \"calltest@example.com\",
        \"intent\": \"sell\",
        \"language\": \"english\",
        \"optInCall\": true
      }")

    if echo "$CALL_RESPONSE" | grep -q '"success":true'; then
        success "Lead with call opt-in submitted successfully"
        info "You should receive a call shortly at: $TEST_PHONE"
        
        sleep 3
        CALL_CHECK=$(supabase db query "SELECT call_scheduled FROM public.leads WHERE email = 'calltest@example.com' ORDER BY created_at DESC LIMIT 1;" 2>&1 || echo "error")
        
        if echo "$CALL_CHECK" | grep -q "t"; then
            success "Call was scheduled successfully"
        else
            error "Call scheduling may have failed"
            info "Check logs: supabase functions logs trigger-call"
        fi
    else
        error "Failed to submit lead with call opt-in"
        info "Response: $CALL_RESPONSE"
    fi
else
    info "Skipping call test"
fi
echo ""

echo "🧹 Cleaning up test data"
echo "------------------------"
read -p "Do you want to clean up test data? (y/n): " CLEANUP

if [ "$CLEANUP" = "y" ] || [ "$CLEANUP" = "Y" ]; then
    supabase db query "DELETE FROM public.leads WHERE email IN ('autotest@example.com', 'calltest@example.com');" &> /dev/null
    success "Test data cleaned up"
else
    info "Test data kept in database"
    info "To clean up later, run:"
    info "supabase db query \"DELETE FROM public.leads WHERE email IN ('autotest@example.com', 'calltest@example.com');\""
fi
echo ""

echo "📊 Summary"
echo "=========="
echo ""
success "All core tests passed!"
echo ""
info "Next steps:"
echo "1. Check function logs: supabase functions logs submit-lead"
echo "2. View all leads: supabase db query 'SELECT * FROM public.leads ORDER BY created_at DESC;'"
echo "3. Test the frontend at: http://localhost:5173"
echo ""
info "For detailed testing guide, see TESTING.md"

