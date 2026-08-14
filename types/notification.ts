import { Role } from "@/types/auth";

export type NotificationType =
  | "TEAM_MEMBER_ADDED"
  | "ROLE_CHANGED"
  | "THEME_SETTINGS_CHANGED"
  | "ANALYST_ACTIVITY"
  | "VIEWER_ACTIVITY"
  | "WELCOME";

export interface NotificationItem {
  id: string;
  workspaceId: string;
  targetRole?: Role;
  targetUserId?: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}
