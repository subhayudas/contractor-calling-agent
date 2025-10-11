# 🚀 Deploy Now - Fix Your Error

## Current Error Explanation

You're seeing this error:
```
Failed to load resource: net::ERR_FAILED
CORS policy: Response to preflight request doesn't pass access control check
```

**Why?** The Supabase Edge Functions are not deployed yet, so they don't exist on the server.

---

## 🔧 Fix It In 3 Steps

### Step 1: Apply Database Migration (If Not Done)

Go to your Supabase SQL Editor:
https://supabase.com/dashboard/project/phafibsvqaoomeamnufk/sql/new

Copy the entire contents of `APPLY_THIS_TO_SUPABASE.sql` and paste it there, then click **Run**.

**OR** use CLI:
```bash
cd "/Users/subhayudas/Desktop/contractor agent"
supabase link --project-ref phafibsvqaoomeamnufk
supabase db push
```

---

### Step 2: Deploy Edge Functions

#### Option A: Use the Deploy Script (Easiest)

```bash
cd "/Users/subhayudas/Desktop/contractor agent"
./deploy-functions.sh
```

#### Option B: Manual Commands

```bash
cd "/Users/subhayudas/Desktop/contractor agent"

# Link to your project
supabase link --project-ref phafibsvqaoomeamnufk

# Deploy submit-lead function
supabase functions deploy submit-lead --no-verify-jwt

# Deploy trigger-call function
supabase functions deploy trigger-call --no-verify-jwt
```

---

### Step 3: Set VAPI API Key

You need to get your VAPI API key from https://vapi.ai

Then run:
```bash
supabase secrets set VAPI_API_KEY="your-actual-vapi-api-key-here"
```

---

## ✅ Verify Everything Works

After deploying, your functions will be live at:
- https://phafibsvqaoomeamnufk.supabase.co/functions/v1/submit-lead
- https://phafibsvqaoomeamnufk.supabase.co/functions/v1/trigger-call

### Test Your Website

1. **Restart your dev server** (important!):
```bash
# Stop the current server (Ctrl+C or Cmd+C)
npm run dev
```

2. Open http://localhost:8084 (or whatever port shows)

3. Fill out the electrical service form

4. Click "Request Service Now"

5. ✅ Form should submit successfully!

6. Check Supabase dashboard to see the lead: https://supabase.com/dashboard/project/phafibsvqaoomeamnufk/editor

---

## 🔍 Troubleshooting

### "Supabase CLI not found"
Install it:
```bash
npm install -g supabase
```

Then login:
```bash
supabase login
```

### "Need to login"
Run:
```bash
supabase login
```

### "Project already linked"
That's fine! Continue with the deploy commands.

### "VAPI_API_KEY not set"
You need to get your API key from:
1. Go to https://vapi.ai
2. Login to your account
3. Go to Settings or API Keys section
4. Copy your API key
5. Run: `supabase secrets set VAPI_API_KEY="your-key"`

### "Function still not working"
Check the logs:
```bash
# View submit-lead logs
supabase functions logs submit-lead --tail

# View trigger-call logs
supabase functions logs trigger-call --tail
```

---

## 📋 Quick Checklist

Before testing, make sure you've done:

- [ ] ✅ Applied database migration (Step 1)
- [ ] ✅ Deployed submit-lead function
- [ ] ✅ Deployed trigger-call function
- [ ] ✅ Set VAPI_API_KEY secret
- [ ] ✅ Restarted dev server
- [ ] ✅ Tested form submission

---

## 🆘 Still Having Issues?

1. **Check function status:**
```bash
supabase functions list
```

2. **Check secrets:**
```bash
supabase secrets list
```

3. **Check database:**
Go to: https://supabase.com/dashboard/project/phafibsvqaoomeamnufk/editor
Look for the `leads` table

4. **View real-time logs:**
```bash
# In one terminal
supabase functions logs submit-lead --tail

# Try submitting the form
# You should see the logs appear
```

---

## 🎯 What Each Command Does

| Command | What It Does |
|---------|--------------|
| `supabase link` | Connects your local project to Supabase |
| `supabase db push` | Applies database migrations |
| `supabase functions deploy` | Uploads your functions to Supabase |
| `supabase secrets set` | Sets environment variables for functions |
| `--no-verify-jwt` | Allows public access (needed for forms) |

---

**After following these steps, your CORS error will be gone and everything will work!** 🎉

