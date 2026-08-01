"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeedbackPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function FeedbackPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: FeedbackPaginationProps) {
  const start =
    totalItems === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const end = Math.min(
    currentPage * pageSize,
    totalItems
  );

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-loop-border bg-white p-5 shadow-sm sm:flex-row">
      <p className="text-sm text-taupe">
        Showing{" "}
        <span className="font-semibold">
          {start}–{end}
        </span>{" "}
        of{" "}
        <span className="font-semibold">
          {totalItems}
        </span>{" "}
        feedback records
      </p>

      <div className="flex items-center gap-2">

        <button
          onClick={() =>
            onPageChange(Math.max(currentPage - 1, 1))
          }
          disabled={currentPage === 1}
          className="rounded-lg border border-loop-border p-2 hover:bg-cream-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} />
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={
                  currentPage === page
                    ? "rounded-lg bg-forest text-champagne border border-forest-light px-4 py-2 text-white"
                    : "rounded-lg border border-loop-border px-4 py-2 hover:bg-cream-dark"
                }
              >
                {page}
              </button>
            );
          }
        )}

        <button
          onClick={() =>
            onPageChange(
              Math.min(currentPage + 1, totalPages)
            )
          }
          disabled={currentPage === totalPages}
          className="rounded-lg border border-loop-border p-2 hover:bg-cream-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={18} />
        </button>

      </div>
    </div>
  );
}