import { Headphones, Star, ClipboardCheck, Briefcase, Share2, AlertTriangle } from "lucide-react";

export function ProblemSection() {
  const sources = [
    {
      icon: Headphones,
      label: "Support Tickets",
      detail: "Zendesk, Intercom, Freshdesk & customer support logs",
      metric: "1,400+ items/mo",
    },
    {
      icon: Star,
      label: "App Reviews",
      detail: "App Store, Google Play, G2, Capterra & ProductHunt",
      metric: "850+ reviews",
    },
    {
      icon: ClipboardCheck,
      label: "NPS Surveys",
      detail: "Typeform, Qualtrics, CSAT & in-app modal surveys",
      metric: "3,100+ responses",
    },
    {
      icon: Briefcase,
      label: "Sales Notes",
      detail: "HubSpot, Salesforce, Gong call transcripts & CRM notes",
      metric: "240+ calls",
    },
    {
      icon: Share2,
      label: "Social Mentions",
      detail: "X/Twitter, Reddit, LinkedIn & community forum posts",
      metric: "600+ posts",
    },
  ];

  return (
    <section id="problem" className="py-20 md:py-28 bg-[#F9F6EF] text-[#0F3028] border-b border-[#E7DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Content */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3E8D4] border border-[#E7DDD0] text-xs font-bold uppercase tracking-wider text-[#5C4A2A]">
            <AlertTriangle className="w-3.5 h-3.5 text-[#B85C3C]" />
            <span>The Product Triage Problem</span>
          </div>

          <h2 className="font-manrope text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F3028]">
            Feedback comes from everywhere. <br className="hidden sm:inline" />
            <span className="text-[#5C4A2A]">Nobody has time to read it all.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#0F3028]/80 leading-relaxed font-sans pt-2">
            Feedback comes from everywhere — tickets, reviews, surveys, sales calls, social posts. Nobody has time to read it all.
          </p>
        </div>

        {/* 5 Icon+Label Source Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {sources.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#F3E8D4] border border-[#E7DDD0] hover:border-[#E8C98F] hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F9F6EF] border border-[#E7DDD0] flex items-center justify-center text-[#0F3028] group-hover:bg-[#0F3028] group-hover:text-[#E8C98F] transition-colors mb-4 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-manrope text-lg font-bold text-[#0F3028] mb-1">
                    {item.label}
                  </h3>
                  <p className="text-xs text-[#0F3028]/70 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E7DDD0]/80 flex items-center justify-between text-[11px] font-semibold text-[#5C4A2A]">
                  <span>Avg Volume</span>
                  <span className="px-2 py-0.5 rounded bg-[#F9F6EF] border border-[#E7DDD0] font-mono text-[10px]">
                    {item.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-[#F3E8D4]/60 border border-[#E7DDD0] max-w-3xl mx-auto text-center">
          <p className="text-sm text-[#0F3028]/85 font-medium">
            <strong className="text-[#0F3028] font-bold">The Cost of Triage Blindness:</strong> Without unified AI analysis, critical feature requests get buried, churning users go unnoticed, and roadmap decisions become pure guesswork.
          </p>
        </div>

      </div>
    </section>
  );
}
