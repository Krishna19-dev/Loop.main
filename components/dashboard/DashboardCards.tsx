"use client";

import { MessageSquare, Smile, Frown, Clock } from "lucide-react";
import { Feedback } from "@/types/feedback";
import StatCard from "./StatCard";

interface DashboardCardsProps {
  feedbacks: Feedback[];
}

export default function DashboardCards({ feedbacks }: DashboardCardsProps) {
  const total = feedbacks.length;
  const positive = feedbacks.filter((f) => f.sentiment === "Positive").length;
  const negative = feedbacks.filter((f) => f.sentiment === "Negative").length;
  const pending = feedbacks.filter((f) => f.status === "Pending").length;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Feedback"
        value={total.toLocaleString()}
        change="+18%"
        trend="up"
        icon={<MessageSquare size={22} />}
        iconBg="#F3E8D4"
        iconColor="#0F3028"
      />
      <StatCard
        title="Positive Sentiment"
        value={positive.toLocaleString()}
        change={`${total > 0 ? Math.round((positive / total) * 100) : 0}%`}
        trend="up"
        icon={<Smile size={22} />}
        iconBg="#D8EBD9"
        iconColor="#6B8F71"
      />
      <StatCard
        title="Negative Sentiment"
        value={negative.toLocaleString()}
        change={`${total > 0 ? Math.round((negative / total) * 100) : 0}%`}
        trend="down"
        icon={<Frown size={22} />}
        iconBg="#F5DDD5"
        iconColor="#B85C3C"
      />
      <StatCard
        title="Pending Review"
        value={pending.toLocaleString()}
        change={`${pending} unresolved`}
        trend="neutral"
        icon={<Clock size={22} />}
        iconBg="#E8E0D8"
        iconColor="#8A7E72"
      />
    </div>
  );
}