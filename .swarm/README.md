# STEAK Agent Swarm

Parallel agents coordinate through this directory. **Read before you write. Update your lane when you start/finish.**

## Lanes

| Lane | Branch | Worktree | Owns |
|------|--------|----------|------|
| `integrator` | `cursor/steak-launch-17ae` | repo root | merge, CI, root package.json |
| `web` | `cursor/steak-wt-web-17ae` | `../steak-wt-web` | `web/` Next.js app |
| `api` | `cursor/steak-wt-api-17ae` | `../steak-wt-api` | snapshot worker, `data/`, API routes |
| `docs` | `cursor/steak-wt-docs-17ae` | `../steak-wt-docs` | `docs/`, launch playbooks |
| `scripts` | `cursor/steak-wt-scripts-17ae` | `../steak-wt-scripts` | `scripts/swarm*.mjs`, agent launchers |

## Protocol

1. Read `STATUS.md` and `CONTRACTS.md`.
2. Claim your lane in `STATUS.md` (`in_progress`).
3. Work only in your lane's paths unless blocked — post in `MESSAGES.md`.
4. On completion: update `STATUS.md` (`done`), note handoff in `MESSAGES.md`.
5. Integrator merges lane branches into `cursor/steak-launch-17ae`.

## Setup worktrees (once)

```powershell
cd C:\Users\flowp\steak
git worktree add ..\steak-wt-web cursor/steak-wt-web-17ae
git worktree add ..\steak-wt-api cursor/steak-wt-api-17ae
git worktree add ..\steak-wt-docs cursor/steak-wt-docs-17ae
git worktree add ..\steak-wt-scripts cursor/steak-wt-scripts-17ae
```

## Launch swarm

```powershell
$env:CURSOR_API_KEY="cursor_..."; npm run swarm
```
