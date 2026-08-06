import { GoogleGenAI } from "@google/genai";
import { Feedback } from "@/types/feedback";
import { generateEmbeddingWithGemini } from "./ai";

function getApiKey(): string {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || "";
}

/**
 * Computes cosine similarity between two vector arrays
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length === 0 || vecB.length === 0 || vecA.length !== vecB.length) {
    return 0;
  }
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Word overlap / keyword similarity fallback if embeddings are unavailable
 */
function keywordSimilarity(textA: string, textB: string): number {
  const wordsA = new Set(textA.toLowerCase().match(/\w+/g) || []);
  const wordsB = new Set(textB.toLowerCase().match(/\w+/g) || []);
  if (wordsA.size === 0 || wordsB.size === 0) return 0;
  let intersection = 0;
  wordsA.forEach((w) => {
    if (wordsB.has(w)) intersection++;
  });
  return intersection / Math.sqrt(wordsA.size * wordsB.size);
}

export interface RetrievedFeedbackSource {
  feedback: Feedback;
  similarityScore: number;
}

/**
 * Ranks all workspace feedbacks against the user query vector (or query string fallback)
 */
export async function retrieveTopKFeedback(
  query: string,
  feedbacks: Feedback[],
  k: number = 4
): Promise<RetrievedFeedbackSource[]> {
  if (!feedbacks || feedbacks.length === 0) return [];

  let queryVector: number[] = [];
  try {
    queryVector = await generateEmbeddingWithGemini(query);
  } catch (err) {
    console.warn("[RAG] Vector embedding generation unavailable, using keyword similarity fallback.", err);
  }

  const scoredResults: RetrievedFeedbackSource[] = [];

  for (const item of feedbacks) {
    const textToMatch = `${item.customer} ${item.category} ${item.message} ${item.themes?.join(" ") || ""}`;

    let score = 0;
    if (queryVector.length > 0) {
      try {
        const itemVector = await generateEmbeddingWithGemini(textToMatch);
        score = cosineSimilarity(queryVector, itemVector);
      } catch {
        score = keywordSimilarity(query, textToMatch);
      }
    } else {
      score = keywordSimilarity(query, textToMatch);
    }

    scoredResults.push({
      feedback: item,
      similarityScore: Number(score.toFixed(3)),
    });
  }

  // Sort descending by similarity score
  scoredResults.sort((a, b) => b.similarityScore - a.similarityScore);

  return scoredResults.slice(0, k);
}

/**
 * Generate grounded answer strictly limited to retrieved feedback context
 */
export async function generateGroundedAnswerWithGemini(
  query: string,
  sources: Feedback[]
): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const contextText = sources
    .map(
      (s, idx) => `[Source ${idx + 1}]
Customer: ${s.customer} (${s.email})
Category: ${s.category} | Sentiment: ${s.sentiment} | Rating: ${s.rating}/5 | Date: ${s.date}
Message: "${s.message}"`
    )
    .join("\n\n");

  const prompt = `
You are the RAG Customer Intelligence Assistant for Project LOOP.
Your task is to answer the User Question STRICTLY using ONLY the retrieved customer feedback context provided below.

=== CRITICAL GROUNDING RULES ===
1. Base your answer ONLY on the provided feedback sources.
2. DO NOT invent, assume, extrapolate, or fabricate any statements, quotes, stats, or features not present in the context.
3. If the provided context does not contain enough information to answer the question, state: "Based on the retrieved customer feedback records, no specific information was found regarding your question."
4. Directly reference source customer names or categories in your response when attributing quotes or facts.

=== RETRIEVED CUSTOMER FEEDBACK CONTEXT ===
${contextText}

=== USER QUESTION ===
"${query}"

Answer concisely and professionally:
`;

  const client = new GoogleGenAI({ apiKey });
  const response = await client.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text || "Unable to generate grounded answer.";
}
