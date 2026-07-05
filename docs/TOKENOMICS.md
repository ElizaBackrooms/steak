# STEAK Tokenomics

**Ticker:** $STEAK
**Chain:** Solana
**Launch venue:** pump.fun (bonding curve → Raydium migration)
**Total supply:** 1,000,000,000 STEAK (1 billion — "a whole herd")
**Decimals:** 6 (Solana SPL default)
**Mint authority after launch:** revoked
**Freeze authority after launch:** revoked
**Founder:** @lazefrito

*Nothing in this document is legal, tax, or financial advice. Consult counsel before acting on any of it.*

---

## 1. Supply and units

- **Total supply:** 1,000,000,000 STEAK, fixed at launch. No mint function survives launch.
- **Unit convention:** 1 STEAK = "1 oz." Fractional balances marketed as **cuts**:
  - Sirloin cut = 1,000 STEAK
  - Ribeye cut = 10,000 STEAK
  - Brisket cut = 100,000 STEAK
- Wallet size tiers (community lore, not enforced):
  - **Rancher:** ≥ 100,000 STEAK
  - **Ranch Boss:** ≥ 1,000,000 STEAK
  - **Cattle Baron:** ≥ 10,000,000 STEAK

---

## 2. Allocation

Total = 1,000,000,000 STEAK.

| Bucket | % | Amount | Purpose |
|---|---|---|---|
| **Public liquidity pool** | 40% | 400,000,000 | Deposited into bonding curve at launch. Migrates to Raydium at graduation. LP tokens burned. |
| **The Pasture** (staking rewards vault) | 30% | 300,000,000 | Emitted only through staking. Time-locked emission schedule (§5). |
| **Genesis Harvest** (first-72h airdrop) | 10% | 100,000,000 | Free-mint Genesis NFT + verified holders in first 72h (see AIRDROP_RULES.md). |
| **The Ranch Hand** (team / dev) | 10% | 100,000,000 | 12-month linear vest, 3-month cliff. Vesting contract published on day 1. |
| **The Barn** (community treasury) | 10% | 100,000,000 | Governed by Dry-Aged stakers. Used for Loyalty Harvest, meme bounties, listings, ops. |

**Notes:**
- pump.fun's bonding curve model does not let a project "reserve" 40% off-curve at genesis. In practice, the Public LP 40% is the bonding curve itself (which is the launch mechanic on pump.fun) and the other 60% is held in **transparent on-chain multisigs** funded from a treasury allocation minted at token creation, OR the project treats the bonding curve as the LP and the other 60% is minted via an SPL token program where authorities are revoked immediately after distribution.
- Founder must publish the addresses for every bucket on day 1. See §7 (Transparency).

---

## 3. The Pasture — staking

Staking is a **ranching commitment mechanic**, not an APY farm.

### 3.1 Grazing Seasons (lock periods)

| Tier | Lock | Reward multiplier | Extras |
|---|---|---|---|
| 🐄 **Calf** | 7 days | 1x | Entry tier. No governance rights. |
| 🐂 **Yearling** | 30 days | 2x | Eligible for Loyalty Harvest. |
| 🥩 **Prime Cut** | 90 days | 4x | Eligible for Loyalty Harvest at 1.5x weight. |
| 🔥 **Dry-Aged** | 180 days | 8x | Governance rights, Loyalty Harvest, Viral Harvest priority. |

- Each stake creates a non-transferable on-chain position keyed to the wallet.
- Unstaking before lock expiry triggers the Slaughter Tax (§3.3).

### 3.2 Emission schedule

- Total emissions pool: 300,000,000 STEAK.
- **Halving every 90 days ("Season").**
- Season 1 emits **50%** of the pool → 150,000,000 STEAK over 90 days.
- Season 2 emits half that → 75,000,000 STEAK over 90 days.
- Season 3 → 37,500,000. And so on.
- Emissions stop when the vault is empty (asymptotically 8–10 seasons).

Rewards per staker in a given block:
```
reward_i = block_emission * (staked_i * multiplier_i) / sum_over_all(staked_j * multiplier_j)
```

Publish the exact emission rate on-chain and in TOKENOMICS.md updates after every Season boundary.

### 3.3 Slaughter Tax

Early unstake before the lock ends:

- **25% of the unstaked principal is burned** (sent to the incinerator address `1111111111111111111111111111111111` or actual on-chain burn program).
- **5% is redistributed pro-rata** to the remaining stakers of the same or longer tier.
- The remaining **70% returns to the wallet.**

The tax is deliberately punitive. Frame publicly as: *"You raised it. You left it. That's not ranching. That's abandonment."*

