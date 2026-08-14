"use client";

import { useMemo, useState } from "react";
import { authService } from "@/services/auth.service";
import { notificationService } from "@/services/notification.service";
import { User, Role } from "@/types/auth";
import {
  Users,
  ShieldCheck,
  BarChart3,
  Eye,
  Search,
  UserPlus,
  Trash2,
  Mail,
  ChevronLeft,
  ChevronRight,
  X,
  Lock,
} from "lucide-react";

// ─── Role Badge ────────────────────────────────────────────────────────────────
function RoleBadge({ role }: { role: string }) {
  const map: Record<string, string> = {
    ADMIN: "bg-emerald-600 text-white",
    Admin: "bg-emerald-600 text-white",
    ANALYST: "bg-amber-100 text-amber-700",
    Analyst: "bg-amber-100 text-amber-700",
    VIEWER: "bg-violet-100 text-violet-700",
    Viewer: "bg-violet-100 text-violet-700",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${map[role] ?? "bg-slate-100 text-slate-600"
        }`}
    >
      {role.toLowerCase()}
    </span>
  );
}

// ─── Stat Card ──────────────────────────────────────────────────────────────────
function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[#FBF6EC] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h2 className="mt-3 text-4xl font-bold text-slate-900">{value}</h2>
        </div>
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl text-white ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

// ─── Add User Modal ─────────────────────────────────────────────────────────────
interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }) => void;
}

function AddUserModal({ open, onClose, onAdd }: AddUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("VIEWER");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    try {
      onAdd({ name, email, password, role });
      setName("");
      setEmail("");
      setPassword("");
      setRole("VIEWER");
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create user.");
      }
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-[#FBF6EC] p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Add New User</h2>
            <p className="text-sm text-slate-500">Create a new system account</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
              className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800/10"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@company.com"
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800/10"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800/10"
                required
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800/10 bg-[#FBF6EC]"
            >
              <option value="ADMIN">Admin</option>
              <option value="ANALYST">Analyst</option>
              <option value="VIEWER">Viewer</option>
            </select>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-green-800 py-3 text-sm font-semibold text-white shadow-md hover:bg-green-900 transition"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Users Page ─────────────────────────────────────────────────────────────────
const PAGE_SIZE = 8;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(() => authService.getAllUsers());
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Stats
  const totalUsers = users.length;
  const admins = users.filter((u) =>
    ["ADMIN", "Admin"].includes(u.role)
  ).length;
  const analysts = users.filter((u) =>
    ["ANALYST", "Analyst"].includes(u.role)
  ).length;
  const viewers = users.filter((u) =>
    ["VIEWER", "Viewer"].includes(u.role)
  ).length;

  // Filtered
  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      const matchRole =
        !roleFilter ||
        u.role.toUpperCase() === roleFilter.toUpperCase();

      const matchStatus =
        !statusFilter || (u.status ?? "Active") === statusFilter;

      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Handlers
  function handleAdd(data: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }) {
    const newUser = authService.createUser(
      data.name,
      data.email,
      data.password,
      data.role
    );
    setUsers((prev) => [newUser, ...prev]);

    // Trigger Notifications for Admin, Analyst, and New User
    const currentUser = authService.getCurrentUser();
    const workspaceId = currentUser?.workspaceId || "ws_demo";
    const displayRole = data.role.charAt(0).toUpperCase() + data.role.slice(1).toLowerCase();

    // 1. Notify Analyst role
    notificationService.notifyRole(
      workspaceId,
      "ANALYST",
      "TEAM_MEMBER_ADDED",
      "New team member added",
      `${newUser.name} joined as ${displayRole}`
    );

    // 2. Notify Admin confirmation
    notificationService.notifyRole(
      workspaceId,
      "ADMIN",
      "TEAM_MEMBER_ADDED",
      "User created successfully",
      `Created ${newUser.name} as ${displayRole}`
    );

    // 3. Separately notify the new user with a welcome message
    notificationService.notifyUser(
      workspaceId,
      newUser.id,
      "WELCOME",
      "Welcome to LOOP!",
      "Your account is ready — explore feedback, themes, and dashboard insights."
    );
  }

  function handleDelete(user: User) {
    authService.deleteUser(user.id);
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  }

  return (
    <>
      <div className="space-y-8">
        {/* ── Page Header ── */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900">
              User Management
            </h1>
            <p className="mt-3 text-lg text-slate-500">
              View and manage all user accounts across the platform.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-green-800 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-900 hover:shadow-xl"
          >
            <UserPlus size={20} />
            Add User
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Users"
            value={totalUsers}
            icon={<Users size={24} />}
            color="bg-green-800"
          />
          <StatCard
            title="Admins"
            value={admins}
            icon={<ShieldCheck size={24} />}
            color="bg-emerald-600"
          />
          <StatCard
            title="Analysts"
            value={analysts}
            icon={<BarChart3 size={24} />}
            color="bg-amber-500"
          />
          <StatCard
            title="Viewers"
            value={viewers}
            icon={<Eye size={24} />}
            color="bg-violet-600"
          />
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-[#FBF6EC] p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-green-800 focus:bg-[#FBF6EC] transition"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Role filter */}
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-slate-200 bg-[#FBF6EC] px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-green-800"
            >
              <option value="">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="ANALYST">Analyst</option>
              <option value="VIEWER">Viewer</option>
            </select>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-slate-200 bg-[#FBF6EC] px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-green-800"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* Add User (secondary CTA) */}
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-green-800 px-4 py-2.5 text-sm font-medium text-green-800 transition hover:bg-green-50"
            >
              <UserPlus size={16} />
              Add User
            </button>
          </div>
        </div>

        {/* ── Table ── */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-[#FBF6EC] p-16 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <Users className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">
              No users found
            </h3>
            <p className="mt-2 text-slate-500">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#FBF6EC] shadow-sm">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm font-semibold text-slate-600">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Password</th>
                  <th className="px-6 py-4">Workspace ID</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginated.map((user) => {
                  const initials = user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2);

                  const statusVal = user.status ?? "Active";

                  return (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >
                      {/* User */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-800 text-sm font-bold text-white">
                            {initials}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">
                              {user.name}
                            </p>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                              <Mail size={12} />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-5">
                        <RoleBadge role={user.role} />
                      </td>

                      {/* Password */}
                      <td className="px-6 py-5">
                        <code className="rounded-md bg-amber-50 border border-amber-200/60 px-2 py-1 text-xs font-mono font-bold text-amber-900">
                          {user.password || "password123"}
                        </code>
                      </td>

                      {/* Workspace */}
                      <td className="px-6 py-5">
                        <code className="rounded-md bg-slate-100 px-2 py-1 text-xs font-mono text-slate-600">
                          {user.workspaceId ?? "—"}
                        </code>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span
                          className={
                            statusVal === "Active"
                              ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
                              : "rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                          }
                        >
                          {statusVal}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleDelete(user)}
                            className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                            title="Remove User"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Pagination ── */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-[#FBF6EC] px-6 py-4 shadow-sm">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {(currentPage - 1) * PAGE_SIZE + 1}–
                {Math.min(currentPage * PAGE_SIZE, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-700">
                {filtered.length}
              </span>{" "}
              users
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium transition ${page === currentPage
                        ? "bg-green-800 text-white shadow-md shadow-green-800/30"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Add User Modal ── */}
      <AddUserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
      />
    </>
  );
}