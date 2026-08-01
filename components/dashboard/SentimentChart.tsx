"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Feedback } from "@/types/feedback";

interface SentimentChartProps {
  feedbacks: Feedback[];
}

const COLORS = ["#10B981", "#EF4444", "#F59E0B"];

export default function SentimentChart({ feedbacks }: SentimentChartProps) {
  const positive = feedbacks.filter((f) => f.sentiment === "Positive").length;
  const negative = feedbacks.filter((f) => f.sentiment === "Negative").length;
  const neutralOrPending = feedbacks.filter((f) => f.sentiment === "Neutral" || f.status === "Pending").length;

  const data = [
    { name: "Positive", value: positive },
    { name: "Negative", value: negative },
    { name: "Pending/Neutral", value: neutralOrPending },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-800">
          Sentiment Analysis
        </h2>

        <p className="text-sm text-slate-500">
          Distribution of customer feedback ({feedbacks.length} total entries)
        </p>
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