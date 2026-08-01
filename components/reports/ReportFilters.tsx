"use client";

import { Search, Filter } from "lucide-react";

interface ReportFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  format: string;
  onFormatChange: (value: string) => void;

  onGenerate: () => void;
}

export default function ReportFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  format,
  onFormatChange,
}: ReportFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-loop-border bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      {/* Search */}

      <div className="relative w-full lg:w-96">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search reports..."
          className="w-full rounded-xl border border-loop-border bg-cream py-3 pl-11 pr-4 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage-bg"
        />
      </div>

      {/* Filters */}

      <div className="flex flex-wrap gap-3">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl border border-loop-border bg-white px-4 py-3 text-sm outline-none focus:border-sage"
        >
          <option value="">All Status</option>
          <option value="Generated">Generated</option>
          <option value="Processing">Processing</option>
          <option value="Failed">Failed</option>
        </select>

        <select
          value={format}
          onChange={(e) => onFormatChange(e.target.value)}
          className="rounded-xl border border-loop-border bg-white px-4 py-3 text-sm outline-none focus:border-sage"
        >
          <option value="">All Formats</option>
          <option value="PDF">PDF</option>
          <option value="Excel">Excel</option>
          <option value="CSV">CSV</option>
        </select>

        <button className="flex items-center gap-2 rounded-xl bg-forest text-champagne border border-forest-light px-5 py-3 text-white transition hover:bg-forest-light hover:text-white">
          <Filter size={18} />
          Filter
        </button>
      </div>
    </div>
  );
}