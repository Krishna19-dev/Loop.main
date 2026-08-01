export type Role = "ADMIN" | "ANALYST" | "VIEWER";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  workspaceId: string;
  status?: "Active" | "Inactive";
}

export interface Workspace {
  id: string;
  name: string;
  createdAt: string;
}