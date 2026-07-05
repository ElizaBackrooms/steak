import Link from "next/link";
import { LINKS, LORE, TOKEN } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-steak-950/90 px-4 py-12 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg font-bold text-steak-cream">Groceries Ranch · ${TOKEN.ticker}</p>
          <p className="mt-1 text-sm text-steak-cream/50">In memory of {LORE.calfName} — not financial advice.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/pasture" className="text-steak-cream/70 hover:text-steak-cream">
            Pasture
          </Link>
          <Link href="/#stake" className="text-steak-cream/70 hover:text-steak-cream">
            Stake
          </Link>
          <Link href="/#register" className="text-steak-cream/70 hover:text-steak-cream">
            Register
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
