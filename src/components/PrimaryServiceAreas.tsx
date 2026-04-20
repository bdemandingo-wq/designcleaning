import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { useServiceAreas } from "@/hooks/useServiceAreas";

const PRIMARY_SLUGS = [
  "gaithersburg-cleaning",
  "rockville-cleaning",
  "bethesda-cleaning",
  "silver-spring-cleaning",
  "washington-dc-cleaning",
];

const PrimaryServiceAreas = () => {
  const { areas, loading } = useServiceAreas(true);

  // Filter to the 5 primary cities, preserving the curated order
  const primary = PRIMARY_SLUGS
    .map((slug) => areas.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Serving the DMV Region
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          Trusted cleaning across our core service cities — and growing across the DMV.
        </p>

        {loading ? (
          <p className="text-muted-foreground">Loading service areas...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto mb-8">
            {primary.map((city) => (
              <Link
                key={city.id}
                to={`/${city.slug}`}
                className="flex flex-col items-center gap-2 bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <span className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                  {city.name}
                </span>
              </Link>
            ))}
          </div>
        )}

        <Link
          to="/service-areas"
          className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline"
        >
          View all service areas
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};

export default PrimaryServiceAreas;
