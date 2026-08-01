"use client";

import { X, FileText, Download, CheckCircle, Calendar, User, FileSpreadsheet } from "lucide-react";
import { Report } from "@/types/report";
import ReportStatusBadge from "./ReportStatusBadge";

interface ViewReportModalProps {
  report: Report | null;
  open: boolean;
  onClose: () => void;
  onDownload: (report: Report) => void;
}

export default function ViewReportModal({
  report,
  open,
  onClose,
  onDownload,
}: ViewReportModalProps) {
  if (!open || !report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden border border-loop-border">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-loop-border bg-cream/50 p-6">
          <div className="flex items-center gap-3.5">
            <div className="rounded-2xl bg-forest p-3 text-champagne">
              {report.format === "Excel" || report.format === "CSV" ? (
                <FileSpreadsheet size={24} />
              ) : (
                <FileText size={24} />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-forest">
                  {report.name}
                </h2>
                <ReportStatusBadge status={report.status} />
              </div>
              <p className="text-xs text-taupe mt-0.5">
                Format: <span className="font-semibold text-forest-light">{report.format}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-cream-dark hover:text-slate-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-cream p-4 text-xs">
            <div className="flex items-center gap-2">
              <User size={16} className="text-sage" />
              <div>
                <span className="text-taupe block">Created By</span>
                <span className="font-semibold text-forest">{report.createdBy}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-sage" />
              <div>
                <span className="text-taupe block">Date Generated</span>
                <span className="font-semibold text-forest">{report.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-taupe mb-1.5">
              Description
            </h3>
            <p className="text-sm text-forest-light leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {report.description || "No description provided for this report."}
            </p>
          </div>

          {/* AI Insights & Summary Preview */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-taupe">
              Report Executive Summary
            </h3>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 text-center">
                <span className="text-xs text-emerald-700 font-medium block">Total Sampled</span>
                <span className="text-xl font-extrabold text-emerald-900 mt-1 block">1,540</span>
              </div>
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3 text-center">
                <span className="text-xs text-blue-700 font-medium block">Positive Sentiment</span>
                <span className="text-xl font-extrabold text-blue-900 mt-1 block">78%</span>
              </div>
              <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-3 text-center">
                <span className="text-xs text-amber-700 font-medium block">Action Items</span>
                <span className="text-xl font-extrabold text-amber-900 mt-1 block">12 Topics</span>
              </div>
            </div>

            <div className="rounded-2xl border border-sage-bg0 bg-sage-bg/30 p-4 text-xs text-forest space-y-2">
              <div className="flex items-center gap-2 font-bold text-forest text-sm">
                <CheckCircle size={16} className="text-sage" />
                Key Analytical Findings
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                <li>Customer satisfaction increased by +18% over the evaluated period.</li>
                <li>Product Experience and Onboarding received the highest positive sentiment scores.</li>
                <li>Recommended priority: Address minor mobile UI layout responsiveness on Safari browsers.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-loop-border bg-cream/30 p-6">
          <button
            onClick={onClose}
            className="rounded-xl border border-loop-border px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-cream-dark"
          >
            Close
          </button>

          <button
            onClick={() => {
              onDownload(report);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-forest px-6 py-2.5 text-sm font-semibold text-champagne border border-forest-light shadow-md transition hover:bg-forest-light hover:text-white"
          >
            <Download size={16} />
            Download {report.format} Report
          </button>
        </div>
      </div>
    </div>
  );
}
