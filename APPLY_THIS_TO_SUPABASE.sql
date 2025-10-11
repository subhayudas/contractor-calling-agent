-- ⚡ ELECTRICAL CONTRACTOR DATABASE SETUP
-- Copy this entire file and paste it into Supabase SQL Editor
-- Then click "Run" to create your database

-- Drop existing leads table if exists
DROP TABLE IF EXISTS public.leads CASCADE;

-- Create leads table for electrical contractor services
CREATE TABLE public.leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone_number text NOT NULL,
  email text NOT NULL,
  service_type text NOT NULL CHECK (service_type IN (
    'residential_wiring',
    'commercial_wiring',
    'panel_upgrade',
    'lighting_installation',
    'electrical_repair',
    'emergency_service',
    'ev_charger_installation',
    'generator_installation',
    'other'
  )),
  urgency text NOT NULL CHECK (urgency IN ('routine', 'soon', 'urgent', 'emergency')),
  property_type text CHECK (property_type IN ('residential', 'commercial', 'industrial')),
  address text,
  project_description text,
  preferred_contact_time text,
  opt_in_call boolean NOT NULL DEFAULT false,
  call_scheduled boolean NOT NULL DEFAULT false,
  call_completed boolean NOT NULL DEFAULT false,
  call_sid text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'in_progress', 'completed', 'cancelled')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form)
CREATE POLICY "Anyone can insert leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading leads (for admin/dashboard features)
CREATE POLICY "Anyone can read leads" 
ON public.leads 
FOR SELECT 
USING (true);

-- Create policy to allow updating leads (for call status updates)
CREATE POLICY "Anyone can update leads" 
ON public.leads 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_service_type ON public.leads(service_type);
CREATE INDEX idx_leads_phone_number ON public.leads(phone_number);
CREATE INDEX idx_leads_email ON public.leads(email);

-- Optional: Create a view for quick statistics (useful for dashboards)
CREATE OR REPLACE VIEW public.leads_stats AS
SELECT 
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE opt_in_call = true) as opted_in_calls,
  COUNT(*) FILTER (WHERE call_completed = true) as completed_calls,
  COUNT(*) FILTER (WHERE status = 'new') as new_leads,
  COUNT(*) FILTER (WHERE urgency = 'emergency') as emergency_requests,
  service_type,
  DATE(created_at) as date
FROM public.leads
GROUP BY service_type, DATE(created_at);

-- Success! Your database is ready.
-- You can verify by going to Table Editor and viewing the 'leads' table.

