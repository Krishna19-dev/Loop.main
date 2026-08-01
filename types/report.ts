export type ReportStatus =
  | "Generated"
  | "Processing"
  | "Failed";

export type ReportFormat =
  | "PDF"
  | "Excel"
  | "CSV";

export interface Report {
  id: string;
  name: string;
  description: string;
  format: ReportFormat;
  status: ReportStatus;
  createdBy: string;
  createdAt: string;
  downloadUrl?: string;
}