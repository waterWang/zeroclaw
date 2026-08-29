import assert from "node:assert/strict";
import test from "node:test";

import { isManualScrollEvent, nextFollowState } from "./agentChatScroll.logic.ts";

const nearBottom = {
  clientHeight: 400,
  scrollHeight: 1_000,
  scrollTop: 500,
};

const scrolledUp = {
  ...nearBottom,
  scrollTop: 300,
};

test("programmatic scrolling does not suppress stream following", () => {
  assert.equal(nextFollowState(true, "programmatic", scrolledUp), true);
  assert.equal(nextFollowState(false, "programmatic", nearBottom), false);
  assert.equal(isManualScrollEvent(true, 400, 450), false);
  assert.equal(isManualScrollEvent(true, 450, 300), true);
});

test("manual scrolling away from and back to the tail controls stream following", () => {
  assert.equal(isManualScrollEvent(false, 300, 500), true);
  assert.equal(nextFollowState(true, "manual", scrolledUp), false);
  assert.equal(nextFollowState(false, "manual", nearBottom), true);
});
