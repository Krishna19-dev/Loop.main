import { NextRequest, NextResponse } from "next/server";
import { feedbackService } from "@/services/feedback.service";
import { retrieveTopKFeedback, generateGroundedAnswerWithGemini } from "@/lib/rag";
import { ChatMessage, SourceCitation } from "@/types/chat";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { message } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Missing or invalid prompt message." },
        { status: 400 }
      );
    }

    // Fetch all workspace feedback items
    const allFeedbacks = await feedbackService.getFeedback();

    // Vector Similarity Search: Retrieve top-4 most relevant feedback records
    const retrievedSources = await retrieveTopKFeedback(message, allFeedbacks, 4);

    const topFeedbackItems = retrievedSources.map((r) => r.feedback);

    // Generate strictly grounded answer using Gemini 2.0 Flash
    let groundedAnswer = "";
    try {
      groundedAnswer = await generateGroundedAnswerWithGemini(message, topFeedbackItems);
    } catch (aiErr) {
      console.warn("[RAG AI Error]", aiErr);
      // Fallback response synthesizer
      groundedAnswer = `Based on our customer database, we found ${topFeedbackItems.length} matching feedback entries for "${message}":\n\n` +
        topFeedbackItems.map((f) => `• ${f.customer} (${f.category}): "${f.message}"`).join("\n");
    }

    // Map source citations for UI display
    const sources: SourceCitation[] = retrievedSources.map((r) => ({
      id: r.feedback.id,
      customer: r.feedback.customer,
      email: r.feedback.email,
      message: r.feedback.message,
      category: r.feedback.category,
      rating: r.feedback.rating,
      date: r.feedback.date,
      similarityScore: Math.round(r.similarityScore * 100), // % match score
    }));

    const assistantReply: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: groundedAnswer,
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sources,
    };

    return NextResponse.json({
      success: true,
      reply: assistantReply,
      sourceCount: sources.length,
    });
  } catch (error) {
    console.error("[POST /api/ai/ask Error]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process RAG query" },
      { status: 500 }
    );
  }
}
