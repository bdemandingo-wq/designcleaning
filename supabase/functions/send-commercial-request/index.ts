import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "support@tidywisecleaning.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const schema = z.object({
  company_name: z.string().min(1).max(200),
  contact_name: z.string().min(1).max(150),
  email: z.string().email().max(254),
  phone: z.string().min(7).max(30),
  address: z.string().max(300).optional().default(""),
  city: z.string().max(100).optional().default(""),
  state: z.string().max(50).optional().default(""),
  zip: z.string().max(20).optional().default(""),
  property_type: z.string().min(1).max(50),
  square_feet: z.string().max(20).optional().default(""),
  restrooms: z.string().max(20).optional().default(""),
  frequency: z.string().max(50).optional().default(""),
  preferred_time: z.string().max(50).optional().default(""),
  add_ons: z.array(z.string()).optional().default([]),
  message: z.string().max(2000).optional().default(""),
});

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const raw = await req.json();
    const parsed = schema.safeParse(raw);
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
      <h2>New Commercial Quote Request</h2>
      <p><strong>Company:</strong> ${escape(q.company_name)}</p>
      <p><strong>Contact:</strong> ${escape(q.contact_name)}</p>
      <p><strong>Email:</strong> ${escape(q.email)}</p>
      <p><strong>Phone:</strong> ${escape(q.phone)}</p>
      <p><strong>Address:</strong> ${escape(q.address)}, ${escape(q.city)}, ${escape(q.state)} ${escape(q.zip)}</p>
      <hr/>
      <p><strong>Property Type:</strong> ${escape(q.property_type)}</p>
      <p><strong>Approx. Sq Ft:</strong> ${escape(q.square_feet)}</p>
      <p><strong>Restrooms:</strong> ${escape(q.restrooms)}</p>
      <p><strong>Frequency:</strong> ${escape(q.frequency)}</p>
      <p><strong>Preferred Time:</strong> ${escape(q.preferred_time)}</p>
      <p><strong>Requested Add-ons:</strong> ${q.add_ons.length ? q.add_ons.map(escape).join(", ") : "None"}</p>
      <hr/>
      <p><strong>Special Requests / Notes:</strong></p>
      <p>${escape(q.message).replace(/\n/g, "<br/>")}</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Design Cleaning <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        reply_to: q.email,
        subject: `New Commercial Quote — ${q.company_name}`,
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
    console.error("send-commercial-request error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
