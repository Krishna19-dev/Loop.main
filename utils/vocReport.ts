import { Feedback } from "@/types/feedback";
import { VoCStats, VoCQuote } from "@/types/report";

function parseDate(dateStr: string): number {
  try {
    const t = Date.parse(dateStr);
    if (!isNaN(t)) return t;
  } catch {
    // fallback
  }
  return 0;
}

/**
 * Pre-computes exact statistics, sentiment shifts, top themes, and real customer quotes
 * directly from live customer feedback records.
 */
export function computeVoCStats(feedbacks: Feedback[]): VoCStats {
  if (!feedbacks || feedbacks.length === 0) {
    return {
      totalCount: 0,
      positiveCount: 0,
      neutralCount: 0,
      negativeCount: 0,
      positiveRate: 0,
      neutralRate: 0,
      negativeRate: 0,
      avgRating: 0,
      sentimentShift: "No historical data available",
      topThemes: [],
      realQuotes: [],
      recommendedActions: ["Ingest customer feedback records to analyze sentiment trends."],
    };
  }

  const totalCount = feedbacks.length;
  let positiveCount = 0;
  let neutralCount = 0;
  let negativeCount = 0;
  let ratingSum = 0;

  feedbacks.forEach((f) => {
    ratingSum += f.rating;
    if (f.sentiment === "Positive") positiveCount++;
    else if (f.sentiment === "Negative") negativeCount++;
    else neutralCount++;
  });

  const positiveRate = Math.round((positiveCount / totalCount) * 100);
  const neutralRate = Math.round((neutralCount / totalCount) * 100);
  const negativeRate = Math.round((negativeCount / totalCount) * 100);
  const avgRating = Number((ratingSum / totalCount).toFixed(1));

  // Sort feedbacks chronologically to compute sentiment shift
  const sorted = [...feedbacks].sort((a, b) => parseDate(b.date) - parseDate(a.date));
  const halfIndex = Math.ceil(sorted.length / 2);
  const recent = sorted.slice(0, halfIndex);
  const previous = sorted.slice(halfIndex);

  const recentPosRate = recent.length > 0
    ? Math.round((recent.filter((f) => f.sentiment === "Positive").length / recent.length) * 100)
    : positiveRate;

  const prevPosRate = previous.length > 0
    ? Math.round((previous.filter((f) => f.sentiment === "Positive").length / previous.length) * 100)
    : positiveRate;

  const shiftDiff = recentPosRate - prevPosRate;
  const sentimentShift = shiftDiff >= 0
    ? `+${shiftDiff}% positive sentiment shift vs prior period`
    : `${shiftDiff}% negative sentiment shift vs prior period`;

  // Aggregate top themes
  const themeMap: Record<string, { count: number; pos: number; neg: number }> = {};
  feedbacks.forEach((f) => {
    const list = f.themes && f.themes.length > 0 ? f.themes : [f.category || "General"];
    list.forEach((t) => {
      const theme = t.trim();
      if (!themeMap[theme]) themeMap[theme] = { count: 0, pos: 0, neg: 0 };
      themeMap[theme].count++;
      if (f.sentiment === "Positive") themeMap[theme].pos++;
      if (f.sentiment === "Negative") themeMap[theme].neg++;
    });
  });

  const topThemes = Object.entries(themeMap)
    .map(([theme, val]) => ({
      theme,
      count: val.count,
      sentiment: val.pos >= val.neg ? "Positive" : "Negative",
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Extract representative real quotes
  const posQuote = feedbacks.find((f) => f.sentiment === "Positive");
  const negQuote = feedbacks.find((f) => f.sentiment === "Negative");
  const neuQuote = feedbacks.find((f) => f.sentiment === "Neutral" || f.category === "Feature");

  const realQuotes: VoCQuote[] = [];
  if (posQuote) {
    realQuotes.push({
      customer: posQuote.customer,
      email: posQuote.email,
      message: posQuote.message,
      sentiment: posQuote.sentiment,
      category: posQuote.category,
      rating: posQuote.rating,
    });
  }
  if (negQuote) {
    realQuotes.push({
      customer: negQuote.customer,
      email: negQuote.email,
      message: negQuote.message,
      sentiment: negQuote.sentiment,
      category: negQuote.category,
      rating: negQuote.rating,
    });
  }
  if (neuQuote && neuQuote.id !== posQuote?.id && neuQuote.id !== negQuote?.id) {
    realQuotes.push({
      customer: neuQuote.customer,
      email: neuQuote.email,
      message: neuQuote.message,
      sentiment: neuQuote.sentiment,
      category: neuQuote.category,
      rating: neuQuote.rating,
    });
  }

  // Derive recommended actions from top negative themes
  const negThemes = topThemes.filter((t) => t.sentiment === "Negative").map((t) => t.theme);
  const recommendedActions: string[] = [];

  if (negThemes.length > 0) {
    recommendedActions.push(`Prioritize engineering fix for high-friction area: ${negThemes.join(", ")}.`);
  } else {
    recommendedActions.push("Maintain high customer satisfaction rates across key modules.");
  }
  recommendedActions.push("Streamline customer onboarding and automated feedback follow-up workflows.");
  recommendedActions.push("Conduct targeted follow-ups with negative feedback respondents to improve retention.");

  return {
    totalCount,
    positiveCount,
    neutralCount,
    negativeCount,
    positiveRate,
    neutralRate,
    negativeRate,
    avgRating,
    sentimentShift,
    topThemes,
    realQuotes,
    recommendedActions,
  };
}
