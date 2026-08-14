import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ArchitectureSection } from "@/components/landing/ArchitectureSection";
import { DemoAccountsSection } from "@/components/landing/DemoAccountsSection";
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

        {/* 2. Features Grid */}
        <FeaturesSection />

        {/* 3. System Architecture & AI Cascade */}
        <ArchitectureSection />

        {/* 4. Quick Demo Credentials */}
        <DemoAccountsSection />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}