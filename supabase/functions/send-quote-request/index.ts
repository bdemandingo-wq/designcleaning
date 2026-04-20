import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "support@tidywisecleaning.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const quoteSchema = z.object({
  frequency: z.string().min(1).max(50),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(254),
  phone: z.string().min(7).max(30),
  address: z.string().min(2).max(300),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(50),
  zip: z.string().min(3).max(20),
  squareFeet: z.string().min(1).max(20),
  bedrooms: z.string().min(1).max(10),
  bathrooms: z.string().min(1).max(10),
  currentCleanLevel: z.string().min(1).max(50),
  consentEmail: z.boolean(),
  consentSms: z.boolean(),
});

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const raw = await req.json();
    const parsed = quoteSchema.safeParse(raw);
    if (!parsed.success) {
      console.error("Validation error:", parsed.error.errors);
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const q = parsed.data;
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const html = `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${escape(q.firstName)} ${escape(q.lastName)}</p>
      <p><strong>Email:</strong> ${escape(q.email)}</p>
      <p><strong>Phone:</strong> ${escape(q.phone)}</p>
      <p><strong>Address:</strong> ${escape(q.address)}, ${escape(q.city)}, ${escape(q.state)} ${escape(q.zip)}</p>
      <hr/>
      <p><strong>Frequency:</strong> ${escape(q.frequency)}</p>
      <p><strong>Square Feet:</strong> ${escape(q.squareFeet)}</p>
      <p><strong>Bedrooms:</strong> ${escape(q.bedrooms)} | <strong>Bathrooms:</strong> ${escape(q.bathrooms)}</p>
      <p><strong>Current Level of Clean:</strong> ${escape(q.currentCleanLevel)}</p>
      <hr/>
      <p><strong>Consent Email:</strong> ${q.consentEmail ? "Yes" : "No"}</p>
      <p><strong>Consent SMS:</strong> ${q.consentSms ? "Yes" : "No"}</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Design Cleaning <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        reply_to: q.email,
        subject: `New Quote Request — ${q.firstName} ${q.lastName}`,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", errText);
      return new Response(JSON.stringify({ error: "Email send failed" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-quote-request error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
