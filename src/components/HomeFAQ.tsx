import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "How do I book a cleaning?",
    a: "Booking is simple — visit our booking page, select your service, enter your home details, choose your preferred date and time, and confirm. The whole process takes under 5 minutes.",
  },
  {
    q: "How is pricing determined?",
    a: "Pricing is based on your home size, service type, and any add-ons you select. You'll see the full estimated price before you confirm — no hidden fees, no surprises.",
  },
  {
    q: "Are your cleaners background-checked?",
    a: "Yes. Every Design Cleaning professional is thoroughly background-checked, trained to our service standards, and fully insured before their first assignment.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "Not at all. Many clients provide a key or door code. We're fully insured and bonded. You're also welcome to be home if you prefer.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We ask for at least 24 hours notice for cancellations or rescheduling. We understand plans change and are always flexible.",
  },
  {
    q: "What's the difference between standard and deep cleaning?",
    a: "Standard cleaning covers all routine cleaning tasks — vacuuming, mopping, bathroom and kitchen cleaning, dusting. Deep cleaning includes all of that plus baseboards, inside cabinets, light fixtures, window sills, and detailed scrubbing throughout the home.",
  },
  {
    q: "Do you offer membership or recurring plans?",
    a: "Yes! Our membership plans offer weekly, biweekly, or monthly cleaning with discounted rates, priority scheduling, and automated booking. Visit our Membership page to learn more.",
  },
  {
    q: "What areas do you serve?",
    a: "We currently serve Gaithersburg and Washington DC. Contact us to confirm coverage for your specific address.",
  },
];

const HomeFAQ = () => {
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
