
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

const cliPath = path.join(projectRoot, "bin", "doctor.js");

// Test human-readable output.
test("CLI prints a human-readable report", () => {
  const result = spawnSync(
    process.execPath,
    [cliPath, projectRoot],
    { encoding: "utf8" }
  );

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Project Doctor/);
  assert.match(result.stdout, /checks completed/);
});

// Test JSON output.
test("CLI prints valid JSON with --json", () => {
  const result = spawnSync(
    process.execPath,
    [cliPath, projectRoot, "--json"],
    { encoding: "utf8" }
  );

  assert.equal(result.status, 0);

  const report = JSON.parse(result.stdout);

  assert.equal(report.summary.total, 10);
  assert.equal(report.findings.length, 10);
});

// Test invalid project paths.
test("CLI exits with code 1 for a missing directory", () => {
  const result = spawnSync(
    process.execPath,
    [cliPath, path.join(projectRoot, "missing-test-directory")],
    { encoding: "utf8" }
  );

  assert.equal(result.status, 1);
  assert.match(result.stderr, /does not exist/);
});


import fs from "node:fs/promises";
import os from "node:os";

// Test that failed project checks produce exit code 1.
test("CLI exits with code 1 when project checks fail", async () => {
  const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), "doctor-cli-")
  );

  try {
    await fs.writeFile(
      path.join(tempDir, "package.json"),
      "{ invalid json"
    );

    const result = spawnSync(
      process.execPath,
      [cliPath, tempDir],
      { encoding: "utf8" }
    );

    assert.equal(result.status, 1);
    assert.match(result.stdout, /package.json is missing or invalid/);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
});
