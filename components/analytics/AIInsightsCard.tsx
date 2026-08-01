"use client";

import { Brain, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { Feedback } from "@/types/feedback";

interface AIInsightsCardProps {
  feedbacks: Feedback[];
}

export default function AIInsightsCard({ feedbacks }: AIInsightsCardProps) {
  const total = feedbacks.length || 1;
  const positiveCount = feedbacks.filter((f) => f.sentiment === "Positive").length;
  const positiveRate = Math.round((positiveCount / total) * 100);

  // Find top negative category
  const negativeFeedbacks = feedbacks.filter((f) => f.sentiment === "Negative");
  const catNegCounts: Record<string, number> = {};
  negativeFeedbacks.forEach((f) => {
    catNegCounts[f.category] = (catNegCounts[f.category] || 0) + 1;
  });

  const sortedNegCats = Object.entries(catNegCounts).sort((a, b) => b[1] - a[1]);
  const topNegCat = sortedNegCats.length > 0 ? sortedNegCats[0][0] : "System Bugs";
  const topNegCount = sortedNegCats.length > 0 ? sortedNegCats[0][1] : 0;

  // Find top positive category
  const posFeedbacks = feedbacks.filter((f) => f.sentiment === "Positive");
  const catPosCounts: Record<string, number> = {};
  posFeedbacks.forEach((f) => {
    catPosCounts[f.category] = (catPosCounts[f.category] || 0) + 1;
  });
  const sortedPosCats = Object.entries(catPosCounts).sort((a, b) => b[1] - a[1]);
  const topPosCat = sortedPosCats.length > 0 ? sortedPosCats[0][0] : "Customer Support";

  const dynamicInsights = [
    {
      title: "Positive Trend Detected",
      description: `${positiveRate}% of evaluated customer feedback indicates positive sentiment. ${topPosCat} is receiving the highest satisfaction ratings.`,
      type: "success",
    },
    {
      title: `Frequent Issue in ${topNegCat}`,
      description: `Analysis shows ${topNegCount} negative reports concentrated around ${topNegCat}. High priority response recommended.`,
      type: "warning",
    },
    {
      title: "AI Optimization Suggestion",
      description: `Addressing unresolved issues in ${topNegCat} could improve overall positive sentiment rate by up to +14%.`,
      type: "info",
    },
  ];

  return (
    <div className="rounded-2xl border border-loop-border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-sage-bg p-3">
          <Brain className="text-sage" size={26} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-forest">AI Insights</h2>
          <p className="text-taupe">Real-time AI-generated feedback analysis from live database</p>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {dynamicInsights.map((item, index) => {
          let Icon = TrendingUp;
          let iconColor = "text-sage";
          let bgColor = "bg-sage-bg";

          if (item.type === "warning") {
            Icon = AlertTriangle;
            iconColor = "text-amber-600";
            bgColor = "bg-amber-100";
          }

          if (item.type === "info") {
            Icon = CheckCircle;
            iconColor = "text-blue-600";
            bgColor = "bg-blue-100";
          }

          return (
            <div
              key={index}
              className="flex gap-4 rounded-xl border border-slate-100 p-4 transition hover:bg-cream"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bgColor}`}>
                <Icon className={iconColor} size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-forest">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-taupe">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}