import { LORE } from "@/lib/constants";

const PANELS = [
  {
    emoji: "🍼",
    title: "The Bottle",
    tag: "Day one",
    body: `Her name was ${LORE.calfName}. Bottle-fed from the jump — named, fed, documented. The timeline watched every bottle.`,
  },
  {
    emoji: "🐄",
    title: "The Raise",
    tag: LORE.calfName,
    body: `${LORE.calfName} wasn't a bit. You raise what you name. Care has a cost — and the ranch remembers who showed up early.`,
  },
  {
    emoji: "🔥",
    title: "The Bonfire",
    tag: LORE.viralViews,
    body: `${LORE.calfName} became dinner. Polarizing. Wholesome. Brutal. ${LORE.founderHandle}'s post broke the timeline — then became $STEAK.`,
  },
  {
    emoji: "⛓️",
    title: "The Chain",
    tag: "Tonight",
    body: `Same loop on Solana: raise your bags like ${LORE.calfName}, graze the pasture, lock for a year, harvest fee airdrops on Butcher Day.`,
  },
] as const;

export default function LorePanels() {
  return (
    <div className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-steak-amber">The Ranch</p>
        <h2 className="mt-2 text-center font-display text-4xl font-bold text-steak-cream">
          {LORE.calfName} · Bottle to Blockchain
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-steak-cream/55">
          The calf had a name. The coin has a story.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {PANELS.map((panel, i) => (
            <article
              key={panel.title}
              className="group relative overflow-hidden rounded-2xl border border-steak-800/80 bg-steak-950/70 p-6 backdrop-blur-sm transition hover:border-steak-amber/40"
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
                  <p className="mt-2 text-sm leading-relaxed text-steak-cream/75">{panel.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
