# Swarm Status

Updated: 2026-07-04T22:35:00Z

| Lane | Agent | Status | Branch | Notes |
|------|-------|--------|--------|-------|
| integrator | coordinator | in_progress | cursor/steak-launch-17ae | swarm setup + merge |
| web | pending | pending | cursor/steak-wt-web-17ae | Next.js landing + dashboard |
| api | pending | pending | cursor/steak-wt-api-17ae | snapshot worker + points API |
| docs | pending | pending | cursor/steak-wt-docs-17ae | AIRDROP_RULES + polish |
| scripts | scripts-lane | done | cursor/steak-wt-scripts-17ae | swarm-start, snapshot-worker, package scripts, README launch section |

## Blockers

None.

## Merge order

1. docs (no code deps)
2. api (data + worker)
3. web (UI)
4. scripts (orchestration)
