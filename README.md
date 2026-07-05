# steak — $STEAK on Solana

**Bottle-fed to blockchain.** Meme coin + soft-stake dashboard for the @lazefrito viral calf story.

## Launch tonight

1. **Token:** follow `docs/LAUNCH_TONIGHT.md` (pump.fun)
2. **Site:** `npm run dev:web` → http://localhost:3000
3. **Swarm:** `npm run swarm` (needs `CURSOR_API_KEY`) — parallel agents in git worktrees

See `docs/SWARM_QUICKSTART.md` for the full playbook.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev:web` | Next.js landing + `/dashboard` |
| `npm run build:web` | Production build |
| `npm run test` | Points logic tests |
| `npm run snapshot` | Daily holder snapshot worker |
| `npm run swarm` | Launch 4 cloud agent lanes |

## Project layout

```
steak/
├── .swarm/           # Agent coordination (STATUS, MESSAGES, CONTRACTS)
├── docs/             # Launch, tokenomics, comms, airdrop rules
├── web/              # Next.js site + API routes
├── data/             # points.json (marination leaderboard)
└── scripts/          # snapshot worker, swarm launcher
```

## Docs

- `docs/LAUNCH_TONIGHT.md` — pump.fun step-by-step
- `docs/TOKENOMICS.md` — supply, Grazing Seasons, Harvests
- `docs/COMMS_PLAYBOOK.md` — pinned tweet, FUD replies
- `docs/AIRDROP_RULES.md` — Genesis / Loyalty / Viral harvests
- `BRAND_STRATEGY.md` — lore and meme brand

*Not financial or legal advice.*
