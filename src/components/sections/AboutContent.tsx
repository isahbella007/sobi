"use client";

import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import { Reveal } from "@/components/common/Reveal";
import { Avatar } from "@/components/common/Avatar";
import { daughterName, daughterPhoto } from "@/content/site";

const eyebrowSx = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.75rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  color: "var(--text-highlight)",
  mb: 1.5,
};

const bodySx = {
  fontFamily: "var(--font-sans)",
  fontSize: { xs: "1rem", md: "1.05rem" },
  color: "var(--text)",
  opacity: 0.85,
  lineHeight: 1.8,
};

export function AboutContent() {
  const t = useTranslations("about");
  const founding = t("paragraphs.founding");
  const personal = t("paragraphs.personal");
  const team = t("paragraphs.team");
  const training = t("paragraphs.training");
  const hygiene = t("paragraphs.hygiene");
  const credential = t("paragraphs.credential");

  return (
    <>
      {/* Banner */}
      <Box
        component="section"
        sx={{
          position: "relative",
          overflow: "hidden",
          px: { xs: 3, md: 6 },
          py: { xs: 7, md: 9 },
          bgcolor: "var(--bg)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            maxWidth: 640,
            mx: "auto",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography sx={eyebrowSx}>{t("eyebrow")}</Typography>
          <Box
            sx={{
              width: 48,
              height: "2px",
              bgcolor: "var(--highlight)",
              mb: 2,
              mx: { xs: "auto", md: 0 },
            }}
          />
          <Typography
            component="h1"
            sx={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              fontSize: { xs: "2.5rem", md: "clamp(2.75rem, 4.5vw, 4rem)" },
              color: "var(--text)",
              lineHeight: 1.1,
            }}
          >
            {t("h1")}
          </Typography>
        </Box>

        {/* Echoes the Hero's wreath motif so the page still feels like SOBI, not a generic doc page. */}
        <Box
          aria-hidden
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: "50%",
            right: "-4%",
            transform: "translateY(-50%)",
            width: 420,
            aspectRatio: "1 / 1",
            backgroundImage: "url(/wreath_transparent.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            opacity: 0.35,
            pointerEvents: "none",
          }}
        />
      </Box>

      {/* Block A — the founding line, then the 30-year story pulled out as a first-person quote */}
      <Reveal as="section" stagger sx={{ px: { xs: 3, md: 6 }, py: { xs: 8, md: 10 }, bgcolor: "var(--contrast)" }}>
        <Box sx={{ maxWidth: 640, mx: "auto" }}>
          <Typography sx={{ ...bodySx, mb: 4 }}>{founding}</Typography>
          <Box sx={{ borderLeft: "3px solid var(--accent)", pl: { xs: 2.5, md: 3 } }}>
            <Typography
              sx={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: { xs: "1.15rem", md: "1.3rem" },
                color: "var(--text)",
                lineHeight: 1.7,
              }}
            >
              {personal}
            </Typography>
          </Box>
        </Box>
      </Reveal>

      {/* Block B — the mother-daughter team, faces placed right beside the paragraph about them */}
      <Reveal as="section" sx={{ px: { xs: 3, md: 6 }, py: { xs: 8, md: 10 }, bgcolor: "var(--contrast)" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 4, md: 7 },
            maxWidth: 780,
            mx: "auto",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Avatar name="Sobi" size="lg" />
              <Avatar name={daughterName} src={daughterPhoto} size="lg" />
            </Box>
          </Box>
          <Typography sx={{ ...bodySx, textAlign: { xs: "center", md: "left" } }}>{team}</Typography>
        </Box>
      </Reveal>

      {/* Block C — training + hygiene, side by side as two parallel commitments rather than stacked paragraphs */}
      <Reveal as="section" stagger sx={{ px: { xs: 3, md: 6 }, py: { xs: 8, md: 10 }, bgcolor: "var(--contrast)" }}>
        <Typography
          component="h2"
          sx={{
            fontFamily: "var(--font-serif)",
            fontSize: { xs: "1.5rem", md: "1.85rem" },
            color: "var(--text)",
            textAlign: "center",
            mb: { xs: 5, md: 6 },
          }}
        >
          {t("pillarsHeading")}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 5, md: 6 },
            maxWidth: 900,
            mx: "auto",
          }}
        >
          <Box>
            <SchoolOutlinedIcon sx={{ fontSize: 28, color: "var(--accent)", mb: 1.5 }} />
            <Typography sx={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: "var(--text)", mb: 1.5 }}>
              {t("pillars.training")}
            </Typography>
            <Typography sx={bodySx}>{training}</Typography>
          </Box>
          <Box>
            <HealthAndSafetyOutlinedIcon sx={{ fontSize: 28, color: "var(--accent)", mb: 1.5 }} />
            <Typography sx={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: "var(--text)", mb: 1.5 }}>
              {t("pillars.hygiene")}
            </Typography>
            <Typography sx={bodySx}>{hygiene}</Typography>
          </Box>
        </Box>
      </Reveal>

      {/* Block D — WKO membership, set apart as a trust badge rather than another paragraph */}
      <Reveal as="section" sx={{ px: { xs: 3, md: 6 }, py: { xs: 8, md: 10 }, bgcolor: "var(--bg)", textAlign: "center" }}>
        <Box sx={{ maxWidth: 560, mx: "auto" }}>
          <WorkspacePremiumOutlinedIcon sx={{ fontSize: 32, color: "var(--accent)", mb: 2 }} />
          <Typography
            sx={{
              fontFamily: "var(--font-sans)",
              fontStyle: "italic",
              fontSize: "0.95rem",
              color: "var(--text)",
              opacity: 0.75,
              lineHeight: 1.7,
            }}
          >
            {credential}
          </Typography>
        </Box>
      </Reveal>
    </>
  );
}
