import Link from "next/link";
import { LINKS, TOKEN } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-steak-800/60 px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg font-bold text-steak-cream">The Ranch · ${TOKEN.ticker}</p>
          <p className="mt-1 text-sm text-steak-cream/50">
            {TOKEN.tagline} — not financial advice.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/mint" className="text-steak-cream/70 hover:text-steak-cream">
            Cut Room
          </Link>
          <Link href="/dashboard" className="text-steak-cream/70 hover:text-steak-cream">
            Pasture
          </Link>
          <a href={LINKS.pump} target="_blank" rel="noopener noreferrer" className="text-steak-cream/70 hover:text-steak-cream">
            pump.fun
          </a>
          <a href={LINKS.x} target="_blank" rel="noopener noreferrer" className="text-steak-cream/70 hover:text-steak-cream">
            {TOKEN.founder}
          </a>
        </div>
      </div>
    </footer>
  );
}
