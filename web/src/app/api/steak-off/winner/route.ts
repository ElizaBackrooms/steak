import { NextResponse } from "next/server";

import { lastWeekId, readSteakOff, sortByLikes } from "@/lib/steak-off";

export const dynamic = "force-dynamic";

export async function GET() {
  const week = lastWeekId();
  const data = await readSteakOff();
  const posts = sortByLikes(data.weeks[week] ?? []);
  const winner = posts[0] ?? null;
  return NextResponse.json({ week, winner });
}
