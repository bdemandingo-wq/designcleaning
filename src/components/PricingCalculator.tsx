import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Pricing tiers based on square footage
const pricingTiers = [
  { maxSqft: 750, label: "Up to 750 sf" },
  { maxSqft: 1000, label: "Up to 1000 sf" },
  { maxSqft: 1250, label: "Up to 1250 sf" },
  { maxSqft: 1500, label: "Up to 1500 sf" },
  { maxSqft: 1800, label: "Up to 1800 sf" },
  { maxSqft: 2100, label: "Up to 2100 sf" },
  { maxSqft: 2400, label: "Up to 2400 sf" },
  { maxSqft: 2700, label: "Up to 2700 sf" },
  { maxSqft: 3000, label: "Up to 3000 sf" },
  { maxSqft: 3300, label: "Up to 3300 sf" },
  { maxSqft: 3600, label: "Up to 3600 sf" },
  { maxSqft: 4000, label: "Up to 4000 sf" },
  { maxSqft: 4400, label: "Up to 4400 sf" },
];

// Service types with pricing per tier (matching the reference table)
const serviceTypes = [
  { 
    value: "deep", 
    label: "Deep Clean (First Cleaning)", 
    prices: [208, 243, 278, 313, 348, 383, 438, 493, 548, 603, 658, 713, 768]
  },
  { 
    value: "standard", 
    label: "Standard Clean", 
    prices: [108, 143, 178, 213, 248, 283, 313, 368, 423, 478, 533, 588, 643]
  },
  { 
    value: "moveinout", 
    label: "Move In/Move Out Clean", 
    prices: [283, 318, 353, 388, 423, 458, 513, 568, 623, 678, 733, 788, 843]
  },
  { 
    value: "construction", 
    label: "Construction Clean Up", 
    prices: [450, 502, 555, 607, 660, 712, 795, 877, 960, 1042, 1125, 1207, 1290]
  },
  { 
    value: "airbnb", 
    label: "Airbnb/Short-Term Rental", 
    prices: [140, 160, 180, 200, 220, 240, 265, 295, 330, 365, 400, 435, 470]
  },
  { 
    value: "carpets", 
    label: "Carpets (Custom)", 
    prices: null,
    isCustom: true
  },
  { 
    value: "upholstery", 
    label: "Upholstery (Custom)", 
    prices: null,
    isCustom: true
  },
];

const frequencies = [
  { value: "onetime", label: "One-Time", discount: 0 },
  { value: "weekly", label: "Weekly (15% off)", discount: 0.15 },
  { value: "biweekly", label: "Bi-Weekly (10% off)", discount: 0.10 },
  { value: "monthly", label: "Monthly (5% off)", discount: 0.05 },
];

const addOns = [
  { id: "windows", label: "Windows", price: 30 },
  { id: "appliances", label: "Appliances", price: 50 },
  { id: "baseboards", label: "Baseboards", price: 40 },
  { id: "walls", label: "Walls", price: 25 },
  { id: "carpets", label: "Carpets", price: 0, isCustom: true },
  { id: "laundry", label: "Wash, Dry & Fold (per load)", price: 40 },
  { id: "dishes", label: "Dishes", price: 15 },
];

// Helper function to get price based on sqft tier
const getPriceForSqft = (sqft: number, prices: number[]): number => {
  for (let i = 0; i < pricingTiers.length; i++) {
    if (sqft <= pricingTiers[i].maxSqft) {
      return prices[i];
    }
  }
  // If over max tier, use highest price
  return prices[prices.length - 1];
};

