"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { AccountMenu } from "./AccountMenu";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Matches", href: "/matches" },
  { label: "Messages", href: "/messages" },
  { label: "Profile", href: "/profile" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-forest text-sm font-bold text-white">
            CU
          </span>
          <span className="text-base font-semibold text-ink">CofounderUp</span>
        </div>

        <nav className="flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "border-b-2 border-forest pb-3 pt-3 text-sm font-medium text-forest"
                    : "pb-3 pt-3 text-sm font-medium text-slate hover:text-ink"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="relative text-slate hover:text-ink"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-forest" />
          </button>
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}
