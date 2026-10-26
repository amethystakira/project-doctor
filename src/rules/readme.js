
import path from "node:path";
import { pathExists } from "../scanner.js";
import { createFinding } from "../finding.js";

// Check whether README.md exists.
export async function checkReadme(context) {
  const exists = await pathExists(
    path.join(context.projectPath, "README.md")
  );

  return createFinding(
    "readme",
    "README",
    exists ? "pass" : "warn",
    exists ? "README.md exists" : "README.md is missing"
  );
}
