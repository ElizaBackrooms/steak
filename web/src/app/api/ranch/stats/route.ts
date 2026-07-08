import { NextResponse } from "next/server";

import { butcherDayCountdown } from "@/lib/butcher-day";
import { readLocksData } from "@/lib/streamflow-locks";

export async function GET() {
  const locks = await readLocksData();
  const butcher = butcherDayCountdown();

  return NextResponse.json({
    lockers: locks.locker_count,
    total_locked: locks.total_locked,
    last_synced: locks.last_synced,
    butcher_day: butcher.iso,
    butcher_countdown: butcher.label,
  });
}
