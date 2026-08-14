import { User, Role } from "@/types/auth";

const SEED_USERS: User[] = [
  // 3 Core Demo Quick-Login Accounts
  {
    id: "1",
    name: "Admin User",
    email: "admin@demo.com",
    password: "password123",
    role: "ADMIN",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "2",
    name: "Analyst User",
    email: "analyst@demo.com",
    password: "password123",
    role: "ANALYST",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "3",
    name: "Viewer User",
    email: "viewer@demo.com",
    password: "password123",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
];

class AuthService {
  private usersKey = "loop_users_v5";
  private storageKey = "loop_current_user";

  private getUsers(): User[] {
    if (typeof window === "undefined") return SEED_USERS;

    const storedUsers = localStorage.getItem(this.usersKey);
    if (!storedUsers) {
      localStorage.setItem(this.usersKey, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }

    return JSON.parse(storedUsers);
  }

  private saveUsers(users: User[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.usersKey, JSON.stringify(users));
    }
  }

  adminExists(): boolean {
    const users = this.getUsers();
    return users.some((user) => user.role === "ADMIN");
  }

  register(name: string, email: string, password: string): User {
    const users = this.getUsers();

    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("User with this email already exists.");
    }

    const admin: User = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      name,
      email,
      password,
      role: "ADMIN",
      workspaceId: `ws_${Date.now()}`,
      status: "Active",
    };

    users.push(admin);
    this.saveUsers(users);
    return admin;
  }

  login(email: string, password: string): User {
    const users = this.getUsers();

    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }

    return user;
  }

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.storageKey);
    }
  }

  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null;

    const stored = localStorage.getItem(this.storageKey);
    if (!stored) return null;

    return JSON.parse(stored);
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  getRole(): Role | null {
    const user = this.getCurrentUser();
    return user?.role ?? null;
  }

  getAllUsers(): User[] {
    return this.getUsers();
  }

  createUser(name: string, email: string, password: string, role: Role): User {
    const users = this.getUsers();

    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("User already exists.");
    }

    const currentUser = this.getCurrentUser();

    const newUser: User = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      name,
      email,
      password,
      role,
      workspaceId: currentUser?.workspaceId || "ws_demo",
      status: "Active",
    };

    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  deleteUser(id: string): boolean {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      this.saveUsers(users);
      return true;
    }
    return false;
  }
}

export const authService = new AuthService();