# steak

A repo configured for **Cursor Cloud Agents** — run coding agents from your phone without keeping your laptop open.

## Run from your phone

1. **Connect GitHub to Cursor** (one-time): [cursor.com/dashboard](https://cursor.com/dashboard) → connect `ElizaBackrooms/steak` with read/write access.
2. **Set up the cloud environment** (one-time): [cursor.com/agents](https://cursor.com/agents) → create an environment for this repo. Cursor will clone the repo, run `npm install`, and optionally save a snapshot.
3. **Launch agents on mobile**:
   - **iPhone**: [Cursor for iOS](https://cursor.com/ios) — pick this repo, describe a task, tap run.
   - **Any phone**: open [cursor.com/agents](https://cursor.com/agents) in Safari/Chrome. On Android, use **Install App** for the PWA.
   - **GitHub**: comment `@cursor fix the bug in …` on a PR or issue in this repo.

Agents work on a cloud VM, push branches, and open PRs you can review and merge from your phone.

## Local development

```bash
npm install
npm run dev
```

## Project layout

```
steak/
├── AGENTS.md              # Cloud agent setup & run instructions
├── .cursor/
│   ├── environment.json   # Cloud VM install/update command
│   └── rules/             # Coding conventions for all agents
├── .swarm/                # Multi-agent coordination (STATUS, CONTRACTS)
├── scripts/               # swarm launcher, snapshot worker, cloud agent
└── src/                   # Application source
```

## Launch tonight (STEAK token)

Quick path from laptop or phone to a live swarm + dashboard.

### 1. One-time setup

```powershell
cd C:\Users\flowp\steak
git worktree add ..\steak-wt-web cursor/steak-wt-web-17ae
git worktree add ..\steak-wt-api cursor/steak-wt-api-17ae
git worktree add ..\steak-wt-docs cursor/steak-wt-docs-17ae
git worktree add ..\steak-wt-scripts cursor/steak-wt-scripts-17ae
npm install
```

Get a [Cursor API key](https://cursor.com/dashboard/integrations) and set secrets in [Cursor Cloud → Secrets](https://cursor.com/dashboard?tab=cloud-agents): `HELIUS_API_KEY`, `SNAPSHOT_SECRET`, `STEAK_MINT`.

### 2. Launch the swarm (4 lane agents)

```powershell
$env:CURSOR_API_KEY="cursor_..."; npm run swarm
```

Launch a single lane:

```powershell
$env:CURSOR_API_KEY="cursor_..."; npm run swarm -- web
```

Lanes: `web`, `api`, `docs`, `scripts`. Agents read `.swarm/` for coordination and open PRs to `cursor/steak-launch-17ae`.

### 3. Run the dashboard locally

After the web lane lands:

```powershell
cd web
cp .env.example .env.local   # fill mint + RPC
npm install
npm run dev
```

From repo root: `npm run dev:web` · production build: `npm run build:web`.

### 4. Daily holder snapshot

Once `POST /api/snapshot` is live:

```powershell
$env:SNAPSHOT_SECRET="your-secret"; npm run snapshot
$env:SNAPSHOT_SECRET="your-secret"; npm run snapshot -- --url https://your-dashboard.vercel.app
```

### 5. Optional: local worker (My Machines)

```powershell
.\start-worker.ps1
```

Keep the terminal open; control agents from [cursor.com/agents](https://cursor.com/agents) or Cursor iOS.

See `.swarm/README.md` for lane ownership and merge order.

## Secrets

Do not commit real API keys. Add production secrets in [Cursor Cloud Agents → Secrets](https://cursor.com/dashboard?tab=cloud-agents).
