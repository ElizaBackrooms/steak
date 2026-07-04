import { NextResponse } from "next/server";
import { runSnapshot } from "@/lib/snapshot";

export async function POST(request: Request) {
  const secret = process.env.SNAPSHOT_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Snapshot not configured" }, { status: 503 });
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runSnapshot();
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Snapshot failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
