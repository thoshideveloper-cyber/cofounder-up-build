"use client";

import { useEffect } from "react";
import { X, Zap, History, MessageCircle } from "lucide-react";
import type { FounderMatch } from "@/types";

interface MatchDetailDrawerProps {
  match: FounderMatch | null;
  onClose: () => void;
}

function SignalRow({
  label,
  code,
  value,
  sublabel,
}: {
  label: string;
  code?: string;
  value: string;
  sublabel?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border py-3 last:border-b-0">
      <span className="text-sm text-slate">
        {label}
        {sublabel && <span className="ml-1 text-xs text-slate/70">&middot; {sublabel}</span>}
      </span>
      <span className="flex items-center gap-2 text-sm font-medium text-ink">
        {code && (
          <span className="rounded-md border border-border px-1.5 py-0.5 text-[11px] font-semibold text-slate">
            {code}
          </span>
        )}
        {value}
      </span>
    </div>
  );
}

export function MatchDetailDrawer({ match, onClose }: MatchDetailDrawerProps) {
  // Close on Escape for keyboard accessibility
  useEffect(() => {
    if (!match) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [match, onClose]);

  if (!match) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close founder fit signals"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40"
      />

      {/* Drawer panel */}
      <div className="relative flex h-full w-full max-w-2xl flex-col overflow-y-auto bg-warm shadow-xl animate-in slide-in-from-right">
        <div className="flex items-start justify-between border-b border-border bg-white px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-forest">
              Founder Fit Signals
            </p>
            <h2 className="mt-1 text-xl font-semibold text-ink">
              See how a founder actually works — before you commit.
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate transition-colors hover:bg-warm focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-6">
          <p className="text-sm leading-relaxed text-slate">
            Founders rarely part ways over skills. They part over risk, pace, communication, and
            how attached each person is to the idea. These signals surface up front, so the first
            conversation is the right one.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_280px]">
            {/* Founder summary card */}
            <div className="rounded-xl border border-border bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white ${match.avatarColor}`}
                  >
                    {match.initials}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-ink">{match.name}</p>
                    <p className="text-sm text-slate">
                      {match.location} &middot; {match.archetype}
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-pale px-3 py-1 text-xs font-medium text-forest">
                  <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                  {match.fitLabel}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                  Founder type
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {match.signals.founderType.map((trait) => (
                    <span
                      key={trait}
                      className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-ink"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <SignalRow
                  label="Risk appetite"
                  code={match.signals.riskAppetite.code}
                  value={match.signals.riskAppetite.label}
                />
                <SignalRow
                  label="Decision-making speed"
                  code={match.signals.decisionSpeed.code}
                  value={match.signals.decisionSpeed.label}
                />
                <SignalRow
                  label="Communication style"
                  code={match.signals.communicationStyle.code}
                  value={match.signals.communicationStyle.label}
                />
                <SignalRow label="Idea commitment" value={match.signals.ideaCommitment} />
                <SignalRow
                  label="Working commitment"
                  sublabel="from profile"
                  code={match.signals.workingCommitment.code}
                  value={match.signals.workingCommitment.label}
                />
              </div>
            </div>

            {/* Explainer column */}
            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-forest">
                  <Zap className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Beyond skills</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate">
                    Skills tell you who can build a product. These signals tell you who can build
                    a company with you — risk, pace, communication, commitment.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-forest">
                  <History className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Surface tension early</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate">
                    The four reasons most cofounder pairs break are knowable up front. We make
                    them visible before you&apos;re committed, not after.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-forest">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Start a better first conversation</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate">
                    Every match comes with a suggested opening question, tuned to where the two
                    profiles diverge most.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Suggested opening question */}
          <div className="mt-6 rounded-xl border border-pale bg-pale/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-forest">
              Suggested opening question
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink">{match.openingQuestion}</p>
          </div>
        </div>

        {/* Sticky action footer */}
        <div className="sticky bottom-0 mt-auto flex gap-3 border-t border-border bg-white px-6 py-4">
          <button
            type="button"
            className="flex-1 rounded-lg bg-forest px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Invite {match.name.split(" ")[0]}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-warm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Keep browsing
          </button>
        </div>
      </div>
    </div>
  );
}
