export type WorkspaceStatus =
  | "Active"
  | "Archived"
  | "Inactive";

export interface Workspace {
  id: string;
  name: string;
  description: string;
  owner: string;
  members: number;
  projects: number;
  status: WorkspaceStatus;
  createdAt: string;
}