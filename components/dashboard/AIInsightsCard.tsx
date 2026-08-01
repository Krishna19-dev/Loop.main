"use client";

import { Brain, TrendingUp, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";

const insights = [
  {
    type: "positive",
    title: "Positive Sentiment Surge",
    description:
      "Customer satisfaction scores rose by 18% this month, driven by improved support response times and product quality.",
    badge: "+18%",
  },
  {
    type: "warning",
    title: "Delivery Complaints Increasing",
    description:
      "Delivery-related negative feedback has increased 23% in the past week. Consider reviewing logistics partners.",
    badge: "⚠ Watch",
  },
  {
    type: "info",
    title: "AI Response Accuracy",
    description:
      "LOOP AI correctly classified 94.2% of incoming feedback by sentiment and category — up from 91% last month.",
    badge: "94.2%",
  },
];

const config: Record<string, { Icon: typeof TrendingUp; iconColor: string; bgColor: string; borderColor: string; badgeBg: string; badgeText: string }> = {
  positive: {
    Icon: TrendingUp,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
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
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-700",
  },
};

export default function AIInsightsCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 shadow-md shadow-indigo-600/30">
            <Brain size={22} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">AI Insights</h2>
            <p className="text-sm text-slate-500">Auto-generated feedback analysis</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-xl bg-indigo-50 px-3 py-1.5 sm:flex">
          <Sparkles size={14} className="text-indigo-600" />
          <span className="text-xs font-semibold text-indigo-700">LOOP AI</span>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="space-y-4">
        {insights.map((item, index) => {
          const c = config[item.type];
          const { Icon } = c;

          return (
            <div
              key={index}
              className={`flex gap-4 rounded-xl border p-4 transition-all duration-200 hover:shadow-sm ${c.borderColor}`}
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
                  <h3 className="font-semibold text-slate-800 leading-tight">
                    {item.title}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${c.badgeBg} ${c.badgeText}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <p className="mt-1.5 text-sm leading-6 text-slate-500">
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
