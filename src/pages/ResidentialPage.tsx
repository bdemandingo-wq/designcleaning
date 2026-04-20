import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2, Truck, BedDouble, ArrowRight, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  { icon: Sparkles, title: "Standard Cleaning", desc: "Recurring routine cleans for kitchens, baths, dusting, vacuuming, and mopping. Perfect for keeping a tidy home tidy.", price: "From $99" },
  { icon: Wand2, title: "Deep Cleaning", desc: "Top-to-bottom detailed cleaning including baseboards, light fixtures, inside cabinets, and detailed scrubbing.", price: "From $199" },
  { icon: Truck, title: "Move In / Move Out", desc: "Empty-home turnover for renters chasing their deposit or homeowners moving into a spotless new place.", price: "From $279" },
  { icon: BedDouble, title: "Airbnb Turnover", desc: "Reliable, fast changeovers with linen swaps and 5-star guest-ready presentation between every booking.", price: "From $99" },
];

const ResidentialPage = () => (
  <>
    <SEOSchema
      pageTitle="Residential Cleaning Services in the DMV | Design Cleaning"
      pageDescription="Professional residential cleaning across Gaithersburg, Rockville, Bethesda, Silver Spring, DC. Standard, deep, move-in/out, Airbnb turnover. Free estimates."
      canonicalUrl="https://designcleaningdmv.com/residential"
      pageType="service"
    />
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Residential Cleaning Services
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            Reliable home cleaning for busy households across the DMV. Pick the right clean for your space.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/pricing">Get Free Estimate</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="tel:2029359934" className="flex items-center gap-2">
                <Phone className="w-5 h-5" /> Call (202) 935-9934
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((s) => (
              <Card key={s.title} className="hover:border-primary/50 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-2">{s.title}</h2>
                  <p className="text-muted-foreground mb-4">{s.desc}</p>
                  <p className="text-primary font-bold mb-4">{s.price}</p>
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link to="/pricing" className="flex items-center justify-center gap-2">
                      Get Estimate <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Ready For A Cleaner Home?</h2>
          <p className="text-primary-foreground/85 mb-8 max-w-xl mx-auto">Get your free estimate in under a minute.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/pricing">Get Free Estimate</Link>
            </Button>
            <Button size="lg" className="border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent" asChild>
              <Link to="/booking">Book Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  </>
);

export default ResidentialPage;
