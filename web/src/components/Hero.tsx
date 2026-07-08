import Link from "next/link";
import Image from "next/image";
import { LINKS, LORE, TOKEN } from "@/lib/constants";
import RanchHud from "@/components/RanchHud";

export default function Hero() {
  return (
    <>
      <div className="relative mt-16 w-full aspect-[16/10] max-h-[min(70vh,640px)] sm:aspect-[21/9]">
        <Image
          src="/groceries-hero.jpg"
          alt={`${LORE.calfName} — bottle-fed at the ranch`}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="drip-strip absolute inset-x-0 bottom-0 translate-y-full" aria-hidden />
        <span className="drip-dot left-[12%]" style={{ animationDelay: "0s" }} aria-hidden />
        <span className="drip-dot left-[38%]" style={{ animationDelay: "1.1s" }} aria-hidden />
        <span className="drip-dot left-[71%]" style={{ animationDelay: "0.5s" }} aria-hidden />
        <span className="drip-dot left-[90%]" style={{ animationDelay: "1.8s" }} aria-hidden />
      </div>

      <section className="px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-steak-amber">
            {LORE.calfName} · pump.fun · Solana
          </p>
          <h1 className="mt-3 font-display text-6xl font-black leading-none tracking-tight text-steak-cream sm:text-8xl">
            <span className="blood-underline">${TOKEN.ticker}</span>
          </h1>
          <p className="mt-8 font-display text-2xl font-bold text-steak-red sm:text-3xl">
            {TOKEN.tagline}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-steak-cream/80">
            {LORE.calfName} was bottle-fed. The internet raised her. Lock on Streamflow for a year, fill the Google
            form, catch fee airdrops.
          </p>

          <RanchHud />

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={LINKS.pump}
              target="_blank"
              rel="noopener noreferrer"
              className="blood-glow w-full rounded-full bg-steak-red px-8 py-4 text-lg font-bold text-white transition hover:bg-steak-red/90 sm:w-auto"
            >
              Buy on pump.fun
            </a>
            <a
              href={LINKS.streamflow}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border-2 border-steak-amber bg-steak-amber/10 px-8 py-4 text-lg font-bold text-steak-amber transition hover:bg-steak-amber/20 sm:w-auto"
            >
              Stake 1 year
            </a>
            <Link
              href="/#register"
              className="w-full rounded-full border-2 border-steak-cream/30 px-8 py-4 text-lg font-bold text-steak-cream transition hover:border-steak-cream/60 hover:bg-steak-cream/10 sm:w-auto"
            >
              Register
            </Link>
          </div>

          <p className="mt-8 text-sm text-steak-cream/50">
            Founded by{" "}
            <a href={LINKS.x} target="_blank" rel="noopener noreferrer" className="text-steak-red hover:underline">
              {TOKEN.founder}
            </a>
            {" "}·{" "}
            <a
              href={LINKS.viralTweet || LINKS.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-steak-red hover:underline"
            >
              {LORE.viralViews} viral post
            </a>
            {" "}· 1B supply · in memory of {LORE.calfName}
          </p>
        </div>
      </section>
    </>
  );
}
