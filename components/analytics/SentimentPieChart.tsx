"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Feedback } from "@/types/feedback";

interface SentimentPieChartProps {
  feedbacks: Feedback[];
}

type TimePeriod = "weekly" | "monthly" | "all";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];
const LABELS = [
  { label: "Positive", bg: "bg-sage-bg0" },
  { label: "Neutral", bg: "bg-amber-500" },
  { label: "Negative", bg: "bg-red-500" },
];

export default function SentimentPieChart({ feedbacks }: SentimentPieChartProps) {
  const [period, setPeriod] = useState<TimePeriod>("monthly");

  const filteredFeedbacks = feedbacks.filter((f) => {
    if (period === "all") return true;
    const fTime = new Date(f.date).getTime();
    if (isNaN(fTime)) return true;

    const maxTime = feedbacks.reduce((max, item) => {
      const t = new Date(item.date).getTime();
      return isNaN(t) ? max : Math.max(max, t);
    }, 0) || Date.now();

    const days = period === "weekly" ? 7 : 30;
    return fTime >= maxTime - days * 24 * 60 * 60 * 1000;
  });

  const positive = filteredFeedbacks.filter((f) => f.sentiment === "Positive").length;
  const neutral = filteredFeedbacks.filter((f) => f.sentiment === "Neutral").length;
  const negative = filteredFeedbacks.filter((f) => f.sentiment === "Negative").length;

  const data = [
    { name: "Positive", value: positive },
    { name: "Neutral", value: neutral },
    { name: "Negative", value: negative },
  ];

  const total = filteredFeedbacks.length || 1;

  const periodLabels: Record<TimePeriod, string> = {
    weekly: "Past Week",
    monthly: "Past Month",
    all: "All Time",
  };

  return (
    <div className="rounded-2xl border border-loop-border bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-forest">Sentiment Overview</h2>
          <p className="mt-1 text-sm text-taupe">
            Distribution for {periodLabels[period]} ({filteredFeedbacks.length} total entries).
          </p>
        </div>

        {/* Time Period Filter Pills */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 self-start sm:self-auto">
          {(["weekly", "monthly", "all"] as TimePeriod[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold capitalize transition-all ${
                period === p
                  ? "bg-forest text-champagne shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            innerRadius={65}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              color: "#0f172a",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Custom Legend */}
      <div className="mt-4 flex justify-center gap-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className={`h-2.5 w-2.5 rounded-full ${LABELS[index]?.bg}`} />
            <span className="text-xs font-medium text-slate-600">{item.name}</span>
            <span className="text-xs text-taupe">
              ({Math.round((item.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}