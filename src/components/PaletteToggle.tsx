"use client";

import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import { useThemeMode } from "@/theme/ThemeModeProvider";
import { PALETTES, type PaletteId } from "@/theme/palettes";

export function PaletteToggle() {
  const { paletteId, setPaletteId } = useThemeMode();

  return (
    <ToggleButtonGroup
      value={paletteId}
      exclusive
      size="small"
      onChange={(_, next: PaletteId | null) => {
        if (next) setPaletteId(next);
      }}
      sx={{
        bgcolor: "var(--contrast)",
        border: "1px solid var(--accent)",
        borderRadius: "999px",
        p: "3px",
        gap: "2px",
        opacity: 0.55,
        transition: "opacity 0.3s ease",
        "&:hover, &:focus-within": { opacity: 1 },
        "& .MuiToggleButtonGroup-grouped": {
          border: "none",
          borderRadius: "999px !important",
        },
      }}
    >
      {PALETTES.map((p) => (
        <Tooltip key={p.id} title={`${p.label} — ${p.description}`} arrow>
          <ToggleButton
            value={p.id}
            aria-label={p.label}
            sx={{
              width: 22,
              height: 22,
              minWidth: 0,
              p: 0,
              border: "1px solid var(--accent)",
              "&.Mui-selected": {
                boxShadow: "0 0 0 2px var(--accent)",
                "&:hover": { bgcolor: "transparent" },
              },
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: p.swatch,
              }}
            />
          </ToggleButton>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
}
