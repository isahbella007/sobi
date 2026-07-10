"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Box from "@mui/material/Box";

type RotatingWordProps = {
  words: string[];
  holdDuration?: number;
  color?: string;
};

// Fades + slides from one word to the next on a loop — the outgoing word
// glides up and out while the incoming word glides up into place, both in
// the same direction. Reduced-motion users get the first word, static.
export function RotatingWord({ words, holdDuration = 2000, color = "var(--accent)" }: RotatingWordProps) {
  const [display, setDisplay] = useState(words[0]);
  const wordRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const scheduleSwap = () => {
      timeoutId = setTimeout(() => {
        if (cancelled || !wordRef.current) return;
        gsap.to(wordRef.current, {
          opacity: 0,
          y: -16,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            if (cancelled) return;
            indexRef.current = (indexRef.current + 1) % words.length;
            setDisplay(words[indexRef.current]);
            gsap.fromTo(
              wordRef.current,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", onComplete: scheduleSwap }
            );
          },
        });
      }, holdDuration);
    };

    scheduleSwap();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      gsap.killTweensOf(wordRef.current);
    };
  }, [words, holdDuration]);

  return (
    <Box component="span" ref={wordRef} sx={{ display: "inline-block", fontStyle: "italic", color }}>
      {display}
    </Box>
  );
}
