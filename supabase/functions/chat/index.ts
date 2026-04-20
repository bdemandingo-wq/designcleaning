import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

// Restrict CORS to specific origins
const ALLOWED_ORIGINS = [
  'https://designcleaningdmv.com',
  'https://www.designcleaningdmv.com',
];

const DEV_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:8081',
];

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('Origin') || '';
  
  const isAllowed = ALLOWED_ORIGINS.includes(origin) || 
    DEV_ORIGINS.includes(origin) ||
    origin.includes('.lovable.app') ||
    origin.includes('.lovableproject.com');
  
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

// Validate chat messages schema
const messageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().max(10000),
});

const chatRequestSchema = z.object({
  messages: z.array(messageSchema).max(50),
});

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    
    // Validate input
    const parseResult = chatRequestSchema.safeParse(rawData);
    if (!parseResult.success) {
      console.error("Validation error:", parseResult.error.errors);
      return new Response(
        JSON.stringify({ error: "Invalid input data" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { messages } = parseResult.data;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: `You are a helpful AI assistant for Design Cleaning, a premium cleaning service in the DMV area. Be friendly, concise, and helpful. Answer questions about cleaning services, booking, and general inquiries.

Design Cleaning FAQ Knowledge Base:

ABOUT US:
- At Design Cleaning, we believe a truly clean space is in the details. Our mission is to provide luxury-level cleaning that leaves every surface polished, refreshed, and flawlessly maintained.
- What makes us different is our focus on precision and quality — we don't just clean surfaces, we deliver a deep, polished finish that makes every space feel refreshed and brand new.
- Owner: Design Cleaning Team

SERVICES:
- We offer residential, commercial, deep cleaning, move-in/move-out, carpet cleaning, and upholstery cleaning.
- Standard cleaning includes dusting, vacuuming, mopping, bathroom and kitchen cleaning, surface wipe-downs, and trash removal.
- We offer add-ons like carpet cleaning, window cleaning, and more.
- Every cleaning plan can be customized to fit your needs and priorities.

SUPPLIES & PRODUCTS:
- We bring all necessary supplies and equipment.
- We use high-quality, eco-friendly products and can accommodate special requests.

TEAM & QUALITY:
- All cleaners are background-checked and professionally trained.
- We are fully licensed, bonded, and insured.
- We maintain high standards through team training, quality checks, and customer feedback.

SCHEDULING & ACCESS:
- We offer flexible scheduling, including evenings and weekends.
- Cleaning time depends on the size of the space and the type of service.
- We ask for at least 24 hours' notice for cancellations or rescheduling.
- Yes, we offer emergency cleaning services.

PRICING & PAYMENT:
- All estimates are free. You can get one by phone or online.
- Rates are based on the size of the space, service type, and cleaning frequency.
- We accept credit cards and online payments.
- We offer discounted rates for weekly (15% off), bi-weekly (10% off), and monthly (5% off) cleanings.
- No contract is required.
- NEW CUSTOMER PROMO: Use code POLISH for 10% off your first cleaning!

SERVICE AREA:
- We serve the DMV area and surrounding areas including Silver Spring, Potomac, Germantown, and Bethesda Beach.

SATISFACTION & SUPPORT:
- If you're not satisfied, we'll return to re-clean the area at no extra charge.
- You can reach us by phone at (202) 935-9934, email at support@tidywisecleaning.com, or through our website.

Always be helpful, professional, and encourage users to book a cleaning or contact Design Cleaning for more details.`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    const corsHeaders = getCorsHeaders(req);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});