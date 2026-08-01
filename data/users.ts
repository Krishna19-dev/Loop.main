import { User } from "@/types/auth";

export const users: User[] = [
  {
    id: "1",
    name: "Huzaif",
    email: "admin@loop.com",
    password: "123456",
    role: "ADMIN",
    workspaceId: "ws_loop",
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah",
    email: "analyst@loop.com",
    password: "123456",
    role: "ANALYST",
    workspaceId: "ws_loop",
    status: "Active",
  },
  {
    id: "3",
    name: "John",
    email: "viewer@loop.com",
    password: "123456",
    role: "VIEWER",
    workspaceId: "ws_loop",
    status: "Active",
  },
];