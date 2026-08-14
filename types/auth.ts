export type Role = "ADMIN" | "ANALYST" | "VIEWER";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  workspaceId: string;
  status?: "Active" | "Inactive";
  hasSeenWelcome?: boolean;
}

export interface Workspace {
  id: string;
  name: string;
  createdAt: string;
}