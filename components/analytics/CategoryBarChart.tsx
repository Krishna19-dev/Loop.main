"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { Feedback } from "@/types/feedback";

interface CategoryBarChartProps {
  feedbacks: Feedback[];
}

const COLORS = ["#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626", "#0891b2"];

export default function CategoryBarChart({ feedbacks }: CategoryBarChartProps) {
  const categoryCounts = feedbacks.reduce<Record<string, number>>((acc, item) => {
    const cat = item.category || "General";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(categoryCounts).map(([category, count]) => ({
    category,
    count,
  }));

  return (
    <div className="rounded-2xl border border-loop-border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-forest">
            Feedback by Category
          </h2>
          <p className="mt-1 text-sm text-taupe">
            Distribution of feedback categories based on live database records.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-violet-50 px-3 py-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-violet-600" />
          <span className="text-xs font-semibold text-violet-700">Live Breakdown</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#E2E8F0" vertical={false} />

          <XAxis
            dataKey="category"
            tick={{ fill: "#64748B", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#64748B", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              color: "#0f172a",
            }}
          />

          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}