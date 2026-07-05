/** Steak Cut NFTs — 5 levels, 100k STEAK gate, 200 supply */

export const CUT_LEVELS = [
  {
    level: 1,
    name: "Sirloin",
    label: "Sirloin Cut",
    exampleSerial: 1,
    vibe: "Entry cut — clean, classic, gets you on the board.",
  },
  {
    level: 2,
    name: "Ribeye",
    label: "Ribeye Cut",
    exampleSerial: 2,
    vibe: "Marbled and loud — the herd knows you showed up.",
  },
  {
    level: 3,
    name: "Brisket",
    label: "Brisket Cut",
    exampleSerial: 3,
    vibe: "Low and slow energy — smoked, patient, dangerous.",
  },
  {
    level: 4,
    name: "Porterhouse",
    label: "Porterhouse Cut",
    exampleSerial: 4,
    vibe: "Big bone energy — steakhouse table, no apologies.",
  },
  {
    level: 5,
    name: "Prime",
    label: "Prime Cut",
    exampleSerial: 5,
    vibe: "Dry-aged top tier — the cut they screenshot.",
  },
] as const;

export type CutLevel = (typeof CUT_LEVELS)[number];
export type SteakCutName = CutLevel["name"];

/** @deprecated use CUT_LEVELS */
export const STEAK_CUTS = CUT_LEVELS.map((c) => c.name);

export const NFT = {
  name: "Steak Cut",
  symbol: "CUT",
  minSteakBalance: 100_000,
  maxSupply: 200,
  maxPerWallet: 1,
  levelCount: CUT_LEVELS.length,
} as const;

export function getCutLevel(serial: number): CutLevel {
  const idx = (serial - 1) % CUT_LEVELS.length;
  return CUT_LEVELS[idx];
}

export function getCutForSerial(serial: number): SteakCutName {
  return getCutLevel(serial).name;
}

export function formatCutName(serial: number): string {
  const cut = getCutLevel(serial);
  return `${cut.label} · LVL ${cut.level} #${serial}`;
}

export function formatCutImagePath(serial: number): string {
  const n = Math.max(1, Math.min(NFT.maxSupply, Math.floor(serial)));
  return `/cuts/serial/${String(n).padStart(3, "0")}.jpg`;
}

export function getCutImage(serial: number): string {
  return formatCutImagePath(serial);
}

export function getCutLevelExampleImage(level: number): string {
  const cut = CUT_LEVELS.find((c) => c.level === level) ?? CUT_LEVELS[0];
  return formatCutImagePath(cut.exampleSerial);
}

export type MintRecord = {
  wallet: string;
  serial: number;
  level: number;
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
