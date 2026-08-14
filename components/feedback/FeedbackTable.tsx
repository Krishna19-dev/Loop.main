"use client";

import { Feedback, FeedbackStatus } from "@/types/feedback";
import FeedbackRow from "./FeedbackRow";

interface FeedbackTableProps {
  feedback: Feedback[];
  onView: (feedback: Feedback) => void;
  onStatusChange: (id: string, status: FeedbackStatus) => void;
  onDelete: (id: string) => void;
  isViewer?: boolean;
}

export default function FeedbackTable({
  feedback,
  onView,
  onStatusChange,
  onDelete,
  isViewer = false,
}: FeedbackTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-loop-border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-cream border-b border-loop-border text-xs uppercase tracking-wider font-semibold text-forest">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-center">Rating</th>
              <th className="px-6 py-4">Sentiment</th>
              <th className="px-6 py-4">{isViewer ? "Status" : "Status Control"}</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-loop-border">
            {feedback.map((item) => (
              <FeedbackRow
                key={item.id}
                feedback={item}
                onView={onView}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
                isViewer={isViewer}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}