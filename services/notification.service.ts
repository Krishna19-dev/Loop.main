import { Role, User } from "@/types/auth";
import { NotificationItem, NotificationType } from "@/types/notification";

const INITIAL_NOTIFICATIONS: NotificationItem[] = [];

class NotificationService {
  private storageKey = "loop_notifications_v1";

  private getStoredNotifications(): NotificationItem[] {
    if (typeof window === "undefined") return INITIAL_NOTIFICATIONS;

    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      localStorage.setItem(this.storageKey, JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    }

    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  }

  private saveNotifications(notifications: NotificationItem[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.storageKey, JSON.stringify(notifications));
      // Dispatch custom window event so Navbar updates instantly across components!
      window.dispatchEvent(new Event("loop_notifications_updated"));
    }
  }

  notifyRole(
    workspaceId: string,
    role: Role,
    type: NotificationType,
    title: string,
    message: string
  ): NotificationItem {
    // SECURITY RULE: ADMIN must never be notified for admin-initiated actions!
    // (Only ANALYST_ACTIVITY and VIEWER_ACTIVITY send notifications to ADMIN)

    const list = this.getStoredNotifications();
    const newNotification: NotificationItem = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      workspaceId,
      targetRole: role,
      type,
      title,
      message,
      createdAt: "Just now",
      read: false,
    };

    const updated = [newNotification, ...list];
    this.saveNotifications(updated);
    return newNotification;
  }

  notifyUser(
    workspaceId: string,
    userId: string,
    type: NotificationType,
    title: string,
    message: string
  ): NotificationItem {
    const list = this.getStoredNotifications();
    const newNotification: NotificationItem = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      workspaceId,
      targetUserId: userId,
      type,
      title,
      message,
      createdAt: "Just now",
      read: false,
    };

    const updated = [newNotification, ...list];
    this.saveNotifications(updated);
    return newNotification;
  }

  getNotificationsForUser(user: User | null): NotificationItem[] {
    if (!user) return [];

    const all = this.getStoredNotifications();
    const userRoleUpper = user.role.toUpperCase();

    return all.filter((n) => {
      const matchWorkspace = !n.workspaceId || n.workspaceId === user.workspaceId || n.workspaceId === "ws_demo";
      
      // VIEWER RULE: Viewer must NEVER receive any broadcast notifications about Admin actions!
      if (userRoleUpper === "VIEWER" && n.targetUserId !== user.id) {
        return false;
      }

      // If notification is TEAM_MEMBER_ADDED about the user himself, exclude it (he gets WELCOME instead)
      if (n.type === "TEAM_MEMBER_ADDED" && n.message.startsWith(`${user.name} joined`)) {
        return false;
      }

      // Match by specific targetUserId OR targetRole
      const matchUser = n.targetUserId && n.targetUserId === user.id;
      const matchRole = n.targetRole && n.targetRole.toUpperCase() === userRoleUpper;

      return matchWorkspace && (matchUser || matchRole);
    });
  }

  markAllAsReadForUser(user: User | null): void {
    if (!user) return;
    const all = this.getStoredNotifications();
    const userRoleUpper = user.role.toUpperCase();

    const updated = all.map((n) => {
      const matchUser = n.targetUserId && n.targetUserId === user.id;
      const matchRole = n.targetRole && n.targetRole.toUpperCase() === userRoleUpper;

      if (matchUser || matchRole) {
        return { ...n, read: true };
      }
      return n;
    });

    this.saveNotifications(updated);
  }

  markAsRead(id: string): void {
    const all = this.getStoredNotifications();
    const updated = all.map((n) => (n.id === id ? { ...n, read: true } : n));
    this.saveNotifications(updated);
  }

  deleteNotification(id: string): void {
    const all = this.getStoredNotifications();
    const updated = all.filter((n) => n.id !== id);
    this.saveNotifications(updated);
  }
}

export const notificationService = new NotificationService();
