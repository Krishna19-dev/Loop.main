"use client";

import { MessageSquare, Smile, Star, Clock } from "lucide-react";
import { Feedback } from "@/types/feedback";
import StatCard from "../dashboard/StatCard";

interface AnalyticsCardsProps {
  feedbacks: Feedback[];
}

export default function AnalyticsCards({ feedbacks }: AnalyticsCardsProps) {
  const total = feedbacks.length;
  const avgRating = total > 0
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1)
    : "0.0";
  const positiveCount = feedbacks.filter((f) => f.sentiment === "Positive").length;
  const positiveRate = total > 0 ? `${Math.round((positiveCount / total) * 100)}%` : "0%";
  const pendingCount = feedbacks.filter((f) => f.status === "Pending").length;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Feedback"
        value={total.toLocaleString()}
        change="+18%"
        period="month"
        icon={<MessageSquare size={24} />}
        color="bg-forest text-champagne border border-forest-light"
      />

      <StatCard
        title="Average Rating"
        value={avgRating}
        change="+4%"
        period="month"
        icon={<Star size={24} />}
        color="bg-amber-500 text-white"
      />

      <StatCard
        title="Positive Sentiment"
        value={positiveRate}
        change="+6%"
        period="month"
        icon={<Smile size={24} />}
        color="bg-sage-bg0 text-forest"
      />

      <StatCard
        title="Pending Reviews"
        value={pendingCount.toString()}
        change="Requires action"
        periodLabel="pending review"
        icon={<Clock size={24} />}
        color="bg-emerald-700 text-white"
      />
    </div>
  );
}