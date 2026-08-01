"use client";

import { Inbox } from "lucide-react";

export default function EmptyFeedback() {
  return (
    <div className="rounded-2xl border border-dashed border-loop-border bg-white p-16 shadow-sm">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100">
          <Inbox
            size={40}
            className="text-blue-600"
          />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-forest">
          No Feedback Found
        </h2>

        <p className="mt-3 text-lg leading-7 text-taupe">
          No customer feedback matches your current search
          or filter selection.
        </p>
      </div>
    </div>
  );
}