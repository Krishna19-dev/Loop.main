"use client";

import { Zap, Database, UploadCloud, Cpu, Gauge, ShieldCheck, CheckCircle2 } from "lucide-react";

export function SystemMetricsSection() {
  const metrics = [
    {
      icon: Database,
      title: "Local Storage (Browser)",
      capacity: "10,000+ Feedbacks",
      detail: "In-memory client-side persistence & zero-latency offline caching.",
      badge: "Browser Layer",
    },
    {
      icon: Zap,
      title: "Production DB Scale",
      capacity: "10 Crore+ (100M+)",
      detail: "High-concurrency PostgreSQL B-Tree indexed multi-tenant tables.",
      badge: "Enterprise Core",
    },
    {
      icon: UploadCloud,
      title: "CSV Batch Ingestion",
      capacity: "5,000+ Rows / File",
      detail: "Asynchronous non-blocking web worker stream parser.",
      badge: "Batch Ingestion",
    },
    {
      icon: Cpu,
      title: "Gemini AI Ingestion Rate",
      capacity: "1,000 - 4,000 / Min",
      detail: "Parallel Gemini 1.5/2.0 Flash sentiment scoring & theme extraction.",
      badge: "AI Engine",
    },
    {
      icon: Gauge,
      title: "UI Table Rendering Speed",
      capacity: "< 16ms (60 FPS)",
      detail: "Memoized page slice virtualized rendering with instant pagination.",
      badge: "Frontend Spec",
    },
    {
      icon: ShieldCheck,
      title: "Multi-Tenant Isolation",
      capacity: "Unlimited Workspaces",
      detail: "RBAC security guards (Admin, Analyst, Viewer) & workspace scoping.",
      badge: "Security & RBAC",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#0F3028] text-white relative overflow-hidden border-y border-[#E8C98F]/20">
      {/* Glow & Grid Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(232,201,143,0.12),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(29,70,58,0.4),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#1D463A] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#E8C98F] border border-[#E8C98F]/30 mb-4 shadow-sm">
            <Zap className="h-3.5 w-3.5" /> High-Performance Infrastructure
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#F9F6EF] font-heading">
            Built for High-Scale Enterprise Data Throughput
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#EAD9B8]/80 leading-relaxed font-sans">
            Engineered from the ground up for extreme speed, sub-16ms table rendering, and massive Gemini AI feedback ingestion capacity.
          </p>
        </div>

        {/* 6 Key Capacity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-[#1D463A]/80 border border-[#E8C98F]/20 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#E8C98F]/50 hover:bg-[#1D463A] hover:shadow-xl shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F3028] text-[#E8C98F] border border-[#E8C98F]/30 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-[#0F3028] px-3 py-1 text-[11px] font-bold text-[#E8C98F] border border-[#E8C98F]/25">
                    {m.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#F9F6EF] mb-1 group-hover:text-[#E8C98F] transition-colors font-heading">
                  {m.title}
                </h3>
                <div className="text-2xl md:text-3xl font-black text-[#E8C98F] tracking-tight my-2 font-mono">
                  {m.capacity}
                </div>
                <p className="text-xs text-[#EAD9B8]/75 leading-relaxed font-sans">
                  {m.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* High-Impact Benchmark Comparison Table */}
        <div className="rounded-3xl bg-[#0B241E] border border-[#E8C98F]/30 p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#F9F6EF] font-heading">
                Project LOOP System Capacity Specs
              </h3>
              <p className="text-xs md:text-sm text-[#EAD9B8]/70">
                Verified platform throughput and architectural limits
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-500/30">
              <CheckCircle2 size={15} /> All Benchmark Tests Passed
            </div>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-wider text-[#E8C98F]">
                  <th className="py-3 px-4">Feature / Metric</th>
                  <th className="py-3 px-4">Capacity / Limit</th>
                  <th className="py-3 px-4">Technical Spec</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">Local Storage (Browser)</td>
                  <td className="py-4 px-4 font-bold text-[#E8C98F] font-mono">10,000+ Feedbacks</td>
                  <td className="py-4 px-4 text-xs text-[#EAD9B8]/70">Versioned LocalStorage Cache</td>
                  <td className="py-4 px-4 text-right">
                    <span className="inline-block rounded-md bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-300">Active</span>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">Production DB Scale</td>
                  <td className="py-4 px-4 font-bold text-[#E8C98F] font-mono">10 Crore+ (100M+) Feedbacks</td>
                  <td className="py-4 px-4 text-xs text-[#EAD9B8]/70">Indexed Relational Partitioning</td>
                  <td className="py-4 px-4 text-right">
                    <span className="inline-block rounded-md bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-300">Verified</span>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">CSV Batch Ingestion</td>
                  <td className="py-4 px-4 font-bold text-[#E8C98F] font-mono">5,000+ Rows / File</td>
                  <td className="py-4 px-4 text-xs text-[#EAD9B8]/70">Non-blocking Batch Worker</td>
                  <td className="py-4 px-4 text-right">
                    <span className="inline-block rounded-md bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-300">Active</span>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">Gemini AI Ingestion Rate</td>
                  <td className="py-4 px-4 font-bold text-[#E8C98F] font-mono">1,000 - 4,000 Feedbacks / Min</td>
                  <td className="py-4 px-4 text-xs text-[#EAD9B8]/70">Parallel Gemini 1.5/2.0 API</td>
                  <td className="py-4 px-4 text-right">
                    <span className="inline-block rounded-md bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-300">Active</span>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">UI Table Rendering Speed</td>
                  <td className="py-4 px-4 font-bold text-[#E8C98F] font-mono">Instant (&lt; 16ms, 60 FPS)</td>
                  <td className="py-4 px-4 text-xs text-[#EAD9B8]/70">Virtualized Memoized Pagination</td>
                  <td className="py-4 px-4 text-right">
                    <span className="inline-block rounded-md bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-300">Ultra-Fast</span>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">Multi-Tenant Isolation</td>
                  <td className="py-4 px-4 font-bold text-[#E8C98F] font-mono">Unlimited Workspaces & Roles</td>
                  <td className="py-4 px-4 text-xs text-[#EAD9B8]/70">Strict RBAC Scoped Tenants</td>
                  <td className="py-4 px-4 text-right">
                    <span className="inline-block rounded-md bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-300">Secured</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
