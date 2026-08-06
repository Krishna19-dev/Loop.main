export type MessageRole = "user" | "assistant";

export interface SourceCitation {
  id: string;
  customer: string;
  email: string;
  message: string;
  category: string;
  rating: number;
  date?: string;
  similarityScore?: number;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  sources?: SourceCitation[];
}

export interface ChatSession {
  id: string;
  title: string;
  updatedAt: string;
}

export interface SendMessageRequest {
  message: string;
}

export interface SendMessageResponse {
  reply: ChatMessage;
}