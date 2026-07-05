# Steak Cut NFTs

**100,000 STEAK = 1 Steak Cut · 200 supply · 1 per wallet · tradeable**

Each mint gets a **cut type** (Ribeye, Sirloin, Brisket, Porterhouse, T-Bone, Filet, Flank, Chuck) based on mint order. Not wagyu-only — the whole animal is on the menu.

No tiers. No escrow (for now). Hold your cut in wallet for future Harvest eligibility.

---

## Rules

| Rule | Value |
|------|-------|
| Minimum STEAK to mint | **100,000** |
| Total supply | **200** |
| Per wallet | **1** |
| Cut types | 8 cuts, assigned by serial (#1 Ribeye, #2 Sirloin, … cycles) |
| Tradeable | Yes (Magic Eden / Tensor) |
| Escrow stake | Not yet |

---

## Cut assignment

| Serial | Example name |
|--------|----------------|
| 1 | Ribeye Cut #1 |
| 2 | Sirloin Cut #2 |
| 8 | Chuck Cut #8 |
| 9 | Ribeye Cut #9 |

Same gate for every cut — 100k STEAK. Rarity is which number and which cut you pull.

---

## How to mint

1. Buy **≥100,000 STEAK** on pump.fun.
2. Go to **`/mint`** (The Cut Room) and connect wallet.
3. Click **Mint Your Cut** if eligible.

---

## Founder setup

Upload a steak cut image to IPFS. One image works for all 200 (name differs on-chain). Or use separate art per cut type later.

```json
{
  "name": "Steak Cut",
  "symbol": "CUT",
  "description": "Bottle-fed to blockchain. 100k STEAK gate. 1 of 200.",
  "image": "ipfs://YOUR_CID/steak-cut.png"
}
```

```env
NFT_METADATA_URI=ipfs://YOUR_CID/metadata.json
NFT_MINT_AUTHORITY_SECRET=base58_secret
```

---

*Not financial or legal advice.*
