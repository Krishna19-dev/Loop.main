import Link from "next/link";
import { UserCheck, Shield, BarChart3, Eye, ArrowRight } from "lucide-react";

export function DemoAccountsSection() {
  const roles = [
    {
      title: "ADMIN",
      name: "Admin User",
      email: "admin@demo.com",
      password: "password123",
      icon: Shield,
      badgeColor: "bg-[#B85C3C]/20 text-[#B85C3C] border-[#B85C3C]/40",
      description: "Full system access. Create workspaces, manage team users, delete reports, and trigger AI re-classification.",
    },
    {
      title: "ANALYST",
      name: "Analyst User",
      email: "analyst@demo.com",
      password: "password123",
      icon: BarChart3,
      badgeColor: "bg-[#E8C98F]/20 text-[#5C4A2A] border-[#E8C98F]",
      description: "Analytical access. Manage feedback inbox, trigger AI clustering, and generate executive VoC reports.",
    },
    {
      title: "VIEWER",
      name: "Viewer User",
      email: "viewer@demo.com",
      password: "password123",
      icon: Eye,
      badgeColor: "bg-[#6B8F71]/20 text-[#6B8F71] border-[#6B8F71]/40",
      description: "Read-only access. View live dashboards, search feedback stream, and ask questions with Ask LOOP RAG.",
    },
  ];

  return (
    <section id="demo" className="py-20 md:py-24 bg-[#F9F6EF] text-[#0F3028] border-t border-[#E7DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3E8D4] border border-[#E7DDD0] text-xs font-bold uppercase tracking-wider text-[#5C4A2A] mb-4">
            <UserCheck className="w-3.5 h-3.5" /> Quick Demo Credentials
          </div>
          <h2 className="font-manrope text-3xl sm:text-4xl font-bold tracking-tight text-[#0F3028]">
            Test Role-Based Access Control (RBAC)
          </h2>
          <p className="text-base text-[#0F3028]/80 leading-relaxed font-sans mt-3">
            Pre-configured role credentials for instant login and live testing.
          </p>
        </div>

        {/* 3 Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between p-6 rounded-2xl bg-[#F3E8D4] border border-[#E7DDD0] hover:border-[#E8C98F] transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0F3028] text-[#E8C98F] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#E8C98F]" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${role.badgeColor}`}>
                      {role.title}
                    </span>
                  </div>

                  <h3 className="font-manrope text-lg font-bold text-[#0F3028]">
                    {role.name}
                  </h3>

                  {/* Credentials Box */}
                  <div className="my-4 p-3 rounded-xl bg-[#F9F6EF] border border-[#E7DDD0] space-y-1 text-xs font-mono">
                    <div className="text-[#0F3028]">
                      <span className="text-[#5C4A2A] font-semibold font-sans">Email: </span>
                      {role.email}
                    </div>
                    <div className="text-[#0F3028]">
                      <span className="text-[#5C4A2A] font-semibold font-sans">Password: </span>
                      {role.password}
                    </div>
                  </div>

                  <p className="text-xs text-[#0F3028]/75 leading-relaxed font-sans mb-6">
                    {role.description}
                  </p>
                </div>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold text-[#5C4A2A] bg-[#E8C98F] hover:bg-[#D4B478] py-3 rounded-xl transition-colors shadow-sm"
                >
                  <span>Log In as {role.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
