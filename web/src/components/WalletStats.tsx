"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";

import { LINKS } from "@/lib/constants";

type PointsStatus = {
  tier: string;
  points: number;
};

export default function WalletStats() {
  const { publicKey, connected } = useWallet();
  const [liveBalance, setLiveBalance] = useState<number | null>(null);
  const [points, setPoints] = useState<PointsStatus | null>(null);

  const wallet = publicKey?.toBase58();

  useEffect(() => {
    if (!wallet) {
      setLiveBalance(null);
      setPoints(null);
      return;
    }
    fetch(`/api/balance/${wallet}`)
      .then((r) => r.json())
      .then((d) => setLiveBalance(d.balance ?? 0));
    fetch(`/api/points/${wallet}`)
      .then((r) => r.json())
      .then((d) => setPoints({ tier: d.tier, points: d.points }));
  }, [wallet]);

  return (
    <section className="border-t border-steak-800/10 px-4 py-16">
      <div className="mx-auto max-w-xl">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-steak-red">Your herd status</p>
        <h2 className="mt-2 text-center font-display text-2xl font-bold text-steak-950">Connect & check the pasture</h2>

        <div className="mt-8 flex justify-center">
          <WalletMultiButton className="!bg-steak-red !font-semibold hover:!bg-steak-red/90" />
        </div>

        {!connected && (
          <p className="mt-6 text-center text-sm text-steak-800/50">
            See balance and marination points — then stake on Streamflow and register for airdrops.
          </p>
        )}

        {connected && wallet && (
          <dl className="mt-8 space-y-3 rounded-2xl border border-steak-800/10 bg-steak-cream/30 p-6 text-sm">
            <div className="flex justify-between">
              <dt className="text-steak-800/50">STEAK balance (live)</dt>
              <dd className="font-mono font-semibold text-steak-950">{(liveBalance ?? 0).toLocaleString()}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-steak-800/50">Grazing tier</dt>
              <dd className="font-semibold text-steak-red">{points?.tier ?? "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-steak-800/50">Marination pts</dt>
              <dd className="font-semibold text-steak-950">{(points?.points ?? 0).toLocaleString()}</dd>
            </div>
            <div className="flex gap-3 pt-2">
              <a
                href={LINKS.streamflow}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full bg-steak-red py-2.5 text-center text-sm font-semibold text-white hover:bg-steak-red/90"
              >
                Stake on Streamflow
              </a>
              <Link
                href="/#register"
                className="flex-1 rounded-full border border-steak-800/20 py-2.5 text-center text-sm font-semibold text-steak-950 hover:bg-steak-950/5"
              >
                Register wallet
              </Link>
            </div>
          </dl>
        )}
      </div>
    </section>
  );
}
