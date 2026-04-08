import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Home, Truck, RefreshCw, Check, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Standard Cleaning",
    description: "Perfect for regular maintenance cleaning to keep your home fresh.",
    price: "From [STD_PRICE]",
    badge: "Best Value",
    badgeColor: "bg-success text-success-foreground",
    features: [
      "All rooms dusted & vacuumed",
      "Kitchen & bathrooms sanitized",
      "Floors mopped",
      "Trash emptied",
    ],
  },
  {
    icon: Home,
    title: "Deep Cleaning",
    description: "A thorough top-to-bottom clean for homes that need extra attention.",
    price: "From [DEEP_PRICE]",
    badge: "Most Popular",
    badgeColor: "bg-accent text-accent-foreground",
    features: [
      "Everything in Standard",
      "Baseboards & trim",
      "Inside cabinets & drawers",
      "Light switches & handles",
    ],
  },
  {
    icon: Truck,
    title: "Move-In / Move-Out",
    description: "Get your deposit back or move into a spotless space.",
    price: "From [MOVE_PRICE]",
    features: [
      "Top-to-bottom cleaning",
      "Inside appliances",
      "Windows & tracks",
      "Move-in ready",
    ],
  },
  {
    icon: RefreshCw,
    title: "Recurring Cleaning",
    description: "Consistent, automated cleaning on your schedule.",
    price: "Membership Pricing",
    features: [
      "Weekly / biweekly / monthly",
      "Priority scheduling",
      "Discounted rates",
      "Consistent cleaner",
    ],
  },
];

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (location.pathname === '/') {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Cleaning Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From routine maintenance to deep cleans — we handle it all.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="h-full border border-border shadow-sm hover:shadow-md transition-shadow opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="relative">
                {service.badge && (
                  <span className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full ${service.badgeColor}`}>
                    {service.badge}
                  </span>
                )}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-display text-xl">{service.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary mb-4">{service.price}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full hover:bg-primary hover:text-primary-foreground transition-all rounded-lg"
                  onClick={handleBookClick}
                >
                  Book This Service
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
