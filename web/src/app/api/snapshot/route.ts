import { NextResponse } from "next/server";
import { applySnapshot } from "@/lib/db";
import { fetchTokenHolders } from "@/lib/helius";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(request: Request) {
  const secret = process.env.SNAPSHOT_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "SNAPSHOT_SECRET not configured" }, { status: 500 });
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return unauthorized();
  }

  const mint = process.env.STEAK_MINT;
  const apiKey = process.env.HELIUS_API_KEY;
  if (!mint || !apiKey) {
    return NextResponse.json(
      { error: "STEAK_MINT and HELIUS_API_KEY must be configured" },
      { status: 500 },
    );
  }

  const holders = await fetchTokenHolders(mint, apiKey);
  const result = await applySnapshot(holders);
  return NextResponse.json(result);
}
