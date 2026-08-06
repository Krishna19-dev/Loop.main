import { NextResponse } from "next/server";
import { authService } from "@/services/auth.service";
import { feedbackService } from "@/services/feedback.service";
import { classifyFeedbackWithGemini } from "@/lib/ai";

export async function POST() {
  try {
    const user = authService.getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Role check: Only ADMIN / ANALYST allowed
    if (user.role === "VIEWER") {
      return NextResponse.json(
        { error: "Forbidden: VIEWER role cannot run backfill" },
        { status: 403 }
      );
    }

    const allFeedbacks = await feedbackService.getFeedback();
    const existingThemes = Array.from(new Set(allFeedbacks.map((f) => f.category))).filter(Boolean);

    let processedCount = 0;
    const results = [];

    for (const item of allFeedbacks) {
      // Classify items
      const classification = await classifyFeedbackWithGemini(item.message, existingThemes);
      await feedbackService.updateFeedback(item.id, {
        sentiment: classification.sentiment,
        category: classification.themes[0] || item.category,
      });
      processedCount++;
      results.push({ id: item.id, sentiment: classification.sentiment });
    }

    return NextResponse.json({
      success: true,
      message: `Backfilled ${processedCount} feedback records with AI classification.`,
      processedCount,
      results,
    });
  } catch (error) {
    console.error("[AI Backfill Error]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Backfill failed" },
      { status: 500 }
    );
  }
}
