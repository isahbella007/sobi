"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useIntro } from "@/components/intro/IntroProvider";
import { SunMark } from "@/components/hero/SunMark";
import {
  NAV_HEIGHT,
  SUN_DOCK_SIZE,
  NAV_GUTTER_XS,
  NAV_GUTTER_MD,
} from "@/components/hero/sunDock";
import { navLinks } from "@/content/site";

const linkSx = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.75rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  color: "var(--text)",
  opacity: 0.75,
  "&:hover": { opacity: 1, color: "var(--accent)" },
};

const languageSx = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.75rem",
  letterSpacing: "0.1em",
  color: "var(--text)",
  textDecoration: "none",
};

export function Nav({ compact = false }: { compact?: boolean }) {
  const { sunDocked, dockedMark } = useIntro();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Box
      component="nav"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        height: compact ? 72 : NAV_HEIGHT,
        display: "grid",
        gridTemplateColumns: { xs: "auto 1fr auto", md: "1fr auto 1fr" },
        alignItems: "center",
        // Left padding folds in the 32px inset that used to be a separate
        // `ml` on this box — a margin excludes that strip from the box's
        // own background, so on scroll (once the bar gets a real bgcolor)
        // it left a gap showing the page behind it instead of a full-width
        // bar. Padding shifts the content the same way without that gap.
        pl: { xs: `${NAV_GUTTER_XS}px`, md: `${NAV_GUTTER_MD + 32}px` },
        pr: { xs: `${NAV_GUTTER_XS}px`, md: `${NAV_GUTTER_MD}px` },
        bgcolor: scrolled ? "color-mix(in oklch, var(--contrast) 92%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 8px 24px -16px color-mix(in oklch, var(--text) 40%, transparent)" : "none",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <Box
        component={Link}
        href="/"
        aria-label={t("brandAria")}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          // The wordmark fades in with the mark, as one lockup, rather
          // than trailing it — both share this single opacity switch.
          opacity: sunDocked ? 1 : 0,
          transition: "opacity 0.45s ease",
        }}
      >
        <Box sx={{ width: compact ? SUN_DOCK_SIZE * 0.7 : SUN_DOCK_SIZE, height: compact ? SUN_DOCK_SIZE * 0.7 : SUN_DOCK_SIZE, flexShrink: 0 }}>
          {dockedMark ?? <SunMark />}
        </Box>
        <Box
          component="span"
          sx={{
            fontFamily: "var(--font-serif)",
            fontSize: compact ? "0.95rem" : "1.15rem",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--text)",
          }}
        >
          {t("brand")}
        </Box>
      </Box>

      <Box sx={{ display: { xs: "none", md: "flex" }, justifySelf: "center", alignItems: "center", gap: compact ? 3.5 : 5 }}>
        {navLinks.map((link) => (
          <Box
            key={link.id}
            component={Link}
            href={link.href}
            sx={{ ...linkSx, fontSize: compact ? "0.7rem" : "0.75rem" }}
          >
            {t(`links.${link.id}`)}
          </Box>
        ))}
      </Box>

      <Box sx={{ justifySelf: "end", display: "flex", alignItems: "center", gap: { xs: 2, md: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          {routing.locales.map((l, i) => (
            <Box key={l} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              {i > 0 && <Box sx={{ ...languageSx, opacity: 0.4 }}>|</Box>}
              <Box
                component={Link}
                href={pathname}
                locale={l}
                aria-current={l === locale ? "true" : undefined}
                sx={{
                  ...languageSx,
                  opacity: l === locale ? 1 : 0.6,
                  fontWeight: l === locale ? 600 : 400,
                  "&:hover": { opacity: 1, color: "var(--accent)" },
                }}
              >
                {l.toUpperCase()}
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            aria-label={t("openMenuAria")}
            onClick={(event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}
            sx={{ color: "var(--text)" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            {navLinks.map((link) => (
              <MenuItem
                key={link.id}
                component={Link}
                href={link.href}
                onClick={() => setAnchorEl(null)}
                sx={linkSx}
              >
                {t(`links.${link.id}`)}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}
