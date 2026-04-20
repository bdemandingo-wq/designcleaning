import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingCalculator from "@/components/PricingCalculator";
import SEOSchema from "@/components/seo/SEOSchema";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const PricingPage = () => (
  <>
    <SEOSchema
      pageTitle="Pricing & Free Estimate | Design Cleaning DMV"
      pageDescription="Transparent pricing for residential cleaning across the DMV. Get your free estimate in 60 seconds — Standard, Deep, Move In/Out, and Recurring."
      canonicalUrl="https://designcleaningdmv.com/pricing"
      pageType="service"
    />
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Pricing & Free Estimate
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
            Transparent, upfront pricing. See your estimate in 60 seconds.
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Final price depends on service type, square footage, current condition, and add-ons.
          </p>
        </div>
      </section>

      <PricingCalculator />

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
            Have a non-standard space?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            For commercial spaces, large estates, or post-construction cleans, we provide custom quotes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild><Link to="/commercial">Request Commercial Quote</Link></Button>
            <Button variant="outline" asChild>
              <a href="tel:2029359934" className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> Call (202) 935-9934
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  </>
);

export default PricingPage;
