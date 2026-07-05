"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { formatUnlockDate } from "@/lib/format";

type Entry = {
  rank: number;
  wallet: string;
  amount: number;
  share_pct: number;
  unlock_at: number | null;
};

function short(w: string) {
  return `${w.slice(0, 4)}…${w.slice(-4)}`;
}

export default function PastureBoard({ limit = 10 }: { limit?: number }) {
  const [rows, setRows] = useState<Entry[]>([]);
  const [totalLocked, setTotalLocked] = useState(0);

  useEffect(() => {
    fetch(`/api/pasture/leaderboard?limit=${limit}`)
      .then((r) => r.json())
      .then((d: { leaderboard: Entry[]; total_locked: number }) => {
        setRows(d.leaderboard ?? []);
        setTotalLocked(d.total_locked ?? 0);
      })
      .catch(() => {});
  }, [limit]);

  return (
    <section id="pasture" className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-steak-amber">The Pasture</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-steak-cream">Streamflow lock leaderboard</h2>
            <p className="mt-1 text-sm text-steak-cream/50">
              Public · sorted by locked STEAK
              {totalLocked > 0 ? ` · ${totalLocked.toLocaleString()} total locked` : ""}
            </p>
          </div>
          <Link href="/pasture" className="text-sm font-semibold text-steak-red hover:underline">
            Full pasture →
          </Link>
        </div>

        <div className="blood-card mt-8 overflow-hidden rounded-2xl border border-steak-red/20 bg-steak-900/85 backdrop-blur-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-steak-950/60 text-xs uppercase text-steak-cream/50">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Wallet</th>
                <th className="px-4 py-3 text-right">Locked STEAK</th>
                <th className="hidden px-4 py-3 text-right sm:table-cell">Share</th>
                <th className="hidden px-4 py-3 md:table-cell">Unlocks</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-steak-cream/40">
                    No locks synced yet — lock on Streamflow and you&apos;ll show up here.
                  </td>
                </tr>
              )}
              {rows.map((row) => (
                <tr key={row.wallet} className="border-t border-steak-cream/10">
                  <td className="px-4 py-3 text-steak-cream/50">{row.rank}</td>
                  <td className="px-4 py-3 font-mono text-steak-cream">{short(row.wallet)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-steak-cream">
                    {row.amount.toLocaleString()}
                  </td>
                  <td className="hidden px-4 py-3 text-right text-steak-red sm:table-cell">
                    {row.share_pct.toFixed(1)}%
                  </td>
                  <td className="hidden px-4 py-3 text-steak-cream/60 md:table-cell">
                    {formatUnlockDate(row.unlock_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
