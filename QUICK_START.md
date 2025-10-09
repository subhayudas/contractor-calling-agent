# Quick Start Guide

**Problem**: Data is not being stored in the Supabase database, and users are not receiving automatic calls.

**Solution**: Deploy the Supabase Edge Functions and configure environment variables.

## 🚀 3-Step Quick Start

### Step 1: Deploy to Supabase (2 minutes)

```bash
./deploy.sh
```

This will:
- Link your project to Supabase
- Deploy database migrations (creates `leads` table)
- Deploy both edge functions (`submit-lead` and `trigger-call`)

### Step 2: Configure Vapi Credentials (3 minutes)

```bash
./setup-secrets.sh
```

This will prompt you for:
- **VAPI_API_KEY**: Get from [Vapi Dashboard](https://dashboard.vapi.ai/) → Settings → API Keys
- **VAPI_ASSISTANT_ID**: Your English assistant ID
- **VAPI_PHONE_NUMBER_ID**: Your English phone number ID

### Step 3: Verify & Test (1 minute)

```bash
# Verify everything is set up correctly
./verify-setup.sh

# Run automated tests
./test-flow.sh
```

## ✅ That's It!

Your application is now fully configured. Data will be:
1. ✅ Saved to Supabase database
2. ✅ Trigger automatic calls when users opt-in
3. ✅ Route to correct language assistant

## 🎯 Test It Live

1. Start the app:
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173

3. Fill out the form with your phone number

4. Check "Yes, I want to receive a voice call"

5. Submit → You'll receive a call shortly!

## 📊 Verify Data is Being Stored

```bash
# View all leads in database
supabase db query "SELECT * FROM public.leads ORDER BY created_at DESC LIMIT 10;"
```

## 🔍 Monitor in Real-Time

```bash
# Watch function logs
supabase functions logs submit-lead --follow
```

## 🆘 Troubleshooting

### Issue: "Service not available" error

**Solution**: Functions not deployed
```bash
./deploy.sh
```

### Issue: "No data in database"

**Solution**: Check database migration
```bash
supabase db push
```

### Issue: "No call received"

**Solution**: Check Vapi credentials
```bash
supabase secrets list
# If missing:
./setup-secrets.sh
```

## 📖 More Information

- **Detailed Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Testing Guide**: See [TESTING.md](./TESTING.md)
- **Main README**: See [README.md](./README.md)

## 🎉 Success Indicators

You'll know everything works when:
- ✅ Form submission shows success message
- ✅ Data appears in database query
- ✅ Function logs show no errors
- ✅ You receive a call when opted in
- ✅ Browser console shows successful API calls

---

**Need help?** Check the logs:
```bash
supabase functions logs submit-lead
supabase functions logs trigger-call
```

