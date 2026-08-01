"use client";

import { FileText, Plus } from "lucide-react";

interface EmptyReportsProps {
  onGenerate?: () => void;
}

export default function EmptyReports({
  onGenerate,
}: EmptyReportsProps) {
  return (
    <div className="rounded-2xl border border-dashed border-loop-border bg-white p-16 shadow-sm">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-100">
          <FileText
            size={40}
            className="text-indigo-600"
          />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-forest">
          No Reports Found
        </h2>

        <p className="mt-3 text-lg leading-7 text-taupe">
          You haven&apos;t generated any reports yet.
          Create your first report to start analyzing
          customer feedback and insights.
        </p>

        <button
          onClick={onGenerate}
          className="
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-indigo-600
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-indigo-700
          "
        >
          <Plus size={18} />
          Generate Report
        </button>
      </div>
    </div>
  );
}