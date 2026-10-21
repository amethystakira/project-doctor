import { readPackageJson } from "../package.js";
import { createFinding } from "../finding.js";

// Check whether a test script is configured.
export async function checkTestScript(projectPath) {
  try {
    const packageJson = await readPackageJson(projectPath);
    const exists = Boolean(packageJson.scripts?.test);

    return createFinding(
      "test-script",
      "test script",
      exists ? "pass" : "warn",
      exists ? "Test script exists" : "Test script is missing"
    );
  } catch {
    return createFinding(
      "test-script",
      "test script",
      "fail",
      "Could not read package.json"
    );
  }
}