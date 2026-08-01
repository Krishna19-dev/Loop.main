"use client";

import { FileText } from "lucide-react";

interface ReportsHeaderProps {
  onGenerate: () => void;
}

export default function ReportsHeader({
  onGenerate,
}: ReportsHeaderProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-5xl font-extrabold tracking-tight text-forest">
          Reports
        </h1>

        <p className="mt-3 text-lg leading-8 text-taupe">
          Generate, manage and download analytics reports from one
          centralized location.
        </p>
      </div>

      <button
        onClick={onGenerate}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-forest text-champagne border border-forest-light
          px-6
          py-3
          font-semibold
          text-white
          shadow-md
          transition-all
          hover:bg-forest-light hover:text-white
          hover:shadow-lg
        "
      >
        <FileText size={20} />
        Generate Report
      </button>
    </div>
  );
}