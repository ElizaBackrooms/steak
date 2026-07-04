import test from "node:test";
import assert from "node:assert/strict";
import { greet } from "../src/index.js";

test("greet returns a friendly message", () => {
  assert.equal(greet("steak"), "Hello, steak!");
});

test("greet defaults to world", () => {
  assert.equal(greet(), "Hello, world!");
});
