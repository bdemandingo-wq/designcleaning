import { ShieldCheck, DollarSign, CalendarCheck } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const WhyChooseUs = () => {
  const { get } = useSiteContent();

  const features = [
    {
      icon: ShieldCheck,
      title: get("home_why_reliability_title", "Reliability You Can Count On"),
      description: get(
        "home_why_reliability_desc",
        "Background-checked, insured pros who show up on time, every time. We treat your home like our own."
      ),
    },
    {
      icon: DollarSign,
      title: get("home_why_transparency_title", "Transparent Pricing"),
      description: get(
        "home_why_transparency_desc",
        "See your full price before you book. No hidden fees, no last-minute upcharges — ever."
      ),
    },
    {
      icon: CalendarCheck,
      title: get("home_why_scheduling_title", "Easy Online Scheduling"),
      description: get(
        "home_why_scheduling_desc",
        "Book in under five minutes. Reschedule, reorder, or set up recurring cleans from your phone."
      ),
    },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Design Cleaning
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We built our service around the three things that matter most to busy homeowners.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center p-6 md:p-8 rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/40 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
