"use client";

import { Bookmark } from "lucide-react";
import type { FounderMatch } from "@/types";

interface MatchCardProps {
  match: FounderMatch;
  onViewMatch: (matchId: string) => void;
  onInvite: (matchId: string) => void;
  onSave: (matchId: string) => void;
}

function HighlightedSummary({
  summary,
  highlight,
}: {
  summary: string;
  highlight?: string;
}) {
  if (!highlight || !summary.includes(highlight)) {
    return <>{summary}</>;
  }

  const index = summary.indexOf(highlight);
  const before = summary.slice(0, index);
  const after = summary.slice(index + highlight.length);

  return (
    <>
      {before}
      <span className="font-semibold text-ink">{highlight}</span>
      {after}
    </>
  );
}

export function MatchCard({ match, onViewMatch, onInvite, onSave }: MatchCardProps) {
  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${match.avatarColor}`}
          >
            {match.initials}
          </div>
          <div>
            <h3 className="text-base font-semibold text-ink">{match.name}</h3>
            <p className="text-sm text-slate">
              {match.location} &middot; {match.archetype} &middot; {match.archetypeDetail}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 text-sm font-medium text-forest">
          <span aria-hidden="true">⚡</span>
          {match.fitScore}%
        </div>
      </div>

      {match.tier && (
        <div className="mt-3 flex gap-2">
          {match.tier === "Founding 500" && (
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
              Founding 500
            </span>
          )}
          <span className="rounded-full bg-pale px-2.5 py-1 text-xs font-medium text-forest">
            Verified
          </span>
        </div>
      )}

      <p className="mt-3 text-sm leading-relaxed text-ink">
        <HighlightedSummary summary={match.summary} highlight={match.summaryHighlight} />
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {match.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-pale px-2.5 py-1 text-xs font-medium text-forest"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => onViewMatch(match.id)}
          className="flex-1 rounded-lg bg-forest px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          View match
        </button>
        <button
          type="button"
          onClick={() => onInvite(match.id)}
          className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-warm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          Invite
        </button>
        <button
          type="button"
          onClick={() => onSave(match.id)}
          aria-label={`Save ${match.name}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-slate transition-colors hover:bg-warm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          <Bookmark className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
