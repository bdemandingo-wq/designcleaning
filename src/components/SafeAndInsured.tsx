import { ThumbsUp, ShieldCheck, Lock } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const SafeAndInsured = () => {
  const { get } = useSiteContent();

  const heading = get("safe_insured_heading", "Safe and Insured");
  const lead = get(
    "safe_insured_lead",
    "Your home, your peace of mind. Every Design Cleaning professional is background-checked, trained to our standards, and fully insured — so you can step away from the details and trust the work is in good hands."
  );

  const points = [
    {
      icon: ShieldCheck,
      title: get("safe_insured_point_1_title", "Background-Checked Professionals"),
      desc: get(
        "safe_insured_point_1_desc",
        "Every cleaner is vetted, identity-verified, and trained before stepping into your home."
      ),
    },
    {
      icon: Lock,
      title: get("safe_insured_point_2_title", "Secure, Respectful Practices"),
      desc: get(
        "safe_insured_point_2_desc",
        "Key codes and access details are handled with care. We treat your home like it's our own."
      ),
    },
    {
      icon: ThumbsUp,
      title: get("safe_insured_point_3_title", "Fully Insured & Bonded"),
      desc: get(
        "safe_insured_point_3_desc",
        "Comprehensive liability coverage on every clean. If something isn't right, we make it right."
      ),
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <ThumbsUp className="w-8 h-8 text-primary" aria-hidden="true" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {heading}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {lead}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {points.map((p) => (
              <div
                key={p.title}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafeAndInsured;
