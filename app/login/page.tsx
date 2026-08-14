"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { Bot, Mail, Lock, Eye, EyeOff, Sparkles, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import BrandLoader from "@/components/ui/BrandLoader";
import MatchAndMoveSplash from "@/components/ui/MatchAndMoveSplash";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      authService.login(email, password);
      // Brief delay to allow full-screen loader animation to render smoothly before redirecting
      await new Promise((res) => setTimeout(res, 800));
      router.push("/dashboard");
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed.");
      }
    }
  }

  if (loading) {
    return <BrandLoader fullScreen={true} />;
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#0F3028] text-[#F9F6EF] selection:bg-[#E8C98F] selection:text-[#5C4A2A]">
      {/* Initial Match & Move Splash Overlay on Web Load */}
      <MatchAndMoveSplash />
      
      {/* Ambient background glows in Forest x Champagne theme */}
      <div className="absolute top-[-100px] left-[-100px] h-[500px] w-[500px] rounded-full bg-[#E8C98F]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-60px] h-[450px] w-[450px] rounded-full bg-[#1D463A] blur-[100px] pointer-events-none" />

      {/* Top Left Navigation Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1D463A] border border-[#2A5147] text-xs font-semibold text-[#F9F6EF] hover:border-[#E8C98F]/50 transition-all duration-200 backdrop-blur-md group shadow-md"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1 text-[#E8C98F]" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Left Panel — Branding */}
      <div className="relative z-10 hidden w-1/2 flex-col items-center justify-center p-16 lg:flex">
        <div className="max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8C98F] text-[#0F3028] shadow-lg">
              <Bot size={28} className="text-[#0F3028]" />
            </div>
            <div>
              <h1 className="font-manrope text-3xl font-extrabold tracking-tight text-[#F9F6EF]">
                Project <span className="text-[#E8C98F]">LOOP</span>
              </h1>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#E8C98F]/80">
                AI Feedback Intelligence
              </p>
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-4">
            <h2 className="font-manrope text-4xl sm:text-5xl font-bold leading-tight text-[#F9F6EF]">
              Turn Feedback<br />
              Into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8C98F] to-[#F3E8D4]">
                Actionable Insights
              </span>
            </h2>
            <p className="text-base text-[#F9F6EF]/80 leading-relaxed font-sans">
              AI-powered customer feedback analysis. Monitor sentiment, cluster requests, generate VoC reports, and act on evidence — all from one dashboard.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-3 pt-2">
            {[
              { label: "Real-time feedback clustering & sentiment" },
              { label: "RAG Q&A grounded in real customer quotes" },
              { label: "Multi-tenant isolation & RBAC team access" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-sm text-[#F9F6EF]/90 font-medium">
                <CheckCircle2 size={18} className="text-[#E8C98F]" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden pt-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8C98F] text-[#0F3028]">
              <Bot size={20} className="text-[#0F3028]" />
            </div>
            <span className="font-manrope text-2xl font-bold text-[#F9F6EF]">
              Project <span className="text-[#E8C98F]">LOOP</span>
            </span>
          </div>

          {/* Login Card */}
          <div className="rounded-3xl border border-[#2A5147] bg-[#1D463A]/90 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0F3028] px-3.5 py-1 text-xs font-semibold text-[#E8C98F] border border-[#2A5147]">
                <Sparkles size={12} className="text-[#E8C98F]" />
                Secure Workspace Login
              </div>
              <h2 className="mt-3 font-manrope text-3xl font-bold text-[#F9F6EF]">Welcome back</h2>
              <p className="mt-1 text-sm text-[#F9F6EF]/75">Sign in to your customer feedback intelligence workspace</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#E8C98F] mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F9F6EF]/60" />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#2A5147] bg-[#0F3028] py-3 pl-11 pr-4 text-sm text-[#F9F6EF] placeholder:text-[#F9F6EF]/40 outline-none transition focus:border-[#E8C98F] focus:ring-2 focus:ring-[#E8C98F]/20"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-[#E8C98F] mb-2 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F9F6EF]/60" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-[#2A5147] bg-[#0F3028] py-3 pl-11 pr-12 text-sm text-[#F9F6EF] placeholder:text-[#F9F6EF]/40 outline-none transition focus:border-[#E8C98F] focus:ring-2 focus:ring-[#E8C98F]/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F9F6EF]/60 hover:text-[#F9F6EF]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-[#B85C3C]/40 bg-[#F5DDD5]/10 px-4 py-3 text-sm text-[#B85C3C]">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#E8C98F] hover:bg-[#D4B478] py-3.5 text-sm font-bold text-[#5C4A2A] shadow-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Demo Accounts Box */}
            <div className="mt-6 rounded-xl border border-[#2A5147] bg-[#0F3028] p-4 space-y-2">
              <p className="text-xs font-semibold text-[#E8C98F]">
                🔑 Demo Accounts <span className="font-normal text-[#F9F6EF]/70">(Password: password123)</span>
              </p>
              <div className="space-y-1.5">
                {[
                  { role: "Admin", email: "admin@demo.com", color: "text-[#6B8F71]" },
                  { role: "Analyst", email: "analyst@demo.com", color: "text-[#E8C98F]" },
                  { role: "Viewer", email: "viewer@demo.com", color: "text-[#8A7E72]" },
                ].map((demo) => (
                  <button
                    key={demo.email}
                    type="button"
                    onClick={() => { setEmail(demo.email); setPassword("password123"); }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs hover:bg-[#1D463A] transition"
                  >
                    <span className={`font-bold ${demo.color}`}>{demo.role}</span>
                    <span className="text-[#F9F6EF]/80 font-mono text-[11px]">{demo.email}</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-[#F9F6EF]/75">
              First time here?{" "}
              <Link href="/register" className="text-[#E8C98F] font-bold hover:underline">
                Create workspace
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}