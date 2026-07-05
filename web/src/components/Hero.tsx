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
      </div>

      <section className="bg-white px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-steak-red">
            {LORE.calfName} · pump.fun · Solana
          </p>
          <h1 className="mt-3 font-display text-5xl font-black leading-none tracking-tight text-steak-950 sm:text-7xl">
            ${TOKEN.ticker}
          </h1>
          <p className="mt-4 font-display text-2xl font-bold text-steak-red sm:text-3xl">
            {TOKEN.tagline}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-steak-800/80">
            {LORE.calfName} was bottle-fed. The internet raised her. Now raise your bags — lock on Streamflow for a
            year, register your wallet, catch fee airdrops.
          </p>

          <RanchHud />

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={LINKS.pump}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full bg-steak-red px-8 py-4 text-lg font-bold text-white shadow-md transition hover:bg-steak-red/90 sm:w-auto"
            >
              Buy on pump.fun
            </a>
            <a
              href={LINKS.streamflow}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border-2 border-steak-amber bg-steak-amber/10 px-8 py-4 text-lg font-bold text-steak-800 transition hover:bg-steak-amber/20 sm:w-auto"
            >
              Stake 1 year
            </a>
            <Link
              href="/#register"
              className="w-full rounded-full border-2 border-steak-800/20 px-8 py-4 text-lg font-bold text-steak-950 transition hover:border-steak-800/40 hover:bg-steak-950/5 sm:w-auto"
            >
              Register wallet
            </Link>
          </div>

          <p className="mt-8 text-sm text-steak-800/50">
            Founded by{" "}
            <a href={LINKS.x} target="_blank" rel="noopener noreferrer" className="text-steak-red hover:underline">
              {TOKEN.founder}
            </a>
            {" "}· 1B supply · in memory of {LORE.calfName}
          </p>
        </div>
      </section>
    </>
  );
}
