import { Link } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyCallButton from "@/components/seo/StickyCallButton";
import { Helmet } from "react-helmet-async";

const faqs = [
  { category: "Services", questions: [
    { q: "What cleaning services do you offer?", a: "We offer Standard Cleaning, Deep Cleaning, Move In/Out Cleaning, Airbnb/Vacation Rental Cleaning, Upholstery Cleaning, Office Cleaning, and Post-Construction Cleaning. Each service is tailored to your specific needs." },
    { q: "What's the difference between Standard and Deep Cleaning?", a: "Standard Cleaning is your regular maintenance clean. Deep Cleaning is more thorough and includes baseboards, inside cabinets, light fixtures, and areas often missed. We recommend starting with a Deep Clean, then switching to Standard." },
    { q: "Do you bring your own cleaning supplies?", a: "Yes! Our team arrives with professional-grade, eco-friendly cleaning supplies. If you prefer specific products due to allergies, let us know." },
    { q: "Do you offer commercial cleaning?", a: "Yes! We offer office and commercial cleaning services throughout South Florida. Contact us for a custom quote." },
  ]},
  { category: "Booking & Scheduling", questions: [
    { q: "How do I book a cleaning?", a: "Book online through our website, call us at (786) 796-7445, or use our AI chat assistant. We respond within 15 minutes!" },
    { q: "Can I book same-day or next-day cleaning?", a: "For same-day or next-day bookings, call us directly at (786) 796-7445. Online bookings require at least 2 days advance notice." },
    { q: "What areas do you serve?", a: "We serve 12+ cities across South Florida including Pembroke Pines, Miramar, Coral Springs, Aventura, Doral, Boca Raton, Coral Gables, Sunrise, Davie, Homestead, Coconut Grove, and Miami Beach." },
    { q: "How long does a cleaning take?", a: "Standard cleaning for a 3-bedroom home typically takes 2-3 hours. Deep cleaning takes 4-6 hours. We'll give you an estimate when you book." },
  ]},
  { category: "Pricing & Payment", questions: [
    { q: "How much does cleaning cost?", a: "Standard cleaning starts at $120, deep cleaning from $220, and move-in/out from $280. Use our online calculator for an instant estimate!" },
    { q: "Do you offer discounts for recurring cleanings?", a: "Yes! Weekly saves 15%, bi-weekly saves 10%, and monthly saves 5%. The more you book, the more you save." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, debit cards, and digital payments. Payment is collected after the cleaning." },
    { q: "Are there any hidden fees?", a: "No hidden fees! The price we quote is the price you pay." },
  ]},
  { category: "Trust & Safety", questions: [
    { q: "Are your cleaners background-checked?", a: "Yes! Every Pleasant Cleanings professional undergoes a thorough background check and is fully insured." },
    { q: "Are you licensed and insured?", a: "Yes, Pleasant Cleanings is fully licensed, bonded, and insured." },
    { q: "What if I'm not satisfied with the cleaning?", a: "Your satisfaction is guaranteed! If you're not happy, let us know within 24 hours and we'll re-clean at no extra charge." },
  ]},
  { category: "Preparation & Pets", questions: [
    { q: "Do I need to be home during the cleaning?", a: "No! Many clients provide a key or door code. We're fully insured and bonded." },
    { q: "Do you clean homes with pets?", a: "Absolutely! We love pets. Just let us know about your furry friends when booking." },
    { q: "Do you use pet-safe cleaning products?", a: "Yes, we use eco-friendly, pet-safe products that are safe for children and animals." },
  ]},
  { category: "Cancellations", questions: [
    { q: "What is your cancellation policy?", a: "We ask for at least 24 hours notice. We understand things come up and are always flexible." },
    { q: "Can I reschedule my cleaning?", a: "Yes! Reschedule with 24 hours notice at no charge. Call (786) 796-7445 or reply to your confirmation." },
  ]},
];

const FAQ = () => {
  return (
    <>
      <Helmet>
        <title>Cleaning Service FAQ | Pleasant Cleanings - South Florida</title>
        <meta name="description" content="Find answers about Pleasant Cleanings services, pricing, booking & cancellations. Serving 12+ South Florida cities. Call (786) 796-7445." />
        <link rel="canonical" href="https://pleasantcleanings.com/faq" />
      </Helmet>
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Have questions? We've got answers.</p>
          </div>
        </section>

        <section className="py-16">
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

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">We respond within 15 minutes during business hours.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="tel:+17867967445" className="flex items-center gap-2"><Phone className="w-5 h-5" />Call (786) 796-7445</a>
              </Button>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold" asChild><Link to="/#contact">Send a Message</Link></Button>
            </div>
          </div>
        </section>
        <Footer />
        <StickyCallButton />
      </main>
    </>
  );
};

export default FAQ;
