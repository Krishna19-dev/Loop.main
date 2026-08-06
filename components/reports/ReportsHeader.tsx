"use client";

import { FileText, Sparkles } from "lucide-react";

interface ReportsHeaderProps {
  onGenerate: () => void;
  onGenerateVoC?: () => void;
  isGeneratingVoC?: boolean;
}

export default function ReportsHeader({
  onGenerate,
  onGenerateVoC,
  isGeneratingVoC = false,
}: ReportsHeaderProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-5xl font-extrabold tracking-tight text-forest">
          Reports
        </h1>

        <p className="mt-3 text-lg leading-8 text-taupe">
          Generate, manage and download analytics and executive Voice-of-Customer reports.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {onGenerateVoC && (
          <button
            type="button"
            onClick={onGenerateVoC}
            disabled={isGeneratingVoC}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-forest px-5 py-3 font-semibold text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg disabled:opacity-50"
          >
            <Sparkles size={18} className={isGeneratingVoC ? "animate-spin text-amber-300" : "text-amber-300"} />
            <span>{isGeneratingVoC ? "Generating VoC..." : "⚡ 1-Click AI VoC Report"}</span>
          </button>
        )}

        <button
          onClick={onGenerate}
          className="flex items-center gap-2 rounded-xl bg-forest text-champagne border border-forest-light px-5 py-3 font-semibold text-white shadow-md transition-all hover:bg-forest-light hover:text-white hover:shadow-lg"
        >
          <FileText size={18} />
          Custom Report
        </button>
      </div>
    </div>
  );
}