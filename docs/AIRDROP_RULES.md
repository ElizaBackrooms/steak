# STEAK Airdrop Rules — The Harvest

**Ticker:** $STEAK · **Chain:** Solana · **Launch:** pump.fun · **Founder:** @lazefrito

*Not legal, tax, or financial advice. These are community reward mechanics, not investment promises.*

---

## Overview

Airdrops are called **Harvests**. They reward Ranchers who hold, stake (soft-stake via marination points), and participate in the herd — not mercenary farmers who snapshot and dump.

Three harvest types:

| Harvest | When | Pool | Who qualifies |
|---------|------|------|---------------|
| **Genesis Harvest** | Snapshot at T+72h | 100M STEAK | Genesis NFT minters + early holders |
| **Loyalty Harvest** | Every Sunday 00:00 UTC ("Butcher Day") | 1% of Barn treasury | Active Yearling+ stakers |
| **Viral Harvest** | Event-triggered | Barn bonus | Holders who interacted with STEAK that week |

---

## 1. Genesis Harvest (first 72 hours)

### Eligibility

A wallet qualifies if **any** of:

1. **Genesis Rancher NFT** — free mint (gas only) within 72h of T-0. Cap: 10,000 NFTs.
2. **Early holder** — held ≥ 25,000 STEAK continuously for the final 24h before snapshot.
3. **Proof of Steak** — posted on X with `#BottleFedToBlockchain` and `$STEAK`, wallet linked via dashboard.

### Distribution

- **100,000,000 STEAK** total from the Genesis Harvest treasury (10% of supply — see `TOKENOMICS.md` §2).
- NFT minters: **1,000 STEAK** each (10M STEAK if cap hit).
- Remainder split **pro-rata by marination points** at snapshot (see dashboard).

### Vesting

- **25%** unlocked at claim.
- **75%** linear over 60 days.
- Must maintain ≥ 10,000 STEAK balance during vesting or forfeit unvested portion.

### Snapshot

- **Block/time:** exactly T+72h from CA post. Published in advance.
- **Transparency:** snapshot block number + Solscan link posted publicly within 60 seconds.

---

## 2. Loyalty Harvest (weekly Butcher Day)

### Eligibility

- Wallet staked in **Yearling (30d), Prime Cut (90d), or Dry-Aged (180d)** tier at snapshot.
- Minimum **21 consecutive days** in qualifying tier before snapshot.
- Minimum **25,000 STEAK** staked at snapshot.

*Calf (7d) tier does not qualify — you have to commit to the herd.*

### Scoring

```
Believer Score = avg_staked × tier_multiplier × tenure_multiplier
```

| Grazing tier | Tier multiplier |
|--------------|-----------------|
| Yearling (30d) | 2x |
| Prime Cut (90d) | 4x |
| Dry-Aged (180d) | 8x |

| Tenure in tier | Multiplier |
|----------------|------------|
| 21–44 days | 1.0x |
| 45–74 days | 1.2x |
| 75+ days | 1.5x |

### Distribution

- **1% of Barn treasury** per Sunday 00:00 UTC.
- **20%** instant claim, **80%** vested over 30 days.
- Unstaking during vesting = forfeit unvested.

---

## 3. Viral Harvest (event-triggered)

### Trigger

Any post with `#STEAK` or `#BottleFedToBlockchain` exceeds **100,000 impressions in 24 hours**.

The triggering post does not need to be from a holder — the community earns the drop by making the tag go viral.

### Eligibility

Wallets that **both**:

- Held ≥ **1,000 STEAK** during the 24h impression window, and
- Interacted with STEAK contracts or the dashboard that week (buy, stake, NFT mint, or wallet link).

### Distribution

- Bonus from Barn treasury (amount announced per event).
- Equal split among eligible wallets, capped at top **5,000** by marination points.

---

## Soft-stake / Marination Points (pre-on-chain staking)

Until on-chain Grazing Seasons ship, the dashboard tracks **marination points**:

- Daily snapshot of STEAK balances via Helius.
- Points = `balance × tier_multiplier` per day.
- Hold bonus: up to **1.5x** for wallets held 365+ days.
- Points determine Genesis Harvest pro-rata share and leaderboard rank.

**This is not yield.** Points are eligibility weight for community distributions.

---

## Anti-farm rules

- Minimum **7-day wallet age** to claim any harvest.
- Transfers > **50%** of balance within 24h of snapshot = disqualified.
- Sybil clusters (funded from same source, identical timing) filtered manually.
- Published exclusion list with reason codes (turns defense into lore).

---

## How to claim

1. Connect wallet at `/dashboard`.
2. Verify eligibility when harvest opens.
3. Sign transaction to claim (gas only).
4. Vested portions claimable from dashboard as they unlock.

---

## Transparency

- All harvest tx hashes posted on X and pinned in Telegram.
- Eligibility CSV published before each claim window.
- Barn treasury balance visible on Solscan.

---

*Rules may be amended by Dry-Aged governance after Season 1. Genesis Harvest rules are fixed at T-0.*
