"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useIntro } from "@/components/intro/IntroProvider";
import { Avatar } from "@/components/common/Avatar";
import { daughterName, daughterPhoto } from "@/content/site";

// About sits close enough to the fold (right after the tightened Bento gap)
export function About() {
  const { introAwake } = useIntro();
  const avatarsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!introAwake) return;

    const panels = [avatarsRef.current, textRef.current];
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
      id="about"
      sx={{
        mx: { xs: 3, md: 6 },
        my: { xs: 6, md: 8 },
        px: { xs: 3, md: 6 },
        py: { xs: 6, md: 8 },
        borderRadius: "16px",
        bgcolor: "var(--panel)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 4, md: 8 },
          maxWidth: 860,
          mx: "auto",
        }}
      >
        <Box ref={avatarsRef} sx={{ display: "flex", gap: 2, flexShrink: 0, opacity: 0 }}>
          <Avatar name="Sobi" size="lg" />
          <Avatar name={daughterName} src={daughterPhoto} size="lg" />
        </Box>

        <Box ref={textRef} sx={{ textAlign: { xs: "center", md: "left" }, opacity: 0 }}>
          <Typography
            component="h2"
            sx={{
              fontFamily: "var(--font-serif)",
              fontSize: { xs: "1.75rem", md: "2.25rem" },
              color: "var(--text)",
              mb: 2,
            }}
          >
            Two generations of care
          </Typography>
          <Typography sx={{ fontFamily: "var(--font-sans)", color: "var(--text)", opacity: 0.85, lineHeight: 1.7 }}>
            SOBI is a small Vienna studio run by Sobi and her daughter {daughterName}. What
            started with one pair of expert hands is now two — the same attention to detail,
            passed down. We treat every client the way we&rsquo;d treat family: unhurried,
            thorough, and genuinely glad you came.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
