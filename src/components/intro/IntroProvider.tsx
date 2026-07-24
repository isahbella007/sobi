"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { usePathname } from "@/i18n/navigation";
import { SunMarkV2 } from "@/components/hero/SunMarkV2";
import { SUN_DOCK_TOP, SUN_DOCK_SIZE, getSunDockLeft } from "@/components/hero/sunDock";

const HOLD = 0.4;
// Ratio of the viewport height where the sun "breaks the horizon" — purely
// a framing choice for how much of the climb happens below an implicit
// horizon; not tied to any rendered page element.
const HORIZON_RATIO = 1;
// One unbroken vertical climb from off-screen bottom to the dock height.
// Every tween below shares this duration + ease, which keeps the
// spotlight's center and the sun's own position mathematically identical
// at every frame.
const GLIDE_DURATION = 4.4;
// Phase 2: once fully risen (still centered), the sun slides horizontally
// into the Nav's logo slot. Kept as its own short phase, sequenced AFTER
// the glide finishes, rather than blended into it or run concurrently with
// the handoff crossfade below — see SLIDE_DURATION usage.
const SLIDE_DURATION = 0.9;
const HANDOFF_DURATION = 0.5;
// const EASE = "power3.out";
const EASE = "power3.inOut"
const SUN_START_SIZE = 240;

type IntroContextValue = {
  /** True partway through the glide — the Bento hero syncs its tile
   *  cascade to this rather than firing independently on mount. */
  introAwake: boolean;
  /** True the instant the sun reaches its dock spot in the Nav — Nav's
   *  permanent mark crossfades in against the overlay's traveling one
   *  right here. */
  sunDocked: boolean;
  /** Which mark Nav should show once docked — lets whichever intro
   *  provider is mounted (this one, or the alternate IntroProviderV2)
   *  hand off to the mark it actually traveled with. */
  dockedMark?: ReactNode;
};

// Exported so IntroProviderV2 (an alternate choreography, trialed for
// client comparison) can drive the same context shape Nav already reads
// from — Nav doesn't need to know which intro variant is mounted above it.
export const IntroContext = createContext<IntroContextValue>({
  introAwake: true,
  sunDocked: true,
});

export function useIntro() {
  return useContext(IntroContext);
}

