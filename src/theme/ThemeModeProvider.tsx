"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { muiTheme } from "./muiTheme";
import { DEFAULT_PALETTE, STORAGE_KEY, type PaletteId } from "./palettes";

type ThemeModeContextValue = {
  paletteId: PaletteId;
  setPaletteId: (id: PaletteId) => void;
};

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  }
  return ctx;
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [paletteId, setPaletteIdState] = useState<PaletteId>(DEFAULT_PALETTE);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as PaletteId | null;
    if (stored) setPaletteIdState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = paletteId;
  }, [paletteId]);

  const setPaletteId = (id: PaletteId) => {
    setPaletteIdState(id);
    window.localStorage.setItem(STORAGE_KEY, id);
  };

  const value = useMemo(() => ({ paletteId, setPaletteId }), [paletteId]);

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
