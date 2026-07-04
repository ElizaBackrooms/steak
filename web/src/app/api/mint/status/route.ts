import { NextResponse } from "next/server";

import { findMintByWallet, readMintRegistry } from "@/lib/mint-registry";
import { NFT, remainingSupply } from "@/lib/nft";
import { getSteakBalance } from "@/lib/steak-balance";
import { checkEligibility } from "@/lib/nft";
import { isOnChainMintConfigured } from "@/lib/nft-mint-onchain";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const wallet = url.searchParams.get("wallet") ?? "";

  const registry = await readMintRegistry();
  const remaining = remainingSupply(registry);
  const existing = wallet ? findMintByWallet(registry, wallet) : undefined;

  let balance = 0;
  let eligible = false;
  let reason = "";

  if (wallet && wallet.length >= 32) {
    balance = await getSteakBalance(wallet);
    const check = checkEligibility(wallet, balance, registry);
    eligible = check.ok;
    if (!check.ok) reason = check.reason;
  }

  return NextResponse.json({
    collection: NFT.name,
    min_steak: NFT.minSteakBalance,
    max_supply: NFT.maxSupply,
    remaining,
    minted: registry.mints.length,
    on_chain_configured: isOnChainMintConfigured(),
    wallet: wallet || null,
    steak_balance: balance,
    eligible,
    reason: reason || null,
    already_minted: existing
      ? { serial: existing.serial, nft_mint: existing.nft_mint ?? null, minted_at: existing.minted_at }
      : null,
  });
}
