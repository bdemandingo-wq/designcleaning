import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Check } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-cleaning.jpg";

const trustItems = [
  "Trusted in your home",
  "Effortless scheduling",
  "Spotless, every time",
];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 text-white border border-white/30 mb-6">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <span className="text-sm font-medium">Now Serving Gaithersburg & Washington DC</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Come Home to Calm. Spend Your Time on What Matters.
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed mb-8">
            A quietly luxurious home cleaning service for busy lives. We handle every detail so you can breathe easier, host without worry, and reclaim your weekends.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-white/90 text-sm">
                <Check className="w-4 h-4 text-green-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base md:text-lg px-8 py-6 rounded-lg group"
              asChild
            >
              <Link to="/booking" className="flex items-center gap-2">
                Reclaim Your Weekend
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-base md:text-lg px-8 py-6 rounded-lg bg-transparent"
              asChild
            >
              <a href="#booking" className="flex items-center gap-2">
                See Your Price
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
