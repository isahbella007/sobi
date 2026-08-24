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
