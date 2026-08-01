"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { Bot, Mail, Lock, User, Eye, EyeOff, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [hasAdmin] = useState(() => authService.adminExists());

  function handleRegister() {
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      authService.register(name, email, password);
      router.push("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed.");
      }
    }
  }



  // Admin already exists — block registration
  if (hasAdmin) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1B253F]" />
        <div className="absolute top-[-100px] left-[-100px] h-[400px] w-[400px] rounded-full bg-blue-600/20 blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/30">
            <ShieldCheck size={28} className="text-amber-400" />
          </div>

          <h1 className="text-2xl font-bold text-white">
            Workspace Already Registered
          </h1>

          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            An Administrator account already exists for this workspace. Registration is disabled to protect your workspace security.
          </p>

          <button
            onClick={() => router.push("/login")}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1B253F]" />
      <div className="absolute top-[-120px] right-[-80px] h-[450px] w-[450px] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-60px] h-[350px] w-[350px] rounded-full bg-blue-600/20 blur-[100px] pointer-events-none" />

      {/* Left Panel — Branding */}
      <div className="relative z-10 hidden w-1/2 flex-col items-center justify-center p-16 lg:flex">
        <div className="max-w-md space-y-8 text-white">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/40">
              <Bot size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Project <span className="text-blue-400">LOOP</span>
              </h1>
              <p className="text-sm text-slate-400">AI Feedback Management</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-5xl font-bold leading-tight">
              Set Up Your<br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Workspace</span>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Create the Administrator account for your LOOP workspace. You can invite Analysts and Viewers after setup.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">After registration you can:</p>
            {[
              "Invite team members with custom roles",
              "Start collecting and analyzing feedback",
              "Generate AI-powered reports",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                <div className="h-2 w-2 rounded-full bg-blue-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Register Form */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <Bot size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              Project <span className="text-blue-400">LOOP</span>
            </span>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600/20 px-3 py-1 text-xs font-medium text-emerald-300 border border-emerald-500/20">
                <Sparkles size={12} />
                New Workspace
              </div>
              <h2 className="mt-3 text-3xl font-bold text-white">Create account</h2>
              <p className="mt-1 text-slate-400 text-sm">You&apos;ll be the workspace Administrator</p>
            </div>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="John Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 py-3 pl-11 pr-12 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
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
                onClick={handleRegister}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/40"
              >
                Create Administrator Account
              </button>
            </div>

            <p className="mt-5 text-center text-xs text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 font-medium hover:text-blue-300 transition">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}