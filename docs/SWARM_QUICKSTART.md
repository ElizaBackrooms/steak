# Launch Tonight — Swarm Quickstart

Solana · pump.fun · full send · @lazefrito

## 1. Start the dashboard

```powershell
cd C:\Users\flowp\steak\web
copy .env.example .env.local
# After pump.fun launch, set NEXT_PUBLIC_TOKEN_MINT and STEAK_MINT
npm install
npm run dev
```

Open http://localhost:3000 — landing page + `/dashboard` for marination points.

## 2. Launch token (founder wallet)

Follow `docs/LAUNCH_TONIGHT.md` step by step:

1. Fresh Phantom wallet + 2 SOL
2. Create STEAK on https://pump.fun
3. Post CA with cooking-steak video (see `docs/COMMS_PLAYBOOK.md`)
4. Update `.env.local` with mint address

## 3. Run daily snapshots

```powershell
$env:SNAPSHOT_SECRET="your-secret"
$env:STEAK_MINT="<CA>"
$env:HELIUS_API_KEY="<key>"
npm run snapshot
```

Cron: daily at 00:05 UTC.

## 4. Agent swarm (parallel lanes)

Worktrees let agents work in isolation and coordinate via `.swarm/`:

```powershell
# One-time setup (already done if you ran integrator)
git worktree list

# Launch 4 cloud agents (needs CURSOR_API_KEY)
$env:CURSOR_API_KEY="cursor_..."; npm run swarm

# Or single lane
npm run swarm -- web
```

| Lane | Branch | Owns |
|------|--------|------|
| web | cursor/steak-wt-web-17ae | Next.js app |
| api | cursor/steak-wt-api-17ae | points + snapshot |
| docs | cursor/steak-wt-docs-17ae | launch docs |
| scripts | cursor/steak-wt-scripts-17ae | swarm tooling |

Agents read/write `.swarm/STATUS.md` and `.swarm/MESSAGES.md` to coordinate.

## 5. Deploy site

- **Vercel:** root = `web/`, set env vars from `web/.env.example`
- Set `DATA_PATH` to persistent storage or swap JSON store for Postgres before scale

## 6. Post-launch checklist

- [ ] CA in pinned tweet + site env
- [ ] Snapshot worker running daily
- [ ] Telegram announcements channel live
- [ ] Genesis Harvest countdown (72h)
- [ ] Transparency wallets in TOKENOMICS.md §7

*Not financial or legal advice.*
