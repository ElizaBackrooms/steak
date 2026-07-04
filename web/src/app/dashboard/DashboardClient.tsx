"use client";

import { useCallback, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface PointsResponse {
  wallet: string;
  balance: number;
  tier: string;
  points: number;
  effective_points: number;
  first_seen: number | null;
}

interface LeaderboardEntry {
  wallet: string;
  balance: number;
  tier: string;
  points: number;
}

function shorten(addr: string): string {
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}

export default function DashboardClient() {
  const { publicKey, connected } = useWallet();
  const [points, setPoints] = useState<PointsResponse | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (wallet?: string) => {
    setLoading(true);
    try {
      const lbRes = await fetch("/api/leaderboard");
      const lb = (await lbRes.json()) as { entries: LeaderboardEntry[] };
      setLeaderboard(lb.entries.slice(0, 20));

      if (wallet) {
        const ptRes = await fetch(`/api/points/${wallet}`);
        const pt = (await ptRes.json()) as PointsResponse;
        setPoints(pt);
      } else {
        setPoints(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(publicKey?.toBase58());
  }, [publicKey, fetchData]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-steak-cream">The Pasture</h1>
          <p className="mt-1 text-steak-cream/60">Connect your wallet to see your Rancher status.</p>
        </div>
        <WalletMultiButton className="!bg-steak-red !font-semibold hover:!bg-steak-red/90" />
      </div>

      {!connected && (
        <div className="mt-12 rounded-2xl border border-steak-800 bg-steak-900/50 p-10 text-center">
          <p className="text-5xl" aria-hidden>🐄</p>
          <p className="mt-4 text-lg text-steak-cream/70">
            Connect Phantom or Solflare to view your STEAK balance, tier, and harvest points.
          </p>
        </div>
      )}

      {connected && publicKey && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Balance" value={loading ? "…" : formatNum(points?.balance ?? 0)} suffix="STEAK" />
          <StatCard label="Tier" value={loading ? "…" : (points?.tier ?? "Calf")} />
          <StatCard label="Points" value={loading ? "…" : formatNum(points?.points ?? 0)} />
          <StatCard
            label="Effective"
            value={loading ? "…" : formatNum(points?.effective_points ?? 0)}
            hint="includes hold bonus"
          />
        </div>
      )}

      <div className="mt-12">
        <h2 className="font-display text-xl font-bold text-steak-cream">Top Ranchers</h2>
        <p className="mt-1 text-sm text-steak-cream/50">Updated on each snapshot</p>

        <div className="mt-4 overflow-hidden rounded-xl border border-steak-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-steak-900/80 text-steak-cream/60">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Wallet</th>
                <th className="px-4 py-3 font-medium">Tier</th>
                <th className="px-4 py-3 font-medium text-right">Balance</th>
                <th className="px-4 py-3 font-medium text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-steak-cream/50">
                    No snapshot yet — check back after launch.
                  </td>
                </tr>
              )}
              {leaderboard.map((entry, i) => (
                <tr key={entry.wallet} className="border-t border-steak-800/60">
                  <td className="px-4 py-3 text-steak-cream/50">{i + 1}</td>
                  <td className="px-4 py-3 font-mono text-steak-cream">{shorten(entry.wallet)}</td>
                  <td className="px-4 py-3 text-steak-amber">{entry.tier}</td>
                  <td className="px-4 py-3 text-right text-steak-cream">{formatNum(entry.balance)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-steak-cream">
                    {formatNum(entry.points)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
  hint,
}: {
  label: string;
  value: string;
  suffix?: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-steak-800 bg-steak-900/50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-steak-cream/50">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold text-steak-cream">
        {value}
        {suffix && <span className="ml-1 text-sm font-normal text-steak-cream/50">{suffix}</span>}
      </p>
      {hint && <p className="mt-1 text-xs text-steak-cream/40">{hint}</p>}
    </div>
  );
}

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}
