// "Adventure Mode" distance guesser for FindUs — a playful, zero-cost,
// zero-network stand-in for a real routing API. Reads the visitor's real
// coordinates via the browser's HTML5 Geolocation API, then runs them
// through the Haversine formula against the studio's coordinates. No
// external requests, no API keys — everything happens on-device. Not a
// real ETA — replace with a proper routing API if this ever needs to be
// precise (turn-by-turn distance rather than as-the-crow-flies).

// Approximate centroid of Meidling (1120 Wien), where the studio sits.
// CONFIRM: swap for the exact studio coordinates once the street address
// in site.ts is finalized.
const STUDIO_COORDS = { lat: 48.1775, lon: 16.3345 };

// Assumed average speed for a mixed city trip (car/tram/walk) — enough to
// turn "3.2km away" into a fun round number, not a real routed ETA.
const ASSUMED_KMH = 25;

export type ScanResult =
  | { kind: "nearby" }
  | { kind: "minutes"; minutes: number }
  | { kind: "far"; hours: number }
  | { kind: "denied" }
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

function classifyDistance(km: number): ScanResult {
  if (km < 1.2) return { kind: "nearby" };
  if (km > 40) return { kind: "far", hours: Math.round((km / ASSUMED_KMH) * 10) / 10 };
  return { kind: "minutes", minutes: Math.max(2, Math.round((km / ASSUMED_KMH) * 60)) };
}

// Wraps the callback-based Geolocation API in a Promise and buckets the
// result. "denied" is split out from "error" so the UI can tell "you said
// no" apart from "your browser/device couldn't do this" and word the
// message accordingly.
export function locateAndScan(): Promise<ScanResult> {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      resolve({ kind: "error" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const km = haversineKm(STUDIO_COORDS, {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        resolve(classifyDistance(km));
      },
      (err) => {
        resolve(err.code === err.PERMISSION_DENIED ? { kind: "denied" } : { kind: "error" });
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 }
    );
  });
}
