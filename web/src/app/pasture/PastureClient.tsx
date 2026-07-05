"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { formatUnlockDate } from "@/lib/format";
import { LINKS } from "@/lib/constants";

type Entry = {
  rank: number;
  wallet: string;
  amount: number;
  share_pct: number;
  unlock_at: number | null;
};

function short(addr: string) {
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}

export default function PastureClient() {
  const [rows, setRows] = useState<Entry[]>([]);
  const [totalLocked, setTotalLocked] = useState(0);
  const [lockerCount, setLockerCount] = useState(0);
  const [lastSynced, setLastSynced] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pasture/leaderboard?limit=200")
      .then((r) => r.json())
      .then((d) => {
        setRows(d.leaderboard ?? []);
        setTotalLocked(d.total_locked ?? 0);
        setLockerCount(d.locker_count ?? 0);
        setLastSynced(d.last_synced ?? null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-steak-cream">The Pasture</h1>
        <p className="mt-1 text-steak-cream/60">
          Public leaderboard of STEAK locked on Streamflow — no login, no wallet connect.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Total locked" value={loading ? "…" : totalLocked.toLocaleString()} suffix="STEAK" />
        <Stat label="Lockers" value={loading ? "…" : String(lockerCount)} />
        <Stat
          label="Last synced"
          value={
            loading || !lastSynced
              ? "—"
              : new Date(lastSynced).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
          }
        />
      </div>

      <div className="blood-card mt-10 overflow-hidden rounded-2xl border border-steak-red/20 bg-steak-900/85 backdrop-blur-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-steak-950/60 text-xs uppercase text-steak-cream/50">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Wallet</th>
              <th className="px-4 py-3 text-right">Locked STEAK</th>
              <th className="px-4 py-3 text-right">Share</th>
              <th className="px-4 py-3">Unlocks</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-steak-cream/40">
                  No locks on the board yet. Be the first —{" "}
                  <a href={LINKS.streamflow} className="text-steak-red underline" target="_blank" rel="noopener noreferrer">
                    stake on Streamflow
                  </a>
                  .
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={`${row.rank}-${row.wallet}`} className="border-t border-steak-cream/10">
                <td className="px-4 py-3 text-steak-cream/50">{row.rank}</td>
                <td className="px-4 py-3 font-mono text-steak-cream">{short(row.wallet)}</td>
                <td className="px-4 py-3 text-right font-semibold text-steak-cream">
                  {row.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-steak-red">{row.share_pct.toFixed(2)}%</td>
                <td className="px-4 py-3 text-steak-cream/60">{formatUnlockDate(row.unlock_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-8 text-center text-sm text-steak-cream/50">
        Locked on Streamflow?{" "}
        <Link href="/#register" className="text-steak-red hover:underline">
          Register on the Google form
        </Link>{" "}
        for fee airdrops.
      </p>
    </div>
  );
}

function Stat({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="rounded-xl border border-steak-red/20 bg-steak-900/80 px-4 py-4 text-center backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-steak-cream/50">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-steak-red">
        {value}
        {suffix ? <span className="ml-1 text-sm font-sans text-steak-cream/50">{suffix}</span> : null}
      </p>
    </div>
  );
}
