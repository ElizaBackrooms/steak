import test from "node:test";
import assert from "node:assert/strict";
import {
  calcSnapshotPoints,
  effectivePoints,
  getTier,
  holdBonus,
  toWalletPointsView,
} from "../web/src/lib/points.ts";

test("getTier returns Calf for balances below 100k", () => {
  assert.deepEqual(getTier(0), { name: "Calf", multiplier: 1 });
  assert.deepEqual(getTier(99_999), { name: "Calf", multiplier: 1 });
});

test("getTier returns Yearling at 100k+", () => {
  assert.deepEqual(getTier(100_000), { name: "Yearling", multiplier: 2 });
  assert.deepEqual(getTier(999_999), { name: "Yearling", multiplier: 2 });
});

test("getTier returns Prime Cut at 1M+", () => {
  assert.deepEqual(getTier(1_000_000), { name: "Prime Cut", multiplier: 5 });
});

test("getTier returns Dry-Aged at 10M+", () => {
  assert.deepEqual(getTier(10_000_000), { name: "Dry-Aged", multiplier: 10 });
  assert.deepEqual(getTier(50_000_000), { name: "Dry-Aged", multiplier: 10 });
});

test("calcSnapshotPoints multiplies balance by tier multiplier", () => {
  assert.equal(calcSnapshotPoints(50_000), 50_000);
  assert.equal(calcSnapshotPoints(100_000), 200_000);
  assert.equal(calcSnapshotPoints(1_000_000), 5_000_000);
  assert.equal(calcSnapshotPoints(10_000_000), 100_000_000);
});

test("holdBonus starts at 1.0 and caps at 1.5 after one year", () => {
  const firstSeen = Date.UTC(2025, 0, 1);
  assert.equal(holdBonus(firstSeen, firstSeen), 1);
  const sixMonths = firstSeen + 182.5 * 86_400_000;
  assert.equal(holdBonus(firstSeen, sixMonths), 1.25);
  const oneYear = firstSeen + 365 * 86_400_000;
  assert.equal(holdBonus(firstSeen, oneYear), 1.5);
  const twoYears = firstSeen + 730 * 86_400_000;
  assert.equal(holdBonus(firstSeen, twoYears), 1.5);
});

test("effectivePoints applies hold bonus to stored points", () => {
  const firstSeen = 0;
  const now = 365 * 86_400_000;
  assert.equal(effectivePoints(1_000, firstSeen, now), 1_500);
});

test("toWalletPointsView matches API contract fields", () => {
  const now = 365 * 86_400_000;
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
  assert.deepEqual(view, {
    wallet: "abc123",
    balance: 100_000,
    tier: "Yearling",
    points: 200_000,
    effective_points: 300_000,
    first_seen: 0,
  });
});
