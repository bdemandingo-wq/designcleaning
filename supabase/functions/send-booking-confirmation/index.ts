import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const OPENPHONE_API_KEY = Deno.env.get("OPENPHONE_API_KEY");
const OPENPHONE_PHONE_NUMBER_ID = "PNr7XukuaV";
const ADMIN_PHONE_NUMBER = "+12029359934";
const PERSONAL_PHONE_NUMBER = "+18137356859";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const bookingSchema = z.object({
  customerName: z.string().min(2).max(100),
  customerEmail: z.string().email().max(254),
  customerPhone: z.string().max(20),
  address: z.string().min(5).max(500),
  beds: z.string().max(10),
  baths: z.string().max(10),
  sqft: z.number().positive().max(50000),
  frequency: z.string().max(50),
  serviceType: z.string().max(100),
  addOns: z.array(z.string().max(100)).max(20),
  totalPrice: z.string().max(20),
  preferredDate: z.string().max(50),
  specialInstructions: z.string().max(2000).optional().nullable(),
  petInfo: z.string().max(500).optional().nullable(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    const parseResult = bookingSchema.safeParse(rawData);
    if (!parseResult.success) {
      console.error("Validation error:", parseResult.error.errors);
      return new Response(
        JSON.stringify({ error: "Invalid input data" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const booking = parseResult.data;
    if (!OPENPHONE_API_KEY) throw new Error("OpenPhone API key not configured");

    // Format customer phone number
    let customerPhone = booking.customerPhone.replace(/\D/g, "");
    if (customerPhone.length === 10) {
      customerPhone = "+1" + customerPhone;
    } else if (!customerPhone.startsWith("+")) {
      customerPhone = "+" + customerPhone;
    }

    const addOnsList = booking.addOns.length > 0 ? booking.addOns.join(", ") : "None";

    // SMS to admin
    const adminSms = `New website booking!\n\nCustomer: ${booking.customerName}\nPhone: ${booking.customerPhone}\nEmail: ${booking.customerEmail}\nService: ${booking.serviceType}\nDate: ${booking.preferredDate}\nAddress: ${booking.address}\n${booking.beds} bed, ${booking.baths} bath (${booking.sqft.toLocaleString()} sq ft)\nFrequency: ${booking.frequency}\nAdd-Ons: ${addOnsList}\nTotal: $${booking.totalPrice}\n${booking.specialInstructions ? `Notes: ${booking.specialInstructions}` : ""}${booking.petInfo ? `\nPets: ${booking.petInfo}` : ""}\n\nLog in to your dashboard to view details.`;

    const adminRes = await fetch("https://api.openphone.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: OPENPHONE_API_KEY },
      body: JSON.stringify({ content: adminSms, from: OPENPHONE_PHONE_NUMBER_ID, to: [ADMIN_PHONE_NUMBER] }),
    });

    if (!adminRes.ok) {
      console.error("Admin SMS error:", await adminRes.text());
    } else {
      console.log("Admin SMS sent");
    }

    // Send to personal number
    const personalRes = await fetch("https://api.openphone.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: OPENPHONE_API_KEY },
      body: JSON.stringify({ content: adminSms, from: OPENPHONE_PHONE_NUMBER_ID, to: [PERSONAL_PHONE_NUMBER] }),
    });

    if (!personalRes.ok) {
      console.error("Personal SMS error:", await personalRes.text());
    } else {
      console.log("Personal SMS sent");
    }

    // SMS to customer
    const customerSms = `✅ Pleasant Cleanings Booking Confirmed!\n\n📅 Date: ${booking.preferredDate}\n🧽 Service: ${booking.serviceType}\n📍 Address: ${booking.address}\n🏠 ${booking.beds} bed, ${booking.baths} bath (${booking.sqft.toLocaleString()} sq ft)\n🔄 Frequency: ${booking.frequency}\n💰 Total: $${booking.totalPrice}\n\nPlease be home for the final walkthrough.\n\nThank you for choosing Pleasant Cleanings! 💙`;

    const customerRes = await fetch("https://api.openphone.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: OPENPHONE_API_KEY },
      body: JSON.stringify({ content: customerSms, from: OPENPHONE_PHONE_NUMBER_ID, to: [customerPhone] }),
    });

    if (!customerRes.ok) {
      console.error("Customer SMS error:", await customerRes.text());
    } else {
      console.log("Customer SMS sent to:", customerPhone);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Booking confirmation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
