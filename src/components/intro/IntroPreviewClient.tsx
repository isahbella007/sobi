"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const PANELS = [
  { key: "1" as const, label: "Intro 1 — current", src: "/?intro=1" },
  { key: "2" as const, label: "Intro 2 — new", src: "/?intro=2" },
];

export function IntroPreviewClient() {
  // Bumping a panel's replay count changes its iframe key, forcing a full
  // remount (and re-run of the intro timeline, which otherwise only ever
  // fires once on mount).
  const [replayCounts, setReplayCounts] = useState<Record<string, number>>({ "1": 0, "2": 0 });

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#1a1510", p: { xs: 2, md: 3 } }}>
      <Typography
        sx={{ color: "#fff", opacity: 0.7, mb: 2, fontFamily: "var(--font-sans)", fontSize: "0.85rem" }}
      >
        Internal preview — compare the two intro directions side by side (stacked on small screens).
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        {PANELS.map((panel) => (
          <Box key={panel.key} sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography sx={{ color: "#fff", fontFamily: "var(--font-serif)", fontSize: "1.1rem" }}>
                {panel.label}
              </Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={() =>
                  setReplayCounts((prev) => ({ ...prev, [panel.key]: prev[panel.key] + 1 }))
                }
                sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}
              >
                Replay
              </Button>
            </Box>

            <Box
              sx={{
                aspectRatio: "16 / 10",
                width: "100%",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <iframe
                key={`${panel.key}-${replayCounts[panel.key]}`}
                src={panel.src}
                title={panel.label}
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
