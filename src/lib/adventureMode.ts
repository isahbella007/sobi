// "Adventure Mode" distance guesser for FindUs — a playful, zero-cost
// stand-in for a real routing API. Geocodes free-text via Nominatim
// (OpenStreetMap, no API key) and estimates a fun travel time from a
// straight-line distance. Not a real ETA — replace with a proper routing
// API if this ever needs to be precise.

// Approximate centroid of Meidling (1120 Wien), where the studio sits.
// CONFIRM: swap for the exact studio coordinates once the street address
// in site.ts is finalized.
const STUDIO_COORDS = { lat: 48.1775, lon: 16.3345 };

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

// Assumed average speed for a mixed city trip (car/tram/walk) — enough to
// turn "3.2km away" into a fun round number, not a real routed ETA.
const ASSUMED_KMH = 25;

export type ScanResult =
  | { kind: "nearby" }
  | { kind: "minutes"; minutes: number }
  | { kind: "far"; hours: number }
  | { kind: "not-found" }
  | { kind: "error" };

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function haversineKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

async function geocode(rawQuery: string): Promise<{ lat: number; lon: number } | null> {
  const query = rawQuery.trim();
  // A bare postal code is ambiguous across countries — bias it to Austria.
  // Free text (a district or city name) is left as-is so typing e.g.
  // "Berlin" still resolves for the far-away joke response.
  const q = /^\d{3,5}$/.test(query) ? `${query}, Austria` : query;

  const params = new URLSearchParams({ q, format: "jsonv2", limit: "1" });
  const res = await fetch(`${NOMINATIM_URL}?${params.toString()}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("geocode failed");

  const data: { lat: string; lon: string }[] = await res.json();
  if (!data.length) return null;
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
}

export async function scanDistance(query: string): Promise<ScanResult> {
  let point: { lat: number; lon: number } | null;
  try {
    point = await geocode(query);
  } catch {
    return { kind: "error" };
  }
  if (!point) return { kind: "not-found" };

  const km = haversineKm(STUDIO_COORDS, point);

  if (km < 1.2) return { kind: "nearby" };
  if (km > 40) return { kind: "far", hours: Math.round((km / ASSUMED_KMH) * 10) / 10 };

  return { kind: "minutes", minutes: Math.max(2, Math.round((km / ASSUMED_KMH) * 60)) };
}
