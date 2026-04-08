import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "How much does cleaning cost in South Florida?",
    a: "Our standard cleaning starts at $120 for homes up to 750 sq ft. Deep cleaning starts at $220 and move-in/out cleaning starts at $280. Use our instant price calculator above for your exact quote based on home size and service type.",
  },
  {
    q: "Are your cleaners background-checked?",
    a: "Yes! Every Pleasant Cleanings professional undergoes a thorough background check, is fully insured, and completes our professional training program before their first assignment.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "No, many clients provide a spare key or door code. We're fully insured and bonded. You can also be home if you prefer — we'll work around you.",
  },
  {
    q: "What cleaning products do you use?",
    a: "We use eco-friendly, non-toxic cleaning products safe for children, pets, and the environment. If you have specific preferences or allergies, just let us know.",
  },
  {
    q: "What's your cancellation policy?",
    a: "We ask for at least 24 hours notice for cancellations. We understand things come up and are always flexible and understanding.",
  },
  {
    q: "Do you offer recurring cleaning discounts?",
    a: "Absolutely! Weekly service saves 15%, bi-weekly saves 10%, and monthly saves 5%. The more frequently you book, the more you save.",
  },
  {
    q: "What areas of South Florida do you serve?",
    a: "We serve 12+ cities across South Florida including Pembroke Pines, Miramar, Coral Springs, Aventura, Doral, Boca Raton, Coral Gables, Sunrise, Davie, Homestead, Coconut Grove, and Miami Beach.",
  },
  {
    q: "What's included in a deep clean vs. standard clean?",
    a: "A standard clean covers all basic cleaning — vacuuming, mopping, bathroom sanitization, kitchen cleaning, and dusting. A deep clean includes all of that PLUS baseboards, inside cabinets, light fixtures, door handles, window sills, and detailed scrubbing throughout.",
  },
];

const HomeFAQ = () => {
  return (
    <section className="py-20 bg-background">
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
          {faqs.map((faq, index) => (
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

        <div className="text-center mt-8">
          <Link to="/faq" className="text-primary font-semibold hover:underline">
            More questions? Visit our full FAQ →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
