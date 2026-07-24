import { Cormorant_Garamond, Manrope } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeModeProvider } from "@/theme/ThemeModeProvider";
import "../globals.css";

// Independent root layout for this internal tool page — no next-intl, no
// IntroSwitcher. It compares the two real intro choreographies by loading
// them in iframes (see IntroPreviewClient), so the outer preview shell
// itself must never get an intro overlay layered on top of it.
const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function IntroPreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable}`}
    >
      <body>
        <AppRouterCacheProvider>
          <ThemeModeProvider>{children}</ThemeModeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
