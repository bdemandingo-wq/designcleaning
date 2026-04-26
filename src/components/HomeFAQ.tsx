import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

// 12 admin-editable Q&A defaults. Keys: faq_q1..faq_q12 / faq_a1..faq_a12
export const FAQ_DEFAULTS: { q: string; a: string }[] = [
  {
    q: "How much does house cleaning cost in the DMV?",
    a: "Standard cleaning starts at $99, deep cleaning from $149, and move-in/out from $169. Your exact price depends on square footage, service type, and any add-ons. Get a free estimate in 60 seconds on our pricing page.",
  },
  {
    q: "How does the Free Estimate work?",
    a: "Enter your home size, choose a service, and see your price instantly — no phone call, no obligation. If the price works for you, pick a date and book. Takes under two minutes.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "Not at all. Most clients provide a key code or lockbox access. You're welcome to be home if you prefer — we're fully insured and bonded either way.",
  },
  {
    q: "Do you bring supplies and equipment?",
    a: "Yes. Our cleaners arrive fully equipped with professional-grade supplies and equipment. Eco-friendly products are available on request — just note it in your booking.",
  },
  {
    q: "Are your cleaners background-checked?",
    a: "Yes. Every Design Cleaning professional is identity-verified, background-checked, trained to our standards, and fully insured before their first assignment.",
  },
  {
    q: "What is included in Standard vs Deep Cleaning?",
    a: "Standard covers routine maintenance — dusting, vacuuming, mopping, kitchen and bathroom cleaning. Deep cleaning adds baseboards, inside cabinets, light fixtures, window sills, behind appliances, and detailed scrubbing throughout.",
  },
  {
    q: "Do you offer recurring cleaning discounts?",
    a: "Yes. Weekly plans save 15%, bi-weekly saves 10%, and monthly saves 5%. Recurring members also get priority scheduling and a consistent cleaner whenever possible.",
  },
  {
    q: "How do Move In/Out and Airbnb cleanings work?",
    a: "Move-in/out cleaning is a top-to-bottom deep clean of an empty or near-empty home — inside appliances, cabinets, windows, and more. Airbnb turnovers are fast changeovers between guests with linen service and guest-ready presentation available as add-ons.",
  },
  {
    q: "Can I add fridge, oven, windows, or laundry?",
    a: "Absolutely. We offer 13+ add-on services including inside fridge ($55), inside oven ($55), interior windows ($12/ea), laundry ($40), blinds cleaning, pet hair removal, and more. Select any during booking.",
  },
  {
    q: "Do you service offices and commercial spaces?",
    a: "Yes. We offer office cleaning, retail cleaning, and general commercial cleaning with daily, weekly, or custom schedules. Commercial is quote-based — request a free estimate on our Commercial page.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve Gaithersburg, Rockville, Bethesda, Silver Spring, Germantown, Washington DC, Arlington, Alexandria, and the greater DMV. Not sure if we cover your area? Get a free estimate and we'll confirm.",
  },
  {
    q: "What is your cancellation / rescheduling policy?",
    a: "We ask for at least 24 hours notice for cancellations or rescheduling. Plans change — we're happy to be flexible whenever possible.",
  },
];

interface Props {
  /** When true, render only the first N (default 8) for the homepage. */
  homepage?: boolean;
}

const HomeFAQ = ({ homepage = true }: Props) => {
  const { get } = useSiteContent();
  const items = FAQ_DEFAULTS.map((d, i) => ({
    q: get(`faq_q${i + 1}`, d.q),
    a: get(`faq_a${i + 1}`, d.a),
  }));
  const visible = homepage ? items.slice(0, 8) : items;

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about our cleaning services
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {visible.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-card border border-border rounded-lg px-5"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {homepage && (
          <div className="text-center mt-8">
            <Link to="/faq" className="text-primary font-semibold hover:underline">
              See all {FAQ_DEFAULTS.length} questions →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeFAQ;
