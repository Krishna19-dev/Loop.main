"use client";

import { useEffect, useState } from "react";

import ChatHeader from "@/components/ask-loop/ChatHeader";
import ChatSidebar from "@/components/ask-loop/ChatSidebar";
import ChatWindow from "@/components/ask-loop/ChatWindow";

import { chatService } from "@/services/chat.service";
import { suggestedPrompts } from "@/data/chat";

import { ChatMessage } from "@/types/chat";

export default function AskLoopPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState("1");

  useEffect(() => {
    async function loadMessages() {
      const data = await chatService.getMessages();
      setMessages(data);
    }

    loadMessages();
  }, []);

  async function handleSend(message: string) {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await chatService.sendMessage(message);

      setMessages((prev) => [
        ...prev,
        response.reply,
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handlePromptClick(prompt: string) {
    handleSend(prompt);
  }

  function handleNewChat() {
    // Later:
    // await chatService.createSession()

    setMessages([]);
    setSelectedChat("");
  }

  return (
    <div className="space-y-8">
      <ChatHeader />

      <div className="grid h-[calc(100vh-240px)] grid-cols-12 gap-6">
        <div className="col-span-3">
          <ChatSidebar
            selectedId={selectedChat}
            onSelect={setSelectedChat}
            onNewChat={handleNewChat}
          />
        </div>

        <div className="col-span-9">
          <ChatWindow
            messages={messages}
            loading={loading}
            prompts={suggestedPrompts}
            onSend={handleSend}
            onPromptClick={handlePromptClick}
          />
        </div>
      </div>
    </div>
  );
}