import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#0F3028] text-[#F9F6EF] py-20 md:py-28">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E8C98F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D463A] border border-[#E8C98F]/40 text-xs font-semibold text-[#E8C98F]">
          <Sparkles className="w-4 h-4 text-[#E8C98F]" />
          <span>Transform Feedback Into Roadmap Clarity</span>
        </div>

        <h2 className="font-manrope text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F9F6EF] max-w-3xl mx-auto leading-tight">
          Ready to close the loop on your customer feedback?
        </h2>

        <p className="text-base sm:text-lg text-[#F9F6EF]/85 max-w-2xl mx-auto font-sans leading-relaxed">
          Stop manually sifting through hundreds of tickets and reviews. Start generating evidence-backed product insights today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-base font-bold text-[#5C4A2A] bg-[#E8C98F] hover:bg-[#D4B478] px-9 py-4 rounded-xl shadow-xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold text-[#F9F6EF] border border-[#E8C98F]/40 hover:bg-[#1D463A] px-8 py-4 rounded-xl transition-all duration-200"
          >
            Log In to Workspace
          </Link>
        </div>

      </div>
    </section>
  );
}
