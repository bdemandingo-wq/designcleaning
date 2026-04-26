import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import { ShieldCheck, Users, Target, Heart, Sparkles, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";

const AboutPage = () => {
  const { get } = useSiteContent();

  const heroTitle = get("about_hero_title", "A cleaner home, without the noise.");
  const heroSub = get(
    "about_hero_sub",
    "Design Cleaning is a modern home service built around one idea: trust the work, then forget about it. Vetted professionals, honest pricing, and consistent results across the DMV."
  );

  const missionTitle = get("about_mission_title", "Our Mission");
  const missionBody = get(
    "about_mission_body",
    "We believe a clean home should feel effortless. That's why we obsess over the details others skip — vetting every cleaner, training to a single high standard, and making the entire experience as simple as a few taps. No call centers. No upsells. No surprises."
  );

  const standardsTitle = get("about_standards_title", "Our Standards");
  const standardsBody = get(
    "about_standards_body",
    "Every clean follows a structured checklist refined over hundreds of homes. Background-checked professionals. Fully insured and bonded. Eco-conscious supplies on request. We measure ourselves on the small things — the corner of a baseboard, the inside of a microwave, the seam where the floor meets the wall."
  );

  const values = [
    {
      icon: Target,
      title: get("about_value_1_title", "Reliable, Every Time"),
      desc: get(
        "about_value_1_desc",
        "Booking is fast, arrival is on time, and the work is consistent. Predictability is the foundation of trust."
      ),
    },
    {
      icon: ShieldCheck,
      title: get("about_value_2_title", "Vetted Professionals"),
      desc: get(
        "about_value_2_desc",
        "Background-checked, identity-verified, and trained to our standards before they ever step into your home."
      ),
    },
    {
      icon: Sparkles,
      title: get("about_value_3_title", "Detail-Obsessed"),
      desc: get(
        "about_value_3_desc",
        "We follow structured checklists so the same care reaches every corner — no missed spots, no shortcuts."
      ),
    },
    {
      icon: Heart,
      title: get("about_value_4_title", "Customer First"),
      desc: get(
        "about_value_4_desc",
        "Transparent pricing, clear communication, and a satisfaction guarantee. If something isn't right, we make it right."
      ),
    },
    {
      icon: Users,
      title: get("about_value_5_title", "Local & Accountable"),
      desc: get(
        "about_value_5_desc",
        "We're DMV-based and proudly local. Real names, real people, real accountability — not a faceless platform."
      ),
    },
    {
      icon: Clock,
      title: get("about_value_6_title", "Respectful of Your Time"),
      desc: get(
        "about_value_6_desc",
        "On-time arrivals, clear arrival windows, and 15-minute response on inquiries. Your time matters."
      ),
    },
  ];

  return (
    <>
      <SEOSchema
        pageTitle="About Design Cleaning | Vetted, Insured Cleaners in the DMV"
        pageDescription="Modern home cleaning built on trust. Background-checked, fully insured professionals serving Gaithersburg, DC, and the greater DMV."
        canonicalUrl="https://designcleaningdmv.com/about"
      />
      <main id="main-content" className="min-h-screen">
        <Navbar />
        <div className="pt-24">
          {/* Hero */}
          <section className="py-20 md:py-24 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center max-w-3xl">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {heroTitle}
              </h1>
              <p className="text-primary-foreground/85 text-lg md:text-xl leading-relaxed">
                {heroSub}
              </p>
            </div>
          </section>

          {/* Mission */}
          <section className="py-16 md:py-20 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                {missionTitle}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {missionBody}
              </p>
            </div>
          </section>

          {/* Standards */}
          <section className="py-16 md:py-20 bg-muted">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                {standardsTitle}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {standardsBody}
              </p>
            </div>
          </section>

          {/* Values grid */}
          <section className="py-16 md:py-20 bg-background">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Why Design Cleaning
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Six commitments that shape every clean we deliver.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map((v) => (
                  <div
                    key={v.title}
                    className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <v.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {v.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 md:py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center max-w-2xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready for a cleaner home?
              </h2>
              <p className="text-primary-foreground/85 mb-8 text-lg">
                Get an instant estimate and book in under two minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/#booking">Get Instant Quote</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link to="/contact">Talk to Our Team</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default AboutPage;
