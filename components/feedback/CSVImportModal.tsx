"use client";

import { useState, useRef } from "react";
import { X, UploadCloud, FileText, CheckCircle2, Download, AlertCircle } from "lucide-react";
import { Feedback, FeedbackSentiment, FeedbackStatus } from "@/types/feedback";

interface CSVImportModalProps {
  open: boolean;
  onClose: () => void;
  onImport: (items: Omit<Feedback, "id">[]) => void;
}

export default function CSVImportModal({
  open,
  onClose,
  onImport,
}: CSVImportModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<Omit<Feedback, "id">[]>([]);
  const [error, setError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  if (!open) return null;

  function parseCSV(text: string): Omit<Feedback, "id">[] {
    const lines = text
      .split(/\r\n|\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length <= 1) {
      throw new Error("CSV file is empty or missing data rows.");
    }

    const headers = lines[0].toLowerCase().split(",").map((h) => h.replace(/^["']|["']$/g, "").trim());
    
    const requiredFields = ["customer", "email", "message"];
    const hasRequired = requiredFields.every((field) =>
      headers.some((h) => h.includes(field))
    );

    if (!hasRequired) {
      throw new Error("CSV must contain at least 'customer', 'email', and 'message' columns.");
    }

    const customerIdx = headers.findIndex((h) => h.includes("customer") || h.includes("name"));
    const emailIdx = headers.findIndex((h) => h.includes("email"));
    const messageIdx = headers.findIndex((h) => h.includes("message") || h.includes("feedback"));
    const categoryIdx = headers.findIndex((h) => h.includes("category"));
    const ratingIdx = headers.findIndex((h) => h.includes("rating") || h.includes("score"));
    const sentimentIdx = headers.findIndex((h) => h.includes("sentiment"));
    const statusIdx = headers.findIndex((h) => h.includes("status"));
    const priorityIdx = headers.findIndex((h) => h.includes("priority"));

    const dateStr = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const results: Omit<Feedback, "id">[] = [];

    for (let i = 1; i < lines.length; i++) {
      // Regex CSV line split handling quotes
      const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(",");
      const cleanRow = row.map((val) => val.replace(/^["']|["']$/g, "").trim());

      const customerVal = customerIdx !== -1 && cleanRow[customerIdx] ? cleanRow[customerIdx] : "Anonymous User";
      const emailVal = emailIdx !== -1 && cleanRow[emailIdx] ? cleanRow[emailIdx] : "user@example.com";
      const messageVal = messageIdx !== -1 && cleanRow[messageIdx] ? cleanRow[messageIdx] : "No message provided";
      const categoryVal = categoryIdx !== -1 && cleanRow[categoryIdx] ? cleanRow[categoryIdx] : "General";

      const ratingNum = ratingIdx !== -1 ? parseInt(cleanRow[ratingIdx], 10) : 4;
      const validRating = !isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5 ? ratingNum : 4;

      const rawSentiment = sentimentIdx !== -1 ? cleanRow[sentimentIdx].toLowerCase() : "";
      let sentimentVal: FeedbackSentiment = "Neutral";
      if (rawSentiment.includes("pos")) sentimentVal = "Positive";
      else if (rawSentiment.includes("neg")) sentimentVal = "Negative";

      const rawStatus = statusIdx !== -1 ? cleanRow[statusIdx].toLowerCase() : "";
      let statusVal: FeedbackStatus = "Pending";
      if (rawStatus.includes("rev")) statusVal = "Reviewed";
      else if (rawStatus.includes("res")) statusVal = "Resolved";

      const rawPriority = priorityIdx !== -1 ? cleanRow[priorityIdx].toLowerCase() : "";
      let priorityVal: "Low" | "Medium" | "High" = "Medium";
      if (rawPriority.includes("high")) priorityVal = "High";
      else if (rawPriority.includes("low")) priorityVal = "Low";

      results.push({
        customer: customerVal,
        email: emailVal,
        message: messageVal,
        category: categoryVal,
        rating: validRating,
        sentiment: sentimentVal,
        status: statusVal,
        priority: priorityVal,
        date: dateStr,
      });
    }

    return results;
  }

  function handleFileSelected(selectedFile: File) {
    if (!selectedFile.name.endsWith(".csv")) {
      setError("Please select a valid .csv file.");
      setFile(null);
      setParsedData([]);
      return;
    }

    setError("");
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data = parseCSV(text);
        setParsedData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to parse CSV file format.");
        setParsedData([]);
      }
    };
    reader.readAsText(selectedFile);
  }

  function handleDownloadSample() {
    const csvContent =
      "customer,email,message,category,rating,sentiment,status,priority\n" +
      "Samantha Reed,samantha@techcorp.com,The new CSV ingestion feature saves us hours of work every week!,Feature,5,Positive,Pending,High\n" +
      "Carlos Ruiz,carlos@designstudio.io,Found a small display glitch when viewing on mobile screens.,Bug,3,Negative,Reviewed,Medium\n" +
      "Elena Rostova,elena@analytics.org,Great customer dashboard response times and clear charts.,Product,5,Positive,Resolved,Low\n";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "feedback_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleConfirmImport() {
    if (parsedData.length === 0) return;
    onImport(parsedData);
    handleReset();
    onClose();
  }

  function handleReset() {
    setFile(null);
    setParsedData([]);
    setError("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl border border-loop-border bg-white p-6 md:p-8 shadow-2xl transition-all my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-loop-border pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest text-champagne">
              <UploadCloud size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-forest">Import Feedback via CSV</h2>
              <p className="text-xs text-taupe">Batch upload customer feedback records in bulk</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-cream hover:text-slate-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Dropzone area */}
        {!file ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileSelected(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition ${
              isDragOver
                ? "border-forest bg-sage-bg/30"
                : "border-loop-border bg-cream/40 hover:border-forest/50 hover:bg-cream"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelected(e.target.files[0]);
                }
              }}
            />
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest/10 text-forest">
              <UploadCloud size={28} />
            </div>
            <p className="text-sm font-semibold text-forest">
              Click to select or drag and drop your CSV file here
            </p>
            <p className="mt-1 text-xs text-taupe">
              Supported format: .csv (with headers: customer, email, message, category, etc.)
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-loop-border bg-white px-4 py-2 text-xs font-medium text-forest shadow-sm hover:bg-cream transition"
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadSample();
              }}
            >
              <Download size={14} />
              Download Sample CSV Template
            </div>
          </div>
        ) : (
          /* Preview Section */
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-loop-border bg-cream/40 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-bg text-sage">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-forest">{file.name}</h4>
                  <p className="text-xs text-taupe">
                    Parsed {parsedData.length} valid feedback record{parsedData.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-red-600 hover:underline"
              >
                Change File
              </button>
            </div>

            {/* Preview table */}
            {parsedData.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-forest mb-2">
                  Preview (showing first {Math.min(5, parsedData.length)} of {parsedData.length} rows):
                </p>
                <div className="max-h-48 overflow-y-auto rounded-xl border border-loop-border bg-white text-xs">
                  <table className="w-full text-left">
                    <thead className="sticky top-0 bg-cream text-forest font-semibold border-b border-loop-border">
                      <tr>
                        <th className="p-2.5">Customer</th>
                        <th className="p-2.5">Category</th>
                        <th className="p-2.5">Rating</th>
                        <th className="p-2.5">Sentiment</th>
                        <th className="p-2.5">Message</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-loop-border">
                      {parsedData.slice(0, 5).map((row, idx) => (
                        <tr key={idx} className="hover:bg-cream/30">
                          <td className="p-2.5 font-medium">{row.customer}</td>
                          <td className="p-2.5">{row.category}</td>
                          <td className="p-2.5">⭐ {row.rating}</td>
                          <td className="p-2.5">{row.sentiment}</td>
                          <td className="p-2.5 truncate max-w-xs">{row.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal footer actions */}
        <div className="flex items-center gap-3 pt-6 border-t border-loop-border mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-loop-border py-3 text-sm font-medium text-slate-600 hover:bg-cream transition"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={parsedData.length === 0}
            onClick={handleConfirmImport}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-forest py-3 text-sm font-semibold text-champagne hover:bg-forest-mid hover:text-white transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle2 size={18} />
            Import {parsedData.length > 0 ? `${parsedData.length} Records` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
