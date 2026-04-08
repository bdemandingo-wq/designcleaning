import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const plans = [
  {
    name: "Monthly Plan",
    frequency: "1 clean/month",
    discount: "5% off",
    features: ["Priority scheduling", "Easy rescheduling", "Discounted rates", "Consistent cleaner preference"],
  },
  {
    name: "Biweekly Plan",
    frequency: "2 cleans/month",
    discount: "10% off",
    popular: true,
    features: ["All Monthly benefits", "Consistent cleaner", "Priority scheduling", "Discounted rates"],
  },
  {
    name: "Weekly Plan",
    frequency: "4 cleans/month",
    discount: "15% off",
    features: ["All benefits included", "Locked-in pricing", "Automated booking", "Priority support"],
  },
];

const memberFaqs = [
  { q: "Can I cancel my membership?", a: "Yes, you can cancel at any time with no cancellation fee. We ask for at least 24 hours notice before your next scheduled cleaning." },
  { q: "Can I change my plan?", a: "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle." },
  { q: "Do I get the same cleaner?", a: "We do our best to assign the same cleaner for biweekly and weekly plans to ensure consistency and familiarity with your home." },
  { q: "How do I sign up?", a: "Simply visit our booking page and select a recurring frequency. You'll automatically be enrolled in the corresponding membership tier." },
];

const MembershipPage = () => {
  return (
    <>
      <SEOSchema
        pageTitle="Membership Plans | Design Cleaning"
        pageDescription="Save money with Design Cleaning membership plans. Weekly, biweekly, or monthly cleaning with discounted rates and priority scheduling."
        canonicalUrl="https://designcleaningdmv.com/membership"
        pageType="service"
      />
      <main id="main-content" className="min-h-screen">
        <Navbar />
        <div className="pt-16">
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Cleaning Membership Plans</h1>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
                Save money and keep your home consistently clean with scheduled service.
              </p>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
                {plans.map((plan) => (
                  <Card key={plan.name} className={`shadow-sm hover:shadow-md transition-shadow ${plan.popular ? 'ring-2 ring-accent' : ''}`}>
                    <CardContent className="p-6 text-center">
                      {plan.popular && (
                        <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold mb-3">Most Popular</span>
                      )}
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm mb-1">{plan.frequency}</p>
                      <p className="text-accent font-bold text-2xl mb-6">{plan.discount}</p>
                      <ul className="space-y-3 text-left mb-6">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg" asChild>
                        <Link to="/booking">Join This Plan</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-8">Membership FAQ</h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {memberFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="bg-card border border-border rounded-lg px-5">
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4">{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default MembershipPage;
