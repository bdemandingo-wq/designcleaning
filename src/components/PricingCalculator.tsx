import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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

const serviceTypes = [
  { value: "standard", label: "Standard Cleaning", prices: [108, 143, 178, 213, 248, 283, 313, 368, 423, 478, 533, 588, 643] },
  { value: "deep", label: "Deep Cleaning", prices: [208, 243, 278, 313, 348, 383, 438, 493, 548, 603, 658, 713, 768] },
  { value: "moveinout", label: "Move In/Move Out", prices: [283, 318, 353, 388, 423, 458, 513, 568, 623, 678, 733, 788, 843] },
  { value: "recurring", label: "Recurring Cleaning", prices: [108, 143, 178, 213, 248, 283, 313, 368, 423, 478, 533, 588, 643] },
];

const frequencies = [
  { value: "onetime", label: "One-Time", discount: 0 },
  { value: "weekly", label: "Weekly (15% off)", discount: 0.15 },
  { value: "biweekly", label: "Bi-Weekly (10% off)", discount: 0.10 },
  { value: "monthly", label: "Monthly (5% off)", discount: 0.05 },
];

const addOns = [
  { id: "fridge", label: "Inside Fridge", price: 35 },
  { id: "oven", label: "Inside Oven", price: 25 },
  { id: "laundry", label: "Laundry", price: 30 },
  { id: "windows", label: "Interior Windows", price: 40 },
  { id: "balcony", label: "Balcony/Patio", price: 20 },
];

const getPriceForSqft = (sqft: number, prices: number[]): number => {
  for (let i = 0; i < pricingTiers.length; i++) {
    if (sqft <= pricingTiers[i].maxSqft) return prices[i];
  }
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

  const totalPrice = useMemo(() => {
    let price = getPriceForSqft(sqft[0], selectedService.prices);
    const addOnTotal = selectedAddOns.reduce((sum, id) => {
      const addOn = addOns.find((a) => a.id === id);
      return sum + (addOn?.price || 0);
    }, 0);
    price += addOnTotal;
    price = price * (1 - selectedFrequency.discount);
    return price;
  }, [sqft, selectedService, selectedFrequency, selectedAddOns]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);
  };

  const handleBooking = () => {
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
                  {serviceTypes.map((s) => (
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
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingCalculator;
