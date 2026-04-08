import { Shield, Star, Users, Award } from "lucide-react";

const stats = [
  { icon: Users, label: "Happy Clients", value: "200+" },
  { icon: Star, label: "Cleans Completed", value: "500+" },
  { icon: Award, label: "5-Star Rated", value: "★★★★★" },
  { icon: Shield, label: "Licensed & Insured", value: "✓" },
];

const TrustSection = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-accent" />
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-primary-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-primary-foreground/80 max-w-2xl mx-auto text-lg italic">
          "A modern cleaning service built for convenience, reliability, and professional results."
        </p>
      </div>
    </section>
  );
};

export default TrustSection;
