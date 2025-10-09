# Testing Guide

This guide will help you test the complete flow to ensure data is being stored and calls are being triggered.

## Pre-requisites

Before testing, ensure:
1. ✅ Database migrations are deployed
2. ✅ Edge functions are deployed
3. ✅ Environment variables are set in Supabase
4. ✅ Frontend is running

## Step 1: Verify Database Setup

Check if the `leads` table exists:

```bash
supabase db query "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'leads';"
```

Expected output: Should show `leads` table

## Step 2: Test Edge Function Directly

Test the `submit-lead` function with curl:

```bash
curl -X POST \
  'https://gbskwbcuacprkwvooqer.supabase.co/functions/v1/submit-lead' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2t3YmN1YWNwcmt3dm9vcWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NjU4ODIsImV4cCI6MjA3NTQ0MTg4Mn0.FdDDSkSC9q95W866fudyBmv0L9w--754wYzjOswKBM0' \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "phoneNumber": "+11234567890",
    "email": "test@example.com",
    "intent": "buy",
    "language": "english",
    "optInCall": false
  }'
```

Expected response:
```json
{
  "success": true,
  "leadId": "uuid-here",
  "message": "Lead submitted successfully!"
}
```

## Step 3: Verify Data in Database

Check if the test lead was saved:

```bash
supabase db query "SELECT id, first_name, last_name, email, phone_number, intent, language, opt_in_call, call_scheduled, created_at FROM public.leads ORDER BY created_at DESC LIMIT 5;"
```

Expected output: Should show your test lead with all the details

## Step 4: Test with Frontend

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173 in your browser

3. Fill out the form with test data:
   - First Name: John
   - Last Name: Doe
   - Phone: +1234567890 (use a real number you control)
   - Email: john@example.com
   - Intent: Buy
   - Language: English
   - ☑️ Check "Yes, I want to receive a voice call"

4. Click "Submit & Get Started"

5. Check the browser console for logs

6. Verify the success message appears

## Step 5: Verify Lead in Database

```bash
supabase db query "SELECT * FROM public.leads WHERE email = 'john@example.com' ORDER BY created_at DESC LIMIT 1;"
```

Expected output:
- Should show the lead
- `opt_in_call` should be `true`
- `call_scheduled` should be `true` (if call was triggered)

## Step 6: Test Call Functionality

**IMPORTANT:** Only test this if you have:
- ✅ Valid Vapi API credentials
- ✅ A real phone number you control
- ✅ Sufficient Vapi credits

1. Fill out the form again with:
   - Your real phone number (E.164 format: +1234567890)
   - ☑️ Opt in for call

2. Submit the form

3. You should receive a call shortly

4. Check the call was logged:
   ```bash
   supabase db query "SELECT id, first_name, last_name, phone_number, call_scheduled, call_sid FROM public.leads WHERE call_scheduled = true ORDER BY created_at DESC LIMIT 5;"
   ```

## Step 7: Monitor Function Logs

Watch the logs in real-time:

```bash
# Terminal 1: Monitor submit-lead logs
supabase functions logs submit-lead --follow

# Terminal 2: Monitor trigger-call logs
supabase functions logs trigger-call --follow
```

Submit a new form entry and watch the logs for any errors.

## Step 8: Test Language Selection

Test both English and French options:

### English Test:
```bash
curl -X POST \
  'https://gbskwbcuacprkwvooqer.supabase.co/functions/v1/submit-lead' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2t3YmN1YWNwcmt3dm9vcWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NjU4ODIsImV4cCI6MjA3NTQ0MTg4Mn0.FdDDSkSC9q95W866fudyBmv0L9w--754wYzjOswKBM0' \
  -d '{
    "firstName": "English",
    "lastName": "Test",
    "phoneNumber": "+11111111111",
    "email": "english@test.com",
    "intent": "buy",
    "language": "english",
    "optInCall": true
  }'
```

### French Test:
```bash
curl -X POST \
  'https://gbskwbcuacprkwvooqer.supabase.co/functions/v1/submit-lead' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2t3YmN1YWNwcmt3dm9vcWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NjU4ODIsImV4cCI6MjA3NTQ0MTg4Mn0.FdDDSkSC9q95W866fudyBmv0L9w--754wYzjOswKBM0' \
  -d '{
    "firstName": "French",
    "lastName": "Test",
    "phoneNumber": "+22222222222",
    "email": "french@test.com",
    "intent": "sell",
    "language": "french",
    "optInCall": true
  }'
```

Check the logs to verify the correct assistant IDs are being used.

## Common Test Scenarios

### Test 1: Data Persistence ✓
- Submit form without opting in for call
- Verify lead is saved in database
- Verify `call_scheduled` is `false`

### Test 2: Call Triggering ✓
- Submit form with opt-in checked
- Verify lead is saved in database
- Verify call is triggered
- Verify `call_scheduled` is `true`
- Verify `call_sid` is populated

### Test 3: Language Routing ✓
- Submit English lead with opt-in
- Check logs show English assistant ID
- Submit French lead with opt-in
- Check logs show French assistant ID (46f8bf21-0eaa-4fab-bb1c-5bc89eff3b28)

### Test 4: Error Handling ✓
- Submit form with invalid phone number
- Verify appropriate error message
- Check logs for error details

## Troubleshooting Tests

### Test Fails: "Service not available"

**Issue**: Edge functions not deployed

**Fix**:
```bash
./deploy.sh
```

### Test Fails: "Function returned an error"

**Issue**: Environment variables not set

**Fix**:
```bash
./setup-secrets.sh
# Or manually:
supabase secrets set VAPI_API_KEY="your-key"
```

### Test Succeeds but No Data in Database

**Issue**: Database migrations not applied

**Fix**:
```bash
supabase db push
```

### Test Succeeds but No Call Received

**Issue**: Vapi credentials incorrect or phone number format wrong

**Fix**:
1. Verify secrets: `supabase secrets list`
2. Check phone number is in E.164 format (+1234567890)
3. Check Vapi dashboard for valid credentials
4. Check function logs: `supabase functions logs trigger-call`

## Success Criteria

All tests pass when:
- ✅ Leads are saved to database
- ✅ All required fields are populated
- ✅ Calls are triggered when opted in
- ✅ No calls when not opted in
- ✅ Correct assistant based on language
- ✅ No errors in function logs
- ✅ Success messages shown in UI

## View All Test Data

After testing, view all your test leads:

```bash
supabase db query "
  SELECT 
    id,
    first_name || ' ' || last_name as name,
    email,
    phone_number,
    intent,
    language,
    opt_in_call,
    call_scheduled,
    created_at
  FROM public.leads 
  ORDER BY created_at DESC;
"
```

## Clean Up Test Data

To remove test data:

```bash
# Delete all test leads (be careful!)
supabase db query "DELETE FROM public.leads WHERE email LIKE '%test.com';"

# Or delete specific test leads
supabase db query "DELETE FROM public.leads WHERE email = 'test@example.com';"
```

