import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceAreaSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Serving [REGION]
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          We proudly serve homeowners in [CITY_1] and [CITY_2].
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Link to="/[CITY_1_SLUG]-cleaning" className="flex items-center gap-2 bg-card border border-border rounded-lg px-6 py-3 shadow-sm hover:shadow-md transition-shadow">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">[CITY_1]</span>
          </Link>
          <Link to="/[CITY_2_SLUG]-cleaning" className="flex items-center gap-2 bg-card border border-border rounded-lg px-6 py-3 shadow-sm hover:shadow-md transition-shadow">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">[CITY_2]</span>
          </Link>
        </div>
        <Link to="/contact" className="text-primary font-semibold hover:underline">
          Check if we serve your area →
        </Link>
      </div>
    </section>
  );
};

export default ServiceAreaSection;
