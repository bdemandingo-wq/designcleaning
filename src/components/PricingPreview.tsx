import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const PricingPreview = () => {
  const { get } = useSiteContent();

  const headline = get("home_pricing_preview_headline", "Starting at $99 for Residential Cleaning");
  const note = get(
    "home_pricing_preview_note",
    "Your final estimate depends on service type, square footage, current condition, and any add-ons. Get a transparent price in 60 seconds — no obligation."
  );

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">
            Transparent Pricing
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {headline}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            {note}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-6 rounded-lg group"
              asChild
            >
              <Link to="/pricing" className="flex items-center gap-2">
                Get Free Estimate
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-6 rounded-lg"
              asChild
            >
              <Link to="/pricing">See Full Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;
