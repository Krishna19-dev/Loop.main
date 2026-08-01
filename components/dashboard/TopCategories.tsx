"use client";

import { Feedback } from "@/types/feedback";

interface TopCategoriesProps {
  feedbacks: Feedback[];
}

const colorMap = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-indigo-500",
  "bg-violet-500",
];

export default function TopCategories({ feedbacks }: TopCategoriesProps) {
  const categoryCounts = feedbacks.reduce<Record<string, number>>((acc, item) => {
    const cat = item.category || "General";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const maxCount = Math.max(...categories.map((c) => c.count), 1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-6">
        Top Feedback Categories
      </h2>

      <div className="space-y-5">
        {categories.map((category, idx) => (
          <div key={category.name}>
            <div className="flex justify-between mb-2 text-sm">
              <span className="font-medium text-slate-700">
                {category.name}
              </span>

              <span className="text-slate-500 font-semibold">
                {category.count} entries
              </span>
            </div>

            <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`${colorMap[idx % colorMap.length]} h-full rounded-full transition-all duration-500`}
                style={{
                  width: `${(category.count / maxCount) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}