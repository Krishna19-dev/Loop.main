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
}