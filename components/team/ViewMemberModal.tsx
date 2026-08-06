"use client";

import { X, User, Mail, Shield, Calendar, Building, CheckCircle, AlertCircle } from "lucide-react";
import { TeamMember } from "@/types/team";
import RoleBadge from "./RoleBadge";

interface ViewMemberModalProps {
  member: TeamMember | null;
  open: boolean;
  onClose: () => void;
  onEdit?: (member: TeamMember) => void;
}

export default function ViewMemberModal({
  member,
  open,
  onClose,
  onEdit,
}: ViewMemberModalProps) {
  if (!open || !member) return null;

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
                <User size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-forest">
                  Team Member Details
                </h2>
                <p className="text-xs text-taupe">ID: #{member.id.slice(0, 8)}</p>
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
            {/* Member Profile Banner */}
            <div className="rounded-2xl border border-loop-border bg-cream/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-forest">{member.name}</h3>
                  <p className="text-xs text-taupe flex items-center gap-1.5 mt-0.5 font-medium">
                    <Mail size={13} />
                    {member.email}
                  </p>
                </div>
                <RoleBadge role={member.role} />
              </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <span className="text-taupe uppercase font-bold text-[10px] tracking-wider block">Workspace</span>
                <span className="font-bold text-forest text-sm flex items-center gap-1.5">
                  <Building size={14} className="text-sage" />
                  {member.workspace}
                </span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <span className="text-taupe uppercase font-bold text-[10px] tracking-wider block">Status</span>
                <span className="font-bold text-sm flex items-center gap-1.5">
                  {member.status === "Active" ? (
                    <span className="flex items-center gap-1 text-emerald-700 font-bold">
                      <CheckCircle size={14} /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600 font-bold">
                      <AlertCircle size={14} /> Inactive
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Additional info */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs space-y-2">
              <div className="flex items-center justify-between text-taupe">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Calendar size={14} /> Joined Date
                </span>
                <span className="font-bold text-forest">{member.joinedAt}</span>
              </div>

              <div className="flex items-center justify-between text-taupe pt-2 border-t border-slate-200">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Shield size={14} /> Role Permissions
                </span>
                <span className="font-bold text-forest">
                  {member.role === "Admin" ? "Full Admin Control" : member.role === "Analyst" ? "Analytical Access" : "Read-Only Viewer"}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-loop-border bg-cream/50 p-4">
            <button
              onClick={onClose}
              className="rounded-xl border border-loop-border px-5 py-2 text-xs font-semibold text-slate-600 hover:bg-cream-dark transition"
            >
              Close
            </button>

            {onEdit && (
              <button
                onClick={() => {
                  onClose();
                  onEdit(member);
                }}
                className="rounded-xl bg-forest px-5 py-2 text-xs font-semibold text-champagne hover:bg-forest-mid transition"
              >
                Edit Member Role
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
