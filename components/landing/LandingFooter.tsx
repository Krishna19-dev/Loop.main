import Link from "next/link";
import { Sparkles } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-[#0F3028] text-[#F9F6EF]/75 border-t border-[#2A5147] py-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E8C98F] flex items-center justify-center text-[#0F3028]">
                <Sparkles className="w-4 h-4 text-[#0F3028]" />
              </div>
              <span className="font-manrope text-xl font-bold text-[#F9F6EF]">
                LOOP
              </span>
            </Link>
            <p className="text-xs text-[#F9F6EF]/70 leading-relaxed">
              AI Customer-Feedback Intelligence Platform. Classify, cluster, and decide with evidence-backed RAG insights.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8C98F]">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#features" className="hover:text-[#E8C98F] transition-colors">
                  Auto-Classification
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#E8C98F] transition-colors">
                  Theme Trends
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#E8C98F] transition-colors">
                  Ask LOOP (RAG Q&A)
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#E8C98F] transition-colors">
                  VoC Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Solution & Security Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8C98F]">
              Trust & Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#trust" className="hover:text-[#E8C98F] transition-colors">
                  Multi-tenant Isolation
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-[#E8C98F] transition-colors">
                  Role-Based Access (RBAC)
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#E8C98F] transition-colors">
                  Ingestion Flow
                </a>
              </li>
              <li>
                <a href="#problem" className="hover:text-[#E8C98F] transition-colors">
                  Feedback Channels
                </a>
              </li>
            </ul>
          </div>

          {/* Account & Quick Action Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8C98F]">
              Get Started
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/login" className="hover:text-[#E8C98F] transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#E8C98F] transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#E8C98F] transition-colors">
                  Workspace Dashboard
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#2A5147] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F9F6EF]/60">
          <p>© {new Date().getFullYear()} Project LOOP. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#E8C98F] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#E8C98F] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#E8C98F] cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
