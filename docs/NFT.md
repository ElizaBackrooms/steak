# Wagyu Cut NFT

**100,000 STEAK = 1 Wagyu Cut · 200 supply · 1 per wallet · tradeable**

No tiers. No escrow (for now). Hold the NFT in your wallet for future Harvest eligibility.

---

## Rules

| Rule | Value |
|------|-------|
| Minimum STEAK to mint | **100,000** |
| Total supply | **200** |
| Per wallet | **1** |
| Tradeable | Yes (secondary market anytime) |
| Escrow stake | Not yet — coming later if demand warrants |

---

## How to mint

1. Buy **≥100,000 STEAK** on pump.fun after launch.
2. Go to **`/mint`** on the site and connect Phantom or Solflare.
3. Click **Mint Wagyu Cut** if eligible.
4. NFT appears in your wallet (when on-chain mint is configured).

---

## Founder setup (before mint goes live)

### 1. Upload metadata

Pin one wagyu steak image to IPFS (NFT.Storage, Irys, or Pinata):

```json
{
  "name": "Wagyu Cut",
  "symbol": "WAGYU",
  "description": "Bottle-fed to blockchain. 100k STEAK gate. 1 of 200.",
  "image": "ipfs://YOUR_CID/wagyu.png"
}
```

Set in `web/.env.local`:

```env
NFT_METADATA_URI=ipfs://YOUR_CID/metadata.json
NFT_MINT_AUTHORITY_SECRET=base58_of_collection_authority_keypair
```

**Never commit the secret.** Use Vercel env vars in production.

### 2. Fund the mint authority wallet

~0.05 SOL per NFT × 200 ≈ **10 SOL** buffer for rent + fees (plus extra for safety).

### 3. Without on-chain config (soft launch)

If `NFT_MINT_AUTHORITY_SECRET` is not set, the API **registers** eligible wallets in `data/mints.json` and shows a reservation message. You can airdrop NFTs manually later — not ideal, but unblocks launch night.

---

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/mint/status?wallet=` | Supply, eligibility, balance |
| POST | `/api/mint` | Body: `{ "wallet": "..." }` — mint if eligible |

---

## Harvest (future)

When Harvest snapshots run:

- Holding **Wagyu Cut NFT** in wallet at snapshot = bonus weight (rules TBD in `AIRDROP_RULES.md` update).
- Escrow staking may add a multiplier later — not required for launch.

---

*Not financial or legal advice. NFTs have no guaranteed value.*
