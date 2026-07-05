const QUESTS = [
  { title: "Hold 100k STEAK", reward: "Mint 1 Steak Cut NFT", status: "live" },
  { title: "Stay in the pasture", reward: "Marination points + Harvest weight", status: "live" },
  { title: "Climb the Herd", reward: "Top 10 get shoutouts on Butcher Day", status: "live" },
  { title: "#BottleFedToBlockchain", reward: "Genesis Harvest eligibility", status: "soon" },
] as const;

export default function Quests() {
  return (
    <section className="border-t border-steak-800/60 bg-steak-900/20 px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-steak-amber">Proof of Steak</p>
        <h2 className="mt-2 text-center font-display text-3xl font-bold text-steak-cream">Active quests</h2>

        <ul className="mt-10 space-y-3">
          {QUESTS.map((q) => (
            <li
              key={q.title}
              className="flex items-center justify-between rounded-xl border border-steak-800 bg-steak-950/60 px-5 py-4"
            >
              <div>
                <p className="font-semibold text-steak-cream">{q.title}</p>
                <p className="text-sm text-steak-cream/50">{q.reward}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                  q.status === "live" ? "bg-steak-red/20 text-steak-red" : "bg-steak-800 text-steak-cream/40"
                }`}
              >
                {q.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
