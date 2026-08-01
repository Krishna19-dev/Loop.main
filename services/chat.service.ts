import { chatMessages } from "@/data/chat";
import {
  ChatMessage,
  SendMessageResponse,
} from "@/types/chat";

class ChatService {
  async getMessages(): Promise<ChatMessage[]> {
    return Promise.resolve(chatMessages);
  }

  async sendMessage(
    message?: string
  ): Promise<SendMessageResponse> {
    void message;
    return Promise.resolve({
      reply: {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "This is a placeholder AI response. Later this will come from the OpenAI/Gemini backend.",
        createdAt: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    });
  }
}

export const chatService = new ChatService();