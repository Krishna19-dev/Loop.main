"use client";

import { useEffect, useMemo, useState } from "react";

import ReportsHeader from "@/components/reports/ReportsHeader";
import ReportCards from "@/components/reports/ReportCards";
import ReportFilters from "@/components/reports/ReportFilters";
import ReportTable from "@/components/reports/ReportTable";
import ReportPagination from "@/components/reports/ReportPagination";
import GenerateReportModal from "@/components/reports/GenerateReportModal";
import ViewReportModal from "@/components/reports/ViewReportModal";
import VoCReportModal from "@/components/reports/VoCReportModal";
import EmptyReports from "@/components/reports/EmptyReports";

import { Report } from "@/types/report";
import { reportService } from "@/services/report.service";
import { authService } from "@/services/auth.service";

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [format, setFormat] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [vocModalOpen, setVocModalOpen] = useState(false);
  const [isGeneratingVoC, setIsGeneratingVoC] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function loadReports() {
      const data = await reportService.getReports();
      setReports(data);
    }
    loadReports();
  }, []);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.name.toLowerCase().includes(search.toLowerCase()) ||
        report.description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = !status || report.status === status;
      const matchesFormat = !format || report.format === format;

      return matchesSearch && matchesStatus && matchesFormat;
    });
  }, [reports, search, status, format]);

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / pageSize));

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  async function handleGenerate(data: {
    name: string;
    description: string;
    format: "PDF" | "Excel" | "CSV";
  }) {
    const currentUser = authService.getCurrentUser();
    const newReport = await reportService.generateReport({
      name: data.name,
      description: data.description || "Custom feedback and sentiment report.",
      format: data.format,
      status: "Generated",
      createdBy: currentUser?.name || "Administrator",
      downloadUrl: `/reports/${data.name.toLowerCase().replace(/\s+/g, "-")}.${data.format.toLowerCase()}`,
    });

    setReports((prev) => [newReport, ...prev]);
    setModalOpen(false);
  }

  async function handleGenerateVoC() {
    try {
      setIsGeneratingVoC(true);
      const res = await fetch("/api/ai/voc-report", { method: "POST" });
      const data = await res.json();

      if (res.ok && data.report) {
        setReports((prev) => [data.report, ...prev]);
        setSelectedReport(data.report);
        setVocModalOpen(true);
      }
    } catch (err) {
      console.warn("[1-Click VoC Report Error]", err);
    } finally {
      setIsGeneratingVoC(false);
    }
  }

  function handleView(report: Report) {
    setSelectedReport(report);
    if (report.stats || report.narrative) {
      setVocModalOpen(true);
    } else {
      setViewModalOpen(true);
    }
  }

  function exportReportAsPdf(report: Report) {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const stats = report.stats;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${report.name} - LOOP PDF Report</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0F3028; padding: 40px; margin: 0; background: #fff; }
    .header { border-bottom: 3px solid #0F3028; padding-bottom: 20px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; }
    .title { font-size: 26px; font-weight: 800; color: #0F3028; margin: 0; }
    .subtitle { font-size: 13px; color: #64748b; margin-top: 5px; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 11px; font-weight: 700; background: #0F3028; color: #fff; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 25px; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 15px; text-align: center; }
    .card-val { font-size: 24px; font-weight: 800; color: #0F3028; margin-top: 5px; }
    .card-lbl { font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.5px; }
    .section-title { font-size: 16px; font-weight: 700; color: #0F3028; margin-top: 25px; margin-bottom: 12px; border-left: 4px solid #6B8F71; padding-left: 10px; }
    .content-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; font-size: 13px; line-height: 1.6; color: #334155; }
    .quote-box { background: #fff; border-left: 4px solid #f59e0b; border: 1px solid #e2e8f0; border-left-color: #f59e0b; padding: 12px 16px; margin-bottom: 10px; border-radius: 8px; font-style: italic; font-size: 12px; color: #1e293b; }
    .theme-chip { display: inline-block; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; margin-right: 8px; margin-bottom: 8px; color: #0F3028; }
    .action-item { margin-bottom: 8px; font-size: 13px; color: #0f172a; font-weight: 600; display: flex; gap: 8px; }
    .num-bullet { background: #166534; color: #fff; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; shrink: 0; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="title">${report.name}</h1>
      <div class="subtitle">Generated by ${report.createdBy} on ${report.createdAt} | Project LOOP AI Platform</div>
    </div>
    <div>
      <span class="badge">${report.format} Report</span>
    </div>
  </div>

  ${stats ? `
  <div class="grid">
    <div class="card">
      <div class="card-lbl">Total Feedback</div>
      <div class="card-val">${stats.totalCount}</div>
    </div>
    <div class="card">
      <div class="card-lbl">Positive Rate</div>
      <div class="card-val" style="color: #15803d">${stats.positiveRate}%</div>
    </div>
    <div class="card">
      <div class="card-lbl">Average Rating</div>
      <div class="card-val" style="color: #b45309">${stats.avgRating} / 5.0</div>
    </div>
    <div class="card">
      <div class="card-lbl">Negative Rate</div>
      <div class="card-val" style="color: #b91c1c">${stats.negativeRate}%</div>
    </div>
  </div>
  ` : ''}

  ${stats?.topThemes && stats.topThemes.length > 0 ? `
  <div class="section-title">Top Identified Feedback Themes</div>
  <div>
    ${stats.topThemes.map(t => `<div class="theme-chip">${t.theme} (${t.count} items)</div>`).join('')}
  </div>
  ` : ''}

  ${report.narrative ? `
  <div class="section-title">Executive AI Commentary</div>
  <div class="content-box">${report.narrative.replace(/\n/g, '<br/>')}</div>
  ` : ''}

  ${stats?.realQuotes && stats.realQuotes.length > 0 ? `
  <div class="section-title">Representative Customer Voice Quotes</div>
  ${stats.realQuotes.map(q => `
    <div class="quote-box">
      <strong>${q.customer} (${q.category} - ${q.sentiment}):</strong> "${q.message}"
    </div>
  `).join('')}
  ` : ''}

  ${stats?.recommendedActions && stats.recommendedActions.length > 0 ? `
  <div class="section-title">Recommended Action Plan</div>
  <div class="content-box">
    ${stats.recommendedActions.map((a, i) => `<div class="action-item"><span class="num-bullet">${i + 1}</span> <span>${a}</span></div>`).join('')}
  </div>
  ` : ''}

</body>
</html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }

  function handleDownload(report: Report) {
    if (report.format === "PDF" || report.stats) {
      exportReportAsPdf(report);
      return;
    }

    const content = `LOOP AI REPORT: ${report.name}
==================================================
Date: ${report.createdAt}
Created By: ${report.createdBy}
Format: ${report.format}
Status: ${report.status}

Description:
${report.description}

Generated by LOOP AI Platform.
`;

    const mimeType = report.format === "CSV" ? "text/csv" : "text/plain";
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const fileExt = report.format === "CSV" ? "csv" : "txt";
    link.download = `${report.name.toLowerCase().replace(/\s+/g, "-")}.${fileExt}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  async function handleDelete(report: Report) {
    await reportService.deleteReport(report.id);
    setReports((prev) => prev.filter((r) => r.id !== report.id));
    if (selectedReport?.id === report.id) {
      setViewModalOpen(false);
      setVocModalOpen(false);
      setSelectedReport(null);
    }
  }

  return (
    <>
      <div className="space-y-8">
        <ReportsHeader
          onGenerate={() => setModalOpen(true)}
          onGenerateVoC={handleGenerateVoC}
          isGeneratingVoC={isGeneratingVoC}
        />

        <ReportCards reports={reports} />

        <ReportFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          format={format}
          onFormatChange={setFormat}
          onGenerate={() => setModalOpen(true)}
        />

        {filteredReports.length === 0 ? (
          <EmptyReports onGenerate={() => setModalOpen(true)} />
        ) : (
          <>
            <ReportTable
              reports={paginatedReports}
              onView={handleView}
              onDownload={handleDownload}
              onDelete={handleDelete}
            />

            <ReportPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredReports.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      <GenerateReportModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onGenerate={handleGenerate}
      />

      <ViewReportModal
        report={selectedReport}
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedReport(null);
        }}
        onDownload={handleDownload}
      />

      <VoCReportModal
        report={selectedReport}
        open={vocModalOpen}
        onClose={() => {
          setVocModalOpen(false);
          setSelectedReport(null);
        }}
        onDownload={handleDownload}
      />
    </>
  );
}