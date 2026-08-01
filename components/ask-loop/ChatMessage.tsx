"use client";

import { Bot, User } from "lucide-react";
import { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({
  message,
}: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`flex w-full ${
        isAssistant ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`flex max-w-3xl gap-4 ${
          isAssistant ? "" : "flex-row-reverse"
        }`}
      >
        {/* Avatar */}

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            isAssistant
              ? "bg-gradient-to-r from-forest to-forest-light text-white"
              : "bg-forest text-champagne text-white"
          }`}
        >
          {isAssistant ? (
            <Bot size={20} />
          ) : (
            <User size={20} />
          )}
        </div>

        {/* Message */}

        <div
          className={`rounded-2xl px-5 py-4 shadow-sm ${
            isAssistant
              ? "bg-white border border-loop-border"
              : "bg-forest text-champagne border border-forest-light text-white"
          }`}
        >
          <p
            className={`leading-7 whitespace-pre-wrap ${
              isAssistant
                ? "text-forest-light"
                : "text-white"
            }`}
          >
            {message.content}
          </p>

          <div
            className={`mt-3 text-xs ${
              isAssistant
                ? "text-taupe"
                : "text-emerald-100"
            }`}
          >
            {message.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
}