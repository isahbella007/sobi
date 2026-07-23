"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useIntro } from "@/components/intro/IntroProvider";
import { RotatingWord } from "@/components/common/RotatingWord";
import {
  heroHeadline,
  heroTypewriterWords,
  heroTagline,
  heroMessage,
  heroFootNote,
  heroRating,
  stats,
} from "@/content/site";

const eyebrowSx = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.75rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  color: "var(--text-highlight)",
  mb: 1.5,
};

const mutedSx = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.8rem",
  color: "var(--text)",
  opacity: 0.65,
  lineHeight: 1.6,
};

export function Hero() {
  const { introAwake } = useIntro();
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!introAwake) return;

    const textAndStats = [textRef.current, sideRef.current];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(textAndStats, { opacity: 1, y: 0 });
      gsap.set(imageRef.current, { opacity: 0.22 });
      gsap.set(mobileImageRef.current, { opacity: 0.1 });
      return;
    }

    gsap.fromTo(
      textAndStats,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.inOut", stagger: 0.08 }
    );
    gsap.fromTo(
      imageRef.current,
      { opacity: 0 },
      { opacity: 0.7, duration: 0.5, ease: "power3.inOut", stagger: 0.08 }
    );
    gsap.fromTo(
      mobileImageRef.current,
      { opacity: 0 },
      { opacity: 0.1, duration: 0.5, ease: "power3.inOut", stagger: 0.08 }
    );

  }, [introAwake]);

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "stretch", md: "center" },
        gap: { xs: 6, md: 4 },
        px: { xs: 3, md: 6 },
        py: { xs: 6, md: 10 },
        ml: { md:4}
      }}
    >
      {/* LEFT — headline, lead copy, CTA, opening-hours note */}
      <Box
        ref={textRef}
        sx={{
          opacity: 0,
          position: "relative",
          zIndex: 1,
          flex: { md: "1.15 1 0%" },
          minWidth: 0,
          textAlign: "left",
        }}
      >
        <Typography sx={{...eyebrowSx}}>SOBI PROFESSIONELLE</Typography>
        <Box
          sx={{
            width: 48,
            height: "2px",
            bgcolor: "var(--highlight)",
            mb: 2,
          }}
        />
        <Typography
          component="h1"
          sx={{
            fontFamily: "var(--font-serif)",
            fontWeight: 400,
            fontSize: { xs: "2.75rem", md: "clamp(3rem, 5.2vw, 4.75rem)" },
            color: "var(--text)",
            lineHeight: 1.05,
          }}
        >
          {heroHeadline}
          <br />
          <RotatingWord words={heroTypewriterWords} />
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--font-sans)",
            fontSize: "1rem",
            color: "var(--text)",
            opacity: 0.85,
            lineHeight: 1.7,
            maxWidth: 400,
            mt:2,
            mb: 2,
          }}
        >
          {heroMessage}
        </Typography>

        {/* Mobile-only compact stats — sits before the CTA, left-aligned
            like every other line in this block (desktop keeps its own
            tick-row treatment over in the sideRef column). */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            gap: 1,
            mb: 3,
          }}
        >
          {stats.map((stat, i) => (
            <Box key={stat.label} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                sx={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.95rem",
                  letterSpacing: "0.02em",
                  color: "var(--text)",
                  opacity: 0.85,
                  whiteSpace: "nowrap",
                }}
              >
                {stat.shortLabel}
              </Typography>
              {i < stats.length - 1 && (
                <Box component="span" sx={{ color: "var(--highlight)", opacity: 0.7, fontSize: "0.95rem" }}>
                  ·
                </Box>
              )}
            </Box>
          ))}
        </Box>

        <Button
          component="a"
          href="#book"
          variant="contained"
          sx={{
            borderRadius: "44px",
            backgroundColor: "var(--highlight)",
            color:"#FFFFFF",
            "& .hero-cta-arrow": { transition: "transform 0.25s ease" },
            "&:hover .hero-cta-arrow": { transform: "translateX(4px)" },
          }}
        >
          Book an appointment
          <Box component="span" className="hero-cta-arrow" sx={{ color:"#FFFFFF", display: "inline-block", ml: 1 }}>
            →
          </Box>
        </Button>

        <Box sx={{ mt: 5, display: { xs: "none", md: "block" } }}>
          <Typography sx={mutedSx}>{heroFootNote.text}</Typography>
          <Typography
            component="a"
            href={heroFootNote.href}
            sx={{
              ...mutedSx,
              opacity: 1,
              color: "var(--accent)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            {heroFootNote.linkLabel} →
          </Typography>
        </Box>
      </Box>

      {/* One large wreath, faded, sitting in the right-middle behind the stats — not tiled. Desktop only. */}
      <Box
        ref={imageRef}
        aria-hidden="true"
        sx={{
          opacity: 0,
          display: { xs: "none", md: "block" },
          position: "absolute",
          top: "50%",
          right: { md: "3%" },
          transform: "translateY(-50%)",
          width: { md: 480, lg: 600 },
          aspectRatio: "1 / 1",
          backgroundImage: "url(/wreath_transparent.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          // maskImage: "radial-gradient(closest-side, black 62%, transparent 100%)",
          // WebkitMaskImage: "radial-gradient(closest-side, black 62%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Mobile-only backdrop — flat.png (leaves) tiled at low opacity
          across the entire section, standing in for the desktop wreath. */}
      <Box
        ref={mobileImageRef}
        aria-hidden="true"
        sx={{
          opacity: 0,
          display: { xs: "block", md: "none" },
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/flat.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "340px 340px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* RIGHT — stats as tick rows, desktop only. The mobile stats live
          inline in the LEFT block above, before the CTA. */}
      <Box
        ref={sideRef}
        sx={{
          opacity: 0,
          position: "relative",
          zIndex: 1,
          right: { md: 60, lg: 200, xl: 300 }, // increase to shift left, use a negative value to shift right
          textAlign: "left",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 2.5,
          }}
        >
          {stats.map((stat) => (
            <Box key={stat.label} sx={{ display: "flex", alignItems: "center", gap: 1.5, justifyContent: "flex-end" }}>
              <Box sx={{ width: 22, height: "1px", bgcolor: "var(--highlight)", flexShrink: 0 }} />
              <Typography sx={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--text)", whiteSpace: "nowrap" }}>
                <Box component="span" sx={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--text)", mr: 0.5 }}>
                  {stat.value}
                </Box>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* <Box sx={{ mt: { xs: 1, md: 3 } }}>
          <Typography sx={{ fontFamily: "var(--font-serif)", fontSize: "2.25rem", color: "var(--text)", lineHeight: 1 }}>
            {heroRating.score}
            <Box component="span" sx={{ fontSize: "1.1rem", color: "var(--text)", opacity: 0.6 }}>
              /{heroRating.outOf}
            </Box>
          </Typography>
          <Typography sx={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text)", opacity: 0.55, mt: 0.5 }}>
            From {heroRating.reviewCount} guest reviews
          </Typography>
        </Box> */}
      </Box>
    </Box>
  );
}
