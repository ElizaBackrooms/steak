const PHASES = [
  {
    hours: "Hour 0–6",
    title: "The Founding Post",
    items: [
      "@lazefrito drops the myth on X — bottle, raise, harvest",
      "Contract deploys. CA held for suspense.",
      "Original viral post pinned as reply.",
    ],
  },
  {
    hours: "Hour 6",
    title: "The Drop",
    items: [
      "CA live on X, Farcaster, TikTok",
      "LP locked with public proof",
      "Genesis Rancher NFT mint opens (72h window)",
    ],
  },
  {
    hours: "Hour 6–24",
    title: "Meme Engine",
    items: [
      "Bottle-fed → blockchain templates seeded",
      "Slaughter Tax memes for paper hands",
      "Stay mysterious — let the lore spread",
    ],
  },
  {
    hours: "Hour 24–48",
    title: "Community Lock-In",
    items: [
      "Telegram + Discord open with full lore doc",
      "Founder AMA — the real calf story",
      "Season 1 staking APY announced",
    ],
  },
  {
    hours: "Hour 48–72",
    title: "The First Butcher Day",
    items: [
      "Genesis Harvest snapshot at hour 72",
      "On-chain airdrop in public Spaces",
      "Top Ranchers leaderboard + NFT upgrades",
    ],
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="border-t border-steak-800/60 bg-steak-900/40 px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-steak-amber">Roadmap</p>
        <h2 className="mt-2 font-display text-4xl font-bold text-steak-cream">
          First 72 Hours — Full Send
        </h2>
        <p className="mt-4 text-steak-cream/70">
          pump.fun launch tonight. Every hour is scripted. The viral window is now.
        </p>

        <ol className="relative mt-12 space-y-8 border-l border-steak-800 pl-8">
          {PHASES.map((phase) => (
            <li key={phase.title} className="relative">
              <span className="absolute -left-[2.35rem] flex h-5 w-5 items-center justify-center rounded-full bg-steak-red ring-4 ring-steak-950" />
              <p className="text-xs font-bold uppercase tracking-wider text-steak-amber">{phase.hours}</p>
              <h3 className="mt-1 font-display text-xl font-bold text-steak-cream">{phase.title}</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-steak-cream/70">
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
