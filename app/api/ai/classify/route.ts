import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/services/auth.service";
import { feedbackService } from "@/services/feedback.service";
import { classifyFeedbackWithGemini, generateEmbeddingWithGemini } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { feedbackId, content, userRole } = body;

    // Detect user role from session, body, or header
    const serverUser = authService.getCurrentUser();
    const headerRole = req.headers.get("x-user-role");
    const role = serverUser?.role || userRole || headerRole || "ADMIN";

    // Rule 3: VIEWER is read-only. 403 Forbidden for classification writes
    if (role === "VIEWER") {
      return NextResponse.json(
        { error: "Forbidden: VIEWER role cannot perform AI classification (Read-only)." },
        { status: 403 }
      );
    }

    const targetFeedbackId = feedbackId;
    let textToClassify = content;

    if (feedbackId) {
      const existing = await feedbackService.getFeedbackById(feedbackId);
      if (!existing) {
        return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
      }
      textToClassify = existing.message;
    }

    if (!textToClassify) {
      return NextResponse.json({ error: "Missing feedback content to classify" }, { status: 400 });
    }

    // Fetch existing categories/themes in workspace
    const allFeedbacks = await feedbackService.getFeedback();
    const existingThemes = Array.from(new Set(allFeedbacks.map((f) => f.category))).filter(Boolean);

    // Call Gemini with Zod validation
    const classification = await classifyFeedbackWithGemini(textToClassify, existingThemes);

    // Optionally generate embedding
    let embedding: number[] = [];
    try {
      embedding = await generateEmbeddingWithGemini(textToClassify);
    } catch (embErr) {
      console.warn("[Embedding Gen Warning]", embErr);
    }

    // Update feedback record if feedbackId provided
    if (targetFeedbackId) {
      await feedbackService.updateFeedback(targetFeedbackId, {
        sentiment: classification.sentiment,
        sentimentScore: classification.sentimentScore,
        themes: classification.themes,
        featureArea: classification.featureArea,
        category: classification.themes[0] || classification.featureArea || "General",
        rating: classification.sentiment === "Positive" ? 5 : classification.sentiment === "Negative" ? 2 : 3,
        classifiedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      feedbackId: targetFeedbackId,
      classification,
      hasEmbedding: embedding.length > 0,
    });
  } catch (error) {
    console.error("[AI Classify API Error]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Classification failed" },
      { status: 500 }
    );
  }
}
