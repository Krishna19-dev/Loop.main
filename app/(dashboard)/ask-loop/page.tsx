"use client";

import { useEffect, useState } from "react";

import ChatHeader from "@/components/ask-loop/ChatHeader";
import ChatSidebar from "@/components/ask-loop/ChatSidebar";
import ChatWindow from "@/components/ask-loop/ChatWindow";

import { chatService } from "@/services/chat.service";
import { suggestedPrompts } from "@/data/chat";
import { ChatMessage, ChatSession } from "@/types/chat";

export default function AskLoopPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedChat, setSelectedChat] = useState<string>("1");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Initial load of sessions
  useEffect(() => {
    const loadedSessions = chatService.getSessions();
    setSessions(loadedSessions);

    const initialId = loadedSessions.length > 0 ? loadedSessions[0].id : "1";
    setSelectedChat(initialId);

    const loadedMessages = chatService.getSessionMessages(initialId);
    setMessages(loadedMessages);
  }, []);

  // When selected session changes, load messages for that specific session!
  function handleSelectSession(sessionId: string) {
    setSelectedChat(sessionId);
    const msgs = chatService.getSessionMessages(sessionId);
    setMessages(msgs);
  }

  async function handleSend(messageText: string) {
    if (!messageText.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: messageText,
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    chatService.saveSessionMessages(selectedChat, updatedMessages);

    setLoading(true);

    try {
      const response = await chatService.sendMessage(messageText);

      const finalMessages = [...updatedMessages, response.reply];
      setMessages(finalMessages);
      chatService.saveSessionMessages(selectedChat, finalMessages);

      // Auto-update session title with concise 2-3 words title if it's a new chat
      const currentSession = sessions.find((s) => s.id === selectedChat);
      if (currentSession && (currentSession.title === "New Conversation" || currentSession.title === "Customer Feedback Summary")) {
        const shortTitle = chatService.generateShortTitle(messageText);
        const updatedSessions = sessions.map((s) =>
          s.id === selectedChat ? { ...s, title: shortTitle, updatedAt: "Just now" } : s
        );
        setSessions(updatedSessions);
        chatService.saveSessions(updatedSessions);
      }
    } finally {
      setLoading(false);
    }
  }

  function handlePromptClick(prompt: string) {
    handleSend(prompt);
  }

  function handleNewChat() {
    const newSession = chatService.createSession();
    const allSessions = chatService.getSessions();
    setSessions(allSessions);
    setSelectedChat(newSession.id);
    const msgs = chatService.getSessionMessages(newSession.id);
    setMessages(msgs);
  }

  function handleRenameChat(sessionId: string, newTitle: string) {
    const updated = chatService.renameSession(sessionId, newTitle);
    setSessions(updated);
  }

  function handleDeleteChat(sessionId: string) {
    const remaining = chatService.deleteSession(sessionId);
    setSessions(remaining);

    if (selectedChat === sessionId) {
      const nextId = remaining.length > 0 ? remaining[0].id : "";
      setSelectedChat(nextId);
      if (nextId) {
        setMessages(chatService.getSessionMessages(nextId));
      } else {
        setMessages([]);
      }
    }
  }

  return (
    <div className="space-y-8">
      <ChatHeader />

      <div className="grid h-[calc(100vh-240px)] grid-cols-12 gap-6">
        <div className="col-span-3">
          <ChatSidebar
            sessions={sessions}
            selectedId={selectedChat}
            onSelect={handleSelectSession}
            onNewChat={handleNewChat}
            onRenameChat={handleRenameChat}
            onDeleteChat={handleDeleteChat}
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