"use client";

import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Feedback } from "@/types/feedback";

interface SentimentChartProps {
  feedbacks: Feedback[];
}

type TimePeriod = "weekly" | "monthly" | "all";

const COLORS = ["#10B981", "#EF4444", "#F59E0B"];

export default function SentimentChart({ feedbacks }: SentimentChartProps) {
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
  const negative = filteredFeedbacks.filter((f) => f.sentiment === "Negative").length;
  const neutralOrPending = filteredFeedbacks.filter(
    (f) => f.sentiment === "Neutral" || f.status === "Pending"
  ).length;

  const data = [
    { name: "Positive", value: positive },
    { name: "Negative", value: negative },
    { name: "Pending/Neutral", value: neutralOrPending },
  ];

  const periodLabels: Record<TimePeriod, string> = {
    weekly: "Past Week (7 Days)",
    monthly: "Past Month (30 Days)",
    all: "All Time",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Sentiment Analysis
          </h2>

          <p className="text-sm text-slate-500">
            Distribution for {periodLabels[period]} ({filteredFeedbacks.length} total entries)
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
                  ? "bg-[#0F3028] text-[#E8C98F] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />

            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}