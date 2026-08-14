"use client";

import { ShieldAlert, Lock, X, Check } from "lucide-react";

interface AdminOnlyModalProps {
  open: boolean;
  userRole?: string;
  onClose: () => void;
}

export default function AdminOnlyModal({
  open,
  userRole = "User",
  onClose,
}: AdminOnlyModalProps) {
  if (!open) return null;

  // Format role for display nicely (e.g., ANALYST -> Analyst)
  const formattedRole =
    userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase();

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Center Modal Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden border border-loop-border animate-in fade-in zoom-in-95 duration-200">
          
          {/* Top Bar with Close button */}
          <div className="flex items-center justify-between border-b border-loop-border bg-cream px-6 py-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B85C3C]">
              <Lock size={14} className="text-[#B85C3C]" />
              <span>Permission Guard</span>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-1.5 text-slate-400 hover:bg-white hover:text-slate-700 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 text-center space-y-4">
            {/* Warning Shield Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5DDD5] border border-[#B85C3C]/30 text-[#B85C3C] shadow-sm">
              <ShieldAlert size={32} />
            </div>

            {/* Title & Explanation */}
            <div className="space-y-2">
              <h3 className="font-manrope text-xl font-extrabold text-forest">
                Access Restricted to Admins
              </h3>
              <p className="text-xs text-taupe leading-relaxed font-sans px-2">
                Editing workspace configuration, owner settings, and operational status is strictly restricted to <strong className="text-forest">Administrator</strong> accounts.
              </p>
            </div>

            {/* User Role Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-cream border border-loop-border px-3.5 py-1.5 text-xs text-taupe font-medium">
              <span>Your Current Role:</span>
              <span className="font-bold text-forest uppercase tracking-wider text-[11px] bg-white px-2 py-0.5 rounded-md border border-loop-border">
                {formattedRole}
              </span>
            </div>
          </div>

          {/* Footer Action Button */}
          <div className="border-t border-loop-border bg-cream/50 p-4">
            <button
              onClick={onClose}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3 text-xs font-bold text-champagne hover:bg-forest-mid transition shadow-md"
            >
              <Check size={16} />
              <span>Understood</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
