import path from "node:path";
import { pathExists } from "../scanner.js";
import { createFinding } from "../finding.js";

// Check whether LICENSE exists.
export async function checkLicense(projectPath) {
  const exists = await pathExists(
    path.join(projectPath, "LICENSE")
  );

  return createFinding(
    "license",
    "LICENSE",
    exists ? "pass" : "warn",
    exists ? "LICENSE exists" : "LICENSE is missing"
  );
}