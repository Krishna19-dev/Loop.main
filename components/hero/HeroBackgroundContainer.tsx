"use client";

import dynamic from "next/dynamic";
import { HeroBackgroundFallback } from "@/components/hero/HeroBackground";

const HeroBackground = dynamic(() => import("@/components/hero/HeroBackground"), {
  ssr: false,
  loading: () => <HeroBackgroundFallback />,
});

export default function HeroBackgroundContainer() {
  return <HeroBackground />;
}
