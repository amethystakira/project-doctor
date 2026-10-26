
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
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
    report.summary.total
  );
});

// Reject an empty path.
test("rejects an empty path", async () => {
  await assert.rejects(inspectProject(""), {
    name: "TypeError"
  });
});

// Reject a nonexistent directory.
test("rejects a missing directory", async () => {
  await assert.rejects(
    inspectProject("./missing-project-doctor-test"),
    /does not exist/
  );
});

// Reject a file instead of a directory.
test("rejects a file path", async () => {
  await assert.rejects(
    inspectProject("./package.json"),
    /not a directory/
  );
});

// Verify how inspection handles malformed package.json.
test("reports malformed package.json without crashing", async () => {
  const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), "project-doctor-")
  );

  try {
    await fs.writeFile(
      path.join(tempDir, "package.json"),
      "{ invalid json"
    );

    const report = await inspectProject(tempDir);

    assert.equal(report.findings.length, 10);
    assert.ok(
      report.findings.some(
        (finding) => finding.status === "fail"
      )
    );
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
});
