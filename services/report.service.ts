import { reports } from "@/data/reports";
import { Report } from "@/types/report";

class ReportService {
  async getReports(): Promise<Report[]> {
    // Later:
    // const response = await fetch("/api/reports");
    // return response.json();

    return Promise.resolve(reports);
  }

  async getReportById(id: string): Promise<Report | undefined> {
    // Later:
    // const response = await fetch(`/api/reports/${id}`);
    // return response.json();

    return Promise.resolve(
      reports.find((report) => report.id === id)
    );
  }

  async generateReport(
    report: Omit<Report, "id" | "createdAt">
  ): Promise<Report> {
    // Later:
    // POST /api/reports

    const newReport: Report = {
      ...report,
      id: crypto.randomUUID(),
      createdAt: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    reports.unshift(newReport);

    return Promise.resolve(newReport);
  }

  async deleteReport(id: string): Promise<boolean> {
    // Later:
    // DELETE /api/reports/:id

    const index = reports.findIndex(
      (report) => report.id === id
    );

    if (index !== -1) {
      reports.splice(index, 1);
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }

  async downloadReport(id: string): Promise<string | undefined> {
    // Later:
    // GET /api/reports/:id/download

    const report = reports.find(
      (report) => report.id === id
    );

    return Promise.resolve(report?.downloadUrl);
  }
}

export const reportService = new ReportService();