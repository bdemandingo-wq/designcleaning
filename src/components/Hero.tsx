import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Shield, Star, Leaf, Lock } from "lucide-react";
import HeroEstimator from "./HeroEstimator";

const trustPills = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Star, label: "5-Star Rated" },
  { icon: Leaf, label: "Eco-Friendly Products" },
  { icon: Lock, label: "Satisfaction Guaranteed" },
];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy + CTAs */}
          <div className="space-y-6 opacity-0 animate-fade-in">
            {/* Promo badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 text-white border border-white/30">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              <span className="text-sm font-medium">Booking Available — Schedule Today!</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Fully Insured Cleaning Services You Can Rely On
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
              Pleasant Cleanings delivers professional home and commercial cleaning across Pembroke Pines, Miramar, Coral Springs & 12+ South Florida cities — transparent pricing, vetted cleaners, and a satisfaction guarantee.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-2">
              {trustPills.map((pill) => (
                <div
                  key={pill.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-sm font-medium text-white shadow-soft"
                >
                  <pill.icon className="w-4 h-4" aria-hidden="true" />
                  <span>{pill.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-3 pt-2 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base md:text-lg px-8 py-6 group will-change-transform hover:scale-[1.02] transition-all"
                asChild
              >
                <a href="#booking" className="flex items-center gap-2">
                  Get My Instant Quote
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-primary border-white hover:bg-white/90 font-semibold text-base md:text-lg px-8 py-6 will-change-transform hover:scale-[1.02] transition-all"
                asChild
              >
                <a
                  href="tel:+17867967445"
                  className="flex items-center gap-2"
                  onClick={() => {
                    if (typeof window.gtag === "function") {
                      window.gtag("event", "contact", {
                        event_category: "phone_call",
                        event_label: "hero_cta",
                      });
                    }
                  }}
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  Call (786) 796-7445
                </a>
              </Button>
            </div>
          </div>

          {/* Right — Instant Price Estimator */}
          <div
            className="opacity-0 animate-fade-in lg:pl-8"
            style={{ animationDelay: "0.3s" }}
          >
            <HeroEstimator />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 will-change-transform"
        style={{ transform: "translateX(-50%)" }}
        aria-hidden="true"
      >
        <a href="#social-proof" className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors">
          <span className="text-sm font-medium">See pricing & services</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2 animate-bounce">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
