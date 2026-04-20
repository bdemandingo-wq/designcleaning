import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

/**
 * Validates a review token and returns customer name (so the form can pre-fill).
 * GET ?token=xxx
 */
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    if (!token) {
      return new Response(JSON.stringify({ valid: false, error: "Missing token" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { data, error } = await supabase
      .from("reviews")
      .select("customer_name,location,status")
      .eq("review_token", token)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      return new Response(JSON.stringify({ valid: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    return new Response(
      JSON.stringify({ valid: true, customer_name: data.customer_name, location: data.location, status: data.status }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e: any) {
    return new Response(JSON.stringify({ valid: false, error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
