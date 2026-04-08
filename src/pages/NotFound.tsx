import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Phone, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | Design Cleaning</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="The page you're looking for doesn't exist. Design Cleaning offers professional house cleaning in Gaithersburg, MD & Washington DC." />
      </Helmet>
      
      <div className="flex min-h-screen items-center justify-center bg-muted px-4">
        <div className="text-center max-w-lg">
          <h1 className="font-display text-6xl font-bold text-foreground mb-4">404</h1>
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8">
            Design Cleaning — professional house cleaning in Gaithersburg, MD & Washington DC. 
            Let's get you back on track!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="tel:2029359934" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call (202) 935-9934
              </a>
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/service-areas" className="text-primary hover:underline">Gaithersburg</Link>
              <Link to="/service-areas" className="text-primary hover:underline">Silver Spring</Link>
              <Link to="/service-areas" className="text-primary hover:underline">Rockville</Link>
              <Link to="/#booking" className="text-primary hover:underline">Book Now</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
