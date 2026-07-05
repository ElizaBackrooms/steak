import { LINKS, TOKEN } from "@/lib/constants";

export default function Receipts() {
  const mint = LINKS.mint || "Set after launch";

  return (
    <section id="receipts" className="border-t border-steak-800/10 px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-steak-red">The Receipts</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-steak-950">Verify everything</h2>

        <div className="mt-8 space-y-4 rounded-2xl border border-steak-800/10 bg-steak-cream/30 p-6 text-left text-sm">
          <div>
            <p className="text-xs uppercase text-steak-800/40">Token mint (CA)</p>
            <p className="mt-1 break-all font-mono text-steak-950">{mint}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href={LINKS.pump} target="_blank" rel="noopener noreferrer" className="text-steak-red hover:underline">
              pump.fun
            </a>
            {LINKS.mint && (
              <a
                href={`https://solscan.io/token/${LINKS.mint}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-steak-red hover:underline"
              >
                Solscan
              </a>
            )}
            <a href={LINKS.x} target="_blank" rel="noopener noreferrer" className="text-steak-red hover:underline">
              {TOKEN.founder}
            </a>
          </div>
          <p className="text-xs text-steak-800/40">
            LP burns at Raydium graduation. No presale. Not financial advice.
          </p>
        </div>
      </div>
    </section>
  );
}
