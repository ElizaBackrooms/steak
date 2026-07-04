import { NextResponse } from "next/server";
import { readPointsData } from "@/lib/data";
import { effectivePoints } from "@/lib/points";

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

  if (!record) {
    return NextResponse.json({
      wallet,
      balance: 0,
      tier: "Calf",
      points: 0,
      effective_points: 0,
      first_seen: null,
    });
  }

  return NextResponse.json({
    wallet: record.wallet,
    balance: record.balance,
    tier: record.tier,
    points: record.points,
    effective_points: effectivePoints(record),
    first_seen: record.first_seen,
  });
}
