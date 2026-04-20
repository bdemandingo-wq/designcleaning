import { Star, MapPin, ExternalLink } from "lucide-react";
import { useRef } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useApprovedReviews } from "@/hooks/useApprovedReviews";
import { Button } from "@/components/ui/button";

const fallback = [
  {
    text: "Design Cleaning made the whole experience so easy. Booked online in 5 minutes, they showed up on time, and my home was spotless. This is exactly what I needed.",
    name: "Amanda R.",
    location: "Gaithersburg",
  },
  {
    text: "I've tried other cleaning services before but Design Cleaning is on a different level. Professional, reliable, and the results are consistently excellent.",
    name: "James T.",
    location: "Washington DC",
  },
  {
    text: "The membership plan is a game changer. I never have to think about scheduling — my home is always clean and the pricing is unbeatable.",
    name: "Sofia M.",
    location: "Gaithersburg",
  },
  {
    text: "Used them for a move-out clean and got my full deposit back. They cleaned things I didn't even think about. Absolutely worth every penny.",
    name: "David L.",
    location: "Washington DC",
  },
  {
    text: "Finally a cleaning service that actually feels professional. The booking was smooth, communication was great, and the clean was immaculate.",
    name: "Rachel K.",
    location: "Gaithersburg",
  },
];

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { get } = useSiteContent();
  const { reviews } = useApprovedReviews(12);
  const reviewsUrl = get("google_reviews_url", "https://www.google.com/maps");

  // Real approved reviews first; if none, show site-content overrides + fallback.
  const testimonials = reviews.length > 0
    ? reviews.map((r) => ({
        text: r.review_text,
        name: r.customer_name,
        location: r.location || "DMV",
        rating: r.rating,
      }))
    : fallback.map((f, idx) => {
        const i = idx + 1;
        return {
          text: get(`testimonial_${i}_text`, f.text),
          name: get(`testimonial_${i}_name`, f.name),
          location: get(`testimonial_${i}_location`, f.location),
          rating: 5,
        };
      });


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
          <span className="text-muted-foreground">on Google</span>
        </div>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
          What Our Clients Say
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-4">
          Real reviews from happy homeowners across the DMV.
        </p>
        <p className="text-center mb-12">
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Read all reviews on Google
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </p>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-snap-x pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial, index) => (
            <a
              key={index}
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read more reviews from ${testimonial.name} on Google`}
              className="group flex-shrink-0 w-[320px] md:w-[380px] bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all scroll-snap-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </div>
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>
              <div className="border-t border-border pt-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" aria-hidden="true" />
                    {testimonial.location}
                  </p>
                </div>
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full font-medium">
                  Google
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg" className="rounded-lg">
            <a href={reviewsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              See All Google Reviews
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
