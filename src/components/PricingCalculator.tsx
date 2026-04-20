import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useServicePricing, getPriceForSqft } from "@/hooks/useServicePricing";
import { useServiceAreas } from "@/hooks/useServiceAreas";
import { matchServiceArea } from "@/lib/travel-fee";

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

const PricingCalculator = () => {
  const navigate = useNavigate();
  const { services, loading } = useServicePricing();
  const { areas } = useServiceAreas(true);
  const [sqft, setSqft] = useState([1500]);
  const [serviceType, setServiceType] = useState("standard");
  const [frequency, setFrequency] = useState("onetime");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [cityOrZip, setCityOrZip] = useState("");

  const selectedService = useMemo(
    () => services.find((s) => s.value === serviceType) || services[0],
    [services, serviceType]
  );
  const selectedFrequency = frequencies.find((f) => f.value === frequency)!;

  const matchedArea = useMemo(
    () => matchServiceArea(cityOrZip, areas),
    [cityOrZip, areas]
  );
  const travelFee = matchedArea ? Number(matchedArea.travel_fee) || 0 : 0;

  const totalPrice = useMemo(() => {
    if (!selectedService || !selectedService.tiers.length) return 0;
    let price = getPriceForSqft(sqft[0], selectedService.tiers);
    const addOnTotal = selectedAddOns.reduce((sum, id) => {
      const addOn = addOns.find((a) => a.id === id);
      return sum + (addOn?.price || 0);
    }, 0);
    price += addOnTotal;
    price = price * (1 - selectedFrequency.discount);
    price += travelFee; // Travel fee is not discounted
    return price;
  }, [sqft, selectedService, selectedFrequency, selectedAddOns, travelFee]);

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
        city: matchedArea?.name || cityOrZip,
        travelFee,
      },
    });
  };

  return (
    <section id="booking" className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparent Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple, upfront pricing with no hidden fees. Choose your service and book instantly.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-elevated">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-xl font-display">Select Your Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6">
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
              <Select value={serviceType} onValueChange={setServiceType} disabled={loading || services.length === 0}>
                <SelectTrigger><SelectValue placeholder={loading ? "Loading..." : "Select a service"} /></SelectTrigger>
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

            <div className="space-y-2">
              <Label htmlFor="city-zip" className="text-base font-medium">Your City or ZIP</Label>
              <Input
                id="city-zip"
                value={cityOrZip}
                onChange={(e) => setCityOrZip(e.target.value)}
                placeholder="e.g. Bethesda or 20814"
              />
              {cityOrZip && (
                <p className="text-xs text-muted-foreground">
                  {matchedArea
                    ? travelFee > 0
                      ? `Detected: ${matchedArea.name} • travel fee +$${travelFee.toFixed(0)}`
                      : `Detected: ${matchedArea.name} • no travel fee`
                    : `We don't see "${cityOrZip}" in our service list — call us at (202) 935-9934 for a custom quote.`}
                </p>
              )}
            </div>

            <div className="bg-primary/5 rounded-lg p-4 sm:p-6 text-center">
              <p className="text-muted-foreground mb-2 text-sm sm:text-base">Estimated Price</p>
              <p className="text-3xl sm:text-4xl font-bold text-primary break-words">
                {loading ? "..." : `$${totalPrice?.toFixed(2)}`}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {travelFee > 0 ? `Includes $${travelFee.toFixed(0)} travel fee • + add-ons` : "+ add-ons"}
              </p>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Add-On Services:</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {addOns.map((addOn) => (
                  <div
                    key={addOn.id}
                    className={`flex items-center gap-2 p-3 min-h-[48px] rounded-lg border cursor-pointer transition-all ${
                      selectedAddOns.includes(addOn.id)
                        ? "bg-primary/10 border-primary"
                        : "bg-background border-border hover:border-primary/50"
                    }`}
                    onClick={() => toggleAddOn(addOn.id)}
                  >
                    <Checkbox id={addOn.id} checked={selectedAddOns.includes(addOn.id)} onCheckedChange={() => toggleAddOn(addOn.id)} />
                    <label htmlFor={addOn.id} className="text-sm cursor-pointer flex-1">
                      {addOn.label} (+${addOn.price})
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button size="lg" className="w-full text-base sm:text-lg font-semibold bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg min-h-[52px]" onClick={handleBooking} disabled={loading}>
              Book This Clean
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingCalculator;
