"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import { Feedback } from "@/types/feedback";
import { Sparkles } from "lucide-react";

interface WelcomeBannerProps {
  name?: string;
  feedbacks?: Feedback[];
}

export default function WelcomeBanner({ name, feedbacks = [] }: WelcomeBannerProps) {
  const [userName, setUserName] = useState<string>(name || "User");
  const [greeting, setGreeting] = useState<string>("Good Day");

  useEffect(() => {
    const currentUser = name ? null : authService.getCurrentUser();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserName(name || currentUser?.name || "User");

    const h = new Date().getHours();
    if (h >= 5 && h < 12) setGreeting("Good Morning");
    else if (h >= 12 && h < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, [name]);

  const firstName = userName ? userName.split(" ")[0] : "User";

  // Dynamic quick stats from live feedback dataset
  const total = feedbacks.length;
  const positiveCount = feedbacks.filter((f) => f.sentiment === "Positive").length;
  const positiveRate = total > 0 ? `${Math.round((positiveCount / total) * 100)}%` : "0%";
  const activeThemes = new Set(feedbacks.map((f) => f.category)).size;
  const pendingCount = feedbacks.filter((f) => f.status === "Pending").length;

  const stats = [
    { label: "Total Feedback", value: total.toLocaleString() },
    { label: "Positive Sentiment", value: positiveRate },
    { label: "Active Themes", value: activeThemes.toString() },
    { label: "Pending Action", value: pendingCount.toString() },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-7"
      style={{ background: "#0F3028" }}
    >
      {/* Decorative circles */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-10"
        style={{ background: "#E8C98F" }}
      />
      <div
        className="pointer-events-none absolute -right-2 top-8 h-28 w-28 rounded-full opacity-10"
        style={{ background: "#E8C98F" }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <span
              className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
              style={{ background: "rgba(232,201,143,0.15)", color: "#EAD9B8" }}
            >
              AI Feedback Intelligence
            </span>

            <h1
              className="text-3xl font-black tracking-tight"
              style={{ fontFamily: "var(--font-manrope)", color: "#E8C98F" }}
            >
              {greeting}, {firstName} 👋
            </h1>

            <p className="max-w-lg text-sm leading-relaxed" style={{ color: "rgba(249,246,239,0.6)" }}>
              Your feedback workspace is live. LOOP AI has analyzed your latest data — check the insights below.
            </p>
          </div>

          <div
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl"
            style={{ background: "rgba(232,201,143,0.12)" }}
          >
            <Sparkles className="h-7 w-7" style={{ color: "#E8C98F" }} />
          </div>
        </div>

        {/* Quick stats strip */}
        <div className="mt-5 flex flex-wrap gap-6 border-t border-emerald-900/40 pt-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="text-xl font-black" style={{ color: "#E8C98F", fontFamily: "var(--font-manrope)" }}>
                {s.value}
              </span>
              <span className="text-[10px] font-medium" style={{ color: "rgba(249,246,239,0.5)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}