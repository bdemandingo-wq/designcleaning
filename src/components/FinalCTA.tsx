import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const FinalCTA = () => {
  const { get } = useSiteContent();

  const headline = get("home_final_cta_headline", "Ready For A Cleaner Home?");
  const subhead = get(
    "home_final_cta_subhead",
    "Get your free estimate in 60 seconds, or book your cleaning right now."
  );

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{headline}</h2>
        <p className="text-primary-foreground/85 max-w-xl mx-auto mb-8">{subhead}</p>
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
            className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-6 rounded-lg bg-transparent"
            asChild
          >
            <Link to="/booking" className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Book Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
