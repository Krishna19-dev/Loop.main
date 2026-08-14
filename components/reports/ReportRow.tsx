"use client";

import {
  Download,
  Eye,
  Trash2,
  FileText,
} from "lucide-react";

import { Report } from "@/types/report";
import ReportStatusBadge from "./ReportStatusBadge";

interface ReportRowProps {
  report: Report;
  onView?: (report: Report) => void;
  onDownload?: (report: Report) => void;
  onDelete?: (report: Report) => void;
}

export default function ReportRow({
  report,
  onView,
  onDownload,
  onDelete,
}: ReportRowProps) {
  return (
    <tr className="border-b border-loop-border transition hover:bg-cream">
      {/* Report Name */}
      <td className="px-6 py-5">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-sage-bg p-2">
            <FileText
              size={18}
              className="text-sage"
            />
          </div>

          <div>
            <h3 className="font-semibold text-forest">
              {report.name}
            </h3>

            <p className="mt-1 text-sm text-taupe">
              {report.description}
            </p>
          </div>
        </div>
      </td>

      {/* Format */}
      <td className="px-6 py-5">
        <span className="rounded-lg bg-cream-dark px-3 py-1 text-sm font-medium text-forest-light">
          {report.format}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <ReportStatusBadge status={report.status} />
      </td>

      {/* Created By */}
      <td className="px-6 py-5 text-forest-light">
        {report.createdBy}
      </td>

      {/* Created At */}
      <td className="px-6 py-5 text-taupe">
        {report.createdAt}
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView?.(report)}
            className="rounded-lg bg-sage-bg p-2 text-sage transition hover:bg-sage-bg"
            title="View Report"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onDownload?.(report)}
            disabled={report.status === "Failed"}
            className="rounded-lg bg-sage-bg p-2 text-sage transition hover:bg-sage-bg disabled:cursor-not-allowed disabled:opacity-50"
            title="Download Report"
          >
            <Download size={18} />
          </button>

          {onDelete && (
            <button
              onClick={() => onDelete?.(report)}
              className="rounded-lg bg-terra-bg p-2 text-terra transition hover:bg-red-200"
              title="Delete Report"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}