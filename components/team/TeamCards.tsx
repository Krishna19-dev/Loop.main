"use client";

import {
  Users,
  ShieldCheck,
  BarChart3,
  Eye,
} from "lucide-react";

import { TeamMember } from "@/types/team";

interface TeamCardsProps {
  members: TeamMember[];
}

interface CardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

function Card({
  title,
  value,
  icon,
  color,
}: CardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-loop-border
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-taupe">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-forest">
            {value}
          </h2>
        </div>

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-xl
            text-white
            ${color}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function TeamCards({
  members,
}: TeamCardsProps) {
  const totalMembers = members.length;

  const admins = members.filter(
    (member) => member.role === "Admin"
  ).length;

  const analysts = members.filter(
    (member) => member.role === "Analyst"
  ).length;

  const viewers = members.filter(
    (member) => member.role === "Viewer"
  ).length;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <Card
        title="Total Members"
        value={totalMembers}
        icon={<Users size={24} />}
        color="bg-forest text-champagne border border-forest-light"
      />

      <Card
        title="Admins"
        value={admins}
        icon={<ShieldCheck size={24} />}
        color="bg-forest text-champagne border border-forest-light"
      />

      <Card
        title="Analysts"
        value={analysts}
        icon={<BarChart3 size={24} />}
        color="bg-amber-500"
      />

      <Card
        title="Viewers"
        value={viewers}
        icon={<Eye size={24} />}
        color="bg-violet-600"
      />
    </div>
  );
}