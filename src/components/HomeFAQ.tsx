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
    q: "How do I book a cleaning?",
    a: "Booking takes under two minutes. Visit our booking page, choose your service, enter your home details, pick a date, and confirm. You'll see the full price up front — no calls required.",
  },
  {
    q: "How is pricing determined?",
    a: "Pricing is based on your home size, service type, and any add-ons. Everything is calculated transparently before you confirm — no hidden fees, no surprises.",
  },
  {
    q: "Are your cleaners background-checked?",
    a: "Yes. Every Design Cleaning professional is identity-verified, background-checked, trained to our standards, and fully insured before their first assignment.",
  },
  {
    q: "Are you fully insured and bonded?",
    a: "We carry comprehensive liability insurance and are bonded on every clean. If something isn't right, we make it right.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "Not at all. Most clients give us a key code or lockbox access. You're also welcome to be home — whichever you prefer.",
  },
  {
    q: "What's the difference between standard and deep cleaning?",
    a: "Standard cleaning covers routine work — vacuuming, mopping, bathroom and kitchen cleaning, dusting. Deep cleaning adds baseboards, inside cabinets, light fixtures, window sills, and detailed scrubbing throughout.",
  },
  {
    q: "Do you bring your own supplies?",
    a: "Yes. Our cleaners arrive fully equipped with professional-grade supplies and equipment. Eco-friendly products available on request — just note it in your booking.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We ask for at least 24 hours notice for cancellations or rescheduling. Plans change — we're happy to be flexible whenever possible.",
  },
  {
    q: "Do you offer membership or recurring plans?",
    a: "Yes. Weekly, biweekly, and monthly memberships unlock discounted rates, priority scheduling, and automatic booking. See our Membership page for details.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve Gaithersburg, Washington DC, Silver Spring, Rockville, Bethesda, Germantown, and the greater DMV. Not sure about your ZIP? Use the checker on our Contact page.",
  },
  {
    q: "What if I'm not satisfied with the cleaning?",
    a: "If anything isn't right, let us know within 24 hours and we'll come back to make it right at no extra cost. Your satisfaction is our standard.",
  },
  {
    q: "How do I pay?",
    a: "Payment is handled securely after the clean is complete. We accept all major credit cards. Memberships auto-charge on a schedule you control.",
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
