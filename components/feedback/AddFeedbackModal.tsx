"use client";

import { useState } from "react";
import { X, MessageSquarePlus, Star } from "lucide-react";
import { Feedback, FeedbackSentiment, FeedbackStatus } from "@/types/feedback";

interface AddFeedbackModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (feedback: Omit<Feedback, "id">) => void;
}

export default function AddFeedbackModal({
  open,
  onClose,
  onAdd,
}: AddFeedbackModalProps) {
  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("Product");
  const [rating, setRating] = useState<number>(5);
  const [sentiment, setSentiment] = useState<FeedbackSentiment>("Positive");
  const [status, setStatus] = useState<FeedbackStatus>("Pending");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [error, setError] = useState("");

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!customer.trim() || !email.trim() || !message.trim()) {
      setError("Customer name, email, and message are required.");
      return;
    }

    const dateStr = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    onAdd({
      customer: customer.trim(),
      email: email.trim(),
      message: message.trim(),
      category,
      rating,
      sentiment,
      status,
      priority,
      date: dateStr,
    });

    // Reset
    setCustomer("");
    setEmail("");
    setMessage("");
    setCategory("Product");
    setRating(5);
    setSentiment("Positive");
    setStatus("Pending");
    setPriority("Medium");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-xl rounded-3xl border border-loop-border bg-white p-6 md:p-8 shadow-2xl transition-all my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-loop-border pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest text-champagne">
              <MessageSquarePlus size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-forest">Add Feedback Entry</h2>
              <p className="text-xs text-taupe">Manually ingest a new customer feedback record</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-cream hover:text-slate-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Customer & Email */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-forest mb-1">
                Customer Name *
              </label>
              <input
                type="text"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="e.g. Alex Johnson"
                className="w-full rounded-xl border border-loop-border bg-cream/50 p-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest mb-1">
                Customer Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full rounded-xl border border-loop-border bg-cream/50 p-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
                required
              />
            </div>
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-forest mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-loop-border bg-cream/50 p-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
              >
                <option value="Product">Product</option>
                <option value="Support">Support</option>
                <option value="Bug">Bug</option>
                <option value="Feature">Feature</option>
                <option value="Performance">Performance</option>
                <option value="Authentication">Authentication</option>
                <option value="Reports">Reports</option>
                <option value="Billing">Billing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as "Low" | "Medium" | "High")}
                className="w-full rounded-xl border border-loop-border bg-cream/50 p-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Rating, Sentiment & Status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-forest mb-1">
                Rating (1-5)
              </label>
              <div className="flex items-center gap-1 rounded-xl border border-loop-border bg-cream/50 p-2.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition"
                  >
                    <Star
                      size={18}
                      className={
                        star <= rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest mb-1">
                Sentiment
              </label>
              <select
                value={sentiment}
                onChange={(e) => setSentiment(e.target.value as FeedbackSentiment)}
                className="w-full rounded-xl border border-loop-border bg-cream/50 p-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
              >
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as FeedbackStatus)}
                className="w-full rounded-xl border border-loop-border bg-cream/50 p-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
              >
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-forest mb-1">
              Feedback Message *
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the feedback details received from the customer..."
              className="w-full rounded-xl border border-loop-border bg-cream/50 p-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-loop-border py-3 text-sm font-medium text-slate-600 hover:bg-cream transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-forest py-3 text-sm font-semibold text-champagne hover:bg-forest-mid hover:text-white transition shadow-md"
            >
              Save Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
