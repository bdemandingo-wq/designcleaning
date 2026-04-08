import { Smartphone, ShieldCheck, DollarSign, Clock, ClipboardCheck, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Simple Booking",
    description: "Book in minutes online, 24/7, no phone call required.",
  },
  {
    icon: ShieldCheck,
    title: "Vetted Professionals",
    description: "Every cleaner is background-checked, trained, and insured.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "No hidden fees. You see the full price before you book.",
  },
  {
    icon: Clock,
    title: "Reliable Scheduling",
    description: "We show up on time, every time. Your schedule matters.",
  },
  {
    icon: ClipboardCheck,
    title: "Quality Standards",
    description: "We follow a structured cleaning checklist for consistent results.",
  },
  {
    icon: MessageSquare,
    title: "Easy Communication",
    description: "Clear updates before, during, and after every cleaning.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Design Cleaning?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A modern cleaning service built for convenience, reliability, and professional results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
