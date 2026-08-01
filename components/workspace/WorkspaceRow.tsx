"use client";

import {
  Eye,
  Edit,
  Trash2,
  Users,
} from "lucide-react";

import { Workspace } from "@/types/workspace";
import WorkspaceStatusBadge from "./WorkspaceStatusBadge";

interface WorkspaceRowProps {
  workspace: Workspace;
  onView?: (workspace: Workspace) => void;
  onEdit?: (workspace: Workspace) => void;
  onDelete?: (workspace: Workspace) => void;
}

export default function WorkspaceRow({
  workspace,
  onView,
  onEdit,
  onDelete,
}: WorkspaceRowProps) {
  return (
    <tr className="border-b border-loop-border transition hover:bg-cream">

      {/* Workspace */}
      <td className="px-6 py-5">
        <div>
          <h3 className="font-semibold text-forest">
            {workspace.name}
          </h3>

          <p className="mt-1 text-sm text-taupe">
            {workspace.description}
          </p>
        </div>
      </td>

      {/* Owner */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-2 text-forest-light">
          <Users size={16} />
          {workspace.owner}
        </div>
      </td>

      {/* Members */}
      <td className="px-6 py-5 text-center font-medium text-forest-light">
        {workspace.members}
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <WorkspaceStatusBadge status={workspace.status} />
      </td>

      {/* Created */}
      <td className="px-6 py-5 text-taupe">
        {workspace.createdAt}
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-2">

          <button
            onClick={() => onView?.(workspace)}
            className="rounded-lg bg-sage-bg p-2 text-sage transition hover:bg-sage-bg"
            title="View Workspace"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onEdit?.(workspace)}
            className="rounded-lg bg-champagne-deep p-2 text-champagne-text transition hover:bg-amber-200"
            title="Edit Workspace"
          >
            <Edit size={18} />
          </button>

          <button
            onClick={() => onDelete?.(workspace)}
            className="rounded-lg bg-terra-bg p-2 text-terra transition hover:bg-red-200"
            title="Delete Workspace"
          >
            <Trash2 size={18} />
          </button>

        </div>
      </td>
    </tr>
  );
}