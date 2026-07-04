"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LINKS, TOKEN } from "@/lib/constants";

const NAV = [
  { href: "/#story", label: "Story" },
  { href: "/#tokenomics", label: "Tokenomics" },
  { href: "/mint", label: "Wagyu Mint" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const onDashboard = pathname === "/dashboard";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-steak-800/60 bg-steak-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-steak-cream">
          <span className="text-2xl" aria-hidden>🥩</span>
          ${TOKEN.ticker}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-steak-cream/70 transition hover:text-steak-cream"
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

        <div className="flex items-center gap-3">
          {onDashboard && <WalletMultiButton className="!bg-steak-red !font-semibold hover:!bg-steak-red/90" />}
          {!onDashboard && (
            <Link
              href="/dashboard"
              className="rounded-full bg-steak-red px-4 py-2 text-sm font-semibold text-white transition hover:bg-steak-red/90"
            >
              Ranch Dashboard
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
