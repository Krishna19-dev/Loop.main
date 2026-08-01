"use client";

import { Star } from "lucide-react";
import { Feedback } from "@/types/feedback";

interface RatingDistributionProps {
  feedbacks: Feedback[];
}

const starColors = [
  "bg-red-400",
  "bg-orange-400",
  "bg-amber-400",
  "bg-lime-500",
  "bg-sage-bg0",
];

export default function RatingDistribution({ feedbacks }: RatingDistributionProps) {
  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = feedbacks.filter((f) => f.rating === stars).length;
    return { stars, count };
  });

  const total = feedbacks.length || 1;
  const maxCount = Math.max(...distribution.map((item) => item.count), 1);
  const avgRating = (feedbacks.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1);

  return (
    <div className="rounded-2xl border border-loop-border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-forest">Rating Distribution</h2>
        <p className="mt-1 text-sm text-taupe">Breakdown of customer star ratings.</p>
      </div>

      <div className="space-y-4">
        {distribution.map((rating, index) => {
          const revIndex = 4 - index;
          const pct = Math.round((rating.count / total) * 100);
          const barWidth = (rating.count / maxCount) * 100;

          return (
            <div key={rating.stars} className="flex items-center gap-4">
              {/* Stars */}
              <div className="flex w-24 shrink-0 items-center gap-0.5">
                {Array.from({ length: rating.stars }).map((_, i) => (
                  <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Bar */}
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-cream-dark">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${starColors[revIndex] ?? "bg-amber-400"}`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>

              {/* Count + Percent */}
              <div className="w-20 shrink-0 text-right text-xs text-taupe">
                <span className="font-semibold text-forest-light">{rating.count}</span>
                <span className="ml-1 text-taupe">({pct}%)</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 flex items-center justify-between rounded-xl bg-amber-50 px-4 py-3 border border-amber-100">
        <div className="flex items-center gap-2">
          <Star size={16} className="fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold text-champagne-text">Average Rating</span>
        </div>
        <span className="text-lg font-bold text-amber-700">
          {avgRating}
          <span className="ml-1 text-sm font-medium text-champagne-text">/ 5</span>
        </span>
      </div>
    </div>
  );
}