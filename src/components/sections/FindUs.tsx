"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import AccessibleOutlinedIcon from "@mui/icons-material/AccessibleOutlined";
import TrainOutlinedIcon from "@mui/icons-material/TrainOutlined";
import DirectionsBusOutlinedIcon from "@mui/icons-material/DirectionsBusOutlined";
import TramOutlinedIcon from "@mui/icons-material/TramOutlined";
import LocalTaxiOutlinedIcon from "@mui/icons-material/LocalTaxiOutlined";
import PedalBikeOutlinedIcon from "@mui/icons-material/PedalBikeOutlined";
import LocalParkingOutlinedIcon from "@mui/icons-material/LocalParkingOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import type { SvgIconComponent } from "@mui/icons-material";
import { Reveal } from "@/components/common/Reveal";
import { streetAddress, postalCity, phoneNumber, phoneNumberTel, mapEmbedSrc, mapQuery, findUsPerks } from "@/content/site";
import { locateAndScan, type ScanResult } from "@/lib/adventureMode";

const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;

const PERK_ICONS: Record<(typeof findUsPerks)[number], SvgIconComponent> = {
  accessible: AccessibleOutlinedIcon,
  u1Kagran: TrainOutlinedIcon,
  bus26A: DirectionsBusOutlinedIcon,
  tram25: TramOutlinedIcon,
  taxiStand: LocalTaxiOutlinedIcon,
  bikeParking: PedalBikeOutlinedIcon,
  parkingGarage: LocalParkingOutlinedIcon,
  donauZentrum: LocalMallOutlinedIcon,
};

function RadarPulse() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "relative",
        width: 56,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "@keyframes radarPulse": {
          "0%": { transform: "scale(0.25)", opacity: 0.7 },
          "100%": { transform: "scale(1.9)", opacity: 0 },
        },
      }}
    >
      {[0, 0.3, 0.6].map((delay) => (
        <Box
          key={delay}
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid var(--accent)",
            animation: "radarPulse 1.2s ease-out infinite",
            animationDelay: `${delay}s`,
          }}
        />
      ))}
      <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "var(--accent)" }} />
    </Box>
  );
}

export function FindUs() {
  const [adventureMode, setAdventureMode] = useState(false);
  const [phase, setPhase] = useState<"idle" | "scanning" | "result">("idle");
  const [result, setResult] = useState<ScanResult | null>(null);
  const t = useTranslations("findUs");
  const tResults = useTranslations("findUs.adventure.results");
  const tHours = useTranslations("openingHours");
  const hoursRows = tHours.raw("rows") as { days: string; hours: string }[];

  function resultMessage(result: ScanResult): string {
    switch (result.kind) {
      case "nearby":
        return tResults("nearby");
      case "minutes":
        return tResults("minutes", { minutes: result.minutes });
      case "far":
        return tResults("far", { hours: result.hours });
      case "denied":
        return tResults("denied");
      case "error":
        return tResults("error");
    }
  }

  function handleToggle(next: boolean) {
    setAdventureMode(next);
    setPhase("idle");
    setResult(null);
  }

  async function handleLocate() {
    if (phase === "scanning") return;

    setPhase("scanning");
    setResult(null);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [scanResult] = await Promise.all([
      locateAndScan(),
      reduceMotion ? Promise.resolve() : new Promise((resolve) => setTimeout(resolve, 1000)),
    ]);

    setResult(scanResult);
    setPhase("result");
  }

  return (
    <Reveal
      as="section"
      id="find-us"
      sx={{
        px: { xs: 3, md: 6 },
        py: { xs: 8, md: 12 },
        bgcolor: "var(--contrast)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 6 },
          maxWidth: 1000,
          mx: "auto",
        }}
      >
        <Box
          component="iframe"
          src={mapEmbedSrc}
          loading="lazy"
          title={t("mapTitle")}
          sx={{
            border: "1px solid var(--highlight)",
            borderRadius: "16px",
            width: "100%",
            height: { xs: 300, md: 380 },
            flex: { md: "1 1 55%" },
          }}
        />

        <Box sx={{ flex: { md: "1 1 45%" }, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography
            component="h2"
            sx={{ fontFamily: "var(--font-serif)", fontSize: { xs: "1.75rem", md: "2.25rem" }, color: "var(--text)", mb: 2 }}
          >
            {t("heading")}
          </Typography>
          <Typography sx={{ fontFamily: "var(--font-sans)", color: "var(--text)", opacity: 0.85, mb: 1 }}>
            {streetAddress}, {postalCity}
          </Typography>
          <Box sx={{ mb: 2 }}>
            {hoursRows.map((row) => (
              <Typography
                key={row.days}
                sx={{ fontFamily: "var(--font-sans)", color: "var(--text)", opacity: 0.85, fontSize: "0.95rem" }}
              >
                <Box component="span" sx={{ fontWeight: 600 }}>
                  {row.days}
                </Box>{" "}
                — {row.hours}
              </Typography>
            ))}
          </Box>
          <Typography sx={{ fontFamily: "var(--font-sans)", color: "var(--accent)", fontStyle: "italic", mb: 3 }}>
            {t("tagline")}
          </Typography>

          <Typography
            component="a"
            href={`tel:${phoneNumberTel}`}
            sx={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              color: "var(--accent)",
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              width: "fit-content",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            <CallOutlinedIcon sx={{ fontSize: 18 }} />
            {phoneNumberTel}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: 1000,
          mx: "auto",
          mt: { xs: 6, md: 7 },
          pt: { xs: 4, md: 5 },
          borderTop: "1px solid var(--highlight)",
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--highlight)",
            mb: 2.5,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {t("perksHeading")}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)" },
            gap: { xs: 2.5, md: 3 },
          }}
        >
          {findUsPerks.map((id) => {
            const Icon = PERK_ICONS[id];
            return (
              <Box key={id} sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}>
                <Icon sx={{ fontSize: 20, color: "var(--accent)", flexShrink: 0, mt: "1px" }} />
                <Typography
                  sx={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    color: "var(--text)",
                    opacity: 0.85,
                    lineHeight: 1.4,
                  }}
                >
                  {t(`perks.${id}`)}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Reveal>
  );
}
