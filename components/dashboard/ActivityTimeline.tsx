"use client";

import { MessageSquare, Brain, FileText, ShieldCheck } from "lucide-react";

const activities = [
  {
    title: "New feedback submitted",
    time: "2 minutes ago",
    icon: MessageSquare,
    color: "bg-blue-100 text-blue-600",
    dot: "bg-blue-500",
  },
  {
    title: "AI analyzed customer sentiment",
    time: "15 minutes ago",
    icon: Brain,
    color: "bg-indigo-100 text-indigo-600",
    dot: "bg-indigo-500",
  },
  {
    title: "Weekly report generated",
    time: "1 hour ago",
    icon: FileText,
    color: "bg-emerald-100 text-emerald-600",
    dot: "bg-emerald-500",
  },
  {
    title: "Admin updated feedback status",
    time: "Today",
    icon: ShieldCheck,
    color: "bg-amber-100 text-amber-600",
    dot: "bg-amber-500",
  },
];

export default function ActivityTimeline() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800 mb-6">
        Recent Activity
      </h2>

      <div className="relative space-y-5">
        {/* Vertical connector line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-100" />

        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="flex gap-4 relative">
              <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${activity.color}`}>
                <Icon size={16} />
              </div>

              <div className="flex-1 pt-1">
                <p className="text-sm font-medium text-slate-800">
                  {activity.title}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}