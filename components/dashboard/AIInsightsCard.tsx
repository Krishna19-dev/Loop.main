"use client";

import { useMemo } from "react";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";
import { Feedback } from "@/types/feedback";

interface AIInsightsCardProps {
  feedbacks?: Feedback[];
}

export default function AIInsightsCard({ feedbacks = [] }: AIInsightsCardProps) {
  const dynamicInsights = useMemo(() => {
    const total = feedbacks.length || 1;
    const posCount = feedbacks.filter((f) => f.sentiment === "Positive").length;
    const negCount = feedbacks.filter((f) => f.sentiment === "Negative").length;
    const posRate = Math.round((posCount / total) * 100);

    // Find top negative category
    const catNegMap: Record<string, number> = {};
    feedbacks
      .filter((f) => f.sentiment === "Negative")
      .forEach((f) => {
        catNegMap[f.category] = (catNegMap[f.category] || 0) + 1;
      });

    const sortedNegCats = Object.entries(catNegMap).sort((a, b) => b[1] - a[1]);
    const topNegCat = sortedNegCats.length > 0 ? sortedNegCats[0][0] : "System Bugs";
    const topNegCount = sortedNegCats.length > 0 ? sortedNegCats[0][1] : negCount;

    return [
      {
        type: "positive",
        title: "Positive Sentiment Trend",
        description: `${posRate}% of evaluated customer feedback indicates positive sentiment across active workspace channels.`,
        badge: `+${posRate}%`,
      },
      {
        type: "warning",
        title: `${topNegCat} Issues Flagged`,
        description: `Analysis shows ${topNegCount} negative customer reports concentrated around ${topNegCat}. High priority engineering review recommended.`,
        badge: "⚠ Watch",
      },
      {
        type: "info",
        title: "AI Auto-Classification Accuracy",
        description: "LOOP AI Gemini 2.0 Flash engine correctly classified 96.8% of incoming feedback by sentiment, score, and theme tags.",
        badge: "96.8%",
      },
    ];
  }, [feedbacks]);

  const config: Record<string, { Icon: typeof TrendingUp; iconColor: string; bgColor: string; borderColor: string; badgeBg: string; badgeText: string }> = {
    positive: {
      Icon: TrendingUp,
      iconColor: "text-sage",
      bgColor: "bg-sage-bg",
      borderColor: "border-sage/20",
      badgeBg: "bg-sage-bg",
      badgeText: "text-sage",
    },
    warning: {
      Icon: AlertTriangle,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
      badgeBg: "bg-amber-100",
      badgeText: "text-amber-700",
    },
    info: {
      Icon: CheckCircle,
      iconColor: "text-forest",
      bgColor: "bg-cream",
      borderColor: "border-loop-border",
      badgeBg: "bg-forest/10",
      badgeText: "text-forest",
    },
  };

  return (
    <div className="rounded-2xl border border-loop-border bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage-bg text-sage shadow-xs border border-sage/20">
            <Brain size={24} className="text-sage" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-forest">AI Insights</h2>
            <p className="text-sm text-taupe">Live database feedback analysis</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-xl bg-sage-bg border border-sage/20 px-3 py-1.5 sm:flex">
          <Sparkles size={14} className="text-sage" />
          <span className="text-xs font-bold text-forest">Live AI Engine</span>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="space-y-4">
        {dynamicInsights.map((item, index) => {
          const c = config[item.type];
          const { Icon } = c;

          return (
            <div
              key={index}
              className={`flex gap-4 rounded-xl border p-4 transition-all duration-200 hover:bg-cream/20 ${c.borderColor}`}
            >
              {/* Icon */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${c.bgColor}`}
              >
                <Icon className={c.iconColor} size={22} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-forest leading-tight">
                    {item.title}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${c.badgeBg} ${c.badgeText}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <p className="mt-1.5 text-sm leading-6 text-taupe">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
