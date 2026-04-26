import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, CheckCircle, ChevronDown, Briefcase, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import { useServiceAreas, type ServiceArea } from "@/hooks/useServiceAreas";
import { useSiteContent } from "@/hooks/useSiteContent";

const TIER_META: Record<string, { title: string; subtitle: string }> = {
  core: {
    title: "Core Service Area",
    subtitle: "Our 5 home-base cities.",
  },
  extended_md: {
    title: "Extended Maryland",
    subtitle: "Nearby Montgomery & Prince George's County cities.",
  },
  dc: {
    title: "Washington DC",
    subtitle: "Full DC coverage.",
  },
  nova: {
    title: "Northern Virginia",
    subtitle: "Arlington, Alexandria, McLean, and surrounding NoVA.",
  },
};

const TIER_ORDER = ["core", "extended_md", "dc", "nova"];

const ServiceAreas = () => {
  const { areas, loading } = useServiceAreas(true);
  const { get } = useSiteContent();

  const intro = get(
    "service_areas_intro",
    "Design Cleaning proudly serves Maryland, Washington DC, and Northern Virginia. Same vetted cleaners, same transparent pricing, every city."
  );
  const commercialNote = get("service_areas_commercial_note", "");

  const tierGroups = useMemo(() => {
    const buckets: Record<string, ServiceArea[]> = {};
    areas.forEach((a) => {
      const t = TIER_META[a.tier] ? a.tier : "extended_md";
      (buckets[t] ||= []).push(a);
    });
    return TIER_ORDER.filter((t) => buckets[t]?.length).map((t) => ({
      tier: t,
      items: buckets[t],
    }));
  }, [areas]);

  return (
    <>
      <SEOSchema
        pageTitle="Service Areas | Design Cleaning DMV — MD, DC, Northern VA"
        pageDescription="Design Cleaning serves the entire DMV: Maryland, Washington DC, and Northern Virginia. Transparent, all-inclusive pricing in your free estimate."
        canonicalUrl="https://designcleaningdmv.com/service-areas"
        pageType="service"
        breadcrumbs={[
          { name: "Home", url: "https://designcleaningdmv.com" },
          { name: "Service Areas", url: "https://designcleaningdmv.com/service-areas" },
        ]}
      />
      <main className="min-h-screen">
        <Navbar />

        {/* Hero */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/15 text-primary border border-primary/30 px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">DMV Region — MD, DC, NoVA</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Service Areas
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">{intro}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
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

        {/* Core 5 cities — promoted */}
        {!loading && tierGroups.find((g) => g.tier === "core") && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                  {TIER_META.core.title}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">{TIER_META.core.subtitle}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                {tierGroups.find((g) => g.tier === "core")!.items.map((area) => (
                  <Link
                    key={area.id}
                    to={`/${area.slug}`}
                    className="bg-card border border-border rounded-xl p-5 text-center hover:border-primary/60 hover:shadow-md transition-all group"
                  >
                    <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
                    <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {area.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">Home-base city</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Extended coverage — accordion per tier */}
        {!loading && tierGroups.filter((g) => g.tier !== "core").length > 0 && (
          <section className="py-16 bg-muted/40">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                  Extended Coverage
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Tap any city for local details and to view the full landing page.
                </p>
              </div>

              <div className="space-y-8">
                {tierGroups
                  .filter((g) => g.tier !== "core")
                  .map((group) => (
                    <div key={group.tier}>
                      <div className="mb-4">
                        <h3 className="font-display text-xl font-semibold text-foreground">
                          {TIER_META[group.tier]?.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {TIER_META[group.tier]?.subtitle}
                        </p>
                      </div>
                      <Accordion type="multiple" className="bg-card border border-border rounded-xl">
                        {group.items.map((area) => (
                          <CityAccordionItem key={area.id} area={area} />
                        ))}
                      </Accordion>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* Pricing transparency */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full mb-3 text-sm font-medium">
              <DollarSign className="w-4 h-4" /> Transparent Pricing
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              All-inclusive quotes. No surprises.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Your free estimate includes everything — your final price is exactly what you'll pay.
            </p>
          </div>
        </section>

        {/* Commercial note */}
        {commercialNote && (
          <section className="py-12 bg-muted/40">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Commercial & Office — Same Territory
                  </h3>
                  <p className="text-muted-foreground mb-4">{commercialNote}</p>
                  <Button asChild variant="outline">
                    <Link to="/commercial">View Commercial Cleaning →</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">
              Service Area FAQ
            </h2>
            <Accordion type="single" collapsible className="bg-card border border-border rounded-xl">
              {[1, 2, 3, 4].map((i) => {
                const q = get(`service_areas_faq_q${i}`, "");
                const a = get(`service_areas_faq_a${i}`, "");
                if (!q) return null;
                return (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-b last:border-b-0 px-6">
                    <AccordionTrigger className="text-left font-semibold">{q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold mb-4">Ready to Book Your Cleaning?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Get a free, all-inclusive estimate in 60 seconds — your price is your price.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/pricing">Get Free Estimate</Link>
              </Button>
              <Button
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold bg-transparent"
                asChild
              >
                <a href="tel:2029359934">Call (202) 935-9934</a>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

const CityAccordionItem = ({ area }: { area: ServiceArea }) => {
  const { get } = useSiteContent();
  const intro = get(
    `city_${area.slug}_intro`,
    `Professional home cleaning in ${area.name}. Vetted cleaners, transparent pricing, easy online booking.`
  );
  return (
    <AccordionItem value={area.id} className="border-b last:border-b-0 px-5">
      <AccordionTrigger className="text-left">
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-semibold text-foreground">{area.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <p className="text-muted-foreground mb-4">{intro}</p>
        <div className="flex flex-wrap gap-3">
          <Button size="sm" asChild>
            <Link to={`/${area.slug}`}>View {area.name} page →</Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link to="/pricing">Get Estimate</Link>
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ServiceAreas;
