import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeModeProvider } from "@/theme/ThemeModeProvider";
import { IntroSwitcher } from "@/components/intro/IntroSwitcher";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "SOBI Professionelle",
  description:
    "Skincare & podologische Fußpflege in 1120 Wien — Skincare, Podologische Fußpflege, Handpflege, Waxing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      data-theme="soft-luxury"
      className={`${cormorant.variable} ${manrope.variable}`}
    >
      <body>
        <AppRouterCacheProvider>
          <ThemeModeProvider>
            <IntroSwitcher>{children}</IntroSwitcher>
          </ThemeModeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
