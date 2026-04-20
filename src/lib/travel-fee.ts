import type { ServiceArea } from "@/hooks/useServiceAreas";

/**
 * Match a free-form city/ZIP/address string against the service_areas table.
 * Returns the matching area (with travel_fee + tier) or null.
 *
 * Strategy: city-name match (per product decision). We normalize both sides
 * (lowercase, strip "cleaning", strip dashes/spaces) and look for a substring
 * hit. ZIPs are not currently mapped 1:1 — we just do a best-effort city match
 * on whatever the user typed.
 */
export const matchServiceArea = (
  query: string,
  areas: ServiceArea[]
): ServiceArea | null => {
  if (!query) return null;
  const norm = (s: string) =>
    s.toLowerCase().replace(/-cleaning$/, "").replace(/[-_\s]+/g, " ").trim();

  const q = norm(query);
  if (!q) return null;

  // Exact match first
  const exact = areas.find((a) => norm(a.name) === q || norm(a.slug) === q);
  if (exact) return exact;

  // Substring match (e.g. "north bethesda md 20852" → "north bethesda")
  return (
    areas.find((a) => q.includes(norm(a.name)) || q.includes(norm(a.slug))) ||
    null
  );
};

export const tierLabel = (tier: string): string => {
  switch (tier) {
    case "core":
      return "Core (no travel fee)";
    case "extended_md":
      return "Extended Maryland";
    case "dc":
      return "Washington DC";
    case "nova":
      return "Northern Virginia";
    case "premium":
      return "Premium";
    default:
      return "Standard";
  }
};
