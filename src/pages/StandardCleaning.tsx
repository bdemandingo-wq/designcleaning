import { Link } from "react-router-dom";
import { Phone, CheckCircle, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import StickyCallButton from "@/components/seo/StickyCallButton";
import RelatedLinks from "@/components/seo/RelatedLinks";

const StandardCleaning = () => {
  const included = [
    "Dust all surfaces and furniture", "Vacuum all floors and carpets", "Mop hard floors",
    "Clean kitchen counters and appliance exteriors", "Sanitize bathrooms (toilet, sink, shower/tub)",
    "Clean mirrors and glass surfaces", "Make beds and tidy rooms", "Empty trash bins",
    "Wipe down light switches and door handles", "General tidying and organizing",
  ];

  return (
    <>
      <SEOSchema
        pageTitle="Standard Cleaning Services in Pembroke Pines & South Florida | Pleasant Cleanings"
        pageDescription="Affordable standard house cleaning in Pembroke Pines & South Florida. Starting at $120. Vacuuming, mopping, kitchen & bathroom cleaning. Book online or call (786) 796-7445."
        canonicalUrl="https://pleasantcleanings.com/standard-cleaning"
        pageType="service"
        breadcrumbs={[
          { name: "Home", url: "https://pleasantcleanings.com" },
          { name: "Standard Cleaning", url: "https://pleasantcleanings.com/standard-cleaning" }
        ]}
      />
      <main className="min-h-screen">
        <Navbar />
        <section className="relative min-h-[60vh] flex items-center justify-center pt-16 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Regular Maintenance Clean</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Standard Cleaning Services in Pembroke Pines & South Florida
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Keep your home consistently clean with our regular maintenance service. Perfect for homes that need ongoing upkeep to stay fresh, tidy, and welcoming for your family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
                <a href="tel:+17867967445" className="flex items-center gap-2"><Phone className="w-5 h-5" />Call (786) 796-7445</a>
              </Button>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold" asChild><Link to="/#booking">Get Free Quote</Link></Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> 2-3 Hour Service</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Up to 15% Off Recurring</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Same Cleaner Each Visit</span>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">What's Included</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
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
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Standard Cleaning Pricing</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">1-2 Bedroom</h3>
                <p className="text-3xl font-bold text-primary mb-2">$120–$190</p>
                <p className="text-sm text-muted-foreground">2-2.5 hours</p>
              </div>
              <div className="bg-primary/10 border-2 border-primary rounded-xl p-6 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">Most Common</div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">3 Bedroom</h3>
                <p className="text-3xl font-bold text-primary mb-2">$190–$260</p>
                <p className="text-sm text-muted-foreground">2.5-3 hours</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">4+ Bedroom</h3>
                <p className="text-3xl font-bold text-primary mb-2">$260–$510</p>
                <p className="text-sm text-muted-foreground">3-4 hours</p>
              </div>
            </div>
            <p className="text-center mt-8 text-muted-foreground">
              Recurring clients save up to 15%! <Link to="/#booking" className="text-primary hover:underline">Get your personalized quote.</Link>
            </p>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <Star className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="font-display text-3xl font-bold mb-4">Ready to Book a Standard Clean?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join happy South Florida homeowners who trust Pleasant Cleanings for their regular cleaning needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild><Link to="/#booking">Book Standard Cleaning</Link></Button>
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
                <a href="tel:+17867967445">Call (786) 796-7445</a>
              </Button>
            </div>
          </div>
        </section>

        <RelatedLinks currentPage="/standard-cleaning" pageType="service" />
        <Footer />
        <StickyCallButton />
      </main>
    </>
  );
};

export default StandardCleaning;
