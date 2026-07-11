"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Pencil, Bookmark, Settings, LogOut, ArrowRight } from "lucide-react";
import { currentFounder } from "@/data/current-founder";

export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    function handlePointer(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={containerRef} className="relative">
      {/* Avatar trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${currentFounder.avatarColor} ${
          open ? "ring-2 ring-forest ring-offset-2" : ""
        }`}
      >
        {currentFounder.initials}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          aria-label="Account"
          className="reveal absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-border bg-white shadow-lg"
        >
          {/* Profile summary */}
          <div className="flex items-center gap-3 px-4 py-4">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white ${currentFounder.avatarColor}`}
            >
              {currentFounder.initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{currentFounder.name}</p>
              <p className="truncate text-xs text-slate">
                {currentFounder.archetype} &middot; {currentFounder.location}
              </p>
              <Link
                href="/profile"
                onClick={close}
                className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-forest hover:text-forest-light"
              >
                View full profile
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="h-px bg-border-soft" />

          {/* Menu items */}
          <nav className="py-1.5">
            <MenuLink href="/profile" icon={<Pencil className="h-4 w-4" />} onClick={close}>
              Edit profile &amp; signals
            </MenuLink>
            <MenuLink href="/matches" icon={<Bookmark className="h-4 w-4" />} onClick={close}>
              Saved matches
            </MenuLink>
            <MenuButton
              icon={<Settings className="h-4 w-4" />}
              onClick={() => {
                console.log("Open settings");
                close();
              }}
            >
              Settings
            </MenuButton>
          </nav>

          <div className="h-px bg-border-soft" />

          <nav className="py-1.5">
            <MenuButton
              icon={<LogOut className="h-4 w-4" />}
              onClick={() => {
                // TODO: wire to Supabase auth signOut()
                console.log("Sign out");
                close();
              }}
            >
              Sign out
            </MenuButton>
          </nav>
        </div>
      )}
    </div>
  );
}

function MenuLink({
  href,
  icon,
  onClick,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink transition-colors hover:bg-warm"
    >
      <span className="text-slate">{icon}</span>
      {children}
    </Link>
  );
}

function MenuButton({
  icon,
  onClick,
  children,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-ink transition-colors hover:bg-warm"
    >
      <span className="text-slate">{icon}</span>
      {children}
    </button>
  );
}
