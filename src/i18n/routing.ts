import { defineRouting } from "next-intl/routing";

// Both locales always show in the URL (/en, /de) — no bare "/" for a
// "default" locale — so every page has a real, distinct, indexable URL
// per language. Bare "/" is handled by the middleware's Accept-Language
// detection, which falls back to defaultLocale when it can't tell.
export const routing = defineRouting({
  locales: ["en", "de"],
  defaultLocale: "de",
  localePrefix: "always",
});
