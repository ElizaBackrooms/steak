"use client";

import { useEffect, useState } from "react";

export default function Steakometer() {
  const [pct, setPct] = useState(0);
  const [minted, setMinted] = useState(0);
  const [max, setMax] = useState(200);

  useEffect(() => {
    fetch("/api/ranch/stats")
      .then((r) => r.json())
      .then((d: { minted: number; max_cuts: number }) => {
        setMinted(d.minted);
        setMax(d.max_cuts);
        setPct(d.max_cuts > 0 ? (d.minted / d.max_cuts) * 100 : 0);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-steak-amber">The Steakometer</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-steak-cream sm:text-4xl">
          Cuts leaving the ranch
        </h2>
        <p className="mt-2 text-steak-cream/60">200 Steak Cut NFTs · 100k STEAK each · one per wallet</p>

        <div className="relative mx-auto mt-10 h-8 max-w-xl overflow-hidden rounded-full border border-steak-800 bg-steak-950">
          <div
            className="h-full rounded-full bg-gradient-to-r from-steak-red via-steak-amber to-steak-red transition-all duration-700"
            style={{ width: `${Math.min(100, pct)}%` }}
          />
        </div>
        <p className="mt-4 font-display text-4xl font-bold text-steak-cream">
          {minted}
          <span className="text-2xl text-steak-cream/40"> / {max}</span>
        </p>
        <p className="mt-2 text-sm text-steak-cream/50">
          {pct >= 100 ? "Sold out. Secondary only." : `${(100 - pct).toFixed(0)}% of cuts still on the block`}
        </p>
      </div>
    </section>
  );
}
