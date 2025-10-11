# 🚨 DO THIS NOW - 2 Steps to Fix Everything

## What I've Already Done For You ✅

1. ✅ Fixed the Supabase client configuration
2. ✅ Updated config.toml with correct project ID
3. ✅ Deployed both Edge Functions (submit-lead & trigger-call)
4. ✅ Created all necessary files and documentation

## What YOU Need to Do (5 minutes) 🎯

---

### ⚡ STEP 1: Fix Database (2 minutes)

**Go here:**
https://supabase.com/dashboard/project/phafibsvqaoomeamnufk/sql/new

**Do this:**
1. Open the file `FIX_DATABASE.sql` (in your project folder)
2. Copy the **entire contents**
3. Paste into Supabase SQL Editor
4. Click the **RUN** button
5. Wait for "Database updated successfully!" message

✅ Done! Your database now has the electrical contractor schema.

---

### ⚡ STEP 2: Set VAPI API Key (1 minute)

**Open your terminal and run:**

```bash
cd "/Users/subhayudas/Desktop/contractor agent"
supabase secrets set VAPI_API_KEY="your-vapi-api-key-from-vapi.ai"
```

**Where to get the key:**
1. Go to https://vapi.ai
2. Login
3. Go to Settings → API Keys
4. Copy your key
5. Paste it in the command above (replace `your-vapi-api-key-from-vapi.ai`)

✅ Done! Your functions can now make calls.

---

### ⚡ STEP 3: Restart & Test (1 minute)

**In your terminal:**

```bash
# Stop the current dev server (Ctrl+C or Cmd+C)

# Restart it:
npm run dev
```

**Test the website:**
1. Open http://localhost:8084 (or whatever URL shows)
2. Fill out the form
3. Click "Request Service Now"
4. ✅ Should work perfectly now!

---

## ✅ Success Checklist

After completing the steps above:

- [ ] Database has `service_type`, `urgency` columns (check in Supabase Table Editor)
- [ ] VAPI_API_KEY is set (run `supabase secrets list --project-ref phafibsvqaoomeamnufk`)
- [ ] Dev server is restarted
- [ ] Form submits without CORS errors
- [ ] Success message appears
- [ ] Lead appears in database

---

## 🆘 Quick Help

**If Step 1 fails:**
- Make sure you're logged into Supabase
- Try copying the SQL again (might have missed some)

**If Step 2 fails:**
- Make sure you're in the right directory
- Check you have the correct API key from VAPI
- The key should be a long string like `sk_live_...`

**Still having issues?**
Read `FINAL_STEPS.md` for detailed troubleshooting.

---

## 📁 Helpful Files

- `FIX_DATABASE.sql` ← Copy this to Supabase SQL Editor
- `FINAL_STEPS.md` ← Complete setup guide with troubleshooting
- `DEPLOY_NOW.md` ← Explains the deployment we just did
- `.env` ← Your environment variables (already configured)

---

**Complete these 3 steps and everything will work!** ⚡

Your electrical contractor website is 99% ready. Just need to fix the database and set the API key!

