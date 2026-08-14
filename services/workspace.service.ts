import { workspaces as SEED_WORKSPACES } from "@/data/workspaces";
import { Workspace } from "@/types/workspace";

class WorkspaceService {
  private storageKey = "loop_workspaces_v4";

  private getStoredWorkspaces(): Workspace[] {
    if (typeof window === "undefined") return SEED_WORKSPACES;

    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      localStorage.setItem(this.storageKey, JSON.stringify(SEED_WORKSPACES));
      return SEED_WORKSPACES;
    }

    try {
      return JSON.parse(stored);
    } catch {
      return SEED_WORKSPACES;
    }
  }

  private saveWorkspaces(list: Workspace[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.storageKey, JSON.stringify(list));
    }
  }

  async getWorkspaces(): Promise<Workspace[]> {
    return Promise.resolve(this.getStoredWorkspaces());
  }

  async getWorkspaceById(id: string): Promise<Workspace | undefined> {
    const list = this.getStoredWorkspaces();
    return Promise.resolve(list.find((w) => w.id === id));
  }

  async createWorkspace(
    workspace: Omit<Workspace, "id" | "createdAt">
  ): Promise<Workspace> {
    const list = this.getStoredWorkspaces();
    const newWorkspace: Workspace = {
      ...workspace,
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      createdAt: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    const updated = [newWorkspace, ...list];
    this.saveWorkspaces(updated);
    return Promise.resolve(newWorkspace);
  }

  async updateWorkspace(
    id: string,
    updatedWorkspace: Partial<Workspace>
  ): Promise<Workspace | undefined> {
    const list = this.getStoredWorkspaces();
    const index = list.findIndex((w) => w.id === id);

    if (index === -1) {
      return Promise.resolve(undefined);
    }

    list[index] = {
      ...list[index],
      ...updatedWorkspace,
    };

    this.saveWorkspaces(list);
    return Promise.resolve(list[index]);
  }

  async deleteWorkspace(id: string): Promise<boolean> {
    const list = this.getStoredWorkspaces();
    const filtered = list.filter((w) => w.id !== id);

    if (filtered.length !== list.length) {
      this.saveWorkspaces(filtered);
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }
}

export const workspaceService = new WorkspaceService();