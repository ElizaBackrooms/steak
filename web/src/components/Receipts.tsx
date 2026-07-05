import { LINKS, TOKEN } from "@/lib/constants";

export default function Receipts() {
  const mint = LINKS.mint || "Set after launch";

  return (
    <section id="receipts" className="border-t border-steak-800/60 px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-steak-amber">The Receipts</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-steak-cream">Verify everything</h2>

        <div className="mt-8 space-y-4 rounded-2xl border border-steak-800 bg-steak-950 p-6 text-left text-sm">
          <div>
            <p className="text-xs uppercase text-steak-cream/40">Token mint (CA)</p>
            <p className="mt-1 break-all font-mono text-steak-cream">{mint}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href={LINKS.pump} target="_blank" rel="noopener noreferrer" className="text-steak-amber hover:underline">
              pump.fun
            </a>
            {LINKS.mint && (
              <a
                href={`https://solscan.io/token/${LINKS.mint}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-steak-amber hover:underline"
              >
                Solscan
              </a>
            )}
            <a href={LINKS.x} target="_blank" rel="noopener noreferrer" className="text-steak-amber hover:underline">
              {TOKEN.founder}
            </a>
          </div>
          <p className="text-xs text-steak-cream/40">
            LP burns at Raydium graduation. No presale. Founder doxxed. Not financial advice.
          </p>
        </div>
      </div>
    </section>
  );
}
