"use client";

import {
  FileText,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import { Report } from "@/types/report";

interface ReportCardsProps {
  reports: Report[];
}

interface CardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

function Card({
  title,
  value,
  icon,
  color,
}: CardProps) {
  return (
    <div className="rounded-2xl border border-loop-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-taupe">{title}</p>

          <h2 className="mt-3 text-4xl font-bold text-forest">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl text-white ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function ReportCards({
  reports,
}: ReportCardsProps) {
  const totalReports = reports.length;

  const generatedReports = reports.filter(
    (report) => report.status === "Generated"
  ).length;

  const processingReports = reports.filter(
    (report) => report.status === "Processing"
  ).length;

  const failedReports = reports.filter(
    (report) => report.status === "Failed"
  ).length;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <Card
        title="Total Reports"
        value={totalReports}
        icon={<FileText size={24} />}
        color="bg-forest text-champagne border border-forest-light"
      />

      <Card
        title="Generated"
        value={generatedReports}
        icon={<CheckCircle2 size={24} />}
        color="bg-forest text-champagne border border-forest-light"
      />

      <Card
        title="Processing"
        value={processingReports}
        icon={<Clock3 size={24} />}
        color="bg-amber-500"
      />

      <Card
        title="Failed"
        value={failedReports}
        icon={<XCircle size={24} />}
        color="bg-red-500"
      />
    </div>
  );
}