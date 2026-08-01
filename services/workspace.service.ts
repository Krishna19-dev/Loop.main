import { workspaces } from "@/data/workspaces";
import { Workspace } from "@/types/workspace";

class WorkspaceService {
  async getWorkspaces(): Promise<Workspace[]> {
    // Later:
    // const response = await fetch("/api/workspaces");
    // return response.json();

    return Promise.resolve([...workspaces]);
  }

  async getWorkspaceById(
    id: string
  ): Promise<Workspace | undefined> {
    // Later:
    // const response = await fetch(`/api/workspaces/${id}`);
    // return response.json();

    return Promise.resolve(
      workspaces.find(
        (workspace) => workspace.id === id
      )
    );
  }

  async createWorkspace(
    workspace: Omit<Workspace, "id" | "createdAt">
  ): Promise<Workspace> {
    // Later:
    // POST /api/workspaces

    const newWorkspace: Workspace = {
      ...workspace,
      id: crypto.randomUUID(),
      createdAt: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    workspaces.unshift(newWorkspace);

    return Promise.resolve(newWorkspace);
  }

  async updateWorkspace(
    id: string,
    updatedWorkspace: Partial<Workspace>
  ): Promise<Workspace | undefined> {
    // Later:
    // PUT /api/workspaces/:id

    const index = workspaces.findIndex(
      (workspace) => workspace.id === id
    );

    if (index === -1) {
      return Promise.resolve(undefined);
    }

    workspaces[index] = {
      ...workspaces[index],
      ...updatedWorkspace,
    };

    return Promise.resolve(workspaces[index]);
  }

  async deleteWorkspace(
    id: string
  ): Promise<boolean> {
    // Later:
    // DELETE /api/workspaces/:id

    const index = workspaces.findIndex(
      (workspace) => workspace.id === id
    );

    if (index !== -1) {
      workspaces.splice(index, 1);
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }
}

export const workspaceService =
  new WorkspaceService();