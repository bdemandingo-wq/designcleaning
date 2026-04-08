import { Link } from "react-router-dom";
import { Phone, CheckCircle, Star, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import StickyCallButton from "@/components/seo/StickyCallButton";
import RelatedLinks from "@/components/seo/RelatedLinks";

const MoveInOutCleaning = () => {
  const included = [
    "All Deep Cleaning services", "Inside all cabinets and closets", "Inside all appliances (oven, fridge, microwave, dishwasher)",
    "Inside drawers and pantry shelves", "Light fixtures and ceiling fans", "Window sills, tracks, and blinds",
    "Baseboards and door frames", "Wall spot cleaning and switch plates", "Bathroom deep sanitization",
    "Garage sweep (if applicable)", "Patio/lanai cleaning (if applicable)", "Final walkthrough",
  ];

  return (
    <>
      <SEOSchema
        pageTitle="Move In / Move Out Cleaning in South Florida | Pleasant Cleanings"
        pageDescription="Move-out cleaning to get your full deposit back. Move-in cleaning for a fresh start. Serving Pembroke Pines & 12+ South Florida cities. Call (786) 796-7445."
        canonicalUrl="https://pleasantcleanings.com/move-in-out-cleaning"
        pageType="service"
        breadcrumbs={[
          { name: "Home", url: "https://pleasantcleanings.com" },
          { name: "Move In/Out Cleaning", url: "https://pleasantcleanings.com/move-in-out-cleaning" }
        ]}
      />
      <main className="min-h-screen">
        <Navbar />
        <section className="relative min-h-[60vh] flex items-center justify-center pt-16 bg-gradient-to-br from-secondary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full mb-6">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Get Your Deposit Back</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">Move In / Move Out Cleaning in South Florida</h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Moving is stressful enough. Let us handle the cleaning so you can focus on your move. Our thorough cleaning helps you get your deposit back and start fresh in your new home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
                <a href="tel:+17867967445" className="flex items-center gap-2"><Phone className="w-5 h-5" />Call (786) 796-7445</a>
              </Button>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold" asChild><Link to="/#booking">Get Free Quote</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">What's Included</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {included.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-card p-4 rounded-lg border border-border">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Move Cleaning Pricing</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">1-2 Bedroom</h3>
                <p className="text-3xl font-bold text-primary mb-2">$280–$350</p>
              </div>
              <div className="bg-primary/10 border-2 border-primary rounded-xl p-6 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">Most Common</div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">3 Bedroom</h3>
                <p className="text-3xl font-bold text-primary mb-2">$350–$420</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">4+ Bedroom</h3>
                <p className="text-3xl font-bold text-primary mb-2">$420–$695</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4 text-center">
            <Star className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="font-display text-3xl font-bold mb-4">Moving Soon? Book Your Cleaning Today</h2>
            <p className="text-secondary-foreground/80 mb-8 max-w-xl mx-auto">Serving Pembroke Pines and all of South Florida. Response in 15 minutes!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90" asChild><Link to="/#booking">Book Move Cleaning</Link></Button>
              <Button size="lg" className="bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90" asChild>
                <a href="tel:+17867967445">Call (786) 796-7445</a>
              </Button>
            </div>
          </div>
        </section>

        <RelatedLinks currentPage="/move-in-out-cleaning" pageType="service" />
        <Footer />
        <StickyCallButton />
      </main>
    </>
  );
};

export default MoveInOutCleaning;
