# Steak Cut Levels — 5 tiers, 200 unique arts

**Same gate for every level:** 100,000 STEAK · 1 per wallet · 200 total

Mint order cycles through all 5 levels (40 of each across the full collection). **Each serial has its own image file** — no text burned into the art.

| LVL | Cut | Example serial | Base art |
|-----|-----|----------------|----------|
| **1** | Sirloin | #1, #6, #11… | `assets/bases/base-level-1-sirloin.png` |
| **2** | Ribeye | #2, #7, #12… | `base-level-2-ribeye.png` |
| **3** | Brisket | #3, #8, #13… | `base-level-3-brisket.png` |
| **4** | Porterhouse | #4, #9, #14… | `base-level-4-porterhouse.png` |
| **5** | Prime | #5, #10, #15… | `base-level-5-prime.png` |

## Image files

- **200 NFT renders:** `assets/nft-cuts/001.jpg` … `200.jpg`
- **Served on site:** `web/public/cuts/serial/001.jpg` … `200.jpg`
- **Regenerate:** `npm run generate:nft-cuts`

## On-chain names

| Serial | Example name | Image |
|--------|----------------|-------|
| 1 | Sirloin Cut · LVL 1 #1 | `001.jpg` |
| 2 | Ribeye Cut · LVL 2 #2 | `002.jpg` |
| 5 | Prime Cut · LVL 5 #5 | `005.jpg` |
| 6 | Sirloin Cut · LVL 1 #6 | `006.jpg` |
| 200 | Prime Cut · LVL 5 #200 | `200.jpg` |

## IPFS upload (founder)

Upload all 200 images from `assets/nft-cuts/` plus per-serial metadata (or a script that maps serial → image CID).

Per-serial metadata example:

```json
{
  "name": "Ribeye Cut · LVL 2 #2",
  "symbol": "CUT",
  "description": "Steak Cut NFT from The Ranch. 100k STEAK gate.",
  "image": "ipfs://CID/002.jpg",
  "attributes": [
    { "trait_type": "Level", "value": "2" },
    { "trait_type": "Cut", "value": "Ribeye" },
    { "trait_type": "Serial", "value": "2" }
  ]
}
```
