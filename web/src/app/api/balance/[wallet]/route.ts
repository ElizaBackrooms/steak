import { NextResponse } from "next/server";

import { getSteakBalance } from "@/lib/steak-balance";

export async function GET(
  _request: Request,
  { params }: { params: { wallet: string } },
) {
  const wallet = params.wallet;
  if (!wallet || wallet.length < 32) {
    return NextResponse.json({ error: "Invalid wallet" }, { status: 400 });
  }

  const balance = await getSteakBalance(wallet);
  return NextResponse.json({ wallet, balance });
}
