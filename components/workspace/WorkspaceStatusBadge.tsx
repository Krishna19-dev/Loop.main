"use client";

import {
  CheckCircle2,
  Archive,
  Ban,
} from "lucide-react";

import { WorkspaceStatus } from "@/types/workspace";

interface WorkspaceStatusBadgeProps {
  status: WorkspaceStatus;
}

export default function WorkspaceStatusBadge({
  status,
}: WorkspaceStatusBadgeProps) {
  const config = {
    Active: {
      label: "Active",
      icon: CheckCircle2,
      className:
        "bg-sage-bg text-sage border border-emerald-200",
    },
    Archived: {
      label: "Archived",
      icon: Archive,
      className:
        "bg-champagne-deep text-amber-700 border border-amber-200",
    },
    Inactive: {
      label: "Inactive",
      icon: Ban,
      className:
        "bg-terra-bg text-terra border border-red-200",
    },
  };

  const current = config[status];
  const Icon = current.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${current.className}
      `}
    >
      <Icon size={14} />
      {current.label}
    </span>
  );
}