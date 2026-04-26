import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/design-cleaning-logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/residential", label: "Residential Cleaning" },
  { href: "/commercial", label: "Commercial & Office" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/pricing", label: "Pricing / Free Estimate" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to main content
      </a>
      <nav className="fixed top-0 left-0 right-0 z-[60] bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center flex-shrink-0 h-full py-4" aria-label="Design Cleaning home">
              <img
                src={logo}
                alt="Design Cleaning logo"
                className="h-full w-auto object-contain"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors whitespace-nowrap ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <a href="tel:2029359934" className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  Call
                </a>
              </Button>
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to="/booking">Book Now</Link>
              </Button>
            </div>

            <button
              className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isOpen && (
            <div className="lg:hidden py-4 border-t border-border animate-fade-in bg-background">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`transition-colors font-medium py-3 px-3 rounded min-h-[44px] flex items-center ${
                      location.pathname === link.href
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" className="flex-1 border-primary text-primary" asChild>
                    <a href="tel:2029359934" className="flex items-center justify-center gap-1.5">
                      <Phone className="w-4 h-4" />
                      Call
                    </a>
                  </Button>
                  <Button className="flex-1 bg-accent text-accent-foreground" asChild onClick={() => setIsOpen(false)}>
                    <Link to="/booking">Book Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
