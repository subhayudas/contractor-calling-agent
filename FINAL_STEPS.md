# ✅ Final Steps - Complete Your Setup

## Current Status

✅ **Supabase Functions Deployed**
- `submit-lead` - ACTIVE
- `trigger-call` - ACTIVE

⚠️ **Need to Complete:**
1. Fix the database table (old schema exists)
2. Set VAPI API key

---

## Step 1: Fix Database Table (2 minutes)

The old real estate table exists. We need to replace it with the electrical contractor schema.

### Option A: Use Supabase SQL Editor (Recommended)

1. **Open SQL Editor:**
   https://supabase.com/dashboard/project/phafibsvqaoomeamnufk/sql/new

2. **Copy the SQL:**
   Open file: `FIX_DATABASE.sql`
   Copy the **entire contents**

3. **Paste and Run:**
   - Paste into the SQL editor
   - Click **"Run"** button
   - You should see: "Database updated successfully!"

4. **Verify:**
   Go to Table Editor: https://supabase.com/dashboard/project/phafibsvqaoomeamnufk/editor
   - Look for `leads` table
   - It should have columns like `service_type`, `urgency`, `property_type`

---

## Step 2: Set VAPI API Key (1 minute)

Your functions need the VAPI API key to make calls.

### Get Your VAPI API Key

1. Go to https://vapi.ai
2. Login to your account
3. Navigate to Settings → API Keys
4. Copy your API key

### Set the Secret

```bash
cd "/Users/subhayudas/Desktop/contractor agent"
supabase secrets set VAPI_API_KEY="paste-your-actual-api-key-here"
```

Replace `paste-your-actual-api-key-here` with your actual key from VAPI.

---

## Step 3: Test Everything (1 minute)

### Restart Your Dev Server

**Important:** Restart to pick up all changes

```bash
# Stop current server (Ctrl+C or Cmd+C in terminal)

# Then start again:
cd "/Users/subhayudas/Desktop/contractor agent"
npm run dev
```

### Test the Form

1. Open your browser to the URL shown (probably http://localhost:8084)

2. Fill out the electrical service request form:
   - First Name: Test
   - Last Name: User  
   - Phone: +1234567890 (use your real number if testing calls)
   - Email: test@example.com
   - Service Type: Electrical Repair
   - Urgency: Routine
   - Property Type: Residential

3. **Optional:** Check "Yes, I want to receive a call" if you want to test the AI calling

4. Click **"Request Service Now"**

5. ✅ You should see: "Thank you! We've received your request..."

### Verify in Database

1. Go to: https://supabase.com/dashboard/project/phafibsvqaoomeamnufk/editor

2. Click on `leads` table

3. You should see your test submission with all the electrical contractor fields!

---

## 🎉 Success Indicators

After completing all steps, you should see:

✅ **Form submits without errors**
✅ **No CORS errors in console**
✅ **Success message appears**
✅ **Lead appears in database**
✅ **Optional: Phone call received (if opted in)**

---

## 🔍 Check Function Logs (Optional)

Want to see what's happening behind the scenes?

```bash
# Terminal 1: Watch submit-lead logs
supabase functions logs submit-lead --tail --project-ref phafibsvqaoomeamnufk

# Terminal 2: Watch trigger-call logs (if testing calls)
supabase functions logs trigger-call --tail --project-ref phafibsvqaoomeamnufk
```

Then submit a form and watch the logs appear in real-time!

---

## 🚨 Troubleshooting

### Still Getting CORS Error?

**Clear browser cache and hard reload:**
- Chrome/Edge: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Firefox: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

**Verify functions are deployed:**
```bash
supabase functions list --project-ref phafibsvqaoomeamnufk
```

Both should show STATUS: ACTIVE

### "Table doesn't exist" Error

Run the `FIX_DATABASE.sql` in Supabase SQL Editor (Step 1)

### "VAPI credentials not configured" Error

You haven't set the VAPI_API_KEY. Run Step 2.

### Form Submits But No Call Received

1. Check if VAPI_API_KEY is set:
```bash
supabase secrets list --project-ref phafibsvqaoomeamnufk
```
Should show `VAPI_API_KEY` in the list

2. Check trigger-call logs:
```bash
supabase functions logs trigger-call --project-ref phafibsvqaoomeamnufk
```

3. Verify your VAPI agent is configured:
   - Go to https://vapi.ai
   - Check that agent `123a00af-f502-4254-a15c-6718542bec65` exists
   - Check that phone number `65c2cf1e-dafd-4f9f-aee0-a544d8d0421d` exists

### Database Shows Old Columns (intent, language)

The old table wasn't replaced. Run `FIX_DATABASE.sql` again in SQL Editor.

---

## 📊 Your Configuration Summary

```
Project ID: phafibsvqaoomeamnufk
Supabase URL: https://phafibsvqaoomeamnufk.supabase.co

Functions:
  ✅ submit-lead (ACTIVE)
  ✅ trigger-call (ACTIVE)

VAPI:
  Agent ID: 123a00af-f502-4254-a15c-6718542bec65
  Phone Number ID: 65c2cf1e-dafd-4f9f-aee0-a544d8d0421d
  
Database Table: leads
  Fields: service_type, urgency, property_type, address, etc.
```

---

## 📋 Quick Command Reference

```bash
# Check functions status
supabase functions list --project-ref phafibsvqaoomeamnufk

# Check secrets
supabase secrets list --project-ref phafibsvqaoomeamnufk

# Set VAPI key
supabase secrets set VAPI_API_KEY="your-key"

# View logs
supabase functions logs submit-lead --tail --project-ref phafibsvqaoomeamnufk

# Restart dev server
npm run dev
```

---

## 🎯 Next Steps After Testing

Once everything works:

1. **Customize VAPI Agent Script**
   - Login to https://vapi.ai
   - Update your agent with electrical contractor conversation flow
   - Test the variables: firstName, serviceType, urgency, etc.

2. **Update Branding**
   - Change "Elite Electric" to your business name in `Navbar.tsx`
   - Update social media links in `Navbar.tsx`
   - Replace background video (optional)

3. **Deploy to Production**
   - Use Vercel, Netlify, or your hosting service
   - Ensure environment variables are set in production

4. **Set Up Analytics** (Optional)
   - Add Google Analytics
   - Track form submissions
   - Monitor conversion rates

---

**Complete Step 1 and Step 2 above, then test. Your electrical contractor website will be fully functional!** ⚡

