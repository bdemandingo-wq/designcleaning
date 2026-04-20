import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PricingTier {
  id: string;
  service_type: string;
  tier_index: number;
  max_sqft: number;
  label: string;
  base_price: number;
  is_active: boolean;
}

export interface ServiceTypeBundle {
  value: string;
  label: string;
  tiers: PricingTier[];
}

const SERVICE_LABELS: Record<string, string> = {
  standard: "Standard Cleaning",
  deep: "Deep Cleaning",
  moveinout: "Move In/Move Out",
  recurring: "Recurring Cleaning",
};

export const useServicePricing = () => {
  const [services, setServices] = useState<ServiceTypeBundle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPricing = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("service_pricing")
      .select("*")
      .eq("is_active", true)
      .order("service_type", { ascending: true })
      .order("tier_index", { ascending: true });

    if (error || !data) {
      setServices([]);
      setLoading(false);
      return;
    }

    const grouped: Record<string, PricingTier[]> = {};
    data.forEach((row) => {
      if (!grouped[row.service_type]) grouped[row.service_type] = [];
      grouped[row.service_type].push(row as PricingTier);
    });

    const bundles: ServiceTypeBundle[] = Object.keys(grouped).map((key) => ({
      value: key,
      label: SERVICE_LABELS[key] || key,
      tiers: grouped[key],
    }));

    // Stable order: standard, deep, moveinout, recurring, then any custom
    const order = ["standard", "deep", "moveinout", "recurring"];
    bundles.sort((a, b) => {
      const ai = order.indexOf(a.value);
      const bi = order.indexOf(b.value);
      if (ai === -1 && bi === -1) return a.value.localeCompare(b.value);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });

    setServices(bundles);
    setLoading(false);
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  return { services, loading, refetch: fetchPricing };
};

export const getPriceForSqft = (sqft: number, tiers: PricingTier[]): number => {
  if (!tiers.length) return 0;
  const sorted = [...tiers].sort((a, b) => a.max_sqft - b.max_sqft);
  for (const t of sorted) {
    if (sqft <= t.max_sqft) return Number(t.base_price);
  }
  return Number(sorted[sorted.length - 1].base_price);
};
