import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SiteContentMap = Record<string, string>;

/**
 * Fetches all rows from the public site_content key/value table once
 * and exposes a map. Public pages use this so admin edits appear live
 * (next page load) without a redeploy.
 */
export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContentMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from("site_content").select("key,value");
      if (cancelled) return;
      const map: SiteContentMap = {};
      (data || []).forEach((row) => {
        map[row.key] = row.value;
      });
      setContent(map);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const get = (key: string, fallback = "") => content[key] ?? fallback;

  return { content, get, loading };
};
