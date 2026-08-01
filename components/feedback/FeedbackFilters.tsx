"use client";

import { Search } from "lucide-react";

interface FeedbackFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  sentiment: string;
  onSentimentChange: (value: string) => void;
}

export default function FeedbackFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  sentiment,
  onSentimentChange,
}: FeedbackFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-loop-border bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      {/* Search */}

      <div className="relative w-full lg:w-96">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe"
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search customer or feedback..."
          className="w-full rounded-xl border border-loop-border bg-cream py-3 pl-11 pr-4 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage-bg"
        />
      </div>

      {/* Filters */}

      <div className="flex flex-wrap gap-3">
        <select
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
          className="rounded-xl border border-loop-border bg-white px-4 py-3 text-sm outline-none focus:border-sage"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Resolved">Resolved</option>
        </select>

        <select
          value={sentiment}
          onChange={(e) =>
            onSentimentChange(e.target.value)
          }
          className="rounded-xl border border-loop-border bg-white px-4 py-3 text-sm outline-none focus:border-sage"
        >
          <option value="">All Sentiments</option>
          <option value="Positive">Positive</option>
          <option value="Neutral">Neutral</option>
          <option value="Negative">Negative</option>
        </select>
      </div>
    </div>
  );
}