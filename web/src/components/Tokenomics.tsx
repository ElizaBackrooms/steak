const ALLOCATION = [{ label: "Public LP (pump.fun)", pct: 100, color: "bg-steak-red" }];

const GRAZING = [
  { emoji: "🐄", name: "Calf", days: "7 days", mult: "1×" },
  { emoji: "🐂", name: "Yearling", days: "30 days", mult: "2×" },
  { emoji: "🥩", name: "Prime Cut", days: "90 days", mult: "4×" },
  { emoji: "🔥", name: "Dry-Aged", days: "180 days", mult: "8×" },
];

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="border-t border-steak-800/10 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-steak-red">Tokenomics</p>
        <h2 className="mt-2 font-display text-4xl font-bold text-steak-950">Simple coin — 1 Billion STEAK</h2>
        <p className="mt-4 max-w-2xl text-steak-800/70">
          Launched on pump.fun. No NFTs. Trading fees airdropped to Streamflow lockers who register on the form.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 font-display text-xl font-bold text-steak-950">Launch</h3>
            <div className="space-y-3">
              {ALLOCATION.map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-steak-800/80">{row.label}</span>
                    <span className="font-semibold text-steak-950">{row.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-steak-800/10">
                    <div className={`h-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-xl font-bold text-steak-950">Grazing Seasons</h3>
            <div className="space-y-3">
              {GRAZING.map((g) => (
                <div
                  key={g.name}
                  className="flex items-center justify-between rounded-xl border border-steak-800/10 bg-steak-cream/30 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{g.emoji}</span>
                    <div>
                      <p className="font-semibold text-steak-950">{g.name}</p>
                      <p className="text-sm text-steak-800/60">{g.days}</p>
                    </div>
                  </div>
                  <span className="font-bold text-steak-red">{g.mult}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
