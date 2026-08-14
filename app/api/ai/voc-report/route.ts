import { NextRequest, NextResponse } from "next/server";
import { feedbackService } from "@/services/feedback.service";
import { reportService } from "@/services/report.service";
import { computeVoCStats } from "@/utils/vocReport";
import { generateVoCNarrative } from "@/lib/ai";
import { authService } from "@/services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const user = authService.getCurrentUser();
    const headerRole = req.headers.get("x-user-role");
    const role = user?.role || headerRole || "ADMIN";

    // All roles (Admin, Analyst, Viewer) can generate VoC reports!

    // 1. Fetch live feedback records
    const allFeedbacks = await feedbackService.getFeedback();

    // 2. Pre-compute exact stats in code (zero hallucination)
    const stats = computeVoCStats(allFeedbacks);

    // 3. Let Gemini generate narrative structured strictly around these pre-computed stats
    let narrative = "";
    try {
      narrative = await generateVoCNarrative(stats as unknown as Record<string, unknown>);
    } catch (aiErr) {
      console.warn("[VoC AI Narrative Warning]", aiErr);
      narrative = `Executive Summary:\nAnalyzed ${stats.totalCount} customer feedback items. Overall positive sentiment is ${stats.positiveRate}%, with average satisfaction score of ${stats.avgRating}/5.0.\n\nKey Recommendations:\n${stats.recommendedActions.map((a) => `- ${a}`).join("\n")}`;
    }

    // 4. Save VoC Report
    const reportName = `Voice of Customer Report - ${new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}`;
    const newReport = await reportService.generateReport({
      name: reportName,
      description: `Executive Voice-of-Customer report. Analyzed ${stats.totalCount} customer feedbacks with ${stats.positiveRate}% positive sentiment.`,
      format: "PDF",
      status: "Generated",
      createdBy: user?.name || "Administrator",
      downloadUrl: `/reports/voc-report-${Date.now()}.pdf`,
      narrative,
      stats,
    });

    return NextResponse.json({
      success: true,
      report: newReport,
    });
  } catch (error) {
    console.error("[POST /api/ai/voc-report Error]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate VoC Report" },
      { status: 500 }
    );
  }
}
