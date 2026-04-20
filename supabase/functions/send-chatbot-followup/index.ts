import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const ADMIN_EMAIL = "support@tidywisecleaning.com";
const FROM_EMAIL = "Design Cleaning <onboarding@resend.dev>";

interface AbandonedLead {
  id: string;
  flow_type: string;
  customer_name: string | null;
  customer_email: string;
  customer_phone: string | null;
  estimate_amount: number | null;
  answers: Record<string, unknown>;
}

const sendEmail = async (to: string, subject: string, html: string) => {
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html }),
  });
  if (!resp.ok) {
    const txt = await resp.text();
    console.error("Resend error", resp.status, txt);
    return false;
  }
  return true;
};

const buildCustomerEmail = (lead: AbandonedLead) => {
  const name = lead.customer_name?.trim() || "there";
  const estimate = lead.estimate_amount
    ? `<p style="font-size:16px;margin:16px 0;">You were looking at an estimate around <strong>$${Number(lead.estimate_amount).toFixed(2)}</strong>.</p>`
    : "";
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;padding:32px;">
      <h2 style="color:#1E3A5F;margin:0 0 16px;">Hi ${name}, want us to finish your quote?</h2>
      <p style="color:#374151;line-height:1.6;">We noticed you started a cleaning quote on Design Cleaning but didn't finish.</p>
      ${estimate}
      <p style="color:#374151;line-height:1.6;">Reply to this email or tap below — we'll lock in your spot in under 15 minutes.</p>
      <p style="margin:24px 0;">
        <a href="https://designcleaningdmv.com/booking" style="background:#3B82F6;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block;">Finish Booking</a>
      </p>
      <p style="color:#6b7280;font-size:13px;">Or call/text us at (202) 935-9934.</p>
      <p style="color:#9ca3af;font-size:12px;margin-top:32px;">Design Cleaning · Professional Home Cleaning Made Simple</p>
    </div></body></html>`;
};

const buildAdminAlert = (lead: AbandonedLead) => `
  <h3>Abandoned chatbot lead</h3>
  <p><strong>Flow:</strong> ${lead.flow_type}</p>
  <p><strong>Name:</strong> ${lead.customer_name || "—"}</p>
  <p><strong>Email:</strong> ${lead.customer_email}</p>
  <p><strong>Phone:</strong> ${lead.customer_phone || "—"}</p>
  <p><strong>Estimate:</strong> ${lead.estimate_amount ? `$${Number(lead.estimate_amount).toFixed(2)}` : "—"}</p>
  <p><strong>Answers:</strong></p>
  <pre style="background:#f5f5f5;padding:12px;border-radius:6px;font-size:12px;">${JSON.stringify(lead.answers, null, 2)}</pre>
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Find leads >= 1h old, not yet followed up, not converted
    const cutoff = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: leads, error } = await supabase
      .from("abandoned_leads")
      .select("*")
      .eq("followup_sent", false)
      .lte("created_at", cutoff)
      .limit(25);

    if (error) throw error;
    if (!leads || leads.length === 0) {
      return new Response(JSON.stringify({ processed: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let sent = 0;
    for (const lead of leads as AbandonedLead[]) {
      // Verify still not converted
      const { data: convo } = await supabase
        .from("chatbot_conversations")
        .select("converted_to_booking")
        .eq("customer_email", lead.customer_email)
        .eq("converted_to_booking", true)
        .limit(1);
      if (convo && convo.length > 0) {
        await supabase.from("abandoned_leads").update({ followup_sent: true, followup_sent_at: new Date().toISOString() }).eq("id", lead.id);
        continue;
      }

      const ok = await sendEmail(
        lead.customer_email,
        "Want us to finish your cleaning quote?",
        buildCustomerEmail(lead)
      );
      if (ok) {
        await sendEmail(ADMIN_EMAIL, `Abandoned lead followed up: ${lead.customer_email}`, buildAdminAlert(lead));
        await supabase
          .from("abandoned_leads")
          .update({ followup_sent: true, followup_sent_at: new Date().toISOString() })
          .eq("id", lead.id);
        sent += 1;
      }
    }

    return new Response(JSON.stringify({ processed: leads.length, sent }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-chatbot-followup error", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
