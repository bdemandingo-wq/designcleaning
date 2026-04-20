import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2, Truck, BedDouble, ArrowRight, Phone, Check, Calendar, ShieldCheck, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import { Card, CardContent } from "@/components/ui/card";
import { useSiteContent } from "@/hooks/useSiteContent";

const SERVICES = [
  {
    key: "standard",
    icon: Sparkles,
    defaults: {
      title: "Standard Cleaning",
      tagline: "Your home, beautifully maintained — every visit.",
      desc: "Our recurring routine clean keeps your space feeling cared-for, week after week. Perfect for households who value a tidy, calm home without lifting a finger.",
      price: "Starting at $99",
      includes: [
        "All rooms dusted, vacuumed, and mopped",
        "Kitchen surfaces, sink, and exterior of appliances",
        "Bathrooms scrubbed, mirrors polished, fixtures shined",
        "Beds made, trash emptied, fresh-look finishing touches",
      ],
    },
  },
  {
    key: "deep",
    icon: Wand2,
    defaults: {
      title: "Deep Cleaning",
      tagline: "A reset for your home — top to bottom.",
      desc: "When 'clean' isn't enough, our deep clean reaches the spots routine cleaning misses. Ideal as a first visit, a seasonal refresh, or before guests arrive.",
      price: "Starting at $149",
      includes: [
        "Baseboards, door frames, and switch plates hand-wiped",
        "Inside windows, sills, and tracks detailed",
        "Cabinet fronts, vents, and light fixtures dusted",
        "Heavy soap-scum, lime, and grime removal in baths",
      ],
    },
  },
  {
    key: "moveinout",
    icon: Truck,
    defaults: {
      title: "Move In / Move Out",
      tagline: "Walk in to move-in-ready. Walk out with your deposit.",
      desc: "Empty-home turnovers built around landlord checklists and homebuyer expectations. We leave the space spotless, sanitized, and ready for the next chapter.",
      price: "Starting at $169",
      includes: [
        "Inside cabinets, drawers, and closets cleaned out",
        "Inside oven, fridge, microwave, and dishwasher",
        "All baseboards, walls (spot-clean), and floors detailed",
        "Bathrooms fully sanitized, hardware shined, vents dusted",
      ],
    },
  },
  {
    key: "airbnb",
    icon: BedDouble,
    defaults: {
      title: "Airbnb Turnover",
      tagline: "5-star reviews, on autopilot.",
      desc: "Reliable same-day changeovers with linen swaps, restocking, and hotel-grade presentation. Hosts trust us to protect their ratings — and their time.",
      price: "From $120 per turnover",
      includes: [
        "Full clean between every guest stay",
        "Linen change + bed styling to a 5-star standard",
        "Restock toiletries, paper goods, coffee (supplies billed at cost)",
        "Damage / low-supply photo report sent same-day",
      ],
    },
  },
];

const ADD_ONS = [
  "Inside fridge",
  "Inside oven",
  "Interior windows",
  "Laundry (wash & fold)",
  "Inside cabinets",
  "Balcony / patio",
  "Garage sweep",
  "Pet hair detail",
];

const WHY = [
  { icon: ShieldCheck, title: "Insured & background-checked", desc: "Every cleaner is vetted, insured, and trained to our standard before stepping into your home." },
  { icon: Heart, title: "We treat your home like ours", desc: "Eco-friendly products on request, careful with finishes, attentive to the details that matter to you." },
  { icon: Calendar, title: "Easy, flexible scheduling", desc: "Book online in 60 seconds. Reschedule with one tap. No call centers, no hold music." },
];

