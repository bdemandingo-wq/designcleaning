import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const testimonials = [
  {
    name: "Carmen R.",
    location: "Pembroke Pines",
    rating: 5,
    text: "Pleasant Cleanings transformed my home before a big family event. They were thorough, on time, and so professional. Will definitely be booking again!",
  },
  {
    name: "Marcus D.",
    location: "Miramar",
    rating: 5,
    text: "I used their move-out cleaning and got my full security deposit back. They cleaned every corner. Highly recommend to anyone moving in South Florida.",
  },
  {
    name: "Jasmine T.",
    location: "Coral Springs",
    rating: 5,
    text: "As a busy mom running a household and a business, Pleasant Cleanings is a lifesaver. My house is spotless every single time.",
  },
  {
    name: "Andre W.",
    location: "Doral",
    rating: 5,
    text: "Best Airbnb cleaning service I've found in South Florida. They're fast, reliable, and my guests always leave 5-star reviews on cleanliness.",
  },
  {
    name: "Priya M.",
    location: "Coral Gables",
    rating: 5,
    text: "Tiffany's team is incredibly detail-oriented. They cleaned areas I didn't even think to ask about. My apartment has never looked this good!",
  },
];

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-secondary text-secondary" />
            ))}
          </div>
          <span className="text-lg font-semibold text-foreground">5.0</span>
          <span className="text-muted-foreground">5-Star Rated</span>
        </div>
        
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
          Real People. Real Clean Homes.
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Join happy South Florida homeowners who trust Pleasant Cleanings.
        </p>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-snap-x pb-4 -mx-4 px-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[320px] md:w-[380px] bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow scroll-snap-center"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>
              <div className="border-t border-border pt-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </p>
                </div>
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full font-medium">
                  Verified Review
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10 space-y-3">
          <Link 
            to="/service-areas"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            📍 Serving Pembroke Pines, FL & 12+ South Florida cities →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
