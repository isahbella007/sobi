import type { Metadata } from "next";
import { IntroPreviewClient } from "@/components/intro/IntroPreviewClient";

// Internal comparison page for the client — not part of the site, so it
// stays out of search results and off the real nav.
export const metadata: Metadata = {
  title: "Intro comparison",
  robots: { index: false, follow: false },
};

export default function IntroPreviewPage() {
  return <IntroPreviewClient />;
}
