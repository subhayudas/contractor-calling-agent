# ⚡ Quick Reference

## 🚀 Start Your App
```bash
npm run dev
```
Then open: **http://localhost:5173**

---

## 📊 Check Data is Saving
```bash
supabase db remote query "SELECT * FROM leads ORDER BY created_at DESC LIMIT 5;"
```

---

## 📝 View Function Logs
```bash
# Submit-lead function
supabase functions logs submit-lead --follow

# Trigger-call function
supabase functions logs trigger-call --follow
```

---

## 🔐 Your Credentials

**Project**: wshsfrnwxcujwwmnywzx

**English**:
- Assistant: `0c0b71a0-79e4-43c8-b3b6-b41979b5c7a0`
- Phone: `5110a7d8-dd75-4724-9f3b-67f916f83469`

**French**:
- Assistant: `46f8bf21-0eaa-4fab-bb1c-5bc89eff3b28`
- Phone: `2137f83a-dd61-4fea-8775-75326953a993`

---

## 🌐 Dashboards

**Supabase**: https://supabase.com/dashboard/project/wshsfrnwxcujwwmnywzx  
**Vapi**: https://dashboard.vapi.ai/

---

## ✅ Test Flow

1. Open http://localhost:5173
2. Fill form with your phone number
3. ✅ Check "opt in for call"
4. Submit
5. Receive call! 📞

---

## 🆘 Troubleshooting

**No call received?**
```bash
supabase functions logs trigger-call
```

**Data not saving?**
```bash
supabase functions logs submit-lead
```

**Check all secrets:**
```bash
supabase secrets list
```

---

## 📖 Full Documentation

- **SETUP_COMPLETE.md** - Complete setup details
- **TESTING.md** - Testing procedures
- **DEPLOYMENT.md** - Deployment guide

