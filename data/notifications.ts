// Notifications shown in the nav bell dropdown. Static placeholder — in
// production these come from Supabase (`notifications`), RLS-scoped to the founder.

export type NotificationKind = "invite" | "message" | "view" | "match";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  actorInitials?: string;
  actorColor?: string;
  text: string;
  emphasis?: string; // bolded actor name inside `text`
  time: string;
  href: string;
  read: boolean;
}

export const initialNotifications: AppNotification[] = [
  {
    id: "n1",
    kind: "invite",
    actorInitials: "VK",
    actorColor: "bg-emerald-600",
    emphasis: "Vikram Khanna",
    text: " invited you to connect",
    time: "1h ago",
    href: "/messages",
    read: false,
  },
  {
    id: "n2",
    kind: "message",
    actorInitials: "AK",
    actorColor: "bg-blue-500",
    emphasis: "Anand Krishnan",
    text: " sent you a message",
    time: "2h ago",
    href: "/messages",
    read: false,
  },
  {
    id: "n3",
    kind: "match",
    emphasis: "4 new matches",
    text: " are ready for you this week",
    time: "1d ago",
    href: "/matches",
    read: false,
  },
  {
    id: "n4",
    kind: "view",
    actorInitials: "PM",
    actorColor: "bg-orange-500",
    emphasis: "Priya Menon",
    text: " viewed your profile",
    time: "2d ago",
    href: "/profile",
    read: true,
  },
];
