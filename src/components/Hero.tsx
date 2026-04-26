import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Star, Leaf, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-cleaning.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";
import HeroEstimator from "@/components/HeroEstimator";

const Hero = () => {
  const { get } = useSiteContent();

  const headline = get(
    "home_hero_headline",
    "Professional Home Cleaning in the DMV — Get Your Free Estimate in 60 Seconds."
  );
  const ctaPrimary = get("home_hero_cta_primary", "Get Free Estimate");
  const ctaSecondary = get("home_hero_cta_secondary", "Book Now");

  return (
    <section
      id="home"
      className="relative min-h-[88vh] flex items-center pt-20 md:pt-24"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 container mx-auto px-4 py-10 sm:py-14 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_minmax(0,560px)] gap-8 md:gap-10 items-center">
          {/* Left: copy */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/50 text-white border border-white/30 mb-4 sm:mb-6">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium">Serving the entire DMV region</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 sm:mb-6 break-words">
              {headline}
            </h1>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base md:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-lg group w-full sm:w-auto"
                asChild
              >
                <Link to="/pricing" className="flex items-center justify-center gap-2">
                  {ctaPrimary}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-base md:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-lg bg-transparent w-full sm:w-auto"
                asChild
              >
                <Link to="/booking" className="flex items-center justify-center">{ctaSecondary}</Link>
              </Button>
            </div>

            {/* Trust stack */}
            <div className="flex flex-wrap gap-x-4 sm:gap-x-5 gap-y-2 mt-6 sm:mt-8 text-white/80 text-xs sm:text-sm">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-400" /> Licensed & Insured</span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400" /> 5-Star Reviews</span>
              <span className="flex items-center gap-1.5"><Leaf className="w-4 h-4 text-green-400" /> Eco-Friendly Options</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-blue-400" /> Satisfaction Guarantee</span>
            </div>
          </div>

          {/* Right: instant estimator */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <HeroEstimator />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
