import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Home, Truck, RefreshCw, Check, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Standard Cleaning",
    description: "An easy refresh that keeps your home calm, comfortable, and effortlessly inviting.",
    price: "From $108",
    badge: "Best Value",
    badgeColor: "bg-success text-success-foreground",
    features: [
      "All rooms dusted & vacuumed",
      "Kitchens & bathrooms beautifully refreshed",
      "Floors softly mopped",
      "Tidied so you can simply enjoy it",
    ],
  },
  {
    icon: Home,
    title: "Deep Cleaning",
    description: "An immersive top-to-bottom reset for a home that feels brand new.",
    price: "From $208",
    badge: "Most Popular",
    badgeColor: "bg-accent text-accent-foreground",
    features: [
      "Everything in Standard, elevated",
      "Baseboards, trim & detail work",
      "Inside cabinets & drawers",
      "The little touches you never have time for",
    ],
  },
  {
    icon: Truck,
    title: "Move-In / Move-Out",
    description: "Step into your next chapter spotless — or close one without lifting a finger.",
    price: "From $283",
    features: [
      "True top-to-bottom transformation",
      "Inside appliances & cabinetry",
      "Windows, tracks & overlooked details",
      "Walk-in ready, stress-free",
    ],
  },
  {
    icon: RefreshCw,
    title: "Recurring Cleaning",
    description: "Quiet luxury, on repeat. A consistently beautiful home without ever thinking about it.",
    price: "Membership Pricing",
    features: [
      "Weekly, biweekly, or monthly",
      "Priority scheduling",
      "Member-only pricing",
      "The same trusted team",
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
            Choose Your Calm
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thoughtful cleaning, tailored to your life — so you can spend your time on the things (and people) that matter most.
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
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
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
