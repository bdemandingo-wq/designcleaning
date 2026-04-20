import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Star, Gift } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const Footer = () => {
  const { get } = useSiteContent();
  const googleReviewsUrl = get(
    "google_reviews_url",
    "https://www.google.com/search?q=Design+Cleaning+DMV"
  );
  const giftCardUrl = get("gift_card_url", "");

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
              <a href="tel:2029359934" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Phone className="w-4 h-4" />
                (202) 935-9934
              </a>
              <a href="mailto:DesignCleaning@proton.me" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Mail className="w-4 h-4" />
                DesignCleaning@proton.me
              </a>
              <p className="flex items-center gap-2 text-background/70">
                <MapPin className="w-4 h-4" />
                Gaithersburg, MD
              </p>
              {googleReviewsUrl && (
                <a
                  href={googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-background/70 hover:text-background transition-colors"
                >
                  <Star className="w-4 h-4" />
                  Leave a Google Review
                </a>
              )}
              {giftCardUrl && (
                <a
                  href={giftCardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-background/70 hover:text-background transition-colors"
                >
                  <Gift className="w-4 h-4" />
                  Gift Cards
                </a>
              )}
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
              <li><Link to="/gaithersburg-cleaning" className="text-background/70 hover:text-background transition-colors">Gaithersburg</Link></li>
              <li><Link to="/washington-dc-cleaning" className="text-background/70 hover:text-background transition-colors">Washington DC</Link></li>
              <li><Link to="/silver-spring-cleaning" className="text-background/70 hover:text-background transition-colors">Silver Spring</Link></li>
              <li><Link to="/rockville-cleaning" className="text-background/70 hover:text-background transition-colors">Rockville</Link></li>
              <li><Link to="/bethesda-cleaning" className="text-background/70 hover:text-background transition-colors">Bethesda</Link></li>
              <li><Link to="/germantown-cleaning" className="text-background/70 hover:text-background transition-colors">Germantown</Link></li>
              <li><Link to="/potomac-cleaning" className="text-background/70 hover:text-background transition-colors">Potomac</Link></li>
              <li><Link to="/bowie-cleaning" className="text-background/70 hover:text-background transition-colors">Bowie</Link></li>
              <li><Link to="/college-park-cleaning" className="text-background/70 hover:text-background transition-colors">College Park</Link></li>
              <li><Link to="/laurel-cleaning" className="text-background/70 hover:text-background transition-colors">Laurel</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-background/70 hover:text-background transition-colors">About</Link></li>
              <li><Link to="/our-work" className="text-background/70 hover:text-background transition-colors">Our Work</Link></li>
              <li><Link to="/blog" className="text-background/70 hover:text-background transition-colors">Blog</Link></li>
              <li><Link to="/booking" className="text-background/70 hover:text-background transition-colors">Booking</Link></li>
              <li><Link to="/contact" className="text-background/70 hover:text-background transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-background/70 hover:text-background transition-colors">FAQ</Link></li>
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
