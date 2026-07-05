import Image from "next/image";
import { LORE } from "@/lib/constants";
import { FEATURED_STEAKS, STEAK_GALLERY_COUNT, steakImagePath } from "@/lib/steaks";

export default function SteakGallery() {
  const all = Array.from({ length: STEAK_GALLERY_COUNT }, (_, i) => i + 1);

  return (
    <section id="steaks" className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-steak-amber">
          The Herd on a Plate
        </p>
        <h2 className="mt-2 text-center font-display text-3xl font-bold text-steak-cream sm:text-4xl">
          <span className="blood-underline">Pictures of steaks</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-steak-cream/60">
          Just steak — the harvest after {LORE.calfName}.
        </p>

        <div className="mt-12 columns-2 gap-3 sm:columns-3 lg:columns-4">
          {all.map((n) => (
            <div
              key={n}
              className={`mb-3 break-inside-avoid overflow-hidden rounded-xl border border-steak-red/20 bg-steak-900/80 ${
                FEATURED_STEAKS.includes(n as (typeof FEATURED_STEAKS)[number]) ? "ring-2 ring-steak-amber/40" : ""
              }`}
            >
              <div className="relative aspect-[4/5] sm:aspect-square">
                <Image
                  src={steakImagePath(n)}
                  alt={`Steak ${n}`}
                  fill
                  className="object-cover transition duration-300 hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  loading={n <= 12 ? "eager" : "lazy"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
