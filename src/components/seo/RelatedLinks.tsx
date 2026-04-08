import { Link } from "react-router-dom";

interface RelatedLinksProps {
  currentPage: string;
  pageType: 'service' | 'city' | 'blog' | 'county';
  county?: string;
  cityName?: string;
}

const services = [
  { name: "Standard Cleaning", link: "/standard-cleaning" },
  { name: "Deep Cleaning", link: "/deep-cleaning" },
  { name: "Move In/Out Cleaning", link: "/move-in-out-cleaning" },
  { name: "Upholstery Cleaning", link: "/upholstery-cleaning" },
];

const topCities = [
  { name: "Pembroke Pines", link: "/pembroke-pines-cleaning" },
  { name: "Miramar", link: "/miramar-cleaning" },
  { name: "Coral Springs", link: "/coral-springs-cleaning" },
  { name: "Aventura", link: "/aventura-cleaning" },
  { name: "Doral", link: "/doral-cleaning" },
  { name: "Boca Raton", link: "/boca-raton-cleaning" },
];

const blogPosts = [
  { name: "Deep vs Standard Cleaning", link: "/blog/deep-cleaning-vs-standard-cleaning" },
  { name: "Move In/Out Checklist", link: "/blog/move-in-out-cleaning-checklist" },
  { name: "Pet-Friendly Cleaning Tips", link: "/blog/pet-friendly-cleaning-tips" },
  { name: "How to Prepare for Cleaning", link: "/blog/how-to-prepare-for-cleaning-service" },
  { name: "Eco-Friendly Products", link: "/blog/eco-friendly-cleaning-products" },
  { name: "Bathroom Deep Cleaning Guide", link: "/blog/bathroom-deep-cleaning-guide" },
];

const RelatedLinks = ({ currentPage, pageType, cityName }: RelatedLinksProps) => {
  const filteredServices = services.filter(s => s.link !== currentPage);
  const filteredCities = topCities.filter(c => c.link !== currentPage);
  const filteredBlogs = blogPosts.filter(b => b.link !== currentPage).slice(0, 3);

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Explore More Pleasant Cleanings Services
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
              {pageType === 'city' && cityName ? `Cleaning Services in ${cityName}` : 'Our Services'}
            </h3>
            <ul className="space-y-2">
              {filteredServices.map(service => (
                <li key={service.link}>
                  <Link to={service.link} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {pageType === 'city' && cityName ? `${cityName} ${service.name}` : service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">Service Areas</h3>
            <ul className="space-y-2">
              {filteredCities.slice(0, 5).map(city => (
                <li key={city.link}>
                  <Link to={city.link} className="text-muted-foreground hover:text-primary transition-colors text-sm">{city.name} cleaning service</Link>
                </li>
              ))}
              <li>
                <Link to="/service-areas" className="text-primary hover:underline text-sm font-medium">View all service areas →</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">From Our Blog</h3>
            <ul className="space-y-2">
              {filteredBlogs.map(post => (
                <li key={post.link}>
                  <Link to={post.link} className="text-muted-foreground hover:text-primary transition-colors text-sm">{post.name}</Link>
                </li>
              ))}
              <li>
                <Link to="/blog" className="text-primary hover:underline text-sm font-medium">More articles →</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedLinks;
