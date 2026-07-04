const PANELS = [
  {
    emoji: "🍼",
    title: "The Bottle",
    tag: "Day one",
    body: "A calf raised by hand. Named. Fed. The internet watched every bottle.",
  },
  {
    emoji: "🐄",
    title: "The Raise",
    tag: "Commitment",
    body: "Care has a cost. You don't raise something and forget what you started.",
  },
  {
    emoji: "🔥",
    title: "The Bonfire",
    tag: "~1M views",
    body: "She became dinner. Polarizing. Wholesome. Brutal. The post that broke the timeline.",
  },
  {
    emoji: "⛓️",
    title: "The Chain",
    tag: "Tonight",
    body: "Same loop on Solana: raise your bags, graze the pasture, harvest on Butcher Day.",
  },
] as const;

export default function LorePanels() {
  return (
    <section id="story" className="border-t border-steak-800/60 bg-steak-900/30 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-steak-amber">The Ranch</p>
        <h2 className="mt-2 text-center font-display text-4xl font-bold text-steak-cream">From Bottle to Blockchain</h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {PANELS.map((panel, i) => (
            <article
              key={panel.title}
              className="group relative overflow-hidden rounded-2xl border border-steak-800 bg-steak-950/80 p-6 transition hover:border-steak-amber/30"
            >
              <span className="absolute -right-2 -top-2 text-6xl opacity-10 transition group-hover:opacity-20">
                {panel.emoji}
              </span>
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-steak-800 font-bold text-steak-amber">
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-steak-red">{panel.tag}</p>
                  <h3 className="mt-1 font-display text-xl font-bold text-steak-cream">
                    {panel.emoji} {panel.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-steak-cream/70">{panel.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
