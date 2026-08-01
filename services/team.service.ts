import { teamMembers as SEED_TEAM } from "@/data/team";
import { TeamMember } from "@/types/team";

class TeamService {
  private storageKey = "loop_team_members";

  private getStoredMembers(): TeamMember[] {
    if (typeof window === "undefined") return SEED_TEAM;

    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      localStorage.setItem(this.storageKey, JSON.stringify(SEED_TEAM));
      return SEED_TEAM;
    }

    return JSON.parse(stored);
  }

  private saveMembers(members: TeamMember[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.storageKey, JSON.stringify(members));
    }
  }

  async getMembers(): Promise<TeamMember[]> {
    return Promise.resolve(this.getStoredMembers());
  }

  async getMemberById(id: string): Promise<TeamMember | undefined> {
    const members = this.getStoredMembers();
    return Promise.resolve(members.find((member) => member.id === id));
  }

  async createMember(
    member: Omit<TeamMember, "id" | "joinedAt">
  ): Promise<TeamMember> {
    const members = this.getStoredMembers();

    const newMember: TeamMember = {
      ...member,
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      joinedAt: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    members.unshift(newMember);
    this.saveMembers(members);

    return Promise.resolve(newMember);
  }

  async updateMember(
    id: string,
    updatedMember: Partial<TeamMember>
  ): Promise<TeamMember | undefined> {
    const members = this.getStoredMembers();
    const index = members.findIndex((member) => member.id === id);

    if (index === -1) {
      return Promise.resolve(undefined);
    }

    members[index] = {
      ...members[index],
      ...updatedMember,
    };

    this.saveMembers(members);
    return Promise.resolve(members[index]);
  }

  async deleteMember(id: string): Promise<boolean> {
    const members = this.getStoredMembers();
    const index = members.findIndex((member) => member.id === id);

    if (index !== -1) {
      members.splice(index, 1);
      this.saveMembers(members);
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }
}

export const teamService = new TeamService();