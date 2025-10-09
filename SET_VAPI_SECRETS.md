# 🔐 Set Your Vapi Secrets

I need your Vapi credentials to complete the setup. Please provide these 3 values:

## Where to Find These Values

Go to **https://dashboard.vapi.ai/**

### 1. VAPI_API_KEY
- Click **Settings** in the left sidebar
- Click **API Keys**
- Copy your API key (or create a new one)

### 2. VAPI_ASSISTANT_ID (English)
- Click **Assistants** in the left sidebar
- Click on your **English assistant**
- Copy the ID from the URL (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)
- Or find it in the assistant settings

### 3. VAPI_PHONE_NUMBER_ID (English)
- Click **Phone Numbers** in the left sidebar
- Click on your **phone number**
- Copy the ID from the URL or settings

---

## Run These Commands Once You Have the Values

```bash
# Replace YOUR_... with your actual values from Vapi dashboard
supabase secrets set VAPI_API_KEY="YOUR_VAPI_API_KEY_HERE"
supabase secrets set VAPI_ASSISTANT_ID="YOUR_ENGLISH_ASSISTANT_ID_HERE"
supabase secrets set VAPI_PHONE_NUMBER_ID="YOUR_PHONE_NUMBER_ID_HERE"
```

**Example:**
```bash
supabase secrets set VAPI_API_KEY="vapi_abc123xyz789"
supabase secrets set VAPI_ASSISTANT_ID="a1b2c3d4-e5f6-7890-abcd-ef1234567890"
supabase secrets set VAPI_PHONE_NUMBER_ID="f9e8d7c6-b5a4-3210-9876-543210fedcba"
```

---

## Or Reply Here

Reply to me with:
```
VAPI_API_KEY: your-api-key
VAPI_ASSISTANT_ID: your-assistant-id  
VAPI_PHONE_NUMBER_ID: your-phone-number-id
```

And I'll set them up for you!

