import { ArrowRight, Inbox, Sparkles, Compass } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Ingest",
      subtitle: "Feedback flows in from every channel",
      description:
        "Connect support tickets, app store reviews, survey responses, and sales notes into a single unified stream in minutes.",
      icon: Inbox,
      highlights: ["Multi-source API ingestion", "Automatic noise deduplication", "Real-time sync"],
    },
    {
      number: "02",
      title: "AI Analyzes",
      subtitle: "Classifies sentiment, clusters into themes, detects trends",
      description:
        "LLMs instantly tag sentiment (Positive, Neutral, Negative), group similar requests into actionable themes, and alert on sudden spikes.",
      icon: Sparkles,
      highlights: ["Sentiment classification", "Semantic clustering", "Week-over-week trend alerts"],
    },
    {
      number: "03",
      title: "Decide",
      subtitle: "Ask questions, get grounded answers, generate reports",
      description:
        "Query your feedback corpus in plain English with RAG citations, build evidence-based roadmaps, and produce executive VoC digests.",
      icon: Compass,
      highlights: ["Hallucination-free Q&A", "Exact source quotes & citations", "1-click VoC report export"],
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#F9F6EF] text-[#0F3028] border-b border-[#E7DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3E8D4] border border-[#E7DDD0] text-xs font-bold uppercase tracking-wider text-[#5C4A2A]">
            <span>3-Step Automated Intelligence</span>
          </div>

          <h2 className="font-manrope text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F3028]">
            How LOOP Works
          </h2>

          <p className="text-base sm:text-lg text-[#0F3028]/80 leading-relaxed font-sans">
            From raw customer feedback to confident product priorities in 3 simple steps.
          </p>
        </div>

        {/* 3 Steps Cards Flow */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col justify-between p-8 rounded-2xl bg-[#F3E8D4]/60 border border-[#2A5147]/30 hover:border-[#E8C98F] hover:bg-[#F3E8D4] shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  {/* Step Header Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-manrope text-2xl font-black text-[#5C4A2A] px-3 py-1 rounded-lg bg-[#E8C98F]/40 border border-[#E8C98F]">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#0F3028] text-[#E8C98F] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <StepIcon className="w-6 h-6 text-[#E8C98F]" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-manrope text-2xl font-bold text-[#0F3028] mb-1">
                    {step.title}
                  </h3>
                  <h4 className="text-sm font-semibold text-[#5C4A2A] mb-4">
                    {step.subtitle}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-[#0F3028]/80 leading-relaxed font-sans mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-4 border-t border-[#E7DDD0] space-y-2">
                  {step.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-[#0F3028]/90">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E8C98F]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Desktop Directional Arrow indicator */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#0F3028] text-[#E8C98F] border border-[#E8C98F]/50 items-center justify-center shadow-lg">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
