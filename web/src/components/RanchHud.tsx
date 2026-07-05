"use client";

import { useEffect, useState } from "react";

type RanchStats = {
  ranchers: number;
  minted: number;
  remaining: number;
  max_cuts: number;
  butcher_countdown: string;
};

export default function RanchHud() {
  const [stats, setStats] = useState<RanchStats | null>(null);

  useEffect(() => {
    fetch("/api/ranch/stats", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setStats(d as RanchStats))
      .catch(() => {});
    const id = setInterval(() => {
      fetch("/api/ranch/stats", { cache: "no-store" })
        .then((r) => r.json())
        .then((d) => setStats(d as RanchStats))
        .catch(() => {});
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "Ranchers tracked", value: stats ? String(stats.ranchers) : "—" },
    { label: "Cuts left", value: stats ? `${stats.remaining}/${stats.max_cuts}` : "—" },
    { label: "Butcher Day", value: stats ? stats.butcher_countdown : "—" },
  ];

  return (
    <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-steak-800/80 bg-steak-900/60 px-4 py-3 text-center backdrop-blur-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-steak-cream/50">{item.label}</p>
          <p className="mt-1 font-display text-2xl font-bold text-steak-amber">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
