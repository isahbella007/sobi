import { defineRouting } from "next-intl/routing";

// Both locales always show in the URL (/en, /de) — no bare "/" for a
// "default" locale — so every page has a real, distinct, indexable URL
// per language. Bare "/" always redirects to defaultLocale (German) —
// localeDetection: false turns off Accept-Language/cookie sniffing, since
// the studio's real clientele is Vienna-based and every landing should be
// /de regardless of the visitor's browser language. The language switcher
// still works normally after that; this only governs the very first hit
// on an unprefixed URL.
export const routing = defineRouting({
  locales: ["en", "de"],
  defaultLocale: "de",
  localePrefix: "always",
  localeDetection: false,
});
