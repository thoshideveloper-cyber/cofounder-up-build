# CofounderUp

Find your cofounder. A dashboard for founders to browse compatible matches, review
**Founder Fit Signals** (how someone actually works — risk, pace, communication, and
idea commitment), message matches, and manage their own profile.

## Features

- **Home feed** — a snapshot of your own founder profile, this week's top matches, quick
  actions, recent activity, and profile completion.
- **Browse matches** — founders ranked by fit, with a detail drawer that surfaces Founder
  Fit Signals and a suggested opening question.
- **Messages** — a two-pane thread view with invite states (awaiting reply / invited you)
  and inline access to each match's fit signals.
- **Profile** — your identity, bio, focus areas, and editable Founder Fit Signals — framed
  as what matches see first.
- **Account menu** — a dropdown from the nav avatar with a profile summary and quick links.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) icons
- TypeScript

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/                 App Router pages (home, matches, messages, profile)
components/layout/    Top navigation and account menu
components/matches/   Match card and fit-signals detail drawer
data/                 Placeholder data (matches, current founder, conversations)
types.ts             Shared types for the Matches feature
```

Data is currently static placeholder content; the components are structured to swap in a
real backend (e.g. Supabase) later.
```
