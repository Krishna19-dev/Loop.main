import { Report } from "@/types/report";

export const reports: Report[] = [
  {
    id: "1",
    name: "Weekly Feedback Report",
    description:
      "Summary of customer feedback collected during the past week.",
    format: "PDF",
    status: "Generated",
    createdBy: "Huzaif",
    createdAt: "26 Jul 2026",
    downloadUrl: "/reports/weekly-feedback.pdf",
  },
  {
    id: "2",
    name: "Monthly Analytics Report",
    description:
      "Analytics dashboard export including charts and KPIs.",
    format: "Excel",
    status: "Generated",
    createdBy: "Administrator",
    createdAt: "24 Jul 2026",
    downloadUrl: "/reports/monthly-analytics.xlsx",
  },
  {
    id: "3",
    name: "Customer Sentiment Report",
    description:
      "AI-generated sentiment analysis across all customer reviews.",
    format: "PDF",
    status: "Processing",
    createdBy: "LOOP AI",
    createdAt: "23 Jul 2026",
  },
  {
    id: "4",
    name: "Bug Feedback Report",
    description:
      "Report containing bug-related customer feedback and trends.",
    format: "CSV",
    status: "Generated",
    createdBy: "Support Team",
    createdAt: "22 Jul 2026",
    downloadUrl: "/reports/bug-feedback.csv",
  },
  {
    id: "5",
    name: "Executive Summary",
    description:
      "AI-generated executive summary for leadership review.",
    format: "PDF",
    status: "Failed",
    createdBy: "LOOP AI",
    createdAt: "21 Jul 2026",
  },
];