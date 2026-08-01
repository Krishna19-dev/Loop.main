export type TeamRole =
  | "Admin"
  | "Analyst"
  | "Viewer";

export type TeamStatus =
  | "Active"
  | "Inactive";

export interface TeamMember {
  id: string;

  name: string;

  email: string;

  workspace: string;

  role: TeamRole;

  status: TeamStatus;

  joinedAt: string;
}