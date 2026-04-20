import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useServiceAreas } from "@/hooks/useServiceAreas";

const ServiceAreaSection = () => {
  const { areas, loading } = useServiceAreas(true);

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Serving the DMV Region
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          We proudly serve homeowners across Montgomery County, Prince George's County, and greater DC.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {loading ? (
            <p className="text-muted-foreground">Loading service areas...</p>
          ) : (
            areas.map((city) => (
              <Link
                key={city.id}
                to={`/${city.slug}`}
                className="flex items-center gap-2 bg-card border border-border rounded-lg px-5 py-3 shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground text-sm">{city.name}</span>
              </Link>
            ))
          )}
        </div>
        <Link to="/service-areas" className="text-primary font-semibold hover:underline">
          View all service areas →
        </Link>
      </div>
    </section>
  );
};

export default ServiceAreaSection;
