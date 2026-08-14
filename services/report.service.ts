import { reports as SEED_REPORTS } from "@/data/reports";
import { Report } from "@/types/report";

class ReportService {
  private storageKey = "loop_reports_v4";

  private getStoredReports(): Report[] {
    if (typeof window === "undefined") return SEED_REPORTS;

    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      localStorage.setItem(this.storageKey, JSON.stringify(SEED_REPORTS));
      return SEED_REPORTS;
    }

    try {
      return JSON.parse(stored);
    } catch {
      return SEED_REPORTS;
    }
  }

  private saveReports(list: Report[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.storageKey, JSON.stringify(list));
    }
  }

  async getReports(): Promise<Report[]> {
    return Promise.resolve(this.getStoredReports());
  }

  async getReportById(id: string): Promise<Report | undefined> {
    const list = this.getStoredReports();
    return Promise.resolve(list.find((report) => report.id === id));
  }

  async generateReport(
    report: Omit<Report, "id" | "createdAt">
  ): Promise<Report> {
    const list = this.getStoredReports();

    const newReport: Report = {
      ...report,
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      createdAt: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    const updated = [newReport, ...list];
    this.saveReports(updated);
    return Promise.resolve(newReport);
  }

  async deleteReport(id: string): Promise<boolean> {
    const list = this.getStoredReports();
    const filtered = list.filter((report) => report.id !== id);

    if (filtered.length !== list.length) {
      this.saveReports(filtered);
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }

  async downloadReport(id: string): Promise<string | undefined> {
    const list = this.getStoredReports();
    const report = list.find((report) => report.id === id);
    return Promise.resolve(report?.downloadUrl);
  }
}

export const reportService = new ReportService();