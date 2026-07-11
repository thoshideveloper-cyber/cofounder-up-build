"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { MatchCard } from "@/components/matches/MatchCard";
import { MatchDetailDrawer } from "@/components/matches/MatchDetailDrawer";
import { dummyMatches } from "@/data/dummy-matches";

const DROPDOWN_FILTERS = ["Any archetype", "Any industry", "Any commitment", "Any stage"];

export default function MatchesPage() {
  const [activeMatchId, setActiveMatchId] = useState<string | null>(null);

  const activeMatch = dummyMatches.find((m) => m.id === activeMatchId) ?? null;

  function handleInvite(matchId: string) {
    // TODO: wire to Supabase — insert into `invites` table, RLS-scoped to current founder
    console.log("Invite sent to", matchId);
  }

  function handleSave(matchId: string) {
    // TODO: wire to Supabase — upsert into `saved_matches`
    console.log("Saved", matchId);
  }

  return (
    <div className="min-h-screen bg-page-bg px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-semibold text-ink">Browse matches</h1>
        <p className="mt-1.5 text-sm text-slate">
          Founders compatible with you, ranked by fit. Invite, save, or skip.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-white"
          >
            All matches
          </button>
          {DROPDOWN_FILTERS.map((label) => (
            <button
              key={label}
              type="button"
              className="flex items-center gap-1.5 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-ink hover:bg-warm"
            >
              {label}
              <ChevronDown className="h-4 w-4 text-slate" />
            </button>
          ))}
        </div>

        <div className="mt-7 grid gap-6 md:grid-cols-2">
          {dummyMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onViewMatch={setActiveMatchId}
              onInvite={handleInvite}
              onSave={handleSave}
            />
          ))}
        </div>
      </div>

      <MatchDetailDrawer match={activeMatch} onClose={() => setActiveMatchId(null)} />
    </div>
  );
}
