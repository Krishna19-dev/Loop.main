"use client";

import { useEffect, useState } from "react";
import { X, Building2, User, FileText, CheckCircle2 } from "lucide-react";
import { Workspace, WorkspaceStatus } from "@/types/workspace";

interface EditWorkspaceModalProps {
  workspace: Workspace | null;
  open: boolean;
  onClose: () => void;
  onSave: (id: string, updatedData: Partial<Workspace>) => Promise<void> | void;
}

export default function EditWorkspaceModal({
  workspace,
  open,
  onClose,
  onSave,
}: EditWorkspaceModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [status, setStatus] = useState<WorkspaceStatus>("Active");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (workspace) {
      setName(workspace.name || "");
      setDescription(workspace.description || "");
      setOwner(workspace.owner || "");
      setStatus(workspace.status || "Active");
      setError("");
    }
  }, [workspace]);

  if (!open || !workspace) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Workspace name is required.");
      return;
    }

    setLoading(true);
    try {
      await onSave(workspace!.id, {
        name: name.trim(),
        description: description.trim(),
        owner: owner.trim(),
        status,
      });
      onClose();
    } catch {
      setError("Failed to update workspace.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden border border-loop-border animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-loop-border bg-cream p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-forest p-3 text-champagne">
                <Building2 size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-forest">
                  Edit Workspace
                </h2>
                <p className="text-xs text-taupe">Update settings for #{workspace.name}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-white hover:text-slate-700 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 font-medium">
                {error}
              </div>
            )}

            {/* Workspace Name */}
            <div>
              <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-2">
                Workspace Name
              </label>
              <div className="relative">
                <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-taupe" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Core Product Team"
                  className="w-full rounded-xl border border-loop-border bg-cream/30 py-2.5 pl-10 pr-4 text-sm text-forest placeholder:text-taupe outline-none focus:border-forest focus:ring-2 focus:ring-forest/10 font-medium"
                  required
                />
              </div>
            </div>

            {/* Owner */}
            <div>
              <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-2">
                Owner Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-taupe" />
                <input
                  type="text"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full rounded-xl border border-loop-border bg-cream/30 py-2.5 pl-10 pr-4 text-sm text-forest placeholder:text-taupe outline-none focus:border-forest focus:ring-2 focus:ring-forest/10 font-medium"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-2">
                Description
              </label>
              <div className="relative">
                <FileText size={16} className="absolute left-3.5 top-3 text-taupe" />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Workspace focus area or team scope..."
                  rows={3}
                  className="w-full rounded-xl border border-loop-border bg-cream/30 py-2.5 pl-10 pr-4 text-sm text-forest placeholder:text-taupe outline-none focus:border-forest focus:ring-2 focus:ring-forest/10 font-medium resize-none"
                />
              </div>
            </div>

            {/* Status Select */}
            <div>
              <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-2">
                Workspace Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as WorkspaceStatus)}
                className="w-full rounded-xl border border-loop-border bg-cream/30 px-4 py-2.5 text-sm text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/10 font-medium"
              >
                <option value="Active">Active (Normal Operation)</option>
                <option value="Inactive">Inactive (Paused)</option>
                <option value="Archived">Archived (Read Only)</option>
              </select>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-loop-border mt-6">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-loop-border px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-cream-dark transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-6 py-2.5 text-xs font-bold text-champagne hover:bg-forest-mid transition shadow-md disabled:opacity-50"
              >
                <CheckCircle2 size={14} />
                <span>{loading ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}
