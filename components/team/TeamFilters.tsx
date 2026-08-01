"use client";

import { Search } from "lucide-react";

interface TeamFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;

  role: string;
  onRoleChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  onInvite: () => void;
}

export default function TeamFilters({
  search,
  onSearchChange,
  role,
  onRoleChange,
  status,
  onStatusChange,
  onInvite,
}: TeamFiltersProps) {
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
          placeholder="Search members..."
          className="w-full rounded-xl border border-loop-border bg-cream py-3 pl-11 pr-4 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage-bg"
        />
      </div>

      {/* Right Side */}

      <div className="flex flex-wrap gap-3">

        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          className="rounded-xl border border-loop-border bg-white px-4 py-3 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage-bg"
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Analyst">Analyst</option>
          <option value="Viewer">Viewer</option>
        </select>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl border border-loop-border bg-white px-4 py-3 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage-bg"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          onClick={onInvite}
          className="rounded-xl bg-forest text-champagne border border-forest-light px-6 py-3 font-medium text-white transition hover:bg-forest-light hover:text-white"
        >
          Invite Member
        </button>

      </div>
    </div>
  );
}