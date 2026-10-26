
import { createFinding } from "../finding.js";

// Check whether a test script is configured.
export async function checkTestScript(context) {
  if (context.packageJsonError) {
    return createFinding(
      "test-script",
      "test script",
      "fail",
      "Could not read package.json"
    );
  }

  const exists = Boolean(context.packageJson.scripts?.test);

  return createFinding(
    "test-script",
    "test script",
    exists ? "pass" : "warn",
    exists ? "Test script exists" : "Test script is missing"
  );
}
