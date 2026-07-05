import { promises as fs } from "fs";
import path from "path";

export type LockRecord = {
  wallet: string;
  amount: number;
  unlock_at: number | null;
  stream_id?: string;
};

export type LocksData = {
  locks: LockRecord[];
  last_synced: number | null;
  total_locked: number;
  locker_count: number;
};

export type PastureEntry = LockRecord & {
  rank: number;
  share_pct: number;
};

const EMPTY: LocksData = {
  locks: [],
  last_synced: null,
  total_locked: 0,
  locker_count: 0,
};

function locksFilePath(): string {
  const base = process.env.DATA_PATH ?? path.join(process.cwd(), "..", "data");
  return path.resolve(base, "streamflow-locks.json");
}

export async function readLocksData(): Promise<LocksData> {
  try {
    const raw = await fs.readFile(locksFilePath(), "utf8");
    const parsed = JSON.parse(raw) as LocksData;
    return {
      locks: parsed.locks ?? [],
      last_synced: parsed.last_synced ?? null,
      total_locked: parsed.total_locked ?? 0,
      locker_count: parsed.locker_count ?? parsed.locks?.length ?? 0,
    };
  } catch {
    return { ...EMPTY };
  }
}

export function pastureLeaderboard(data: LocksData, limit = 25): PastureEntry[] {
  const sorted = [...data.locks].sort((a, b) => b.amount - a.amount);
  const total = data.total_locked || sorted.reduce((s, r) => s + r.amount, 0);

  return sorted.slice(0, limit).map((row, i) => ({
    ...row,
    rank: i + 1,
    share_pct: total > 0 ? (row.amount / total) * 100 : 0,
  }));
}
