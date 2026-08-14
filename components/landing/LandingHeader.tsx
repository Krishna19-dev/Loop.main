"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0F3028]/95 backdrop-blur-md border-b border-[#2A5147]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#E8C98F] flex items-center justify-center text-[#0F3028] shadow-md transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="w-5.5 h-5.5 text-[#0F3028]" />
          </div>
          <div className="flex flex-col">
            <span className="font-manrope text-2xl font-bold tracking-tight text-[#F9F6EF] group-hover:text-[#E8C98F] transition-colors">
              LOOP
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-[#E8C98F]/80 -mt-1">
              Feedback AI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#problem"
            className="text-sm font-medium text-[#F9F6EF]/80 hover:text-[#E8C98F] transition-colors"
          >
            The Problem
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-[#F9F6EF]/80 hover:text-[#E8C98F] transition-colors"
          >
            How It Works
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-[#F9F6EF]/80 hover:text-[#E8C98F] transition-colors"
          >
            Features
          </a>
          <a
            href="#trust"
            className="text-sm font-medium text-[#F9F6EF]/80 hover:text-[#E8C98F] transition-colors"
          >
            Security & Trust
          </a>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-[#F9F6EF] hover:text-[#E8C98F] px-4 py-2 rounded-lg transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#5C4A2A] bg-[#E8C98F] hover:bg-[#D4B478] px-5 py-2.5 rounded-xl shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#F9F6EF] hover:text-[#E8C98F] hover:bg-[#1D463A] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F3028] border-b border-[#2A5147] px-4 pt-2 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3 pt-2">
            <a
              href="#problem"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#F9F6EF] hover:text-[#E8C98F] py-2 border-b border-[#2A5147]/50"
            >
              The Problem
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#F9F6EF] hover:text-[#E8C98F] py-2 border-b border-[#2A5147]/50"
            >
              How It Works
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#F9F6EF] hover:text-[#E8C98F] py-2 border-b border-[#2A5147]/50"
            >
              Features
            </a>
            <a
              href="#trust"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#F9F6EF] hover:text-[#E8C98F] py-2 border-b border-[#2A5147]/50"
            >
              Security & Trust
            </a>
          </nav>
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-sm font-semibold text-[#F9F6EF] border border-[#2A5147] py-2.5 rounded-xl hover:bg-[#1D463A] transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-sm font-bold text-[#5C4A2A] bg-[#E8C98F] hover:bg-[#D4B478] py-2.5 rounded-xl transition-colors shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
