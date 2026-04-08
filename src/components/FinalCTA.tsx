import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Ready For A Cleaner Home?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Book your cleaning today and let Design Cleaning handle the rest.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-6 rounded-lg" asChild>
            <a href="#booking" className="flex items-center gap-2">
              Book Your Cleaning
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-6 rounded-lg" asChild>
            <a href="tel:2029359934" className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Call (202) 935-9934
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
