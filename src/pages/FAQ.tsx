import { Link } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { useSiteContent } from "@/hooks/useSiteContent";
import { FAQ_DEFAULTS } from "@/components/HomeFAQ";

const FAQ = () => {
  const { get } = useSiteContent();
  const items = FAQ_DEFAULTS.map((d, i) => ({
    q: get(`faq_q${i + 1}`, d.q),
    a: get(`faq_a${i + 1}`, d.a),
  }));

  return (
    <>
      <Helmet>
        <title>FAQ | Design Cleaning</title>
        <meta name="description" content="Answers about Design Cleaning services, pricing, booking, insurance, and cancellations. Call (202) 935-9934." />
        <link rel="canonical" href="https://designcleaningdmv.com/faq" />
      </Helmet>
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have questions? We've got answers — straight, transparent, and to the point.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <Accordion type="single" collapsible className="space-y-3">
              {items.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card border border-border rounded-lg px-5"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-4 min-h-[44px]">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">A real person responds in 15 minutes or less during business hours.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="tel:2029359934" className="flex items-center gap-2 min-h-[48px]">
                  <Phone className="w-5 h-5" />Call (202) 935-9934
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact" className="min-h-[48px]">Send a Message</Link>
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default FAQ;
