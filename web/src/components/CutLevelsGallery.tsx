import Image from "next/image";
import { CUT_LEVELS } from "@/lib/nft";

export default function CutLevelsGallery() {
  return (
    <section className="border-t border-steak-800/60 bg-steak-950 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-steak-amber">
          5 Levels
        </p>
        <h2 className="mt-2 text-center font-display text-3xl font-bold text-steak-cream sm:text-4xl">
          Every cut hits different
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-steak-cream/60">
          Same 100k STEAK gate. Your serial decides the level — Sirloin through Prime.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {CUT_LEVELS.map((cut) => (
            <article
              key={cut.level}
              className="overflow-hidden rounded-2xl border border-steak-800 bg-steak-900/50 transition hover:border-steak-amber/40"
            >
              <div className="relative aspect-square">
                <Image
                  src={cut.image}
                  alt={cut.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-steak-red">LVL {cut.level}</p>
                <h3 className="mt-1 font-display text-lg font-bold text-steak-cream">{cut.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-steak-cream/50">{cut.vibe}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
