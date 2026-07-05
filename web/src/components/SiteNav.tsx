"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LINKS, TOKEN } from "@/lib/constants";

const NAV = [
  { href: "/#story", label: "Story" },
  { href: "/#steaks", label: "Steaks" },
  { href: "/#stake", label: "Stake" },
  { href: "/#register", label: "Register" },
  { href: "/#pasture", label: "Pasture" },
  { href: "/pasture", label: "Full board" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-steak-950/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-steak-cream">
          <span className="text-2xl" aria-hidden>🥩</span>
          Groceries Ranch
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition hover:text-steak-cream ${
                pathname === item.href ? "text-steak-cream" : "text-steak-cream/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={LINKS.x}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-steak-cream/70 transition hover:text-steak-cream"
          >
            {TOKEN.founder}
          </a>
        </div>

        <Link
          href="/#register"
          className="rounded-full bg-steak-red px-4 py-2 text-sm font-semibold text-white transition hover:bg-steak-red/90"
        >
          Register
        </Link>
      </nav>
      <div className="drip-strip absolute inset-x-0 bottom-0 translate-y-full" aria-hidden />
    </header>
  );
}
