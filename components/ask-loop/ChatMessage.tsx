"use client";

import { useState } from "react";
import { Bot, User, Database, ChevronDown, ChevronUp, Star, ShieldCheck } from "lucide-react";
import { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const isAssistant = message.role === "assistant";
  const hasSources = isAssistant && message.sources && message.sources.length > 0;

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
          {isAssistant ? <Bot size={20} /> : <User size={20} />}
        </div>

        {/* Message Container */}
        <div
          className={`rounded-2xl px-5 py-4 shadow-sm space-y-3 ${
            isAssistant
              ? "bg-white border border-loop-border"
              : "bg-forest text-champagne border border-forest-light text-white"
          }`}
        >
          {/* Grounding Badge */}
          {hasSources && (
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg w-fit">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>100% Grounded Answer (Verified RAG Context)</span>
            </div>
          )}

          {/* Text Content */}
          <p
            className={`leading-7 whitespace-pre-wrap ${
              isAssistant ? "text-slate-800" : "text-white"
            }`}
          >
            {message.content}
          </p>

          {/* Sources Citation Accordion */}
          {hasSources && (
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSourcesOpen((prev) => !prev)}
                className="flex items-center justify-between w-full rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-xs font-bold text-forest hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-2">
                  <Database size={14} className="text-sage" />
                  <span>
                    Retrieved Feedback Sources ({message.sources?.length} items used)
                  </span>
                </div>
                {sourcesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {sourcesOpen && (
                <div className="mt-3 space-y-2.5">
                  {message.sources?.map((src, idx) => (
                    <div
                      key={src.id || idx}
                      className="rounded-xl border border-slate-200 bg-white p-3 text-xs shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-forest">
                          {idx + 1}. {src.customer} ({src.category})
                        </span>
                        <div className="flex items-center gap-2">
                          {src.similarityScore !== undefined && (
                            <span className="rounded-md bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[10px] font-mono font-bold text-emerald-700">
                              Match: {src.similarityScore}%
                            </span>
                          )}
                          <span className="flex items-center text-[10px] font-bold text-amber-600">
                            <Star size={10} className="fill-amber-400 stroke-amber-500 mr-0.5" />
                            {src.rating}/5
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-700 italic bg-cream/30 p-2 rounded-lg border border-slate-100">
                        &ldquo;{src.message}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Timestamp */}
          <div
            className={`text-xs ${
              isAssistant ? "text-taupe" : "text-emerald-100"
            }`}
          >
            {message.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
}