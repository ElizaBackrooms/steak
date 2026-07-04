#!/usr/bin/env node
/**
 * Launch parallel Cursor Cloud Agents — one per swarm lane.
 *
 * Requires CURSOR_API_KEY from https://cursor.com/dashboard/integrations
 *
 * Usage:
 *   $env:CURSOR_API_KEY="cursor_..."; npm run swarm
 *   $env:CURSOR_API_KEY="cursor_..."; npm run swarm -- web
 */

const repoUrl = "https://github.com/ElizaBackrooms/steak";

const LANES = [
  {
    name: "web",
    branch: "cursor/steak-wt-web-17ae",
    prompt: `You are the WEB lane in the STEAK agent swarm.

Read .swarm/README.md, STATUS.md, CONTRACTS.md, and MESSAGES.md first.
Update STATUS.md: set web lane to in_progress, then done when finished.
Append progress to MESSAGES.md.

Your worktree branch: cursor/steak-wt-web-17ae
Own only: web/

Tasks:
1. Ensure web/package.json has all Solana + Tailwind deps
2. Landing page: Hero, Story, Tokenomics, Roadmap, Footer — full send bottle-fed cow lore
3. Dashboard at /dashboard: wallet connect, balance, marination points, tiers, leaderboard
4. API routes: /api/points/[wallet], /api/leaderboard, /api/snapshot
5. npm run build must pass in web/
6. Match CONTRACTS.md interfaces

Push to cursor/steak-wt-web-17ae and open PR to cursor/steak-launch-17ae.`,
  },
  {
    name: "api",
    branch: "cursor/steak-wt-api-17ae",
    prompt: `You are the API lane in the STEAK agent swarm.

Read .swarm/README.md, STATUS.md, CONTRACTS.md, MESSAGES.md first.
Update STATUS.md and MESSAGES.md as you work.

Branch: cursor/steak-wt-api-17ae
Own: data/, scripts/snapshot-worker.mjs, web/src/lib/db.ts, web/src/lib/points.ts, web/src/app/api/

Tasks:
1. data/points.json store + snapshot worker script
2. Points logic per CONTRACTS.md (tiers, hold bonus)
3. POST /api/snapshot with Helius holder fetch
4. Add test/ for points logic at repo root
5. npm test must pass

Push and open PR to cursor/steak-launch-17ae.`,
  },
  {
    name: "docs",
    branch: "cursor/steak-wt-docs-17ae",
    prompt: `You are the DOCS lane in the STEAK agent swarm.

Read .swarm/README.md, BRAND_STRATEGY.md, and existing docs/ first.
Update .swarm/STATUS.md and MESSAGES.md.

Branch: cursor/steak-wt-docs-17ae
Own: docs/

Tasks:
1. docs/AIRDROP_RULES.md — Genesis, Loyalty, Viral harvests
2. Polish docs/LAUNCH_TONIGHT.md, TOKENOMICS.md, COMMS_PLAYBOOK.md for consistency
3. Add docs/SWARM_QUICKSTART.md — how founder runs swarm + launch tonight

Push and open PR to cursor/steak-launch-17ae.`,
  },
  {
    name: "scripts",
    branch: "cursor/steak-wt-scripts-17ae",
    prompt: `You are the SCRIPTS lane in the STEAK agent swarm.

Read .swarm/README.md and CONTRACTS.md.
Update .swarm/STATUS.md and MESSAGES.md.

Branch: cursor/steak-wt-scripts-17ae
Own: scripts/, root package.json, start-worker.ps1

Tasks:
1. scripts/swarm-start.mjs (this file pattern) — launch 4 lane agents
2. scripts/start-cloud-agent.mjs — keep working
3. Root package.json scripts: dev:web, build:web, test, swarm, snapshot
4. README.md section: launch tonight quickstart

Push and open PR to cursor/steak-launch-17ae.`,
  },
];

const apiKey = process.env.CURSOR_API_KEY;
if (!apiKey) {
  console.error("Missing CURSOR_API_KEY. Get one at https://cursor.com/dashboard/integrations");
  process.exit(1);
}

const laneFilter = process.argv[2];
const lanes = laneFilter ? LANES.filter((l) => l.name === laneFilter) : LANES;

if (lanes.length === 0) {
  console.error(`Unknown lane: ${laneFilter}. Options: ${LANES.map((l) => l.name).join(", ")}`);
  process.exit(1);
}

for (const lane of lanes) {
  const body = {
    prompt: { text: lane.prompt },
    repos: [{ url: repoUrl, startingRef: lane.branch }],
    autoCreatePR: true,
    skipReviewerRequest: true,
  };

  const res = await fetch("https://api.cursor.com/v1/agents", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const payload = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error(`[${lane.name}] Failed:`, res.status, payload);
    continue;
  }

  const id = payload.agent?.id ?? payload.id;
  console.log(`[${lane.name}] Started agent ${id} on ${lane.branch}`);
  if (id) console.log(`  https://cursor.com/agents/${id}`);
}
