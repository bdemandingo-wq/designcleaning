import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useServicePricing, getPriceForSqft as getDbPriceForSqft } from "@/hooks/useServicePricing";

const SERVICE_MINIMUMS: Record<string, number> = {
  standard: 99,
  deep: 149,
  moveinout: 169,
  recurring: 99,
};

// Pet modifiers (same for Standard and Deep/Move-In)
const petOptions = [
  { value: "0", label: "No Pets", price: 0 },
  { value: "1", label: "1 Pet (+$15)", price: 15 },
  { value: "2", label: "2 Pets (+$30)", price: 30 },
  { value: "3", label: "3+ Pets (+$45)", price: 45 },
];

// Condition modifiers — different price for Standard vs Deep/Move-In
const conditionOptions = [
  { value: "good", label: "Good / normal upkeep", standard: 25, deep: 40 },
  { value: "fair", label: "Fair / some areas need attention", standard: 50, deep: 75 },
  { value: "needswork", label: "Needs Work / heavy effort", standard: 90, deep: 110 },
  { value: "verydirty", label: "Very Dirty / deep recovery", standard: 120, deep: 150 },
];

const frequencies = [
  { value: "onetime", label: "One-Time", discount: 0 },
  { value: "weekly", label: "Weekly (15% off)", discount: 0.15 },
  { value: "biweekly", label: "Bi-Weekly (10% off)", discount: 0.10 },
  { value: "monthly", label: "Monthly (5% off)", discount: 0.05 },
];

const addOns = [
  { id: "fridge", label: "Inside Fridge", price: 55 },
  { id: "oven", label: "Inside Oven", price: 55 },
  { id: "microwave", label: "Inside Microwave", price: 15 },
  { id: "dishwasher", label: "Inside Dishwasher", price: 20 },
  { id: "cabinets", label: "Inside Cabinets", price: 70 },
  { id: "closets", label: "Inside Closets", price: 30 },
  { id: "laundry", label: "Laundry", price: 40 },
  { id: "linen", label: "Bed Linen Change", price: 20 },
  { id: "dishes", label: "Dishes", price: 20 },
  { id: "windows", label: "Interior Windows", price: 12 },
  { id: "blinds", label: "Blinds Cleaning", price: 25 },
  { id: "wetblinds", label: "Wet Wipe Blinds / Shutters", price: 30 },
  { id: "baseboards", label: "Baseboard Deep Clean", price: 40 },
  { id: "walls", label: "Wall Spot Cleaning", price: 30 },
  { id: "ceilingfan", label: "Ceiling Fan Detail", price: 20 },
  { id: "balcony", label: "Balcony / Patio", price: 25 },
  { id: "porch", label: "Porch / Entry Sweep", price: 20 },
  { id: "garage", label: "Garage Sweep", price: 30 },
  { id: "pethair", label: "Pet Hair / Heavy Pet", price: 50 },
  { id: "heavybuild", label: "Heavy Buildup", price: 75 },
  { id: "basement", label: "Finished Basement", price: 80 },
  { id: "extrafridge", label: "Extra Fridge / Beverage Fridge", price: 30 },
  { id: "extraoven", label: "Extra Oven / Stove Detailing", price: 30 },
];

const PricingCalculator = () => {
  const navigate = useNavigate();
  const { services, loading } = useServicePricing();
  const [sqft, setSqft] = useState([1500]);
  const [serviceType, setServiceType] = useState("standard");
  const [frequency, setFrequency] = useState("onetime");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const selectedService = services.find((s) => s.value === serviceType) ?? services[0];
  const selectedFrequency = frequencies.find((f) => f.value === frequency)!;
  const minimum = selectedService ? (SERVICE_MINIMUMS[selectedService.value] ?? 0) : 0;

  const totalPrice = useMemo(() => {
    if (!selectedService) return 0;
    let price = Math.max(getDbPriceForSqft(sqft[0], selectedService.tiers), minimum);
    const addOnTotal = selectedAddOns.reduce((sum, id) => {
      const addOn = addOns.find((a) => a.id === id);
      return sum + (addOn?.price || 0);
    }, 0);
    price += addOnTotal;
    price = price * (1 - selectedFrequency.discount);
    return price;
  }, [sqft, selectedService, selectedFrequency, selectedAddOns, minimum]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);
  };

  const handleBooking = () => {
    if (!selectedService) return;
    navigate("/booking", {
      state: {
        sqft: sqft[0],
        serviceType: selectedService.label,
        frequency: selectedFrequency.label,
        addOns: selectedAddOns.map(id => addOns.find(a => a.id === id)?.label).filter(Boolean),
        totalPrice: totalPrice?.toFixed(2),
      },
    });
  };

  return (
    <section id="booking" className="py-20 bg-background">
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
            {loading || !selectedService ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium">Property Size</Label>
                    <span className="text-lg font-bold text-primary">{sqft[0].toLocaleString()} sq ft</span>
                  </div>
                  <Slider value={sqft} onValueChange={setSqft} min={500} max={5000} step={100} className="w-full" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>500 sq ft</span>
                    <span>5,000 sq ft</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium">Service Type</Label>
                  <Select value={serviceType} onValueChange={setServiceType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium">Frequency</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {frequencies.map((f) => (
                        <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-primary/5 rounded-lg p-6 text-center">
                  <p className="text-muted-foreground mb-2">Estimated Price</p>
                  <p className="text-4xl font-bold text-primary">${totalPrice?.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground mt-1">+ add-ons</p>
                </div>

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
                        <Checkbox id={addOn.id} checked={selectedAddOns.includes(addOn.id)} onCheckedChange={() => toggleAddOn(addOn.id)} />
                        <label htmlFor={addOn.id} className="text-sm cursor-pointer">
                          {addOn.label} (+${addOn.price})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button size="lg" className="w-full text-lg font-semibold bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg" onClick={handleBooking}>
                  Book This Clean
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingCalculator;
