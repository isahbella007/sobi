import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";

import { FindUs } from "@/components/sections/FindUs";
import { Book } from "@/components/sections/Book";
import { Footer } from "@/components/Footer";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Statically generated per next-intl's docs: every page that will be
  // prerendered needs its own setRequestLocale call, not just the layout's
  // — otherwise the async server components below (Pricing, which reads
  // translations without an explicit locale) push the whole route to
  // on-demand rendering instead of build-time SSG.
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <Hero />
      <Services />
      {/* <Pricing /> */}
      {/* <Testimonials /> */}
      <FindUs />
      {/* <Book /> */}
      {/* <Footer /> */}
    </>
  );
}
