"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { PaletteToggle } from "@/components/PaletteToggle";
import { useIntro } from "@/components/intro/IntroProvider";
import { SunMark } from "./SunMark";
import { SUN_DOCK_TOP, SUN_DOCK_SIZE } from "./sunDock";

export function Hero() {
  const { introAwake, sunDocked } = useIntro();
  const containerRef = useRef<HTMLDivElement>(null);
  const sunWrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  // after the intro this is for the page showing 
  useEffect(() => {
    if (!introAwake) return;
    gsap.to([headingRef.current, taglineRef.current, ctaRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15,
    });
  }, [introAwake]);

  // this is for the sun being at the top of the screen
  useEffect(() => {
    if (!sunDocked) return;
    gsap.to(sunWrapperRef.current, { opacity: 1, duration: 0.45, ease: "power1.out" });
  }, [sunDocked]);

  return (
    <Box
      ref={containerRef}
      component="section"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        px: 3,
        gap: { xs: 3, md: 4 },
      }}
    >
      <Box
        ref={sunWrapperRef}
        sx={{
          position: "absolute",
          top: SUN_DOCK_TOP,
          left: "50%",
          transform: "translateX(-50%)",
          width: SUN_DOCK_SIZE,
          height: SUN_DOCK_SIZE,
          opacity: 0,
          zIndex: 1,
        }}
      >
        <SunMark />
      </Box>

      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: "54%",
          left: "50%",
          transform: "translateX(-50%)",
          width: { xs: "82%", sm: 480 },
          height: "1px",
          background:
            "linear-gradient(to right, transparent, var(--accent) 12%, var(--accent) 88%, transparent)",
          opacity: 0.6,
        }}
      />

      <Typography
        ref={headingRef}
        component="h1"
        variant="h1"
        sx={{
          opacity: 0,
          transform: "translateY(20px)",
          fontSize: { xs: "2.25rem", sm: "3rem", md: "3.75rem" },
          letterSpacing: "0.08em",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        SOBI Professionelle
      </Typography>

      <Typography
        ref={taglineRef}
        component="p"
        sx={{
          opacity: 0,
          transform: "translateY(20px)",
          fontFamily: "var(--font-sans)",
          fontSize: { xs: "0.75rem", sm: "0.8rem" },
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--accent)",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        Ruhe trifft klinische Sorgfalt
      </Typography>

      <Button
        ref={ctaRef}
        variant="contained"
        sx={{ opacity: 0, transform: "translateY(20px)", mt: 1, zIndex: 1 }}
      >
        Termin buchen
      </Button>

      <Box sx={{ position: "absolute", bottom: 20, right: 20, zIndex: 2 }}>
        <PaletteToggle />
      </Box>
    </Box>
  );
}
