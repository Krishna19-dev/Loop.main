"use client";

import { Workspace } from "@/types/workspace";
import WorkspaceRow from "./WorkspaceRow";

interface WorkspaceTableProps {
  workspaces: Workspace[];
  onView?: (workspace: Workspace) => void;
  onEdit?: (workspace: Workspace) => void;
  onDelete?: (workspace: Workspace) => void;
}

export default function WorkspaceTable({
  workspaces,
  onView,
  onEdit,
  onDelete,
}: WorkspaceTableProps) {
  if (workspaces.length === 0) {
    return (
      <div className="rounded-2xl border border-loop-border bg-white p-10 text-center shadow-sm">
        <h3 className="text-xl font-semibold text-forest">
          No workspaces found
        </h3>

        <p className="mt-2 text-taupe">
          Create your first workspace to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-loop-border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-cream">
          <tr className="text-left text-sm font-semibold text-slate-600">
            <th className="px-6 py-4">Workspace</th>
            <th className="px-6 py-4">Owner</th>
            <th className="px-6 py-4 text-center">Members</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Created</th>
            <th className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {workspaces.map((workspace, index) => (
            <WorkspaceRow
              key={`${workspace.id}-${index}`}
              workspace={workspace}
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