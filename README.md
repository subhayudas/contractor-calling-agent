# ⚡ Elite Electric - AI-Powered Electrical Contractor Website

> **🚀 NEW USER? START HERE:** [ELECTRICAL_CONTRACTOR_SETUP.md](./ELECTRICAL_CONTRACTOR_SETUP.md) - Complete setup guide!

## Project Overview

A professional electrical contractor website with AI-powered lead capture and automated customer calling using VAPI and Supabase.

**Supabase Project**: https://supabase.com/dashboard/project/phafibsvqaoomeamnufk

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/805ef9ba-dd0c-4f2b-96d4-bff03d137a65) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/805ef9ba-dd0c-4f2b-96d4-bff03d137a65) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## ⚡ Electrical Contractor Features

### Service Types
- Residential Wiring
- Commercial Wiring
- Panel Upgrade
- Lighting Installation
- Electrical Repair
- Emergency Service (24/7)
- EV Charger Installation
- Generator Installation

### VAPI Configuration

The AI assistant is configured with the following variables:
- `{{firstName}}` - Customer's first name
- `{{lastName}}` - Customer's last name
- `{{email}}` - Customer's email address
- `{{serviceType}}` - Type of electrical service needed
- `{{urgency}}` - Urgency level (routine, soon, urgent, emergency)
- `{{propertyType}}` - Property type (residential, commercial, industrial)
- `{{address}}` - Service location
- `{{projectDescription}}` - Detailed project description

**VAPI Agent ID**: `123a00af-f502-4254-a15c-6718542bec65`  
**Phone Number ID**: `65c2cf1e-dafd-4f9f-aee0-a544d8d0421d`

These variables are automatically passed from the `trigger-call` Supabase Edge Function to VAPI.

## Quick Start - Deployment

**IMPORTANT: Data will NOT be saved until you set up the database and deploy the Supabase Edge Functions!**

### Step 1: Set up the Database

**Easy Method**: Go to Supabase SQL Editor and run the SQL from:
```
APPLY_THIS_TO_SUPABASE.sql
```

Or use Supabase CLI:
```bash
supabase db push
```

### Step 2: Set up environment variables

Create a `.env` file (already done) with:
```env
VITE_SUPABASE_URL=https://phafibsvqaoomeamnufk.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VAPI_AGENT_ID=123a00af-f502-4254-a15c-6718542bec65
VAPI_PHONE_NUMBER_ID=65c2cf1e-dafd-4f9f-aee0-a544d8d0421d
```

### Step 3: Deploy Edge Functions

```bash
# Deploy both functions
supabase functions deploy submit-lead
supabase functions deploy trigger-call
```

Set Supabase secrets:
```bash
supabase secrets set VAPI_API_KEY="your-vapi-api-key"
```

### Step 3: Verify deployment

```bash
# Check if functions are deployed
supabase functions list

# Check if secrets are set
supabase secrets list

# View function logs
supabase functions logs submit-lead
```

### Step 4: Test the application

1. Run the frontend: `npm run dev`
2. Fill out the form at `http://localhost:5173`
3. Submit with "opt in for call" checked
4. You should receive a call within seconds!

**For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

## How It Works

1. **Customer submits form** → Service request sent to `submit-lead` Edge Function
2. **Lead saved to database** → Inserted into `public.leads` table with service details
3. **If opted in** → `trigger-call` function invoked automatically
4. **VAPI call triggered** → AI assistant calls customer with personalized data
5. **Conversation** → AI discusses electrical needs, urgency, and schedules service

## Troubleshooting

### "Data not being stored in database"

**Cause**: Edge functions not deployed or environment variables missing

**Solution**:
1. Run `./deploy.sh` to deploy functions
2. Run `./setup-secrets.sh` to configure Vapi credentials
3. Check logs: `supabase functions logs submit-lead`

### "No call received"

**Cause**: Vapi credentials not set or incorrect

**Solution**:
1. Verify secrets: `supabase secrets list`
2. Check Vapi dashboard for API key and assistant IDs
3. Ensure phone number is in E.164 format (+1234567890)
4. Check logs: `supabase functions logs trigger-call`
