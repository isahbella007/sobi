"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useIntro } from "@/components/intro/IntroProvider";
import { Typewriter } from "@/components/common/Typewriter";
import { heroHeadline, heroTypewriterWords, heroTagline, heroMessage } from "@/content/site";

export function Hero() {
  const { introAwake } = useIntro();
  const messageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!introAwake) return;

    const panels = [messageRef.current, headlineRef.current];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(panels, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      panels,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.inOut", stagger: 0.06 }
    );
  }, [introAwake]);

  return (
    <Box
      component="section"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: { xs: 6, md: 8 },
        alignItems: "center",
        px: { xs: 3, md: 6 },
        py: { xs: 6, md: 10 },
      }}
    >
       <Box ref={headlineRef} sx={{ opacity: 0, textAlign: { xs: "center", md: "left" } }}>
        <Typography
          component="h1"
          sx={{
            fontFamily: "var(--font-serif)",
            fontSize: { xs: "2rem", md: "2.75rem" },
            color: "var(--text)",
            lineHeight: 1.2,
            mb: 1,
          }}
        >
          {heroHeadline}
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--font-sans)",
            fontSize: { xs: "1.1rem", md: "1.35rem" },
            mb: 2,
            minHeight: "1.6em",
          }}
        >
          <Typewriter words={heroTypewriterWords} />
        </Typography>
        <Typography sx={{ fontFamily: "var(--font-sans)", color: "var(--text)", opacity: 0.75 }}>
          {heroTagline}
        </Typography>
      </Box>

      <Box ref={messageRef} sx={{ opacity: 0, textAlign: { xs: "center", md: "left" } }}>
        <Typography
          sx={{ fontFamily: "var(--font-sans)", color: "var(--text)", opacity: 0.85, lineHeight: 1.7, mb: 3 }}
        >
          {heroMessage}
        </Typography>
        <Button component="a" href="#book" variant="contained">
          Book an appointment
        </Button>
      </Box>

     
    </Box>
  );
}
