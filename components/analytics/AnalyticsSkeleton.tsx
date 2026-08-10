"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Role & Header Banner Skeleton */}
      <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm border border-slate-200">
        <div className="space-y-1">
          <Skeleton className="h-4 w-20 bg-blue-100 rounded" />
          <Skeleton className="h-6 w-64 bg-slate-200 rounded-md" />
        </div>
        <Skeleton className="h-8 w-32 bg-slate-100 rounded-full" />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48 bg-slate-300 rounded-xl" />
          <Skeleton className="h-5 w-80 bg-slate-200 rounded-lg" />
        </div>
        <Skeleton className="h-12 w-44 bg-emerald-800/20 rounded-xl" />
      </div>

      {/* 4 StatCards Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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

      {/* Main Trend & Sentiment Charts Skeleton */}
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

      {/* Category & Rating Bar Charts Skeleton */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <Skeleton className="h-6 w-40 bg-slate-200 rounded-lg" />
          <Skeleton className="h-64 w-full bg-slate-100 rounded-xl" />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <Skeleton className="h-6 w-40 bg-slate-200 rounded-lg" />
          <Skeleton className="h-64 w-full bg-slate-100 rounded-xl" />
        </div>
      </div>

      {/* Theme Clusters Skeleton */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-56 bg-slate-200 rounded-lg" />
          <Skeleton className="h-9 w-44 bg-slate-100 rounded-xl" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-24 w-full bg-slate-100 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
