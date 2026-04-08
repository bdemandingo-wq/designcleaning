import { Link } from "react-router-dom";
import { Phone, CheckCircle, Star, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import StickyCallButton from "@/components/seo/StickyCallButton";
import RelatedLinks from "@/components/seo/RelatedLinks";

const AirbnbCleaning = () => {
  const included = [
    "Full turnover cleaning between guests", "Fresh linens & towel setup", "Restocking essentials (toiletries, coffee, etc.)",
    "Kitchen deep clean & dish washing", "Bathroom sanitization & restocking", "Trash removal & recycling",
    "Laundry service available", "Damage & supply reporting to host", "Same-day availability for last-minute turnovers",
    "Guest-ready checklist walkthrough",
  ];

  return (
    <>
      <SEOSchema
        pageTitle="Airbnb & Vacation Rental Cleaning in South Florida | Pleasant Cleanings"
        pageDescription="Professional Airbnb turnover cleaning in Pembroke Pines & South Florida. Same-day availability, guest-ready homes, 5-star reviews. Call (786) 796-7445."
        canonicalUrl="https://pleasantcleanings.com/airbnb-cleaning"
        pageType="service"
        breadcrumbs={[
          { name: "Home", url: "https://pleasantcleanings.com" },
          { name: "Airbnb Cleaning", url: "https://pleasantcleanings.com/airbnb-cleaning" }
        ]}
      />
      <main className="min-h-screen">
        <Navbar />
        <section className="relative min-h-[60vh] flex items-center justify-center pt-16 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6">
              <Layers className="w-4 h-4" />
              <span className="text-sm font-medium">Vacation Rental Specialists</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Airbnb & Vacation Rental Cleaning in South Florida
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Keep your guests happy and your reviews at 5 stars. Pleasant Cleanings provides fast, reliable turnover cleaning for Airbnb hosts and property managers across South Florida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
                <a href="tel:+17867967445" className="flex items-center gap-2"><Phone className="w-5 h-5" />Call (786) 796-7445</a>
              </Button>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold" asChild><Link to="/#booking">Get Custom Quote</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">What's Included</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {included.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-card p-4 rounded-lg border border-border">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <Star className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="font-display text-3xl font-bold mb-4">Get Your Custom Airbnb Cleaning Quote</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">Pricing depends on property size, guest count, and turnover frequency. Contact us for a tailored package.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild><Link to="/#booking">Request Quote</Link></Button>
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
                <a href="tel:+17867967445">Call (786) 796-7445</a>
              </Button>
            </div>
          </div>
        </section>

        <RelatedLinks currentPage="/airbnb-cleaning" pageType="service" />
        <Footer />
        <StickyCallButton />
      </main>
    </>
  );
};

export default AirbnbCleaning;
