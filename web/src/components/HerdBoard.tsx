"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Entry {
  rank: number;
  wallet: string;
  tier: string;
  points: number;
}

function short(w: string) {
  return `${w.slice(0, 4)}…${w.slice(-4)}`;
}

export default function HerdBoard() {
  const [rows, setRows] = useState<Entry[]>([]);

  useEffect(() => {
    fetch("/api/leaderboard?limit=10")
      .then((r) => r.json())
      .then((d: { leaderboard: Entry[] }) => setRows(d.leaderboard ?? []))
      .catch(() => {});
  }, []);

  return (
    <section id="herd" className="border-t border-steak-800/60 px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-steak-amber">The Herd</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-steak-cream">Top Ranchers</h2>
            <p className="mt-1 text-sm text-steak-cream/50">By marination points · updates each snapshot</p>
          </div>
          <Link href="/dashboard" className="text-sm font-semibold text-steak-amber hover:underline">
            Full pasture →
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-steak-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-steak-900/80 text-xs uppercase text-steak-cream/50">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Wallet</th>
                <th className="px-4 py-3">Tier</th>
                <th className="px-4 py-3 text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-steak-cream/40">
                    No snapshot yet — buy STEAK, be first on the board.
                  </td>
                </tr>
              )}
              {rows.map((row) => (
                <tr key={row.wallet} className="border-t border-steak-800/60">
                  <td className="px-4 py-3 text-steak-cream/50">{row.rank}</td>
                  <td className="px-4 py-3 font-mono text-steak-cream">{short(row.wallet)}</td>
                  <td className="px-4 py-3 text-steak-amber">{row.tier}</td>
                  <td className="px-4 py-3 text-right font-semibold text-steak-cream">
                    {row.points.toLocaleString()}
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
