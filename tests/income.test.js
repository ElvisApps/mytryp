import test from "node:test";
import assert from "node:assert/strict";
import { estimateIncome } from "../src/lib/income.js";
import { plans } from "../src/config/pricing.js";
const expected = {
  daily: [25, 175, 750],
  weekly: [130, 130, 650],
  monthly: [500, 500, 500],
};
for (const plan of plans)
  for (const [i, days] of [1, 7, 30].entries())
    test(`${plan.name}: ${days} day horizon`, () => {
      const r = estimateIncome({ trips: 8, fare: 60, days, plan });
      assert.equal(r.gross, 480 * days);
      assert.equal(r.cost, expected[plan.id][i]);
      assert.equal(r.afterSubscription, 480 * days - expected[plan.id][i]);
    });
test("zero trips retains full subscription cost and can be negative", () =>
  assert.equal(
    estimateIncome({ trips: 0, fare: 60, days: 30, plan: plans[2] })
      .afterSubscription,
    -500,
  ));
test("exact weekly boundary and renewal", () => {
  for (const [days, cost] of [
    [7, 130],
    [8, 260],
    [28, 520],
    [29, 650],
    [30, 650],
  ])
    assert.equal(
      estimateIncome({ trips: 1, fare: 10, days, plan: plans[1] }).cost,
      cost,
    );
});
test("fare excludes booking fee", () =>
  assert.equal(
    estimateIncome({ trips: 10, fare: 100, days: 1, plan: plans[0] }).gross,
    1000,
  ));
test("invalid and nonfinite values rejected", () => {
  for (const trips of [-1, NaN, Infinity])
    assert.throws(
      () => estimateIncome({ trips, fare: 60, days: 7, plan: plans[0] }),
      RangeError,
    );
  assert.throws(
    () =>
      estimateIncome({
        trips: 1,
        fare: 60,
        days: 7,
        plan: { price: 25, days: 0 },
      }),
    RangeError,
  );
});
