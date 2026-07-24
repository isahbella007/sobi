import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip /intro-preview (it's outside [locale], no prefix to add), Next
  // internals, and anything that looks like a static file (has a dot).
  matcher: ["/((?!api|_next|_vercel|intro-preview|.*\\..*).*)"],
};
