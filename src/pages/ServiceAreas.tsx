import { Link } from "react-router-dom";
import { MapPin, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";

const serviceAreas = [
  { name: "Gaithersburg", link: "/gaithersburg-cleaning", desc: "Reliable home cleaning in Gaithersburg, MD." },
  { name: "Washington DC", link: "/washington-dc-cleaning", desc: "Professional cleaning in the nation's capital." },
  { name: "Silver Spring", link: "/silver-spring-cleaning", desc: "Trusted home cleaning in Silver Spring, MD." },
  { name: "Rockville", link: "/rockville-cleaning", desc: "Dependable cleaning services in Rockville, MD." },
  { name: "Bethesda", link: "/bethesda-cleaning", desc: "Premium home cleaning in Bethesda, MD." },
  { name: "Germantown", link: "/germantown-cleaning", desc: "Professional cleaning in Germantown, MD." },
  { name: "Potomac", link: "/potomac-cleaning", desc: "Premium home cleaning in Potomac, MD." },
  { name: "Bowie", link: "/bowie-cleaning", desc: "Reliable home cleaning in Bowie, MD." },
  { name: "College Park", link: "/college-park-cleaning", desc: "Professional cleaning in College Park, MD." },
  { name: "Laurel", link: "/laurel-cleaning", desc: "Trusted home cleaning in Laurel, MD." },
];

const ServiceAreas = () => {
  return (
    <>
      <SEOSchema
        pageTitle="Service Areas | Design Cleaning"
        pageDescription="Design Cleaning serves Gaithersburg, Washington DC, Silver Spring, Rockville, Bethesda & Germantown. Book professional home cleaning online."
        canonicalUrl="https://designcleaningdmv.com/service-areas"
        pageType="service"
        breadcrumbs={[
          { name: "Home", url: "https://designcleaningdmv.com" },
          { name: "Service Areas", url: "https://designcleaningdmv.com/service-areas" }
        ]}
      />
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/15 text-primary border border-primary/30 px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" /><span className="text-sm font-medium">DMV Region</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Our Service Areas</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
              Design Cleaning proudly serves homeowners across Montgomery County, Prince George's County, and the greater DMV region.
            </p>
            <Button size="lg" asChild>
              <a href="tel:2029359934" className="flex items-center gap-2"><Phone className="w-5 h-5" />Call (202) 935-9934</a>
            </Button>
          </div>
        </section>

        <section className="py-20">
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

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold mb-4">Ready to Book Your Cleaning?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">Get a free quote in minutes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild><Link to="/booking">Get Free Quote</Link></Button>
              <Button size="lg" className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold bg-transparent" asChild>
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

export default ServiceAreas;
