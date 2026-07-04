import { NextResponse } from "next/server";

import { registerMint, readMintRegistry } from "@/lib/mint-registry";
import { checkEligibility } from "@/lib/nft";
import { getSteakBalance } from "@/lib/steak-balance";
import { isOnChainMintConfigured, mintSteakCutOnChain } from "@/lib/nft-mint-onchain";
import { formatCutName } from "@/lib/nft";

export async function POST(req: Request) {
  let body: { wallet?: string };
  try {
    body = (await req.json()) as { wallet?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const wallet = body.wallet?.trim();
  if (!wallet || wallet.length < 32) {
    return NextResponse.json({ error: "Invalid wallet address" }, { status: 400 });
  }

  const registry = await readMintRegistry();
  const balance = await getSteakBalance(wallet);
  const check = checkEligibility(wallet, balance, registry);

  if (!check.ok) {
    return NextResponse.json({ error: check.reason }, { status: 403 });
  }

  const serial = registry.next_serial;

  let onchain: { nft_mint: string; tx: string } | undefined;
  if (isOnChainMintConfigured()) {
    try {
      onchain = await mintSteakCutOnChain(wallet, serial);
    } catch (err) {
      const message = err instanceof Error ? err.message : "On-chain mint failed";
      return NextResponse.json({ error: message }, { status: 502 });
    }
  }

  try {
    const record = await registerMint(wallet, balance, onchain);
    return NextResponse.json({
      ok: true,
      serial: record.serial,
      name: formatCutName(record.serial),
      cut: record.cut,
      nft_mint: record.nft_mint ?? null,
      tx: record.tx ?? null,
      on_chain: Boolean(onchain),
      message: onchain
        ? "Steak Cut minted to your wallet. Trade it freely — hold for future Harvests."
        : "Steak Cut reserved. On-chain mint will be sent when collection authority is live.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Registry error";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}
