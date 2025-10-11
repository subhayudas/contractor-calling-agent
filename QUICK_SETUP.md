# ⚡ Quick Setup - 3 Steps to Launch

## Step 1️⃣: Set Up Database (2 minutes)

### Option A: Copy-Paste Method (Easiest)
1. Open: https://supabase.com/dashboard/project/phafibsvqaoomeamnufk/sql/new
2. Open file: `APPLY_THIS_TO_SUPABASE.sql`
3. Copy **entire file** contents
4. Paste into Supabase SQL Editor
5. Click **"Run"** button
6. ✅ Done! Database is ready

### Option B: CLI Method
```bash
supabase link --project-ref phafibsvqaoomeamnufk
supabase db push
```

---

## Step 2️⃣: Deploy Functions (1 minute)

```bash
# Deploy both functions
supabase functions deploy submit-lead
supabase functions deploy trigger-call

# Set VAPI API key (get from https://vapi.ai)
supabase secrets set VAPI_API_KEY="your-vapi-api-key"
```

---

## Step 3️⃣: Test It! (30 seconds)

```bash
# Start the website
npm run dev
```

1. Open: http://localhost:5173
2. Fill out the form
3. ✅ Check "Yes, I want to receive a call"
4. Click "Request Service Now"
5. 📞 You should get a call in 30 seconds!

---

## ✅ Verify Everything Works

### Check Database
1. Go to: https://supabase.com/dashboard/project/phafibsvqaoomeamnufk/editor
2. Click on `leads` table
3. You should see your form submission

### Check Functions
```bash
# View function logs
supabase functions logs submit-lead --tail
supabase functions logs trigger-call --tail
```

---

## 🔧 Your Configuration

All set and ready to use:

```env
Supabase Project: phafibsvqaoomeamnufk
Supabase URL: https://phafibsvqaoomeamnufk.supabase.co
VAPI Agent ID: 123a00af-f502-4254-a15c-6718542bec65
VAPI Phone Number ID: 65c2cf1e-dafd-4f9f-aee0-a544d8d0421d
Language: English only
```

---

## 🎯 What You Get

✅ Professional electrical contractor website  
✅ AI-powered lead capture form  
✅ Automated customer calling via VAPI  
✅ 9 electrical service types  
✅ 4 urgency levels (routine to emergency)  
✅ Complete database with analytics view  
✅ Mobile-responsive design  
✅ 24/7 emergency service option  

---

## 📚 Need More Help?

- **Full Guide**: `ELECTRICAL_CONTRACTOR_SETUP.md`
- **All Changes**: `CHANGES_MADE.md`
- **Project README**: `README.md`

---

## 🚨 Troubleshooting

### "Form submission failed"
→ Functions not deployed. Run Step 2 again.

### "No call received"
→ VAPI_API_KEY not set. Run:
```bash
supabase secrets set VAPI_API_KEY="your-key"
```

### "Table doesn't exist"
→ Migration not applied. Run Step 1 again.

---

**That's it! You're ready to go!** ⚡

Your electrical contractor website is fully configured and ready to accept leads.

