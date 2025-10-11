#!/bin/bash

echo "🚀 Deploying Electrical Contractor Edge Functions..."
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null
then
    echo "❌ Supabase CLI is not installed!"
    echo "Install it with: npm install -g supabase"
    exit 1
fi

echo "✅ Supabase CLI found"
echo ""

# Link to project
echo "🔗 Linking to Supabase project..."
supabase link --project-ref phafibsvqaoomeamnufk

if [ $? -ne 0 ]; then
    echo ""
    echo "⚠️  If you see 'already linked' that's okay!"
fi

echo ""
echo "📤 Deploying submit-lead function..."
supabase functions deploy submit-lead --no-verify-jwt

echo ""
echo "📤 Deploying trigger-call function..."
supabase functions deploy trigger-call --no-verify-jwt

echo ""
echo "✅ Functions deployed successfully!"
echo ""
echo "⚠️  IMPORTANT: You need to set your VAPI API key:"
echo "Run this command:"
echo "supabase secrets set VAPI_API_KEY=\"your-vapi-api-key-here\""
echo ""
echo "🎉 Done! Your functions are live at:"
echo "   - https://phafibsvqaoomeamnufk.supabase.co/functions/v1/submit-lead"
echo "   - https://phafibsvqaoomeamnufk.supabase.co/functions/v1/trigger-call"

