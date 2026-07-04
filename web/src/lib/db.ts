import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { PointsStore, WalletRecord } from "./points";
import {
  calcSnapshotPoints,
  effectivePoints,
  getTier,
  toWalletPointsView,
} from "./points";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DEFAULT_STORE: PointsStore = { snapshot_at: null, wallets: {} };

function resolveDataPath(): string {
  const configured = process.env.DATA_PATH ?? "../data";
  if (path.isAbsolute(configured)) {
    return path.join(configured, "points.json");
  }
  return path.resolve(__dirname, "..", "..", configured, "points.json");
}

export async function readStore(): Promise<PointsStore> {
  const filePath = resolveDataPath();
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as PointsStore;
    return {
      snapshot_at: parsed.snapshot_at ?? null,
      wallets: parsed.wallets ?? {},
    };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return structuredClone(DEFAULT_STORE);
    }
    throw err;
  }
}

export async function writeStore(store: PointsStore): Promise<void> {
  const filePath = resolveDataPath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

export async function getWallet(wallet: string): Promise<WalletRecord | null> {
  const store = await readStore();
  return store.wallets[wallet] ?? null;
}

export async function getLeaderboard(limit = 50, now = Date.now()) {
  const store = await readStore();
  const entries = Object.values(store.wallets)
    .map((record) => ({
      ...record,
      effective_points: effectivePoints(record.points, record.first_seen, now),
    }))
    .sort((a, b) => b.effective_points - a.effective_points || b.points - a.points)
    .slice(0, limit);
  return entries;
}

export async function getWalletView(wallet: string, now = Date.now()) {
  const record = await getWallet(wallet);
  if (!record) return null;
  return toWalletPointsView(record, now);
}

export async function applySnapshot(
  holders: Map<string, number>,
  now = Date.now(),
): Promise<{ snapshot_at: number; wallets_updated: number }> {
  const store = await readStore();

  for (const [wallet, balance] of holders) {
    const existing = store.wallets[wallet];
    const { name: tier } = getTier(balance);
    const points = calcSnapshotPoints(balance);
    const firstSeen = existing?.first_seen ?? now;

    store.wallets[wallet] = {
      wallet,
      balance,
      tier,
      points,
      first_seen: firstSeen,
      last_updated: now,
    };
  }

  store.snapshot_at = now;
  await writeStore(store);

  return { snapshot_at: now, wallets_updated: holders.size };
}
