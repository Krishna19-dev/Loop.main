"use client";

import { UserPlus } from "lucide-react";

interface TeamHeaderProps {
  onInvite: () => void;
}

export default function TeamHeader({
  onInvite,
}: TeamHeaderProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      <div>
        <h1 className="text-5xl font-bold tracking-tight text-forest">
          Team Members
        </h1>

        <p className="mt-3 text-lg text-taupe">
          Manage workspace members and control their access roles.
        </p>
      </div>


      <button
        onClick={onInvite}
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-forest text-champagne border border-forest-light
          px-6
          py-3
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-forest-light hover:text-white
          hover:shadow-xl
        "
      >
        <UserPlus size={20} />
        Invite Member
      </button>

    </div>
  );
}