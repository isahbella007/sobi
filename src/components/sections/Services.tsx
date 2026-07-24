"use client";

import { useEffect, useRef, useState } from "react";
import type { SvgIconComponent } from "@mui/icons-material";
import SpaOutlined from "@mui/icons-material/SpaOutlined";
import FrontHandOutlined from "@mui/icons-material/FrontHandOutlined";
import WaterDropOutlined from "@mui/icons-material/WaterDropOutlined";
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

// No MUI icon reads as "foot" (SquareFoot is a ruler), so footCare gets a
// small hand-drawn footprint; the other three map onto existing icons.
function FootprintIcon({ sx }: { sx?: object }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      fill="none"
      sx={{ width: 20, height: 20, display: "block", ...sx }}
    >
      <path
        d="M9.6 21c-1.4 0-2.5-1.1-2.5-2.6 0-1.8.6-3 .6-4.9 0-2.2-1.1-3.3-1.1-5.8C6.6 4.9 7.9 3 9.7 3c2 0 3.2 1.9 3.2 5 0 2.7-.9 3.9-.9 6.6 0 1.7.5 2.7.5 4.1 0 1.2-1.1 2.3-2.9 2.3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="7.9" cy="4.4" r="0.9" fill="currentColor" />
      <circle cx="10.2" cy="3.5" r="0.9" fill="currentColor" />
      <circle cx="12.3" cy="4" r="0.8" fill="currentColor" />
      <circle cx="14" cy="5.1" r="0.7" fill="currentColor" />
    </Box>
  );
}

const SERVICE_ICONS: Record<string, SvgIconComponent> = {
  skincare: SpaOutlined,
  handCare: FrontHandOutlined,
  waxing: WaterDropOutlined,
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
            between services in sync with the auto-advancing highlight.
            Hidden on mobile: there's no room to do the image justice, so
            the text list gets a per-service icon instead (see below). */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: { md: "sticky" },
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
          {list.map((service, i) => {
            const ServiceIcon = SERVICE_ICONS[service.id];
            return (
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                {/* Mobile-only icon standing in for the (hidden) image panel. */}
                <Box
                  sx={{
                    display: { xs: "flex", md: "none" },
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1px solid",
                    borderColor: activeIndex === i ? "var(--accent)" : "var(--highlight)",
                    color: activeIndex === i ? "var(--accent)" : "var(--text)",
                    transition: "color 0.4s ease, border-color 0.4s ease",
                  }}
                >
                  {service.id === "footCare" ? (
                    <FootprintIcon />
                  ) : ServiceIcon ? (
                    <ServiceIcon sx={{ fontSize: 20 }} />
                  ) : null}
                </Box>
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
              </Box>
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
            );
          })}
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
