import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Sitemap = () => {
  const services = [
    { name: "Standard Cleaning", path: "/services" },
    { name: "Deep Cleaning", path: "/services" },
    { name: "Move-In/Out Cleaning", path: "/services" },
    { name: "Recurring Cleaning", path: "/services" },
    { name: "Membership Plans", path: "/membership" },
  ];

  const areas = [
    { name: "[CITY_1]", path: "/[CITY_1_SLUG]-cleaning" },
    { name: "[CITY_2]", path: "/[CITY_2_SLUG]-cleaning" },
  ];

  const pages = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Membership", path: "/membership" },
    { name: "About", path: "/about" },
    { name: "Booking", path: "/booking" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
    { name: "Service Areas", path: "/service-areas" },
  ];

  return (
    <>
      <Helmet>
        <title>Sitemap | Design Cleaning</title>
        <meta name="description" content="Complete sitemap for Design Cleaning. Find all our service pages and area locations." />
        <link rel="canonical" href="https://[DOMAIN]/sitemap" />
      </Helmet>
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Sitemap</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Navigate all pages and services offered by Design Cleaning.</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Main Pages</h2>
                <ul className="space-y-2">{pages.map(p => <li key={p.path + p.name}><Link to={p.path} className="text-primary hover:underline">{p.name}</Link></li>)}</ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Our Services</h2>
                <ul className="space-y-2">{services.map(s => <li key={s.name}><Link to={s.path} className="text-primary hover:underline">{s.name}</Link></li>)}</ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Service Areas</h2>
                <ul className="space-y-2">{areas.map(a => <li key={a.path}><Link to={a.path} className="text-primary hover:underline">{a.name}</Link></li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Ready For A Cleaner Home?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90">Book Now</Link>
              <a href="tel:[PHONE_DIGITS]" className="inline-flex items-center justify-center px-6 py-3 border-2 border-border text-foreground font-semibold rounded-lg hover:bg-muted">Call [PHONE]</a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Sitemap;
