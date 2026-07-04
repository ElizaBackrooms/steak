import { Connection, PublicKey } from "@solana/web3.js";
import { buildWalletRecord } from "./points";
import { readPointsData, writePointsData } from "./data";
import { RPC_URL } from "./constants";

const TOKEN_PROGRAM = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
);

function tokenAmount(raw: { amount: string; decimals: number }): number {
  return Number(raw.amount) / 10 ** raw.decimals;
}

async function fetchHoldersViaHelius(
  mint: string,
  apiKey: string,
): Promise<Map<string, number>> {
  const url = `https://api.helius.xyz/v0/token-accounts?api-key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mint }),
  });
  if (!res.ok) {
    throw new Error(`Helius token-accounts failed: ${res.status}`);
  }
  const rows = (await res.json()) as Array<{
    owner: string;
    amount: number;
  }>;
  const map = new Map<string, number>();
  for (const row of rows) {
    map.set(row.owner, (map.get(row.owner) ?? 0) + row.amount);
  }
  return map;
}

async function fetchHoldersViaRpc(
  mint: string,
  connection: Connection,
): Promise<Map<string, number>> {
  const mintKey = new PublicKey(mint);
  const accounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM, {
    filters: [{ dataSize: 165 }, { memcmp: { offset: 0, bytes: mintKey.toBase58() } }],
  });

  const map = new Map<string, number>();
  for (const { account } of accounts) {
    const parsed = account.data as {
      parsed: { info: { owner: string; tokenAmount: { amount: string; decimals: number } } };
    };
    const info = parsed.parsed.info;
    const balance = tokenAmount(info.tokenAmount);
    if (balance <= 0) continue;
    map.set(info.owner, (map.get(info.owner) ?? 0) + balance);
  }
  return map;
}

export async function runSnapshot(): Promise<{
  snapshot_at: number;
  wallets_updated: number;
}> {
  const mint = process.env.STEAK_MINT ?? process.env.NEXT_PUBLIC_TOKEN_MINT;
  if (!mint) {
    throw new Error("STEAK_MINT not configured");
  }

  const heliusKey = process.env.HELIUS_API_KEY;
  const holders = heliusKey
    ? await fetchHoldersViaHelius(mint, heliusKey)
    : await fetchHoldersViaRpc(mint, new Connection(RPC_URL, "confirmed"));

  const now = Date.now();
  const data = await readPointsData();
  let updated = 0;

  for (const [wallet, balance] of Array.from(holders.entries())) {
    const existing = data.wallets[wallet];
    data.wallets[wallet] = buildWalletRecord(wallet, balance, existing, now);
    updated += 1;
  }

  data.last_snapshot = now;
  await writePointsData(data);

  return { snapshot_at: now, wallets_updated: updated };
}
