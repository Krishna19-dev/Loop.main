"use client";

import {
  Eye,
  Edit,
  Trash2,
  Mail,
} from "lucide-react";

import { TeamMember } from "@/types/team";
import RoleBadge from "./RoleBadge";

interface TeamRowProps {
  member: TeamMember;
  onView?: (member: TeamMember) => void;
  onEdit?: (member: TeamMember) => void;
  onDelete?: (member: TeamMember) => void;
}

export default function TeamRow({
  member,
  onView,
  onEdit,
  onDelete,
}: TeamRowProps) {
  return (
    <tr className="border-b border-loop-border transition hover:bg-cream">

      {/* Member */}

      <td className="px-6 py-5">
        <div>
          <h3 className="font-semibold text-forest">
            {member.name}
          </h3>

          <div className="mt-1 flex items-center gap-2 text-sm text-taupe">
            <Mail size={14} />
            {member.email}
          </div>
        </div>
      </td>

      {/* Workspace */}

      <td className="px-6 py-5 text-forest-light">
        {member.workspace}
      </td>

      {/* Role */}

      <td className="px-6 py-5">
        <RoleBadge role={member.role} />
      </td>

      {/* Status */}

      <td className="px-6 py-5">
        <span
          className={
            member.status === "Active"
              ? "rounded-full bg-sage-bg px-3 py-1 text-xs font-semibold text-sage"
              : "rounded-full bg-terra-bg px-3 py-1 text-xs font-semibold text-terra"
          }
        >
          {member.status}
        </span>
      </td>

      {/* Joined */}

      <td className="px-6 py-5 text-taupe">
        {member.joinedAt}
      </td>

      {/* Actions */}

      <td className="px-6 py-5">
        <div className="flex items-center gap-2">

          <button
            onClick={() => onView?.(member)}
            className="rounded-lg bg-sage-bg p-2 text-sage transition hover:bg-sage-bg"
            title="View"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onEdit?.(member)}
            className="rounded-lg bg-champagne-deep p-2 text-champagne-text transition hover:bg-amber-200"
            title="Edit"
          >
            <Edit size={18} />
          </button>

          <button
            onClick={() => onDelete?.(member)}
            className="rounded-lg bg-terra-bg p-2 text-terra transition hover:bg-red-200"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>

        </div>
      </td>

    </tr>
  );
}