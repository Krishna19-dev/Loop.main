"use client";

import { Report } from "@/types/report";

import ReportRow from "./ReportRow";

interface ReportTableProps {
  reports: Report[];
  onView?: (report: Report) => void;
  onDownload?: (report: Report) => void;
  onDelete?: (report: Report) => void;
}

export default function ReportTable({
  reports,
  onView,
  onDownload,
  onDelete,
}: ReportTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-loop-border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-cream">
          <tr className="text-left text-sm font-semibold text-slate-600">
            <th className="px-6 py-4">Report</th>
            <th className="px-6 py-4">Format</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Created By</th>
            <th className="px-6 py-4">Created At</th>
            <th className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => (
            <ReportRow
              key={report.id}
              report={report}
              onView={onView}
              onDownload={onDownload}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}