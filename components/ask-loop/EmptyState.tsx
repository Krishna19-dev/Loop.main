"use client";

import { Bot, Sparkles } from "lucide-react";

interface EmptyStateProps {
  prompts: string[];
  onPromptClick?: (prompt: string) => void;
}

export default function EmptyState({
  prompts,
  onPromptClick,
}: EmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      {/* AI Icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-forest to-forest-light text-white shadow-lg">
        <Bot size={40} />
      </div>

      {/* Heading */}
      <h2 className="mt-6 text-3xl font-bold text-forest">
        Welcome to LOOP AI
      </h2>

      {/* Description */}
      <p className="mt-3 max-w-2xl text-lg leading-8 text-taupe">
        Ask questions about customer feedback, analytics,
        reports, sentiment, or feature requests.
      </p>

      {/* Suggested Prompt Heading */}
      <div className="mt-10 flex items-center gap-2">
        <Sparkles
          size={18}
          className="text-sage"
        />

        <span className="font-semibold text-sage">
          Try asking
        </span>
      </div>

      {/* Prompt Cards */}
      <div className="mt-6 grid w-full max-w-3xl gap-4 md:grid-cols-2">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onPromptClick?.(prompt)}
            className="
              rounded-2xl
              border
              border-loop-border
              bg-white
              p-5
              text-left
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-emerald-300
              hover:bg-sage-bg
              hover:shadow-md
            "
          >
            <p className="font-medium text-forest-light">
              {prompt}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}