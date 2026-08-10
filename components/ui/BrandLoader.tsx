"use client";

import { Sparkles } from "lucide-react";

interface BrandLoaderProps {
  fullScreen?: boolean;
}

export default function BrandLoader({ fullScreen = true }: BrandLoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center transition-all ${
        fullScreen ? "fixed inset-0 z-50 min-h-screen w-full" : "min-h-[450px] w-full rounded-3xl"
      }`}
      style={{ background: "#0F3028" }}
    >
      {/* Glow Background Motif */}
      <div
        className="pointer-events-none absolute h-64 w-64 rounded-full opacity-20 blur-3xl animate-pulse"
        style={{ background: "#E8C98F" }}
      />

      <div className="relative z-10 flex flex-col items-center space-y-5">
        {/* Animated Brand Emblem & Spinner */}
        <div className="relative flex items-center justify-center">
          {/* Outer Spinning Ring */}
          <div className="h-20 w-20 rounded-full border-2 border-emerald-800/40 border-t-[#E8C98F] animate-spin" />

          {/* Center Interlocking Logo Mark */}
          <div className="absolute flex items-center justify-center">
            <div className="relative h-10 w-10">
              <div
                className="absolute top-0 left-0 h-6 w-6 rounded-sm shadow-md"
                style={{ background: "#E8C98F" }}
              />
              <div
                className="absolute bottom-0 right-0 h-6 w-6 rounded-sm shadow-md"
                style={{ background: "#EAD9B8" }}
              />
              <div
                className="absolute top-2 left-2 h-6 w-6 rounded-sm border-2 shadow-inner"
                style={{ borderColor: "#0F3028", background: "#E8C98F", opacity: 0.9 }}
              />
            </div>
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 animate-bounce" style={{ color: "#E8C98F" }} />
            <h1
              className="text-2xl font-black tracking-tight sm:text-3xl"
              style={{ color: "#E8C98F", fontFamily: "var(--font-manrope)" }}
            >
              Welcome to the Loop
            </h1>
          </div>

          <p
            className="text-xs font-semibold uppercase tracking-widest sm:text-sm"
            style={{ color: "rgba(249, 246, 239, 0.75)" }}
          >
            Feedback Analysis System
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-52 overflow-hidden rounded-full bg-emerald-950/80 p-0.5 border border-emerald-800/40">
          <div
            className="h-1.5 rounded-full animate-pulse"
            style={{
              background: "linear-gradient(90deg, #E8C98F 0%, #6B8F71 100%)",
              width: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
