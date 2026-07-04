export interface WalletRecord {
  wallet: string;
  points: number;
  balance: number;
  tier: string;
  first_seen: number;
  last_updated: number;
}

const TIER_THRESHOLDS = [
  { name: "Dry-Aged", min: 10_000_000, multiplier: 8 },
  { name: "Prime Cut", min: 1_000_000, multiplier: 4 },
  { name: "Yearling", min: 100_000, multiplier: 2 },
  { name: "Calf", min: 0, multiplier: 1 },
] as const;

export function getTier(balance: number): string {
  for (const tier of TIER_THRESHOLDS) {
    if (balance >= tier.min) return tier.name;
  }
  return "Calf";
}

export function getTierMultiplier(balance: number): number {
  for (const tier of TIER_THRESHOLDS) {
    if (balance >= tier.min) return tier.multiplier;
  }
  return 1;
}

export function calcSnapshotPoints(balance: number): number {
  return balance * getTierMultiplier(balance);
}

/** Display bonus: 1.0x at day 0 → 1.5x at 180+ days held */
export function holdBonus(firstSeen: number, now = Date.now()): number {
  const daysHeld = Math.max(0, (now - firstSeen) / (1000 * 60 * 60 * 24));
  return Math.min(1.5, 1.0 + (daysHeld / 180) * 0.5);
}

export function effectivePoints(record: WalletRecord, now = Date.now()): number {
  return Math.floor(record.points * holdBonus(record.first_seen, now));
}

export function buildWalletRecord(
  wallet: string,
  balance: number,
  existing?: WalletRecord,
  now = Date.now(),
): WalletRecord {
  const firstSeen = existing?.first_seen ?? now;
  return {
    wallet,
    balance,
    tier: getTier(balance),
    points: calcSnapshotPoints(balance),
    first_seen: firstSeen,
    last_updated: now,
  };
}
