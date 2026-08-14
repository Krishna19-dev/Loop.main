"use client";

// High-performance, hardware-accelerated ambient glowing background
export function HeroBackgroundFallback() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Hardware-accelerated GPU glowing ambient spheres */}
      <div className="absolute top-[10%] left-[15%] w-96 h-96 rounded-full bg-[#E8C98F]/10 blur-2xl transform-gpu translate-z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#1D463A]/70 blur-2xl transform-gpu translate-z-0" />
      <div className="absolute top-[40%] right-[25%] w-72 h-72 rounded-full bg-[#2A5147]/40 blur-2xl transform-gpu translate-z-0" />
    </div>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F3028]/40 via-[#0F3028]/70 to-[#0F3028] z-10 pointer-events-none" />

      {/* Decorative SVG Geometric Vector Rings (0 CPU/GPU compute on scroll) */}
      <div className="absolute inset-0 z-0 opacity-20 flex items-center justify-center">
        <svg
          className="w-[1000px] h-[1000px] text-[#E8C98F] animate-[spin_120s_linear_infinite] transform-gpu translate-z-0"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
        >
          <circle cx="50" cy="50" r="48" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="38" />
          <circle cx="50" cy="50" r="28" strokeDasharray="4 4" />
          <ellipse cx="50" cy="50" rx="45" ry="18" transform="rotate(30 50 50)" />
          <ellipse cx="50" cy="50" rx="45" ry="18" transform="rotate(-30 50 50)" />
        </svg>
      </div>

      {/* Ambient Lighting Spheres */}
      <HeroBackgroundFallback />
    </div>
  );
}
