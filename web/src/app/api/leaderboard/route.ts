import { NextResponse } from "next/server";
import { readPointsData, leaderboardEntries } from "@/lib/data";

export async function GET() {
  const data = await readPointsData();
  return NextResponse.json({ entries: leaderboardEntries(data) });
}
