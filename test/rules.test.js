import { test } from "node:test";
import assert from "node:assert/strict";
import { checkPackageName } from "../src/rules/package-name.js";
import { checkPackageVersion } from "../src/rules/package-version.js";
import { checkDescription } from "../src/rules/description.js";
import { checkTestScript } from "../src/rules/test-script.js";
import { checkRepository } from "../src/rules/repository.js";
import { checkNodeVersion } from "../src/rules/node-version.js";

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