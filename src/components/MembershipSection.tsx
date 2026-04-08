import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Monthly Plan",
    frequency: "1 clean/month",
    discount: "Save 5%",
    features: ["Priority scheduling", "Easy rescheduling", "Discounted rates", "Consistent cleaner preference"],
  },
  {
    name: "Biweekly Plan",
    frequency: "2 cleans/month",
    discount: "Save 10%",
    popular: true,
    features: ["All Monthly benefits", "Consistent cleaner", "Priority scheduling", "Easy rescheduling"],
  },
  {
    name: "Weekly Plan",
    frequency: "4 cleans/month",
    discount: "Save 15%",
    features: ["All benefits included", "Locked-in pricing", "Automated booking", "Priority support"],
  },
];

const benefits = [
  "Priority scheduling",
  "Discounted rates",
  "Consistent cleaner preference",
  "Easy rescheduling",
  "Locked-in pricing",
  "Automated booking",
  "Priority support",
];

const MembershipSection = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Cleaning Membership Plans
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Save money and keep your home consistently clean with scheduled service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {plans.map((plan) => (
            <Card key={plan.name} className={`bg-primary-foreground/10 border-primary-foreground/20 ${plan.popular ? 'ring-2 ring-accent' : ''}`}>
              <CardContent className="p-6 text-center">
                {plan.popular && (
                  <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-primary-foreground mb-2">{plan.name}</h3>
                <p className="text-primary-foreground/70 text-sm mb-1">{plan.frequency}</p>
                <p className="text-accent font-bold text-lg mb-4">{plan.discount}</p>
                <ul className="space-y-2 text-left mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-primary-foreground/80">
                      <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-12">
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-6">
            Our membership plans are designed for customers who want consistent cleanings without having to rebook each time. Members receive priority scheduling and discounted pricing.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {benefits.map((b) => (
              <span key={b} className="flex items-center gap-1.5 text-sm text-primary-foreground/80">
                <Check className="w-4 h-4 text-accent" />
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-6 rounded-lg" asChild>
            <Link to="/membership" className="flex items-center gap-2">
              Join Membership
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button size="lg" variant="ghost" className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 py-6 rounded-lg" asChild>
            <Link to="/membership">View Plans</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
