import { Smartphone, ShieldCheck, DollarSign, Clock, ClipboardCheck, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Effortless Booking",
    description: "Book in a few quiet minutes — no phone tag, no back-and-forth.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted in Your Home",
    description: "Background-checked, fully insured professionals you can welcome with confidence.",
  },
  {
    icon: DollarSign,
    title: "Honest, Upfront Pricing",
    description: "Know your price before you book. No surprises, ever — just peace of mind.",
  },
  {
    icon: Clock,
    title: "Always On Time",
    description: "Your time is precious. We protect it by showing up exactly when we say we will.",
  },
  {
    icon: ClipboardCheck,
    title: "Quietly Meticulous",
    description: "A detailed checklist and a careful eye, so every corner feels considered.",
  },
  {
    icon: MessageSquare,
    title: "Calm Communication",
    description: "Warm, clear updates from booking to after-care — never pushy, always thoughtful.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            A Cleaner Home. A Quieter Mind.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We designed Design Cleaning around one idea: your home should feel like a sanctuary, and getting there should feel just as effortless.
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
