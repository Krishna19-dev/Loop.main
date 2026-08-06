import { NextRequest, NextResponse } from "next/server";
import { feedbackService } from "@/services/feedback.service";
import { clusterFeedbackThemesWithGemini } from "@/lib/ai";
import { authService } from "@/services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const user = authService.getCurrentUser();
    const headerRole = req.headers.get("x-user-role");
    const role = user?.role || headerRole || "ADMIN";

    if (role === "VIEWER") {
      return NextResponse.json(
        { error: "Forbidden: VIEWER role cannot trigger theme clustering." },
        { status: 403 }
      );
    }

    const allFeedbacks = await feedbackService.getFeedback();
    const items = allFeedbacks.map((f) => ({
      id: f.id,
      message: f.message,
      category: f.category,
    }));

    const clusters = await clusterFeedbackThemesWithGemini(items);

    return NextResponse.json({
      success: true,
      clusterCount: clusters.length,
      clusters,
    });
  } catch (error) {
    console.error("[POST /api/ai/cluster Error]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Clustering failed" },
      { status: 500 }
    );
  }
}
