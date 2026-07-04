import { NextResponse } from "next/server";

import { butcherDayCountdown } from "@/lib/butcher-day";
import { readMintRegistry } from "@/lib/mint-registry";
import { readPointsData } from "@/lib/data";
import { NFT, remainingSupply, formatCutName } from "@/lib/nft";

export async function GET() {
  const [registry, points] = await Promise.all([readMintRegistry(), readPointsData()]);

  const ranchers = Object.keys(points.wallets).length;
  const minted = registry.mints.length;
  const remaining = remainingSupply(registry);
  const butcher = butcherDayCountdown();
  const nextCut = formatCutName(registry.next_serial);

  return NextResponse.json({
    ranchers,
    minted,
    remaining,
    max_cuts: NFT.maxSupply,
    min_steak_mint: NFT.minSteakBalance,
    next_cut_name: minted < NFT.maxSupply ? nextCut : null,
    butcher_day: butcher.iso,
    butcher_countdown: butcher.label,
    last_snapshot: points.last_snapshot,
  });
}
