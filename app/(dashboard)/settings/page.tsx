"use client";

import { useState } from "react";
import { authService } from "@/services/auth.service";
import { User } from "@/types/auth";

export default function SettingsPage() {
  const [currentUser] = useState<User | null>(() => authService.getCurrentUser());

  // Profile Form States
  const [name, setName] = useState(() => currentUser?.name || "");
  const [email, setEmail] = useState(() => currentUser?.email || "");

  // Workspace Form States
  const [workspaceName, setWorkspaceName] = useState("Customer Support Workspace");
  const [allowGuestInvites, setAllowGuestInvites] = useState(false);

  const [message, setMessage] = useState("");

  if (!currentUser) {
    return <div className="p-8 text-center text-taupe">Loading settings...</div>;
  }

  const isAdmin = currentUser.role === "ADMIN";

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Profile details updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  }

  function handleSaveWorkspace(e: React.FormEvent) {
    e.preventDefault();
    if (!isAdmin) return;
    setMessage("Workspace settings updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-forest">Account Settings</h1>
        <p className="text-sm text-taupe">
          Manage your account profile, workspace details, and role permissions.
        </p>
      </div>

      {message && (
        <div className="rounded-xl border border-emerald-200 bg-sage-bg p-4 text-sm font-medium text-emerald-800">
          {message}
        </div>
      )}

      {/* SECTION 1: Personal Profile (All Roles) */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-forest">My Profile</h2>
        <p className="text-xs text-taupe">Your personal details in this workspace.</p>

        <form onSubmit={handleSaveProfile} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-forest-light">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border p-3 text-sm outline-none focus:border-sage"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-forest-light">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border p-3 text-sm outline-none focus:border-sage"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-forest-light">Role assigned</label>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-block rounded-full bg-sage-bg px-3 py-1 text-xs font-bold uppercase text-sage">
                {currentUser.role}
              </span>
              <span className="text-xs text-taupe">
                (Role permissions are controlled by the Workspace Admin)
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="rounded-xl bg-forest text-champagne border border-forest-light px-5 py-2.5 text-sm font-medium text-white transition hover:bg-forest-light hover:text-white"
          >
            Save Profile
          </button>
        </form>
      </div>

      {/* SECTION 2: Workspace Management (Admin Only) */}
      <div className={`rounded-2xl border bg-white p-6 shadow-sm ${!isAdmin ? "opacity-75" : ""}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-forest">Workspace Configuration</h2>
            <p className="text-xs text-taupe">Manage tenant organization name and security rules.</p>
          </div>
          {!isAdmin && (
            <span className="rounded-md bg-champagne-deep px-2.5 py-1 text-xs font-semibold text-champagne-text">
              Admin Access Only
            </span>
          )}
        </div>

        <form onSubmit={handleSaveWorkspace} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-forest-light">Workspace Name</label>
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              disabled={!isAdmin}
              className="mt-1 w-full rounded-lg border p-3 text-sm outline-none disabled:bg-cream-dark disabled:text-taupe"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="guestInvites"
              checked={allowGuestInvites}
              onChange={(e) => setAllowGuestInvites(e.target.checked)}
              disabled={!isAdmin}
              className="h-4 w-4 rounded border-loop-border text-sage focus:ring-emerald-500"
            />
            <label htmlFor="guestInvites" className="text-xs font-medium text-forest-light">
              Allow Analysts to send direct email invites
            </label>
          </div>

          {isAdmin && (
            <button
              type="submit"
              className="rounded-xl bg-forest text-champagne border border-forest-light px-5 py-2.5 text-sm font-medium text-white transition hover:bg-forest-light hover:text-white"
            >
              Update Workspace Settings
            </button>
          )}
        </form>
      </div>
    </div>
  );
}