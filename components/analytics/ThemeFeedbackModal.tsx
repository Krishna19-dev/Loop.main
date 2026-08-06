"use client";

import { X, ExternalLink, Calendar, Star, Sparkles } from "lucide-react";
import { ThemeCluster } from "@/types/feedback";
import SentimentBadge from "@/components/feedback/SentimentBadge";
import Link from "next/link";

interface ThemeFeedbackModalProps {
  cluster: ThemeCluster | null;
  open: boolean;
  onClose: () => void;
}

export default function ThemeFeedbackModal({
  cluster,
  open,
  onClose,
}: ThemeFeedbackModalProps) {
  if (!open || !cluster) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="flex max-h-[85vh] w-full max-w-3xl flex-col rounded-3xl bg-white shadow-2xl overflow-hidden border border-loop-border animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-loop-border px-6 py-5 bg-cream/50">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-forest/10 px-2.5 py-1 text-xs font-bold text-forest">
                  Theme Cluster
                </span>
                {cluster.isTrending && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                    🔥 Trending (+{cluster.growthRate}%)
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-forest">
                {cluster.theme} ({cluster.totalCount} items)
              </h2>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-white hover:text-slate-700 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-2 border-b border-loop-border bg-slate-50 px-6 py-3 text-center text-xs font-medium text-slate-600">
            <div>
              <span className="block text-[10px] uppercase font-bold text-taupe">Total Feedback</span>
              <span className="font-bold text-forest text-sm">{cluster.totalCount}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-taupe">Avg Sentiment Score</span>
              <span className={`font-bold text-sm ${cluster.avgScore >= 0 ? "text-emerald-700" : "text-red-600"}`}>
                {cluster.avgScore >= 0 ? `+${cluster.avgScore}` : cluster.avgScore}
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-taupe">Positive / Negative</span>
              <span className="font-bold text-forest text-sm">
                <span className="text-emerald-600">{cluster.sentimentBreakdown.positive}</span> /{" "}
                <span className="text-red-600">{cluster.sentimentBreakdown.negative}</span>
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-taupe">Spike Rate</span>
              <span className="font-bold text-amber-700 text-sm">
                {cluster.growthRate >= 0 ? `+${cluster.growthRate}%` : `${cluster.growthRate}%`}
              </span>
            </div>
          </div>

          {/* Feedback List Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cluster.feedbacks.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-loop-border bg-white p-4 shadow-xs hover:border-forest/30 transition space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-forest text-sm">{item.customer}</h3>
                    <p className="text-xs text-taupe">{item.email}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <SentimentBadge sentiment={item.sentiment} score={item.sentimentScore} />
                    <span className="flex items-center text-xs font-bold text-amber-600">
                      <Star size={12} className="fill-amber-400 stroke-amber-500 mr-1" />
                      {item.rating}/5
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-800 leading-relaxed bg-cream/20 p-3 rounded-xl border border-slate-100">
                  &ldquo;{item.message}&rdquo;
                </p>

                <div className="flex items-center justify-between text-[11px] text-taupe pt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    <span>{item.date}</span>
                    <span className="mx-1">•</span>
                    <span className="font-semibold text-forest">Category: {item.category}</span>
                  </div>

                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600">
                    Status: {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-loop-border px-6 py-4 bg-cream/50 flex items-center justify-between">
            <Link
              href={`/feedback?search=${encodeURIComponent(cluster.theme)}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-emerald-700 transition"
              onClick={onClose}
            >
              <span>View in Feedback Manager Table</span>
              <ExternalLink size={14} />
            </Link>

            <button
              onClick={onClose}
              className="rounded-xl bg-forest px-5 py-2 text-xs font-semibold text-champagne hover:bg-forest-mid transition"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