const ResidentialPage = () => {
  const { get } = useSiteContent();
  const f = (k: string, fb: string) => get(`residential_${k}`, fb);

  return (
    <>
      <SEOSchema
        pageTitle="Residential Cleaning Services in the DMV | Design Cleaning"
        pageDescription="Standard, deep, move in/out, and Airbnb turnover cleaning across Gaithersburg, Rockville, Bethesda, Silver Spring, and DC. Insured, background-checked, free estimates."
        canonicalUrl="https://designcleaningdmv.com/residential"
        pageType="service"
      />
      <main className="min-h-screen">
        <Navbar />

        {/* Hero */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {f("hero_headline", "Residential Cleaning, Designed Around Your Life")}
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              {f(
                "hero_subhead",
                "Come home to a spotless space and the hours you used to spend cleaning. Trusted across the DMV for reliable, careful, every-detail-covered home cleaning.",
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to="/pricing">Get Free Estimate</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:2029359934" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" /> (202) 935-9934
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Service Cards Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                {f("services_overview_title", "Choose The Right Clean For Your Home")}
              </h2>
              <p className="text-muted-foreground">
                {f("services_overview_subtitle", "Every home is different. Every clean is tailored. Hover, tap, or scroll to find the one that fits.")}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {SERVICES.map((s) => (
                <Card key={s.key} className="hover:border-primary/50 hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <s.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      {f(`${s.key}_title`, s.defaults.title)}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                      {f(`${s.key}_short`, s.defaults.tagline)}
                    </p>
                    <p className="text-primary font-semibold text-sm mb-3">
                      {f(`${s.key}_price`, s.defaults.price)}
                    </p>
                    <a
                      href={`#${s.key}`}
                      className="text-sm text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Learn more <ArrowRight className="w-3 h-3" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed per-service sections */}
        {SERVICES.map((s, idx) => {
          const isAirbnb = s.key === "airbnb";
          return (
            <section
              key={s.key}
              id={s.key}
              className={`py-16 scroll-mt-24 ${idx % 2 === 0 ? "bg-muted" : "bg-background"}`}
            >
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <s.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {f(`${s.key}_title`, s.defaults.title)}
                    </h2>
                    <p className="text-lg text-primary font-medium mb-4">
                      {f(`${s.key}_tagline`, s.defaults.tagline)}
                    </p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {f(`${s.key}_desc`, s.defaults.desc)}
                    </p>
                    <p className="text-2xl font-bold text-foreground mb-6">
                      {f(`${s.key}_price`, s.defaults.price)}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                        <Link to={isAirbnb ? "/airbnb-turnover" : "/pricing"}>
                          {isAirbnb ? "Get Airbnb Quote" : "Get Free Estimate"}
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/booking">Book This Clean</Link>
                      </Button>
                    </div>
                  </div>
                  <Card>
                    <CardContent className="p-6">
                      <p className="font-semibold text-foreground mb-4">What's Included</p>
                      <ul className="space-y-3">
                        {(s.defaults.includes).map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">
                              {f(`${s.key}_includes_${i + 1}`, item)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          );
        })}

        {/* Add-ons preview */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold text-foreground mb-3">
                {f("addons_title", "Make It Yours With Add-Ons")}
              </h2>
              <p className="text-muted-foreground">
                {f("addons_subtitle", "Add the extras that matter to your home. See pricing in the estimator.")}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ADD_ONS.map((a, i) => (
                <div key={i} className="bg-muted rounded-lg p-3 text-center text-sm font-medium text-foreground">
                  {f(`addon_preview_${i + 1}`, a)}
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild>
                <Link to="/pricing">See Add-On Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Recurring */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              {f("recurring_title", "Save With Recurring Service")}
            </h2>
            <p className="text-muted-foreground mb-8">
              {f(
                "recurring_subtitle",
                "Set it and forget it. Recurring clients get priority scheduling and the same trusted cleaner — at a discount.",
              )}
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { freq: "Weekly", off: "15% off", note: "Most popular for families" },
                { freq: "Bi-Weekly", off: "10% off", note: "Great for couples + pets" },
                { freq: "Monthly", off: "5% off", note: "Light upkeep cadence" },
              ].map((r) => (
                <Card key={r.freq}>
                  <CardContent className="p-5">
                    <p className="font-display text-lg font-semibold text-foreground">{r.freq}</p>
                    <p className="text-2xl font-bold text-primary my-2">{r.off}</p>
                    <p className="text-sm text-muted-foreground">{r.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to="/pricing">Get Free Estimate</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why choose */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="font-display text-3xl font-bold text-center text-foreground mb-10">
              {f("why_title", "Why Families Choose Design Cleaning")}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {WHY.map((w, i) => (
                <Card key={i}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <w.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="font-semibold text-foreground mb-2">
                      {f(`why_${i + 1}_title`, w.title)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {f(`why_${i + 1}_desc`, w.desc)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {f("final_cta_headline", "Take Cleaning Off Your To-Do List")}
            </h2>
            <p className="text-primary-foreground/85 mb-8">
              {f("final_cta_subhead", "Free estimate in 60 seconds. No obligation, no pressure — just a clean home.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to="/pricing">Get Free Estimate</Link>
              </Button>
              <Button
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent"
                asChild
              >
                <Link to="/booking">Book Now</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ResidentialPage;
