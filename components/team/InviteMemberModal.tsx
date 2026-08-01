"use client";

import { useState } from "react";

interface InviteMemberModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: {
    name: string;
    email: string;
    password?: string;
    workspace: string;
    role: "Admin" | "Analyst" | "Viewer";
  }) => void;
}

export default function InviteMemberModal({
  open,
  onClose,
  onCreate,
}: InviteMemberModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password123"); // Default temporary password
  const [workspace, setWorkspace] = useState("Customer Support");
  const [role, setRole] = useState<"Analyst" | "Viewer">("Analyst");
  const [error, setError] = useState("");

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    onCreate({
      name,
      email,
      password,
      workspace,
      role,
    });

    // Reset form and close modal
    setName("");
    setEmail("");
    setPassword("password123");
    setError("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-bg text-sage">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-forest">Invite Member</h2>
              <p className="text-xs text-taupe">
                Add a new team member to your workspace.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-taupe hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-forest-light">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Sarah Wilson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border p-3 text-sm outline-none focus:border-sage"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-forest-light">
              Email Address
            </label>
            <input
              type="email"
              placeholder="e.g. sarah@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border p-3 text-sm outline-none focus:border-sage"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-forest-light">
              Temporary Password
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border p-3 text-sm outline-none focus:border-sage"
              required
            />
            <p className="mt-1 text-[10px] text-taupe">
              Member will use this password to sign in at /login.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-forest-light">
              Workspace
            </label>
            <input
              type="text"
              value={workspace}
              onChange={(e) => setWorkspace(e.target.value)}
              className="mt-1 w-full rounded-lg border p-3 text-sm outline-none focus:border-sage"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-forest-light">
              Role
            </label>
            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "Analyst" | "Viewer")
              }
              className="mt-1 w-full rounded-lg border p-3 text-sm outline-none focus:border-sage"
            >
              <option value="Analyst">Analyst (Ingest & Triage Feedback)</option>
              <option value="Viewer">Viewer (Read-Only Access)</option>
            </select>
          </div>

          {error && <p className="text-xs text-terra font-medium">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-loop-border px-4 py-2.5 text-sm font-medium text-forest-light hover:bg-cream"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-forest text-champagne border border-forest-light px-4 py-2.5 text-sm font-medium text-white hover:bg-forest-light hover:text-white"
            >
              Invite Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}