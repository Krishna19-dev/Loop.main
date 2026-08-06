"use client";

import { useState, useMemo } from "react";
import { Layers, Flame, TrendingUp, Sparkles, RefreshCw, ChevronRight } from "lucide-react";
import { Feedback, ThemeCluster } from "@/types/feedback";
import { computeThemeClusters } from "@/utils/themeClustering";
import ThemeFeedbackModal from "./ThemeFeedbackModal";
import SentimentBadge from "@/components/feedback/SentimentBadge";

interface ThemeClustersCardProps {
  feedbacks: Feedback[];
  onReclusterAI?: () => void;
  isClusteringAI?: boolean;
}

export default function ThemeClustersCard({
  feedbacks,
  onReclusterAI,
  isClusteringAI = false,
}: ThemeClustersCardProps) {
  const [selectedCluster, setSelectedCluster] = useState<ThemeCluster | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Compute theme clusters
  const clusters = useMemo(() => {
    return computeThemeClusters(feedbacks);
  }, [feedbacks]);

  // Separate trending themes from static ones
  const trendingClusters = clusters.filter((c) => c.isTrending);
  const otherClusters = clusters.filter((c) => !c.isTrending);

  function handleOpenCluster(cluster: ThemeCluster) {
    setSelectedCluster(cluster);
    setModalOpen(true);
  }

  return (
    <>
      <div className="rounded-2xl border border-loop-border bg-white p-6 shadow-sm space-y-6">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-forest/10 p-3">
              <Layers className="text-forest" size={26} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-forest">Theme Clusters & Trends</h2>
              <p className="text-taupe text-sm">
                AI-grouped feedback themes with period-over-period spike detection
              </p>
            </div>
          </div>

          {onReclusterAI && (
            <button
              type="button"
              onClick={onReclusterAI}
              disabled={isClusteringAI}
              className="inline-flex items-center gap-2 rounded-xl bg-sage-bg border border-sage/30 px-3.5 py-2 text-xs font-bold text-forest hover:bg-sage/20 transition disabled:opacity-50"
            >
              <RefreshCw size={14} className={isClusteringAI ? "animate-spin text-amber-600" : "text-forest"} />
              <span>{isClusteringAI ? "Clustering AI..." : "Re-cluster with Gemini AI"}</span>
            </button>
          )}
        </div>

        {/* Section 1: 🔥 Trending / Spiking Themes */}
        {trendingClusters.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-amber-500 fill-amber-400 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-forest">
                Trending Themes (Volume Spike Detected)
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {trendingClusters.map((cluster) => (
                <div
                  key={cluster.theme}
                  onClick={() => handleOpenCluster(cluster)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/40 p-4 transition hover:border-amber-400 hover:shadow-md hover:bg-amber-50/80"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold uppercase text-amber-800 border border-amber-300">
                        🔥 Trending (+{cluster.growthRate}%)
                      </span>
                      <h4 className="mt-2 text-base font-bold text-forest group-hover:text-amber-900 transition">
                        {cluster.theme}
                      </h4>
                    </div>
                    <ChevronRight size={18} className="text-amber-600 group-hover:translate-x-0.5 transition-transform" />
                  </div>

                  <p className="mt-2 text-xs text-taupe font-medium">
                    {cluster.totalCount} total feedback items ({cluster.recentCount} recent vs {cluster.previousCount} prior)
                  </p>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-amber-200/60">
                    <span className="text-[11px] font-semibold text-slate-600">
                      Score:{" "}
                      <span className={cluster.avgScore >= 0 ? "text-emerald-700 font-bold" : "text-red-600 font-bold"}>
                        {cluster.avgScore >= 0 ? `+${cluster.avgScore}` : cluster.avgScore}
                      </span>
                    </span>

                    <span className="text-[10px] font-bold text-forest group-hover:underline">
                      Click to view items &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: All Named Theme Clusters */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-taupe">
            All Named Theme Clusters ({clusters.length})
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {clusters.map((cluster) => (
              <div
                key={cluster.theme}
                onClick={() => handleOpenCluster(cluster)}
                className="group cursor-pointer rounded-2xl border border-loop-border bg-cream/20 p-4 transition hover:border-forest/40 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-bold text-forest group-hover:text-forest-mid transition">
                    {cluster.theme}
                  </h4>
                  <span className="rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-extrabold text-forest">
                    {cluster.totalCount}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 font-semibold text-slate-600">
                    <span className="text-emerald-600">+{cluster.sentimentBreakdown.positive}</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-amber-600">{cluster.sentimentBreakdown.neutral}</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-red-600">-{cluster.sentimentBreakdown.negative}</span>
                  </div>

                  <span className="text-[11px] font-semibold text-taupe group-hover:text-forest group-hover:underline flex items-center">
                    Inspect <ChevronRight size={14} className="ml-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Theme Feedback Items Modal */}
      <ThemeFeedbackModal
        cluster={selectedCluster}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCluster(null);
        }}
      />
    </>
  );
}
