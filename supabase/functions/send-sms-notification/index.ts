import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const OPENPHONE_API_KEY = Deno.env.get("OPENPHONE_API_KEY");
const OPENPHONE_PHONE_NUMBER_ID = "PNr7XukuaV";
const NOTIFY_PHONE_NUMBER = "+12029359934";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface SmsNotificationRequest {
  type: "booking" | "cleaner_application" | "contact";
  data: Record<string, unknown>;
}

function formatBookingSms(data: Record<string, unknown>): string {
  return `New website booking!

Customer: ${data.customerName}
Service: ${data.serviceType} (${data.frequency})
Date: ${data.preferredDate}
Address: ${data.address}
Total: $${data.totalPrice}

Log in to your dashboard to view details.`;
}

function formatApplicationSms(data: Record<string, unknown>): string {
  const workAreas = (data.workAreas as string[])?.join(", ") || "N/A";
  return `🆕 NEW CLEANER APPLICATION!

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Experience: ${data.yearsExperience} years
Areas: ${workAreas}

Log in to your dashboard to review.`;
}

function formatContactSms(data: Record<string, unknown>): string {
  return `🆕 NEW INQUIRY!

Name: ${data.name}
Email: ${data.email}
Message: ${data.message}

Log in to your dashboard to respond.`;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!OPENPHONE_API_KEY) {
      throw new Error("OPENPHONE_API_KEY is not configured");
    }

    const { type, data }: SmsNotificationRequest = await req.json();
    console.log("Sending SMS notification for:", type);

    let message: string;
    switch (type) {
      case "booking":
        message = formatBookingSms(data);
        break;
      case "cleaner_application":
        message = formatApplicationSms(data);
        break;
      case "contact":
        message = formatContactSms(data);
        break;
      default:
        throw new Error(`Unknown notification type: ${type}`);
    }

    // Send to owner phone number
    const res = await fetch("https://api.openphone.com/v1/messages", {
      method: "POST",
      headers: {
        "Authorization": OPENPHONE_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
        from: OPENPHONE_PHONE_NUMBER_ID,
        to: [NOTIFY_PHONE_NUMBER],
      }),
    });

    const resData = await res.json();
    if (!res.ok) {
      console.error("SMS error:", res.status, resData);
    } else {
      console.log("SMS sent:", resData);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending SMS notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);