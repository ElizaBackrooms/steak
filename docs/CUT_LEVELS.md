# Steak Cut Levels — 5 tiers, 5 arts

**Same gate for every level:** 100,000 STEAK · 1 per wallet · 200 total

Mint order cycles through all 5 levels (40 of each across the full collection).

| LVL | Cut | File | Vibe |
|-----|-----|------|------|
| **1** | Sirloin | `cut-level-1-sirloin.png` | Classic entry cut |
| **2** | Ribeye | `cut-level-2-ribeye.png` | Marbled, loud |
| **3** | Brisket | `cut-level-3-brisket.png` | Smoked, patient |
| **4** | Porterhouse | `cut-level-4-porterhouse.png` | Big bone energy |
| **5** | Prime | `cut-level-5-prime.png` | Dry-aged top tier |

Examples live in:
- `assets/examples/cut-level-*.png`
- `web/public/cuts/cut-level-*.png` (served on site)

## On-chain names

| Serial | Example name |
|--------|----------------|
| 1 | Sirloin Cut · LVL 1 #1 |
| 2 | Ribeye Cut · LVL 2 #2 |
| 5 | Prime Cut · LVL 5 #5 |
| 6 | Sirloin Cut · LVL 1 #6 |

## IPFS upload (founder)

Upload all 5 images + one metadata template per level, OR one shared metadata with dynamic name on mint (current code sets name in `formatCutName`).

Per-level metadata example:

```json
{
  "name": "Ribeye Cut · LVL 2",
  "symbol": "CUT",
  "description": "Steak Cut NFT from The Ranch. 100k STEAK gate.",
  "image": "ipfs://CID/ribeye.png",
  "attributes": [
    { "trait_type": "Level", "value": "2" },
    { "trait_type": "Cut", "value": "Ribeye" }
  ]
}
```

For single-URI minting tonight, use LVL 1 art for all and upgrade metadata later — or wire 5 URIs in env when ready.
