"use client";

import { useState, type MouseEvent } from "react";
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

export function Nav() {
  const { sunDocked } = useIntro();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <Box
      component="nav"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        height: NAV_HEIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: `${NAV_GUTTER_XS}px`, md: `${NAV_GUTTER_MD}px` },
        bgcolor: "transparent",
      }}
    >
      <Box
        sx={{
          width: SUN_DOCK_SIZE,
          height: SUN_DOCK_SIZE,
          opacity: sunDocked ? 1 : 0,
          transition: "opacity 0.45s ease",
        }}
      >
        <SunMark />
      </Box>

      <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 4 }}>
        {navLinks.map((link) => (
          <Box key={link.href} component="a" href={link.href} sx={linkSx}>
            {link.label}
          </Box>
        ))}
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
              component="a"
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
  );
}
