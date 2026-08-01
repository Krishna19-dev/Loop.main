"use client";

import { Search } from "lucide-react";

interface WorkspaceFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  onCreate: () => void;
}

export default function WorkspaceFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onCreate,
}: WorkspaceFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-loop-border bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">

      {/* Search */}

      <div className="relative w-full lg:max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search workspace..."
          className="w-full rounded-xl border border-loop-border bg-cream py-3 pl-11 pr-4 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage-bg"
        />
      </div>

      {/* Right Side */}

      <div className="flex flex-wrap gap-3">

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl border border-loop-border bg-white px-4 py-3 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage-bg"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Archived">Archived</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          onClick={onCreate}
          className="rounded-xl bg-forest text-champagne border border-forest-light px-6 py-3 font-medium text-white transition hover:bg-forest-light hover:text-white"
        >
          Create Workspace
        </button>

      </div>
    </div>
  );
}