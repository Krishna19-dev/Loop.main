import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import HeroBackgroundContainer from "@/components/hero/HeroBackgroundContainer";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0F3028] text-[#F9F6EF] pt-12 pb-24 md:pt-16 md:pb-32 border-b border-[#2A5147]">
      {/* 3D Ambient Floating Rings Background */}
      <HeroBackgroundContainer />

      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E8C98F]/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1D463A] rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          
          {/* AI Intelligence Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D463A]/80 border border-[#E8C98F]/30 backdrop-blur-sm text-xs font-semibold text-[#E8C98F] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#E8C98F]" />
            <span>AI Customer-Feedback Intelligence Platform</span>
          </div>

          {/* Hero Main Headline */}
          <h1 className="font-manrope text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-[#F9F6EF]">
            Turn scattered customer feedback into a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8C98F] via-[#F3E8D4] to-[#E8C98F]">
              ranked, evidence-backed list
            </span>{" "}
            of what to do next.
          </h1>

          {/* Hero Subheadline */}
          <p className="text-lg sm:text-xl text-[#F9F6EF]/85 max-w-3xl leading-relaxed font-sans">
            LOOP ingests support tickets, reviews, surveys, and sales notes, then uses AI to classify, cluster, and answer questions grounded in real feedback.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-base font-bold text-[#5C4A2A] bg-[#E8C98F] hover:bg-[#D4B478] px-8 py-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold text-[#F9F6EF] border border-[#E8C98F]/40 hover:bg-[#1D463A] hover:border-[#E8C98F]/70 px-8 py-4 rounded-xl transition-all duration-200"
            >
              Log In
            </Link>
          </div>

          {/* Quick Credibility Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-medium text-[#F9F6EF]/70">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#E8C98F]" />
              <span>Multi-tenant Isolation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#E8C98F]" />
              <span>RAG-Grounded AI (Zero Hallucinations)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#E8C98F]" />
              <span>Role-Based Access Control</span>
            </div>
          </div>
        </div>

        {/* Dashboard Mockup Showcase Placeholder */}
        <div className="mt-16 md:mt-20 max-w-5xl mx-auto">
          <div className="relative rounded-2xl bg-[#1D463A] border border-[#2A5147] p-4 sm:p-6 shadow-xl ring-1 ring-[#E8C98F]/20">
            
            {/* Top Bar of Mockup */}
            <div className="flex items-center justify-between pb-4 border-b border-[#2A5147] mb-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#B85C3C]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#E8C98F]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#6B8F71]/80" />
                </div>
                <span className="text-xs font-mono text-[#F9F6EF]/60">loop.app/dashboard — Intelligence Stream</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0F3028] text-[11px] font-medium text-[#E8C98F] border border-[#2A5147]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Ingestion Active
                </span>
              </div>
            </div>

            {/* Mockup Inner Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              
              {/* Column 1 & 2: Feedback Item Feed */}
              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#E8C98F]">
                    Recent Ingested Feedback
                  </span>
                  <span className="text-xs text-[#F9F6EF]/50">3 Channels Active</span>
                </div>

                {/* Positive Item (Sage) */}
                <div className="p-4 rounded-xl bg-[#0F3028]/80 border border-[#2A5147] hover:border-[#6B8F71]/40 transition-all">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D8EBD9] text-[#6B8F71]">
                      Positive Sentiment • 96%
                    </span>
                    <span className="text-xs text-[#F9F6EF]/50">G2 Review • 3m ago</span>
                  </div>
                  <p className="text-sm text-[#F9F6EF]/90 font-medium">
                    &ldquo;The AI clustering feature grouped all our onboarding complaints instantly. Saved our product manager 10 hours this week.&rdquo;
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-[#E8C98F]/80">
                    <span>Tag: #Onboarding</span>
                    <span>•</span>
                    <span>Impact: High</span>
                  </div>
                </div>

                {/* Neutral Item (Taupe) */}
                <div className="p-4 rounded-xl bg-[#0F3028]/80 border border-[#2A5147] hover:border-[#8A7E72]/40 transition-all">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8E0D8] text-[#8A7E72]">
                      Neutral Sentiment • 89%
                    </span>
                    <span className="text-xs text-[#F9F6EF]/50">Ticket #4029 • 18m ago</span>
                  </div>
                  <p className="text-sm text-[#F9F6EF]/90 font-medium">
                    &ldquo;Would be great to schedule automated weekly VoC PDF digests directly to our Slack #product channel.&rdquo;
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-[#E8C98F]/80">
                    <span>Tag: #Integrations</span>
                    <span>•</span>
                    <span>Impact: Medium</span>
                  </div>
                </div>

                {/* Negative Item (Terra) */}
                <div className="p-4 rounded-xl bg-[#0F3028]/80 border border-[#2A5147] hover:border-[#B85C3C]/40 transition-all">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F5DDD5] text-[#B85C3C]">
                      Negative Sentiment • Spiking
                    </span>
                    <span className="text-xs text-[#F9F6EF]/50">Intercom • 42m ago</span>
                  </div>
                  <p className="text-sm text-[#F9F6EF]/90 font-medium">
                    &ldquo;Checkout page stalled when applying a team seat upgrade promo code.&rdquo;
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-[#B85C3C]/90 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Spike Detected (+42% this week)</span>
                  </div>
                </div>
              </div>

              {/* Column 3: AI Executive Summary & Ask LOOP Q&A */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#E8C98F]">
                    AI Grounded Insight
                  </span>
                </div>

                {/* AI Summary Box */}
                <div className="p-4 rounded-xl bg-[#0F3028] border border-[#E8C98F]/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#E8C98F]">
                    <Sparkles className="w-4 h-4 text-[#E8C98F]" />
                    <span>Top Priority This Week</span>
                  </div>
                  <p className="text-xs text-[#F9F6EF]/90 leading-relaxed">
                    <strong className="text-[#E8C98F]">Billing & Checkout</strong> friction accounts for 34% of all negative sentiment. 14 tickets cite promo code application timeouts.
                  </p>
                  <div className="p-2.5 rounded-lg bg-[#1D463A] border border-[#2A5147] text-[11px] text-[#F9F6EF]/80">
                    <span className="font-semibold text-[#E8C98F]">Recommendation:</span> Deploy checkout session fix to recover estimated $18k ARR.
                  </div>
                </div>

                {/* Ask LOOP Q&A Widget */}
                <div className="p-4 rounded-xl bg-[#0F3028] border border-[#2A5147] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#F9F6EF]">
                    <MessageSquare className="w-3.5 h-3.5 text-[#E8C98F]" />
                    <span>Ask LOOP (RAG Q&A)</span>
                  </div>
                  <div className="p-2 rounded-md bg-[#1D463A]/70 text-[11px] text-[#E8C98F] font-mono">
                    &ldquo;What is top user request for export?&rdquo;
                  </div>
                  <div className="text-[11px] text-[#F9F6EF]/80 leading-snug">
                    ✓ Grounded in 18 feedback quotes (100% evidence-backed).
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
