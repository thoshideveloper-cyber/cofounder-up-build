"use client";

import { MapPin, Pencil, CheckCircle2, Circle, ShieldCheck, Zap } from "lucide-react";
import { currentFounder, profileTasks } from "@/data/current-founder";

const s = currentFounder.signals;

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

export default function ProfilePage() {
  const doneCount = profileTasks.filter((t) => t.done).length;
  const profileStrength = Math.round((doneCount / profileTasks.length) * 100);

  return (
    <div className="min-h-screen bg-page-bg px-8 py-10">
      <div className="reveal mx-auto max-w-6xl">
        <h1 className="text-2xl font-semibold text-ink">Your profile</h1>
        <p className="mt-1.5 text-sm text-slate">
          This is what founders see when you show up in their matches.
        </p>

        {/* Identity header */}
        <section className="mt-6 rounded-xl border border-border bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-semibold text-white ${currentFounder.avatarColor}`}
              >
                {currentFounder.initials}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-ink">{currentFounder.name}</h2>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate">
                  <MapPin className="h-4 w-4" />
                  {currentFounder.location} &middot; {currentFounder.archetype} &middot;{" "}
                  {currentFounder.archetypeDetail}
                </p>
                <p className="mt-2 max-w-xl text-sm text-ink">{currentFounder.headline}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => console.log("Edit profile")}
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-warm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              <Pencil className="h-4 w-4" />
              Edit profile
            </button>
          </div>
        </section>

        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_320px]">
          {/* Main column */}
          <div className="flex flex-col gap-6">
            {/* About */}
            <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-ink">About</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{currentFounder.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {currentFounder.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-pale px-2.5 py-1 text-xs font-medium text-forest"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Founder Fit Signals — the centerpiece */}
            <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-forest">
                    Founder Fit Signals
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-ink">How you actually work</h3>
                </div>
                <button
                  type="button"
                  onClick={() => console.log("Edit signals")}
                  className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-forest hover:text-forest-light"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>
              </div>
              <p className="mt-2 text-sm text-slate">
                Matches see these first — they decide fit more than your skills do.
              </p>

              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                  Founder type
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {s.founderType.map((trait) => (
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
                <SignalRow label="Risk appetite" code={s.riskAppetite.code} value={s.riskAppetite.label} />
                <SignalRow
                  label="Decision-making speed"
                  code={s.decisionSpeed.code}
                  value={s.decisionSpeed.label}
                />
                <SignalRow
                  label="Communication style"
                  code={s.communicationStyle.code}
                  value={s.communicationStyle.label}
                />
                <SignalRow label="Idea commitment" value={s.ideaCommitment} />
                <SignalRow
                  label="Working commitment"
                  sublabel="from profile"
                  code={s.workingCommitment.code}
                  value={s.workingCommitment.label}
                />
              </div>
            </section>

            {/* Looking for */}
            <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-ink">What I&apos;m looking for</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{currentFounder.lookingFor}</p>
            </section>
          </div>

          {/* Side column */}
          <div className="flex flex-col gap-6">
            {/* Profile strength */}
            <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-ink">Profile strength</h3>
                <span className="text-sm font-medium text-forest">{profileStrength}%</span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border-soft">
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
            </section>

            {/* Verification nudge */}
            {!currentFounder.verified && (
              <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-pale text-forest">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <h3 className="mt-3 text-base font-semibold text-ink">Get the Verified badge</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate">
                  Verified founders get more invites and reply-rates. It takes about two minutes.
                </p>
                <button
                  type="button"
                  onClick={() => console.log("Start verification")}
                  className="mt-4 w-full rounded-lg bg-forest px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                >
                  Verify identity
                </button>
              </section>
            )}

            {/* Fit snapshot */}
            <section className="rounded-xl border border-pale bg-pale/50 p-6">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-forest">
                <Zap className="h-3.5 w-3.5" />
                Fit snapshot
              </span>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                You read as a fast-moving, direct builder who&apos;s open on the idea. You&apos;ll
                fit best with founders who bring a clear direction and value speed over consensus.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
