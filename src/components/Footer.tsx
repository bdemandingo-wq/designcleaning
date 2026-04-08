import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Shield, Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-xl font-bold">Pleasant Cleanings</span>
            </div>
            <p className="text-background/70 text-sm mb-2">
              Quality, Consistency & Customer Satisfaction — Every Time.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+17867967445" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Phone className="w-4 h-4" />
                (786) 796-7445
              </a>
              <a href="mailto:support@pleasantcleanings.com" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Mail className="w-4 h-4" />
                support@pleasantcleanings.com
              </a>
              <p className="flex items-center gap-2 text-background/70">
                <MapPin className="w-4 h-4" />
                Pembroke Pines, FL
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/standard-cleaning" className="text-background/70 hover:text-background transition-colors">Standard Cleaning</Link></li>
              <li><Link to="/deep-cleaning" className="text-background/70 hover:text-background transition-colors">Deep Cleaning</Link></li>
              <li><Link to="/move-in-out-cleaning" className="text-background/70 hover:text-background transition-colors">Move In/Out</Link></li>
              <li><Link to="/#booking" className="text-background/70 hover:text-background transition-colors">Airbnb Cleaning</Link></li>
              <li><Link to="/upholstery-cleaning" className="text-background/70 hover:text-background transition-colors">Upholstery Cleaning</Link></li>
              <li><Link to="/#booking" className="text-background/70 hover:text-background transition-colors">Office Cleaning</Link></li>
              <li><Link to="/#booking" className="text-background/70 hover:text-background transition-colors">Post-Construction</Link></li>
            </ul>
          </div>

          {/* Broward County */}
          <div>
            <h3 className="font-display font-semibold mb-4">Broward County</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/pembroke-pines-cleaning" className="text-background/70 hover:text-background transition-colors">Pembroke Pines</Link></li>
              <li><Link to="/miramar-cleaning" className="text-background/70 hover:text-background transition-colors">Miramar</Link></li>
              <li><Link to="/coral-springs-cleaning" className="text-background/70 hover:text-background transition-colors">Coral Springs</Link></li>
              <li><Link to="/davie-cleaning" className="text-background/70 hover:text-background transition-colors">Davie</Link></li>
              <li><Link to="/sunrise-cleaning" className="text-background/70 hover:text-background transition-colors">Sunrise</Link></li>
              <li><Link to="/doral-cleaning" className="text-background/70 hover:text-background transition-colors">Doral</Link></li>
            </ul>
          </div>

          {/* More Cities */}
          <div>
            <h3 className="font-display font-semibold mb-4">More Cities</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/aventura-cleaning" className="text-background/70 hover:text-background transition-colors">Aventura</Link></li>
              <li><Link to="/coral-gables-cleaning" className="text-background/70 hover:text-background transition-colors">Coral Gables</Link></li>
              <li><Link to="/boca-raton-cleaning" className="text-background/70 hover:text-background transition-colors">Boca Raton</Link></li>
              <li><Link to="/homestead-cleaning" className="text-background/70 hover:text-background transition-colors">Homestead</Link></li>
              <li><Link to="/coconut-grove-cleaning" className="text-background/70 hover:text-background transition-colors">Coconut Grove</Link></li>
              <li><Link to="/miami-beach-cleaning" className="text-background/70 hover:text-background transition-colors">Miami Beach</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/service-areas" className="text-background/70 hover:text-background transition-colors">Service Areas</Link></li>
              <li><Link to="/faq" className="text-background/70 hover:text-background transition-colors">FAQ</Link></li>
              <li><Link to="/blog" className="text-background/70 hover:text-background transition-colors">Blog & Tips</Link></li>
              <li><Link to="/apply" className="text-background/70 hover:text-background transition-colors">Join Our Team</Link></li>
              <li><Link to="/sitemap" className="text-background/70 hover:text-background transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        {/* Trust signals */}
        <div className="border-t border-background/20 py-6 mb-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-background/70">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              <span>Eco-Friendly</span>
            </div>
            <span>Serving South Florida</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-6 pb-20 md:pb-16 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 relative z-50">
          <p className="text-background/70 text-sm">
            © {new Date().getFullYear()} Pleasant Cleanings. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/sitemap" className="text-background/70 hover:text-background transition-colors">Sitemap</Link>
            <Link to="/auth" className="text-background/70 hover:text-background transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
