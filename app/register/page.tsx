"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { Bot, Mail, Lock, User, Eye, EyeOff, Sparkles, ShieldCheck, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import BrandLoader from "@/components/ui/BrandLoader";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasAdmin] = useState(() => authService.adminExists());

  async function handleRegister() {
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      authService.register(name, email, password);
      await new Promise((res) => setTimeout(res, 800));
      router.push("/login");
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed.");
      }
    }
  }

  if (loading) {
    return <BrandLoader fullScreen={true} />;
  }

  // Admin already exists — block registration
  if (hasAdmin) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-6 bg-[#0F3028] text-[#F9F6EF]">
        <div className="absolute inset-0 bg-radial from-[#E8C98F]/10 via-transparent to-transparent pointer-events-none" />

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

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-[#2A5147] bg-[#1D463A]/90 p-8 shadow-2xl backdrop-blur-xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F3028] border border-[#2A5147]">
            <ShieldCheck size={32} className="text-[#E8C98F]" />
          </div>

          <h1 className="font-manrope text-2xl font-bold text-[#F9F6EF]">
            Workspace Already Registered
          </h1>

          <p className="mt-3 text-sm text-[#F9F6EF]/75 leading-relaxed font-sans">
            An Administrator account already exists for this workspace. Registration is disabled to protect workspace security.
          </p>

          <button
            onClick={() => router.push("/login")}
            className="mt-6 w-full rounded-xl bg-[#E8C98F] hover:bg-[#D4B478] py-3.5 text-sm font-bold text-[#5C4A2A] shadow-lg transition-all duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#0F3028] text-[#F9F6EF] selection:bg-[#E8C98F] selection:text-[#5C4A2A]">
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

      {/* Ambient background glows */}
      <div className="absolute top-[-120px] right-[-80px] h-[450px] w-[450px] rounded-full bg-[#E8C98F]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-60px] h-[350px] w-[350px] rounded-full bg-[#1D463A] blur-[100px] pointer-events-none" />

      {/* Left Panel — Branding */}
      <div className="relative z-10 hidden w-1/2 flex-col items-center justify-center p-16 lg:flex">
        <div className="max-w-md space-y-8">
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

          <div className="space-y-4">
            <h2 className="font-manrope text-4xl sm:text-5xl font-bold leading-tight text-[#F9F6EF]">
              Set Up Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8C98F] to-[#F3E8D4]">
                Workspace Admin
              </span>
            </h2>
            <p className="text-base text-[#F9F6EF]/80 leading-relaxed font-sans">
              Create the Administrator account for your LOOP workspace. You can invite Analysts and Viewers after setup.
            </p>
          </div>

          <div className="rounded-2xl border border-[#2A5147] bg-[#1D463A] p-6 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#E8C98F]">
              After setup you can:
            </p>
            {[
              "Invite team members with role-based access",
              "Ingest support tickets, reviews & CSAT surveys",
              "Generate 1-click executive VoC digests",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-[#F9F6EF]/90 text-sm font-medium">
                <CheckCircle2 size={16} className="text-[#E8C98F]" />
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
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden pt-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8C98F] text-[#0F3028]">
              <Bot size={20} className="text-[#0F3028]" />
            </div>
            <span className="font-manrope text-2xl font-bold text-[#F9F6EF]">
              Project <span className="text-[#E8C98F]">LOOP</span>
            </span>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-[#2A5147] bg-[#1D463A]/90 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0F3028] px-3 py-1 text-xs font-semibold text-[#E8C98F] border border-[#2A5147]">
                <Sparkles size={12} className="text-[#E8C98F]" />
                New Workspace Admin
              </div>
              <h2 className="mt-3 font-manrope text-3xl font-bold text-[#F9F6EF]">Create account</h2>
              <p className="mt-1 text-sm text-[#F9F6EF]/75">You&apos;ll be the workspace Administrator</p>
            </div>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-[#E8C98F] mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F9F6EF]/60" />
                  <input
                    type="text"
                    placeholder="John Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-[#2A5147] bg-[#0F3028] py-3 pl-11 pr-4 text-sm text-[#F9F6EF] placeholder:text-[#F9F6EF]/40 outline-none transition focus:border-[#E8C98F] focus:ring-2 focus:ring-[#E8C98F]/20"
                  />
                </div>
              </div>

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
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-[#2A5147] bg-[#0F3028] py-3 pl-11 pr-12 text-sm text-[#F9F6EF] placeholder:text-[#F9F6EF]/40 outline-none transition focus:border-[#E8C98F] focus:ring-2 focus:ring-[#E8C98F]/20"
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
                onClick={handleRegister}
                className="w-full rounded-xl bg-[#E8C98F] hover:bg-[#D4B478] py-3.5 text-sm font-bold text-[#5C4A2A] shadow-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
              >
                Create Administrator Account
              </button>
            </div>

            <p className="mt-5 text-center text-xs text-[#F9F6EF]/75">
              Already have an account?{" "}
              <Link href="/login" className="text-[#E8C98F] font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}