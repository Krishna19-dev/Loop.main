"use client";

import { Sparkles } from "lucide-react";

interface SuggestedPromptsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

export default function SuggestedPrompts({
  prompts,
  onSelect,
}: SuggestedPromptsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles
          size={18}
          className="text-indigo-600"
        />

        <h3 className="text-sm font-semibold uppercase tracking-wide text-taupe">
          Suggested Prompts
        </h3>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSelect(prompt)}
            className="
              rounded-2xl
              border
              border-loop-border
              bg-white
              p-4
              text-left
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-1
              hover:border-indigo-300
              hover:bg-indigo-50
              hover:shadow-md
            "
          >
            <p className="text-sm font-medium text-forest-light">
              {prompt}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}