### 3.4 Grazing bonus

Any wallet that never unstakes early during a full Season receives a **10% bonus emission** at the Season boundary, paid from the Barn treasury. Rewards loyalty without inflating supply.

---

## 4. The Harvest — airdrops

Full rules in `docs/AIRDROP_RULES.md`. Summary here:

- **Genesis Harvest (T+0 to T+72h):** 100M STEAK to first 10,000 Genesis Rancher NFT minters + verified holders.
- **Loyalty Harvest (weekly, "Butcher Day" = every Sunday 00:00 UTC):** 1% of Barn treasury pro-rata to active Yearling+ stakers.
- **Viral Harvest (event-triggered):** if a `#STEAK` or `#BottleFedToBlockchain` post exceeds 100K impressions in 24h, snapshot is taken and a bonus drop is distributed to wallets that both held STEAK and posted with the hashtag that week.

---

## 5. Governance — Dry-Aged only

- Only Dry-Aged stakers (180-day lock) can vote.
- 1 STEAK staked Dry-Aged = 1 vote. No delegated voting for the first 6 months.
- Governance scope:
  - Barn treasury spends > 1% per proposal.
  - Emission tweaks after Season 2.
  - New Harvest event types.
  - Partnership approvals.
- Founder holds no veto after month 6.

---

## 6. Slaughter Tax — burn dynamics (deflation)

Every early unstake is a burn event. Over time this reduces circulating supply. The community will publish a live **Slaughter Ticker** showing total STEAK burned. This is a story mechanic as much as a tokenomics one — the market gets the joke.

**Projected burn scenarios** (illustrative, not a forecast):
- If 20% of Season 1 stakers unstake early: ~7.5M STEAK burned in 90 days.
- If 50% do: ~18.75M STEAK burned in 90 days.

These are ballpark numbers. Actuals will be posted weekly.

---

## 7. Transparency — addresses to publish on day 1

Publish in the pinned tweet reply chain and in the TOKENOMICS.md footer as soon as you have them:

- **Token mint address (CA):** _____________________
- **Bonding curve / LP address:** _____________________
- **The Pasture (staking vault):** _____________________
- **Genesis Harvest treasury:** _____________________
- **Ranch Hand vesting contract:** _____________________
- **Barn treasury multisig:** _____________________
- **Slaughter Tax burn destination:** _____________________
- **Team wallets (all of them):** _____________________

Every one of these should be viewable on Solscan or Solana Explorer with a one-click check.

**No secret wallets. No side allocations. No "advisors" bag.**

---

## 8. Vesting — The Ranch Hand

- **Total team allocation:** 100M STEAK (10%).
- **Cliff:** 3 months from launch. Nothing withdrawable before then.
- **Vest:** linear over 12 months from launch (i.e. tokens become withdrawable at cliff = 25M, then ~8.33M/month over the next 9 months).
- **Vesting contract:** deployed to Solana, address published day 1. Community can watch the tokens vest in real time.

If the founder wants to sell any vested amount, announce 72h in advance in the pinned channel: amount, wallet, reason. Frame as *"trimming the herd"*.

---

## 9. Anti-sniper design (for first ~30 minutes of trading)

pump.fun's bonding curve provides some natural anti-sniper pressure via price impact. In addition:

- **First 30 min:** the Barn treasury will make counter-buys against dumps > 1% of supply. This is not price support — it is signal that snipers will not have a free lunch.
- **Do not implement transfer taxes on-chain.** Solana SPL tokens with transfer hooks read as scam-flavored to sophisticated users. Use social + treasury mechanics instead.

---

## 10. What STEAK is NOT

- Not a security offering (the free Genesis mint is gas-only; no presale).
- Not a promise of yield. Emissions are protocol-native, not interest.
- Not audited (day 1). An independent audit is a Season 2 goal, funded from the Barn.
- Not a food product. STEAK is a token. Meat is not shipped. There is no beef in the smart contract.

---

## 11. Roadmap in one screen

- **Season 0 (T+0 to T+72h):** Launch, Genesis Harvest, first Butcher Day.
- **Season 1 (T+3d to T+93d):** Fattest emissions. Staking dashboard live. Weekly Butcher Days. Meme flywheel.
- **Season 2:** First governance vote. Independent audit funded. Cross-chain wrap decision.
- **Season 3:** Merch drop paid in STEAK. Butcher Day IRL meetup in a US city.
- **Season 4+:** Community-directed.

---

*This document is a working tokenomics brief and is subject to change based on community governance after Season 1. Nothing here is legal, tax, or financial advice.*
