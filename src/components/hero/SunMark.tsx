import type { RefObject } from "react";

const CENTER = 80;
const RAY_INNER = 19.5;

// Each ray tapers from base to a near-point tip.
const WIDTH_BASE = 1.9;
const WIDTH_TIP = 0.7;

// [clock angle in degrees (0 = 12 o'clock, increasing clockwise), length]
// Measured off the client's logo. The spacing and lengths are deliberately
// uneven — that irregularity is what makes the mark read as hand-drawn rather
// than generated, so do not "tidy" these into an even sequence.
const RAYS: ReadonlyArray<readonly [number, number]> = [
  [5.2, 74.0],
  [17.8, 63.0],
  [26.5, 34.1],
  [35.8, 70.3],
  [46.2, 54.6],
  [55.5, 65.5],
  [64.5, 53.6],
  [74.2, 66.7],
  [82.5, 55.5],
  [91.5, 66.6],
  [101.2, 54.4],
  [111.0, 65.2],
  [119.8, 53.4],
  [129.0, 62.5],
  [140.2, 62.1],
  [153.5, 66.9],
  [166.5, 62.0],
  [177.0, 32.1],
  [184.2, 51.2],
  [195.5, 61.8],
  [208.2, 66.6],
  [221.0, 52.7],
  [229.5, 42.5],
  [239.0, 47.6],
  [248.0, 69.4],
  [258.5, 54.3],
  [268.0, 62.1],
  [277.0, 53.8],
  [287.0, 68.4],
  [296.2, 54.7],
  [306.8, 64.7],
  [316.2, 50.8],
  [324.2, 71.4],
  [335.8, 62.5],
  [344.5, 47.9],
  [353.5, 58.4],
];

function rayPoints(clockDeg: number, outer: number) {
  const a = ((clockDeg - 90) * Math.PI) / 180;
  const ca = Math.cos(a);
  const sa = Math.sin(a);
  const px = -sa; // perpendicular to the ray
  const py = ca;
  const hb = WIDTH_BASE / 2;
  const ht = WIDTH_TIP / 2;

  const bx = CENTER + RAY_INNER * ca;
  const by = CENTER + RAY_INNER * sa;
  const tx = CENTER + outer * ca;
  const ty = CENTER + outer * sa;

  return [
    [bx + px * hb, by + py * hb],
    [tx + px * ht, ty + py * ht],
    [tx - px * ht, ty - py * ht],
    [bx - px * hb, by - py * hb],
  ]
    .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");
}

const RAY_SHAPES = RAYS.map(([angle, length], i) => ({
  key: i,
  points: rayPoints(angle, length),
}));

type SunMarkProps = {
  /** Optional handle to the rays group, so an intro animation can scale
   *  them outward independently of the centre. */
  raysRef?: RefObject<SVGGElement | null>;
};

// Rays are filled shapes rather than strokes, so they taper toward the tip and
// scale proportionally with the mark instead of staying a fixed pixel width.
// There is no drawn circle: the empty middle reads as the disc.
export function SunMark({ raysRef }: SunMarkProps = {}) {
  return (
    <svg viewBox="0 0 160 160" width="100%" height="100%" role="img" aria-label="SOBI Sonnenmotiv">
      <g ref={raysRef} fill="var(--accent)" shapeRendering="geometricPrecision">
        {RAY_SHAPES.map(({ key, points }) => (
          <polygon key={key} points={points} />
        ))}
      </g>
    </svg>
  );
}