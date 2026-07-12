const CENTER = 80;
const RAY_INNER = 28;
// Client's own description of her logo's spike pattern: 12 long, 12
// medium, 24 short, arranged as a repeating 4-spike unit (long, short,
// medium, short) around the full circle — 12 repeats x 4 = 48 spikes.
const RAY_OUTER = { long: 78, medium: 60, short: 44 } as const;
const UNIT: Array<keyof typeof RAY_OUTER> = ["long", "short", "medium", "short"];
const REPEATS = 12;
const SPIKES = Array.from({ length: REPEATS * UNIT.length }, (_, i) => ({
  angle: (360 / (REPEATS * UNIT.length)) * i,
  outer: RAY_OUTER[UNIT[i % UNIT.length]],
}));

// Code-drawn reconstruction of the client's sunburst, rather than an
// autotraced copy of the artwork — a raster trace posterizes into blotchy
// color regions at the sizes this mark actually renders at (220px down to
// the 52px docked mark), where these plain strokes stay crisp and stay
// theme-aware via var(--accent).
export function SunMarkV2() {
  return (
    <svg viewBox="0 0 160 160" width="100%" height="100%" role="img" aria-label="SOBI Sonnenmotiv">
      {SPIKES.map(({ angle, outer }, i) => (
        <line
          key={i}
          x1={CENTER}
          y1={CENTER - RAY_INNER}
          x2={CENTER}
          y2={CENTER - outer}
          transform={`rotate(${angle} ${CENTER} ${CENTER})`}
          stroke="var(--accent)"
          strokeWidth={1}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
