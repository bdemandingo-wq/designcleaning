import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <span className="font-display text-xl font-bold block mb-4">Design Cleaning</span>
            <p className="text-background/70 text-sm mb-4">
              Professional Home Cleaning Made Simple.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:[PHONE_DIGITS]" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Phone className="w-4 h-4" />
                [PHONE]
              </a>
              <a href="mailto:[EMAIL]" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Mail className="w-4 h-4" />
                [EMAIL]
              </a>
              <p className="flex items-center gap-2 text-background/70">
                <MapPin className="w-4 h-4" />
                [CITY], [STATE]
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="text-background/70 hover:text-background transition-colors">Standard Cleaning</Link></li>
              <li><Link to="/services" className="text-background/70 hover:text-background transition-colors">Deep Cleaning</Link></li>
              <li><Link to="/services" className="text-background/70 hover:text-background transition-colors">Move In/Out</Link></li>
              <li><Link to="/services" className="text-background/70 hover:text-background transition-colors">Recurring Cleaning</Link></li>
              <li><Link to="/membership" className="text-background/70 hover:text-background transition-colors">Membership Plans</Link></li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-display font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/[CITY_1_SLUG]-cleaning" className="text-background/70 hover:text-background transition-colors">[CITY_1]</Link></li>
              <li><Link to="/[CITY_2_SLUG]-cleaning" className="text-background/70 hover:text-background transition-colors">[CITY_2]</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-background/70 hover:text-background transition-colors">About</Link></li>
              <li><Link to="/booking" className="text-background/70 hover:text-background transition-colors">Booking</Link></li>
              <li><Link to="/contact" className="text-background/70 hover:text-background transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-background/70 hover:text-background transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-background/70 hover:text-background transition-colors">Careers</Link></li>
              <li><Link to="/sitemap" className="text-background/70 hover:text-background transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/70 text-sm">
            © {new Date().getFullYear()} Design Cleaning. All rights reserved. Licensed & Insured | Professional & Reliable
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
