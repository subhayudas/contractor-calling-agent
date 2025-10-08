// @ts-ignore: Deno types
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
    const { firstName, lastName, phoneNumber, email, intent, language, optInCall } = await req.json();

    console.log('Received lead submission:', { firstName, lastName, phoneNumber, email, intent, language, optInCall });
    console.log('🔍 Language value:', language, 'Type:', typeof language);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert lead into database
    const { data: lead, error: insertError } = await supabase
      .from('leads')
      .insert({
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email: email,
        intent: intent,
        language: language,
        opt_in_call: optInCall,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting lead:', insertError);
      throw insertError;
    }

    console.log('Lead created successfully:', lead.id);

    // If user opted in for call, schedule the call after 30 seconds
    if (optInCall && lead) {
      console.log('Scheduling call for lead:', lead.id);
      
      // Schedule the call by invoking the trigger-call function after 30 seconds
      setTimeout(async () => {
        try {
          const response = await fetch(`${supabaseUrl}/functions/v1/trigger-call`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${supabaseKey}`,
            },
            body: JSON.stringify({ leadId: lead.id }),
          });

          if (!response.ok) {
            console.error('Failed to trigger call:', await response.text());
          } else {
            console.log('Call triggered successfully for lead:', lead.id);
          }
        } catch (error) {
          console.error('Error triggering call:', error);
        }
      }, 30000); // 30 seconds delay
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        leadId: lead.id,
        message: optInCall ? 'Lead submitted! You will receive a call in 30 seconds.' : 'Lead submitted successfully!' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in submit-lead function:', error);
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