export type ReportStatus =
  | "Generated"
  | "Processing"
  | "Failed";

export type ReportFormat =
  | "PDF"
  | "Excel"
  | "CSV";

export interface VoCQuote {
  customer: string;
  email: string;
  message: string;
  sentiment: string;
  category: string;
  rating: number;
}

export interface VoCStats {
  totalCount: number;
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
  positiveRate: number;
  neutralRate: number;
  negativeRate: number;
  avgRating: number;
  sentimentShift: string; // e.g. "+12% positive sentiment shift vs previous 7 days"
  topThemes: Array<{ theme: string; count: number; sentiment: string }>;
  realQuotes: VoCQuote[];
  recommendedActions: string[];
}

export interface Report {
  id: string;
  name: string;
  description: string;
  format: ReportFormat;
  status: ReportStatus;
  createdBy: string;
  createdAt: string;
  downloadUrl?: string;
  narrative?: string;
  stats?: VoCStats;
}