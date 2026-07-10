export type PaletteId = "soft-luxury" | "nude-spa" | "clinical-bronze";

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
    id: "nude-spa",
    label: "Nude Spa Glow",
    description: "Blush Ivory · Soft Bronze · Cocoa Brown",
    swatch: "#bc8a6a",
  },
  {
    id: "clinical-bronze",
    label: "Clinical Bronze",
    description: "Porcelain White · Heritage Bronze · Dark Umber",
    swatch: "#9c6b3e",
  },
];

export const STORAGE_KEY = "sobi-palette";
