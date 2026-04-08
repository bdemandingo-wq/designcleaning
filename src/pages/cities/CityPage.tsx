import { Link } from "react-router-dom";
import { Phone, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import CityPageNavigation from "@/components/seo/CityPageNavigation";
import RelatedLinks from "@/components/seo/RelatedLinks";

interface CityPageProps {
  city: string;
  slug: string;
  neighborhoods: string[];
  description: string;
}

const CityPage = ({ city, slug, neighborhoods, description }: CityPageProps) => {
  return (
    <>
      <SEOSchema
        pageTitle={`House Cleaning in ${city} | Pleasant Cleanings`}
        pageDescription={`Professional house cleaning in ${city}, FL. Pleasant Cleanings delivers quality cleaning with consistency and care. Call (786) 796-7445.`}
        canonicalUrl={`https://pleasantcleanings.com/${slug}`}
        pageType="county"
        county={city}
      />
      <main className="min-h-screen">
        <Navbar />
        <section className="relative min-h-[60vh] flex items-center justify-center pt-16 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span className="text-sm font-medium">Top-Rated in {city}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              House Cleaning in {city}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-8">{description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
                <a href="tel:+17867967445" className="flex items-center gap-2"><Phone className="w-5 h-5" />Call (786) 796-7445</a>
              </Button>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold" asChild><Link to="/#booking">Get Free Quote</Link></Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Licensed & Insured</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Eco-Friendly Products</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Satisfaction Guaranteed</span>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">{city} Neighborhoods We Serve</h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {neighborhoods.map((area) => (
                <span key={area} className="bg-card px-4 py-2 rounded-full text-sm text-foreground border border-border">{area}</span>
              ))}
            </div>
            <p className="text-center mt-8 text-muted-foreground">
              Also serving all of <Link to="/service-areas" className="text-primary hover:underline">South Florida</Link>.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">Why {city} Residents Choose Pleasant Cleanings</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { title: "Local Expertise", desc: `We know ${city} homes inside and out. Our cleaners understand the unique needs of South Florida living.` },
                { title: "Flexible Scheduling", desc: `Book weekly, bi-weekly, or one-time cleanings. Same-day availability for urgent needs throughout ${city}.` },
                { title: "Satisfaction Guaranteed", desc: `Not happy? We'll re-clean for free. Our ${city} customers consistently rate us 5 stars.` },
              ].map((item) => (
                <div key={item.title} className="text-center p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CityPageNavigation currentCity={city} />
        <RelatedLinks currentPage={`/${slug}`} pageType="city" cityName={city} />
        <Footer />
      </main>
    </>
  );
};

export default CityPage;
