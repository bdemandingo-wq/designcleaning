import { Link } from "react-router-dom";
import { MapPin, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import StickyCallButton from "@/components/seo/StickyCallButton";

const serviceAreas = [
  { name: "Pembroke Pines", link: "/pembroke-pines-cleaning", desc: "Pembroke Lakes, Century Village, Silver Lakes, Chapel Trail" },
  { name: "Miramar", link: "/miramar-cleaning", desc: "Silver Shores, Sunset Lakes, Riviera Isles, Huntington" },
  { name: "Coral Springs", link: "/coral-springs-cleaning", desc: "Heron Bay, Eagle Trace, Wyndham, Riverside Park" },
  { name: "Aventura", link: "/aventura-cleaning", desc: "Turnberry, Williams Island, Mystic Pointe, Porto Vita" },
  { name: "Doral", link: "/doral-cleaning", desc: "Downtown Doral, Doral Isles, Costa del Sol, Midtown Doral" },
  { name: "Boca Raton", link: "/boca-raton-cleaning", desc: "Boca West, Woodfield, Mizner Park, Town Center" },
  { name: "Coral Gables", link: "/coral-gables-cleaning", desc: "Riviera, Cocoplum, Gables Estates, South Gables" },
  { name: "Sunrise", link: "/sunrise-cleaning", desc: "Sawgrass Mills, Sunrise Lakes, Welleby, Nob Hill" },
  { name: "Davie", link: "/davie-cleaning", desc: "Pine Island Ridge, Rolling Hills, Nova Southeastern" },
  { name: "Homestead", link: "/homestead-cleaning", desc: "Keys Gate, Silver Palm, Leisure City, Redland" },
  { name: "Coconut Grove", link: "/coconut-grove-cleaning", desc: "Center Grove, North Grove, South Grove" },
  { name: "Miami Beach", link: "/miami-beach-cleaning", desc: "South Beach, Mid-Beach, North Beach, Surfside" },
];

const ServiceAreas = () => {
  return (
    <>
      <SEOSchema
        pageTitle="House Cleaning Service Areas | 12+ South Florida Cities | Pleasant Cleanings"
        pageDescription="Looking for house cleaning near you in South Florida? Pleasant Cleanings serves 12+ cities including Pembroke Pines, Miramar, Coral Springs & more. Call (786) 796-7445."
        canonicalUrl="https://pleasantcleanings.com/service-areas"
        pageType="service"
        breadcrumbs={[
          { name: "Home", url: "https://pleasantcleanings.com" },
          { name: "Service Areas", url: "https://pleasantcleanings.com/service-areas" }
        ]}
      />
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/15 text-primary border border-primary/30 px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" /><span className="text-sm font-medium">South Florida</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Our Service Areas</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
              Pleasant Cleanings serves homeowners across 12+ South Florida cities in Broward County, Palm Beach County, and Miami-Dade County.
            </p>
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
              <a href="tel:+17867967445" className="flex items-center gap-2"><Phone className="w-5 h-5" />Call (786) 796-7445</a>
            </Button>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {serviceAreas.map((area) => (
                <Link key={area.name} to={area.link} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-md transition-all group">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{area.name}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{area.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">Serving Pembroke Pines & South Florida</h2>
            <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114964.3!2d-80.35!3d25.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9a7b9f7e3f2e5%3A0x1d73f2e0aaabd4e8!2sPembroke%20Pines%2C%20FL!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy"
                title="Pleasant Cleanings Service Area Map - South Florida"
              />
            </div>
            <p className="text-center mt-6 text-muted-foreground">
              Don't see your area? <a href="tel:+17867967445" className="text-primary font-medium hover:underline">Call us</a> — we may still serve you!
            </p>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold mb-4">Ready to Book Your Cleaning?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">Get a free quote in minutes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild><Link to="/#booking">Get Free Quote</Link></Button>
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
                <a href="tel:+17867967445">Call (786) 796-7445</a>
              </Button>
            </div>
          </div>
        </section>
        <Footer />
        <StickyCallButton />
      </main>
    </>
  );
};

export default ServiceAreas;
