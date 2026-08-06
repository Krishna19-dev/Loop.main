import { Feedback, ThemeCluster } from "@/types/feedback";

/**
 * Parses date string (e.g. "25 Jul 2026" or ISO) into timestamp
 */
function parseFeedbackDate(dateStr: string): number {
  try {
    const timestamp = Date.parse(dateStr);
    if (!isNaN(timestamp)) return timestamp;
  } catch {
    // ignore
  }
  return 0;
}

/**
 * Groups feedback items by theme tags and categories, computes sentiment breakdown,
 * and calculates period-over-period growth rate to identify trending/spiking themes.
 */
export function computeThemeClusters(feedbacks: Feedback[]): ThemeCluster[] {
  if (!feedbacks || feedbacks.length === 0) return [];

  // Sort feedbacks by timestamp descending
  const sorted = [...feedbacks].sort((a, b) => {
    const tA = parseFeedbackDate(a.date);
    const tB = parseFeedbackDate(b.date);
    return tB - tA;
  });

  const latestTime = parseFeedbackDate(sorted[0]?.date) || Date.now();
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  const recentCutoff = latestTime - SEVEN_DAYS_MS;
  const previousCutoff = latestTime - 2 * SEVEN_DAYS_MS;

  // Map theme string to list of feedbacks
  const themeMap: Record<string, { total: Feedback[]; recent: Feedback[]; previous: Feedback[] }> = {};

  sorted.forEach((item, index) => {
    const time = parseFeedbackDate(item.date);
    const isRecent = time ? time >= recentCutoff : index < Math.ceil(sorted.length / 2);
    const isPrevious = time ? time < recentCutoff && time >= previousCutoff : index >= Math.ceil(sorted.length / 2);

    // Extract all theme tags or category/featureArea
    const themesToAssign = new Set<string>();

    if (item.themes && item.themes.length > 0) {
      item.themes.forEach((t) => themesToAssign.add(t.trim()));
    } else if (item.category) {
      themesToAssign.add(item.category.trim());
    } else if (item.featureArea) {
      themesToAssign.add(item.featureArea.trim());
    } else {
      themesToAssign.add("General");
    }

    themesToAssign.forEach((theme) => {
      if (!themeMap[theme]) {
        themeMap[theme] = { total: [], recent: [], previous: [] };
      }
      themeMap[theme].total.push(item);
      if (isRecent) themeMap[theme].recent.push(item);
      if (isPrevious) themeMap[theme].previous.push(item);
    });
  });

  // Convert map to ThemeCluster array
  const clusters: ThemeCluster[] = Object.entries(themeMap).map(([theme, data]) => {
    const totalCount = data.total.length;
    const recentCount = data.recent.length;
    const previousCount = data.previous.length;

    // Calculate growth percentage (spike rate)
    let growthRate = 0;
    if (previousCount > 0) {
      growthRate = Math.round(((recentCount - previousCount) / previousCount) * 100);
    } else if (recentCount > 0) {
      growthRate = recentCount * 50; // New theme spike heuristic
    }

    // A theme is trending if growth rate > 20% or has high recent velocity
    const isTrending = growthRate >= 20 || (recentCount >= 2 && previousCount <= 1);

    // Sentiment breakdown
    let pos = 0;
    let neu = 0;
    let neg = 0;
    let scoreSum = 0;

    data.total.forEach((f) => {
      if (f.sentiment === "Positive") pos++;
      else if (f.sentiment === "Negative") neg++;
      else neu++;

      scoreSum += f.sentimentScore ?? (f.sentiment === "Positive" ? 0.8 : f.sentiment === "Negative" ? -0.8 : 0);
    });

    const avgScore = Number((scoreSum / totalCount).toFixed(2));

    return {
      theme,
      totalCount,
      recentCount,
      previousCount,
      growthRate,
      isTrending,
      sentimentBreakdown: { positive: pos, neutral: neu, negative: neg },
      avgScore,
      feedbacks: data.total,
    };
  });

  // Sort clusters: Trending first, then by total count descending
  clusters.sort((a, b) => {
    if (a.isTrending && !b.isTrending) return -1;
    if (!a.isTrending && b.isTrending) return 1;
    return b.totalCount - a.totalCount;
  });

  return clusters;
}
