"use client";

import { MessageSquare, Plus, Trash2 } from "lucide-react";
import { ChatSession } from "@/types/chat";

interface ChatSidebarProps {
  sessions?: ChatSession[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onNewChat?: () => void;
  onDeleteChat?: (id: string) => void;
}

export default function ChatSidebar({
  sessions = [],
  selectedId,
  onSelect,
  onNewChat,
  onDeleteChat,
}: ChatSidebarProps) {
  return (
    <aside className="flex h-full flex-col rounded-2xl border border-loop-border bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-loop-border p-5">
        <button
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-forest text-champagne border border-forest-light px-4 py-3 font-medium text-white transition hover:bg-forest-light hover:text-white shadow-xs"
        >
          <Plus size={18} />
          <span>New Chat</span>
        </button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-taupe">
          Recent Conversations ({sessions.length})
        </h3>

        <div className="space-y-2">
          {sessions.map((chat) => {
            const active = selectedId === chat.id;

            return (
              <div
                key={chat.id}
                className={`group flex items-center justify-between rounded-xl border transition ${
                  active
                    ? "border-sage bg-sage-bg shadow-xs"
                    : "border-transparent hover:border-loop-border hover:bg-cream"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelect?.(chat.id)}
                  className="flex flex-1 items-center gap-3 p-3.5 text-left overflow-hidden"
                >
                  <MessageSquare
                    size={18}
                    className={active ? "text-forest shrink-0" : "text-sage shrink-0"}
                  />

                  <div className="truncate">
                    <p className={`text-xs font-bold truncate ${active ? "text-forest" : "text-slate-800"}`}>
                      {chat.title}
                    </p>

                    <p className="mt-0.5 text-[10px] text-taupe font-medium">
                      {chat.updatedAt}
                    </p>
                  </div>
                </button>

                {onDeleteChat && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                    title="Delete Chat"
                    className="mr-2.5 rounded-lg p-1.5 text-slate-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}