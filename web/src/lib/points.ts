export interface WalletRecord {
  wallet: string;
  points: number;
  balance: number;
  tier: string;
  first_seen: number;
  last_updated: number;
}

export const TIERS = [
  { name: "Dry-Aged" as const, minBalance: 10_000_000, multiplier: 8 },
  { name: "Prime Cut" as const, minBalance: 1_000_000, multiplier: 4 },
  { name: "Yearling" as const, minBalance: 100_000, multiplier: 2 },
  { name: "Calf" as const, minBalance: 0, multiplier: 1 },
];

export function getTier(balance: number): (typeof TIERS)[number] {
  for (const tier of TIERS) {
    if (balance >= tier.minBalance) return tier;
  }
  return TIERS[TIERS.length - 1];
}

export function getTierMultiplier(balance: number): number {
  return getTier(balance).multiplier;
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
  const tier = getTier(balance);
  const delta = calcSnapshotPoints(balance);
  return {
    wallet,
    balance,
    tier: tier.name,
    points: (existing?.points ?? 0) + delta,
    first_seen: firstSeen,
    last_updated: now,
  };
}

export function toWalletPointsView(record: WalletRecord, now = Date.now()) {
  return {
    wallet: record.wallet,
    balance: record.balance,
    tier: record.tier,
    points: record.points,
    effective_points: effectivePoints(record, now),
    first_seen: record.first_seen,
  };
}
