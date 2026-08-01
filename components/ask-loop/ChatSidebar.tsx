"use client";

import { MessageSquare, Plus, Trash2 } from "lucide-react";
import { chatSessions } from "@/data/chat";

interface ChatSidebarProps {
  selectedId?: string;
  onSelect?: (id: string) => void;
  onNewChat?: () => void;
}

export default function ChatSidebar({
  selectedId,
  onSelect,
  onNewChat,
}: ChatSidebarProps) {
  return (
    <aside className="flex h-full flex-col rounded-2xl border border-loop-border bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-loop-border p-5">
        <button
          onClick={onNewChat}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-forest text-champagne border border-forest-light
            px-4
            py-3
            font-medium
            text-white
            transition
            hover:bg-forest-light hover:text-white
          "
        >
          <Plus size={18} />

          New Chat
        </button>
      </div>

      {/* Conversations */}

      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-taupe">
          Recent Conversations
        </h3>

        <div className="space-y-2">
          {chatSessions.map((chat) => {
            const active = selectedId === chat.id;

            return (
              <div
                key={chat.id}
                className={`
                  group
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  transition
                  ${
                    active
                      ? "border-sage bg-sage-bg"
                      : "border-transparent hover:border-loop-border hover:bg-cream"
                  }
                `}
              >
                <button
                  onClick={() => onSelect?.(chat.id)}
                  className="flex flex-1 items-center gap-3 p-4 text-left"
                >
                  <MessageSquare
                    size={18}
                    className="text-sage"
                  />

                  <div>
                    <p className="font-medium text-forest">
                      {chat.title}
                    </p>

                    <p className="mt-1 text-xs text-taupe">
                      {chat.updatedAt}
                    </p>
                  </div>
                </button>

                <button
                  className="
                    mr-3
                    rounded-lg
                    p-2
                    text-taupe
                    opacity-0
                    transition
                    hover:bg-terra-bg
                    hover:text-terra
                    group-hover:opacity-100
                  "
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}