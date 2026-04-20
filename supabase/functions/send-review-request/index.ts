import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

/**
 * Cron-invoked. Finds completed bookings older than 24h with no review email sent yet.
 * For each: creates a pending review row with token, emails customer with link to /review/:token.
 */
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    // Find completed bookings that are >=24h old and not yet emailed
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("id,customer_name,customer_email,address,updated_at")
      .eq("status", "completed")
      .is("review_email_sent_at", null)
      .lte("updated_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if (error) throw error;
    if (!bookings || bookings.length === 0) {
      return new Response(JSON.stringify({ processed: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let sent = 0;
    for (const b of bookings) {
      try {
        const token = crypto.randomUUID();
        // Create pending review row to validate token later
        await supabase.from("reviews").insert({
          booking_id: b.id,
          customer_name: b.customer_name,
          location: b.address?.split(",").slice(-2, -1)[0]?.trim() || null,
          rating: 0,
          review_text: "",
          status: "pending",
          review_token: token,
        } as any);

        const reviewUrl = `https://designcleaning.lovable.app/review/${token}`;
        const html = `
          <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1f2937;">
            <h1 style="color: #1E3A5F; font-size: 22px;">How did we do, ${b.customer_name.split(" ")[0]}?</h1>
            <p>Thank you for choosing Design Cleaning. Your feedback helps us improve and helps other DMV homeowners find a service they can trust.</p>
            <p>Could you take 30 seconds to share your experience?</p>
            <p style="text-align: center; margin: 32px 0;">
              <a href="${reviewUrl}" style="background: #3B82F6; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">Leave a Review</a>
            </p>
            <p style="color: #6b7280; font-size: 14px;">Or paste this link: ${reviewUrl}</p>
            <p style="color: #6b7280; font-size: 12px; margin-top: 32px;">— The Design Cleaning Team<br/>(202) 935-9934</p>
          </div>
        `;

        if (RESEND_API_KEY) {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from: "Design Cleaning <onboarding@resend.dev>",
              to: [b.customer_email],
              subject: "How was your cleaning? Quick review request",
              html,
            }),
          });
          if (!res.ok) console.error("Resend error:", await res.text());
        }

        await supabase.from("bookings").update({ review_email_sent_at: new Date().toISOString() }).eq("id", b.id);
        sent++;
      } catch (e) {
        console.error("Review email failed for booking", b.id, e);
      }
    }

    return new Response(JSON.stringify({ processed: sent }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("send-review-request error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
