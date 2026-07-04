import { NextResponse } from "next/server";

import { readPointsData } from "@/lib/data";
import { effectivePoints, holdBonus } from "@/lib/points";

export async function GET(
  _request: Request,
  { params }: { params: { wallet: string } },
) {
  const wallet = params.wallet;
  if (!wallet || wallet.length < 32) {
    return NextResponse.json({ error: "Invalid wallet" }, { status: 400 });
  }

  const data = await readPointsData();
  const record = data.wallets[wallet];
  const now = Date.now();

  if (!record) {
    return NextResponse.json({
      wallet,
      balance: 0,
      tier: "Calf",
      points: 0,
      effective_points: 0,
      first_seen: null,
      nextHarvest: nextButcherDay(),
      streakDays: 0,
    });
  }

  const streakDays = Math.floor((now - record.first_seen) / 86_400_000);

  return NextResponse.json({
    wallet: record.wallet,
    balance: record.balance,
    tier: record.tier,
    points: effectivePoints(record, now),
    raw_points: record.points,
    effective_points: effectivePoints(record, now),
    first_seen: record.first_seen,
    last_updated: record.last_updated,
    nextHarvest: nextButcherDay(),
    streakDays,
    hold_multiplier: holdBonus(record.first_seen, now),
  });
}

function nextButcherDay(): string {
  const next = new Date();
  next.setUTCDate(next.getUTCDate() + ((7 - next.getUTCDay()) % 7 || 7));
  next.setUTCHours(0, 0, 0, 0);
  return next.toISOString().slice(0, 10);
}
