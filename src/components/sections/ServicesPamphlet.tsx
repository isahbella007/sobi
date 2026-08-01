"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ServiceIcon } from "@/components/common/ServiceIcons";
import { MenuRow } from "@/components/common/MenuRow";
import { priceListCategories } from "@/content/site";

export function ServicesPamphlet() {
  const t = useTranslations("priceList");
  const tServices = useTranslations("services");
  const [activeCategory, setActiveCategory] = useState<string>(priceListCategories[0].id);
  const [pageIndex, setPageIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  // Runs after the panel has actually switched to display:block (mobile
  // only — on desktop it's already visible beside the cover, so scrolling
  // there would just be a jarring, unnecessary jump). Depends on
  // activeCategory too so re-picking a category while already open
  // re-centers it, not just the first open.
  useEffect(() => {
    if (!mobileOpen) return;
    if (window.innerWidth >= 900) return;
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [mobileOpen, activeCategory]);

  const category = priceListCategories.find((c) => c.id === activeCategory) ?? priceListCategories[0];
  const page = category.groups[pageIndex] ?? category.groups[0];
  const fromPrefix = t("fromPrefix");
  const hasPrev = pageIndex > 0;
  const hasNext = pageIndex < category.groups.length - 1;

  // A stylized pseudo-3D page turn — GSAP rotates/fades the current page
  // out on its Y-axis, swaps in the new content, then rotates/fades it in.
  // There's no page-curl library here (deliberately, to avoid a new
  // dependency); this is the closest a CSS transform can get to "flipping".
  function goTo(nextCategoryId: string, nextPage: number) {
    if (nextCategoryId === activeCategory && nextPage === pageIndex) return;

    timelineRef.current?.kill();
    const el = pageRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!el || reduceMotion) {
      setActiveCategory(nextCategoryId);
      setPageIndex(nextPage);
      return;
    }

    const tl = gsap.timeline();
    timelineRef.current = tl;
    tl.to(el, { rotationY: -90, opacity: 0, duration: 0.22, ease: "power2.in" })
      .add(() => {
        setActiveCategory(nextCategoryId);
        setPageIndex(nextPage);
      })
      .set(el, { rotationY: 90 })
      .to(el, { rotationY: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
  }

  function selectCategory(id: string) {
    goTo(id, 0);
    setMobileOpen(true);
  }

  return (
    <Box sx={{ bgcolor: "var(--bg)", py: { xs: 0, md: 8 }, px: { xs: 0, md: 6 } }}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "380px 1fr" },
          borderRadius: { xs: 0, md: "20px" },
          overflow: "hidden",
          boxShadow: { md: "0 30px 60px -30px color-mix(in oklch, var(--text) 35%, transparent)" },
        }}
      >
        {/* Cover — persistent, doesn't flip */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            bgcolor: "var(--panel)",
            px: { xs: 3, md: 5 },
            py: { xs: 6, md: 7 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(/flat.png)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "140%",
              opacity: 0.1,
              pointerEvents: "none",
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            
            <Typography
              component="h1"
              sx={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontSize: { xs: "1.9rem", md: "2.3rem" },
                lineHeight: 1.15,
                color: "var(--text)",
              }}
            >
              {t("heading")}
            </Typography>
          </Box>

          <Box sx={{ position: "relative", zIndex: 1, mt: { xs: 4, md: 5 }, display: "flex", flexDirection: "column", gap: 0.5 }}>
            {priceListCategories.map((cat) => {
              const isActive = cat.id === activeCategory;
              const count = cat.groups.reduce((sum, g) => sum + g.items.length, 0);
              return (
                <Box
                  key={cat.id}
                  onClick={() => selectCategory(cat.id)}
                  role="button"
                  tabIndex={0}
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 2,
                    py: 1.5,
                    borderRadius: "10px",
                    bgcolor: isActive ? "color-mix(in oklch, var(--accent) 15%, transparent)" : "transparent",
                    transition: "background-color 0.25s ease",
                    "&:hover": { bgcolor: "color-mix(in oklch, var(--accent) 10%, transparent)" },
                  }}
                >
                  <Box sx={{ color: isActive ? "var(--accent)" : "var(--text)", display: "flex", flexShrink: 0 }}>
                    <ServiceIcon id={cat.id} />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.95rem",
                        color: isActive ? "var(--accent)" : "var(--text)",
                      }}
                    >
                      {t(`tabs.${cat.id}`)}
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--text)", opacity: 0.6 }}
                    >
                      {tServices("itemCount", { count })}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Typography
            sx={{
              position: "relative",
              zIndex: 1,
              mt: "auto",
              pt: 4,
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              fontStyle: "italic",
              color: "var(--text)",
              opacity: 0.55,
            }}
          >
            {t("note")}
          </Typography>
        </Box>

        {/* Open page */}
        <Box
          ref={panelRef}
          sx={{
            display: { xs: mobileOpen ? "block" : "none", md: "block" },
            bgcolor: "var(--contrast)",
            px: { xs: 3, md: 6 },
            py: { xs: 4, md: 6 },
            perspective: "1400px",
          }}
        >
          <Box sx={{ display: { xs: "flex", md: "none" }, mb: 2 }}>
            <Box
              onClick={() => setMobileOpen(false)}
              role="button"
              tabIndex={0}
              sx={{
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                fontSize: "0.8rem",
                color: "var(--accent)",
              }}
            >
              ← {t("backToContents")}
            </Box>
          </Box>

          {/* Sub-category pills — a shortcut to jump straight to one of this
              category's pages (e.g. skincare has 7) instead of clicking
              Next repeatedly. Lives outside pageRef so it doesn't flip with
              the page content; only shown when there's more than one page. */}
          {category.groups.length > 1 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
              {category.groups.map((g, idx) => {
                const isActive = idx === pageIndex;
                return (
                  <Box
                    key={g.id}
                    onClick={() => goTo(activeCategory, idx)}
                    role="button"
                    tabIndex={0}
                    sx={{
                      cursor: "pointer",
                      px: 1.75,
                      py: 0.6,
                      borderRadius: "999px",
                      border: "1px solid",
                      borderColor: isActive ? "var(--accent)" : "var(--highlight)",
                      bgcolor: isActive ? "var(--accent)" : "transparent",
                      color: isActive ? "var(--contrast)" : "var(--text)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.75rem",
                      whiteSpace: "nowrap",
                      transition: "background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease",
                      "&:hover": {
                        borderColor: "var(--accent)",
                        color: isActive ? "var(--contrast)" : "var(--accent)",
                      },
                    }}
                  >
                    {t(`groups.${g.id}`)}
                  </Box>
                );
              })}
            </Box>
          )}

          <Box ref={pageRef}>
            {category.id === "footCare" && pageIndex === 0 && (
              <Typography
                sx={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                  color: "var(--accent)",
                  mb: 3,
                }}
              >
                {t("footCareNote")}
              </Typography>
            )}

            <Typography
              sx={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--highlight)",
                mb: 2,
              }}
            >
              {t(`groups.${page.id}`)}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {page.items.map((item) => (
                <MenuRow
                  key={item.id}
                  item={item}
                  name={t(`items.${item.id}.name`)}
                  description={t(`items.${item.id}.description`)}
                  fromPrefix={fromPrefix}
                />
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 4,
              pt: 3,
              borderTop: "1px solid var(--highlight)",
            }}
          >
            <IconButton
              disabled={!hasPrev}
              onClick={() => goTo(activeCategory, pageIndex - 1)}
              aria-label="Previous page"
              sx={{ color: hasPrev ? "var(--accent)" : "var(--highlight)" }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <Typography sx={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--text)", opacity: 0.6 }}>
              {t("pageOf", { current: pageIndex + 1, total: category.groups.length })}
            </Typography>
            <IconButton
              disabled={!hasNext}
              onClick={() => goTo(activeCategory, pageIndex + 1)}
              aria-label="Next page"
              sx={{ color: hasNext ? "var(--accent)" : "var(--highlight)" }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
