import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import Services from "@/components/Services";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface CityLandingProps {
  cityName: string;
  slug: string;
}

const CityLandingPage = ({ cityName, slug }: CityLandingProps) => {
  const testimonials = [
    { name: "Amanda R.", text: "Design Cleaning made the whole experience so easy. My home was spotless!", rating: 5 },
    { name: "James T.", text: "Professional, reliable, and the results are consistently excellent.", rating: 5 },
  ];

  return (
    <>
      <SEOSchema
        pageTitle={`House Cleaning in ${cityName} | Design Cleaning`}
        pageDescription={`Professional home cleaning in ${cityName}. Standard, deep, and move-in/out cleaning. Book online in minutes. Call [PHONE].`}
        canonicalUrl={`https://[DOMAIN]/${slug}-cleaning`}
        pageType="city"
        cityName={cityName}
      />
      <main id="main-content" className="min-h-screen">
        <Navbar />
        <div className="pt-16">
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">House Cleaning in {cityName}</h1>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
                Design Cleaning proudly serves {cityName} with reliable, professional home cleaning services. Book online in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-lg" asChild>
                  <Link to="/booking" className="flex items-center gap-2">
                    Book Your {cityName} Cleaning Today
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <Services />

          <section className="py-20 bg-muted">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
                What {cityName} Residents Say
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {testimonials.map((t, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <div className="flex gap-1 mb-3">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-foreground mb-4">"{t.text}"</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{t.name} · {cityName}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default CityLandingPage;
