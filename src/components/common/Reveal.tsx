"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

let scrollTriggerRegistered = false;

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  id?: string;
  /** true -> default 0.06 stagger across direct children; a number for a
   *  custom stagger; omit to animate the wrapper as one block. */
  stagger?: boolean | number;
  y?: number;
  start?: string;
  sx?: SxProps<Theme>;
};

export function Reveal({ children, as = "div", id, stagger, y = 24, start = "top 85%", sx }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollTriggerRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerRegistered = true;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !ref.current) return;

    const target = stagger ? Array.from(ref.current.children) : ref.current;
    const staggerAmount = stagger === true ? 0.06 : typeof stagger === "number" ? stagger : 0;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.inOut",
          stagger: staggerAmount,
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [stagger, y, start]);

  return (
    <Box ref={ref} component={as} id={id} sx={sx}>
      {children}
    </Box>
  );
}