const PricingCalculator = () => {
  const navigate = useNavigate();
  const [sqft, setSqft] = useState([1500]);
  const [serviceType, setServiceType] = useState("standard");
  const [frequency, setFrequency] = useState("onetime");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const selectedService = serviceTypes.find((s) => s.value === serviceType)!;
  const selectedFrequency = frequencies.find((f) => f.value === frequency)!;
  const isCustomService = 'isCustom' in selectedService && selectedService.isCustom;

  const totalPrice = useMemo(() => {
    // Custom services don't have a calculated price
    if (isCustomService || !selectedService.prices) {
      return null;
    }
    
    // Get base price from tier
    let price = getPriceForSqft(sqft[0], selectedService.prices);

    // Add add-ons
    const addOnTotal = selectedAddOns.reduce((sum, id) => {
      const addOn = addOns.find((a) => a.id === id);
      return sum + (addOn?.price || 0);
    }, 0);

    price += addOnTotal;

    // Apply frequency discount
    price = price * (1 - selectedFrequency.discount);

    return price;
  }, [sqft, selectedService, selectedFrequency, selectedAddOns, isCustomService]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleBooking = () => {
    // GA4 conversion tracking
    if (typeof window.gtag === "function") {
      window.gtag("event", "view_item", {
        item_name: selectedService.label,
        currency: "USD",
        value: totalPrice || 0,
        event_category: "pricing_calculator",
      });
    }

    navigate("/booking", {
      state: {
        sqft: sqft[0],
        serviceType: selectedService.label,
        frequency: selectedFrequency.label,
        addOns: selectedAddOns.map(id => addOns.find(a => a.id === id)?.label).filter(Boolean),
        totalPrice: isCustomService ? "Custom Quote" : totalPrice?.toFixed(2),
      },
    });
  };

  return (
    <section id="booking" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparent Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple, upfront pricing with no hidden fees. Choose your service and book instantly.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-elevated">
          <CardHeader>
            <CardTitle className="text-xl font-display">Select Your Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Property Size Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="property-size-slider" className="text-base font-medium">Property Size</Label>
                <span className="text-lg font-bold text-primary" aria-live="polite">{sqft[0].toLocaleString()} sq ft</span>
              </div>
              <Slider
                id="property-size-slider"
                value={sqft}
                onValueChange={setSqft}
                min={500}
                max={10000}
                step={100}
                className="w-full"
                aria-label="Property size in square feet"
                aria-valuemin={500}
                aria-valuemax={10000}
                aria-valuenow={sqft[0]}
                aria-valuetext={`${sqft[0].toLocaleString()} square feet`}
              />
              <div className="flex justify-between text-sm text-muted-foreground" aria-hidden="true">
                <span>500 sq ft</span>
                <span>10,000 sq ft</span>
              </div>
            </div>

            {/* Service Type */}
            <div className="space-y-2">
              <Label htmlFor="service-type-select" className="text-base font-medium">Service Type</Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger id="service-type-select" aria-label="Select service type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Frequency */}
            <div className="space-y-2">
              <Label htmlFor="frequency-select" className="text-base font-medium">Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger id="frequency-select" aria-label="Select cleaning frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Display */}
            <div className="bg-primary/5 rounded-lg p-6 text-center">
              <p className="text-muted-foreground mb-2">
                {isCustomService ? "Pricing" : "Estimated Price"}
              </p>
              {isCustomService ? (
                <p className="text-3xl font-bold text-primary">Get Quote</p>
              ) : (
                <>
                  <p className="text-4xl font-bold text-primary">${totalPrice?.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground mt-1">+ add-ons</p>
                </>
              )}
            </div>

            {/* Add-ons - Hidden for Deep Clean since all add-ons are included */}
            {serviceType !== "deep" && (
              <div className="space-y-4">
                <Label className="text-base font-medium">Add-On Services:</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {addOns.map((addOn) => (
                    <div
                      key={addOn.id}
                      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedAddOns.includes(addOn.id)
                          ? "bg-primary/10 border-primary"
                          : "bg-background border-border hover:border-primary/50"
                      }`}
                      onClick={() => toggleAddOn(addOn.id)}
                    >
                      <Checkbox
                        id={addOn.id}
                        checked={selectedAddOns.includes(addOn.id)}
                        onCheckedChange={() => toggleAddOn(addOn.id)}
                      />
                      <label htmlFor={addOn.id} className="text-sm cursor-pointer">
                        {addOn.label} {addOn.isCustom ? "(Custom Quote)" : `($${addOn.price})`}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Book Button */}
            <Button
              size="lg"
              className="w-full text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleBooking}
            >
              {isCustomService ? "Request Quote" : "Book This Service"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingCalculator;
