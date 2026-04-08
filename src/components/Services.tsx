import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Home, Truck, Building2, Check, Armchair, Layers, ArrowRight, Calendar, Hammer } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Standard Cleaning",
    description: "Perfect for regular maintenance cleaning to keep your home spotless.",
    price: "From $150",
    link: "/standard-cleaning",
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
    description: "Comprehensive cleaning for homes that need extra attention to detail.",
    price: "From $250",
    link: "/deep-cleaning",
    badge: "Most Popular",
    badgeColor: "bg-secondary text-secondary-foreground",
    features: [
      "Everything in Standard Cleaning",
      "Baseboards & trim cleaned",
      "Light switches & door handles",
      "Inside cabinets & drawers",
    ],
  },
  {
    icon: Truck,
    title: "Move In/Out",
    description: "Perfect for moving - we leave your old or new home spotless.",
    price: "From $300",
    link: "/move-in-out-cleaning",
    features: [
      "Complete top-to-bottom cleaning",
      "Inside appliances cleaned",
      "Windows & tracks cleaned",
      "Ready for inspection",
    ],
  },
  {
    icon: Layers,
    title: "Airbnb / Vacation Rental",
    description: "Turnover cleaning for short-term rental properties.",
    price: "From $180",
    link: "/airbnb-cleaning",
    features: [
      "Turnover cleaning between guests",
      "Fresh linens & towels",
      "Restocking essentials",
      "Same-day availability",
    ],
  },
  {
    icon: Armchair,
    title: "Upholstery Cleaning",
    description: "Expert furniture and fabric cleaning for sofas, chairs & more.",
    price: "Custom Quote",
    link: "/upholstery-cleaning",
    features: [
      "Safe for all fabric types",
      "Removes embedded dirt",
      "Pet odor removal",
      "Fabric protection option",
    ],
  },
  {
    icon: Building2,
    title: "Office Cleaning",
    description: "Professional cleaning for offices, retail spaces, and commercial properties.",
    price: "Custom Quote",
    link: "/office-cleaning",
    features: [
      "Flexible scheduling",
      "OSHA compliant",
      "Janitorial services",
      "Floor care & maintenance",
    ],
  },
  {
    icon: Hammer,
    title: "Post-Construction",
    description: "Thorough cleanup after renovation or construction projects.",
    price: "From $450",
    link: "/post-construction-cleaning",
    features: [
      "Dust & debris removal",
      "Window & glass cleaning",
      "Deep scrub all surfaces",
      "Move-in ready finish",
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
            Our Professional Cleaning Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From standard maintenance to deep cleaning, Airbnb turnovers to office care — 
            we offer comprehensive solutions across Pembroke Pines & South Florida.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link 
              key={service.title}
              to={service.link}
              className="block group"
            >
              <Card
                className="h-full border-t-4 border-t-primary/20 border-border/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:border-t-primary opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="relative">
                  {service.badge && (
                    <span className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full ${service.badgeColor}`}>
                      {service.badge}
                    </span>
                  )}
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="font-display text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
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
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    onClick={handleBookClick}
                  >
                    Book This Service
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link to="/service-areas" className="text-primary hover:underline">View All Service Areas</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
