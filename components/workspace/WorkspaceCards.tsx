"use client";

import {
  Briefcase,
  CheckCircle2,
  Archive,
  Ban,
} from "lucide-react";

import { Workspace } from "@/types/workspace";

interface WorkspaceCardsProps {
  workspaces: Workspace[];
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

export default function WorkspaceCards({
  workspaces,
}: WorkspaceCardsProps) {
  const total = workspaces.length;

  const active = workspaces.filter(
    (workspace) => workspace.status === "Active"
  ).length;

  const archived = workspaces.filter(
    (workspace) => workspace.status === "Archived"
  ).length;

  const inactive = workspaces.filter(
    (workspace) => workspace.status === "Inactive"
  ).length;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <Card
        title="Total Workspaces"
        value={total}
        icon={<Briefcase size={24} />}
        color="bg-forest text-champagne border border-forest-light"
      />

      <Card
        title="Active"
        value={active}
        icon={<CheckCircle2 size={24} />}
        color="bg-forest text-champagne border border-forest-light"
      />

      <Card
        title="Archived"
        value={archived}
        icon={<Archive size={24} />}
        color="bg-amber-500"
      />

      <Card
        title="Inactive"
        value={inactive}
        icon={<Ban size={24} />}
        color="bg-red-500"
      />
    </div>
  );
}