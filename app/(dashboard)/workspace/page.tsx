"use client";

import { useEffect, useMemo, useState } from "react";

import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";
import WorkspaceCards from "@/components/workspace/WorkspaceCards";
import WorkspaceFilters from "@/components/workspace/WorkspaceFilters";
import WorkspaceTable from "@/components/workspace/WorkspaceTable";
import WorkspacePagination from "@/components/workspace/WorkspacePagination";
import EmptyWorkspace from "@/components/workspace/EmptyWorkspace";
import CreateWorkspaceModal from "@/components/workspace/CreateWorkspaceModal";
import ViewWorkspaceModal from "@/components/workspace/ViewWorkspaceModal";
import EditWorkspaceModal from "@/components/workspace/EditWorkspaceModal";
import AdminOnlyModal from "@/components/workspace/AdminOnlyModal";

import { Workspace } from "@/types/workspace";
import { workspaceService } from "@/services/workspace.service";
import { authService } from "@/services/auth.service";

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewingWorkspace, setViewingWorkspace] = useState<Workspace | null>(null);
  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(null);
  const [accessDeniedOpen, setAccessDeniedOpen] = useState(false);

  const [currentUserRole, setCurrentUserRole] = useState<string>("ADMIN");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    async function loadWorkspaces() {
      const data = await workspaceService.getWorkspaces();
      setWorkspaces(data);
    }

    const user = authService.getCurrentUser();
    if (user?.role) {
      setCurrentUserRole(user.role);
    }

    loadWorkspaces();
  }, []);

  const isAdmin = currentUserRole.toUpperCase() === "ADMIN";

  const filteredWorkspaces = useMemo(() => {
    return workspaces.filter((workspace) => {
      const matchesSearch =
        workspace.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        workspace.owner
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        !status || workspace.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [workspaces, search, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredWorkspaces.length / pageSize)
  );

  const paginatedWorkspaces = filteredWorkspaces.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function handleOpenCreate() {
    if (!isAdmin) {
      setAccessDeniedOpen(true);
      return;
    }
    setCreateModalOpen(true);
  }

  async function handleCreate(data: {
    name: string;
    description: string;
    owner: string;
  }) {
    if (!isAdmin) {
      setAccessDeniedOpen(true);
      return;
    }

    await workspaceService.createWorkspace({
      name: data.name,
      description: data.description,
      owner: data.owner,
      members: 1,
      projects: 0,
      status: "Active",
    });

    const updated = await workspaceService.getWorkspaces();
    setWorkspaces(updated);
    setCreateModalOpen(false);
  }

  function handleView(workspace: Workspace) {
    setViewingWorkspace(workspace);
  }

  function handleEdit(workspace: Workspace) {
    if (!isAdmin) {
      setAccessDeniedOpen(true);
      return;
    }
    setEditingWorkspace(workspace);
  }

  async function handleSaveEdit(id: string, updatedData: Partial<Workspace>) {
    if (!isAdmin) {
      setAccessDeniedOpen(true);
      return;
    }

    await workspaceService.updateWorkspace(id, updatedData);
    const updatedList = await workspaceService.getWorkspaces();
    setWorkspaces(updatedList);
    setEditingWorkspace(null);
  }

  async function handleDelete(workspace: Workspace) {
    if (!isAdmin) {
      setAccessDeniedOpen(true);
      return;
    }

    await workspaceService.deleteWorkspace(workspace.id);

    setWorkspaces((prev) =>
      prev.filter((item) => item.id !== workspace.id)
    );
  }

  return (
    <>
      <div className="space-y-8">
        <WorkspaceHeader
          onCreate={handleOpenCreate}
        />

        <WorkspaceCards
          workspaces={workspaces}
        />

        <WorkspaceFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          onCreate={handleOpenCreate}
        />

        {filteredWorkspaces.length === 0 ? (
          <EmptyWorkspace
            onCreate={handleOpenCreate}
          />
        ) : (
          <>
            <WorkspaceTable
              workspaces={paginatedWorkspaces}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <WorkspacePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredWorkspaces.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      {/* Create Workspace Modal */}
      <CreateWorkspaceModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreate}
      />

      {/* View Workspace Details Modal */}
      <ViewWorkspaceModal
        open={Boolean(viewingWorkspace)}
        workspace={viewingWorkspace}
        onClose={() => setViewingWorkspace(null)}
        onEdit={(ws) => {
          setViewingWorkspace(null);
          handleEdit(ws);
        }}
      />

      {/* Edit Workspace Settings Modal (Admin Only) */}
      <EditWorkspaceModal
        open={Boolean(editingWorkspace)}
        workspace={editingWorkspace}
        onClose={() => setEditingWorkspace(null)}
        onSave={handleSaveEdit}
      />

      {/* Access Denied Alert Modal for Non-Admins (Analyst & Viewer) */}
      <AdminOnlyModal
        open={accessDeniedOpen}
        userRole={currentUserRole}
        onClose={() => setAccessDeniedOpen(false)}
      />
    </>
  );
}