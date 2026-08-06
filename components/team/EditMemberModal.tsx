"use client";

import { useState, useEffect } from "react";
import { X, Edit, Shield, Building, User } from "lucide-react";
import { TeamMember, TeamRole } from "@/types/team";

interface EditMemberModalProps {
  member: TeamMember | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (id: string, updatedData: Partial<TeamMember>) => void;
}

export default function EditMemberModal({
  member,
  open,
  onClose,
  onUpdate,
}: EditMemberModalProps) {
  const [role, setRole] = useState<TeamRole>("Viewer");
  const [workspace, setWorkspace] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  useEffect(() => {
    if (member) {
      setRole(member.role);
      setWorkspace(member.workspace);
      setStatus(member.status);
    }
  }, [member]);

  if (!open || !member) return null;

  function handleSubmit() {
    if (!member) return;
    onUpdate(member.id, {
      role,
      workspace,
      status,
    });
    onClose();
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
              <div className="rounded-2xl bg-amber-500 p-3 text-white">
                <Edit size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-forest">
                  Edit Member Access
                </h2>
                <p className="text-xs text-taupe">{member.email}</p>
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
            {/* Member Info */}
            <div className="rounded-2xl border border-loop-border bg-cream/30 p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-taupe block">Member Name</span>
              <span className="text-base font-bold text-forest">{member.name}</span>
            </div>

            {/* Role Select */}
            <div>
              <label className="mb-2 block font-semibold text-xs text-forest uppercase tracking-wider">
                Role Permissions
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as TeamRole)}
                className="w-full rounded-xl border border-loop-border bg-white px-4 py-3 text-xs font-semibold text-forest outline-none focus:border-sage focus:ring-2 focus:ring-sage-bg"
              >
                <option value="Admin">🟢 Admin — Full Administrative Control</option>
                <option value="Analyst">🔵 Analyst — Analytical & Report Creation Access</option>
                <option value="Viewer">⚪ Viewer — Read-Only Access (403 on edit)</option>
              </select>
            </div>

            {/* Workspace Input */}
            <div>
              <label className="mb-2 block font-semibold text-xs text-forest uppercase tracking-wider">
                Assigned Workspace
              </label>
              <input
                type="text"
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value)}
                className="w-full rounded-xl border border-loop-border bg-white px-4 py-3 text-xs font-semibold text-forest outline-none focus:border-sage focus:ring-2 focus:ring-sage-bg"
              />
            </div>

            {/* Status Select */}
            <div>
              <label className="mb-2 block font-semibold text-xs text-forest uppercase tracking-wider">
                Account Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
                className="w-full rounded-xl border border-loop-border bg-white px-4 py-3 text-xs font-semibold text-forest outline-none focus:border-sage focus:ring-2 focus:ring-sage-bg"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-loop-border bg-cream/50 p-4">
            <button
              onClick={onClose}
              className="rounded-xl border border-loop-border px-5 py-2 text-xs font-semibold text-slate-600 hover:bg-cream-dark transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="rounded-xl bg-forest px-6 py-2.5 text-xs font-semibold text-champagne hover:bg-forest-mid transition shadow-sm"
            >
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
