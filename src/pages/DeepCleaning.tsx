import { Link } from "react-router-dom";
import { Phone, CheckCircle, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import StickyCallButton from "@/components/seo/StickyCallButton";
import RelatedLinks from "@/components/seo/RelatedLinks";

const DeepCleaning = () => {
  const included = [
    "All Standard Cleaning services", "Inside oven and microwave cleaning", "Inside refrigerator cleaning",
    "Inside cabinets and drawers", "Detailed baseboard cleaning", "Door frame and door cleaning",
    "Light fixture and ceiling fan cleaning", "Window sill and blind cleaning", "Behind and under furniture",
    "Bathroom grout scrubbing", "Wall spot cleaning", "Air vent dusting",
  ];

  return (
    <>
      <SEOSchema
        pageTitle="Deep Cleaning Services in Pembroke Pines & South Florida | Pleasant Cleanings"
        pageDescription="Professional deep cleaning in Pembroke Pines & South Florida starting at $220. Baseboards, inside cabinets, appliances & more. Call (786) 796-7445."
        canonicalUrl="https://pleasantcleanings.com/deep-cleaning"
        pageType="service"
        breadcrumbs={[
          { name: "Home", url: "https://pleasantcleanings.com" },
          { name: "Deep Cleaning", url: "https://pleasantcleanings.com/deep-cleaning" }
        ]}
      />
      <main className="min-h-screen">
        <Navbar />
        <section className="relative min-h-[60vh] flex items-center justify-center pt-16 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Our Most Thorough Clean</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Deep Cleaning Services in Pembroke Pines & South Florida
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-8">
              When regular cleaning isn't enough, our deep cleaning service tackles every corner of your home. Perfect for first-time clients, seasonal refreshes, or when your home needs extra attention.
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
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">What's Included in Deep Cleaning</h2>
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
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Deep Cleaning Pricing</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">1-2 Bedroom</h3>
                <p className="text-3xl font-bold text-primary mb-2">$220–$290</p>
              </div>
              <div className="bg-primary/10 border-2 border-primary rounded-xl p-6 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">Most Popular</div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">3 Bedroom</h3>
                <p className="text-3xl font-bold text-primary mb-2">$290–$360</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">4+ Bedroom</h3>
                <p className="text-3xl font-bold text-primary mb-2">$360–$635</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <Star className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="font-display text-3xl font-bold mb-4">Ready for a Deep Clean?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">Experience the Pleasant Cleanings difference. Serving Pembroke Pines and all of South Florida.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild><Link to="/#booking">Book Deep Cleaning</Link></Button>
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
                <Link to="/blog/deep-cleaning-vs-standard-cleaning">Compare Services</Link>
              </Button>
            </div>
          </div>
        </section>

        <RelatedLinks currentPage="/deep-cleaning" pageType="service" />
        <Footer />
        <StickyCallButton />
      </main>
    </>
  );
};

export default DeepCleaning;
