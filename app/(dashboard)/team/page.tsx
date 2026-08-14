"use client";

import { useEffect, useMemo, useState } from "react";

import TeamHeader from "@/components/team/TeamHeader";
import TeamCards from "@/components/team/TeamCards";
import TeamFilters from "@/components/team/TeamFilters";
import TeamTable from "@/components/team/TeamTable";
import TeamPagination from "@/components/team/TeamPagination";
import EmptyTeam from "@/components/team/EmptyTeam";
import InviteMemberModal from "@/components/team/InviteMemberModal";
import ViewMemberModal from "@/components/team/ViewMemberModal";
import EditMemberModal from "@/components/team/EditMemberModal";

import { TeamMember } from "@/types/team";
import { teamService } from "@/services/team.service";
import { authService } from "@/services/auth.service";
import { notificationService } from "@/services/notification.service";

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    async function loadMembers() {
      const data = await teamService.getMembers();
      setMembers(data);
    }

    loadMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        member.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        member.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesRole =
        !role || member.role === role;

      const matchesStatus =
        !status || member.status === status;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [members, search, role, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMembers.length / pageSize)
  );

  const paginatedMembers =
    filteredMembers.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

  async function handleCreate(data: {
    name: string;
    email: string;
    password?: string;
    workspace: string;
    role: "Admin" | "Analyst" | "Viewer";
  }) {
    const tempPassword = data.password || "password123";

    // 1. Create record in team table
    const newMember = await teamService.createMember({
      name: data.name,
      email: data.email,
      workspace: data.workspace,
      role: data.role,
      status: "Active",
    });

    // 2. Register account credentials in authService so user can sign in at /login
    try {
      const authRole = data.role.toUpperCase() as "ANALYST" | "VIEWER" | "ADMIN";
      authService.createUser(
        data.name,
        data.email,
        tempPassword,
        authRole
      );
    } catch (err) {
      console.log("Auth user creation note:", err);
    }

    // Trigger Notifications for Admin, Analyst, and New User
    const currentUser = authService.getCurrentUser();
    const workspaceId = currentUser?.workspaceId || "ws_demo";

    // 1. Notify Analyst role
    notificationService.notifyRole(
      workspaceId,
      "ANALYST",
      "TEAM_MEMBER_ADDED",
      "New team member added",
      `${newMember.name} joined as ${newMember.role}`
    );

    // 2. Notify Admin confirmation
    notificationService.notifyRole(
      workspaceId,
      "ADMIN",
      "TEAM_MEMBER_ADDED",
      "Team member added",
      `Added ${newMember.name} as ${newMember.role}`
    );

    // 3. Separately notify the new user with a welcome message
    notificationService.notifyUser(
      workspaceId,
      newMember.id,
      "WELCOME",
      "Welcome to LOOP!",
      "Your account is ready — explore feedback, themes, and Ask LOOP."
    );

    setMembers((prev) => [
      newMember,
      ...prev,
    ]);
  }

  function handleView(member: TeamMember) {
    setSelectedMember(member);
    setViewModalOpen(true);
  }

  function handleEdit(member: TeamMember) {
    setSelectedMember(member);
    setEditModalOpen(true);
  }

  async function handleUpdateMember(id: string, updatedData: Partial<TeamMember>) {
    const updated = await teamService.updateMember(id, updatedData);
    if (updated) {
      setMembers((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
      );

      // Trigger Notifications for Admin, Analyst, and Affected User on member edit
      const currentUser = authService.getCurrentUser();
      const workspaceId = currentUser?.workspaceId || "ws_demo";

      if (updatedData.role) {
        // 1. Notify Analyst role
        notificationService.notifyRole(
          workspaceId,
          "ANALYST",
          "ROLE_CHANGED",
          "Team role updated",
          `${updated.name}'s role changed to ${updatedData.role}`
        );

        // 2. Notify Admin confirmation
        notificationService.notifyRole(
          workspaceId,
          "ADMIN",
          "ROLE_CHANGED",
          "Member role updated",
          `Updated ${updated.name}'s role to ${updatedData.role}`
        );

        // 3. Notify the affected user specifically
        notificationService.notifyUser(
          workspaceId,
          id,
          "ROLE_CHANGED",
          "Your role changed",
          `Your role is now ${updatedData.role}`
        );
      } else {
        // Notify Admin for general profile edit
        notificationService.notifyRole(
          workspaceId,
          "ADMIN",
          "TEAM_MEMBER_ADDED",
          "Member details updated",
          `Updated information for ${updated.name}`
        );
      }
    }
  }

  async function handleDelete(member: TeamMember) {
    await teamService.deleteMember(member.id);
    authService.deleteUser(member.id);

    setMembers((prev) =>
      prev.filter((item) => item.id !== member.id)
    );
    if (selectedMember?.id === member.id) {
      setSelectedMember(null);
      setViewModalOpen(false);
      setEditModalOpen(false);
    }
  }

  return (
    <>
      <div className="space-y-8">
        <TeamHeader
          onInvite={() => setModalOpen(true)}
        />

        <TeamCards
          members={members}
        />

        <TeamFilters
          search={search}
          onSearchChange={setSearch}
          role={role}
          onRoleChange={setRole}
          status={status}
          onStatusChange={setStatus}
          onInvite={() => setModalOpen(true)}
        />

        {filteredMembers.length === 0 ? (
          <EmptyTeam
            onInvite={() => setModalOpen(true)}
          />
        ) : (
          <>
            <TeamTable
              members={paginatedMembers}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <TeamPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredMembers.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      <InviteMemberModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />

      <ViewMemberModal
        member={selectedMember}
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedMember(null);
        }}
        onEdit={handleEdit}
      />

      <EditMemberModal
        member={selectedMember}
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedMember(null);
        }}
        onUpdate={handleUpdateMember}
      />
    </>
  );
}