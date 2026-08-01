"use client";

import { Plus } from "lucide-react";

interface WorkspaceHeaderProps {
  onCreate: () => void;
}

export default function WorkspaceHeader({
  onCreate,
}: WorkspaceHeaderProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-5xl font-bold tracking-tight text-forest">
          Workspaces
        </h1>

        <p className="mt-3 text-lg text-taupe">
          Manage all team workspaces from one centralized location.
        </p>
      </div>

      <button
        onClick={onCreate}
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-forest
          px-6
          py-3
          text-champagne
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-forest-light
          hover:shadow-xl
        "
      >
        <Plus size={20} />
        Create Workspace
      </button>
    </div>
  );
}