import { Calculator, CalendarCheck, Sparkles } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const HowItWorks = () => {
  const { get } = useSiteContent();

  const steps = [
    {
      icon: Calculator,
      number: "1",
      title: get("home_howitworks_step_1_title", "Get Free Estimate"),
      description: get(
        "home_howitworks_step_1_desc",
        "Tell us your home size and service in under 60 seconds. See your price instantly."
      ),
    },
    {
      icon: CalendarCheck,
      number: "2",
      title: get("home_howitworks_step_2_title", "Pick Your Date"),
      description: get(
        "home_howitworks_step_2_desc",
        "Choose a time that works for you. Confirm online — no phone tag required."
      ),
    },
    {
      icon: Sparkles,
      number: "3",
      title: get("home_howitworks_step_3_title", "We Clean"),
      description: get(
        "home_howitworks_step_3_desc",
        "Our background-checked pros arrive on time and leave your home spotless."
      ),
    },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to a spotless home
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 border-2 border-primary/20">
                  <span className="text-2xl font-bold text-primary font-display">{step.number}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-5 h-5 text-primary" aria-hidden="true" />
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
      </div>
    </section>
  );
};

export default HowItWorks;
