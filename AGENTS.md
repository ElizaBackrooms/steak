# AGENTS.md

Instructions for Cursor Cloud Agents working in this repository.

## Cursor Cloud specific instructions

### Environment

- **OS**: Ubuntu VM (managed by Cursor)
- **Node**: 20+ (from base image)
- **Package manager**: npm

### Setup (automatic)

On each cloud agent start, `.cursor/environment.json` runs:

```bash
npm install
```

If dependencies fail, check the setup logs in the agent view and fix `package.json` or lockfile issues.

### Development commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Run dev server | `npm run dev` |
| Run tests | `npm test` |
| Lint | `npm run lint` |

### Environment variables

No secrets are required for basic development. If you add external services later, configure them in the Cursor dashboard **Secrets** tab — never commit real values here.

Placeholder examples only:

```
# Example — use Cursor Secrets for real values
# API_KEY=placeholder-not-real
```

### Workflow expectations

1. Create a feature branch for changes (`agent/…` or descriptive name).
2. Run tests before opening a PR.
3. Write a clear PR description with what changed and how it was verified.
4. Keep diffs focused — avoid unrelated refactors.

### Known quirks

- Cloud VMs do not have access to local-only tools or your home directory.
- Long-running dev servers should use `terminals` in `environment.json` if the agent needs a server always up.
