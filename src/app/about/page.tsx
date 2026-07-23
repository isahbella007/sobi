import type { Metadata } from "next";
import { Nav } from "@/components/nav/Nav";
import { AboutContent } from "@/components/sections/AboutContent";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — SOBI Professionelle",
  description:
    "A family-run skincare and foot care studio in Vienna's Donaustadt district, run by a mother-and-daughter team since 2014.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <AboutContent />
      {/* <Footer /> */}
    </>
  );
}
