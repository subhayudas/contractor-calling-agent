# Deployment Guide

This guide will help you deploy the Vapi-Supabase Call Flow application.

## Prerequisites

1. Node.js and npm installed
2. Supabase CLI installed (`npm install -g supabase`)
3. Supabase project created (already done: `gbskwbcuacprkwvooqer`)
4. Vapi account with API credentials

## Step 1: Link to Supabase Project

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref gbskwbcuacprkwvooqer
```

## Step 2: Set Environment Variables in Supabase

You need to set the following environment variables in your Supabase project for the Edge Functions:

```bash
# Set VAPI API credentials
supabase secrets set VAPI_API_KEY="your-vapi-api-key"
supabase secrets set VAPI_ASSISTANT_ID="your-english-assistant-id"
supabase secrets set VAPI_PHONE_NUMBER_ID="your-english-phone-number-id"
```

**To get these values:**
1. Go to [Vapi Dashboard](https://dashboard.vapi.ai/)
2. **VAPI_API_KEY**: Go to Settings → API Keys
3. **VAPI_ASSISTANT_ID**: Go to Assistants → Select your English assistant → Copy the ID from URL or settings
4. **VAPI_PHONE_NUMBER_ID**: Go to Phone Numbers → Select your phone number → Copy the ID

**French Assistant Configuration:**
The French assistant IDs are hardcoded in the `trigger-call` function:
- Assistant ID: `46f8bf21-0eaa-4fab-bb1c-5bc89eff3b28`
- Phone Number ID: `2137f83a-dd61-4fea-8775-75326953a993`

If you need to change these, edit `/supabase/functions/trigger-call/index.ts` lines 60-61.

## Step 3: Deploy Database Migrations

```bash
# Push database migrations
supabase db push
```

This will create the `leads` table with the following schema:
- `id` (uuid, primary key)
- `first_name` (text)
- `last_name` (text)
- `phone_number` (text)
- `email` (text)
- `intent` (text: 'buy' or 'sell')
- `language` (text: 'english' or 'french')
- `opt_in_call` (boolean)
- `call_scheduled` (boolean)
- `call_completed` (boolean)
- `call_sid` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Step 4: Deploy Edge Functions

```bash
# Deploy both edge functions
supabase functions deploy submit-lead
supabase functions deploy trigger-call
```

## Step 5: Verify Deployment

### Test the submit-lead function:

```bash
curl -X POST \
  'https://gbskwbcuacprkwvooqer.supabase.co/functions/v1/submit-lead' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_SUPABASE_ANON_KEY' \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "email": "john@example.com",
    "intent": "buy",
    "language": "english",
    "optInCall": false
  }'
```

### Check the database:

```bash
# View recent leads
supabase db query "SELECT * FROM public.leads ORDER BY created_at DESC LIMIT 5;"
```

## Step 6: Deploy Frontend

The frontend is already configured to use the correct Supabase credentials from `.env`:
- `VITE_SUPABASE_URL=https://gbskwbcuacprkwvooqer.supabase.co`
- `VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...`

Build and deploy:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to your preferred hosting (Vercel, Netlify, etc.)
# Or use Lovable's built-in deployment
```

## How It Works

1. **User Fills Form**: User fills out the lead form on the frontend
2. **Data Saved**: Form data is sent to `submit-lead` edge function
3. **Database Insert**: Lead data is inserted into the `leads` table
4. **Automatic Call**: If `optInCall` is true, the `trigger-call` function is invoked
5. **Vapi Integration**: `trigger-call` fetches lead data and creates a Vapi call
6. **Language Selection**: Based on the `language` field, it selects the appropriate assistant
7. **Call Triggered**: Vapi calls the customer with personalized data

## Troubleshooting

### Leads not saving to database

1. Check if migrations are deployed:
   ```bash
   supabase db query "SELECT * FROM pg_tables WHERE schemaname = 'public';"
   ```

2. Check edge function logs:
   ```bash
   supabase functions logs submit-lead
   ```

3. Verify RLS policies are enabled:
   ```bash
   supabase db query "SELECT * FROM pg_policies WHERE tablename = 'leads';"
   ```

### Calls not being triggered

1. Check environment variables:
   ```bash
   supabase secrets list
   ```

2. Check trigger-call logs:
   ```bash
   supabase functions logs trigger-call
   ```

3. Verify Vapi credentials are correct in your Vapi dashboard

### CORS errors

The edge functions already include CORS headers. If you still see CORS errors:
1. Make sure you're using the correct Supabase URL
2. Check that the anon key is correct
3. Verify the edge functions are deployed

## Monitoring

### View all leads:
```bash
supabase db query "SELECT id, first_name, last_name, phone_number, email, intent, language, opt_in_call, call_scheduled, created_at FROM public.leads ORDER BY created_at DESC;"
```

### View leads with scheduled calls:
```bash
supabase db query "SELECT * FROM public.leads WHERE call_scheduled = true ORDER BY created_at DESC;"
```

### View function logs:
```bash
# Real-time logs
supabase functions logs submit-lead --follow
supabase functions logs trigger-call --follow
```

## Support

If you encounter issues:
1. Check the Supabase dashboard for function logs
2. Verify all environment variables are set
3. Ensure your Vapi account is active and has credits
4. Check that phone numbers are in E.164 format (+1234567890)

