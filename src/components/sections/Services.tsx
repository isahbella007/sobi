import type { ComponentType } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SpaIcon from "@mui/icons-material/Spa";
import FaceIcon from "@mui/icons-material/Face";
import BackHandIcon from "@mui/icons-material/BackHand";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { Reveal } from "@/components/common/Reveal";
import { LockedTile } from "@/components/common/LockedTile";
import { services, lockedTeasers } from "@/content/site";

const ICONS: Record<string, ComponentType<{ sx?: object }>> = {
  Skincare: FaceIcon,
  "Foot care": SpaIcon,
  "Hand care": BackHandIcon,
  Waxing: ContentCutIcon,
};

export function Services() {
  return (
    <Reveal
      as="section"
      id="services"
      sx={{
        mx: { xs: 3, md: 6 },
        my: { xs: 6, md: 8 },
        px: { xs: 3, md: 6 },
        py: { xs: 6, md: 10 },
        borderRadius: "16px",
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
        What we do
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          gap: 4,
          maxWidth: 880,
          mx: "auto",
        }}
      >
        {services.map((service) => {
          const Icon = ICONS[service.name];
          return (
            <Box key={service.name} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  flexShrink: 0,
                  borderRadius: "50%",
                  bgcolor: "var(--panel)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon sx={{ color: "var(--accent)", fontSize: 22 }} />
              </Box>
              <Box>
                <Typography sx={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--text)" }}>
                  {service.name}
                  {service.germanName ? ` (${service.germanName})` : ""}
                </Typography>
                <Typography
                  sx={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text)", opacity: 0.8, mt: 0.5 }}
                >
                  {service.description}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Reveal
        stagger
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
          gap: 3,
          maxWidth: 880,
          mx: "auto",
          mt: { xs: 6, md: 8 },
        }}
      >
        {lockedTeasers.map((teaser) => (
          <LockedTile key={teaser.label} label={teaser.label} sub={teaser.sub} />
        ))}
      </Reveal>
    </Reveal>
  );
}
