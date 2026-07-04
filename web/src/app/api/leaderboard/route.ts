import { NextResponse } from "next/server";

import { leaderboardEntries, readPointsData } from "@/lib/data";
import { effectivePoints } from "@/lib/points";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "100", 10), 100);
  const data = await readPointsData();
  const now = Date.now();
  const entries = leaderboardEntries(data, now).slice(0, limit);

  const leaderboard = entries.map((r, i) => ({
    rank: i + 1,
    wallet: r.wallet,
    points: effectivePoints(r, now),
    balance: r.balance,
    tier: r.tier,
  }));

  return NextResponse.json({ count: leaderboard.length, leaderboard });
}
