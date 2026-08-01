"use client";

import { TeamMember } from "@/types/team";
import TeamRow from "./TeamRow";

interface TeamTableProps {
  members: TeamMember[];
  onView?: (member: TeamMember) => void;
  onEdit?: (member: TeamMember) => void;
  onDelete?: (member: TeamMember) => void;
}

export default function TeamTable({
  members,
  onView,
  onEdit,
  onDelete,
}: TeamTableProps) {
  if (members.length === 0) {
    return (
      <div className="rounded-2xl border border-loop-border bg-white p-10 text-center shadow-sm">
        <h3 className="text-xl font-semibold text-forest">
          No team members found
        </h3>

        <p className="mt-2 text-taupe">
          Invite your first team member to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-loop-border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-cream">
          <tr className="text-left text-sm font-semibold text-slate-600">
            <th className="px-6 py-4">Member</th>
            <th className="px-6 py-4">Workspace</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Joined</th>
            <th className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <TeamRow
              key={member.id}
              member={member}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}