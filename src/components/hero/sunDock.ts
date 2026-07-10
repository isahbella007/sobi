// Shared between IntroProvider (the traveling splash sun) and Nav (the
// permanent docked mark) so the crossfade handoff lands pixel-for-pixel.
export const NAV_HEIGHT = 96;
export const SUN_DOCK_SIZE = 52;
export const SUN_DOCK_TOP = (NAV_HEIGHT - SUN_DOCK_SIZE) / 2;
export const NAV_GUTTER_XS = 24;
export const NAV_GUTTER_MD = 48;

// 900 matches MUI's default `md` breakpoint — keep this in lockstep with
// whatever breakpoint Nav uses for its own horizontal padding.
export function getSunDockLeft(viewportWidth: number) {
  return viewportWidth < 900 ? NAV_GUTTER_XS : NAV_GUTTER_MD;
}
