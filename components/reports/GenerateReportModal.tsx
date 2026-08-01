"use client";

import { useState } from "react";
import { X, FileText } from "lucide-react";

interface GenerateReportModalProps {
  open: boolean;
  onClose: () => void;
  onGenerate: (data: {
    name: string;
    description: string;
    format: "PDF" | "Excel" | "CSV";
  }) => void;
}

export default function GenerateReportModal({
  open,
  onClose,
  onGenerate,
}: GenerateReportModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [format, setFormat] = useState<
    "PDF" | "Excel" | "CSV"
  >("PDF");

  if (!open) return null;

  function handleSubmit() {
    if (!name.trim()) return;

    onGenerate({
      name,
      description,
      format,
    });

    setName("");
    setDescription("");
    setFormat("PDF");

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-loop-border p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-sage-bg p-3">
              <FileText
                size={24}
                className="text-sage"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-forest">
                Generate Report
              </h2>

              <p className="text-sm text-taupe">
                Create a new analytics report.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-cream-dark"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="space-y-5 p-6">

          <div>
            <label className="mb-2 block font-medium text-forest-light">
              Report Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Monthly Feedback Report"
              className="w-full rounded-xl border border-loop-border px-4 py-3 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage-bg"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-forest-light">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe this report..."
              className="w-full rounded-xl border border-loop-border px-4 py-3 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage-bg"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-forest-light">
              Format
            </label>

            <select
              value={format}
              onChange={(e) =>
                setFormat(
                  e.target.value as
                    | "PDF"
                    | "Excel"
                    | "CSV"
                )
              }
              className="w-full rounded-xl border border-loop-border px-4 py-3 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage-bg"
            >
              <option value="PDF">PDF</option>
              <option value="Excel">
                Excel
              </option>
              <option value="CSV">CSV</option>
            </select>
          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-loop-border p-6">

          <button
            onClick={onClose}
            className="rounded-xl border border-loop-border px-6 py-3 transition hover:bg-cream-dark"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-forest text-champagne border border-forest-light px-6 py-3 font-medium text-white transition hover:bg-forest-light hover:text-white"
          >
            Generate
          </button>

        </div>
      </div>
    </div>
  );
}