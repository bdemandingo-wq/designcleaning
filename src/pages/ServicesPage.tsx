import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Sparkles, Home, Truck, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Sparkles,
    title: "Standard Cleaning",
    h1: "Standard Cleaning Services in Gaithersburg",
    description: "An effortless reset for everyday life. We keep your home feeling calm, cared for, and ready for whatever the week brings — so you don't have to.",
    price: "From $108",
    features: ["All rooms dusted & vacuumed", "Kitchen surfaces beautifully refreshed", "Bathrooms gleaming and sanitized", "Floors softly mopped", "Tidied so you can simply enjoy it", "Mirrors polished to a soft shine"],
    addons: "Inside fridge, inside oven, laundry, interior windows",
    cta: "Reclaim Your Weekend",
  },
  {
    icon: Home,
    title: "Deep Cleaning",
    h1: "Deep Cleaning Services in Gaithersburg",
    description: "An immersive, top-to-bottom transformation for the moments your home deserves a true reset. Walk back in and feel the difference instantly.",
    price: "From $208",
    features: ["Everything in Standard, elevated", "Baseboards & trim", "Inside cabinets & drawers", "Light switches & door handles", "Window sills & overlooked details", "An unhurried bathroom scrub", "Behind and beneath appliances"],
    cta: "Book a Deep Reset",
  },
  {
    icon: Truck,
    title: "Move-In / Move-Out Cleaning",
    h1: "Move-In / Move-Out Cleaning in DMV (DC, Maryland & Virginia)",
    description: "Move with peace of mind. Whether you're closing one chapter or stepping into the next, we handle every detail so the only thing you carry is excitement.",
    price: "From $283",
    features: ["A true top-to-bottom transformation", "Inside every appliance", "Windows & tracks", "Inside all cabinets", "Walls thoughtfully spot-cleaned", "Walk-in ready, stress-free"],
    cta: "Book a Stress-Free Move",
  },
  {
    icon: RefreshCw,
    title: "Recurring Cleaning",
    h1: "Recurring Cleaning Plans in DMV (DC, Maryland & Virginia)",
    description: "Quiet luxury, on repeat. A consistently beautiful home without the mental load — set it once, and let your weekends belong to you again.",
    price: "Membership Pricing",
    features: ["Weekly, biweekly, or monthly", "Member-only pricing", "Priority scheduling", "The same trusted team whenever possible", "No rebooking, no reminders"],
    cta: "Make Calm a Habit",
    ctaLink: "/membership",
  },
];

const ServicesPage = () => {
  return (
    <>
      <SEOSchema
        pageTitle="Cleaning Services | Design Cleaning"
        pageDescription="Professional cleaning services in Gaithersburg. Standard, deep, move-in/out, and recurring cleaning plans. Book online today."
        canonicalUrl="https://designcleaningdmv.com/services"
        pageType="service"
      />
      <main id="main-content" className="min-h-screen">
        <Navbar />
        <div className="pt-16">
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Cleaning, Reimagined Around Your Life</h1>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
                Thoughtful, detail-obsessed cleaning for people who'd rather spend their time living. Choose the level of care that fits your home — we'll handle the rest.
              </p>
            </div>
          </section>

          {services.map((service, index) => (
            <section key={service.title} className={`py-20 ${index % 2 === 0 ? 'bg-background' : 'bg-muted'}`}>
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{service.h1}</h2>
                  </div>
                  <p className="text-muted-foreground text-lg mb-6">{service.description}</p>
                  <p className="text-2xl font-bold text-primary mb-6">{service.price}</p>
                  
                  <Card className="shadow-sm mb-8">
                    <CardHeader><CardTitle className="font-display">What's Included</CardTitle></CardHeader>
                    <CardContent>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{f}</span>
                          </li>
                        ))}
                      </ul>
                      {service.addons && (
                        <p className="mt-4 text-sm text-muted-foreground">
                          <strong>Add-ons available:</strong> {service.addons}
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-lg" asChild>
                    <Link to={service.ctaLink || "/booking"} className="flex items-center gap-2">
                      {service.cta}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          ))}
        </div>
        <Footer />
      </main>
    </>
  );
};

export default ServicesPage;
