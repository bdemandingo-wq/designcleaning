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
    description: "Perfect for regular maintenance cleaning. We keep your home fresh and spotless on your schedule.",
    price: "From $120",
    features: ["All rooms dusted & vacuumed", "Kitchen surfaces wiped", "Bathrooms sanitized", "Floors mopped", "Trash emptied", "Mirrors cleaned"],
    addons: "Inside fridge, inside oven, laundry, interior windows",
    cta: "Book a Standard Clean",
  },
  {
    icon: Home,
    title: "Deep Cleaning",
    h1: "Deep Cleaning Services in Gaithersburg",
    description: "A thorough top-to-bottom clean for homes that need extra attention.",
    price: "From $200",
    features: ["Everything in Standard", "Baseboards & trim", "Inside cabinets & drawers", "Light switches & door handles", "Window sills", "Detailed bathroom scrub", "Behind appliances"],
    cta: "Book a Deep Clean",
  },
  {
    icon: Truck,
    title: "Move-In / Move-Out Cleaning",
    h1: "Move-In / Move-Out Cleaning in DMV (DC, Maryland & Virginia)",
    description: "Get your full deposit back or move into a spotless space.",
    price: "From $250",
    features: ["Complete top-to-bottom", "Inside all appliances", "Windows & tracks", "Inside all cabinets", "Walls spot-cleaned", "Move-in ready condition"],
    cta: "Book a Move Clean",
  },
  {
    icon: RefreshCw,
    title: "Recurring Cleaning",
    h1: "Recurring Cleaning Plans in DMV (DC, Maryland & Virginia)",
    description: "Consistent, automated cleaning on your schedule. Set it and forget it.",
    price: "Membership Pricing",
    features: ["Weekly / biweekly / monthly", "Discounted rates", "Priority scheduling", "Consistent cleaner when possible", "No need to rebook"],
    cta: "Start a Recurring Plan",
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
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Cleaning Services</h1>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
                From routine maintenance to deep cleans — we handle it all with professionalism and care.
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
