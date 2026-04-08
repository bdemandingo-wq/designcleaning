import { Link } from "react-router-dom";
import { CheckCircle, Phone, ArrowRight, Sparkles, Clock, Shield, Star, Sofa } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import StickyCallButton from "@/components/seo/StickyCallButton";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { Button } from "@/components/ui/button";

const UpholsteryCleaning = () => {
  const benefits = [
    "Safe cleaning for all fabric types", "Removes embedded dirt, oils, and allergens",
    "Eliminates odors from pets and spills", "Extends furniture life and appearance",
    "Eco-friendly and pet-safe solutions", "Protects and restores fabric fibers"
  ];

  const items = ["Sofas & Sectionals", "Armchairs & Recliners", "Dining Chairs", "Ottomans & Benches", "Headboards", "Outdoor Cushions"];

  return (
    <>
      <SEOSchema
        pageTitle="Upholstery Cleaning Services in South Florida | Pleasant Cleanings"
        pageDescription="Professional upholstery and furniture cleaning in Pembroke Pines & South Florida. Sofa, chair & fabric cleaning. Get a custom quote today! Call (786) 796-7445."
        canonicalUrl="https://pleasantcleanings.com/upholstery-cleaning"
        pageType="service"
        breadcrumbs={[
          { name: "Home", url: "https://pleasantcleanings.com" },
          { name: "Upholstery Cleaning", url: "https://pleasantcleanings.com/upholstery-cleaning" }
        ]}
      />
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sofa className="w-4 h-4" />Custom Furniture Care
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Upholstery Cleaning Services in South Florida</h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
                Revive your furniture with our expert upholstery cleaning service. We safely clean all fabric types throughout Pembroke Pines and South Florida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground" asChild>
                  <a href="tel:+17867967445" className="flex items-center gap-2"><Phone className="w-5 h-5" />Get Custom Quote</a>
                </Button>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold" asChild>
                  <Link to="/#booking" className="flex items-center gap-2">Request Quote Online<ArrowRight className="w-5 h-5" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">What We Clean</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-card p-4 rounded-lg border border-border">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Why Choose Professional Upholstery Cleaning?</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold mb-4">Get Your Custom Upholstery Cleaning Quote</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">Pricing depends on furniture type, fabric, and condition. Contact us for a personalized quote.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="tel:+17867967445" className="flex items-center gap-2"><Phone className="w-5 h-5" />Call (786) 796-7445</a>
              </Button>
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
                <Link to="/#booking">Request Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        <RelatedLinks currentPage="/upholstery-cleaning" pageType="service" />
        <Footer />
        <StickyCallButton />
      </main>
    </>
  );
};

export default UpholsteryCleaning;
