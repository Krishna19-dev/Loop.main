"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", feedback: 120 },
  { month: "Feb", feedback: 180 },
  { month: "Mar", feedback: 220 },
  { month: "Apr", feedback: 200 },
  { month: "May", feedback: 260 },
  { month: "Jun", feedback: 300 },
  { month: "Jul", feedback: 340 },
];

export default function FeedbackChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Feedback Trend
          </h2>
          <p className="text-sm text-slate-500">
            Monthly customer feedback overview
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-indigo-50 px-3 py-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
          <span className="text-xs font-semibold text-indigo-700">Monthly Volume</span>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="feedbackGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 4" stroke="#E2E8F0" vertical={false} />

            <XAxis
              dataKey="month"
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

            <Area
              type="monotone"
              dataKey="feedback"
              stroke="#4F46E5"
              strokeWidth={3}
              fill="url(#feedbackGradient)"
              dot={{ r: 5, fill: "#4F46E5", strokeWidth: 0 }}
              activeDot={{ r: 7, fill: "#4338CA", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}