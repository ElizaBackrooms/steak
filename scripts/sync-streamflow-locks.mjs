#!/usr/bin/env node
/**
 * Sync Streamflow token locks into data/streamflow-locks.json.
 * Requires STEAK_MINT (or NEXT_PUBLIC_TOKEN_MINT) and optional SOLANA_RPC_URL.
 *
 * Usage: npm run sync:streamflow
 */

import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Connection, PublicKey } from "@solana/web3.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "streamflow-locks.json");

const STREAMFLOW_PROGRAM = new PublicKey("strmRqUCoQUgGUan5YhzUZa6KqdzwX5L6FpUxfmKg5m");
const RPC = process.env.SOLANA_RPC_URL ?? process.env.NEXT_PUBLIC_SOLANA_RPC_URL ?? "https://api.mainnet-beta.solana.com";
const MINT = process.env.STEAK_MINT ?? process.env.NEXT_PUBLIC_TOKEN_MINT;
const DECIMALS = Number(process.env.STEAK_DECIMALS ?? 6);

if (!MINT || MINT === "ComingSoon") {
  console.error("Set STEAK_MINT or NEXT_PUBLIC_TOKEN_MINT to your token CA.");
  process.exit(1);
}

const connection = new Connection(RPC, "confirmed");
const mintKey = new PublicKey(MINT);

// Streamflow stream account layout offsets (token mint at 8+1+32+32 = 73 for v5 streams — verify on-chain)
// Fallback: scan program accounts and filter by memcmp on mint if layout shifts.
const MINT_OFFSET = 73;

const accounts = await connection.getProgramAccounts(STREAMFLOW_PROGRAM, {
  filters: [{ memcmp: { offset: MINT_OFFSET, bytes: mintKey.toBase58() } }],
});

const locks = [];
const byWallet = new Map();

for (const { pubkey, account } of accounts) {
  try {
    const data = account.data;
    // recipient pubkey at offset 41 (8 disc + 1 bump + 32 sender)
    const recipient = new PublicKey(data.subarray(41, 73));
    // deposited amount u64 at offset 105 (approx — may need tuning per Streamflow version)
    const amountRaw = data.readBigUInt64LE(105);
    const amount = Number(amountRaw) / 10 ** DECIMALS;
    if (amount <= 0) continue;

    const wallet = recipient.toBase58();
    const existing = byWallet.get(wallet) ?? { wallet, amount: 0, unlock_at: null, stream_id: pubkey.toBase58() };
    existing.amount += amount;
    byWallet.set(wallet, existing);
  } catch {
    // skip malformed accounts
  }
}

for (const row of byWallet.values()) {
  locks.push(row);
}

const total_locked = locks.reduce((s, r) => s + r.amount, 0);
const payload = {
  last_synced: Date.now(),
  total_locked: Math.round(total_locked),
  locker_count: locks.length,
  locks: locks.sort((a, b) => b.amount - a.amount),
};

await fs.mkdir(path.dirname(OUT), { recursive: true });
await fs.writeFile(OUT, JSON.stringify(payload, null, 2), "utf8");
console.log(`Synced ${locks.length} lockers · ${Math.round(total_locked).toLocaleString()} STEAK locked`);
