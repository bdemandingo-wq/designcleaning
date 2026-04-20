import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const schema = z.object({
  token: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  review_text: z.string().min(10).max(2000),
  customer_name: z.string().min(1).max(120).optional(),
  location: z.string().max(120).optional(),
});

/**
 * Validates token, updates pending review with rating+text.
 * Auto-approves 4★+, leaves 1–3★ as pending for admin review.
 */
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid input", details: parsed.error.flatten() }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { token, rating, review_text, customer_name, location } = parsed.data;
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    const { data: existing, error: fetchErr } = await supabase
      .from("reviews")
      .select("id,status")
      .eq("review_token", token)
      .maybeSingle();
    if (fetchErr) throw fetchErr;
    if (!existing) {
      return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (existing.status === "approved" || existing.status === "rejected") {
      return new Response(JSON.stringify({ error: "Review already submitted" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const newStatus = rating >= 4 ? "approved" : "pending";
    const update: Record<string, unknown> = {
      rating,
      review_text,
      status: newStatus,
      review_token: null, // burn the token
    };
    if (customer_name) update.customer_name = customer_name;
    if (location) update.location = location;

    const { error: updErr } = await supabase.from("reviews").update(update).eq("id", existing.id);
    if (updErr) throw updErr;

    return new Response(JSON.stringify({ status: newStatus }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("submit-review error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
