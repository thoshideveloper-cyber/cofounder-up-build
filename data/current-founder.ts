import type { FounderFitSignals } from "@/types";

// The signed-in founder. In production this comes from Supabase auth + the
// `founders` row, RLS-scoped to the current session. Kept static for now.
export interface CurrentFounder {
  name: string;
  firstName: string;
  initials: string;
  avatarColor: string; // tailwind bg class
  location: string;
  archetype: string;
  archetypeDetail: string;
  headline: string;
  bio: string;
  tags: string[];
  lookingFor: string;
  verified: boolean;
  signals: FounderFitSignals;
}

export const currentFounder: CurrentFounder = {
  name: "Riya Sharma",
  firstName: "Riya",
  initials: "RS",
  avatarColor: "bg-forest",
  location: "Bangalore",
  archetype: "Builder",
  archetypeDetail: "Frontend + Product",
  headline: "Product-minded frontend engineer building for Indian consumers",
  bio: "Six years shipping consumer products — most recently led the web app at a Series A logistics startup, from zero to 400k monthly users. I care about interfaces that feel obvious and teams that decide fast. Looking to start something of my own.",
  tags: ["Frontend", "Product", "Design", "Consumer"],
  lookingFor:
    "A technical or domain cofounder to explore consumer ideas with. I'm open on the problem space — conviction matters more to me than the exact idea. Full-time, ready now.",
  verified: false,
  signals: {
    founderType: ["High Conviction", "Ship & Iterate", "Straight Talker"],
    riskAppetite: { code: "HC", label: "High conviction" },
    decisionSpeed: { code: "SI", label: "Fast, iterative" },
    communicationStyle: { code: "ST", label: "Direct" },
    ideaCommitment: "Open to evolving",
    workingCommitment: { code: "CB", label: "Full-time, ready now" },
  },
};

// Lightweight activity + profile state for the home feed. Also placeholder.
export interface ActivityItem {
  id: string;
  actorInitials: string;
  actorColor: string;
  text: string;
  emphasis: string; // the actor's name, bolded in the row
  meta: string; // status or timestamp
}

export const recentActivity: ActivityItem[] = [
  {
    id: "act-1",
    actorInitials: "AK",
    actorColor: "bg-blue-500",
    text: " viewed your profile",
    emphasis: "Anand Krishnan",
    meta: "2 hours ago",
  },
  {
    id: "act-2",
    actorInitials: "PM",
    actorColor: "bg-orange-500",
    text: " hasn't replied to your invite yet",
    emphasis: "Priya Menon",
    meta: "Sent yesterday",
  },
  {
    id: "act-3",
    actorInitials: "VK",
    actorColor: "bg-emerald-600",
    text: " saved your profile",
    emphasis: "Vikram Khanna",
    meta: "2 days ago",
  },
];

export interface ProfileTask {
  id: string;
  label: string;
  done: boolean;
}

export const profileTasks: ProfileTask[] = [
  { id: "signals", label: "Founder Fit Signals", done: true },
  { id: "basics", label: "Photo & short bio", done: true },
  { id: "onepager", label: "Idea one-pager", done: false },
  { id: "verify", label: "Verify identity for the Verified badge", done: false },
];
