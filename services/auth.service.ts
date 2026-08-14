import { User, Role } from "@/types/auth";

const SEED_USERS: User[] = [
  // 3 Original Demo Quick-Login Accounts
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

  // 10 Analyst Accounts (Indian Names & Distinct Passwords)
  {
    id: "an_1",
    name: "Arjun Sharma",
    email: "arjun.sharma@company.com",
    password: "Arjun@2026",
    role: "ANALYST",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "an_2",
    name: "Priya Patel",
    email: "priya.patel@company.com",
    password: "PriyaPass99",
    role: "ANALYST",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "an_3",
    name: "Rahul Verma",
    email: "rahul.verma@company.com",
    password: "Rahul#321",
    role: "ANALYST",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "an_4",
    name: "Neha Gupta",
    email: "neha.gupta@company.com",
    password: "Neha@loop88",
    role: "ANALYST",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "an_5",
    name: "Vikram Singh",
    email: "vikram.singh@company.com",
    password: "VikramS_99",
    role: "ANALYST",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "an_6",
    name: "Ananya Rao",
    email: "ananya.rao@company.com",
    password: "AnanyaPass1",
    role: "ANALYST",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "an_7",
    name: "Aditya Kapoor",
    email: "aditya.kapoor@company.com",
    password: "Aditya@2026",
    role: "ANALYST",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "an_8",
    name: "Kavya Joshi",
    email: "kavya.joshi@company.com",
    password: "KavyaLoop#7",
    role: "ANALYST",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "an_9",
    name: "Rohan Mehta",
    email: "rohan.mehta@company.com",
    password: "RohanM_432",
    role: "ANALYST",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "an_10",
    name: "Sneha Kulkarni",
    email: "sneha.kulkarni@company.com",
    password: "Sneha@pass55",
    role: "ANALYST",
    workspaceId: "ws_demo",
    status: "Active",
  },

  // 20 Viewer Accounts (Indian Names & Distinct Passwords)
  {
    id: "vw_1",
    name: "Siddharth Nair",
    email: "siddharth.nair@company.com",
    password: "SidNair#123",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_2",
    name: "Pooja Reddy",
    email: "pooja.reddy@company.com",
    password: "PoojaR_888",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_3",
    name: "Amitabh Saxena",
    email: "amitabh.saxena@company.com",
    password: "Amitabh@2026",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_4",
    name: "Ritu Sen",
    email: "ritu.sen@company.com",
    password: "RituPass#77",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_5",
    name: "Karan Malhotra",
    email: "karan.malhotra@company.com",
    password: "KaranM_321",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_6",
    name: "Meera Chopra",
    email: "meera.chopra@company.com",
    password: "Meera@loop99",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_7",
    name: "Rajesh Agarwal",
    email: "rajesh.agarwal@company.com",
    password: "RajeshPass0",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_8",
    name: "Divya Deshmukh",
    email: "divya.deshmukh@company.com",
    password: "DivyaD#2026",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_9",
    name: "Tarun Bhatia",
    email: "tarun.bhatia@company.com",
    password: "TarunB_101",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_10",
    name: "Ishita Bansal",
    email: "ishita.bansal@company.com",
    password: "IshitaPass7",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_11",
    name: "Manish Pandey",
    email: "manish.pandey@company.com",
    password: "ManishP#2026",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_12",
    name: "Swati Iyer",
    email: "swati.iyer@company.com",
    password: "SwatiPass88",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_13",
    name: "Varun Singhania",
    email: "varun.singhania@company.com",
    password: "VarunS_456",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_14",
    name: "Deepika Padukone",
    email: "deepika.p@company.com",
    password: "Deepika#loop7",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_15",
    name: "Alok Tripathi",
    email: "alok.tripathi@company.com",
    password: "AlokPass_99",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_16",
    name: "Tanvi Trivedi",
    email: "tanvi.trivedi@company.com",
    password: "TanviT_123",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_17",
    name: "Harish Varma",
    email: "harish.varma@company.com",
    password: "HarishV@2026",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_18",
    name: "Nisha Chawla",
    email: "nisha.chawla@company.com",
    password: "NishaC#321",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_19",
    name: "Gaurav Mukherjee",
    email: "gaurav.m@company.com",
    password: "GauravPass10",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
  {
    id: "vw_20",
    name: "Shruti Kadam",
    email: "shruti.kadam@company.com",
    password: "ShrutiK_777",
    role: "VIEWER",
    workspaceId: "ws_demo",
    status: "Active",
  },
];

class AuthService {
  private usersKey = "loop_users_v4";
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