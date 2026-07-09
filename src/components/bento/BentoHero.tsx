"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useIntro } from "@/components/intro/IntroProvider";
import { Avatar } from "@/components/common/Avatar";
import { daughterName, daughterPhoto, serviceChips } from "@/content/site";

const tileBaseSx = {
  position: "relative",
  borderRadius: "16px",
  border: "1px solid var(--highlight)",
  p: 3,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 1,
  transition: "border-color 0.2s ease",
  "@media (prefers-reduced-motion: no-preference)": {
    transition: "transform 0.2s ease, border-color 0.2s ease",
    "&:hover": { transform: "translateY(-2px)" },
  },
} as const;

const labelSx = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.7rem",
  letterSpacing: "0.25em",
  textTransform: "uppercase" as const,
  color: "var(--accent)",
  opacity: 0.85,
};

export function BentoHero() {
  const { introAwake } = useIntro();
  const introTileRef = useRef<HTMLDivElement>(null);
  const servicesTileRef = useRef<HTMLDivElement>(null);
  const meetUsTileRef = useRef<HTMLDivElement>(null);
  const detailTileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!introAwake) return;

    const tiles = [
      introTileRef.current,
      servicesTileRef.current,
      meetUsTileRef.current,
      detailTileRef.current,
    ];

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(tiles, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      tiles,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.inOut", stagger: 0.06 }
    );
  }, [introAwake]);

  return (
    <Box
      component="section"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
        gridAutoRows: { xs: "auto", md: "minmax(140px, auto)" },
        gridAutoFlow: "dense",
        gap: 3,
        px: { xs: 3, md: 6 },
        pt: { xs: 3, md: 4 },
        pb: { xs: 3, md: 4 },
      }}
    >
      <Box
        ref={introTileRef}
        sx={{
          ...tileBaseSx,
          bgcolor: "var(--panel)",
          opacity: 0,
          gridColumn: { xs: "1 / -1", md: "span 2" },
          gridRow: { md: "span 2" },
        }}
      >
        <Typography sx={labelSx}>SOBI PROFESSIONELLE</Typography>
        <Typography
          component="h1"
          sx={{
            fontFamily: "var(--font-serif)",
            fontSize: { xs: "1.75rem", md: "2.25rem" },
            color: "var(--text)",
            lineHeight: 1.2,
          }}
        >
          Calm hands, clinical care — in the heart of Vienna.
        </Typography>
        <Typography sx={{ fontFamily: "var(--font-sans)", color: "var(--text)", opacity: 0.8 }}>
          A studio for your skin and feet, where being looked after feels as good as the results.
        </Typography>
        <Button component="a" href="#book" variant="contained" sx={{ alignSelf: "flex-start", mt: 1 }}>
          Book an appointment
        </Button>
      </Box>

      <Box
        ref={servicesTileRef}
        sx={{
          ...tileBaseSx,
          bgcolor: "var(--contrast)",
          opacity: 0,
          gridColumn: { xs: "1 / -1", md: "span 2" },
        }}
      >
        <Typography sx={labelSx}>WHAT WE DO</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {serviceChips.map((chip) => (
            <Box
              key={chip}
              component="a"
              href="#services"
              sx={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.8rem",
                px: 1.5,
                py: 0.5,
                borderRadius: "999px",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
                "&:hover": { bgcolor: "var(--accent)", color: "var(--contrast)" },
              }}
            >
              {chip}
            </Box>
          ))}
        </Box>
        <Typography sx={{ fontFamily: "var(--font-sans)", color: "var(--text)", opacity: 0.8 }}>
          Careful, thorough care you can actually feel.
        </Typography>
      </Box>

      <Box ref={meetUsTileRef} sx={{ ...tileBaseSx, bgcolor: "var(--panel)", opacity: 0 }}>
        <Typography sx={labelSx}>MEET US</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Avatar name="Sobi" size="sm" />
          <Avatar name={daughterName} src={daughterPhoto} size="sm" />
        </Box>
        <Typography
          sx={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text)", opacity: 0.8 }}
        >
          Sobi & {daughterName} — two generations, one standard.
        </Typography>
      </Box>

      <Box ref={detailTileRef} sx={{ ...tileBaseSx, bgcolor: "var(--contrast)", opacity: 0 }}>
        <Typography sx={labelSx}>THE DETAIL</Typography>
        <Typography sx={{ fontFamily: "var(--font-sans)", color: "var(--text)", opacity: 0.85 }}>
          We chose the best equipment on the market — because good enough was never the point.
        </Typography>
      </Box>
    </Box>
  );
}
