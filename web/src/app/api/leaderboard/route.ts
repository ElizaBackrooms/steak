import { NextResponse } from "next/server";
import { getLeaderboard } from "@/lib/db";

export async function GET() {
  const entries = await getLeaderboard();
  return NextResponse.json({ entries });
}
