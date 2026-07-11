// Message threads for the Messages page. Each conversation is tied to a match
// in dummy-matches.ts by `matchId`. Static placeholder — in production this
// comes from Supabase (`conversations` + `messages`), RLS-scoped to the founder.

export type ConversationStatus = "active" | "invite-sent" | "invite-received";

export interface ChatMessage {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  matchId: string; // -> dummyMatches[].id
  status: ConversationStatus;
  lastActive: string;
  unread: number;
  messages: ChatMessage[];
}

export const conversations: Conversation[] = [
  {
    id: "c-anand",
    matchId: "anand-krishnan",
    status: "active",
    lastActive: "2h",
    unread: 2,
    messages: [
      {
        id: "m1",
        from: "me",
        text: "Hey Anand — your fraud-detection work is right in the space I keep circling back to. You ship fast and decide quickly; how do you handle a call that needs making before everyone's aligned?",
        time: "Mon 10:12",
      },
      {
        id: "m2",
        from: "them",
        text: "Straight answer: I make the call, write down why, and reopen it if the data moves. I'd rather be wrong fast than stuck. Sounds like we'd get along there.",
        time: "Mon 10:41",
      },
      {
        id: "m3",
        from: "them",
        text: "What are you building toward right now?",
        time: "Mon 10:42",
      },
    ],
  },
  {
    id: "c-vikram",
    matchId: "vikram-khanna",
    status: "invite-received",
    lastActive: "1d",
    unread: 1,
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Riya — I've got a fintech idea already in motion and I'm looking for a builder who thinks in product. Your profile fits. Open to a call this week?",
        time: "Yesterday 18:03",
      },
    ],
  },
  {
    id: "c-priya",
    matchId: "priya-menon",
    status: "invite-sent",
    lastActive: "1d",
    unread: 0,
    messages: [
      {
        id: "m1",
        from: "me",
        text: "Hi Priya — you're firm on your idea direction, which I like. How much room would a technical cofounder have to shape the product itself?",
        time: "Yesterday 09:20",
      },
    ],
  },
  {
    id: "c-sneha",
    matchId: "sneha-nair",
    status: "active",
    lastActive: "3d",
    unread: 0,
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Loved your take on obvious interfaces. No fixed idea on my side yet — what problem space has your attention lately?",
        time: "Fri 14:30",
      },
      {
        id: "m2",
        from: "me",
        text: "Mostly everyday consumer money habits — the boring stuff people never get around to. Want to swap notes over coffee next week?",
        time: "Fri 15:02",
      },
    ],
  },
];
