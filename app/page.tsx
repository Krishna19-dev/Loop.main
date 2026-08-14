import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { SystemMetricsSection } from "@/components/landing/SystemMetricsSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export const metadata = {
  title: "Project LOOP | AI Customer-Feedback Intelligence Platform",
  description:
    "Turn scattered customer feedback into a ranked, evidence-backed list of what to do next with Project LOOP.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F6EF] text-[#0F3028] font-sans selection:bg-[#E8C98F] selection:text-[#5C4A2A]">
      {/* Sticky Header Navbar */}
      <LandingHeader />

      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Problem Section */}
        <ProblemSection />

        {/* 3. How It Works Section */}
        <HowItWorksSection />

        {/* 4. Features Grid */}
        <FeaturesSection />

        {/* 5. High-Performance Infrastructure & System Capacity Metrics */}
        <SystemMetricsSection />

        {/* 6. Multi-tenant & Security Trust Strip */}
        <TrustSection />

        {/* 7. Final CTA Section */}
        <CtaSection />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}