"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { Role } from "@/types/auth";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  BarChart3,
  Bot,
  FileText,
  Users,
  Settings,
  LogOut,
  TrendingUp,
} from "lucide-react";

interface SidebarProps {
  role?: Role;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const userRole = role?.toUpperCase() as Role | undefined;

  const adminNavItems: NavItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Workspace", href: "/workspace", icon: Building2 },
    { name: "Feedback", href: "/feedback", icon: MessageSquare },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Ask LOOP", href: "/ask-loop", icon: Bot },
    { name: "Reports", href: "/reports", icon: FileText },
    { name: "Team", href: "/team", icon: Users },
    { name: "Users", href: "/users", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const analystNavItems: NavItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Workspace", href: "/workspace", icon: Building2 },
    { name: "Feedback", href: "/feedback", icon: MessageSquare },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Trends", href: "/analytics", icon: TrendingUp },
    { name: "Reports", href: "/reports", icon: FileText },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const viewerNavItems: NavItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Workspace", href: "/workspace", icon: Building2 },
    { name: "Reports", href: "/reports", icon: FileText },
    { name: "Ask LOOP", href: "/ask-loop", icon: Bot },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  let navItems = adminNavItems;
  if (userRole === "ANALYST") navItems = analystNavItems;
  else if (userRole === "VIEWER") navItems = viewerNavItems;

  function handleLogout() {
    authService.logout();
    router.push("/login");
  }

  const currentUser = authService.getCurrentUser();

  return (
    <aside
      className="flex h-screen w-64 flex-col justify-between"
      style={{ background: "#0F3028" }}
    >
      <div>
        {/* ── Brand Header ─────────────────────── */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          {/* LOOP Logo Mark */}
          <div className="relative h-9 w-9 flex-shrink-0">
            {/* Interlocking squares motif */}
            <div
              className="absolute top-0 left-0 h-5 w-5 rounded-sm"
              style={{ background: "#E8C98F" }}
            />
            <div
              className="absolute bottom-0 right-0 h-5 w-5 rounded-sm"
              style={{ background: "#EAD9B8" }}
            />
            <div
              className="absolute top-1.5 left-1.5 h-5 w-5 rounded-sm border-2"
              style={{ borderColor: "#0F3028", background: "#E8C98F", opacity: 0.85 }}
            />
          </div>
          <span
            className="text-xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-manrope)", color: "#E8C98F" }}
          >
            LOOP
          </span>
        </div>

        {/* ── Workspace Chip ───────────────────── */}
        <div className="px-5 pt-4 pb-2">
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold"
            style={{ background: "#1D463A", color: "#EAD9B8" }}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span className="truncate">
              {currentUser?.name?.split(" ")[0]}&apos;s Workspace
            </span>
          </div>
        </div>

        {/* ── Navigation ──────────────────────── */}
        <nav className="mt-3 space-y-0.5 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all"
                style={
                  isActive
                    ? {
                      background: "#E8C98F",
                      color: "#0F3028",
                      fontWeight: 700,
                    }
                    : {
                      color: "rgba(249,246,239,0.65)",
                    }
                }
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#1D463A";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#F9F6EF";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(249,246,239,0.65)";
                  }
                }}
              >
                <Icon
                  className="h-4 w-4 flex-shrink-0"
                  style={isActive ? { color: "#0F3028" } : { color: "rgba(249,246,239,0.5)" }}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── User Footer ─────────────────────── */}
      <div className="border-t border-white/10 p-4 space-y-3">
        {/* User Info */}
        <div className="flex items-center gap-3 px-1">
          <div
            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-black ${currentUser?.role?.toUpperCase() === "ADMIN"
                ? "bg-[#1D463A] text-[#EAD9B8]"
                : currentUser?.role?.toUpperCase() === "ANALYST"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-violet-100 text-violet-800"
              }`}
          >
            {currentUser?.name?.charAt(0).toUpperCase() ?? "U"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold" style={{ color: "#F9F6EF" }}>
              {currentUser?.name ?? "User"}
            </p>
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${currentUser?.role?.toUpperCase() === "ADMIN"
                  ? "bg-[#1D463A] text-[#EAD9B8]"
                  : currentUser?.role?.toUpperCase() === "ANALYST"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-violet-100 text-violet-700"
                }`}
            >
              {currentUser?.role?.toLowerCase() ?? "viewer"}
            </span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all"
          style={{ color: "rgba(249,246,239,0.5)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(184,92,60,0.15)";
            (e.currentTarget as HTMLButtonElement).style.color = "#F5DDD5";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(249,246,239,0.5)";
          }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}