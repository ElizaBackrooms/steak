import { NextResponse } from "next/server";

import { butcherDayCountdown } from "@/lib/butcher-day";
import { readPointsData } from "@/lib/data";

export async function GET() {
  const points = await readPointsData();
  const ranchers = Object.keys(points.wallets).length;
  const butcher = butcherDayCountdown();

  return NextResponse.json({
    ranchers,
    butcher_day: butcher.iso,
    butcher_countdown: butcher.label,
    last_snapshot: points.last_snapshot,
  });
}
