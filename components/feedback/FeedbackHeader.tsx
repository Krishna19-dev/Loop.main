"use client";

import { Plus, UploadCloud } from "lucide-react";

interface FeedbackHeaderProps {
  onOpenAddModal: () => void;
  onOpenCSVModal: () => void;
}

export default function FeedbackHeader({
  onOpenAddModal,
  onOpenCSVModal,
}: FeedbackHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-forest">
          Feedback Management
        </h1>
        <p className="mt-2 text-base md:text-lg text-taupe">
          Monitor customer feedback, ingest new entries, and manage response statuses.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onOpenCSVModal}
          className="
            inline-flex items-center gap-2 rounded-xl
            border border-loop-border bg-white
            px-4 py-2.5
            text-sm font-semibold text-forest
            shadow-sm transition-all
            hover:bg-cream hover:border-forest/30
          "
        >
          <UploadCloud size={18} />
          Import CSV
        </button>

        <button
          onClick={onOpenAddModal}
          className="
            inline-flex items-center gap-2 rounded-xl
            bg-forest text-champagne border border-forest-light
            px-5 py-2.5
            text-sm font-semibold
            shadow-md transition-all
            hover:bg-forest-light hover:text-white hover:shadow-lg
          "
        >
          <Plus size={18} />
          Add Feedback
        </button>
      </div>
    </div>
  );
}