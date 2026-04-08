import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyCallButton from "@/components/seo/StickyCallButton";

const Sitemap = () => {
  const services = [
    { name: "Standard Cleaning", path: "/standard-cleaning" },
    { name: "Deep Cleaning", path: "/deep-cleaning" },
    { name: "Move In/Out Cleaning", path: "/move-in-out-cleaning" },
    { name: "Airbnb Cleaning", path: "/airbnb-cleaning" },
    { name: "Upholstery Cleaning", path: "/upholstery-cleaning" },
    { name: "Office Cleaning", path: "/office-cleaning" },
    { name: "Post-Construction Cleaning", path: "/post-construction-cleaning" },
  ];

  const areas = [
    { name: "Pembroke Pines", path: "/pembroke-pines-cleaning" },
    { name: "Miramar", path: "/miramar-cleaning" },
    { name: "Coral Springs", path: "/coral-springs-cleaning" },
    { name: "Aventura", path: "/aventura-cleaning" },
    { name: "Doral", path: "/doral-cleaning" },
    { name: "Boca Raton", path: "/boca-raton-cleaning" },
    { name: "Coral Gables", path: "/coral-gables-cleaning" },
    { name: "Sunrise", path: "/sunrise-cleaning" },
    { name: "Davie", path: "/davie-cleaning" },
    { name: "Homestead", path: "/homestead-cleaning" },
    { name: "Coconut Grove", path: "/coconut-grove-cleaning" },
    { name: "Miami Beach", path: "/miami-beach-cleaning" },
  ];

  const pages = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/service-areas" },
    { name: "FAQ", path: "/faq" },
    { name: "Blog", path: "/blog" },
    { name: "Book a Cleaning", path: "/booking" },
    { name: "Join Our Team", path: "/apply" },
  ];

  return (
    <>
      <Helmet>
        <title>Sitemap | Pleasant Cleanings</title>
        <meta name="description" content="Complete sitemap for Pleasant Cleanings. Find all our service pages, area locations, and helpful blog articles." />
        <link rel="canonical" href="https://pleasantcleanings.com/sitemap" />
      </Helmet>
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Sitemap</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Navigate all pages and services offered by Pleasant Cleanings.</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Main Pages</h2>
                <ul className="space-y-2">{pages.map(p => <li key={p.path}><Link to={p.path} className="text-primary hover:underline">{p.name}</Link></li>)}</ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Our Services</h2>
                <ul className="space-y-2">{services.map(s => <li key={s.path}><Link to={s.path} className="text-primary hover:underline">{s.name}</Link></li>)}</ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Service Areas</h2>
                <ul className="space-y-2">{areas.map(a => <li key={a.path}><Link to={a.path} className="text-primary hover:underline text-sm">{a.name}</Link></li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Ready for a Sparkling Clean Home?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#booking" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90">Get Free Quote</Link>
              <a href="tel:+17867967445" className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-muted">Call (786) 796-7445</a>
            </div>
          </div>
        </section>
        <Footer />
        <StickyCallButton />
      </main>
    </>
  );
};

export default Sitemap;
