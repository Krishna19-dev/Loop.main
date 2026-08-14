"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { feedbackService } from "@/services/feedback.service";
import { notificationService } from "@/services/notification.service";
import { User } from "@/types/auth";
import { Feedback } from "@/types/feedback";
import { NotificationItem as StoredNotificationItem } from "@/types/notification";
import {
  LogOut,
  LogIn,
  ChevronDown,
  Bell,
  Search,
  Plus,
  Star,
  X,
  FileText,
  User as UserIcon,
  CheckCheck,
  Sparkles,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import AddFeedbackModal from "@/components/feedback/AddFeedbackModal";

interface NavbarProps {
  user?: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsList, setNotificationsList] = useState<StoredNotificationItem[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);

  const currentUser = user || authService.getCurrentUser();

  // Load and subscribe to real-time notification updates
  useEffect(() => {
    if (!currentUser) return;

    function syncNotifications() {
      const list = notificationService.getNotificationsForUser(currentUser);
      setNotificationsList(list);
    }

    syncNotifications();
    window.addEventListener("loop_notifications_updated", syncNotifications);
    return () => {
      window.removeEventListener("loop_notifications_updated", syncNotifications);
    };
  }, [currentUser]);

  useEffect(() => {
    async function loadData() {
      const list = await feedbackService.getFeedback();
      setFeedbacks(list);
    }
    loadData();
  }, [addModalOpen]);

  const unreadCount = useMemo(
    () => notificationsList.filter((n) => !n.read).length,
    [notificationsList]
  );

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return feedbacks
      .filter(
        (f) =>
          f.customer.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q) ||
          f.message.toLowerCase().includes(q) ||
          f.email.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [searchQuery, feedbacks]);

  const handleLogout = () => {
    authService.logout();
    router.push("/login");
  };

  async function handleAddFeedback(data: Omit<Feedback, "id">) {
    await feedbackService.createFeedback(data);
    setAddModalOpen(false);
    router.refresh();
    window.location.reload();
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/feedback?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
    }
  }

  function handleMarkAllRead() {
    notificationService.markAllAsReadForUser(currentUser);
    setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function handleDeleteNotification(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    notificationService.deleteNotification(id);
    setNotificationsList((prev) => prev.filter((n) => n.id !== id));
  }

  function handleNotificationClick(item: StoredNotificationItem) {
    notificationService.markAsRead(item.id);
    setNotificationsList((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    setNotificationsOpen(false);

    // Route target navigation
    if (item.type === "WELCOME") {
      // Welcome message directly opens Dashboard!
      router.push("/dashboard");
    } else if (item.type === "TEAM_MEMBER_ADDED" || item.type === "ROLE_CHANGED") {
      router.push("/team");
    } else if (item.type === "THEME_SETTINGS_CHANGED") {
      router.push("/analytics");
    } else if (item.type === "ANALYST_ACTIVITY" || item.type === "VIEWER_ACTIVITY") {
      if (item.message.toLowerCase().includes("report")) {
        router.push("/reports");
      } else {
        router.push("/feedback");
      }
    } else {
      router.push("/feedback");
    }
  }

  return (
    <>
      <header
        className="flex h-16 w-full items-center justify-between border-b px-6 relative z-30"
        style={{ background: "#FFFFFF", borderColor: "#E7DDD0" }}
      >
        {/* Search Bar */}
        <div className="relative w-80">
          <form onSubmit={handleSearchSubmit}>
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: "#8A7E72" }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Search feedback, customers, categories..."
              className="w-full rounded-xl border py-2 pl-9 pr-8 text-xs outline-none transition shadow-sm"
              style={{
                background: searchFocused ? "#FFFFFF" : "#F9F6EF",
                borderColor: searchFocused ? "#0F3028" : "#E7DDD0",
                color: "#0F3028",
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </form>

          {/* Real-time Live Search Dropdown */}
          {searchFocused && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 top-full mt-2 w-96 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Search Results ({searchResults.length})
                </span>
                <span className="text-[10px] text-slate-400">Press Enter to view all</span>
              </div>

              {searchResults.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">
                  No matching feedback records found for &quot;{searchQuery}&quot;
                </div>
              ) : (
                <div className="space-y-1">
                  {searchResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        router.push(`/feedback?search=${encodeURIComponent(item.customer)}`);
                        setSearchFocused(false);
                      }}
                      className="flex w-full items-start gap-3 rounded-xl p-2.5 text-left transition hover:bg-slate-50"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-forest text-xs font-bold text-champagne">
                        {item.customer.charAt(0)}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-800 truncate">{item.customer}</p>
                          <span className="text-[10px] font-bold text-amber-600 flex items-center gap-0.5">
                            {item.rating} <Star size={10} className="fill-amber-400 text-amber-400" />
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{item.message}</p>
                        <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium">{item.category}</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Date */}
          <span className="hidden text-xs font-medium md:inline-block" style={{ color: "#8A7E72" }}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>

          {/* Notifications Bell Button & Popover */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setDropdownOpen(false);
              }}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border transition hover:bg-cream"
              style={{ borderColor: "#E7DDD0", color: "#8A7E72" }}
              title="Notifications"
            >
              <Bell className="h-4 w-4 text-forest" />
              {unreadCount > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-xs"
                  style={{ background: "#B85C3C" }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {notificationsOpen && (
              <div className="absolute right-0 z-50 mt-2.5 w-80 md:w-96 rounded-2xl border bg-white p-4 shadow-2xl border-loop-border animate-in fade-in zoom-in-95 duration-150">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-loop-border">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-forest">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F5DDD5] text-[#B85C3C]">
                        {unreadCount} new
                      </span>
                    )}
                  </div>

                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-taupe hover:text-forest transition"
                    >
                      <CheckCheck size={13} className="text-sage" />
                      <span>Mark read</span>
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto py-1">
                  {notificationsList.length === 0 ? (
                    <div className="p-6 text-center text-xs text-taupe">
                      No notifications yet.
                    </div>
                  ) : (
                    notificationsList.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className={`group flex items-start justify-between gap-2 p-3 transition rounded-xl my-1 ${
                            !item.read
                              ? "bg-[#F9F6EF]/80 font-medium"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => handleNotificationClick(item)}
                            className="flex flex-1 items-start gap-3 text-left overflow-hidden"
                          >
                            {/* Icon based on type */}
                            <div className="shrink-0 mt-0.5">
                              {item.type === "ANALYST_ACTIVITY" && (
                                <div className="rounded-lg p-2 bg-[#F3E8D4] text-[#5C4A2A]">
                                  <FileText size={15} />
                                </div>
                              )}
                              {item.type === "VIEWER_ACTIVITY" && (
                                <div className="rounded-lg p-2 bg-slate-100 text-forest">
                                  <UserIcon size={15} />
                                </div>
                              )}
                              {item.type === "TEAM_MEMBER_ADDED" && (
                                <div className="rounded-lg p-2 bg-[#D8EBD9] text-[#6B8F71]">
                                  <UserIcon size={15} />
                                </div>
                              )}
                              {item.type === "ROLE_CHANGED" && (
                                <div className="rounded-lg p-2 bg-[#F5DDD5] text-[#B85C3C]">
                                  <ShieldCheck size={15} />
                                </div>
                              )}
                              {item.type === "THEME_SETTINGS_CHANGED" && (
                                <div className="rounded-lg p-2 bg-amber-100 text-amber-800">
                                  <Sparkles size={15} />
                                </div>
                              )}
                              {item.type === "WELCOME" && (
                                <div className="rounded-lg p-2 bg-[#E8C98F] text-[#0F3028]">
                                  <Sparkles size={15} />
                                </div>
                              )}
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 overflow-hidden">
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-xs font-bold text-forest truncate">
                                  {item.title}
                                </p>
                                <span className="text-[10px] text-taupe shrink-0">
                                  {item.createdAt}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                                {item.message}
                              </p>
                            </div>
                          </button>

                          {/* Action Items: Unread Indicator + Dismiss Cross (X) Button */}
                          <div className="flex items-center gap-1 shrink-0 mt-0.5">
                            {!item.read && (
                              <div className="w-2 h-2 rounded-full bg-[#B85C3C] shrink-0" />
                            )}
                            <button
                              type="button"
                              onClick={(e) => handleDeleteNotification(item.id, e)}
                              title="Dismiss notification"
                              className="rounded-md p-1 text-slate-400 opacity-60 hover:opacity-100 hover:bg-slate-200 hover:text-slate-700 transition"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer Link */}
                <div className="pt-2 border-t border-loop-border text-center">
                  <button
                    onClick={() => {
                      setNotificationsOpen(false);
                      router.push("/feedback");
                    }}
                    className="text-xs font-bold text-forest hover:text-[#5C4A2A] transition"
                  >
                    View Feedback Intelligence Stream →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* + Add Feedback Button */}
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition shadow-sm hover:shadow-md"
            style={{ background: "#E8C98F", color: "#0F3028" }}
          >
            <Plus className="h-3.5 w-3.5" />
            Add Feedback
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2.5 rounded-lg border px-2 py-1.5 transition"
              style={{ borderColor: "#E7DDD0" }}
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-black"
                style={{ background: "#0F3028", color: "#E8C98F" }}
              >
                {currentUser?.name?.charAt(0).toUpperCase() ?? "U"}
              </div>
              <div className="hidden text-left text-xs md:block">
                <p className="font-bold" style={{ color: "#0F3028" }}>
                  {currentUser?.name ?? "User"}
                </p>
                <p className="text-[10px] capitalize" style={{ color: "#8A7E72" }}>
                  {currentUser?.role?.toLowerCase() ?? "viewer"}
                </p>
              </div>
              <ChevronDown className="h-4 w-4" style={{ color: "#8A7E72" }} />
            </button>

            {dropdownOpen && (
              <div
                className="absolute right-0 z-50 mt-2 w-52 rounded-xl border p-2 shadow-lg"
                style={{ background: "#FFFFFF", borderColor: "#E7DDD0" }}
              >
                <div className="border-b px-3 py-2.5 text-xs" style={{ borderColor: "#E7DDD0" }}>
                  <p className="font-bold" style={{ color: "#0F3028" }}>{currentUser?.name}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "#8A7E72" }}>{currentUser?.email}</p>
                </div>

                <button
                  onClick={() => { setDropdownOpen(false); router.push("/login"); }}
                  className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition hover:bg-[#F3E8D4]"
                  style={{ color: "#0F3028" }}
                >
                  <LogIn className="h-4 w-4" />
                  Switch Account
                </button>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition hover:bg-[#F5DDD5]"
                  style={{ color: "#B85C3C" }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Add Feedback Modal */}
      <AddFeedbackModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddFeedback}
      />
    </>
  );
}