"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { usePathname } from "@/i18n/navigation";
import { SunMarkV2 } from "@/components/hero/SunMarkV2";
import { SUN_DOCK_TOP, SUN_DOCK_SIZE, getSunDockLeft } from "@/components/hero/sunDock";
import { IntroContext } from "@/components/intro/IntroProvider";

// Alternate choreography, trialed alongside IntroProvider (v1) for a client
// comparison. Instead of climbing from an off-screen horizon, the mark
// wakes in place at the viewport's center — glow pulsing, no per-ray
// motion, since SunMarkV2 is a flat trace of the client's real logo rather
// than discrete ray primitives — then glides in one motion to the same
// Nav dock slot v1 settles into, so the two are interchangeable from
// Nav's point of view (see the shared IntroContext import above).
const HOLD = 0.4;
const PULSE_CYCLES = 3;
const PULSE_DURATION = 0.4;
const RISE_DURATION = 4.4;
const HANDOFF_DURATION = 0.5;
const EASE = "power3.inOut";
const SUN_START_SIZE = 240;

export function IntroProviderV2({ children }: { children: ReactNode }) {
  // See the matching comment in IntroProvider (v1) — captured once at
  // mount so the sunrise only plays when the session actually entered on
  // the homepage, and never re-arms on later client-side navigation.
  const entryPathname = useRef(usePathname()).current;
  const overlayRootRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const travelRef = useRef<HTMLDivElement>(null);
  const sunWrapRef = useRef<HTMLDivElement>(null);

  const [introAwake, setIntroAwake] = useState(false);
  const [sunDocked, setSunDocked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || entryPathname !== "/") {
      setIntroAwake(true);
      setSunDocked(true);
      setShowOverlay(false);
      return;
    }

    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const finalLeft = getSunDockLeft(vw) + SUN_DOCK_SIZE / 2;
      const finalTop = SUN_DOCK_TOP;
      // From a near-corner resting point the farthest point in the
      // viewport is roughly the opposite corner — size the wash off the
      // full diagonal (with margin) rather than v1's near-top-center math.
      const finalRadius = Math.hypot(vw, vh) * 1.1;

      gsap.set(travelRef.current, {
        position: "fixed",
        top: finalTop,
        left: finalLeft,
        xPercent: -50,
        yPercent: -50,
        x: vw / 2 - finalLeft,
        y: vh / 2 - finalTop,
      });
      gsap.set(glowRef.current, { opacity: 0.15, scale: 0.85 });
      gsap.set(sunWrapRef.current, { filter: "grayscale(0.5) saturate(0.2) brightness(0.85)" });
      washRef.current?.style.setProperty("--r", "0px");
      washRef.current?.style.setProperty("--cx", `${vw / 2}px`);
      washRef.current?.style.setProperty("--cy", `${vh / 2}px`);

      const holeProgress = { r: 0, cx: vw / 2, cy: vh / 2 };

      const tl = gsap.timeline({ delay: HOLD });

      // Phase 1: the mark just breathes in place at screen center — the
      // "waking up" cue, standing in for the per-ray glow v1's uniform
      // rays can do that a flat logo trace can't.
      tl.to(glowRef.current, {
        opacity: 0.6,
        scale: 1.2,
        duration: PULSE_DURATION,
        ease: "sine.inOut",
        repeat: PULSE_CYCLES * 2 - 1,
        yoyo: true,
      });

      // Phase 2: one unified glide from center to the dock corner — no
      // horizon clip needed since the mark is already fully visible.
      tl.addLabel("rise")
        .to(travelRef.current, { x: 0, y: 0, duration: RISE_DURATION, ease: EASE }, "rise")
        .to(
          holeProgress,
          {
            r: finalRadius,
            cx: finalLeft,
            cy: finalTop,
            duration: RISE_DURATION,
            ease: EASE,
            onUpdate: () => {
              washRef.current?.style.setProperty("--r", `${holeProgress.r}px`);
              washRef.current?.style.setProperty("--cx", `${holeProgress.cx}px`);
              washRef.current?.style.setProperty("--cy", `${holeProgress.cy}px`);
            },
          },
          "rise"
        )
        .to(
          sunWrapRef.current,
          {
            width: SUN_DOCK_SIZE,
            height: SUN_DOCK_SIZE,
            filter: "grayscale(0) saturate(1) brightness(1)",
            duration: RISE_DURATION,
            ease: EASE,
          },
          "rise"
        )
        .to(
          glowRef.current,
          { opacity: 0, scale: 1, duration: RISE_DURATION * 0.4, ease: "sine.in" },
          "rise"
        )
        .call(() => setIntroAwake(true), [], `rise+=${RISE_DURATION * 0.6}`)
        .call(() => setSunDocked(true), [], `rise+=${RISE_DURATION}`)
        .to(
          travelRef.current,
          { opacity: 0, duration: HANDOFF_DURATION, ease: "power1.in" },
          `rise+=${RISE_DURATION}`
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
          <div
            ref={washRef}
            style={
              {
                position: "fixed",
                inset: 0,
                "--r": "0px",
                "--cx": "50vw",
                "--cy": "50vh",
                backgroundImage:
                  "radial-gradient(circle var(--r) at var(--cx) var(--cy), transparent 0%, transparent 60%, color-mix(in oklab, var(--accent) 15%, transparent) 74%, color-mix(in oklab, var(--accent) 20%, #1a1510) 88%, #1a1510 100%)",
              } as CSSProperties
            }
          />

          <div ref={travelRef} style={{ position: "fixed" }}>
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
              }}
            >
              <SunMarkV2 />
            </div>
          </div>
        </div>
      )}
    </IntroContext.Provider>
  );
}
