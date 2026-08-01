"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { Feedback } from "@/types/feedback";

interface RecentFeedbackTableProps {
  feedbacks: Feedback[];
  onView?: (feedback: Feedback) => void;
  onEdit?: (feedback: Feedback) => void;
  onDelete?: (feedback: Feedback) => void;
  onViewAll?: () => void;
}

export default function RecentFeedbackTable({
  feedbacks = [],
  onView,
  onEdit,
  onDelete,
  onViewAll,
}: RecentFeedbackTableProps) {
  const recent = feedbacks.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Recent Feedback
        </h2>

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
          >
            View All
          </button>
        )}
      </div>

      {recent.length === 0 ? (
        <div className="p-8 text-center text-slate-500">
          No feedback entries found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="pb-3">Customer</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3">Sentiment</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {recent.map((item) => (
                <tr
                  key={item.id}
                  className="border-b text-sm hover:bg-slate-50 transition"
                >
                  <td className="py-4">
                    <div>
                      <p className="font-semibold text-slate-800">{item.customer}</p>
                      <p className="text-xs text-slate-400">{item.email}</p>
                    </div>
                  </td>

                  <td className="text-slate-600">{item.category}</td>

                  <td className="font-bold text-amber-600">{item.rating} ★</td>

                  <td>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.sentiment === "Positive"
                          ? "bg-green-100 text-green-700"
                          : item.sentiment === "Negative"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.sentiment}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Resolved"
                          ? "bg-blue-100 text-blue-700"
                          : item.status === "Pending"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="text-xs text-slate-500">{item.date}</td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onView?.(item)}
                        className="rounded-lg p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => onEdit?.(item)}
                        className="rounded-lg p-1.5 text-slate-500 hover:bg-green-50 hover:text-green-600 transition"
                        title="Edit Feedback"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete?.(item)}
                        className="rounded-lg p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600 transition"
                        title="Delete Feedback"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}