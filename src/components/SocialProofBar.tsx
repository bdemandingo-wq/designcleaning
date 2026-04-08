import { Star, Shield, UserCheck } from "lucide-react";
import { useState, useEffect } from "react";

const microTestimonials = [
  '"Pleasant Cleanings transformed my home before a big family event. So professional!" — Carmen R., Pembroke Pines',
  '"I used their move-out cleaning and got my full security deposit back!" — Marcus D., Miramar',
  '"As a busy mom, Pleasant Cleanings is a lifesaver. My house is spotless every time." — Jasmine T., Coral Springs',
  '"Best Airbnb cleaning service in South Florida. My guests always leave 5-star reviews." — Andre W., Doral',
  '"Tiffany\'s team is incredibly detail-oriented. My apartment has never looked this good!" — Priya M., Coral Gables',
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
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
              ))}
            </div>
            <span className="font-semibold">5-Star Rated</span>
            <span className="opacity-80">· South Florida</span>
          </div>

          {/* Rotating testimonial */}
          <p className="text-sm opacity-90 max-w-xl text-center md:text-right transition-opacity duration-300">
            {microTestimonials[current]}
          </p>

          {/* Trust badges */}
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
