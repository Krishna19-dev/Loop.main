"use client";

import { X, Building2, User, Users, FolderGit2, Calendar, CheckCircle2, Archive, Edit } from "lucide-react";
import { Workspace } from "@/types/workspace";
import WorkspaceStatusBadge from "./WorkspaceStatusBadge";

interface ViewWorkspaceModalProps {
  workspace: Workspace | null;
  open: boolean;
  onClose: () => void;
  onEdit?: (workspace: Workspace) => void;
}

export default function ViewWorkspaceModal({
  workspace,
  open,
  onClose,
  onEdit,
}: ViewWorkspaceModalProps) {
  if (!open || !workspace) return null;

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
                  Workspace Details
                </h2>
                <p className="text-xs text-taupe">ID: #{workspace.id.slice(0, 8)}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-white hover:text-slate-700 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            {/* Workspace Profile Banner */}
            <div className="rounded-2xl border border-loop-border bg-cream/30 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-forest">{workspace.name}</h3>
                  <p className="text-xs text-taupe mt-1 font-medium leading-relaxed">
                    {workspace.description || "No description provided."}
                  </p>
                </div>
                <WorkspaceStatusBadge status={workspace.status} />
              </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <span className="text-taupe uppercase font-bold text-[10px] tracking-wider block">Owner</span>
                <span className="font-bold text-forest text-sm flex items-center gap-1.5 truncate">
                  <User size={14} className="text-sage" />
                  {workspace.owner}
                </span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <span className="text-taupe uppercase font-bold text-[10px] tracking-wider block">Created Date</span>
                <span className="font-bold text-forest text-sm flex items-center gap-1.5">
                  <Calendar size={14} className="text-taupe" />
                  {workspace.createdAt}
                </span>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 flex items-center gap-3">
                <div className="rounded-xl bg-forest/10 p-2.5 text-forest">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-taupe">Active Members</p>
                  <p className="text-lg font-bold text-forest">{workspace.members} Users</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 flex items-center gap-3">
                <div className="rounded-xl bg-forest/10 p-2.5 text-forest">
                  <FolderGit2 size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-taupe">Linked Projects</p>
                  <p className="text-lg font-bold text-forest">{workspace.projects} Projects</p>
                </div>
              </div>
            </div>

            {/* Status Information */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs">
              <div className="flex items-center justify-between text-taupe">
                <span className="flex items-center gap-1.5 font-semibold">
                  {workspace.status === "Active" ? (
                    <CheckCircle2 size={14} className="text-emerald-600" />
                  ) : (
                    <Archive size={14} className="text-amber-600" />
                  )}
                  Workspace Operational State
                </span>
                <span className="font-bold text-forest">
                  {workspace.status === "Active" ? "Active Ingestion & Analysis" : "Archived (Read Only)"}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-loop-border bg-cream/50 p-4">
            <button
              onClick={onClose}
              className="rounded-xl border border-loop-border px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-cream-dark transition"
            >
              Close
            </button>

            {onEdit && (
              <button
                onClick={() => {
                  onClose();
                  onEdit(workspace);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-5 py-2.5 text-xs font-semibold text-champagne hover:bg-forest-mid transition shadow-xs"
              >
                <Edit size={14} />
                <span>Edit Workspace</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
