"use client";

import {
  ShieldCheck,
  BarChart3,
  Eye,
} from "lucide-react";

import { TeamRole } from "@/types/team";

interface RoleBadgeProps {
  role: TeamRole;
}

export default function RoleBadge({
  role,
}: RoleBadgeProps) {
  const config = {
    Admin: {
      label: "Admin",
      icon: ShieldCheck,
      className:
        "bg-sage-bg text-sage border border-emerald-200",
    },
    Analyst: {
      label: "Analyst",
      icon: BarChart3,
      className:
        "bg-champagne-deep text-amber-700 border border-amber-200",
    },
    Viewer: {
      label: "Viewer",
      icon: Eye,
      className:
        "bg-blue-100 text-blue-700 border border-blue-200",
    },
  };

  const current = config[role];
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