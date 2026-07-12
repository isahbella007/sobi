"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { IntroProvider } from "@/components/intro/IntroProvider";
import { IntroProviderV2 } from "@/components/intro/IntroProviderV2";

// Root-level switch between the two intro choreographies being trialed
// with the client. Every real visit (no ?intro=2 in the URL, any path
// other than the comparison page) gets exactly today's IntroProvider —
// this file is the only thing standing between "normal site" and
// "variant preview," so it defaults closed rather than open.
//
// /intro-preview manages its own intros per-iframe (each iframe is a full
// navigation to "/" with its own query string), so the outer preview page
// itself must not also get an intro overlay layered on top.
export function IntroSwitcher({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [variant, setVariant] = useState<"1" | "2" | null>(null);

  useEffect(() => {
    setVariant(new URLSearchParams(window.location.search).get("intro") === "2" ? "2" : "1");
  }, []);

  if (pathname?.startsWith("/intro-preview")) {
    return <>{children}</>;
  }

  if (variant === "2") {
    return <IntroProviderV2>{children}</IntroProviderV2>;
  }

  // variant === "1" or still null (pre-hydration) — both render v1,
  // matching the server-rendered markup so there's no hydration flash.
  return <IntroProvider>{children}</IntroProvider>;
}
