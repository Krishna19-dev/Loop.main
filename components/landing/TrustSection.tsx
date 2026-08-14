import { Shield, Lock, Users, Server } from "lucide-react";

export function TrustSection() {
  const trustPoints = [
    {
      icon: Shield,
      title: "Workspace Isolation",
      detail: "Strict multi-tenant boundary separation guarantees your organization's feedback remains isolated and private.",
    },
    {
      icon: Users,
      title: "Role-Based Access Control",
      detail: "Granular RBAC permissions for Admin, Analyst, and Viewer roles ensure sensitive insights stay visible only to authorized members.",
    },
    {
      icon: Lock,
      title: "Zero Model Training",
      detail: "Your proprietary customer feedback is strictly used for your workspace RAG queries — never used to train public LLM models.",
    },
    {
      icon: Server,
      title: "Enterprise Compliance",
      detail: "End-to-end data encryption at rest and in transit with complete audit logging and backup support.",
    },
  ];

  return (
    <section id="trust" className="py-16 md:py-24 bg-[#1D463A] text-[#F9F6EF] border-b border-[#2A5147]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Strip Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F3028] border border-[#E8C98F]/30 text-xs font-semibold text-[#E8C98F]">
            <Shield className="w-4 h-4 text-[#E8C98F]" />
            <span>B2B Security & Privacy Infrastructure</span>
          </div>

          <h2 className="font-manrope text-2xl sm:text-3xl md:text-4xl font-bold text-[#F9F6EF]">
            Built for Enterprise-Grade Security & Isolation
          </h2>

          <p className="text-sm sm:text-base text-[#F9F6EF]/80 max-w-2xl mx-auto font-sans leading-relaxed">
            Multi-tenant architecture and fine-grained role-based access control (Admin, Analyst, Viewer) keep your customer data secure at every layer.
          </p>
        </div>

        {/* 4 Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0F3028]/80 border border-[#2A5147] hover:border-[#E8C98F]/50 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1D463A] text-[#E8C98F] border border-[#2A5147] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-manrope text-lg font-bold text-[#F9F6EF] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#F9F6EF]/75 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
