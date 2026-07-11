"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, Send, Check, X, Sparkles } from "lucide-react";
import { MatchDetailDrawer } from "@/components/matches/MatchDetailDrawer";
import { dummyMatches } from "@/data/dummy-matches";
import { conversations, type Conversation } from "@/data/conversations";

function matchFor(matchId: string) {
  return dummyMatches.find((m) => m.id === matchId)!;
}

const STATUS_PILL: Record<Conversation["status"], { label: string; className: string } | null> = {
  active: null,
  "invite-sent": {
    label: "Awaiting reply",
    className: "bg-amber-50 text-amber-700",
  },
  "invite-received": {
    label: "Invited you",
    className: "bg-pale text-forest",
  },
};

export default function MessagesPage() {
  const [activeId, setActiveId] = useState<string | null>(conversations[0]?.id ?? null);
  const [draft, setDraft] = useState("");
  const [signalsMatchId, setSignalsMatchId] = useState<string | null>(null);

  const active = conversations.find((c) => c.id === activeId) ?? null;
  const activeMatch = active ? matchFor(active.matchId) : null;
  const signalsMatch = dummyMatches.find((m) => m.id === signalsMatchId) ?? null;

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim() || !active) return;
    // TODO: wire to Supabase — insert into `messages`, RLS-scoped to this conversation
    console.log("Send to", active.matchId, ":", draft.trim());
    setDraft("");
  }

  return (
    <div className="h-[calc(100vh-69px)] min-h-[520px] bg-page-bg">
      <div className="reveal mx-auto flex h-full max-w-6xl flex-col px-6 py-6">
        <div className="flex flex-1 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
          {/* Conversation list */}
          <aside
            className={`w-full flex-col border-r border-border md:flex md:w-80 lg:w-96 ${
              activeId ? "hidden md:flex" : "flex"
            }`}
          >
            <div className="border-b border-border px-5 py-4">
              <h1 className="text-lg font-semibold text-ink">Messages</h1>
              <p className="text-sm text-slate">Conversations with your matches.</p>
            </div>

            <ul className="flex-1 overflow-y-auto">
              {conversations.map((convo) => {
                const match = matchFor(convo.matchId);
                const last = convo.messages[convo.messages.length - 1];
                const isActive = convo.id === activeId;
                const pill = STATUS_PILL[convo.status];
                return (
                  <li key={convo.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(convo.id)}
                      className={`flex w-full items-start gap-3 border-b border-border-soft px-5 py-4 text-left transition-colors ${
                        isActive ? "bg-pale/60" : "hover:bg-warm"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${match.avatarColor}`}
                      >
                        {match.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-sm font-semibold text-ink">
                            {match.name}
                          </span>
                          <span className="shrink-0 text-xs text-slate-light">
                            {convo.lastActive}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-sm text-slate">
                          {last.from === "me" && <span className="text-slate-light">You: </span>}
                          {last.text}
                        </p>
                        {pill && (
                          <span
                            className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${pill.className}`}
                          >
                            {pill.label}
                          </span>
                        )}
                      </div>
                      {convo.unread > 0 && !isActive && (
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-forest" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Active thread */}
          <section
            className={`flex-1 flex-col ${activeId ? "flex" : "hidden md:flex"}`}
          >
            {active && activeMatch ? (
              <>
                {/* Thread header */}
                <div className="flex items-center gap-3 border-b border-border px-5 py-3">
                  <button
                    type="button"
                    onClick={() => setActiveId(null)}
                    aria-label="Back to conversations"
                    className="-ml-1 flex h-8 w-8 items-center justify-center rounded-full text-slate hover:bg-warm md:hidden"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${activeMatch.avatarColor}`}
                  >
                    {activeMatch.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{activeMatch.name}</p>
                    <p className="truncate text-xs text-slate">
                      {activeMatch.location} &middot; {activeMatch.archetype} &middot;{" "}
                      {activeMatch.archetypeDetail}
                    </p>
                  </div>
                  <span className="hidden shrink-0 items-center gap-1 text-sm font-medium text-forest sm:flex">
                    <Zap className="h-4 w-4" />
                    {activeMatch.fitScore}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setSignalsMatchId(activeMatch.id)}
                    className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-warm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                  >
                    Fit signals
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto bg-warm px-5 py-6">
                  {active.status === "invite-received" && (
                    <InviteBanner name={activeMatch.name.split(" ")[0]} />
                  )}

                  {active.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="max-w-[78%]">
                        <div
                          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                            msg.from === "me"
                              ? "rounded-br-sm border border-emerald/40 bg-gradient-to-br from-pale to-emerald/25 text-ink"
                              : "rounded-bl-sm border border-border bg-white text-ink"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <p
                          className={`mt-1 text-[11px] text-slate-light ${
                            msg.from === "me" ? "text-right" : "text-left"
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}

                  {active.status === "invite-sent" && (
                    <p className="pt-1 text-center text-xs text-slate">
                      Invite sent &middot; waiting for {activeMatch.name.split(" ")[0]} to reply
                    </p>
                  )}
                </div>

                {/* Composer */}
                <form
                  onSubmit={handleSend}
                  className="flex items-center gap-3 border-t border-border px-5 py-4"
                >
                  <input
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={`Message ${activeMatch.name.split(" ")[0]}…`}
                    className="flex-1 rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-light focus:border-forest focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!draft.trim()}
                    className="flex items-center gap-1.5 rounded-lg bg-forest px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest/90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pale text-forest">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-medium text-ink">Choose a conversation</p>
                <p className="mt-1 max-w-xs text-sm text-slate">
                  Pick a match on the left to pick the thread back up.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>

      <MatchDetailDrawer match={signalsMatch} onClose={() => setSignalsMatchId(null)} />
    </div>
  );
}

function InviteBanner({ name }: { name: string }) {
  return (
    <div className="rounded-xl border border-pale bg-pale/60 p-4">
      <p className="text-sm text-ink">
        <span className="font-semibold">{name}</span> invited you to connect. Reply below, or:
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => console.log("Accept invite")}
          className="flex items-center gap-1.5 rounded-lg bg-forest px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-forest/90"
        >
          <Check className="h-4 w-4" />
          Accept
        </button>
        <button
          type="button"
          onClick={() => console.log("Decline invite")}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-white px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-warm"
        >
          <X className="h-4 w-4" />
          Decline
        </button>
      </div>
    </div>
  );
}
