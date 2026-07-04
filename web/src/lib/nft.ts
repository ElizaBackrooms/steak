/** Steak Cut NFTs — single tier, 100k STEAK gate, 200 supply */

export const STEAK_CUTS = [
  "Ribeye",
  "Sirloin",
  "Brisket",
  "Porterhouse",
  "T-Bone",
  "Filet",
  "Flank",
  "Chuck",
] as const;

export type SteakCutName = (typeof STEAK_CUTS)[number];

export const NFT = {
  name: "Steak Cut",
  symbol: "CUT",
  minSteakBalance: 100_000,
  maxSupply: 200,
  maxPerWallet: 1,
} as const;

/** Serial 1–200 maps to a cut type (cycles through STEAK_CUTS). */
export function getCutForSerial(serial: number): SteakCutName {
  return STEAK_CUTS[(serial - 1) % STEAK_CUTS.length];
}

export function formatCutName(serial: number): string {
  return `${getCutForSerial(serial)} Cut #${serial}`;
}

export type MintRecord = {
  wallet: string;
  serial: number;
  cut: SteakCutName;
  steak_balance: number;
  minted_at: number;
  nft_mint?: string;
  tx?: string;
};

export type MintRegistry = {
  mints: MintRecord[];
  next_serial: number;
};

export type EligibilityResult =
  | { ok: true }
  | { ok: false; reason: string };

export function checkEligibility(
  wallet: string,
  steakBalance: number,
  registry: MintRegistry,
): EligibilityResult {
  if (!wallet || wallet.length < 32) {
    return { ok: false, reason: "Invalid wallet address" };
  }

  if (registry.mints.length >= NFT.maxSupply) {
    return { ok: false, reason: "All 200 Steak Cuts have been minted" };
  }

  const already = registry.mints.find((m) => m.wallet === wallet);
  if (already) {
    return { ok: false, reason: "This wallet already minted a Steak Cut" };
  }

  if (steakBalance < NFT.minSteakBalance) {
    return {
      ok: false,
      reason: `Need at least ${NFT.minSteakBalance.toLocaleString()} STEAK (you have ${steakBalance.toLocaleString()})`,
    };
  }

  return { ok: true };
}

export function remainingSupply(registry: MintRegistry): number {
  return Math.max(0, NFT.maxSupply - registry.mints.length);
}
