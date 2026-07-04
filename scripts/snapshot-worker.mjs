#!/usr/bin/env node
/**
 * Daily snapshot worker — calls POST /api/snapshot on the STEAK dashboard.
 *
 * Usage:
 *   SNAPSHOT_SECRET=... STEAK_MINT=... node scripts/snapshot-worker.mjs
 *   SNAPSHOT_SECRET=... STEAK_MINT=... node scripts/snapshot-worker.mjs --url http://localhost:3000
 *
 * Cron example (daily at 00:05 UTC):
 *   5 0 * * * cd /path/to/steak && node scripts/snapshot-worker.mjs
 */

const baseUrl = process.argv.includes("--url")
  ? process.argv[process.argv.indexOf("--url") + 1]
  : (process.env.DASHBOARD_URL ?? "http://localhost:3000");

const secret = process.env.SNAPSHOT_SECRET;
if (!secret) {
  console.error("Missing SNAPSHOT_SECRET");
  process.exit(1);
}

const res = await fetch(`${baseUrl}/api/snapshot`, {
  method: "POST",
  headers: { Authorization: `Bearer ${secret}` },
});

const body = await res.json().catch(() => ({}));

if (!res.ok) {
  console.error("Snapshot failed:", res.status, body);
  process.exit(1);
}

console.log("Snapshot OK:", JSON.stringify(body));
