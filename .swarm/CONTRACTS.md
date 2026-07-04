# Shared Contracts

All lanes must respect these interfaces.

## Environment

```env
# Public (web/.env.local)
NEXT_PUBLIC_TOKEN_MINT=
NEXT_PUBLIC_PUMP_URL=https://pump.fun
NEXT_PUBLIC_X_URL=https://x.com/lazefrito
NEXT_PUBLIC_SOLANA_RPC_URL=

# Server-only
STEAK_MINT=              # same as NEXT_PUBLIC_TOKEN_MINT
STEAK_DECIMALS=6
HELIUS_API_KEY=
SNAPSHOT_SECRET=
DATA_PATH=../data        # relative to web/ when running next dev
```

## API Routes (web)

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/api/points/[wallet]` | none | `{ wallet, balance, tier, points, effective_points, first_seen }` |
| GET | `/api/leaderboard` | none | `{ entries: WalletRecord[] }` |
| POST | `/api/snapshot` | `Bearer SNAPSHOT_SECRET` | `{ snapshot_at, wallets_updated }` |

## WalletRecord (`data/points.json`)

```ts
interface WalletRecord {
  wallet: string;
  points: number;
  balance: number;
  tier: string;
  first_seen: number;
  last_updated: number;
}
```

## Points (`web/src/lib/points.ts`)

- Tiers: Calf (0), Yearling (100k), Prime Cut (1M), Dry-Aged (10M)
- `calcSnapshotPoints(balance) = balance * tierMultiplier`
- `holdBonus(firstSeen)` → 1.0x–1.5x for display

## Token constants

- Ticker: STEAK
- Supply: 1B
- Chain: Solana / pump.fun
- Founder: @lazefrito
