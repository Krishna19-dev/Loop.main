"use client";

import { useEffect, useRef } from "react";

import EmptyState from "./EmptyState";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

import { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatWindowProps {
  messages: ChatMessageType[];
  loading: boolean;
  prompts: string[];
  onSend: (message: string) => void;
  onPromptClick: (prompt: string) => void;
}

export default function ChatWindow({
  messages,
  loading,
  prompts,
  onSend,
  onPromptClick,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-loop-border bg-white shadow-sm">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <EmptyState 
          prompts={prompts}
          onPromptClick={onPromptClick} />
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
              />
            ))}

            {loading && <TypingIndicator />}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-loop-border p-5">
        <ChatInput
          onSend={onSend}
          loading={loading}
        />
      </div>
    </div>
  );
}