"use client";

import { FileText } from "lucide-react";

interface AnalyticsHeaderProps {
  onExportPdf?: () => void;
}

export default function AnalyticsHeader({ onExportPdf }: AnalyticsHeaderProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-5xl font-extrabold tracking-tight text-forest">
          Analytics
        </h1>

        <p className="mt-3 text-lg text-taupe">
          Monitor trends, customer sentiment, and AI-powered insights.
        </p>
      </div>

      <button
        onClick={onExportPdf}
        className="
          flex items-center gap-2
          rounded-xl
          bg-forest text-champagne border border-forest-light
          px-6
          py-3
          text-white
          shadow-md
          transition
          hover:bg-forest-light hover:text-white
        "
      >
        <FileText size={18} />
        Export PDF Report
      </button>
    </div>
  );
}