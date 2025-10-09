# 🚀 START HERE - Deploy Your Vapi Call Flow App

## Quick Deploy (3 Commands Only!)

Open your terminal in this directory and run these 3 commands:

### 1️⃣ Login to Supabase (One-time)
```bash
supabase login
```
This will open your browser. Click "Authorize" to login.

### 2️⃣ Deploy Everything
```bash
./deploy.sh
```
This will:
- ✅ Link to your Supabase project
- ✅ Deploy database (creates the `leads` table)
- ✅ Deploy both edge functions

### 3️⃣ Configure Vapi Credentials
```bash
./setup-secrets.sh
```
This will ask for 3 things from your Vapi dashboard:
- API Key
- English Assistant ID  
- English Phone Number ID

## ✅ Done! Test It

```bash
# Start the app
npm run dev

# Open http://localhost:5173
# Fill the form and check "opt in for call"
# Submit → You'll get a call!
```

## Verify Everything is Working

```bash
# Check if data is being saved
supabase db query "SELECT * FROM public.leads ORDER BY created_at DESC LIMIT 5;"
```

---

## 🆘 Need Help?

### If you don't have Supabase CLI installed:

The `deploy.sh` script will auto-install it. Or install manually:

```bash
# For macOS
brew install supabase/tap/supabase

# Or download directly
mkdir -p ~/.local/bin
curl -L https://github.com/supabase/cli/releases/latest/download/supabase_darwin_arm64.tar.gz -o /tmp/supabase.tar.gz
tar -xzf /tmp/supabase.tar.gz -C ~/.local/bin
export PATH="$HOME/.local/bin:$PATH"
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
```

### Get Your Vapi Credentials:

1. Go to https://dashboard.vapi.ai/
2. **API Key**: Settings → API Keys → Create or copy existing
3. **Assistant ID**: Assistants → Click your English assistant → Copy ID from URL
4. **Phone Number ID**: Phone Numbers → Click your number → Copy ID

---

## That's It! 🎉

After running those 3 commands, your app will:
- ✅ Save all form submissions to Supabase
- ✅ Trigger automatic calls to users who opt-in
- ✅ Route to English/French assistants based on language

**Questions?** Read:
- `QUICK_START.md` - Quick reference
- `DEPLOYMENT.md` - Detailed guide
- `TESTING.md` - How to test
- `SOLUTION_SUMMARY.md` - What was fixed

