import { LINKS } from "@/lib/constants";

const STEPS = [
  "Buy $STEAK on pump.fun",
  "Open Streamflow and create a 1-year token lock on your STEAK",
  "Lock the supply you want in the pasture",
  "Register your wallet on the Google form below",
];

export default function StreamflowStake() {
  return (
    <section id="stake" className="border-t border-steak-800/10 px-4 py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-steak-red">Streamflow</p>
          <h2 className="mt-2 font-display text-4xl font-bold text-steak-950">Stake your supply for 1 year</h2>
          <p className="mt-4 text-steak-800/75">
            Lock STEAK on Streamflow for 12 months. Trading fees from the coin get airdropped to registered stakers.
          </p>

          <ol className="mt-8 space-y-4">
            {STEPS.map((step, i) => (
              <li key={step} className="flex gap-4 text-sm text-steak-800/80">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-steak-red/10 font-display text-lg font-bold text-steak-red">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <a
            href={LINKS.streamflow}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block rounded-full bg-steak-red px-8 py-3 font-bold text-white transition hover:bg-steak-red/90"
          >
            Stake on Streamflow →
          </a>
        </div>

        <div className="rounded-2xl border border-steak-800/10 bg-steak-cream/40 p-8">
          <h3 className="font-display text-2xl font-bold text-steak-950">Fee airdrops</h3>
          <p className="mt-3 text-sm leading-relaxed text-steak-800/65">
            Pump.fun trading fees flow back to the ranch. Snapshot registered wallets that locked on Streamflow and
            airdrop your share.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-steak-800/75">
            <li>✓ 1-year Streamflow lock required</li>
            <li>✓ Google form with your wallet address</li>
            <li>✓ Fees distributed to registered stakers</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
