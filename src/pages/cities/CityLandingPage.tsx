import { Link } from "react-router-dom";
import { Phone, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";

interface CityLandingPageProps {
  cityName: string;
  citySlug: string;
}

const CityLandingPage = ({ cityName, citySlug }: CityLandingPageProps) => {
  const services = [
    { name: "Standard Cleaning", desc: "Routine maintenance cleaning to keep your home fresh.", price: "[STD_PRICE]" },
    { name: "Deep Cleaning", desc: "Thorough top-to-bottom clean for homes that need extra attention.", price: "[DEEP_PRICE]" },
    { name: "Move-In / Move-Out", desc: "Get your full deposit back or move into a spotless space.", price: "[MOVE_PRICE]" },
    { name: "Recurring Cleaning", desc: "Consistent, automated cleaning on your schedule.", price: "Membership Pricing" },
  ];

  return (
    <>
      <SEOSchema
        pageTitle={`House Cleaning in ${cityName} | Design Cleaning`}
        pageDescription={`Professional home cleaning in ${cityName}. Standard, deep, move-in/out & recurring plans. Book online in minutes. Call [PHONE].`}
        canonicalUrl={`https://[DOMAIN]/${citySlug}-cleaning`}
        pageType="city"
        cityName={cityName}
        breadcrumbs={[
          { name: "Home", url: "https://[DOMAIN]" },
          { name: "Service Areas", url: "https://[DOMAIN]/service-areas" },
          { name: cityName, url: `https://[DOMAIN]/${citySlug}-cleaning` },
        ]}
      />
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/15 text-primary border border-primary/30 px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" /><span className="text-sm font-medium">{cityName}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              House Cleaning in {cityName}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Design Cleaning provides professional, reliable home cleaning services in {cityName}. Book online in minutes — simple pricing, no hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild><Link to="/booking">Book Your {cityName} Cleaning</Link></Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:[PHONE_DIGITS]">Call [PHONE]</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Our Services in {cityName}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-center mb-12">From routine maintenance to deep cleans — we handle it all.</p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {services.map((service) => (
                <div key={service.name} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{service.name}</h3>
                  <p className="text-muted-foreground mb-3">{service.desc}</p>
                  <p className="text-primary font-semibold mb-4">From {service.price}</p>
                  <Button asChild className="w-full"><Link to="/booking">Book Now</Link></Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Why {cityName} Chooses Design Cleaning</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {["Vetted, background-checked professionals", "Simple online booking — no phone call needed", "Transparent pricing with no hidden fees", "Reliable, on-time scheduling", "Structured cleaning checklist", "Easy communication before & after"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold mb-4">Book Your {cityName} Cleaning Today</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">Professional home cleaning made simple.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild><Link to="/booking">Book Now</Link></Button>
              <Button size="lg" className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold" asChild>
                <a href="tel:[PHONE_DIGITS]">Call [PHONE]</a>
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default CityLandingPage;
