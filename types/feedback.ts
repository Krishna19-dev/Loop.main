export type FeedbackStatus =
  | "Pending"
  | "Reviewed"
  | "Resolved";

export type FeedbackSentiment =
  | "Positive"
  | "Neutral"
  | "Negative";

export interface Feedback {
  id: string;
  customer: string;
  email: string;
  message: string;
  category: string;
  rating: number;
  sentiment: FeedbackSentiment;
  status: FeedbackStatus;
  priority: "Low" | "Medium" | "High";
  date: string;
  sentimentScore?: number;
  themes?: string[];
  featureArea?: string;
  classifiedAt?: string;
}

export interface ThemeCluster {
  theme: string;
  totalCount: number;
  recentCount: number;
  previousCount: number;
  growthRate: number; // Percentage change e.g. +50%
  isTrending: boolean;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  avgScore: number;
  feedbacks: Feedback[];
}