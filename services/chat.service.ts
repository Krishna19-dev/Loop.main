import { ChatMessage, ChatSession, SendMessageResponse } from "@/types/chat";

const DEFAULT_SESSIONS: ChatSession[] = [
  {
    id: "1",
    title: "Customer Feedback Summary",
    updatedAt: "Today",
  },
  {
    id: "2",
    title: "Negative Reviews Analysis",
    updatedAt: "Yesterday",
  },
  {
    id: "3",
    title: "Feature Requests",
    updatedAt: "2 days ago",
  },
];

const DEFAULT_MESSAGES: Record<string, ChatMessage[]> = {
  "1": [],
  "2": [
    {
      id: "m2-1",
      role: "user",
      content: "Show negative reviews",
      createdAt: "02:15 PM",
    },
    {
      id: "m2-2",
      role: "assistant",
      content: "Based on our customer database, we found 3 critical negative feedback entries requiring attention:\n\n• Emma Wilson (Bug): \"Application crashes while uploading large CSV files.\"\n• Olivia Taylor (Authentication): \"Unable to reset my password using mobile browser.\"\n• William Johnson (Bug): \"Real-time push notifications are failing intermittently.\"",
      createdAt: "02:15 PM",
      sources: [
        {
          id: "2",
          customer: "Emma Wilson",
          email: "emma@example.com",
          message: "Application crashes while uploading large CSV files.",
          category: "Bug",
          rating: 2,
          similarityScore: 94,
        },
        {
          id: "5",
          customer: "Olivia Taylor",
          email: "olivia@example.com",
          message: "Unable to reset my password using mobile browser.",
          category: "Authentication",
          rating: 2,
          similarityScore: 88,
        },
        {
          id: "8",
          customer: "William Johnson",
          email: "william@example.com",
          message: "Real-time push notifications are failing intermittently.",
          category: "Bug",
          rating: 1,
          similarityScore: 85,
        },
      ],
    },
  ],
  "3": [
    {
      id: "m3-1",
      role: "user",
      content: "What feature requests are customers asking for?",
      createdAt: "11:30 AM",
    },
    {
      id: "m3-2",
      role: "assistant",
      content: "Based on customer feedback analysis, top requested features include:\n\n1. Dark Mode & Custom Themes (Sophia Davis)\n2. Direct Excel & CSV table exports (Ava Martinez)\n3. Automated weekly email summaries (Chloe Bennett)",
      createdAt: "11:30 AM",
      sources: [
        {
          id: "3",
          customer: "Sophia Davis",
          email: "sophia@example.com",
          message: "Please add dark mode support and custom themes.",
          category: "Feature",
          rating: 4,
          similarityScore: 96,
        },
        {
          id: "7",
          customer: "Ava Martinez",
          email: "ava@example.com",
          message: "Need direct export to Excel and CSV option in tables.",
          category: "Feature",
          rating: 4,
          similarityScore: 91,
        },
        {
          id: "15",
          customer: "Chloe Bennett",
          email: "chloe@startup.io",
          message: "Would love automated email summaries sent weekly.",
          category: "Feature",
          rating: 4,
          similarityScore: 87,
        },
      ],
    },
  ],
};

class ChatService {
  private sessionsKey = "loop_chat_sessions_v2";
  private messagesKey = "loop_chat_messages_v2";

  getSessions(): ChatSession[] {
    if (typeof window === "undefined") return DEFAULT_SESSIONS;
    const stored = localStorage.getItem(this.sessionsKey);
    if (!stored) {
      localStorage.setItem(this.sessionsKey, JSON.stringify(DEFAULT_SESSIONS));
      return DEFAULT_SESSIONS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_SESSIONS;
    }
  }

  saveSessions(sessions: ChatSession[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.sessionsKey, JSON.stringify(sessions));
    }
  }

  getSessionMessages(sessionId: string): ChatMessage[] {
    if (typeof window === "undefined") return DEFAULT_MESSAGES[sessionId] || [];
    const stored = localStorage.getItem(this.messagesKey);
    if (!stored) {
      localStorage.setItem(this.messagesKey, JSON.stringify(DEFAULT_MESSAGES));
      return DEFAULT_MESSAGES[sessionId] || [];
    }
    try {
      const allMsgMap: Record<string, ChatMessage[]> = JSON.parse(stored);
      return allMsgMap[sessionId] || DEFAULT_MESSAGES[sessionId] || [];
    } catch {
      return DEFAULT_MESSAGES[sessionId] || [];
    }
  }

  saveSessionMessages(sessionId: string, messages: ChatMessage[]): void {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(this.messagesKey);
    let allMsgMap: Record<string, ChatMessage[]> = {};
    if (stored) {
      try {
        allMsgMap = JSON.parse(stored);
      } catch {
        allMsgMap = { ...DEFAULT_MESSAGES };
      }
    } else {
      allMsgMap = { ...DEFAULT_MESSAGES };
    }
    allMsgMap[sessionId] = messages;
    localStorage.setItem(this.messagesKey, JSON.stringify(allMsgMap));
  }

  createSession(title?: string): ChatSession {
    const sessions = this.getSessions();
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: title || "New Conversation",
      updatedAt: "Just now",
    };
    const updatedSessions = [newSession, ...sessions];
    this.saveSessions(updatedSessions);

    // Empty initial messages so prompt suggestions empty state is displayed!
    this.saveSessionMessages(newSession.id, []);

    return newSession;
  }

  renameSession(sessionId: string, newTitle: string): ChatSession[] {
    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) return this.getSessions();
    const sessions = this.getSessions().map((s) =>
      s.id === sessionId ? { ...s, title: trimmedTitle } : s
    );
    this.saveSessions(sessions);
    return sessions;
  }

  deleteSession(sessionId: string): ChatSession[] {
    const sessions = this.getSessions().filter((s) => s.id !== sessionId);
    this.saveSessions(sessions);
    return sessions;
  }

  generateShortTitle(message: string): string {
    if (!message || !message.trim()) return "New Chat";

    const stopWords = new Set([
      "what", "is", "are", "the", "a", "an", "about", "how", "to", "can", "you",
      "show", "me", "give", "list", "get", "find", "for", "in", "on", "of", "with",
      "at", "by", "from", "up", "into", "over", "after", "please", "would",
      "like", "tell", "which", "why", "who", "where", "our", "my", "your", "this", "that"
    ]);

    const words = message
      .replace(/[^\w\s]/gi, "")
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);

    const keyWords = words.filter((w) => !stopWords.has(w.toLowerCase()));
    const selectedWords = keyWords.length >= 2 ? keyWords : words;
    const maxWords = selectedWords.slice(0, 3);
    
    const capitalized = maxWords.map(
      (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    );

    return capitalized.join(" ") || "Feedback Query";
  }

  async sendMessage(message: string): Promise<SendMessageResponse> {
    if (!message || !message.trim()) {
      throw new Error("Message text is required.");
    }

    try {
      const response = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch response from Ask LOOP RAG AI.");
      }

      return {
        reply: data.reply,
      };
    } catch (err) {
      console.error("[ChatService Error]", err);
      return {
        reply: {
          id: crypto.randomUUID(),
          role: "assistant",
          content: err instanceof Error ? `Error: ${err.message}` : "An unexpected error occurred while querying Ask LOOP.",
          createdAt: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      };
    }
  }
}

export const chatService = new ChatService();