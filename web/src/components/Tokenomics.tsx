const ALLOCATION = [{ label: "Public LP (pump.fun)", pct: 100, color: "bg-steak-red" }];

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-steak-amber">Tokenomics</p>
        <h2 className="mt-2 font-display text-4xl font-bold text-steak-cream">1 Billion STEAK</h2>
        <p className="mt-4 text-steak-cream/70">
          Launched on pump.fun. Lock on Streamflow for 1 year, register on the Google form, receive trading-fee
          airdrops proportional to your lock.
        </p>

        <div className="blood-card mt-10 rounded-2xl border border-steak-red/20 bg-steak-900/85 p-6 backdrop-blur-sm">
          <h3 className="font-display text-xl font-bold text-steak-cream">Launch</h3>
          <div className="mt-4 space-y-3">
            {ALLOCATION.map((row) => (
              <div key={row.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-steak-cream/80">{row.label}</span>
                  <span className="font-semibold text-steak-cream">{row.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-steak-cream/10">
                  <div className={`h-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-steak-cream/50">
            Fee airdrops go to wallets on the public Streamflow lock leaderboard who also registered on the form.
          </p>
        </div>
      </div>
    </section>
  );
}
