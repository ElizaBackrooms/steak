"use client";

import { useEffect, useState } from "react";

type RanchStats = {
  ranchers: number;
  butcher_countdown: string;
};

export default function RanchHud() {
  const [stats, setStats] = useState<RanchStats | null>(null);

  useEffect(() => {
    const load = () =>
      fetch("/api/ranch/stats", { cache: "no-store" })
        .then((r) => r.json())
        .then((d) => setStats(d as RanchStats))
        .catch(() => {});

    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "Ranchers tracked", value: stats ? String(stats.ranchers) : "—" },
    { label: "Lock period", value: "1 year" },
    { label: "Butcher Day", value: stats ? stats.butcher_countdown : "—" },
  ];

  return (
    <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-steak-800/10 bg-steak-cream/50 px-4 py-3 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-steak-800/50">{item.label}</p>
          <p className="mt-1 font-display text-2xl font-bold text-steak-red">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
