"use client";

import { useEffect, useMemo, useState } from "react";

import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";
import WorkspaceCards from "@/components/workspace/WorkspaceCards";
import WorkspaceFilters from "@/components/workspace/WorkspaceFilters";
import WorkspaceTable from "@/components/workspace/WorkspaceTable";
import WorkspacePagination from "@/components/workspace/WorkspacePagination";
import EmptyWorkspace from "@/components/workspace/EmptyWorkspace";
import CreateWorkspaceModal from "@/components/workspace/CreateWorkspaceModal";

import { Workspace } from "@/types/workspace";
import { workspaceService } from "@/services/workspace.service";

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    async function loadWorkspaces() {
      const data = await workspaceService.getWorkspaces();
      setWorkspaces(data);
    }

    loadWorkspaces();
  }, []);

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

  async function handleCreate(data: {
    name: string;
    description: string;
    owner: string;
  }) {
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
    setModalOpen(false);
  }

  async function handleDelete(
    workspace: Workspace
  ) {
    await workspaceService.deleteWorkspace(
      workspace.id
    );

    setWorkspaces((prev) =>
      prev.filter(
        (item) => item.id !== workspace.id
      )
    );
  }

  return (
    <>
      <div className="space-y-8">
        <WorkspaceHeader
          onCreate={() => setModalOpen(true)}
        />

        <WorkspaceCards
          workspaces={workspaces}
        />

        <WorkspaceFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          onCreate={() => setModalOpen(true)}
        />

        {filteredWorkspaces.length === 0 ? (
          <EmptyWorkspace
            onCreate={() => setModalOpen(true)}
          />
        ) : (
          <>
            <WorkspaceTable
              workspaces={paginatedWorkspaces}
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

      <CreateWorkspaceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </>
  );
}