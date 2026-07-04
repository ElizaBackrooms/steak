export interface WalletRecord {
  wallet: string;
  points: number;
  balance: number;
  tier: string;
  first_seen: number;
  last_updated: number;
}

export interface PointsStore {
  snapshot_at: number | null;
  wallets: Record<string, WalletRecord>;
}

export const TIER_THRESHOLDS = [
  { name: "Dry-Aged", minBalance: 10_000_000, multiplier: 10 },
  { name: "Prime Cut", minBalance: 1_000_000, multiplier: 5 },
  { name: "Yearling", minBalance: 100_000, multiplier: 2 },
  { name: "Calf", minBalance: 0, multiplier: 1 },
] as const;

export function getTier(balance: number): { name: string; multiplier: number } {
  for (const tier of TIER_THRESHOLDS) {
    if (balance >= tier.minBalance) {
      return { name: tier.name, multiplier: tier.multiplier };
    }
  }
  return { name: "Calf", multiplier: 1 };
}

export function calcSnapshotPoints(balance: number): number {
  const { multiplier } = getTier(balance);
  return balance * multiplier;
}

const MS_PER_DAY = 86_400_000;
const HOLD_BONUS_MAX_DAYS = 365;
const HOLD_BONUS_MIN = 1;
const HOLD_BONUS_MAX = 1.5;

/** Linear 1.0x–1.5x bonus for wallets held up to one year. */
export function holdBonus(firstSeen: number, now = Date.now()): number {
  const days = Math.max(0, (now - firstSeen) / MS_PER_DAY);
  const ratio = Math.min(days / HOLD_BONUS_MAX_DAYS, 1);
  return HOLD_BONUS_MIN + ratio * (HOLD_BONUS_MAX - HOLD_BONUS_MIN);
}

export function effectivePoints(points: number, firstSeen: number, now = Date.now()): number {
  return points * holdBonus(firstSeen, now);
}

export interface WalletPointsView {
  wallet: string;
  balance: number;
  tier: string;
  points: number;
  effective_points: number;
  first_seen: number;
}

export function toWalletPointsView(record: WalletRecord, now = Date.now()): WalletPointsView {
  return {
    wallet: record.wallet,
    balance: record.balance,
    tier: record.tier,
    points: record.points,
    effective_points: effectivePoints(record.points, record.first_seen, now),
    first_seen: record.first_seen,
  };
}
