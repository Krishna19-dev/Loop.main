"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { feedbackService } from "@/services/feedback.service";
import { User } from "@/types/auth";
import { Feedback } from "@/types/feedback";
import { LogOut, LogIn, ChevronDown, Bell, Search, Plus, Star, X } from "lucide-react";
import AddFeedbackModal from "@/components/feedback/AddFeedbackModal";

interface NavbarProps {
  user?: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);

  const currentUser = user || authService.getCurrentUser();

  useEffect(() => {
    async function loadData() {
      const list = await feedbackService.getFeedback();
      setFeedbacks(list);
    }
    loadData();
  }, [addModalOpen]);

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
    // Refresh page / router to update active components
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
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-800 text-xs font-bold text-white">
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

          {/* Notifications */}
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border transition"
            style={{ borderColor: "#E7DDD0", color: "#8A7E72" }}
          >
            <Bell className="h-4 w-4" />
            <span
              className="absolute right-2 top-2 h-2 w-2 rounded-full"
              style={{ background: "#B85C3C" }}
            />
          </button>

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
              onClick={() => setDropdownOpen(!dropdownOpen)}
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