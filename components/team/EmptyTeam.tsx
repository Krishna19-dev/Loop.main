"use client";

import { UserPlus, Users } from "lucide-react";

interface EmptyTeamProps {
  onInvite?: () => void;
}

export default function EmptyTeam({
  onInvite,
}: EmptyTeamProps) {
  return (
    <div className="rounded-2xl border border-dashed border-loop-border bg-white p-16 shadow-sm">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100">
          <Users
            size={40}
            className="text-blue-600"
          />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-forest">
          No Team Members
        </h2>

        <p className="mt-3 text-lg leading-7 text-taupe">
          Your workspace doesn&apos;t have any members yet.
          Invite your first team member to start
          collaborating.
        </p>

        <button
          onClick={onInvite}
          className="
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-forest text-champagne border border-forest-light
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-forest-light hover:text-white
          "
        >
          <UserPlus size={18} />
          Invite Member
        </button>
      </div>
    </div>
  );
}