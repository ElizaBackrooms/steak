import test from "node:test";
import assert from "node:assert/strict";

import {
  NFT,
  checkEligibility,
  remainingSupply,
  formatCutName,
  getCutForSerial,
} from "../web/src/lib/nft.ts";

const emptyRegistry = { mints: [], next_serial: 1 };

test("checkEligibility passes at 100k STEAK", () => {
  const result = checkEligibility("A".repeat(44), 100_000, emptyRegistry);
  assert.equal(result.ok, true);
});

test("checkEligibility fails below 100k", () => {
  const result = checkEligibility("A".repeat(44), 99_999, emptyRegistry);
  assert.equal(result.ok, false);
});

test("checkEligibility fails when sold out", () => {
  const full = {
    next_serial: 201,
    mints: Array.from({ length: 200 }, (_, i) => ({
      wallet: `wallet${i}`,
      serial: i + 1,
      steak_balance: 100_000,
      minted_at: 0,
    })),
  };
  const result = checkEligibility("B".repeat(44), 500_000, full);
  assert.equal(result.ok, false);
});

test("checkEligibility fails on duplicate wallet", () => {
  const registry = {
    next_serial: 2,
    mints: [{ wallet: "existing", serial: 1, steak_balance: 100_000, minted_at: 0 }],
  };
  const result = checkEligibility("existing", 200_000, registry);
  assert.equal(result.ok, false);
});

test("remainingSupply counts down", () => {
  assert.equal(remainingSupply(emptyRegistry), 200);
  assert.equal(
    remainingSupply({
      next_serial: 3,
      mints: [
        { wallet: "a", serial: 1, steak_balance: 100_000, minted_at: 0 },
        { wallet: "b", serial: 2, steak_balance: 100_000, minted_at: 0 },
      ],
    }),
    198,
  );
});

test("NFT constants match product spec", () => {
  assert.equal(NFT.minSteakBalance, 100_000);
  assert.equal(NFT.maxSupply, 200);
  assert.equal(NFT.maxPerWallet, 1);
  assert.equal(NFT.name, "Steak Cut");
});

test("formatCutName cycles through cut types", () => {
  assert.equal(formatCutName(1), "Ribeye Cut #1");
  assert.equal(formatCutName(2), "Sirloin Cut #2");
  assert.equal(formatCutName(9), "Ribeye Cut #9");
  assert.equal(getCutForSerial(3), "Brisket");
});
