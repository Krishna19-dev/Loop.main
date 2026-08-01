"use client";

import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { ReportStatus } from "@/types/report";

interface ReportStatusBadgeProps {
  status: ReportStatus;
}

export default function ReportStatusBadge({
  status,
}: ReportStatusBadgeProps) {
  const config = {
    Generated: {
      label: "Generated",
      icon: CheckCircle2,
      className:
        "bg-sage-bg text-sage border border-emerald-200",
    },
    Processing: {
      label: "Processing",
      icon: Clock3,
      className:
        "bg-champagne-deep text-amber-700 border border-amber-200",
    },
    Failed: {
      label: "Failed",
      icon: XCircle,
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