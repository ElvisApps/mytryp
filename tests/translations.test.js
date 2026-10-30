import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { sepedi } from "../src/i18n/sepedi.js";
import { translate } from "../src/i18n/translate.js";
import * as portal from "../src/config/portal.js";
import {
  plans,
  subscriptionNotes,
  assumptions,
} from "../src/config/pricing.js";
function strings(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object")
    return Object.values(value).flatMap(strings);
  return [];
}
test("every policy, requirement, onboarding and pricing text has a Sepedi translation", () => {
  const values = strings({
    ...portal,
    brand: {
      portal: portal.brand.portal,
      reviewLabel: portal.brand.reviewLabel,
    },
    plans: plans.map(({ id, ...plan }) => plan),
    subscriptionNotes,
    assumptions,
  });
  assert.deepEqual(
    values.filter((value) => !sepedi[value]),
    [],
  );
});
test("all static translated interface labels have dictionary entries", () => {
  const root = new URL("../src/", import.meta.url);
  const files = [
    "App.jsx",
    ...["pages", "components"].flatMap((dir) =>
      readdirSync(new URL(dir + "/", root))
        .filter((name) => name.endsWith(".jsx"))
        .map((name) => dir + "/" + name),
    ),
  ];
  const missing = [];
  for (const file of files) {
    const source = readFileSync(new URL(file, root), "utf8");
    for (const match of source.matchAll(/tr\(("(?:[^"\\]|\\.)*")\)/g)) {
      const text = JSON.parse(match[1]);
      if (/[a-z]/i.test(text) && !sepedi[text]) missing.push(text);
    }
  }
  assert.deepEqual(missing, []);
});
test("English, unknown text and calculator numbers pass through safely", () => {
  assert.equal(translate("Home", "en"), "Home");
  assert.equal(translate("Home", "nso"), "Gae");
  assert.equal(
    translate("A new management entry", "nso"),
    "A new management entry",
  );
  assert.equal(translate(500, "nso"), 500);
  assert.equal(translate(null, "nso"), null);
});
