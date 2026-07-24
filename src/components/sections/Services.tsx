"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Reveal } from "@/components/common/Reveal";
import { services } from "@/content/site";

const ROTATE_INTERVAL_MS = 3000;
const PANEL_HEIGHT = { xs: 280, md: 440 };

const PLACEHOLDER_IMAGES: Record<string, string> = {
  skincare: "/services/skincare.jpg",
  footCare: "/services/foot.jpg",
  handCare: "/services/manicure.jpg",
  waxing: "/services/waxing.jpg",
};

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const listRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("services");

  const list = services.map((s) => ({
    ...s,
    name: t(`items.${s.id}.name`),
    description: t(`items.${s.id}.description`),
  }));

  // Auto-advance the active service on a timer. The list stays in place —
  // only the highlight moves, and the list container auto-scrolls to keep
  // the highlighted row in view if it runs past the visible height.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return; // stays on the first service, no auto-rotation

    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % list.length);
    }, ROTATE_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [list.length]);

  useEffect(() => {
    const list = listRef.current;
    const row = rowRefs.current[activeIndex];
    if (!list || !row) return;

    const target = row.offsetTop - list.clientHeight / 2 + row.clientHeight / 2;
    list.scrollTo({
      top: Math.max(0, Math.min(target, list.scrollHeight - list.clientHeight)),
      behavior: "smooth",
    });
  }, [activeIndex]);

  return (
    <Reveal
      as="section"
      id="services"
      sx={{
        px: { xs: 3, md: 6 },
        py: { xs: 8, md: 12 },
        bgcolor: "var(--contrast)",
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontFamily: "var(--font-serif)",
          fontSize: { xs: "1.75rem", md: "2.25rem" },
          color: "var(--text)",
          textAlign: "center",
          mb: { xs: 4, md: 6 },
        }}
      >
        {t("heading")}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 4, md: 6 },
          maxWidth: 1100,
          mx: "auto",
        }}
      >
        {/* Image panel — same fixed height as the text list, crossfading
            between services in sync with the auto-advancing highlight. */}
        <Box
          sx={{
            position: { xs: "relative", md: "sticky" },
            top: { md: 120 },
            height: PANEL_HEIGHT,
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid var(--highlight)",
          }}
        >
          {list.map((service, i) => (
            <Box
              key={service.id}
              component="img"
              src={PLACEHOLDER_IMAGES[service.id]}
              alt={service.name}
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: activeIndex === i ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
            />
          ))}
        </Box>

        {/* Text column — on desktop it's capped to the image's height and
            auto-scrolls to keep the highlighted row in view; on mobile
            there's no room for that trick, so it just renders in full and
            the highlight cycles through the visible list. */}
        <Box
          ref={listRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: { md: PANEL_HEIGHT.md },
            overflowY: { md: "auto" },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {list.map((service, i) => (
            <Box
              key={service.id}
              ref={(el: HTMLDivElement | null) => {
                rowRefs.current[i] = el;
              }}
              sx={{
                py: { xs: 4, md: 5 },
                borderBottom: i < list.length - 1 ? "1px solid var(--highlight)" : "none",
                opacity: activeIndex === i ? 1 : 0.45,
                transition: "opacity 0.4s ease",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "var(--font-serif)",
                  fontSize: { xs: "1.4rem", md: "1.75rem" },
                  color: activeIndex === i ? "var(--accent)" : "var(--text)",
                  transition: "color 0.4s ease",
                }}
              >
                {service.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.95rem",
                  color: "var(--text)",
                  opacity: 0.8,
                  lineHeight: 1.6,
                  mt: 1,
                  maxWidth: 420,
                }}
              >
                {service.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* <Reveal
        stagger
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          gap: 3,
          maxWidth: 600,
          mx: "auto",
          mt: { xs: 6, md: 8 },
        }}
      >
        {lockedTeasers.map((teaser) => (
          <LockedTile key={teaser.label} label={teaser.label} sub={teaser.sub} />
        ))}
      </Reveal> */}
    </Reveal>
  );
}
