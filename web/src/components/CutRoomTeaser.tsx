"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { NFT, STEAK_CUTS, getCutImage } from "@/lib/nft";

export default function CutRoomTeaser() {
  const [minted, setMinted] = useState(0);
  const [remaining, setRemaining] = useState(200);
  const [nextCut, setNextCut] = useState<string | null>(null);
  const [nextSerial, setNextSerial] = useState(1);

  useEffect(() => {
    fetch("/api/ranch/stats")
      .then((r) => r.json())
      .then((d: { minted: number; remaining: number; next_cut_name: string | null }) => {
        setMinted(d.minted);
        setRemaining(d.remaining);
        setNextCut(d.next_cut_name);
        setNextSerial(d.remaining > 0 ? d.minted + 1 : 1);
      });
  }, []);

  const pct = ((minted / NFT.maxSupply) * 100).toFixed(0);
  const previewImage = getCutImage(nextSerial);

  return (
    <section id="cuts" className="px-4 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-square max-h-80 overflow-hidden rounded-2xl border border-steak-800 bg-steak-900">
          <Image
            src={previewImage}
            alt={nextCut ?? "Steak Cut NFT example"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-steak-amber">The Cut Room</p>
          <h2 className="mt-2 font-display text-4xl font-bold text-steak-cream">Mint your cut</h2>
          <p className="mt-4 text-steak-cream/70">
            Hold {NFT.minSteakBalance.toLocaleString()} STEAK. Mint one of {NFT.maxSupply} Steak Cut NFTs — ribeye,
            sirloin, brisket, and the rest. Tradeable immediately.
          </p>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-steak-800">
            <div className="h-full bg-steak-red transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-sm text-steak-cream/50">
            {minted} minted · {remaining} left
            {nextCut ? ` · next up: ${nextCut}` : ""}
          </p>

          <p className="mt-4 text-xs text-steak-cream/40">{STEAK_CUTS.join(" · ")}</p>

          <Link
            href="/mint"
            className="mt-8 inline-block rounded-full bg-steak-amber px-8 py-3 font-bold text-steak-950 transition hover:bg-steak-amber/90"
          >
            Enter the Cut Room
          </Link>
        </div>
      </div>
    </section>
  );
}
