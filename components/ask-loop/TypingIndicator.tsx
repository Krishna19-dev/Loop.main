"use client";

import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex max-w-xl gap-4">
        {/* AI Avatar */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <Bot size={20} />
        </div>

        {/* Typing Bubble */}
        <div className="rounded-2xl border border-loop-border bg-white px-5 py-4 shadow-sm">
          <p className="mb-3 text-sm font-medium text-taupe">
            LOOP AI is thinking...
          </p>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-600 [animation-delay:-0.3s]" />
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-600 [animation-delay:-0.15s]" />
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-600" />
          </div>
        </div>
      </div>
    </div>
  );
}