"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
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
import { PaletteToggle } from "@/components/PaletteToggle";
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

// Display only — language switching isn't implemented yet.
const languageSx = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.75rem",
  letterSpacing: "0.1em",
  color: "var(--text)",
  opacity: 0.6,
};

export function Nav() {
  const { sunDocked, dockedMark } = useIntro();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <Box
      component="nav"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        height: NAV_HEIGHT,
        display: "grid",
        gridTemplateColumns: { xs: "auto 1fr auto", md: "1fr auto 1fr" },
        alignItems: "center",
        px: { xs: `${NAV_GUTTER_XS}px`, md: `${NAV_GUTTER_MD}px` },
        ml: { md: 4 },
        bgcolor: "transparent",
      }}
    >
      <Box
        component={Link}
        href="/"
        aria-label="Sobi Professionelle — home"
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
        <Box sx={{ width: SUN_DOCK_SIZE, height: SUN_DOCK_SIZE, flexShrink: 0 }}>
          {dockedMark ?? <SunMark />}
        </Box>
        <Box
          component="span"
          sx={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.15rem",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--text)",
          }}
        >
          Sobi
        </Box>
      </Box>

      <Box sx={{ display: { xs: "none", md: "flex" }, justifySelf: "center", alignItems: "center", gap: 5 }}>
        {navLinks.map((link) => (
          <Box key={link.href} component={Link} href={link.href} sx={linkSx}>
            {link.label}
          </Box>
        ))}
      </Box>

      <Box sx={{ justifySelf: "end", display: "flex", alignItems: "center", gap: { xs: 2, md: 3 } }}>
        <Box sx={languageSx}>EN&nbsp;|&nbsp;DE</Box>

        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <PaletteToggle />
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            aria-label="Open menu"
            onClick={(event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}
            sx={{ color: "var(--text)" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            {navLinks.map((link) => (
              <MenuItem
                key={link.href}
                component={Link}
                href={link.href}
                onClick={() => setAnchorEl(null)}
                sx={linkSx}
              >
                {link.label}
              </MenuItem>
            ))}
            <MenuItem
              disableRipple
              sx={{ justifyContent: "center", "&:hover": { bgcolor: "transparent" } }}
            >
              <PaletteToggle />
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}
