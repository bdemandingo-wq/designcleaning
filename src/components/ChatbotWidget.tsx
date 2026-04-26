import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useServicePricing, getPriceForSqft } from "@/hooks/useServicePricing";
import { useServiceAreas } from "@/hooks/useServiceAreas";
import { useSiteContent } from "@/hooks/useSiteContent";
import { matchServiceArea } from "@/lib/travel-fee";
import { MessageCircle, X, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

/**
 * Conversational chatbot widget — guided buttons + free text for contact info.
 * Two flows: residential (instant estimate) and commercial (lead-only).
 * Pricing pulled live from service_pricing + service_areas (single source of truth).
 * Conversations and abandoned leads are persisted to Supabase.
 */

type Role = "bot" | "user";
type Message = { role: Role; text: string; options?: string[] };

type Flow = "residential" | "commercial" | null;

type ResidentialState = {
  serviceType?: string; // standard | deep | moveinout | airbnb (airbnb maps to standard pricing)
  zip?: string;
  beds?: string;
  baths?: string;
  sqft?: number;
  addOns: string[];
  name?: string;
  email?: string;
  phone?: string;
};

type CommercialState = {
  businessType?: string;
  city?: string;
  sqft?: string;
  restrooms?: string;
  frequency?: string;
  name?: string;
  email?: string;
  phone?: string;
};

const RESIDENTIAL_STEPS = [
  "service",
  "zip",
  "beds",
  "baths",
  "sqft",
  "addons",
  "name",
  "email",
  "phone",
  "estimate",
] as const;

const COMMERCIAL_STEPS = [
  "businessType",
  "city",
  "sqft",
  "restrooms",
  "frequency",
  "name",
  "email",
  "phone",
  "done",
] as const;

const RES_ADDONS = [
  { id: "fridge", label: "Inside Fridge", price: 55 },
  { id: "oven", label: "Inside Oven", price: 55 },
  { id: "windows", label: "Interior Windows", price: 12 },
  { id: "laundry", label: "Laundry", price: 40 },
  { id: "pet", label: "Pet Hair", price: 50 },
];

const ChatbotWidget = () => {
  const navigate = useNavigate();
  const { services } = useServicePricing();
  const { areas } = useServiceAreas(true);
  const { get } = useSiteContent();

  const [open, setOpen] = useState(false);
  const [flow, setFlow] = useState<Flow>(null);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [resState, setResState] = useState<ResidentialState>({ addOns: [] });
  const [comState, setComState] = useState<CommercialState>({});

  // Greeting on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      const greeting = get("chatbot_greeting", "Hi! 👋 I can get you a free estimate in under a minute. What kind of cleaning do you need?");
      setMessages([{ role: "bot", text: greeting, options: ["Residential", "Commercial / Office"] }]);
    }
  }, [open, messages.length, get]);

  const currentService = useMemo(
    () => services.find((s) => s.value === (resState.serviceType === "airbnb" ? "standard" : resState.serviceType)),
    [services, resState.serviceType]
  );

  const matchedArea = useMemo(
    () => matchServiceArea(resState.zip || comState.city || "", areas),
    [resState.zip, comState.city, areas]
  );

  const calculateEstimate = () => {
    if (!currentService) return 0;
    let price = getPriceForSqft(resState.sqft || 1500, currentService.tiers);
    price += resState.addOns.reduce((sum, id) => sum + (RES_ADDONS.find((a) => a.id === id)?.price || 0), 0);
    if (matchedArea) price += Number(matchedArea.travel_fee) || 0;
    return price;
  };

  const pushBot = (text: string, options?: string[]) =>
    setMessages((m) => [...m, { role: "bot", text, options }]);
  const pushUser = (text: string) => setMessages((m) => [...m, { role: "user", text }]);

  // Persist conversation incrementally
  const saveConversation = async (overrides: Partial<{
    flow_type: string;
    answers: Record<string, unknown>;
    estimate_amount: number | null;
    customer_name: string | null;
    customer_email: string | null;
    customer_phone: string | null;
    converted_to_booking: boolean;
    status: string;
  }> = {}) => {
    const flowType = flow || "residential";
    const answers = flow === "commercial" ? comState : resState;
    const payload: any = {
      flow_type: flowType,
      answers: answers as any,
      estimate_amount: flow === "residential" && resState.sqft ? calculateEstimate() : null,
      customer_name: (flow === "commercial" ? comState.name : resState.name) || null,
      customer_email: (flow === "commercial" ? comState.email : resState.email) || null,
      customer_phone: (flow === "commercial" ? comState.phone : resState.phone) || null,
      status: "in_progress",
      ...overrides,
    };
    if (!conversationId) {
      const { data } = await (supabase.from("chatbot_conversations") as any).insert(payload).select("id").single();
      if (data?.id) setConversationId(data.id);
      return data?.id;
    } else {
      await (supabase.from("chatbot_conversations") as any).update(payload).eq("id", conversationId);
      return conversationId;
    }
  };

  const saveAbandonedLead = async () => {
    const email = flow === "commercial" ? comState.email : resState.email;
    if (!email) return;
    const flowType = flow || "residential";
    const answers = flow === "commercial" ? comState : resState;
    await (supabase.from("abandoned_leads") as any).insert({
      conversation_id: conversationId,
      flow_type: flowType,
      customer_name: (flow === "commercial" ? comState.name : resState.name) || null,
      customer_email: email,
      customer_phone: (flow === "commercial" ? comState.phone : resState.phone) || null,
      estimate_amount: flow === "residential" && resState.sqft ? calculateEstimate() : null,
      answers: answers as any,
    });
  };

  // ============ FLOW DISPATCH ============
  const startResidential = () => {
    setFlow("residential");
    setStep(0);
    pushUser("Residential");
    pushBot("Great! What type of cleaning?", ["Standard", "Deep", "Move In/Out", "Airbnb Turnover"]);
  };

  const startCommercial = () => {
    setFlow("commercial");
    setStep(0);
    pushUser("Commercial / Office");
    pushBot("Got it. What kind of business?", ["Office", "Retail", "Other"]);
  };

  const handleResidentialAnswer = async (answer: string) => {
    pushUser(answer);
    const stepName = RESIDENTIAL_STEPS[step];
    const next = (s: ResidentialState) => {
      setResState(s);
      setStep((i) => i + 1);
    };

    switch (stepName) {
      case "service": {
        const map: Record<string, string> = {
          Standard: "standard",
          Deep: "deep",
          "Move In/Out": "moveinout",
          "Airbnb Turnover": "airbnb",
        };
        next({ ...resState, serviceType: map[answer] || "standard" });
        pushBot("What ZIP code or city is the property in?");
        break;
      }
      case "zip": {
        next({ ...resState, zip: answer });
        pushBot("How many bedrooms?", ["1", "2", "3", "4", "5+"]);
        break;
      }
      case "beds": {
        next({ ...resState, beds: answer });
        pushBot("How many bathrooms?", ["1", "1.5", "2", "2.5", "3+"]);
        break;
      }
      case "baths": {
        next({ ...resState, baths: answer });
        pushBot("About how many square feet?", ["Under 1,000", "1,000–1,500", "1,500–2,500", "2,500–3,500", "3,500+"]);
        break;
      }
      case "sqft": {
        const sqftMap: Record<string, number> = {
          "Under 1,000": 900,
          "1,000–1,500": 1300,
          "1,500–2,500": 2000,
          "2,500–3,500": 3000,
          "3,500+": 4000,
        };
        const sqft = sqftMap[answer] ?? (parseInt(answer.replace(/\D/g, ""), 10) || 1500);
        next({ ...resState, sqft });
        pushBot("Any add-ons? (tap all that apply, then 'Done')", [...RES_ADDONS.map((a) => a.label), "None", "Done"]);
        break;
      }
      case "addons": {
        if (answer === "Done" || answer === "None") {
          next({ ...resState });
          pushBot("Almost done! What's your full name?");
        } else {
          const addOn = RES_ADDONS.find((a) => a.label === answer);
          if (addOn && !resState.addOns.includes(addOn.id)) {
            const updated = { ...resState, addOns: [...resState.addOns, addOn.id] };
            setResState(updated);
            pushBot(`Added "${answer}". Any others?`, [...RES_ADDONS.filter((a) => !updated.addOns.includes(a.id)).map((a) => a.label), "Done"]);
          } else {
            pushBot("Anything else?", ["Done"]);
          }
        }
        break;
      }
    }
  };

  const handleCommercialAnswer = async (answer: string) => {
    pushUser(answer);
    const stepName = COMMERCIAL_STEPS[step];
    const next = (s: CommercialState) => {
      setComState(s);
      setStep((i) => i + 1);
    };
    switch (stepName) {
      case "businessType":
        next({ ...comState, businessType: answer });
        pushBot("What city is it in?");
        break;
      case "city":
        next({ ...comState, city: answer });
        pushBot("About how many square feet?", ["Under 1,000", "1,000–2,500", "2,500–5,000", "5,000+"]);
        break;
      case "sqft":
        next({ ...comState, sqft: answer });
        pushBot("How many restrooms / breakrooms total?", ["1", "2", "3", "4+"]);
        break;
      case "restrooms":
        next({ ...comState, restrooms: answer });
        pushBot("How often do you need cleaning?", ["Daily", "Weekly", "Bi-Weekly", "Monthly", "One-Time"]);
        break;
      case "frequency":
        next({ ...comState, frequency: answer });
        pushBot("Great. What's the best contact name?");
        break;
    }
  };

  // ============ TEXT INPUT (name/email/phone, free-text answers) ============
  const handleTextSubmit = async () => {
    const value = input.trim();
    if (!value) return;
    setInput("");
    pushUser(value);

    if (flow === "residential") {
      const stepName = RESIDENTIAL_STEPS[step];
      switch (stepName) {
        case "zip":
          setResState((s) => ({ ...s, zip: value }));
          setStep((i) => i + 1);
          pushBot("How many bedrooms?", ["1", "2", "3", "4", "5+"]);
          break;
        case "name":
          setResState((s) => ({ ...s, name: value }));
          setStep((i) => i + 1);
          pushBot("Best email to send your estimate?");
          break;
        case "email": {
          const updated = { ...resState, email: value };
          setResState(updated);
          setStep((i) => i + 1);
          await saveConversation({ customer_email: value });
          pushBot("And your phone number?");
          break;
        }
        case "phone": {
          const updated = { ...resState, phone: value };
          setResState(updated);
          setStep((i) => i + 1);
          const estimate = calculateEstimate();
          await saveConversation({
            customer_phone: value,
            estimate_amount: estimate,
            status: "estimate_shown",
          });
          pushBot(
            `Great news! Your free, all-inclusive estimate is $${estimate.toFixed(2)}.\n\nWe have openings this week — lock in your spot now and we'll handle the rest!`,
            ["Book Now — Save My Spot", "Pick a Different Date", "I need to think about it"]
          );
          break;
        }
        default:
          pushBot("Tap one of the options above to continue.");
      }
      return;
    }

    if (flow === "commercial") {
      const stepName = COMMERCIAL_STEPS[step];
      switch (stepName) {
        case "city":
          setComState((s) => ({ ...s, city: value }));
          setStep((i) => i + 1);
          pushBot("About how many square feet?", ["Under 1,000", "1,000–2,500", "2,500–5,000", "5,000+"]);
          break;
        case "name":
          setComState((s) => ({ ...s, name: value }));
          setStep((i) => i + 1);
          pushBot("Best email to send the estimate?");
          break;
        case "email": {
          setComState((s) => ({ ...s, email: value }));
          setStep((i) => i + 1);
          await saveConversation({ customer_email: value });
          pushBot("And the best phone number?");
          break;
        }
        case "phone": {
          const updated = { ...comState, phone: value };
          setComState(updated);
          setStep((i) => i + 1);
          await saveConversation({
            customer_phone: value,
            status: "lead_complete",
          });
          // Send commercial lead via existing flow
          await supabase.from("commercial_requests").insert({
            company_name: comState.businessType || "Commercial Lead",
            contact_name: comState.name || "Chatbot Lead",
            email: updated.email!,
            phone: value,
            property_type: comState.businessType || "Other",
            square_feet: comState.sqft,
            city: comState.city,
            frequency: comState.frequency,
            message: `Submitted via chatbot. Restrooms/Breakrooms: ${comState.restrooms || "—"}.`,
          });
          pushBot(
            `Thanks ${comState.name || ""}! We'll send a tailored estimate to ${updated.email} within 15 minutes. Anything else we should know?`,
            ["I'm all set", "Have someone call me"]
          );
          break;
        }
        default:
          pushBot("Tap one of the options above to continue.");
      }
    }
  };

  const handleOptionClick = async (option: string) => {
    // Initial flow choice
    if (!flow) {
      if (option === "Residential") return startResidential();
      if (option.startsWith("Commercial")) return startCommercial();
    }
    // Final CTAs
    if (option === "Book Now — Save My Spot" || option === "Pick a Different Date" || option === "Book Now") {
      pushUser(option);
      await saveConversation({ converted_to_booking: true, status: "converted" });
      navigate("/booking", {
        state: {
          sqft: resState.sqft,
          serviceType: resState.serviceType,
          totalPrice: calculateEstimate().toFixed(2),
          city: matchedArea?.name || resState.zip,
          travelFee: matchedArea?.travel_fee || 0,
        },
      });
      setOpen(false);
      return;
    }
    if (option === "I need to think about it") {
      pushUser(option);
      await saveAbandonedLead();
      pushBot(
        `No rush! We've saved your estimate of $${calculateEstimate().toFixed(2)} and will send it to ${resState.email || "your email"}. This price is valid for 7 days.\n\nWhen you're ready, you can book online anytime or call us at (202) 935-9934.`,
        ["Actually, let me book now", "Thanks, I'll decide later"]
      );
      await saveConversation({ status: "nurture" });
      return;
    }
    if (option === "Actually, let me book now") {
      pushUser(option);
      await saveConversation({ converted_to_booking: true, status: "converted" });
      navigate("/booking", {
        state: {
          sqft: resState.sqft,
          serviceType: resState.serviceType,
          totalPrice: calculateEstimate().toFixed(2),
          city: matchedArea?.name || resState.zip,
          travelFee: matchedArea?.travel_fee || 0,
        },
      });
      setOpen(false);
      return;
    }
    if (option === "Thanks, I'll decide later" || option === "I'm all set" || option === "Have someone call me") {
      pushUser(option);
      pushBot("Sounds good! Check your email for the estimate. We're here when you're ready — (202) 935-9934.");
      await saveConversation({ status: "completed" });
      return;
    }

    if (flow === "residential") return handleResidentialAnswer(option);
    if (flow === "commercial") return handleCommercialAnswer(option);
  };

  const resetChat = () => {
    setFlow(null);
    setStep(0);
    setMessages([]);
    setInput("");
    setConversationId(null);
    setResState({ addOns: [] });
    setComState({});
  };

  // Save abandoned lead when widget closes mid-conversation with email captured
  const handleClose = async () => {
    const hasEmail = (flow === "commercial" ? comState.email : resState.email);
    const wasFinal = messages.some((m) => m.text.includes("Want to book now") || m.text.includes("tailored estimate"));
    if (hasEmail && !wasFinal) {
      await saveAbandonedLead();
    } else if (hasEmail && wasFinal) {
      // Final shown but user closed without "Book Now" — also abandoned
      const lastUser = [...messages].reverse().find((m) => m.role === "user");
      if (lastUser?.text !== "Book Now") {
        await saveAbandonedLead();
      }
    }
    setOpen(false);
  };

  // Determine whether to show text input vs only options
  const lastBot = [...messages].reverse().find((m) => m.role === "bot");
  const showInput = !!flow && (!lastBot?.options || lastBot.options.length === 0);

  return (
    <div className="fixed right-3 sm:right-4 z-50 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] lg:bottom-4">
      {open && (
        <div className="mb-3 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100dvh-9rem)] lg:max-h-[calc(100dvh-5rem)] flex flex-col rounded-2xl bg-card shadow-2xl border border-border overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {flow && (
                <button onClick={resetChat} aria-label="Restart" className="text-primary-foreground/80 hover:text-primary-foreground">
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div>
                <p className="font-semibold leading-tight">Design Cleaning</p>
                <p className="text-xs text-primary-foreground/80">Replies in 15 minutes</p>
              </div>
            </div>
            <button onClick={handleClose} aria-label="Close chat" className="text-primary-foreground/80 hover:text-primary-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "bot" ? "flex justify-start" : "flex justify-end"}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    m.role === "bot"
                      ? "bg-muted text-foreground rounded-tl-sm"
                      : "bg-primary text-primary-foreground rounded-tr-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {lastBot?.options && lastBot.options.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {lastBot.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleOptionClick(opt)}
                    className="px-3 py-1.5 text-xs font-medium bg-card border border-primary/30 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {showInput && (
            <div className="border-t border-border p-3 flex gap-2 bg-background">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                placeholder="Type your answer…"
                className="flex-1 h-9 text-sm"
                aria-label="Type your message"
              />
              <Button onClick={handleTextSubmit} size="sm" className="h-9 w-9 p-0" aria-label="Send">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      <Button
        onClick={() => (open ? handleClose() : setOpen(true))}
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg hover:scale-105 transition-transform"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  );
};

export default ChatbotWidget;
