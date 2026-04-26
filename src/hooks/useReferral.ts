import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const STORAGE_KEY = "dc_referral_code";

/**
 * Captures `?ref=CODE` from URL into localStorage so it can be applied at booking.
 * Also exposes the current logged-in customer's own referral code + credit balance.
 */
export const useReferral = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [myCode, setMyCode] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // Capture referral code from URL on mount
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref && ref.length >= 4 && ref.length <= 16) {
      localStorage.setItem(STORAGE_KEY, ref.toUpperCase());
    }
  }, [searchParams]);

  // Fetch the logged-in user's own code + balance
  useEffect(() => {
    if (!user) {
      setMyCode(null);
      setBalance(0);
      return;
    }
    setLoading(true);
    Promise.all([
      supabase.from("referral_codes").select("code").eq("user_id", user.id).maybeSingle(),
      supabase.from("customer_credits").select("balance").eq("user_id", user.id).maybeSingle(),
    ]).then(([codeRes, creditRes]) => {
      setMyCode(codeRes.data?.code ?? null);
      setBalance(Number(creditRes.data?.balance ?? 0));
      setLoading(false);
    });
  }, [user]);

  return {
    myCode,
    balance,
    loading,
    getStoredReferralCode: () => localStorage.getItem(STORAGE_KEY),
    clearStoredReferralCode: () => localStorage.removeItem(STORAGE_KEY),
    shareUrl: myCode ? `${window.location.origin}/?ref=${myCode}` : null,
  };
};
