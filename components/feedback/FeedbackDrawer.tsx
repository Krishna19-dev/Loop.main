"use client";

import { useState } from "react";
import { X, Trash2, Calendar, Sparkles, RefreshCw } from "lucide-react";
import { Feedback, FeedbackStatus } from "@/types/feedback";
import { authService } from "@/services/auth.service";
import SentimentBadge from "./SentimentBadge";

interface FeedbackDrawerProps {
  feedback: Feedback | null;
  open: boolean;
  onClose: () => void;
  onStatusChange: (id: string, status: FeedbackStatus) => void;
  onDelete: (id: string) => void;
  onReclassified?: (id: string, updatedData: Partial<Feedback>) => void;
  isViewer?: boolean;
}

export default function FeedbackDrawer({
  feedback,
  open,
  onClose,
  onStatusChange,
  onDelete,
  onReclassified,
  isViewer: isViewerProp,
}: FeedbackDrawerProps) {
  const [isClassifying, setIsClassifying] = useState(false);
  const [classifyError, setClassifyError] = useState("");
  const [classifySuccess, setClassifySuccess] = useState("");

  if (!open || !feedback) return null;

  const currentUser = authService.getCurrentUser();
  const isViewer = isViewerProp ?? (currentUser?.role?.toUpperCase() === "VIEWER");

  async function handleReclassify() {
    if (!feedback) return;

    if (isViewer) {
      setClassifyError("Forbidden: VIEWER role cannot perform AI classification (Read-only).");
      return;
    }

    try {
      setIsClassifying(true);
      setClassifyError("");
      setClassifySuccess("");

      const res = await fetch("/api/ai/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackId: feedback?.id, userRole: currentUser?.role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Classification failed");
      }

      const updatedFields: Partial<Feedback> = {
        sentiment: data.classification.sentiment,
        sentimentScore: data.classification.sentimentScore,
        themes: data.classification.themes,
        featureArea: data.classification.featureArea,
        category: data.classification.themes[0] || data.classification.featureArea || feedback.category,
      };

      Object.assign(feedback, updatedFields);

      setClassifySuccess(`AI Re-classified with Gemini: ${data.classification.sentiment} (${updatedFields.category})`);
      onReclassified?.(feedback.id, updatedFields);
    } catch (err) {
      setClassifyError(err instanceof Error ? err.message : "Classification failed");
    } finally {
      setIsClassifying(false);
    }
  }

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
          {classifyError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
              {classifyError}
            </div>
          )}

          {classifySuccess && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-xs font-semibold text-green-700">
              {classifySuccess}
            </div>
          )}

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
              {isViewer ? (
                <span className="w-full inline-block rounded-xl border border-loop-border bg-cream/30 p-2.5 text-xs font-semibold text-forest">
                  {feedback.status === "Pending" ? "🟡 Pending" : feedback.status === "Reviewed" ? "🔵 Reviewed" : "🟢 Resolved"}
                </span>
              ) : (
                <select
                  value={feedback.status}
                  onChange={(e) => onStatusChange(feedback.id, e.target.value as FeedbackStatus)}
                  className="w-full rounded-xl border border-loop-border bg-white p-2.5 text-xs font-semibold text-forest outline-none focus:border-forest"
                >
                  <option value="Pending">🟡 Pending</option>
                  <option value="Reviewed">🔵 Reviewed</option>
                  <option value="Resolved">🟢 Resolved</option>
                </select>
              )}
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-taupe mb-2">
                Sentiment & Score
              </p>
              <div className="pt-1">
                <SentimentBadge sentiment={feedback.sentiment} score={feedback.sentimentScore} />
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
              <p className="text-[10px] font-bold uppercase tracking-wider text-taupe">Feature Area</p>
              <p className="mt-1 text-xs font-bold text-forest">{feedback.featureArea || feedback.category}</p>
            </div>
          </div>

          {/* Prominent Stored Gemini AI Classification & Score Meter Card */}
          <div className="rounded-2xl border border-loop-border bg-white p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-taupe">
                Gemini Sentiment Score
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-mono font-bold border ${
                  (feedback.sentimentScore ?? 0) > 0
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : (feedback.sentimentScore ?? 0) < 0
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                {(feedback.sentimentScore ?? 0) > 0
                  ? `+${Number(feedback.sentimentScore).toFixed(2)}`
                  : Number(feedback.sentimentScore ?? 0).toFixed(2)}{" "}
                <span className="text-[10px] font-normal text-slate-400">/ 1.00</span>
              </span>
            </div>

            {/* Sentiment Meter Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-taupe font-semibold">
                <span>Negative (-1.0)</span>
                <span>Neutral (0.0)</span>
                <span>Positive (+1.0)</span>
              </div>
              <div className="relative h-2 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    (feedback.sentimentScore ?? 0) > 0
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                      : (feedback.sentimentScore ?? 0) < 0
                      ? "bg-gradient-to-r from-red-400 to-red-600"
                      : "bg-amber-400"
                  }`}
                  style={{
                    width: `${Math.min(100, Math.max(5, (((feedback.sentimentScore ?? 0) + 1) / 2) * 100))}%`,
                  }}
                />
              </div>
            </div>

            {feedback.themes && feedback.themes.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <span className="font-semibold text-taupe uppercase tracking-wider text-[10px] block mb-1.5">
                  Classified Themes:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {feedback.themes.map((t, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-forest/10 border border-forest/15 px-2.5 py-0.5 text-xs font-semibold text-forest"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Summary Insight & Re-classify Action */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest">
                <Sparkles size={14} className="text-amber-500" />
                <span>AI Automated Insight (Gemini)</span>
              </div>

              {!isViewer && (
                <button
                  type="button"
                  onClick={handleReclassify}
                  disabled={isClassifying}
                  className="flex items-center gap-1 text-xs font-bold text-forest hover:text-emerald-700 transition disabled:opacity-50"
                >
                  <RefreshCw size={13} className={isClassifying ? "animate-spin" : ""} />
                  <span>{isClassifying ? "Classifying..." : "Re-classify with Gemini"}</span>
                </button>
              )}
            </div>

            <div className="rounded-2xl bg-sage-bg/60 border border-sage/20 p-4 text-xs leading-relaxed text-forest-mid">
              {feedback.sentiment === "Positive"
                ? `Customer expressed high satisfaction with ${(feedback.featureArea || feedback.category).toLowerCase()}. Recommended action: Share positive sentiment with product team.`
                : feedback.sentiment === "Negative"
                ? `Urgent issue flagged regarding ${(feedback.featureArea || feedback.category).toLowerCase()}. Priority level set to ${feedback.priority}. Recommended action: Assign support agent.`
                : `Neutral sentiment detected regarding ${(feedback.featureArea || feedback.category).toLowerCase()}. Monitor feedback trends over time.`}
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
          {!isViewer ? (
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
          ) : (
            <div />
          )}

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