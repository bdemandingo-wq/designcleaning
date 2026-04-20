import { Link } from "react-router-dom";
import { Phone, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import { useSiteContent } from "@/hooks/useSiteContent";

interface CityLandingPageProps {
  cityName: string;
  citySlug: string;
}

const CityLandingPage = ({ cityName, citySlug }: CityLandingPageProps) => {
  const { get } = useSiteContent();
  const introCopy = get(
    `city_${citySlug}_intro`,
    `Design Cleaning provides professional, reliable home cleaning services in ${cityName}. Book online in minutes — simple pricing, no hassle.`
  );

  const services = [
    { name: "Standard Cleaning", desc: "Routine maintenance cleaning to keep your home fresh.", price: "From $99" },
    { name: "Deep Cleaning", desc: "Thorough top-to-bottom clean for homes that need extra attention.", price: "From $149" },
    { name: "Move-In / Move-Out", desc: "Get your full deposit back or move into a spotless space.", price: "From $169" },
    { name: "Recurring Cleaning", desc: "Consistent, automated cleaning on your schedule.", price: "Membership Pricing" },
  ];

  return (
    <>
      <SEOSchema
        pageTitle={`House Cleaning in ${cityName} | Design Cleaning`}
        pageDescription={`Professional home cleaning in ${cityName}. Standard, deep, move-in/out & recurring plans. Book online in minutes. Call (202) 935-9934.`}
        canonicalUrl={`https://designcleaningdmv.com/${citySlug}-cleaning`}
        pageType="city"
        cityName={cityName}
        breadcrumbs={[
          { name: "Home", url: "https://designcleaningdmv.com" },
          { name: "Service Areas", url: "https://designcleaningdmv.com/service-areas" },
          { name: cityName, url: `https://designcleaningdmv.com/${citySlug}-cleaning` },
        ]}
      />
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-20 sm:pt-24 pb-10 sm:pb-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/15 text-primary border border-primary/30 px-4 py-2 rounded-full mb-5 sm:mb-6">
              <MapPin className="w-4 h-4" /><span className="text-sm font-medium">{cityName}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 break-words">
              House Cleaning in {cityName}
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-7 sm:mb-8">
              {introCopy}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" className="min-h-[52px] w-full sm:w-auto" asChild><Link to="/booking">Book Your {cityName} Cleaning</Link></Button>
              <Button size="lg" variant="outline" className="min-h-[52px] w-full sm:w-auto" asChild>
                <a href="tel:2029359934">Call (202) 935-9934</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center mb-3 sm:mb-4">Our Services in {cityName}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-center mb-10 sm:mb-12 text-sm sm:text-base">From routine maintenance to deep cleans — we handle it all.</p>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {services.map((service) => (
                <div key={service.name} className="bg-card border border-border rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">{service.name}</h3>
                  <p className="text-muted-foreground mb-3 text-sm sm:text-base">{service.desc}</p>
                  <p className="text-primary font-semibold mb-4">From {service.price}</p>
                  <Button asChild className="w-full min-h-[48px]"><Link to="/booking">Book Now</Link></Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center mb-10 sm:mb-12">Why {cityName} Chooses Design Cleaning</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {["Vetted, background-checked professionals", "Simple online booking — no phone call needed", "Transparent pricing with no hidden fees", "Reliable, on-time scheduling", "Structured cleaning checklist", "Easy communication before & after"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground text-sm sm:text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">Book Your {cityName} Cleaning Today</h2>
            <p className="text-primary-foreground/80 mb-7 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">Professional home cleaning made simple.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" variant="secondary" className="min-h-[52px] w-full sm:w-auto" asChild><Link to="/booking">Book Now</Link></Button>
              <Button size="lg" className="min-h-[52px] w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-primary font-semibold bg-transparent" asChild>
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

export default CityLandingPage;
