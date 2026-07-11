"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Users, Send, CheckCircle2, Circle } from "lucide-react";
import { MatchCard } from "@/components/matches/MatchCard";
import { MatchDetailDrawer } from "@/components/matches/MatchDetailDrawer";
import { dummyMatches } from "@/data/dummy-matches";
import {
  currentFounder,
  recentActivity,
  profileTasks,
} from "@/data/current-founder";

// The home feed shows this week's top matches. We surface the two strongest
// here and link to the full Browse Matches page for the rest.
const topMatches = dummyMatches.slice(0, 2);

export default function HomePage() {
  const [activeMatchId, setActiveMatchId] = useState<string | null>(null);
  const activeMatch = dummyMatches.find((m) => m.id === activeMatchId) ?? null;

  const doneCount = profileTasks.filter((t) => t.done).length;
  const profileStrength = Math.round((doneCount / profileTasks.length) * 100);

  function handleInvite(matchId: string) {
    // TODO: wire to Supabase — insert into `invites`, RLS-scoped to current founder
    console.log("Invite sent to", matchId);
  }

  function handleSave(matchId: string) {
    // TODO: wire to Supabase — upsert into `saved_matches`
    console.log("Saved", matchId);
  }

  return (
    <div className="min-h-screen bg-page-bg px-8 py-10">
      <div className="reveal mx-auto max-w-6xl">
        {/* Greeting */}
        <h1 className="text-2xl font-semibold text-ink">
          Welcome back, {currentFounder.firstName}
        </h1>
        <p className="mt-1.5 text-sm text-slate">
          Here&apos;s who&apos;s a fit this week, and where founders are waiting on you.
        </p>

        {/* Signature: a short snapshot of your own profile — the whole card
            links to /profile, where the full version lives. */}
        <Link
          href="/profile"
          aria-label="View your full profile"
          className="group mt-6 block overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          <div className="grid gap-px bg-border-soft md:grid-cols-[1fr_320px]">
            {/* Identity snapshot */}
            <div className="bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-forest">
                How you show up
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white ${currentFounder.avatarColor}`}
                >
                  {currentFounder.initials}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-ink">{currentFounder.name}</h2>
                  <p className="text-sm text-slate">
                    {currentFounder.location} &middot; {currentFounder.archetype} &middot;{" "}
                    {currentFounder.archetypeDetail}
                  </p>
                </div>
              </div>

              {/* Short summary line — the full bio lives on the profile page */}
              <p className="mt-3 text-sm leading-relaxed text-ink">{currentFounder.headline}</p>

              {/* Signal codes — the vocabulary matches every match's fit signals */}
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  currentFounder.signals.riskAppetite,
                  currentFounder.signals.decisionSpeed,
                  currentFounder.signals.communicationStyle,
                ].map((signal) => (
                  <span
                    key={signal.code}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-warm px-2.5 py-1 text-xs font-medium text-ink"
                  >
                    <span className="rounded border border-border bg-white px-1 py-0.5 text-[10px] font-semibold text-slate">
                      {signal.code}
                    </span>
                    {signal.label}
                  </span>
                ))}
                <span className="inline-flex items-center rounded-full bg-pale px-2.5 py-1 text-xs font-medium text-forest">
                  {currentFounder.signals.workingCommitment.label}
                </span>
              </div>
            </div>

            {/* Why it matters + link to the full profile */}
            <div className="flex flex-col justify-between bg-warm p-6">
              <p className="text-sm leading-relaxed text-slate">
                These signals — not your skills — decide who we surface. Founders part ways over
                risk, pace, and communication, so we match on them first.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-forest group-hover:text-forest-light">
                View full profile
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </Link>

        {/* Quick actions — each tile names what to do next, not just a number */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatTile
            icon={<Users className="h-4 w-4" />}
            value="4"
            label="New matches"
            action="Review"
            href="/matches"
          />
          <StatTile
            icon={<Send className="h-4 w-4" />}
            value="2"
            label="Invites awaiting reply"
            action="Follow up"
            href="/messages"
          />
          <StatTile
            icon={<CheckCircle2 className="h-4 w-4" />}
            value={`${profileStrength}%`}
            label="Profile strength"
            action="Finish"
            href="/profile"
          />
        </section>

        {/* Top matches — reuses the same MatchCard + drawer as Browse Matches */}
        <section className="mt-9">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-ink">Top matches this week</h2>
              <p className="mt-0.5 text-sm text-slate">Ranked by fit with your founder signals.</p>
            </div>
            <Link
              href="/matches"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-forest hover:text-forest-light"
            >
              See all matches
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-5 grid gap-6 md:grid-cols-2">
            {topMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onViewMatch={setActiveMatchId}
                onInvite={handleInvite}
                onSave={handleSave}
              />
            ))}
          </div>
        </section>

        {/* Activity + profile completion */}
        <section className="mt-9 grid gap-6 md:grid-cols-2">
          {/* Recent activity */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-ink">Recent activity</h2>
            <ul className="mt-4 flex flex-col">
              {recentActivity.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 border-b border-border-soft py-3 last:border-b-0 last:pb-0 first:pt-0"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${item.actorColor}`}
                  >
                    {item.actorInitials}
                  </div>
                  <p className="flex-1 text-sm text-slate">
                    <span className="font-semibold text-ink">{item.emphasis}</span>
                    {item.text}
                  </p>
                  <span className="shrink-0 text-xs text-slate-light">{item.meta}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Finish your profile */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-ink">Finish your profile</h2>
              <span className="text-sm font-medium text-forest">{profileStrength}%</span>
            </div>
            <p className="mt-1 text-sm text-slate">
              A complete profile gets you in front of stronger matches.
            </p>

            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-border-soft">
              <div
                className="h-full rounded-full bg-forest transition-all"
                style={{ width: `${profileStrength}%` }}
              />
            </div>

            <ul className="mt-4 flex flex-col gap-3">
              {profileTasks.map((task) => (
                <li key={task.id} className="flex items-center gap-2.5 text-sm">
                  {task.done ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-forest" />
                  ) : (
                    <Circle className="h-4 w-4 shrink-0 text-slate-light" />
                  )}
                  <span className={task.done ? "text-slate line-through" : "text-ink"}>
                    {task.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <MatchDetailDrawer match={activeMatch} onClose={() => setActiveMatchId(null)} />
    </div>
  );
}

function StatTile({
  icon,
  value,
  label,
  action,
  href,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  action: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
    >
      <div>
        <div className="flex items-center gap-2 text-slate">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-pale text-forest">
            {icon}
          </span>
          <span className="text-sm font-medium">{label}</span>
        </div>
        <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1 self-end text-sm font-medium text-forest">
        {action}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