export function IntroProvider({ children }: { children: ReactNode }) {
  // Captured once, at mount — the sunrise is a homepage moment. Landing
  // straight on an inner page (a shared /about link, a refresh) skips it,
  // but this deliberately does NOT track pathname on every render: this
  // provider lives for the whole session (see IntroSwitcher), and once
  // settled it should stay settled through later client-side navigation
  // back to "/", rather than re-arming.
  const entryPathname = useRef(usePathname()).current;
  const overlayRootRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const horizonRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const travelRef = useRef<HTMLDivElement>(null);
  const sunWrapRef = useRef<HTMLDivElement>(null);

  const [introAwake, setIntroAwake] = useState(false);
  const [sunDocked, setSunDocked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || entryPathname !== "/") {
      // The CSS in globals.css already hides the overlay for reduced-motion
      // users; this just settles the matching React state so Nav's and the
      // Bento hero's own effects fire right away too. Same settle for any
      // entry point other than the homepage.
      setIntroAwake(true);
      setSunDocked(true);
      setShowOverlay(false);
      return;
    }

    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Big enough that, centered on the sun's final (near-top) position,
      // the gradient's clear zone clears every corner of the viewport.
      const finalRadius = Math.hypot(vw / 2, vh) * 1.35;
      // Phase 2 target: how far left (from center) the sun must slide once
      // risen, to land in the Nav's actual logo slot.
      const deltaX = getSunDockLeft(vw) + SUN_DOCK_SIZE / 2 - vw / 2;

      // Sun starts with its top edge at the viewport's bottom edge — fully
      // hidden below the horizon clip. The wash's clear radius starts at
      // zero, centered on that same point, so the scene opens solid dark.
      gsap.set(travelRef.current, { xPercent: -50, x: 0, y: vh - SUN_DOCK_TOP });
      washRef.current?.style.setProperty("--r", "0px");
      washRef.current?.style.setProperty("--cy", `${vh}px`);

      const holeProgress = { r: 0, cy: vh };

      const tl = gsap.timeline({ delay: HOLD });

      tl.to(travelRef.current, { y: 0, duration: GLIDE_DURATION, ease: EASE }, 0)
        .to(
          holeProgress,
          {
            r: finalRadius,
            cy: SUN_DOCK_TOP,
            duration: GLIDE_DURATION,
            ease: EASE,
            onUpdate: () => {
              washRef.current?.style.setProperty("--r", `${holeProgress.r}px`);
              washRef.current?.style.setProperty("--cy", `${holeProgress.cy}px`);
            },
          },
          0
        )
        .to(
          sunWrapRef.current,
          {
            width: SUN_DOCK_SIZE,
            height: SUN_DOCK_SIZE,
            filter: "grayscale(0) saturate(1) brightness(1)",
            duration: GLIDE_DURATION,
            ease: EASE,
          },
          0
        )
        // Glow blooms as the sun crosses the horizon, then clears before it
        // settles into a small, glow-free logo mark.
        .to(glowRef.current, { opacity: 0.55, duration: GLIDE_DURATION * 0.4, ease: "sine.out" }, 0)
        .to(
          glowRef.current,
          { opacity: 0, duration: GLIDE_DURATION * 0.6, ease: "sine.in" },
          GLIDE_DURATION * 0.4
        )
        .call(() => setIntroAwake(true), [], GLIDE_DURATION * 0.6)
        // Phase 2: still fully visible, slide from center into the Nav's
        // logo slot. Sequenced after the glide finishes — not concurrent
        // with the handoff below, so the crossfade never has to show the
        // traveling sun and Nav's permanent mark in two different places
        // at once.
        .to(travelRef.current, { x: deltaX, duration: SLIDE_DURATION, ease: "power2.inOut" }, GLIDE_DURATION)
        .call(() => setSunDocked(true), [], GLIDE_DURATION + SLIDE_DURATION)
        // Handoff: the traveling sun fades out right as Nav's permanent
        // mark fades in at the same dock coordinates.
        .to(
          travelRef.current,
          { opacity: 0, duration: HANDOFF_DURATION, ease: "power1.in" },
          GLIDE_DURATION + SLIDE_DURATION
        )
        .call(() => setShowOverlay(false));
    }, overlayRootRef);

    return () => ctx.revert();
  }, []);

  return (
    <IntroContext.Provider value={{ introAwake, sunDocked, dockedMark: <SunMarkV2 /> }}>
      {children}

      {showOverlay && (
        <div
          ref={overlayRootRef}
          data-intro-overlay
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          {/* Dawn wash: a radial gradient whose clear radius grows from the
              sun's position outward. Stops are mixed in OKLCH so the band
              between "dark" and "revealed" passes through a vivid warm glow
              instead of the muddy grey a plain black-to-cream blend gives. */}
          <div
            ref={washRef}
            style={
              {
                position: "fixed",
                inset: 0,
                "--r": "0px",
                "--cy": "100vh",
                backgroundImage:
                  "radial-gradient(circle var(--r) at 50% var(--cy), transparent 0%, transparent 60%, color-mix(in oklab, var(--accent) 15%, transparent) 74%, color-mix(in oklab, var(--accent) 20%, #1a1510) 88%, #1a1510 100%)",
              } as CSSProperties
            }
          />

          {/* Horizon window: clips the sun disc itself so it visibly
              emerges from behind the line rather than just translating up. */}
          <div
            ref={horizonRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: `${HORIZON_RATIO * 100}vh`,
              overflow: "hidden",
            }}
          >
            <div
              ref={travelRef}
              style={{
                position: "absolute",
                top: SUN_DOCK_TOP,
                left: "50%",
              }}
            >
              <div
                ref={glowRef}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 420,
                  height: 420,
                  marginLeft: -210,
                  marginTop: -210,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
                  filter: "blur(48px)",
                  opacity: 0,
                }}
              />
              <div
                ref={sunWrapRef}
                style={{
                  position: "relative",
                  width: SUN_START_SIZE,
                  height: SUN_START_SIZE,
                  filter: "grayscale(0.4) saturate(0.3) brightness(0.9)",
                }}
              >
                <SunMarkV2 />
              </div>
            </div>
          </div>
        </div>
      )}
    </IntroContext.Provider>
  );
}
