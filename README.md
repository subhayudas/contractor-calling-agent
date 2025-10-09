# Vapi-Supabase Call Flow Application

> **🚀 NEW USER? START HERE:** [START_HERE.md](./START_HERE.md) - 3 commands to get running!

## Project info

**URL**: https://lovable.dev/projects/805ef9ba-dd0c-4f2b-96d4-bff03d137a65

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

## VAPI Configuration

### Assistant Prompt

The AI assistant prompt for Shaun is located in `/prompts/shaun-assistant-prompt.md`.

When configuring your VAPI assistant, use this prompt and ensure the following variables are available:
- `{{firstName}}` - Lead's first name
- `{{lastName}}` - Lead's last name
- `{{email}}` - Lead's email address
- `{{intent}}` - User's intent: "buy" or "sell"
- `{{language}}` - User's preferred language: "english" or "french"

These variables are automatically passed from the `trigger-call` Supabase Edge Function to VAPI.

## Quick Start - Deployment

**IMPORTANT: Data will NOT be saved until you deploy the Supabase Edge Functions!**

### Step 1: Deploy to Supabase

```bash
# Run the deployment script
./deploy.sh
```

### Step 2: Set up environment variables

```bash
# Run the secrets setup script
./setup-secrets.sh
```

Or manually set secrets:

```bash
supabase secrets set VAPI_API_KEY="your-vapi-api-key"
supabase secrets set VAPI_ASSISTANT_ID="your-english-assistant-id"
supabase secrets set VAPI_PHONE_NUMBER_ID="your-english-phone-number-id"
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

1. **User submits form** → Data sent to `submit-lead` Edge Function
2. **Lead saved to database** → Inserted into `public.leads` table
3. **If opted in** → `trigger-call` function invoked automatically
4. **Vapi call triggered** → Assistant calls user with personalized data
5. **Language routing** → English or French assistant based on preference

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
