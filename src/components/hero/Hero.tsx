"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useIntro } from "@/components/intro/IntroProvider";
import { RotatingWord } from "@/components/common/RotatingWord";
import { heroFootNoteHref, phoneNumberTel, services } from "@/content/site";

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
  const t = useTranslations("hero");
  // const tStats = useTranslations("stats");
  const tHours = useTranslations("openingHours");
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);

  // const stats = [
  //   { key: "clients", value: tStats("clients.value"), shortLabel: tStats("clients.shortLabel"), label: tStats("clients.label") },
  //   { key: "years", value: tStats("years.value"), shortLabel: tStats("years.shortLabel"), label: tStats("years.label") },
  //   {
  //     key: "services",
  //     value: `${services.length}`,
  //     shortLabel: tStats("services.shortLabel", { count: services.length }),
  //     label: tStats("services.label"),
  //   },
  // ];

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
        <Typography sx={{...eyebrowSx}}>{t("eyebrow")}</Typography>
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
          {t("headline")}
          <br />
          <RotatingWord words={t.raw("typewriterWords")} />
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
          {t("message")}
        </Typography>

        {/* <Button
          component="a"
          href={`tel:${phoneNumberTel}`}
          variant="contained"
          sx={{
            borderRadius: "44px",
            backgroundColor: "var(--highlight)",
            color:"#FFFFFF",
            "& .hero-cta-arrow": { transition: "transform 0.25s ease" },
            "&:hover .hero-cta-arrow": { transform: "translateX(4px)" },
          }}
        >
          {t("cta")}
          <Box component="span" className="hero-cta-arrow" sx={{ color:"#FFFFFF", display: "inline-block", ml: 1 }}>
            →
          </Box>
        </Button> */}

        <Box sx={{ mt: 5, display: { xs: "none", md: "block" } }}>
          <Typography sx={mutedSx}>{t("footNoteText", { hours: tHours("summary") })}</Typography>
          <Typography
            component="a"
            href={heroFootNoteHref}
            sx={{
              ...mutedSx,
              opacity: 1,
              color: "var(--accent)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            {t("footNoteLink")} →
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
