"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountMenu } from "./AccountMenu";
import { NotificationsMenu } from "./NotificationsMenu";

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
        <Link
          href="/"
          aria-label="CofounderUp home"
          className="flex items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-forest text-sm font-bold text-white">
            CU
          </span>
          <span className="text-base font-semibold text-ink">CofounderUp</span>
        </Link>

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

        <div className="flex items-center gap-3">
          <NotificationsMenu />
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}
