import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/nav/Nav";
import { AboutContent } from "@/components/sections/AboutContent";
import { Footer } from "@/components/Footer";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}/about`])),
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <AboutContent />
      {/* <Footer /> */}
    </>
  );
}
