
import { test } from "node:test";
import assert from "node:assert/strict";
import { inspectProject } from "../src/index.js";

// Verify that a valid project produces ten findings.
test("inspects the current project", async () => {
  const report = await inspectProject(".");

  assert.equal(report.findings.length, 10);
  assert.equal(report.summary.total, 10);
  assert.equal(
    report.summary.passed +
      report.summary.warnings +
      report.summary.failed,
    10
  );
});

// Reject an empty project path.
test("rejects an empty path", async () => {
  await assert.rejects(
    inspectProject(""),
    { name: "TypeError" }
  );
});

// Reject a path that does not exist.
test("rejects a missing directory", async () => {
  await assert.rejects(
    inspectProject("./missing-project-doctor-test"),
    /does not exist/
  );
});

// Reject a file when a directory is required.
test("rejects a file path", async () => {
  await assert.rejects(
    inspectProject("./package.json"),
    /not a directory/
  );
});
