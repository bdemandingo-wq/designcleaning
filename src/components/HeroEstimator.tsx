import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

const serviceEstimates: Record<string, Record<string, string>> = {
  standard: { studio: "$108–$140", "1br": "$120–$155", "2br": "$155–$190", "3br": "$190–$260", "4br": "$260–$345", "5br": "$345–$510" },
  deep: { studio: "$208–$240", "1br": "$220–$255", "2br": "$255–$290", "3br": "$290–$360", "4br": "$360–$470", "5br": "$470–$635" },
  moveinout: { studio: "$280–$315", "1br": "$280–$315", "2br": "$315–$350", "3br": "$350–$420", "4br": "$420–$530", "5br": "$530–$695" },
  airbnb: { studio: "$140–$160", "1br": "$160–$180", "2br": "$180–$200", "3br": "$200–$240", "4br": "$240–$295", "5br": "$295–$470" },
  upholstery: { studio: "Custom", "1br": "Custom", "2br": "Custom", "3br": "Custom", "4br": "Custom", "5br": "Custom" },
  office: { studio: "Custom", "1br": "Custom", "2br": "Custom", "3br": "Custom", "4br": "Custom", "5br": "Custom" },
  postconstruction: { studio: "$450–$502", "1br": "$502–$555", "2br": "$555–$607", "3br": "$607–$712", "4br": "$712–$877", "5br": "$877–$1,290" },
};

const HeroEstimator = () => {
  const [service, setService] = useState("standard");
  const [size, setSize] = useState("2br");

  const estimate = useMemo(() => {
    return serviceEstimates[service]?.[size] || "Custom";
  }, [service, size]);

  const isCustom = estimate === "Custom";

  return (
    <Card className="shadow-elevated border-0 bg-card">
      <CardContent className="p-3 sm:p-6 space-y-2 sm:space-y-4">
        <div className="text-center mb-0 sm:mb-2">
          <h3 className="font-display text-base sm:text-lg font-bold text-foreground">Instant Price Estimator</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">Get your estimate in seconds</p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <div>
            <label className="text-xs sm:text-sm font-medium text-foreground mb-0.5 sm:mb-1 block">Service Type</label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger className="bg-background h-9 sm:h-10 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Cleaning</SelectItem>
                <SelectItem value="deep">Deep Cleaning</SelectItem>
                <SelectItem value="moveinout">Move In/Out</SelectItem>
                <SelectItem value="airbnb">Airbnb / Vacation Rental</SelectItem>
                <SelectItem value="upholstery">Upholstery Cleaning</SelectItem>
                <SelectItem value="office">Office Cleaning</SelectItem>
                <SelectItem value="postconstruction">Post-Construction</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-medium text-foreground mb-0.5 sm:mb-1 block">Home Size</label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className="bg-background h-9 sm:h-10 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="1br">1 Bedroom</SelectItem>
                <SelectItem value="2br">2 Bedrooms</SelectItem>
                <SelectItem value="3br">3 Bedrooms</SelectItem>
                <SelectItem value="4br">4 Bedrooms</SelectItem>
                <SelectItem value="5br">5+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-primary/5 rounded-lg p-2.5 sm:p-4 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground mb-0.5">Estimated Price</p>
          <p className="text-xl sm:text-2xl font-bold text-primary">
            {isCustom ? "Request Quote" : `From ${estimate}`}
          </p>
        </div>

        <Button
          size="default"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold group text-sm sm:text-base h-9 sm:h-11"
          asChild
        >
          <a href="#booking" className="flex items-center justify-center gap-2">
            {isCustom ? "Get Custom Quote" : "See My Price"}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>

        <p className="text-[10px] sm:text-xs text-center text-muted-foreground">
          No credit card. No commitment. Instant estimate.
        </p>
      </CardContent>
    </Card>
  );
};

export default HeroEstimator;
