#!/usr/bin/env node
/**
 * Start a Cursor Cloud Agent for ElizaBackrooms/steak.
 *
 * Requires CURSOR_API_KEY from https://cursor.com/dashboard/integrations
 *
 * Usage:
 *   $env:CURSOR_API_KEY="cursor_..."; npm run agent
 *   $env:CURSOR_API_KEY="cursor_..."; npm run agent -- "Your custom prompt"
 */

const repoUrl = "https://github.com/ElizaBackrooms/steak";
const defaultPrompt =
  "Read AGENTS.md and README.md. Verify npm install and npm test pass in the cloud environment. Fix any issues you find and open a PR with a short summary.";

const promptText = process.argv.slice(2).join(" ").trim() || defaultPrompt;
const apiKey = process.env.CURSOR_API_KEY;

if (!apiKey) {
  console.error("Missing CURSOR_API_KEY.");
  console.error("Create one at https://cursor.com/dashboard/integrations");
  console.error('Then run: $env:CURSOR_API_KEY="cursor_..."; npm run agent');
  process.exit(1);
}

const body = {
  prompt: { text: promptText },
  repos: [{ url: repoUrl, startingRef: "master" }],
  autoCreatePR: true,
  skipReviewerRequest: true,
};

const response = await fetch("https://api.cursor.com/v1/agents", {
  method: "POST",
  headers: {
    Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const payload = await response.json().catch(() => ({}));

if (!response.ok) {
  console.error("Failed to start cloud agent:", response.status, payload);
  process.exit(1);
}

const agentId = payload.agent?.id ?? payload.id;
const webUrl = agentId ? `https://cursor.com/agents/${agentId}` : "https://cursor.com/agents";

console.log("Cloud agent started.");
if (agentId) console.log("Agent ID:", agentId);
console.log("Open on phone or web:", webUrl);
if (payload.run?.id) console.log("Run ID:", payload.run.id);
