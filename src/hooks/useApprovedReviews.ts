import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ApprovedReview = {
  id: string;
  customer_name: string;
  location: string | null;
  rating: number;
  review_text: string;
  created_at: string;
};

export const useApprovedReviews = (limit = 12) => {
  const [reviews, setReviews] = useState<ApprovedReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase
      .from("reviews")
      .select("id,customer_name,location,rating,review_text,created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(limit)
      .then(({ data }) => {
        if (mounted) {
          setReviews((data as ApprovedReview[]) || []);
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, [limit]);

  return { reviews, loading };
};
