"use client";

import { CalendarDays } from "lucide-react";

export default function DateRangePicker() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-loop-border bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-forest">
          Date Range
        </h2>

        <p className="text-sm text-taupe">
          Select a period to analyze customer feedback.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative">
          <CalendarDays
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe"
          />

          <input
            type="date"
            className="rounded-xl border border-loop-border bg-white py-3 pl-10 pr-4 outline-none transition focus:border-blue-500"
          />
        </div>

        <span className="text-taupe">to</span>

        <div className="relative">
          <CalendarDays
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe"
          />

          <input
            type="date"
            className="rounded-xl border border-loop-border bg-white py-3 pl-10 pr-4 outline-none transition focus:border-blue-500"
          />
        </div>

        <button className="rounded-xl bg-forest text-champagne border border-forest-light px-5 py-3 font-medium text-white transition hover:bg-forest-light hover:text-white">
          Apply
        </button>
      </div>
    </div>
  );
}