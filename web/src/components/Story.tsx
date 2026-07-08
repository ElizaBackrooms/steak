import { LINKS } from "@/lib/constants";

export default function Story() {
  return (
    <section id="story" className="border-t border-steak-800/60 bg-steak-900/40 px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-steak-amber">The Lore</p>
        <h2 className="mt-2 font-display text-4xl font-bold text-steak-cream">
          From Bottle to Bonfire
        </h2>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-steak-cream/75">
          <p>
            It started with a viral moment — nearly a million views. One person bottle-fed a calf,
            raised it with their own hands, named it, cared for it… and then ate it. Polarizing.
            Honest. Unforgettable.
          </p>
          <p>
            <strong className="text-steak-cream">$STEAK</strong> is not a staking pun stapled onto
            a meme. It is the oldest ritual in ranching: you raise something, you commit to it, you
            harvest what you built. On-chain, holders become{" "}
            <strong className="text-steak-cream">Ranchers</strong> — locking STEAK in The Pasture,
            growing through Grazing Seasons, and claiming Harvests on Butcher Day.
          </p>
          <p>
            Early exits pay the <strong className="text-steak-red">Slaughter Tax</strong>. Long
            locks earn multipliers. The calf grows into a Prime Cut. The lore is load-bearing, not
            decorative.
          </p>
        </div>

        <blockquote className="mt-10 border-l-4 border-steak-red pl-6 italic text-steak-cream/80">
          &ldquo;I bottle-fed her. I raised her. I ate her. Now I&apos;m doing it again — but this
          time on-chain.&rdquo;
          <footer className="mt-3 not-italic text-sm text-steak-amber">
            —{" "}
            <a href={LINKS.x} target="_blank" rel="noopener noreferrer" className="hover:underline">
              @lazefrito
            </a>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
