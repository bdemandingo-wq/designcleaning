import { Star, MapPin } from "lucide-react";
import { useRef } from "react";

const testimonials = [
  {
    name: "Amanda R.",
    location: "Gaithersburg",
    rating: 5,
    text: "Design Cleaning made the whole experience so easy. Booked online in 5 minutes, they showed up on time, and my home was spotless. This is exactly what I needed.",
  },
  {
    name: "James T.",
    location: "Washington DC",
    rating: 5,
    text: "I've tried other cleaning services before but Design Cleaning is on a different level. Professional, reliable, and the results are consistently excellent.",
  },
  {
    name: "Sofia M.",
    location: "Gaithersburg",
    rating: 5,
    text: "The membership plan is a game changer. I never have to think about scheduling — my home is always clean and the pricing is unbeatable.",
  },
  {
    name: "David L.",
    location: "Washington DC",
    rating: 5,
    text: "Used them for a move-out clean and got my full deposit back. They cleaned things I didn't even think about. Absolutely worth every penny.",
  },
  {
    name: "Rachel K.",
    location: "Gaithersburg",
    rating: 5,
    text: "Finally a cleaning service that actually feels professional. The booking was smooth, communication was great, and the clean was immaculate.",
  },
];

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-accent text-accent" />
            ))}
          </div>
          <span className="text-lg font-semibold text-foreground">5.0</span>
          <span className="text-muted-foreground">5-Star Rated</span>
        </div>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
          What Our Clients Say
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Real reviews from happy homeowners in DMV (DC, Maryland & Virginia).
        </p>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-snap-x pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[320px] md:w-[380px] bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow scroll-snap-center"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
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
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
