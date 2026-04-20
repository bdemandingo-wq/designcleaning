import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export const DAILY_CAPACITY = 3; // total bookings per day (admin can change in DB later)

export type SlotAvailability = {
  morning: number; // count booked
  afternoon: number;
};

export type DayAvailability = {
  date: string; // ISO yyyy-MM-dd
  total: number;
  blocked: boolean;
  morning: number;
  afternoon: number;
  isFull: boolean;
};

/**
 * Loads booked counts (from bookings.preferred_date + time_slot) and admin-blocked dates
 * for a window starting today. Returns a map keyed by yyyy-MM-dd.
 */
export const useBookingAvailability = (daysAhead = 90) => {
  const [availability, setAvailability] = useState<Record<string, DayAvailability>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const today = new Date();
      const end = new Date();
      end.setDate(today.getDate() + daysAhead);
      const startStr = format(today, "yyyy-MM-dd");
      const endStr = format(end, "yyyy-MM-dd");

      const [bookingsRes, blockedRes] = await Promise.all([
        supabase.from("bookings").select("preferred_date,time_slot,status").not("status", "eq", "cancelled"),
        supabase.from("booking_blocked_dates").select("blocked_date").gte("blocked_date", startStr).lte("blocked_date", endStr),
      ]);

      const map: Record<string, DayAvailability> = {};

      // Seed blocked dates
      (blockedRes.data || []).forEach((b) => {
        const key = b.blocked_date as string;
        map[key] = { date: key, total: 0, morning: 0, afternoon: 0, blocked: true, isFull: true };
      });

      // Parse "EEEE, MMMM d, yyyy" or yyyy-MM-dd into yyyy-MM-dd
      const toIso = (s: string | null): string | null => {
        if (!s) return null;
        const direct = /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null;
        if (direct) return direct;
        const d = new Date(s);
        return isNaN(d.getTime()) ? null : format(d, "yyyy-MM-dd");
      };

      (bookingsRes.data || []).forEach((row: any) => {
        const iso = toIso(row.preferred_date);
        if (!iso) return;
        const entry = map[iso] || { date: iso, total: 0, morning: 0, afternoon: 0, blocked: false, isFull: false };
        entry.total += 1;
        if (row.time_slot === "morning") entry.morning += 1;
        else if (row.time_slot === "afternoon") entry.afternoon += 1;
        entry.isFull = entry.blocked || entry.total >= DAILY_CAPACITY;
        map[iso] = entry;
      });

      if (mounted) {
        setAvailability(map);
        setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [daysAhead]);

  const isDateUnavailable = (date: Date): boolean => {
    const key = format(date, "yyyy-MM-dd");
    const a = availability[key];
    return !!a && a.isFull;
  };

  const slotAvailable = (date: Date, slot: "morning" | "afternoon"): boolean => {
    const key = format(date, "yyyy-MM-dd");
    const a = availability[key];
    if (!a) return true;
    if (a.blocked) return false;
    if (a.total >= DAILY_CAPACITY) return false;
    // Soft per-slot cap: half capacity rounded up
    const slotCap = Math.ceil(DAILY_CAPACITY / 2);
    return a[slot] < slotCap;
  };

  return { availability, loading, isDateUnavailable, slotAvailable };
};
