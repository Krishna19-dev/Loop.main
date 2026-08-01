"use client";

import { Bot, Sparkles } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-loop-border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-forest to-forest-light text-white shadow-lg">
          <Bot size={28} />
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-forest">
            Ask LOOP
          </h1>

          <p className="mt-1 text-taupe">
            AI-powered assistant for customer feedback, analytics, and reports.
          </p>
        </div>
      </div>

      <div className="hidden items-center gap-2 rounded-xl bg-sage-bg px-4 py-2 lg:flex">
        <Sparkles
          size={18}
          className="text-sage"
        />

        <span className="font-medium text-sage">
          AI Assistant
        </span>
      </div>
    </div>
  );
}