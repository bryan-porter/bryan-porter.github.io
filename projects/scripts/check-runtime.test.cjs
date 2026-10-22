const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { test } = require("node:test");
const { runInNewContext } = require("node:vm");

const source = readFileSync(join(__dirname, "check-runtime.cjs"), "utf8");
function check(version, env = {}) {
  runInNewContext(source, {
    require,
    process: { versions: { node: version }, env, argv: ["node", "check-runtime.cjs"] },
    console: { log() {} },
  });
}
for (const version of ["22.23.4", "22.24.0", "24.22.1", "24.23.0"]) {
  test(`accept patched supported stable runtime ${version}`, () => check(version));
}
for (const version of [
  "22.22.0", "22.23.3", "24.21.99", "24.22.0", "23.99.99", "26.12.1",
  "22.23.0-rc.1", "24.22.0-nightly20261001", "24.22.1-rc.1", "24.22.x", "24.22", "",
]) {
  test(`reject unsupported/unpatched/nonstable runtime ${JSON.stringify(version)}`, () => {
    assert.throws(() => check(version), /Use patched Node/);
  });
}
test("reject global TLS-verification bypass on a patched runtime", () => {
  assert.throws(() => check("24.22.1", { NODE_TLS_REJECT_UNAUTHORIZED: "0" }), /verification must remain enabled/);
});
