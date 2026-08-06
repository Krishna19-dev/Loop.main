import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";

function getApiKey(): string {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || "";
}

function getAiClient(): GoogleGenAI {
  const apiKey = getApiKey();
  return new GoogleGenAI({ apiKey });
}

// Zod validation schema for feedback classification
export const ClassificationSchema = z.object({
  sentiment: z.enum(["Positive", "Neutral", "Negative"]),
  sentimentScore: z.number().min(-1).max(1),
  themes: z.array(z.string()).default([]),
  featureArea: z.string().default("General"),
  rationale: z.string().default("Auto-classified by Gemini AI"),
});

export type ClassificationResult = z.infer<typeof ClassificationSchema> & {
  needsManualReview?: boolean;
};

/**
 * Classify a customer feedback string using Gemini 2.0 Flash
 * Requests strict JSON, validates with Zod, and retries once on error.
 */
export async function classifyFeedbackWithGemini(
  content: string,
  existingThemes: string[] = []
): Promise<ClassificationResult> {
  const prompt = `
Analyze the following customer feedback and classify it into JSON format.

Customer Feedback:
"${content}"

Available Existing Themes in Workspace:
${existingThemes.length > 0 ? existingThemes.join(", ") : "None (Suggest new themes)"}

Return a STRICT JSON object with these exact keys:
- sentiment: Must be one of "Positive", "Neutral", or "Negative".
- sentimentScore: A decimal number between -1.0 (very negative) and 1.0 (very positive).
- themes: Array of theme names (prefer existing themes if relevant, or suggest concise new ones).
- featureArea: The main functional area mentioned (e.g. "Dashboard", "Support", "Billing", "Performance", "UI/UX").
- rationale: A concise 1-sentence explanation of your classification.
`;

  let attempt = 0;
  while (attempt < 2) {
    attempt++;
    try {
      const apiKey = getApiKey();
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured in environment variables.");
      }

      const client = getAiClient();

      const response = await client.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              sentiment: { type: Type.STRING, enum: ["Positive", "Neutral", "Negative"] },
              sentimentScore: { type: Type.NUMBER },
              themes: { type: Type.ARRAY, items: { type: Type.STRING } },
              featureArea: { type: Type.STRING },
              rationale: { type: Type.STRING },
            },
            required: ["sentiment", "sentimentScore", "themes", "featureArea", "rationale"],
          },
        },
      });

      const text = response.text || "";
      const json = JSON.parse(text);
      const validated = ClassificationSchema.parse(json);
      return validated;
    } catch (err) {
      console.warn(`[Gemini Classification] Attempt ${attempt} failed:`, err);
      if (attempt >= 2) break;
    }
  }

  // Fallback heuristic if API key fails or API is unreachable
  const lower = content.toLowerCase();
  const isNeg = lower.includes("crash") || lower.includes("error") || lower.includes("fail") || lower.includes("unable") || lower.includes("bug") || lower.includes("slow");
  const isPos = lower.includes("great") || lower.includes("excellent") || lower.includes("fast") || lower.includes("useful") || lower.includes("love") || lower.includes("saves");

  const fallbackSentiment = isNeg ? "Negative" : isPos ? "Positive" : "Neutral";
  const fallbackScore = isNeg ? -0.75 : isPos ? 0.85 : 0.0;
  const fallbackCategory = isNeg ? "Bug" : isPos ? "Satisfaction" : "General";

  return {
    sentiment: fallbackSentiment,
    sentimentScore: fallbackScore,
    themes: [fallbackCategory],
    featureArea: fallbackCategory,
    rationale: `Rule-based classification fallback (${fallbackSentiment}).`,
    needsManualReview: false,
  };
}

/**
 * Generate embedding vector using Gemini text-embedding-004
 */
export async function generateEmbeddingWithGemini(text: string): Promise<number[]> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set.");
  }

  const client = getAiClient();
  const response = await client.models.embedContent({
    model: "text-embedding-004",
    contents: text,
  });

  const resObj = response as { embedding?: { values?: number[] }; embeddings?: Array<{ values?: number[] }> };
  const values = resObj.embedding?.values || resObj.embeddings?.[0]?.values;

  if (!values || values.length === 0) {
    throw new Error("Failed to generate embedding vector from Gemini API.");
  }

  return values;
}

/**
 * Generate Voice of Customer narrative summary from pre-computed stats
 */
export async function generateVoCNarrative(statsJson: Record<string, unknown>): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set.");
  }

  const prompt = `
You are an executive product intelligence analyst for Project LOOP.
Below are pre-computed real customer feedback metrics and quotes:

${JSON.stringify(statsJson, null, 2)}

Instructions:
Write a professional executive summary around these EXACT metrics.
- DO NOT invent or alter any numbers, percentages, or quote counts.
- Synthesize key themes, main customer pain points, and positive highlights.
- Structure with clear headings: Executive Summary, Key Theme Analysis, Risk Areas, and Actionable Recommendations.
`;

  const client = getAiClient();
  const response = await client.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text || "Report narrative generation unavailable.";
}

/**
 * Cluster customer feedback messages into high-level named themes using Gemini
 */
export async function clusterFeedbackThemesWithGemini(
  items: { id: string; message: string; category?: string }[]
): Promise<Array<{ theme: string; description: string; feedbackIds: string[] }>> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set.");
  }

  const prompt = `
Analyze the following list of customer feedback messages and cluster them into distinct, concise named themes.

Feedback items:
${JSON.stringify(items, null, 2)}

Return a STRICT JSON array of objects, where each object has:
- theme: Short name for the theme (e.g., "CSV Ingestion", "Dashboard Performance", "Dark Mode Request", "Password Reset")
- description: Concise 1-sentence description of what customers are saying in this theme
- feedbackIds: Array of matching feedback item IDs that belong to this theme
`;

  const client = getAiClient();
  const response = await client.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            theme: { type: Type.STRING },
            description: { type: Type.STRING },
            feedbackIds: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["theme", "description", "feedbackIds"],
        },
      },
    },
  });

  const text = response.text || "[]";
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("[Cluster Gemini JSON parse error]", err);
    return [];
  }
}

