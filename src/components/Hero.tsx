import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Star, Leaf, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-cleaning.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";

const Hero = () => {
  const { get } = useSiteContent();

  const headline = get(
    "home_hero_headline",
    "Professional Home Cleaning in the DMV — Get Your Free Estimate in 60 Seconds."
  );
  const subhead = get(
    "home_hero_subhead",
    "Reliable cleaners, transparent pricing, and easy online booking across Gaithersburg, Rockville, Germantown, Silver Spring, Bethesda, Washington DC, and the surrounding DMV."
  );
  const ctaPrimary = get("home_hero_cta_primary", "Get Free Estimate");
  const ctaSecondary = get("home_hero_cta_secondary", "Book Now");

  return (
    <section
      id="home"
      className="relative min-h-[88vh] flex items-center pt-24"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 text-white border border-white/30 mb-6">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <span className="text-sm font-medium">Serving the entire DMV region</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {headline}
          </h1>

          <p className="text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed mb-8">
            {subhead}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base md:text-lg px-8 py-6 rounded-lg group"
              asChild
            >
              <Link to="/pricing" className="flex items-center gap-2">
                {ctaPrimary}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-base md:text-lg px-8 py-6 rounded-lg bg-transparent"
              asChild
            >
              <Link to="/booking">{ctaSecondary}</Link>
            </Button>
          </div>

          {/* Trust stack */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-8 text-white/80 text-sm">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-400" /> Licensed & Insured</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400" /> 5-Star Reviews</span>
            <span className="flex items-center gap-1.5"><Leaf className="w-4 h-4 text-green-400" /> Eco-Friendly Options</span>
            <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-blue-400" /> Satisfaction Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
