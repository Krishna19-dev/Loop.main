"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { Bot, Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
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
    <div className="relative flex min-h-screen overflow-hidden">
      {/* Initial Match & Move Splash Overlay on Web Load */}
      <MatchAndMoveSplash />
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1B253F]" />

      {/* Animated glow blobs */}
      <div className="absolute top-[-120px] left-[-100px] h-[500px] w-[500px] rounded-full bg-forest text-champagne border border-forest-light/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-60px] h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none" />

      {/* Left Panel — Branding */}
      <div className="relative z-10 hidden w-1/2 flex-col items-center justify-center p-16 lg:flex">
        <div className="max-w-md space-y-8 text-white">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-champagne border border-forest-light shadow-lg shadow-emerald-600/40">
              <Bot size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Project <span className="text-champagne">LOOP</span>
              </h1>
              <p className="text-sm text-taupe">AI Feedback Management</p>
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-4">
            <h2 className="text-5xl font-bold leading-tight">
              Turn Feedback<br />
              Into <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Insights</span>
            </h2>
            <p className="text-lg text-taupe leading-relaxed">
              AI-powered customer feedback analysis. Monitor sentiment, generate reports, and act on insights — all from one dashboard.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-3">
            {[
              { icon: "📊", label: "Real-time analytics & dashboards" },
              { icon: "🤖", label: "AI-generated insights & summaries" },
              { icon: "👥", label: "Multi-role team collaboration" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-taupe">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest text-champagne border border-forest-light">
              <Bot size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              Project <span className="text-champagne">LOOP</span>
            </span>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-forest text-champagne border border-forest-light/20 px-3 py-1 text-xs font-medium text-champagne border border-sage/20">
                <Sparkles size={12} />
                Secure Login
              </div>
              <h2 className="mt-3 text-3xl font-bold text-white">Welcome back</h2>
              <p className="mt-1 text-taupe text-sm">Sign in to your workspace</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-taupe mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe" />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/8 py-3 pl-11 pr-4 text-sm text-white placeholder:text-taupe outline-none transition focus:border-sage focus:ring-2 focus:ring-sage-bg"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-taupe mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 py-3 pl-11 pr-12 text-sm text-white placeholder:text-taupe outline-none transition focus:border-sage focus:ring-2 focus:ring-sage-bg"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-taupe hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-forest to-forest-light py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/40 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold text-taupe mb-2">
                🔑 Demo Accounts <span className="font-normal text-taupe">(Password: password123)</span>
              </p>
              <div className="space-y-1.5">
                {[
                  { role: "Admin", email: "admin@demo.com", color: "text-blue-400" },
                  { role: "Analyst", email: "analyst@demo.com", color: "text-champagne" },
                  { role: "Viewer", email: "viewer@demo.com", color: "text-violet-400" },
                ].map((demo) => (
                  <button
                    key={demo.email}
                    type="button"
                    onClick={() => { setEmail(demo.email); setPassword("password123"); }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs hover:bg-white/5 transition"
                  >
                    <span className={`font-semibold ${demo.color}`}>{demo.role}</span>
                    <span className="text-taupe">{demo.email}</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-taupe">
              First time here?{" "}
              <Link href="/register" className="text-champagne font-medium hover:text-champagne transition">
                Create workspace
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}