"use client";

import { X, Trash2, Calendar, Sparkles } from "lucide-react";
import { Feedback, FeedbackStatus } from "@/types/feedback";
import SentimentBadge from "./SentimentBadge";

interface FeedbackDrawerProps {
  feedback: Feedback | null;
  open: boolean;
  onClose: () => void;
  onStatusChange: (id: string, status: FeedbackStatus) => void;
  onDelete: (id: string) => void;
}

export default function FeedbackDrawer({
  feedback,
  open,
  onClose,
  onStatusChange,
  onDelete,
}: FeedbackDrawerProps) {
  if (!open || !feedback) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl transition-transform">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-loop-border p-6 bg-cream">
          <div>
            <h2 className="text-xl font-bold text-forest">
              Feedback Details
            </h2>
            <p className="text-xs text-taupe">ID: #{feedback.id.slice(0, 8)}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-white hover:text-slate-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-6 p-6">
          {/* Customer info */}
          <div className="rounded-2xl border border-loop-border bg-cream/30 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-taupe mb-1">
              Customer Information
            </h3>
            <p className="text-lg font-bold text-forest">
              {feedback.customer}
            </p>
            <p className="text-sm text-taupe font-medium">
              {feedback.email}
            </p>
          </div>

          {/* Message */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-taupe mb-2">
              Feedback Message
            </h3>
            <div className="rounded-2xl border border-loop-border bg-white p-4 text-sm leading-relaxed text-slate-800 shadow-xs">
              &ldquo;{feedback.message}&rdquo;
            </div>
          </div>

          {/* Status & Priority Controls */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-taupe mb-2">
                Status
              </p>
              <select
                value={feedback.status}
                onChange={(e) => onStatusChange(feedback.id, e.target.value as FeedbackStatus)}
                className="w-full rounded-xl border border-loop-border bg-white p-2.5 text-xs font-semibold text-forest outline-none focus:border-forest"
              >
                <option value="Pending">🟡 Pending</option>
                <option value="Reviewed">🔵 Reviewed</option>
                <option value="Resolved">🟢 Resolved</option>
              </select>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-taupe mb-2">
                Sentiment
              </p>
              <div className="pt-1">
                <SentimentBadge sentiment={feedback.sentiment} />
              </div>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-loop-border bg-cream/30 p-4 text-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-taupe">Rating</p>
              <p className="mt-1 text-base font-bold text-amber-600">⭐ {feedback.rating}/5</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-taupe">Category</p>
              <p className="mt-1 text-xs font-bold text-forest">{feedback.category}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-taupe">Priority</p>
              <p className={`mt-1 text-xs font-bold ${
                feedback.priority === "High"
                  ? "text-red-600"
                  : feedback.priority === "Medium"
                  ? "text-amber-600"
                  : "text-emerald-600"
              }`}>
                {feedback.priority}
              </p>
            </div>
          </div>

          {/* AI Summary Insight */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest mb-2">
              <Sparkles size={14} className="text-amber-500" />
              <span>AI Automated Insight</span>
            </div>
            <div className="rounded-2xl bg-sage-bg/60 border border-sage/20 p-4 text-xs leading-relaxed text-forest-mid">
              {feedback.sentiment === "Positive"
                ? `Customer expressed high satisfaction with ${feedback.category.toLowerCase()}. Recommended action: Share with the engineering & product teams.`
                : feedback.sentiment === "Negative"
                ? `Urgent issue flagged regarding ${feedback.category.toLowerCase()}. Priority level set to ${feedback.priority}. Recommended action: Assign support agent.`
                : `Neutral sentiment detected regarding ${feedback.category.toLowerCase()}. Monitor feedback trends over time.`}
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-xs text-taupe pt-2 border-t border-loop-border">
            <Calendar size={14} />
            <span>Ingested on {feedback.date}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-loop-border p-4 bg-cream flex items-center justify-between">
          <button
            onClick={() => {
              onDelete(feedback.id);
              onClose();
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-600 hover:text-white transition"
          >
            <Trash2 size={16} />
            Delete Entry
          </button>

          <button
            onClick={onClose}
            className="rounded-xl bg-forest px-6 py-2.5 text-xs font-semibold text-champagne hover:bg-forest-mid hover:text-white transition shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}