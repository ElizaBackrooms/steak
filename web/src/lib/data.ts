import { promises as fs } from "fs";
import path from "path";
import type { WalletRecord } from "./points";

export interface PointsData {
  wallets: Record<string, WalletRecord>;
  last_snapshot: number | null;
}

const EMPTY: PointsData = { wallets: {}, last_snapshot: null };

function dataFilePath(): string {
  const base = process.env.DATA_PATH ?? path.join(process.cwd(), "..", "data");
  return path.resolve(base, "points.json");
}

export async function readPointsData(): Promise<PointsData> {
  try {
    const raw = await fs.readFile(dataFilePath(), "utf8");
    return JSON.parse(raw) as PointsData;
  } catch {
    return { ...EMPTY, wallets: {} };
  }
}

export async function writePointsData(data: PointsData): Promise<void> {
  const file = dataFilePath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

export function leaderboardEntries(data: PointsData): WalletRecord[] {
  return Object.values(data.wallets).sort((a, b) => b.points - a.points);
}
