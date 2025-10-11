// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { leadId } = await req.json();

    console.log('Triggering call for lead:', leadId);

    // Get Vapi credentials for Electrical Contractor Agent
    const vapiApiKey = Deno.env.get('VAPI_API_KEY');
    const vapiAssistantId = '123a00af-f502-4254-a15c-6718542bec65'; // Electrical Contractor Agent
    const vapiPhoneNumberId = '65c2cf1e-dafd-4f9f-aee0-a544d8d0421d'; // Electrical Contractor Phone Number

    if (!vapiApiKey) {
      throw new Error('Vapi API key not configured');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get lead details from database
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single();

    if (leadError || !lead) {
      console.error('Error fetching lead:', leadError);
      throw new Error('Lead not found');
    }

    console.log('Found lead:', lead);
    console.log('📞 Using Electrical Contractor Agent');
    console.log('✅ Assistant ID:', vapiAssistantId);
    console.log('✅ Phone Number ID:', vapiPhoneNumberId);

    // Check if lead opted in for call
    if (!lead.opt_in_call) {
      console.log('Lead did not opt in for call');
      return new Response(
        JSON.stringify({ success: false, message: 'Lead did not opt in for call' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if call already scheduled
    if (lead.call_scheduled) {
      console.log('Call already scheduled for this lead');
      return new Response(
        JSON.stringify({ success: false, message: 'Call already scheduled' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Trigger Vapi call
    console.log('Calling Vapi API...');
    const vapiResponse = await fetch('https://api.vapi.ai/call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${vapiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assistantId: vapiAssistantId,
        phoneNumberId: vapiPhoneNumberId,
        customer: {
          number: lead.phone_number,
          name: `${lead.first_name} ${lead.last_name}`,
        },
        assistantOverrides: {
          variableValues: {
            firstName: lead.first_name,
            lastName: lead.last_name,
            email: lead.email,
            serviceType: lead.service_type,
            urgency: lead.urgency,
            propertyType: lead.property_type,
            address: lead.address,
            projectDescription: lead.project_description,
          }
        }
      }),
    });

    const vapiData = await vapiResponse.json();
    console.log('Vapi response:', vapiData);

    if (!vapiResponse.ok) {
      console.error('Vapi API error:', vapiData);
      throw new Error(`Vapi API error: ${JSON.stringify(vapiData)}`);
    }

    // Update lead in database
    const { error: updateError } = await supabase
      .from('leads')
      .update({
        call_scheduled: true,
        call_sid: vapiData.id || vapiData.callId,
      })
      .eq('id', leadId);

    if (updateError) {
      console.error('Error updating lead:', updateError);
      throw updateError;
    }

    console.log('Call scheduled successfully for lead:', leadId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        callId: vapiData.id || vapiData.callId,
        message: 'Call triggered successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in trigger-call function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});