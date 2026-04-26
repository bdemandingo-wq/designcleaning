import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Loader2 } from "lucide-react";
import { useServicePricing, getPriceForSqft } from "@/hooks/useServicePricing";

const SERVICE_MIN: Record<string, number> = {
  standard: 99,
  deep: 149,
  moveinout: 169,
  recurring: 99,
};

// BR -> approx sqft
const BR_TO_SQFT = [600, 900, 1250, 1700, 2200, 2800];
const BR_LABEL = ["Studio", "1 BR", "2 BR", "3 BR", "4 BR", "5+ BR"];

const HeroEstimator = () => {
  const navigate = useNavigate();
  const { services, loading } = useServicePricing();
  const [serviceType, setServiceType] = useState("standard");
  const [brIdx, setBrIdx] = useState(2); // 2 BR default

  const activeService = services.find((s) => s.value === serviceType);

  const { low, high } = useMemo(() => {
    if (!activeService) return { low: 0, high: 0 };
    const sqft = BR_TO_SQFT[brIdx];
    const base = getPriceForSqft(sqft, activeService.tiers);
    const min = SERVICE_MIN[serviceType] ?? 99;
    const baseFinal = Math.max(base, min);
    return {
      low: Math.round(baseFinal),
      high: Math.round(baseFinal * 1.2),
    };
  }, [activeService, brIdx, serviceType]);

  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-2xl border border-border p-6 w-full max-w-md">
      <div className="text-center mb-5">
        <h3 className="font-display text-xl font-bold text-foreground">Instant Price Estimator</h3>
        <p className="text-sm text-muted-foreground">Get your estimate in seconds</p>
      </div>

      <div className="space-y-5">
        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">Service Type</Label>
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="z-[70]">
              {(services.length ? services : [{ value: "standard", label: "Standard Cleaning" }]).map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-2">
            <Label className="text-sm font-medium text-foreground">
              Home Size: <span className="text-primary font-bold">{BR_LABEL[brIdx]}</span>{" "}
              <span className="text-xs text-muted-foreground">(~{BR_TO_SQFT[brIdx].toLocaleString()} sq ft)</span>
            </Label>
          </div>
          <Slider
            value={[brIdx]}
            min={0}
            max={5}
            step={1}
            onValueChange={(v) => setBrIdx(v[0])}
            className="[&_[data-orientation=horizontal]]:h-2.5 [&_[role=slider]]:h-7 [&_[role=slider]]:w-7 [&_[role=slider]]:border-[3px] [&_[role=slider]]:shadow-lg"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
            <span>Studio</span>
            <span>5+ BR</span>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Estimated Price</p>
          {loading ? (
            <Loader2 className="w-6 h-6 mx-auto animate-spin text-primary" />
          ) : (
            <p className="font-display text-3xl font-bold text-primary">
              From ${low}–${high}
            </p>
          )}
        </div>

        <Button
          size="lg"
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
          onClick={() => navigate(`/pricing?service=${serviceType}&br=${brIdx}`)}
        >
          See My Price
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          No credit card. No commitment. Instant estimate.
        </p>
      </div>
    </div>
  );
};

export default HeroEstimator;
