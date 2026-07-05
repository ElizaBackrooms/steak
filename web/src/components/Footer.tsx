import Link from "next/link";
import { LINKS, LORE, TOKEN } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-steak-800/10 bg-white px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg font-bold text-steak-950">Groceries Ranch · ${TOKEN.ticker}</p>
          <p className="mt-1 text-sm text-steak-800/50">In memory of {LORE.calfName} — not financial advice.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/#stake" className="text-steak-800/70 hover:text-steak-950">
            Stake
          </Link>
          <Link href="/#register" className="text-steak-800/70 hover:text-steak-950">
            Register
          </Link>
          <Link href="/dashboard" className="text-steak-800/70 hover:text-steak-950">
            Pasture
          </Link>
          <a href={LINKS.pump} target="_blank" rel="noopener noreferrer" className="text-steak-800/70 hover:text-steak-950">
            pump.fun
          </a>
          <a href={LINKS.x} target="_blank" rel="noopener noreferrer" className="text-steak-800/70 hover:text-steak-950">
            {TOKEN.founder}
          </a>
        </div>
      </div>
    </footer>
  );
}
