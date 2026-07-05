import Link from "next/link";
import Image from "next/image";
import { LINKS, LORE, TOKEN } from "@/lib/constants";
import RanchHud from "@/components/RanchHud";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20">
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="/backgrounds/bg-hero-ranch.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-steak-950/70 via-steak-950/55 to-steak-950" />
        <div className="ranch-noise absolute inset-0 opacity-40" aria-hidden />
      </div>
      <div className="pointer-events-none absolute -right-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-steak-amber/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-1/4 -z-10 h-72 w-72 rounded-full bg-steak-red/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-steak-amber">
          {LORE.calfName} · pump.fun · Solana
        </p>
        <h1 className="font-display text-5xl font-black leading-none tracking-tight text-steak-cream sm:text-7xl">
          ${TOKEN.ticker}
        </h1>
        <p className="mt-4 font-display text-2xl font-bold text-steak-red sm:text-3xl">
          {TOKEN.tagline}
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-steak-cream/80">
          {LORE.calfName} was bottle-fed. The internet raised her. Now raise your bags — steak pics, Streamflow lock
          for a year, register your wallet, catch fee airdrops.
        </p>

        <RanchHud />

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={LINKS.pump}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full bg-steak-red px-8 py-4 text-lg font-bold text-white shadow-lg shadow-steak-red/30 transition hover:bg-steak-red/90 sm:w-auto"
          >
            Buy on pump.fun
          </a>
          <a
            href={LINKS.streamflow}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full border border-steak-amber/40 bg-steak-amber/10 px-8 py-4 text-lg font-bold text-steak-amber backdrop-blur-sm transition hover:bg-steak-amber/20 sm:w-auto"
          >
            Stake 1 year
          </a>
          <Link
            href="/#register"
            className="w-full rounded-full border border-steak-cream/20 bg-steak-950/30 px-8 py-4 text-lg font-bold text-steak-cream backdrop-blur-sm transition hover:border-steak-cream/40 hover:bg-steak-cream/5 sm:w-auto"
          >
            Register wallet
          </Link>
        </div>

        <p className="mt-8 text-sm text-steak-cream/55">
          Founded by{" "}
          <a href={LINKS.x} target="_blank" rel="noopener noreferrer" className="text-steak-amber hover:underline">
            {TOKEN.founder}
          </a>
          {" "}· 1B supply · in memory of {LORE.calfName}
        </p>
      </div>
    </section>
  );
}
