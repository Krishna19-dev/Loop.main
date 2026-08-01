export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
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