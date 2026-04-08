import { Calculator, CalendarDays, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Calculator,
    number: "1",
    title: "Get Your Quote",
    description: "Enter your home size and service type. See transparent pricing instantly. No hidden fees.",
  },
  {
    icon: CalendarDays,
    number: "2",
    title: "Pick Your Date",
    description: "Choose a date and time that works for you. We're available 7 days a week.",
  },
  {
    icon: Sparkles,
    number: "3",
    title: "Relax, We Handle It",
    description: "Our vetted, background-checked cleaners arrive on time and leave your home spotless.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Booking Is Effortless
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to a sparkling clean home
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center relative">
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-primary/10" />
              )}

              <div className="relative z-10">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 border-2 border-primary/20">
                  <span className="text-2xl font-bold text-primary font-display">{step.number}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-10 py-6 group hover:scale-[1.02] transition-all"
            asChild
          >
            <a href="#booking" className="flex items-center gap-2">
              Start My Booking
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;