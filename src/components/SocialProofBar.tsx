import { Star, Shield, UserCheck } from "lucide-react";
import { useState, useEffect } from "react";

const microTestimonials = [
  '"Design Cleaning made the whole experience so easy. Booked online in 5 minutes!" — Amanda R., Gaithersburg',
  '"Professional, reliable, and the results are consistently excellent." — James T., Washington DC',
  '"The membership plan is a game changer. My home is always clean." — Sofia M., Gaithersburg',
  '"Got my full deposit back with their move-out clean. Worth every penny." — David L., Washington DC',
  '"Finally a cleaning service that actually feels professional." — Rachel K., Gaithersburg',
];

const SocialProofBar = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % microTestimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="social-proof" className="py-6 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="font-semibold">5-Star Rated</span>
            <span className="opacity-80">· DMV (DC, Maryland & Virginia)</span>
          </div>

          <p className="text-sm opacity-90 max-w-xl text-center md:text-right transition-opacity duration-300">
            {microTestimonials[current]}
          </p>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm">
              <Shield className="w-4 h-4" />
              <span>Insured</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <UserCheck className="w-4 h-4" />
              <span>Background Checked</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofBar;
