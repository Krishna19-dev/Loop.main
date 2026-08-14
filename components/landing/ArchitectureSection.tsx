import { Cpu, Database, ShieldCheck, Sparkles, Layers, ArrowRight } from "lucide-react";

export function ArchitectureSection() {
  const components = [
    {
      icon: Cpu,
      title: "Gemini AI Fallback Cascade",
      detail:
        "Multi-model cascade (Gemini 1.5/2.0 Flash & Pro) with heuristic rule fallback for guaranteed 100% uptime.",
    },
    {
      icon: Database,
      title: "RAG Vector Search Engine",
      detail:
        "Gemini text-embedding-004 vectors with keyword overlap similarity for evidence-backed Q&A without hallucinations.",
    },
    {
      icon: ShieldCheck,
      title: "Role-Based Access Control",
      detail:
        "Server & client-side RBAC scoping for Admin, Analyst, and Viewer roles with tenant workspace isolation.",
    },
    {
      icon: Layers,
      title: "Multi-Tenant State Management",
      detail:
        "Versioned local-first sync with real-time UI notifications and multi-department workspace scoping.",
    },
  ];

  return (
    <section id="architecture" className="py-20 md:py-24 bg-[#0F3028] text-white relative overflow-hidden border-t border-[#2A5147]">
      {/* Subtle Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E8C98F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#1D463A] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#E8C98F] border border-[#E8C98F]/30 mb-4 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#E8C98F]" /> System Architecture
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F9F6EF] font-manrope">
            Engineered for Resilience & Precision
          </h2>
          <p className="mt-4 text-base text-[#F9F6EF]/80 leading-relaxed font-sans">
            A resilient multi-layer architecture combining real-time AI ingestion, grounded RAG search, and strict security guards.
          </p>
        </div>

        {/* 4 Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {components.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#1D463A]/80 border border-[#2A5147] p-6 hover:border-[#E8C98F]/40 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0F3028] text-[#E8C98F] flex items-center justify-center border border-[#E8C98F]/30 mb-4">
                  <Icon className="w-5 h-5 text-[#E8C98F]" />
                </div>
                <h3 className="text-base font-bold text-[#F9F6EF] mb-2 font-manrope">
                  {item.title}
                </h3>
                <p className="text-xs text-[#F9F6EF]/75 leading-relaxed font-sans">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* AI Cascade Diagram Card */}
        <div className="rounded-2xl bg-[#1D463A] border border-[#2A5147] p-6 md:p-8 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-mono text-[#E8C98F] font-semibold uppercase tracking-wider">
                Resilient AI Pipeline
              </span>
              <h3 className="text-xl font-bold text-[#F9F6EF]">
                Multi-Model Fallback Guarantee
              </h3>
              <p className="text-xs text-[#F9F6EF]/80 leading-relaxed">
                Requests automatically cycle through Gemini Flash, Gemini Pro, and rule-based heuristics to ensure uninterrupted feedback processing.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-[#0F3028] text-[#E8C98F] border border-[#E8C98F]/30 font-semibold">
                Gemini 1.5 Flash
              </span>
              <ArrowRight className="w-4 h-4 text-[#E8C98F]/60 hidden sm:block" />
              <span className="px-3 py-1.5 rounded-lg bg-[#0F3028] text-[#E8C98F] border border-[#E8C98F]/30 font-semibold">
                Gemini Pro / 2.0
              </span>
              <ArrowRight className="w-4 h-4 text-[#E8C98F]/60 hidden sm:block" />
              <span className="px-3 py-1.5 rounded-lg bg-[#0F3028] text-[#E8C98F] border border-[#E8C98F]/30 font-semibold">
                Heuristic Fallback
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
