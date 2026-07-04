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
└── src/                   # Application source
```

## Secrets

Do not commit real API keys. Add production secrets in [Cursor Cloud Agents → Secrets](https://cursor.com/dashboard?tab=cloud-agents).
