import { ShieldCheck, BadgeCheck, Umbrella, MousePointerClick } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const TrustBadges = () => {
  const { get } = useSiteContent();

  const badges = [
    { icon: ShieldCheck, label: get("home_trust_badge_1", "Background-Checked Cleaners") },
    { icon: BadgeCheck, label: get("home_trust_badge_2", "Satisfaction Guarantee") },
    { icon: Umbrella, label: get("home_trust_badge_3", "Fully Insured") },
    { icon: MousePointerClick, label: get("home_trust_badge_4", "Easy Online Booking") },
  ];

  return (
    <section className="py-8 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/40"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <badge.icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <span className="text-sm md:text-base font-semibold text-foreground">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
