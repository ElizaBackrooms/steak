import test from "node:test";
import assert from "node:assert/strict";

import {
  calcSnapshotPoints,
  effectivePoints,
  getTier,
  holdBonus,
  toWalletPointsView,
} from "../web/src/lib/points.ts";

test("getTier maps balance to grazing season", () => {
  assert.equal(getTier(0).name, "Calf");
  assert.equal(getTier(100_000).name, "Yearling");
  assert.equal(getTier(1_000_000).name, "Prime Cut");
  assert.equal(getTier(10_000_000).name, "Dry-Aged");
});

test("calcSnapshotPoints applies tier multiplier", () => {
  assert.equal(calcSnapshotPoints(50_000), 50_000);
  assert.equal(calcSnapshotPoints(200_000), 400_000);
  assert.equal(calcSnapshotPoints(2_000_000), 8_000_000);
});

test("holdBonus ramps toward 1.5x over 180 days", () => {
  const start = Date.UTC(2025, 0, 1);
  assert.equal(holdBonus(start, start), 1);
  const day90 = start + 90 * 86_400_000;
  assert.equal(holdBonus(start, day90), 1.25);
  const day180 = start + 180 * 86_400_000;
  assert.equal(holdBonus(start, day180), 1.5);
});

test("effectivePoints scales stored points by hold bonus", () => {
  const record = {
    wallet: "x",
    balance: 100_000,
    tier: "Yearling",
    points: 1_000,
    first_seen: 0,
    last_updated: 180 * 86_400_000,
  };
  assert.equal(effectivePoints(record, 180 * 86_400_000), 1_500);
});

test("toWalletPointsView matches API contract fields", () => {
  const now = 180 * 86_400_000;
  const view = toWalletPointsView(
    {
      wallet: "abc123",
      balance: 100_000,
      tier: "Yearling",
      points: 200_000,
      first_seen: 0,
      last_updated: now,
    },
    now,
  );
  assert.equal(view.wallet, "abc123");
  assert.equal(view.effective_points, 300_000);
});
