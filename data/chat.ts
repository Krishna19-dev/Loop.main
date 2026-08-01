import { ChatMessage, ChatSession } from "@/types/chat";

export const chatSessions: ChatSession[] = [
  {
    id: "1",
    title: "Customer Feedback Summary",
    updatedAt: "Today",
  },
  {
    id: "2",
    title: "Negative Reviews",
    updatedAt: "Yesterday",
  },
  {
    id: "3",
    title: "Feature Requests",
    updatedAt: "2 days ago",
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello Huzaif 👋 I'm LOOP AI. Ask me anything about your customer feedback, reports, analytics or trends.",
    createdAt: "09:00 AM",
  },
];

export const suggestedPrompts = [
  "Summarize today's feedback",
  "Show negative reviews",
  "What are customers requesting?",
  "Generate executive summary",
];