# ⚡ Electrical Contractor Agent - Setup Guide

## What's Been Done

Your website has been transformed into a professional electrical contractor service platform. Here's what has been implemented:

### 1. **Database Schema** ✅
A new migration file has been created: `supabase/migrations/20251011000000_electrical_contractor_schema.sql`

#### Database Table: `leads`
The schema includes the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `first_name` | TEXT | Customer's first name |
| `last_name` | TEXT | Customer's last name |
| `phone_number` | TEXT | Contact phone number |
| `email` | TEXT | Contact email |
| `service_type` | TEXT | Type of electrical service needed |
| `urgency` | TEXT | How soon service is needed |
| `property_type` | TEXT | Residential, commercial, or industrial |
| `address` | TEXT | Service location (optional) |
| `project_description` | TEXT | Detailed description (optional) |
| `preferred_contact_time` | TEXT | When to contact (optional) |
| `opt_in_call` | BOOLEAN | Whether customer wants AI call |
| `call_scheduled` | BOOLEAN | Call has been scheduled |
| `call_completed` | BOOLEAN | Call has been completed |
| `call_sid` | TEXT | VAPI call identifier |
| `status` | TEXT | Lead status (new, contacted, scheduled, etc.) |
| `created_at` | TIMESTAMP | When lead was created |
| `updated_at` | TIMESTAMP | Last update time |

#### Service Types Available:
- Residential Wiring
- Commercial Wiring
- Panel Upgrade
- Lighting Installation
- Electrical Repair
- Emergency Service
- EV Charger Installation
- Generator Installation
- Other

#### Urgency Levels:
- Routine
- Soon (within a week)
- Urgent (1-2 days)
- Emergency (immediate)

### 2. **Supabase Configuration** ✅
- Project ID: `phafibsvqaoomeamnufk`
- Credentials configured in `.env` file
- Environment variables set up

### 3. **VAPI Integration** ✅
- Agent ID: `123a00af-f502-4254-a15c-6718542bec65`
- Phone Number ID: `65c2cf1e-dafd-4f9f-aee0-a544d8d0421d`
- English-only (no language selection)

### 4. **Website Updates** ✅
- **Branding**: Changed to "Elite Electric" with lightning bolt (⚡)
- **Homepage**: Professional electrical contractor messaging
- **Features**: Licensed professionals, 24/7 emergency, fully insured
- **Lead Form**: Completely redesigned for electrical services

## 🚀 How to Set Up Supabase Database

### Step 1: Apply the Migration to Supabase

You have **two options** to create the database:

#### Option A: Using Supabase Dashboard (Easiest)

1. Go to your Supabase project: https://supabase.com/dashboard/project/phafibsvqaoomeamnufk

2. Click on **SQL Editor** in the left sidebar

3. Click **New Query**

4. Copy the entire contents of this file:
   ```
   supabase/migrations/20251011000000_electrical_contractor_schema.sql
   ```

5. Paste it into the SQL editor

6. Click **Run** (or press Cmd/Ctrl + Enter)

7. You should see a success message. Your database is now set up!

#### Option B: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Login to Supabase (if not already)
supabase login

# Link to your project
supabase link --project-ref phafibsvqaoomeamnufk

# Push migrations
supabase db push
```

### Step 2: Verify the Database

1. In Supabase Dashboard, go to **Table Editor**
2. You should see a `leads` table with all the columns
3. Try the **Insert row** button to manually test a record

### Step 3: Set Up VAPI Secrets in Supabase

Your Supabase functions need the VAPI API key to make calls:

1. Go to **Project Settings** → **Edge Functions** → **Secrets**

2. Add the following secret:
   - Name: `VAPI_API_KEY`
   - Value: Your VAPI API key (you need to get this from VAPI dashboard)

### Step 4: Deploy Supabase Functions

Deploy the edge functions that handle lead submission and call triggering:

```bash
# Deploy submit-lead function
supabase functions deploy submit-lead

# Deploy trigger-call function
supabase functions deploy trigger-call
```

## 🧪 Testing the Setup

### Test the Form Submission

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173 in your browser

3. Fill out the service request form with test data

4. Submit the form

5. Check Supabase Dashboard → Table Editor → `leads` to see if the record was created

### Test the VAPI Call

1. Fill out the form again
2. Check the **"Yes, I want to receive a call from an electrician"** checkbox
3. Submit the form
4. Your phone should receive a call from the AI assistant within 30 seconds

## 📋 Environment Variables

Make sure these are set in your `.env` file (already done):

```env
VITE_SUPABASE_URL=https://phafibsvqaoomeamnufk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoYWZpYnN2cWFvb21lYW1udWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxNDU4NzQsImV4cCI6MjA3NTcyMTg3NH0.Ri-1vm4PsPrHOMv_9IP_AqGVNTh7SQqXMKZP_5eS4qQ
VAPI_AGENT_ID=123a00af-f502-4254-a15c-6718542bec65
VAPI_PHONE_NUMBER_ID=65c2cf1e-dafd-4f9f-aee0-a544d8d0421d
```

## 🔍 Database Features

### Indexes for Performance
The schema includes indexes on:
- `created_at` - for sorting by date
- `status` - for filtering leads by status
- `service_type` - for filtering by service type
- `phone_number` & `email` - for quick lookups

### Statistics View
A view called `leads_stats` is available for dashboard analytics:
- Total leads
- Opted-in calls
- Completed calls
- New leads
- Emergency requests
- Breakdown by service type and date

To query it:
```sql
SELECT * FROM leads_stats WHERE date = CURRENT_DATE;
```

## 🎨 Website Features

### Homepage
- Professional electrical contractor branding
- Three key features highlighted:
  - Licensed Professionals
  - 24/7 Emergency Service
  - Fully Insured
- Eye-catching video background

### Lead Form
- Service type dropdown with 9 options
- Urgency selector (routine to emergency)
- Property type (residential/commercial/industrial)
- Optional fields: address, project description, contact time
- Opt-in for AI assistant call

## 🔐 Security

The database has Row Level Security (RLS) enabled with policies for:
- Anyone can insert leads (public form)
- Anyone can read leads (for admin features)
- Anyone can update leads (for call status updates)

**Note**: In production, you should restrict the read/update policies to authenticated users only.

## 📞 Next Steps

1. **Apply the migration** to your Supabase database (see Step 1 above)
2. **Get your VAPI API key** from https://vapi.ai and add it to Supabase secrets
3. **Deploy the Supabase functions** (see Step 4 above)
4. **Test the form** and verify everything works
5. **Customize the VAPI agent** with your electrical contractor script
6. **Update social media links** in Navbar.tsx
7. **Replace the background video** with electrical work footage (optional)
8. **Deploy to production** when ready

## 🆘 Troubleshooting

### Form submission fails
- Check that Supabase functions are deployed
- Verify environment variables are set
- Check browser console for errors

### Calls not working
- Ensure VAPI_API_KEY is set in Supabase secrets
- Verify the agent ID and phone number ID are correct in VAPI dashboard
- Check Supabase function logs for errors

### Database errors
- Ensure migration was applied successfully
- Check Table Editor to verify `leads` table exists
- Review SQL Editor for any error messages

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [VAPI Documentation](https://docs.vapi.ai)
- [React Documentation](https://react.dev)

---

**Your electrical contractor website is ready to go! Just apply the database migration and you're all set.** ⚡

