"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import { Reveal } from "@/components/common/Reveal";
import { streetAddress, postalCity, openingHours, mapEmbedSrc, mapQuery } from "@/content/site";
import { locateAndScan, type ScanResult } from "@/lib/adventureMode";

const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;

function resultMessage(result: ScanResult): string {
  switch (result.kind) {
    case "nearby":
      return "Boom! You're practically on our doorstep.";
    case "minutes":
      return `Boom! You're only a ${result.minutes}-minute trip away.`;
    case "far":
      return `Whoa, that's a ${result.hours}-hour journey — worth the trip!`;
    case "denied":
      return "No worries — we didn't get your location. Feel free to just imagine how close you are.";
    case "error":
      return "The radar lost signal for a moment — mind trying again?";
  }
}

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
        bgcolor: "var(--panel)",
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
          title="SOBI Professionelle — map"
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
            Find us in the 12th
          </Typography>
          <Typography sx={{ fontFamily: "var(--font-sans)", color: "var(--text)", opacity: 0.85, mb: 1 }}>
            {streetAddress}, {postalCity}
          </Typography>
          <Typography sx={{ fontFamily: "var(--font-sans)", color: "var(--text)", opacity: 0.85, mb: 2 }}>
            {openingHours}
          </Typography>
          <Typography sx={{ fontFamily: "var(--font-sans)", color: "var(--accent)", fontStyle: "italic", mb: 3 }}>
            Easy to reach, easy to relax.
          </Typography>

          <Box
            sx={{
              borderTop: "1px solid var(--highlight)",
              pt: 2.5,
            }}
          >
            <Box
              component="label"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <ExploreOutlinedIcon sx={{ fontSize: 20, color: "var(--accent)" }} />
              <Typography
                sx={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  letterSpacing: "0.04em",
                  color: "var(--text)",
                }}
              >
                Adventure Mode — how close are you, really?
              </Typography>
              <Switch
                checked={adventureMode}
                onChange={(e) => handleToggle(e.target.checked)}
                size="small"
                sx={{
                  ml: "auto",
                  "& .MuiSwitch-track": { bgcolor: "var(--text)", opacity: 0.3 },
                  "& .Mui-checked+.MuiSwitch-track": { bgcolor: "var(--accent) !important", opacity: "0.5 !important" },
                  "& .Mui-checked .MuiSwitch-thumb": { bgcolor: "var(--accent)" },
                }}
              />
            </Box>

            <Collapse in={adventureMode}>
              <Box sx={{ pt: 2 }}>
                <Typography
                  sx={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8rem",
                    color: "var(--text)",
                    opacity: 0.65,
                    mb: 2,
                  }}
                >
                  We&rsquo;ll ask your browser for your location and do the math right there — nothing gets sent anywhere.
                </Typography>

                <Button
                  onClick={handleLocate}
                  disabled={phase === "scanning"}
                  variant="contained"
                  startIcon={<MyLocationOutlinedIcon />}
                  sx={{
                    bgcolor: "var(--accent)",
                    color: "var(--contrast)",
                    "&:hover": { bgcolor: "var(--accent)", opacity: 0.9 },
                    "&.Mui-disabled": { bgcolor: "var(--accent)", opacity: 0.4, color: "var(--contrast)" },
                  }}
                >
                  Locate me
                </Button>

                <Box sx={{ minHeight: 96, display: "flex", alignItems: "center", mt: phase === "idle" ? 0 : 2 }}>
                  {phase === "scanning" && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <RadarPulse />
                      <Typography
                        role="status"
                        aria-live="polite"
                        sx={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text)", opacity: 0.7 }}
                      >
                        Finding you…
                      </Typography>
                    </Box>
                  )}

                  {phase === "result" && result && (
                    <Box role="status" aria-live="polite" sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                      <Typography
                        sx={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.15rem",
                          color: "var(--text)",
                        }}
                      >
                        {resultMessage(result)}
                      </Typography>
                      {(result.kind === "nearby" || result.kind === "minutes" || result.kind === "far") && (
                        <Button
                          component="a"
                          href={navigationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<NearMeOutlinedIcon />}
                          size="small"
                          variant="outlined"
                          sx={{
                            alignSelf: "flex-start",
                            borderColor: "var(--accent)",
                            color: "var(--accent)",
                            "&:hover": { borderColor: "var(--accent)", bgcolor: "transparent", opacity: 0.85 },
                          }}
                        >
                          Launch Navigation Quest
                        </Button>
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            </Collapse>
          </Box>
        </Box>
      </Box>
    </Reveal>
  );
}
