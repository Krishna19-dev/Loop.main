"use client";

import { useState, KeyboardEvent } from "react";
import { SendHorizonal } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  loading?: boolean;
}

export default function ChatInput({
  onSend,
  loading = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSend() {
    const text = message.trim();

    if (!text || loading) return;

    onSend(text);
    setMessage("");
  }

  function handleKeyDown(
    e: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="rounded-2xl border border-loop-border bg-white p-4 shadow-sm">
      <div className="flex items-end gap-3">
        <textarea
          rows={1}
          value={message}
          disabled={loading}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask LOOP anything about your customer feedback..."
          className="
            min-h-[56px]
            max-h-40
            flex-1
            resize-none
            rounded-xl
            border
            border-loop-border
            bg-cream
            px-4
            py-3
            outline-none
            transition
            focus:border-sage
            focus:ring-2
            focus:ring-sage-bg
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />

        <button
          onClick={handleSend}
          disabled={loading || !message.trim()}
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-xl
            bg-forest text-champagne border border-forest-light
            text-white
            transition
            hover:bg-forest-light hover:text-white
            disabled:cursor-not-allowed
            disabled:bg-slate-300
          "
        >
          <SendHorizonal size={22} />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-taupe">
        <span>Press Enter to send • Shift + Enter for a new line</span>

        {loading && (
          <span className="font-medium text-sage">
            AI is generating a response...
          </span>
        )}
      </div>
    </div>
  );
}