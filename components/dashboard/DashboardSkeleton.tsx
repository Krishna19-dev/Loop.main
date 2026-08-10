"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Welcome Banner Skeleton */}
      <div
        className="relative overflow-hidden rounded-2xl p-7"
        style={{ background: "#0F3028" }}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <Skeleton className="h-5 w-36 bg-emerald-900/50 rounded-full" />
            <Skeleton className="h-9 w-72 bg-emerald-900/70 rounded-xl" />
            <Skeleton className="h-4 w-96 bg-emerald-900/40 rounded-lg" />
          </div>
          <Skeleton className="h-14 w-14 rounded-2xl bg-emerald-900/60" />
        </div>
        <div className="mt-6 flex flex-wrap gap-8 border-t border-emerald-900/40 pt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-6 w-16 bg-emerald-900/60 rounded-md" />
              <Skeleton className="h-3 w-24 bg-emerald-900/40 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* 4 StatCards Skeleton */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-3 w-24 bg-slate-200 rounded" />
                <Skeleton className="h-8 w-20 bg-slate-300 rounded-lg" />
                <Skeleton className="h-3 w-28 bg-slate-200 rounded" />
              </div>
              <Skeleton className="h-12 w-12 rounded-xl bg-slate-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Grid Skeleton */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-44 bg-slate-200 rounded-lg" />
            <Skeleton className="h-4 w-28 bg-slate-100 rounded" />
          </div>
          <Skeleton className="h-72 w-full bg-slate-100 rounded-xl" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-36 bg-slate-200 rounded-lg" />
            <Skeleton className="h-6 w-24 bg-slate-100 rounded-full" />
          </div>
          <Skeleton className="h-72 w-full bg-slate-100 rounded-xl" />
        </div>
      </div>

      {/* Recent Feedback Table Skeleton */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-4">
          <Skeleton className="h-6 w-40 bg-slate-200 rounded-lg" />
          <Skeleton className="h-8 w-24 bg-slate-200 rounded-xl" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full bg-slate-200" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32 bg-slate-200 rounded" />
                  <Skeleton className="h-3 w-48 bg-slate-100 rounded" />
                </div>
              </div>
              <Skeleton className="h-6 w-20 bg-slate-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
