"use client";

import { Eye, Trash2, ChevronDown } from "lucide-react";
import { Feedback, FeedbackStatus } from "@/types/feedback";
import SentimentBadge from "./SentimentBadge";

interface FeedbackRowProps {
  feedback: Feedback;
  onView: (feedback: Feedback) => void;
  onStatusChange: (id: string, status: FeedbackStatus) => void;
  onDelete: (id: string) => void;
}

export default function FeedbackRow({
  feedback,
  onView,
  onStatusChange,
  onDelete,
}: FeedbackRowProps) {
  return (
    <tr className="border-b border-loop-border transition-colors hover:bg-cream/40">
      {/* Customer */}
      <td className="px-6 py-4">
        <div>
          <h3 className="font-semibold text-forest">
            {feedback.customer}
          </h3>
          <p className="text-xs text-taupe">
            {feedback.email}
          </p>
        </div>
      </td>

      {/* Message */}
      <td className="max-w-xs px-6 py-4">
        <p className="truncate text-sm text-slate-700 font-medium" title={feedback.message}>
          {feedback.message}
        </p>
      </td>

      {/* Category */}
      <td className="px-6 py-4 text-xs font-semibold text-forest-mid">
        <span className="rounded-lg bg-cream px-2.5 py-1 border border-loop-border">
          {feedback.category}
        </span>
      </td>

      {/* Rating */}
      <td className="px-6 py-4 text-center text-sm font-semibold">
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-amber-700 border border-amber-200">
          ⭐ {feedback.rating}
        </span>
      </td>

      {/* Sentiment */}
      <td className="px-6 py-4">
        <SentimentBadge sentiment={feedback.sentiment} score={feedback.sentimentScore} />
      </td>

      {/* Row Status Control */}
      <td className="px-6 py-4">
        <div className="relative inline-block">
          <select
            value={feedback.status}
            onChange={(e) => onStatusChange(feedback.id, e.target.value as FeedbackStatus)}
            className="appearance-none rounded-full px-3 py-1 pr-7 text-xs font-semibold cursor-pointer outline-none border border-loop-border bg-white text-forest shadow-sm hover:border-forest/40 transition"
          >
            <option value="Pending">🟡 Pending</option>
            <option value="Reviewed">🔵 Reviewed</option>
            <option value="Resolved">🟢 Resolved</option>
          </select>
          <ChevronDown size={12} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-taupe" />
        </div>
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-xs text-taupe whitespace-nowrap">
        {feedback.date}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView(feedback)}
            title="View Details"
            className="rounded-lg bg-sage-bg p-2 text-sage transition hover:bg-sage hover:text-white"
          >
            <Eye size={16} />
          </button>

          <button
            onClick={() => onDelete(feedback.id)}
            title="Delete Feedback"
            className="rounded-lg bg-terra-bg p-2 text-terra transition hover:bg-terra hover:text-white"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}