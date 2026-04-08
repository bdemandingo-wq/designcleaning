import { Link } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const faqs = [
  { category: "Booking", questions: [
    { q: "How do I book a cleaning?", a: "Booking is simple — visit our booking page, select your service, enter your home details, choose your preferred date and time, and confirm. The whole process takes under 5 minutes." },
    { q: "How is pricing determined?", a: "Pricing is based on your home size, service type, and any add-ons you select. You'll see the full estimated price before you confirm — no hidden fees, no surprises." },
  ]},
  { category: "Trust & Safety", questions: [
    { q: "Are your cleaners background-checked?", a: "Yes. Every Design Cleaning professional is thoroughly background-checked, trained to our service standards, and fully insured before their first assignment." },
    { q: "Do I need to be home during the cleaning?", a: "Not at all. Many clients provide a key or door code. We're fully insured and bonded. You're also welcome to be home if you prefer." },
  ]},
  { category: "Services", questions: [
    { q: "What's the difference between standard and deep cleaning?", a: "Standard cleaning covers all routine cleaning tasks — vacuuming, mopping, bathroom and kitchen cleaning, dusting. Deep cleaning includes all of that plus baseboards, inside cabinets, light fixtures, window sills, and detailed scrubbing throughout the home." },
    { q: "Do you offer membership or recurring plans?", a: "Yes! Our membership plans offer weekly, biweekly, or monthly cleaning with discounted rates, priority scheduling, and automated booking. Visit our Membership page to learn more." },
  ]},
  { category: "Policies", questions: [
    { q: "What is your cancellation policy?", a: "We ask for at least 24 hours notice for cancellations or rescheduling. We understand plans change and are always flexible." },
    { q: "What areas do you serve?", a: "We serve Gaithersburg, Washington DC, Silver Spring, Rockville, Bethesda, and Germantown. Contact us to confirm coverage for your specific address." },
  ]},
];

const FAQ = () => {
  return (
    <>
      <Helmet>
        <title>FAQ | Design Cleaning</title>
        <meta name="description" content="Find answers about Design Cleaning services, pricing, booking & cancellations. Call (202) 935-9934." />
        <link rel="canonical" href="https://designcleaningdmv.com/faq" />
      </Helmet>
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Have questions? We've got answers.</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {faqs.map((cat, ci) => (
              <div key={cat.category} className="mb-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">{cat.category}</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {cat.questions.map((item, i) => (
                    <AccordionItem key={i} value={`${ci}-${i}`} className="bg-card border border-border rounded-lg px-4">
                      <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary">{item.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">We're here to help.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="tel:2029359934" className="flex items-center gap-2"><Phone className="w-5 h-5" />Call (202) 935-9934</a>
              </Button>
              <Button size="lg" variant="outline" asChild><Link to="/contact">Send a Message</Link></Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default FAQ;
