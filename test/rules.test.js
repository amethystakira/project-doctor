import { test } from "node:test";
import assert from "node:assert/strict";
import { checkPackageName } from "../src/rules/package-name.js";
import { checkPackageVersion } from "../src/rules/package-version.js";
import { checkDescription } from "../src/rules/description.js";
import { checkTestScript } from "../src/rules/test-script.js";
import { checkRepository } from "../src/rules/repository.js";
import { checkNodeVersion } from "../src/rules/node-version.js";
import { checkReadme } from "../src/rules/readme.js";
import { checkGitignore } from "../src/rules/gitignore.js";
import { checkLicense } from "../src/rules/license.js";
import { checkPackageJson } from "../src/rules/package-json.js";
import { createSkippedFinding } from "../src/finding.js";

// Test a missing package name.
test("package name is missing", async () => {
  const context = {
    packageJson: { version: "1.0.0" },
    packageJsonError: null
  };

  const result = await checkPackageName(context);

  assert.equal(result.status, "fail");
  assert.equal(result.message, "Package name is missing");
});

// Test a missing package version.
test("package version is missing", async () => {
  const context = {
    packageJson: { name: "example" },
    packageJsonError: null
  };

  const result = await checkPackageVersion(context);

  assert.equal(result.status, "fail");
  assert.equal(result.message, "Package version is missing");
});

// Test a missing description.
test("description is missing", async () => {
  const context = {
    packageJson: { name: "example", version: "1.0.0" },
    packageJsonError: null
  };

  const result = await checkDescription(context);

  assert.equal(result.status, "warn");
  assert.equal(result.message, "Package description is missing");
});

// Test a missing test script.
test("test script is missing", async () => {
  const context = {
    packageJson: { scripts: {} },
    packageJsonError: null
  };

  const result = await checkTestScript(context);

  assert.equal(result.status, "warn");
});

// Test missing repository metadata.
test("repository metadata is missing", async () => {
  const context = {
    packageJson: {},
    packageJsonError: null
  };

  const result = await checkRepository(context);

  assert.equal(result.status, "warn");
});

// Test a missing Node.js version requirement.
test("Node.js version requirement is missing", async () => {
  const context = {
    packageJson: { engines: {} },
    packageJsonError: null
  };

  const result = await checkNodeVersion(context);

  assert.equal(result.status, "warn");
});

// Test a missing README.
test("README is missing", async () => {
  const context = { projectPath: "/tmp/project-doctor-empty" };
  const result = await checkReadme(context);

  assert.equal(result.status, "warn");
});

// Test a missing .gitignore.
test(".gitignore is missing", async () => {
  const context = { projectPath: "/tmp/project-doctor-empty" };
  const result = await checkGitignore(context);

  assert.equal(result.status, "warn");
});

// Test a missing LICENSE.
test("LICENSE is missing", async () => {
  const context = { projectPath: "/tmp/project-doctor-empty" };
  const result = await checkLicense(context);

  assert.equal(result.status, "warn");
});

// Test a missing package.json.
test("package.json is missing", async () => {
  const context = {
    packageJson: null,
    packageJsonError: new Error("File not found")
  };

  const result = await checkPackageJson(context);

  assert.equal(result.status, "fail");
  assert.equal(
    result.message,
    "package.json is missing or invalid"
  );
});

// Test malformed package.json.
test("package.json is invalid", async () => {
  const context = {
    packageJson: null,
    packageJsonError: new SyntaxError("Invalid JSON")
  };

  const result = await checkPackageJson(context);

  assert.equal(result.status, "fail");
  assert.equal(
    result.message,
    "package.json is missing or invalid"
  );
});

// Test that skipped checks produce warnings.
test("skipped finding uses warning status", () => {
  const result = createSkippedFinding("package-name", "package name");

  assert.equal(result.status, "warn");
  assert.match(result.message, /skipped/i);
});

// Test that skipped findings preserve their identifiers.
test("skipped finding preserves check details", () => {
  const result = createSkippedFinding("repository", "repository");

  assert.equal(result.id, "repository");
  assert.equal(result.name, "repository");
});