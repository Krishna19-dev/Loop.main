import { Tag, TrendingUp, HelpCircle, FileText, Check, AlertCircle, Quote } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      id: "auto-classification",
      title: "Auto-Classification",
      subtitle: "Sentiment & Theme Triage",
      description:
        "Every incoming feedback item is automatically categorized and evaluated for sentiment using custom-tuned AI models. Eliminate hours of tedious spreadsheet tagging.",
      icon: Tag,
      badge: "Zero Manual Effort",
      preview: (
        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-[#F9F6EF] border border-[#E7DDD0] flex items-center justify-between">
            <span className="font-medium text-[#0F3028] truncate max-w-[200px]">
              &ldquo;Navigation menu is unintuitive...&rdquo;
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D8EBD9] text-[#6B8F71]">
              Positive (UI)
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#F9F6EF] border border-[#E7DDD0] flex items-center justify-between">
            <span className="font-medium text-[#0F3028] truncate max-w-[200px]">
              &ldquo;Stuck on payment authorization screen...&rdquo;
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F5DDD5] text-[#B85C3C]">
              Negative (Billing)
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#F9F6EF] border border-[#E7DDD0] flex items-center justify-between">
            <span className="font-medium text-[#0F3028] truncate max-w-[200px]">
              &ldquo;Can we export data to CSV format?&rdquo;
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E8E0D8] text-[#8A7E72]">
              Neutral (Feature)
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "theme-trends",
      title: "Theme Trends",
      subtitle: "Week-over-Week Spike Detection",
      description:
        "Spot emergent issues before they impact retention. Track cluster volume trends and sentiment drift across all customer touchpoints in real time.",
      icon: TrendingUp,
      badge: "Real-Time Tracking",
      preview: (
        <div className="p-4 rounded-xl bg-[#F9F6EF] border border-[#E7DDD0] space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-[#0F3028]">
            <span>Theme Activity (7 Days)</span>
            <span className="text-[#B85C3C] flex items-center gap-1 font-bold">
              <AlertCircle className="w-3.5 h-3.5" />
              Checkout Error (+42%)
            </span>
          </div>
          {/* Mini trend progress bars */}
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[11px] text-[#0F3028]/80 mb-1">
                <span>Billing & Checkout</span>
                <span className="font-bold text-[#B85C3C]">148 items</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E7DDD0]">
                <div className="h-full rounded-full bg-[#B85C3C] w-[85%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-[#0F3028]/80 mb-1">
                <span>Onboarding Flow UX</span>
                <span className="font-bold text-[#6B8F71]">92 items</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E7DDD0]">
                <div className="h-full rounded-full bg-[#6B8F71] w-[55%]" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "ask-loop",
      title: "Ask LOOP",
      subtitle: "Grounded RAG Q&A with Citations",
      description:
        "Ask plain-English questions like 'What are enterprise users saying about our reporting tools?' and receive evidence-backed answers with exact source quotes.",
      icon: HelpCircle,
      badge: "Zero Hallucinations",
      preview: (
        <div className="p-4 rounded-xl bg-[#0F3028] border border-[#2A5147] text-[#F9F6EF] space-y-2.5 text-xs">
          <div className="font-mono text-[#E8C98F] text-[11px] p-2 rounded bg-[#1D463A]">
            Q: What are main causes of trial churn?
          </div>
          <p className="text-[#F9F6EF]/90 leading-relaxed text-[11px]">
            &ldquo;68% of churned trial users cited missing CSV exports and team role permissions.&rdquo;
          </p>
          <div className="pt-2 border-t border-[#2A5147] flex items-center justify-between text-[10px] text-[#E8C98F]">
            <span className="flex items-center gap-1">
              <Quote className="w-3 h-3 text-[#E8C98F]" />
              Citing Ticket #1084 & G2 Review #49
            </span>
            <span className="font-bold">100% Grounded</span>
          </div>
        </div>
      ),
    },
    {
      id: "voc-reports",
      title: "Voice-of-Customer Reports",
      subtitle: "1-Click Executive Digests",
      description:
        "Generate beautifully formatted VoC digests in seconds. Deliver evidence-backed roadmap recommendations with real customer quotes directly to leadership.",
      icon: FileText,
      badge: "Instant Digest",
      preview: (
        <div className="p-4 rounded-xl bg-[#F9F6EF] border border-[#E7DDD0] space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-manrope font-bold text-[#0F3028]">Executive VoC Digest — Q3</span>
            <span className="px-2 py-0.5 rounded bg-[#E8C98F]/40 border border-[#E8C98F] text-[10px] font-bold text-[#5C4A2A]">
              PDF Ready
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#F3E8D4] border border-[#E7DDD0] text-[11px] text-[#0F3028]">
            <strong className="text-[#5C4A2A]">Key Takeaway:</strong> 42 verified quotes recommend prioritizing self-serve SSO and export features in Q4.
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#0F3028]/70">
            <Check className="w-3 h-3 text-[#6B8F71]" /> Includes quotes, breakdown charts & ROI metrics
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-[#F9F6EF] text-[#0F3028] border-b border-[#E7DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3E8D4] border border-[#E7DDD0] text-xs font-bold uppercase tracking-wider text-[#5C4A2A]">
            <span>Platform Capabilities</span>
          </div>

          <h2 className="font-manrope text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F3028]">
            Designed for Modern Product & Engineering Teams
          </h2>

          <p className="text-base sm:text-lg text-[#0F3028]/80 leading-relaxed font-sans">
            AI features that convert unorganized customer feedback into clear, ranked priorities.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((item) => {
            const FeatureIcon = item.icon;
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between p-8 rounded-2xl bg-[#F3E8D4] border border-[#E7DDD0] hover:border-[#E8C98F] hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0F3028] text-[#E8C98F] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <FeatureIcon className="w-6 h-6 text-[#E8C98F]" />
                    </div>
                    <span className="text-xs font-bold text-[#5C4A2A] bg-[#F9F6EF] px-3 py-1 rounded-full border border-[#E7DDD0]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-manrope text-2xl font-bold text-[#0F3028] mb-1">
                    {item.title}
                  </h3>
                  <h4 className="text-xs font-semibold text-[#5C4A2A] uppercase tracking-wider mb-4">
                    {item.subtitle}
                  </h4>

                  <p className="text-sm text-[#0F3028]/80 leading-relaxed font-sans mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Interactive/Visual Feature Preview */}
                <div className="mt-4 pt-4 border-t border-[#E7DDD0]">
                  {item.preview}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
