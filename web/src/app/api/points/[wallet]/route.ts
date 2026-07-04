import { NextResponse } from "next/server";
import { getWalletView } from "@/lib/db";

export async function GET(
  _request: Request,
  context: { params: Promise<{ wallet: string }> },
) {
  const { wallet } = await context.params;
  const view = await getWalletView(wallet);

  if (!view) {
    return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
  }

  return NextResponse.json(view);
}
