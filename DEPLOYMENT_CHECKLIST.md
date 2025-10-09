# 📋 Deployment Checklist

Follow this checklist to deploy your Vapi-Supabase Call Flow app.

## ✅ Pre-Deployment Checklist

- [x] Database migration created (`20251007232518_83afecd7-603b-49f2-9f12-b183e9c38f75.sql`)
- [x] Frontend code complete (`LeadForm.tsx`)
- [x] Edge functions created (`submit-lead`, `trigger-call`)
- [x] Supabase CLI installed (auto-installs with `deploy.sh`)
- [x] Node modules installed

## 🚀 Deployment Steps

### Step 1: Authenticate with Supabase
```bash
□ supabase login
```
**Expected**: Browser opens, you click "Authorize"  
**Status**: ⬜ Not Done | ✅ Done

---

### Step 2: Deploy Database & Functions
```bash
□ ./deploy.sh
```
**Expected**: 
- ✅ Links to project `gbskwbcuacprkwvooqer`
- ✅ Deploys database migration
- ✅ Creates `leads` table
- ✅ Deploys `submit-lead` function
- ✅ Deploys `trigger-call` function

**Status**: ⬜ Not Done | ✅ Done

---

### Step 3: Configure Vapi Credentials
```bash
□ ./setup-secrets.sh
```

**You'll need from https://dashboard.vapi.ai/:**

| Secret | Where to Find | Status |
|--------|---------------|--------|
| `VAPI_API_KEY` | Settings → API Keys | ⬜ |
| `VAPI_ASSISTANT_ID` | Assistants → [Your Assistant] → Copy ID | ⬜ |
| `VAPI_PHONE_NUMBER_ID` | Phone Numbers → [Your Number] → Copy ID | ⬜ |

**Status**: ⬜ Not Done | ✅ Done

---

### Step 4: Verify Deployment
```bash
□ ./verify-setup.sh
```
**Expected**: All checks pass ✅  
**Status**: ⬜ Not Done | ✅ Done

---

### Step 5: Test the Application
```bash
□ npm run dev
```

Then test:
- [ ] Open http://localhost:5173
- [ ] Fill out the form
- [ ] Check "opt in for call"
- [ ] Submit form
- [ ] Verify success message appears
- [ ] Check data in database:
  ```bash
  supabase db query "SELECT * FROM leads ORDER BY created_at DESC LIMIT 1;"
  ```

**Status**: ⬜ Not Done | ✅ Done

---

### Step 6: Test Live Call (Optional)
- [ ] Use your real phone number in the form
- [ ] Check "opt in for call"
- [ ] Submit
- [ ] Wait 10-30 seconds
- [ ] Receive call from Vapi assistant ✅

**Status**: ⬜ Not Done | ✅ Done

---

## 🎯 Success Criteria

Your deployment is successful when:

- [x] ✅ Form submissions save to Supabase `leads` table
- [x] ✅ Database query returns lead data
- [x] ✅ Edge functions show in `supabase functions list`
- [x] ✅ All 3 secrets are set (`supabase secrets list`)
- [x] ✅ No errors in function logs
- [x] ✅ Calls are triggered when opted in
- [x] ✅ Correct assistant selected by language

## 📊 Monitoring Commands

### View Recent Leads
```bash
supabase db query "SELECT id, first_name, last_name, email, opt_in_call, call_scheduled FROM leads ORDER BY created_at DESC LIMIT 10;"
```

### Watch Function Logs (Real-time)
```bash
# Terminal 1
supabase functions logs submit-lead --follow

# Terminal 2
supabase functions logs trigger-call --follow
```

### Check Configuration
```bash
# List deployed functions
supabase functions list

# List environment secrets
supabase secrets list

# Check database tables
supabase db query "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
```

## 🆘 Troubleshooting

### Issue: "Command not found: supabase"
**Solution**: Run `./deploy.sh` - it auto-installs the CLI

### Issue: "Not authenticated"
**Solution**: Run `supabase login`

### Issue: "Project not linked"
**Solution**: The `deploy.sh` script does this automatically

### Issue: "No data in database"
**Solution**: 
1. Check function logs: `supabase functions logs submit-lead`
2. Verify functions deployed: `supabase functions list`
3. Check migration applied: `supabase db query "SELECT * FROM pg_tables WHERE tablename = 'leads';"`

### Issue: "No call received"
**Solution**:
1. Check secrets: `supabase secrets list`
2. Verify Vapi credentials in dashboard
3. Check phone number format: Must be E.164 (+1234567890)
4. Check logs: `supabase functions logs trigger-call`

## 📝 Estimated Time

- **Total Time**: 10-15 minutes
- **Login**: 1 minute
- **Deploy**: 3-5 minutes
- **Configure Secrets**: 3-5 minutes
- **Test**: 2-3 minutes

## 🎉 You're Done!

Once all checkboxes are ticked, your application is fully deployed and functional!

**Next Steps:**
- Test with real users
- Monitor function logs
- View lead submissions in database
- Customize assistant prompts if needed

---

**Need Help?** 
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
- Check [TESTING.md](./TESTING.md) for testing procedures
- Check [START_HERE.md](./START_HERE.md) for quick start

