"use client";

import { useState } from "react";
import { MessageSquare, Plus, Trash2, Pencil, Check, X } from "lucide-react";
import { ChatSession } from "@/types/chat";

interface ChatSidebarProps {
  sessions?: ChatSession[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onNewChat?: () => void;
  onDeleteChat?: (id: string) => void;
  onRenameChat?: (id: string, newTitle: string) => void;
}

export default function ChatSidebar({
  sessions = [],
  selectedId,
  onSelect,
  onNewChat,
  onDeleteChat,
  onRenameChat,
}: ChatSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  function startRename(chat: ChatSession, e: React.MouseEvent) {
    e.stopPropagation();
    setEditingId(chat.id);
    setEditTitle(chat.title);
  }

  function saveRename(id: string, e?: React.MouseEvent | React.FormEvent) {
    if (e) e.stopPropagation();
    if (editTitle.trim() && onRenameChat) {
      onRenameChat(id, editTitle.trim());
    }
    setEditingId(null);
  }

  function cancelRename(e: React.MouseEvent) {
    e.stopPropagation();
    setEditingId(null);
  }

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
            const isEditing = editingId === chat.id;

            return (
              <div
                key={chat.id}
                className={`group flex items-center justify-between rounded-xl border transition ${
                  active
                    ? "border-sage bg-sage-bg shadow-xs"
                    : "border-transparent hover:border-loop-border hover:bg-cream"
                }`}
              >
                {isEditing ? (
                  /* Inline Rename Form */
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveRename(chat.id);
                    }}
                    className="flex flex-1 items-center gap-2 p-2"
                  >
                    <MessageSquare size={16} className="text-forest shrink-0 ml-1" />
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setEditingId(null);
                      }}
                      autoFocus
                      className="w-full rounded-lg border border-sage bg-white px-2 py-1 text-xs text-forest outline-none focus:ring-1 focus:ring-sage font-medium"
                    />
                    <button
                      type="submit"
                      title="Save title"
                      className="rounded-md p-1 text-emerald-700 hover:bg-emerald-100 transition"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={cancelRename}
                      title="Cancel"
                      className="rounded-md p-1 text-slate-500 hover:bg-slate-200 transition"
                    >
                      <X size={14} />
                    </button>
                  </form>
                ) : (
                  /* Standard Session Row */
                  <>
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

                    {/* Action Buttons (Rename & Delete) */}
                    <div className="flex items-center gap-1 mr-2 opacity-0 group-hover:opacity-100 transition">
                      {onRenameChat && (
                        <button
                          type="button"
                          onClick={(e) => startRename(chat, e)}
                          title="Rename Chat"
                          className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white hover:text-forest shadow-xs border border-transparent hover:border-loop-border"
                        >
                          <Pencil size={14} />
                        </button>
                      )}

                      {onDeleteChat && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteChat(chat.id);
                          }}
                          title="Delete Chat"
                          className="rounded-lg p-1.5 text-slate-500 transition hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}