const RAY_COUNT = 36;
const CENTER = 80;
const DISC_RADIUS = 24;
const RAY_INNER = 32;
const RAY_OUTER = 70;
const RAY_ANGLES = Array.from({ length: RAY_COUNT }, (_, i) => (360 / RAY_COUNT) * i);

// Rays are drawn once along the vertical axis, then placed by rotating each
// individually around the center — a plain SVG transform attribute, so the
// whole mark scales/fades/color-shifts as one unit however a consumer wraps it.
export function SunMark() {
  return (
    <svg viewBox="0 0 160 160" width="100%" height="100%" role="img" aria-label="SOBI Sonnenmotiv">
      <g>
        {RAY_ANGLES.map((angle) => (
          <line
            key={angle}
            x1={CENTER}
            y1={CENTER - RAY_INNER}
            x2={CENTER}
            y2={CENTER - RAY_OUTER}
            transform={`rotate(${angle} ${CENTER} ${CENTER})`}
            stroke="var(--accent)"
            strokeWidth={1}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      <circle
        cx={CENTER}
        cy={CENTER}
        r={DISC_RADIUS}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
