"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface MatchAndMoveSplashProps {
  onComplete?: () => void;
}

export default function MatchAndMoveSplash({ onComplete }: MatchAndMoveSplashProps) {
  const [phase, setPhase] = useState<"center" | "moving" | "done">("center");

  useEffect(() => {
    // Phase 1: Stay centered for 900ms
    const t1 = setTimeout(() => {
      setPhase("moving");
    }, 900);

    // Phase 2: Smooth match and move fade out by 1500ms
    const t2 = setTimeout(() => {
      setPhase("done");
      if (onComplete) onComplete();
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  const isMoving = phase === "moving";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-700 ease-in-out ${
        isMoving ? "bg-opacity-0 pointer-events-none" : "bg-[#0F3028]"
      }`}
      style={{
        background: isMoving ? "transparent" : "#0F3028",
      }}
    >
      {/* Background Radial Glow */}
      <div
        className={`absolute h-96 w-96 rounded-full opacity-25 blur-3xl transition-all duration-700 ${
          isMoving ? "scale-150 opacity-0" : "scale-100 animate-pulse"
        }`}
        style={{ background: "#E8C98F" }}
      />

      {/* Main Container with Match and Move transition */}
      <div
        className={`relative z-10 flex flex-col items-center space-y-4 transition-all duration-700 ease-in-out ${
          isMoving
            ? "-translate-y-20 scale-75 opacity-0"
            : "translate-y-0 scale-100 opacity-100"
        }`}
      >
        {/* Interlocking LOOP Logo Mark & Spinner */}
        <div className="relative flex items-center justify-center">
          <div className="h-20 w-20 rounded-full border-2 border-emerald-800/40 border-t-[#E8C98F] animate-spin" />

          <div className="absolute flex items-center justify-center">
            <div className="relative h-10 w-10">
              <div
                className="absolute top-0 left-0 h-6 w-6 rounded-sm shadow-lg"
                style={{ background: "#E8C98F" }}
              />
              <div
                className="absolute bottom-0 right-0 h-6 w-6 rounded-sm shadow-lg"
                style={{ background: "#EAD9B8" }}
              />
              <div
                className="absolute top-2 left-2 h-6 w-6 rounded-sm border-2 shadow-inner"
                style={{ borderColor: "#0F3028", background: "#E8C98F", opacity: 0.9 }}
              />
            </div>
          </div>
        </div>

        {/* Brand Title: Loop */}
        <div className="space-y-1 text-center">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5" style={{ color: "#E8C98F" }} />
            <h1
              className="text-4xl font-black tracking-widest sm:text-5xl"
              style={{
                color: "#E8C98F",
                fontFamily: "var(--font-manrope)",
                letterSpacing: isMoving ? "0.25em" : "0.08em",
                transition: "all 0.7s ease-in-out",
              }}
            >
              Loop
            </h1>
          </div>

          <p
            className="text-xs font-extrabold uppercase tracking-widest sm:text-sm"
            style={{ color: "rgba(249, 246, 239, 0.75)" }}
          >
            Feedback Analysis System
          </p>
        </div>

        {/* Shimmer Line */}
        <div className="w-44 overflow-hidden rounded-full bg-emerald-950/80 p-0.5 border border-emerald-800/40">
          <div
            className="h-1 rounded-full animate-pulse"
            style={{
              background: "linear-gradient(90deg, #E8C98F 0%, #6B8F71 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
