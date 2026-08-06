import { NextRequest, NextResponse } from "next/server";
import { feedbackService } from "@/services/feedback.service";
import { authService } from "@/services/auth.service";

export async function GET() {
  try {
    const feedbackList = await feedbackService.getFeedback();
    return NextResponse.json({ success: true, count: feedbackList.length, data: feedbackList });
  } catch (error) {
    console.error("[GET /api/feedback Error]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = authService.getCurrentUser();
    const headerRole = req.headers.get("x-user-role");
    const role = user?.role || headerRole || "ADMIN";

    if (role === "VIEWER") {
      return NextResponse.json(
        { error: "Forbidden: VIEWER role cannot create feedback." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { customer, email, message, category, rating, sentiment, priority } = body;

    if (!customer || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: customer, email, message" },
        { status: 400 }
      );
    }

    const dateStr = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // createFeedback automatically calls classifyFeedbackWithGemini under the hood!
    const newFeedback = await feedbackService.createFeedback(
      {
        customer,
        email,
        message,
        category: category || "General",
        rating: rating || 3,
        sentiment: sentiment || "Neutral",
        status: "Pending",
        priority: priority || "Medium",
        date: dateStr,
      },
      true // autoClassify = true
    );

    return NextResponse.json(
      {
        success: true,
        message: "Feedback created and auto-classified with Gemini AI.",
        data: newFeedback,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/feedback Error]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create feedback" },
      { status: 500 }
    );
  }
}
