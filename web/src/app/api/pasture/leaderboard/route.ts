import { NextResponse } from "next/server";

import { pastureLeaderboard, readLocksData } from "@/lib/streamflow-locks";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.min(200, Math.max(1, Number(url.searchParams.get("limit") ?? 50)));

  const data = await readLocksData();
  const leaderboard = pastureLeaderboard(data, limit);

  return NextResponse.json({
    leaderboard,
    total_locked: data.total_locked,
    locker_count: data.locker_count,
    last_synced: data.last_synced,
  });
}
