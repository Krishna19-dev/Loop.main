"use client";

import { Feedback } from "@/types/feedback";

interface TopCategoriesProps {
  feedbacks: Feedback[];
}

const colorMap = [
  "bg-emerald-600",
  "bg-amber-500",
  "bg-rose-500",
  "bg-blue-600",
  "bg-forest",
  "bg-sage",
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
    <div className="bg-white rounded-2xl border border-loop-border shadow-sm p-6">
      <h2 className="text-xl font-bold text-forest mb-6">
        Top Feedback Categories
      </h2>

      <div className="space-y-5">
        {categories.map((category, idx) => (
          <div key={category.name}>
            <div className="flex justify-between mb-2 text-sm">
              <span className="font-bold text-forest">
                {category.name}
              </span>

              <span className="text-taupe font-semibold text-xs">
                {category.count} {category.count === 1 ? "entry" : "entries"}
              </span>
            </div>

            <div className="h-3 rounded-full bg-cream overflow-hidden border border-loop-border/40">
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