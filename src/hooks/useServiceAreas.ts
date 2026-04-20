import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ServiceArea {
  id: string;
  slug: string;
  name: string;
  state: string;
  travel_fee: number;
  tier: string;
  is_active: boolean;
  sort_order: number;
}

export const useServiceAreas = (onlyActive = true) => {
  const [areas, setAreas] = useState<ServiceArea[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAreas = async () => {
    setLoading(true);
    let query = supabase.from("service_areas").select("*").order("sort_order", { ascending: true });
    if (onlyActive) query = query.eq("is_active", true);
    const { data } = await query;
    setAreas((data as ServiceArea[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlyActive]);

  return { areas, loading, refetch: fetchAreas };
};
