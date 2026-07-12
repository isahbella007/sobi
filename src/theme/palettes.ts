export type PaletteId = "soft-luxury" | "earthy-opulence" | "butter-spa";

export const DEFAULT_PALETTE: PaletteId = "soft-luxury";

export const PALETTES: {
  id: PaletteId;
  label: string;
  description: string;
  // Literal accent hex, kept in sync with each [data-theme] block's --accent
  // in globals.css — used only for the toggle's preview swatches, which must
  // show every option's own color, not just the currently active var(--accent).
  swatch: string;
}[] = [
  {
    id: "soft-luxury",
    label: "Soft Luxury Clinic",
    description: "Warm Ivory · SOBI Terracotta · Espresso Brown",
    swatch: "#a55a2a",
  },
  
  {
    id: "earthy-opulence",
    label: "Earthy Opulence",
    description: "Putty Ivory · SOBI Terracotta · Deep Olive Night",
    swatch: "#a55a2a",
  },
  {
    id: "butter-spa",
    label: "Sun-Kissed Butter",
    description: "Soft Butter · SOBI Terracotta · Velvety Brown",
    swatch: "#F7EFCB",
  },
];

export const STORAGE_KEY = "sobi-palette";
