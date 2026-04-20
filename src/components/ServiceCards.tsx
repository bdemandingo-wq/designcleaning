import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2, Truck, BedDouble, Building2, ArrowRight } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const ServiceCards = () => {
  const { get } = useSiteContent();

  const services = [
    {
      key: "standard",
      icon: Sparkles,
      titleDefault: "Standard Cleaning",
      descDefault: "Routine refresh of every room — kitchens, baths, dusting, vacuuming, mopping.",
      priceDefault: "From $99",
      ctaDefault: "Get Estimate",
      link: "/pricing?service=standard",
    },
    {
      key: "deep",
      icon: Wand2,
      titleDefault: "Deep Cleaning",
      descDefault: "Detailed top-to-bottom clean including baseboards, fixtures, and inside cabinets.",
      priceDefault: "From $149",
      ctaDefault: "Get Estimate",
      link: "/pricing?service=deep",
    },
    {
      key: "moveinout",
      icon: Truck,
      titleDefault: "Move In/Out",
      descDefault: "Empty-home turnover so you collect your deposit or step into a spotless place.",
      priceDefault: "From $169",
      ctaDefault: "Get Estimate",
      link: "/pricing?service=moveinout",
    },
    {
      key: "airbnb",
      icon: BedDouble,
      titleDefault: "Airbnb Turnover",
      descDefault: "Fast, reliable changeovers with linen swaps and 5-star guest-ready presentation.",
      priceDefault: "From $99",
      ctaDefault: "Get Estimate",
      link: "/pricing?service=airbnb",
    },
    {
      key: "commercial",
      icon: Building2,
      titleDefault: "Commercial & Office",
      descDefault: "Recurring office, retail, and small commercial cleaning on your schedule.",
      priceDefault: "Custom Quote",
      ctaDefault: "Request Quote",
      link: "/commercial",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cleaning Services for Every Need
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pick the right clean for your space. Transparent pricing, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((s) => {
            const title = get(`home_service_card_${s.key}_title`, s.titleDefault);
            const desc = get(`home_service_card_${s.key}_desc`, s.descDefault);
            const price = get(`home_service_card_${s.key}_price`, s.priceDefault);
            const cta = get(`home_service_card_${s.key}_cta`, s.ctaDefault);

            return (
              <Card
                key={s.key}
                className="group flex flex-col hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <s.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    {desc}
                  </p>
                  <p className="text-sm font-bold text-primary mb-4">{price}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Link to={s.link} className="flex items-center justify-center gap-2">
                      {cta}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
