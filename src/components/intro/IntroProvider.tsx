"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { SunMark } from "@/components/hero/SunMark";
import { SUN_DOCK_TOP, SUN_DOCK_SIZE } from "@/components/hero/sunDock";

const HOLD = 0.4;
// One unbroken rise from off-screen bottom to the dock spot; the page's
// opacity and the sun's color/size are all driven off this same duration so
// the reveal reads as the sun's motion, not a separate cross-fade.
const GLIDE_DURATION = 1.8;
const HANDOFF_DURATION = 0.45;
const DIMMED_OPACITY = 0.12;
const SUN_START_SIZE = 240;

type IntroContextValue = {
  /** True partway through the glide — Hero syncs its heading/tagline/CTA
   *  cascade to this rather than firing independently on mount. */
  introAwake: boolean;
  /** True the instant the sun reaches its dock spot — Hero's permanent
   *  SunMark crossfades in against the overlay's traveling one right here. */
  sunDocked: boolean;
};

const IntroContext = createContext<IntroContextValue>({
  introAwake: true,
  sunDocked: true,
});

export function useIntro() {
  return useContext(IntroContext);
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const travelRef = useRef<HTMLDivElement>(null);
  const sunWrapRef = useRef<HTMLDivElement>(null);

  const [introAwake, setIntroAwake] = useState(false);
  const [sunDocked, setSunDocked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // The CSS in globals.css already hides the overlay and shows full
      // content instantly for reduced-motion users; this just settles the
      // matching React state so Hero's own effects fire right away too.
      setIntroAwake(true);
      setSunDocked(true);
      setShowOverlay(false);
      return;
    }

    const ctx = gsap.context(() => {
      // Start the sun well below the bottom edge so it glides fully into
      // view rather than fading in already on-screen.
      gsap.set(travelRef.current, {
        xPercent: -50,
        y: window.innerHeight - SUN_DOCK_TOP + SUN_START_SIZE,
      });

      const tl = gsap.timeline({ delay: HOLD });

      tl.to(contentRef.current, { opacity: 1, duration: GLIDE_DURATION, ease: "power1.inOut" }, 0)
        .to(travelRef.current, { y: 0, duration: GLIDE_DURATION, ease: "power2.inOut" }, 0)
        .to(
          sunWrapRef.current,
          {
            width: SUN_DOCK_SIZE,
            height: SUN_DOCK_SIZE,
            filter: "grayscale(0) saturate(1) brightness(1)",
            duration: GLIDE_DURATION,
            ease: "power2.inOut",
          },
          0
        )
        // Glow blooms as the sun crosses the middle of the screen, then
        // clears before it settles into a small, glow-free logo mark.
        .to(glowRef.current, { opacity: 0.55, duration: GLIDE_DURATION * 0.45, ease: "sine.out" }, 0)
        .to(
          glowRef.current,
          { opacity: 0, duration: GLIDE_DURATION * 0.55, ease: "sine.in" },
          GLIDE_DURATION * 0.45
        )
        .call(() => setIntroAwake(true), [], GLIDE_DURATION * 0.55)
        .call(() => setSunDocked(true), [], GLIDE_DURATION)
        // Handoff: the traveling sun fades out right as Hero's permanent
        // mark fades in at the same dock coordinates.
        .to(travelRef.current, { opacity: 0, duration: HANDOFF_DURATION, ease: "power1.in" }, GLIDE_DURATION)
        .call(() => setShowOverlay(false));
    });

    return () => ctx.revert();
  }, []);

  return (
    <IntroContext.Provider value={{ introAwake, sunDocked }}>
      <div ref={contentRef} data-intro-content style={{ opacity: DIMMED_OPACITY }}>
        {children}
      </div>

      {showOverlay && (
        <div
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
              <SunMark />
            </div>
          </div>
        </div>
      )}
    </IntroContext.Provider>
  );
}
